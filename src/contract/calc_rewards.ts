import * as anchor from "@coral-xyz/anchor";
import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";
import Decimal from "decimal.js";
import { normalizeAmount
  // , getProvider 
} from ".";
import { DojoStakingNftProgram as TarsStakingNftProgram } from "./types/dojo_staking_nft_program";
import tarsStakingIDL from "./idl/dojo_staking_nft_program.json";
import {
  StakingConfiguration,
  MultiplierRecord,
  MultiplierAccount,
  ApyChangeRecord,
  UserStakeAccount,
} from "./accTypes";

import {
  stakingTarsId,
  STAKING_CONFIG_ACCOUNT,
  STAKING_STATS_ACCOUNT,
  TAI_PROGRAM_VAULT_ID,
  TAI_AUTHORITY_ID,
  getStakingConfigAcc,
  getApplicableMultiplier,
  getUserStakeAccount,
  getMultiplierAcc,
} from "./common";

const SECONDS_IN_YEAR = new Decimal(31536000);


// max bps 1000 pai ok chal rha
const MAX_BPS = new Decimal(10000);

function clockNow(): number {
  return Math.floor(Date.now() / 1000);
}

export function sync(
  userStakeAccount: UserStakeAccount,
  stakingConfiguration: StakingConfiguration,
  multiplierAcc: MultiplierAccount
): anchor.BN {
  // console.log("passed in accounts");
  console.log('aaaaaaaaa', userStakeAccount.total_points.toString());
  // console.log(stakingConfiguration);
  // console.log(multiplierAcc);

  const timePassed = stakingConfiguration.end_date
    ? new Decimal(stakingConfiguration.end_date).sub(
        new Decimal(userStakeAccount.last_synced.toString())
      )
    : new Decimal(clockNow()).sub(
        new Decimal(userStakeAccount.last_synced.toString())
      );
  // console.log("time passed", timePassed.toString());
  // console.log("user total points", userStakeAccount.total_points.toString());

  const rewardAge = ((Date.now()/1000) - Number(userStakeAccount.stake_start_time))/86400
  let applicableMultiplier = getApplicableMultiplier(
    // userStakeAccount.lockin_period,
    multiplierAcc,
    rewardAge
  );
  console.log("applicable multiplier ", applicableMultiplier.toString(), rewardAge);
  if (applicableMultiplier == null) {
    throw new Error("InvalidMultiplierAcc");
  }
  console.log('aaaaaaaaaaa contract', userStakeAccount.total_points.toString())

  if (stakingConfiguration.apy_changes.length > 1) {
    // console.log("apy changes detected, going into sync protocol changes");
    syncUserStakeToProtocolChanges(
      userStakeAccount,
      stakingConfiguration,
      multiplierAcc
    );
  }
  // console.log("going into sync user rewards points to latest");
  syncUserRewardPointsToLatest(
    userStakeAccount,
    stakingConfiguration.end_date,
    multiplierAcc
  );
  // console.log("total points after syncing user rewards to latest", {
  //   rawScaledUp: userStakeAccount.total_points.toString(),
  //   normalizedAmount: normalizeAmount(userStakeAccount.total_points).toString(),
  // });


  console.log('aaaaaaaaaaa hamari calc', userStakeAccount.total_points.toString())
  let totalPoints = normalizeAmount(userStakeAccount.total_points);
  console.log('ccccc', totalPoints)
  console.log(
    `AFTER syncing -> user current point ${userStakeAccount.total_points.toString()}, last synced ${userStakeAccount.last_synced.toString()}, stake amount ${userStakeAccount.stake_amount.toString()}`
  );
  return totalPoints;
}

