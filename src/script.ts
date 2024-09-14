import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import tarsIdlStaking from "./contract/idl/dojo_staking_nft_program.json";
import { DojoStakingNftProgram as TarsStakingNftProgram } from "./contract/types/dojo_staking_nft_program";


type UserTiers = {
  tierId: number;
  nftCount: number;
};

type TierTimestamps = { [tierId: number]: anchor.BN[] };

type TierDetails = {
  [tierId: number]: {
    pointsCost: anchor.BN;
    emissionRate: anchor.BN;
    nftCount: number;
    name: string;
    uri: string;
  };
};

function toLeBytes(num: number): Uint8Array {
  if (num < 0 || num > 255) {
    throw new RangeError("The number is out of range for a u8");
  }

  return new Uint8Array([num & 0xff]);
}

function toLeBytes32(num: number): Uint8Array {
  if (num < 0 || num > 0xffffffff) {
    throw new RangeError("The number is out of range for a u32");
  }

  const byteArray = new Uint8Array(4);
  byteArray[0] = num & 0xff;
  byteArray[1] = (num >> 8) & 0xff;
  byteArray[2] = (num >> 16) & 0xff;
  byteArray[3] = (num >> 24) & 0xff;

  return byteArray;
}

export async function getTiersDetails(
  tiersCount: number,
  program: anchor.Program<TarsStakingNftProgram>
) {
  const tiersDetails: TierDetails = {};
  const tierPromises: any = [];

  console.log('program id', program.programId.toBase58())

  for (let i = 1; i <= tiersCount; i++) {
    const [nftTierIndexer] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("nft_tier"), Buffer.from([i])],
      program.programId
    );

    tierPromises.push(
      program.account.nftTierDetails
        .fetch(nftTierIndexer)
        .then((res: any) => {
          tiersDetails[res.nftTier] = {
            pointsCost: res.pointsCost,
            emissionRate: res.emissionRate/31536000,
            nftCount: res.nftCount,
            name: res.name,
            uri: res.uri,
          };
        })
        .catch(() => {})
    );
  }

  await Promise.all(tierPromises);

  return tiersDetails;
}

export async function getUserTiers(
  user: anchor.web3.PublicKey,
  program: anchor.Program<TarsStakingNftProgram>,
  tiersCount: number = 5,
) {
  const userBuffer = Buffer.from(user.toBuffer());
  const userTiers: UserTiers[] = [];

  const tierPromises: any = [];

  for (let i = 1; i <= tiersCount; i++) {
    const [nftTierIndexer] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("nft_tier_indexer"), userBuffer, Buffer.from([i])],
      program.programId
    );

    tierPromises.push(
      program.account.userNftTierTracker
        .fetch(nftTierIndexer)
        .then((res: any) => {
          if (res.nftsMinted > 0) {
            userTiers.push({ tierId: i, nftCount: res.nftsMinted });
          }
        })
        .catch(() => {})
    );
  }

  await Promise.all(tierPromises);

  return userTiers;
}

async function getTiersTimestamps(
  user: anchor.web3.PublicKey,
  userTiers: UserTiers[],
  program: anchor.Program<TarsStakingNftProgram>
): Promise<TierTimestamps> {
  const userBuffer = Buffer.from(user.toBuffer());
  const tierTimestamps: TierTimestamps = {};

  const tierTimestampsPromises = userTiers.map(({ tierId, nftCount }) => {
    const [userNftTimestampTracker] =
      anchor.web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from("user_nft_timestamp_tracker"),
          userBuffer,
          toLeBytes(tierId),
          toLeBytes32(Math.floor(nftCount / 25)),
        ],
        program.programId
      );

    return program?.account?.userNftTimeStampTracker
      .fetch(userNftTimestampTracker)
      .then((res: any) => {
        if (!tierTimestamps[tierId]) tierTimestamps[tierId] = [];
        tierTimestamps[tierId] = res.timeStampMintedAt;
      })
      .catch(() => {});
  });

  await Promise.all(tierTimestampsPromises);

  return tierTimestamps;
}

async function getTiersRewards(
  tiersDetails: TierDetails,
  userTiersTimestamps: TierTimestamps
): Promise<{ [tierId: number]: number }> {
  const tiers = Object.keys(userTiersTimestamps);
  const rewards: { [tierId: number]: number } = {};
  const currentTimestamp = Math.floor(Date.now() / 1000);

  tiers.forEach((tierStr) => {
    const tierId = Number(tierStr);

    rewards[tierId] = 0;

    userTiersTimestamps[tierId].forEach((timestamp) => {
      const timeDifference = currentTimestamp - timestamp;
      rewards[tierId] += timeDifference * tiersDetails[tierId].emissionRate;
    });
  });

  return rewards;
}

export async function calculateReward(
  connection: Connection,
  user: PublicKey,
  tiersCount: number = 5
) {
  //@ts-ignore
  let program = new anchor.Program(tarsIdlStaking as anchor.Idl, {
    connection,
  }) as anchor.Program<TarsStakingNftProgram>;

  const tiersDetails = await getTiersDetails(tiersCount, program);
  console.log("here tiersDetails => ", tiersDetails);

  Object.values(tiersDetails).forEach((tier) => {
    console.log('big number ',tier.pointsCost.toString())
  })

  const userTiers = await getUserTiers(user, program, tiersCount);
  console.log("here userTiers => ", userTiers);

  const userTiersTimestamps = await getTiersTimestamps(
    user,
    userTiers,
    program
  );
  console.log("here tiersTimestamps => ", userTiersTimestamps);

  const tiersRewards = await getTiersRewards(tiersDetails, userTiersTimestamps);
  console.log("here tiersRewards =>", tiersRewards);

  return tiersRewards;

  // const totalReward = Object.values(tiersRewards).reduce(
  //   (acc, value) => acc + value,
  //   0
  // );
  // console.log("totalReward =>", totalReward);
}

// (async () => {
//   await calculateReward(
//     connection,
//     new PublicKey("i3h765SS3M2KvWkdniVWaMjexJQb1EN6WkbqiuepDvE")
//   );
// })();
