import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import { DojoStakingNftProgram as TarsStakingNftProgram } from "./types/dojo_staking_nft_program";
import {
  StakingConfiguration,
  MultiplierRecord,
  MultiplierAccount,
  ApyChangeRecord,
  UserStakeAccount,
} from "./accTypes";
function getApplicableMultiplier(
  // user_lockin_period: number,
  multiplier_acc: MultiplierAccount,
  rewardAge: number
): number {
  console.log("multiplier_acc bvb", multiplier_acc);
  const applicableMultipliers = multiplier_acc.multiplier_records
    .filter((record) => {
      return rewardAge >= record.minRewardAge;
    })
    .map((record) => {
      return record.multiplier;
    });
    console.log("applicableMultipliers bvb", applicableMultipliers)
  if (applicableMultipliers.length > 0) {
    return Math.max(...applicableMultipliers);
  } else {
    return 1;
  };
}
function getBonusAPYFromMultiplier(
  // user_lockin_period: number,
  multiplier_acc: MultiplierAccount,
  rewardAge: number
): number {
  const applicableMultipliers = multiplier_acc.multiplier_records
    .filter((record) => {
      return rewardAge >= record.minRewardAge;
    })
    .map((record) => {
      return record.multiplier;
    });
    console.log("applicableMultipliers bvb", applicableMultipliers)
  if (applicableMultipliers.length > 0) {
    return Math.max(...applicableMultipliers);
  } else {
    return 1;
  };
}
// mainnet program id
const stakingTarsId = new PublicKey(
  "HTAXC4T8i9w95yLUxn6LfsiXGeZabMU6Lxc19mcr5FCL"
);
const stakingDojoId = new PublicKey(
  "HTAXC4T8i9w95yLUxn6LfsiXGeZabMU6Lxc19mcr5FCL"
);
const STAKING_CONFIG_ACCOUNT = PublicKey.findProgramAddressSync(
  [Buffer.from(anchor.utils.bytes.utf8.encode("dojo_stake_config"))],
  stakingTarsId
)[0];
const STAKING_STATS_ACCOUNT = PublicKey.findProgramAddressSync(
  [Buffer.from(anchor.utils.bytes.utf8.encode("staking_stats"))],
  stakingTarsId
)[0];
// const stakingTarsId = new PublicKey(STAKING_PROGRAM_ID);

const TAI_PROGRAM_VAULT_ID = new PublicKey(
  "HDACD5tVQgV2hQx738wKdNb4pZsSX9RAEW6iQW7DPoFL"
);
const TAI_AUTHORITY_ID = new PublicKey(
  "CHi8AwgykA3BMJ3GUsGZ1t3pHwy54ZDaNn4X8ZvS6yux"
  // "86nHLn1LsqR1QdzvktoTiXQkVhpVhxrBQ8o4i8j5JWZ1"
);
const RANDOM_KEY = new PublicKey(
  "86nHLn1LsqR1QdzvktoTiXQkVhpVhxrBQ8o4i8j5JWZ1"
);
function getUserStakeAccountAddress(userAddress: PublicKey): PublicKey {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from(anchor.utils.bytes.utf8.encode("user_stake")),
      userAddress.toBuffer(),
    ],
    stakingTarsId
  )[0];
}
export const getMultiplierAccountAddress = () => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(anchor.utils.bytes.utf8.encode("multiplier_acc"))],
    stakingTarsId
  )[0];
};
async function getStakingConfigAcc(
  program: anchor.Program<TarsStakingNftProgram>
): Promise<StakingConfiguration | null> {
  let stakingConfigAcc =
    await program.account.stakingConfiguration.fetchNullable(
      STAKING_CONFIG_ACCOUNT
    );
  if (stakingConfigAcc == null) return null;
  let stakingConfig: StakingConfiguration = {
    end_date: stakingConfigAcc.endDate,
    apy_changes: stakingConfigAcc.apyChanges.map((record) => {
      return {
        apr_change_timestamp: record.aprChangeTimestamp,
        new_apr: record.newApr,
      };
    }),
  };
  return stakingConfig;
}
async function getUserStakeAccount(
  program: anchor.Program<TarsStakingNftProgram>,
  userAddress: PublicKey
): Promise<UserStakeAccount | null> {
  // console.log("userAddress", userAddress.toBase58());
  let userStakeAccount = await program.account.userStakeInfo.fetchNullable(
    getUserStakeAccountAddress(userAddress)
  );
  if (userStakeAccount == null) return null;
  // console.log(
  //   "got users total points as ",
  //   userStakeAccount.totalPoints.toString(),
  //   userStakeAccount.totalPoints
  // );
  console.log("abc def", {
    // lockin_period: userStakeAccount.lockinPeriod,
    stake_start_time: Number(userStakeAccount.stakingStartTimestamp),
    stake_amount: Number(userStakeAccount.stakeAmount),
    last_synced: Number(userStakeAccount.lastSynced),
    current_apr: Number(userStakeAccount.currentApr),
    total_points: Number(userStakeAccount.totalPoints),
    get_multiplier: getApplicableMultiplier,
  })
  return {
    // lockin_period: userStakeAccount.lockinPeriod,
    stake_start_time: userStakeAccount.stakingStartTimestamp,
    stake_amount: userStakeAccount.stakeAmount,
    last_synced: userStakeAccount.lastSynced,
    current_apr: userStakeAccount.currentApr,
    total_points: userStakeAccount.totalPoints,
    get_multiplier: getApplicableMultiplier,
  };
}
async function getMultiplierAcc(
  program: anchor.Program<TarsStakingNftProgram>
): Promise<MultiplierAccount | null> {
  let multiplierAccount = await program.account.multiplierConfig.fetchNullable(
    getMultiplierAccountAddress()
  );
  if (multiplierAccount == null) return null;
  console.log('multiplierAccount', multiplierAccount)
   
  return {
    //return transformed onchain to client side array
    multiplier_records: multiplierAccount.multiplierRecords.map((record) => {
      return {
        // min_lockin_period: record.minimumLockinPeriod,
        minRewardAge: record.minimumRewardAge,
        multiplier: record.multiplier,
      };
    }),
  };
}

export {
  stakingTarsId,
  stakingDojoId,
  STAKING_CONFIG_ACCOUNT,
  STAKING_STATS_ACCOUNT,
  TAI_PROGRAM_VAULT_ID,
  TAI_AUTHORITY_ID,
  getStakingConfigAcc,
  getApplicableMultiplier,
  getUserStakeAccount,
  getMultiplierAcc,
};