function syncUserStakeToProtocolChanges(
  userStakeAccount: UserStakeAccount,
  stakingConfiguration: StakingConfiguration,
  multiplierAcc: MultiplierAccount
): void {
  const filteredAprChanges = stakingConfiguration.apy_changes.filter(
    (apyChangeRecord) =>
      apyChangeRecord.apr_change_timestamp.gte(userStakeAccount.last_synced)
  );
  // console.log("length of filtered apy changes is", filteredAprChanges.length);

  let rewardsAccumulatedSinceLastTime = new Decimal(0);
  let newLatestSyncedRewardPoint = new Decimal(
    userStakeAccount.last_synced.toString()
  );
  let latestApr = userStakeAccount.current_apr;

  for (const apcr of filteredAprChanges) {
    const timeElapsed = new Decimal(apcr.apr_change_timestamp.toString()).sub(
      newLatestSyncedRewardPoint
    );
    const amountAccruedSinceLastSynced = getUserPointsAccruedInDuration(
      userStakeAccount,
      timeElapsed,
      multiplierAcc,
      latestApr
    );
    console.log(
      "apr change record is",
      apcr,
      "last synced",
      newLatestSyncedRewardPoint.toString()
    );
    console.log(
      "rewards accrued since last apr change",
      amountAccruedSinceLastSynced.toString(),
      "last apr",
      latestApr,
      "time between apr change and last synced",
      timeElapsed.toString()
    );

    rewardsAccumulatedSinceLastTime = rewardsAccumulatedSinceLastTime.add(
      amountAccruedSinceLastSynced
    );
    newLatestSyncedRewardPoint = new Decimal(
      apcr.apr_change_timestamp.toString()
    );
    latestApr = apcr.new_apr;
  }

  userStakeAccount.total_points = userStakeAccount.total_points.add(
    new anchor.BN(rewardsAccumulatedSinceLastTime.floor().toString())
  );
  userStakeAccount.last_synced = new anchor.BN(
    newLatestSyncedRewardPoint.floor().toString()
  );
}

function syncUserRewardPointsToLatest(
  userStakeAccount: UserStakeAccount,
  endTime: number | null,
  multiplierAcc: MultiplierAccount
): void {
  const currentTime = new Decimal(endTime ? endTime : clockNow());
  const durationToCalculateRewardFor: Decimal = currentTime.sub(
    new Decimal(userStakeAccount.last_synced.toString())
  );
  console.log(
    "sync user reward points to latest, duration to calculate reward",
    durationToCalculateRewardFor.toString()
  );

  // console.log("ye plus horha hai", Number(new anchor.BN(
  //   getUserPointsAccruedInDuration(
  //     userStakeAccount,
  //     durationToCalculateRewardFor,
  //     multiplierAcc,
  //     userStakeAccount.current_apr
  //   )
  //   // .toString()
  //     // .floor()
  // )))

  const new_total_points = new anchor.BN(
    getUserPointsAccruedInDuration(
      userStakeAccount,
      durationToCalculateRewardFor,
      multiplierAcc,
      userStakeAccount.current_apr
    )
    .floor()
    .toString()
  )
  console.log("Number(userStakeAccount.total_points) + Number(new_total_points)", Number(userStakeAccount.total_points), Number(new_total_points), Number(userStakeAccount.total_points) + Number(new_total_points))
  userStakeAccount.total_points = Number(userStakeAccount.total_points) + Number(new_total_points)
  // userStakeAccount.total_points = userStakeAccount.total_points.add(
  //   new anchor.BN(
  //     getUserPointsAccruedInDuration(
  //       userStakeAccount,
  //       durationToCalculateRewardFor,
  //       multiplierAcc,
  //       userStakeAccount.current_apr
  //     )
  //     .floor()
  //     .toString()
  //   )
  // );

  userStakeAccount.last_synced = new anchor.BN(currentTime.floor().toString());
}

function getUserPointsAccruedInDuration(
  userStakeAccount: UserStakeAccount,
  timeElapsedDuration: Decimal,
  multiplierAcc: MultiplierAccount,
  currentApr: number
): Decimal {
  if (timeElapsedDuration.eq(0)) {
    console.log("0 time elapsed");
    return new Decimal(0);
  }

  const aprDecimal = new Decimal(currentApr);
  const stakeAmountDecimal = new Decimal(
    userStakeAccount.stake_amount.toString()
  );
  const rewardAge = ((Date.now()/1000) - Number(userStakeAccount.stake_start_time))/86400
  const multiplier = new Decimal(
    userStakeAccount.get_multiplier(
      multiplierAcc,
      rewardAge

      // userStakeAccount.lockin_period,
    )
  );
console.log("multiplier cfc",  multiplier, aprDecimal.toString())

const newApr = aprDecimal.div(MAX_BPS)

  const rewardPerSecond = newApr
    .mul(stakeAmountDecimal)
    .div(SECONDS_IN_YEAR);
  console.log(`reward per second is ${rewardPerSecond.toString()}`);

  const totalPoints = rewardPerSecond.mul(timeElapsedDuration).mul(multiplier);
console.log("everything", {totalPoints: totalPoints.toString(), rewardPerSecond:rewardPerSecond.toString(), timeElapsedDuration:timeElapsedDuration.toString(), multiplier})
  return totalPoints;
} 

export async function getUserTotalPointsAtCurrentTime(
  provider: any,
  wallet: anchor.Wallet
): Promise<anchor.BN> {
  let userAddress = wallet.publicKey;
  // let anchorProvider = await getProvider(wallet);

  // console.log("user address", userAddress.toBase58());
  // console.log("anchor provider", anchorProvider);

  console.log('tars staking idl', tarsStakingIDL)

  //@ts-ignore
  let program = new anchor.Program(
    tarsStakingIDL as anchor.Idl,
    provider
  ) as anchor.Program<TarsStakingNftProgram>;
  let configAcc = await getStakingConfigAcc(program);
  let userStakeAcc = await getUserStakeAccount(program, userAddress);
  let multiplierAcc = await getMultiplierAcc(program);
  // console.log("multiplier acc", multiplierAcc);
  if(userStakeAcc){
  console.log(
    `before syncing -> user current point ${userStakeAcc.total_points.toString()}, last synced ${userStakeAcc.last_synced.toString()}, stake amount ${userStakeAcc.stake_amount.toString()}`
  );}

  console.log("abcd", {configAcc, userStakeAcc, multiplierAcc})
  if (configAcc == null) {
    throw Error("config acc not initialized yet");
  }

  if (userStakeAcc == null) {
    throw Error("user has not staked yet");
  }
  if (multiplierAcc == null) {
    throw Error("multipliers not initialized yet");
  }
  
  return await sync(userStakeAcc, configAcc, multiplierAcc);
}


export async function getUserStakeAcc(
  provider: any,
  wallet: any
): Promise<UserStakeAccount | false> {
  let userAddress = wallet.publicKey;
  // let anchorProvider = await getProvider(wallet);

  console.log('tars staking idl', tarsStakingIDL)

  //@ts-ignore
  let program = new anchor.Program(
    tarsStakingIDL as anchor.Idl,
    provider
  ) as anchor.Program<TarsStakingNftProgram>;
  
  let userStakeAcc = await getUserStakeAccount(program, userAddress);
  
  if (userStakeAcc == null) {
    return false;
  }
  
  return userStakeAcc;
}

export async function getMultiplierAccInfo(
  provider: any,
  wallet: any
): Promise<MultiplierAccount | false> {
  let userAddress = wallet.publicKey;
  // let anchorProvider = await getProvider(wallet);

  console.log('tars staking idl', tarsStakingIDL)

  //@ts-ignore
  let program = new anchor.Program(
    tarsStakingIDL as anchor.Idl,
    provider
  ) as anchor.Program<TarsStakingNftProgram>;
 
  let multiplierAcc = await getMultiplierAcc(program);

  if (multiplierAcc == null) {
    return false;
  }
  
  return multiplierAcc;
}