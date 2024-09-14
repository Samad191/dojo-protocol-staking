import {
  Connection,
  Keypair,
  PublicKey,
  VersionedTransaction,
  clusterApiUrl,
} from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";

import { TOKEN_PROGRAM_ID, getAssociatedTokenAddress } from "@solana/spl-token";
import { DojoStakingNftProgram as TarsStakingNftProgram } from "./types/dojo_staking_nft_program";
import tarsStakingIDL from "./idl/dojo_staking_nft_program.json";

import {
  stakingTarsId,
  STAKING_CONFIG_ACCOUNT,
  STAKING_STATS_ACCOUNT,
  TAI_PROGRAM_VAULT_ID,
  TAI_AUTHORITY_ID,
  getStakingConfigAcc,
  getMultiplierAccountAddress,
} from "./common";

import { getUserTotalPointsAtCurrentTime } from "./calc_rewards";
import { SOLANA_RPC } from "../utils";
import { getUserTiers } from "../script";

let tx = new anchor.web3.Transaction();

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

let staking_program = null;
const mplCoreId = new PublicKey("CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d");

const SYSTEM_PROGRAM_ID = new PublicKey("11111111111111111111111111111111");

// export const getNftTierAccounts = async (wallet: any) => {
//   try {
//     const provider = await getProvider(wallet);

//     const sender = wallet.publicKey as PublicKey;

//     //@ts-ignore
//     let program = new anchor.Program(
//       tarsStakingIDL as anchor.Idl,
//       provider
//     ) as Program<TarsStakingNftProgram>;

//     const nftTierDetailAccounts = await program.account.nftTierDetails.all();

//     nftTierDetailAccounts.forEach((account: any) => {
//       console.log(`Account Public Key: ${account.publicKey}`);
//       console.log(`Emission Rate: ${account.account.emissionRate}`);
//       console.log(`Name: ${account.account.name}`);
//       console.log(`URI: ${account.account.uri}`);
//     });

//     console.log("nftTierDetailAccounts", nftTierDetailAccounts);

//     const USER_NFT_TRACKER_ACCOUNT = PublicKey.findProgramAddressSync(
//       [
//         Buffer.from(anchor.utils.bytes.utf8.encode("user_nft_tier_tracker")),
//         sender.toBuffer(),
//         //nftTierDetailAccounts[0].publicKey.toBuffer(),
//         toLeBytes(1),
//       ],
//       stakingTarsId
//     )[0];

//     console.log("USER_NFT_TRACKER_ACCOUNT", USER_NFT_TRACKER_ACCOUNT);

//     //@ts-ignore
//     let user_nft_tracker =
//       await program.account.userNftTierTracker.fetchNullable(
//         USER_NFT_TRACKER_ACCOUNT
//       );

//     console.log("user_nft_tracker", user_nft_tracker);
//   } catch (error) {
//     console.log("error in fetching ", error);
//   }
// };

// export const getUserNftTrackerAccount = async (wallet: any) => {
//   try {
//     const provider = await getProvider(wallet);
//     const sender = wallet.publicKey as PublicKey;

//     //@ts-ignore
//     let program = new anchor.Program(
//       tarsStakingIDL as anchor.Idl,
//       provider
//     ) as Program<TarsStakingNftProgram>;

//     const USER_NFT_TRACKER_ACCOUNT = PublicKey.findProgramAddressSync(
//       [
//         Buffer.from(anchor.utils.bytes.utf8.encode("user_nft_tier_tracker")),
//         sender.toBuffer(),
//       ],
//       stakingTarsId
//     )[0];

//     console.log("USER_NFT_TRACKER_ACCOUNT", USER_NFT_TRACKER_ACCOUNT);

//     //@ts-ignore
//     let user_nft_tracker = await program.account.userNftTracker.all(
//       USER_NFT_TRACKER_ACCOUNT
//     );

//     console.log("user_nft_tracker", user_nft_tracker);
//   } catch (error) {
//     console.log("error in fetching ", error);
//   }
// };

// export const getTotalStaked = async (wallet: any) => {
//   try {
//     const provider = await getProvider(wallet);
//     //@ts-ignore
//     let program = new anchor.Program(
//       tarsStakingIDL as anchor.Idl,
//       provider
//     ) as Program<TarsStakingNftProgram>;

//     //@ts-ignore
//     let total_stake_amount = //@ts-ignore
//       (await program.account.stakingStats.fetch(STAKING_STATS_ACCOUNT))
//         .totalStakeAmount;

//     console.log("total_stake_amount", total_stake_amount.toNumber());
//     return total_stake_amount;
//   } catch (e) {
//     console.log("error in fetching ", e);
//   }
// };

export const getUserStaked = async (provider: any, wallet: any) => {
  try {
    // const provider = await getProvider(wallet);
    console.log('provider contract', provider)

    const sender = wallet.publicKey as PublicKey;

    console.log("sender is ", sender);
    console.log('sender is pub key', sender.toBase58())
    //@ts-ignore
    let program = new anchor.Program(
      tarsStakingIDL as anchor.Idl,
      provider
    ) as Program<TarsStakingNftProgram>;

    const USER_STAKE_ACCOUNT = PublicKey.findProgramAddressSync(
      [
        Buffer.from(anchor.utils.bytes.utf8.encode("user_stake")),
        sender.toBuffer(),
      ],
      stakingTarsId
    )[0];

    // @ts-ignore
    let user_stake_amount = //@ts-ignore
      await program.account.userStakeInfo.fetch(USER_STAKE_ACCOUNT);

    console.log("user_stake_amount", {
      totalPoints: user_stake_amount.totalPoints.toString(),
    });
    return user_stake_amount;
  } catch (e) {
    console.log("error in fetching ", e);
  }
};

// export const getUserLockingPeriod = async (wallet: any) => {
//   try {
//     const provider = await getProvider(wallet);
//     //@ts-ignore
//     let program = new anchor.Program(
//       tarsStakingIDL as anchor.Idl,
//       provider
//     ) as Program<TarsStakingNftProgram>;

//     const USER_STAKE_ACCOUNT = PublicKey.findProgramAddressSync(
//       [Buffer.from(anchor.utils.bytes.utf8.encode("user_stake"))],
//       stakingTarsId
//     )[0];

//     //@ts-ignore
//     let user_locking_period = //@ts-ignore
//       (await program.account.userStake.fetch(USER_STAKE_ACCOUNT)).lockingPeriod;

//     console.log("user_locking_period", user_locking_period);
//     return user_locking_period;
//   } catch (e) {
//     console.log("error in fetching ", e);
//   }
// };

export const getUserTokenAccount = async (sender: any) => {
  try {
    const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID: PublicKey = new PublicKey(
      "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
    );

    const tokenMintAddress = new PublicKey(
      "3vmfEaTR9M2Pp5JcFNC8c8u6U4eFUBdq6FQjgPpcnfKS"
    );

    let associatedTokenAddress = PublicKey.findProgramAddressSync(
      [
        sender.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        tokenMintAddress.toBuffer(),
      ],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    )[0];

    console.log("associatedTokenAddress", associatedTokenAddress.toBase58());

    return associatedTokenAddress;
  } catch (error) {
    console.log("error in getUserTokenAccount ", error);
    return new PublicKey("");
  }
};

export const getUserTokenAccount1 = async (sender: any) => {
  try {
    const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID: PublicKey = new PublicKey(
      "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
    );

    const tokenMintAddress = new PublicKey(
      "HTAXC4T8i9w95yLUxn6LfsiXGeZabMU6Lxc19mcr5FCLs"
    );

    let associatedTokenAddress = PublicKey.findProgramAddressSync(
      [
        sender.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        tokenMintAddress.toBuffer(),
      ],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    )[0];

    console.log("associatedTokenAddress", associatedTokenAddress.toBase58());

    return associatedTokenAddress;
  } catch (error) {
    console.log("error in getUserTokenAccount ", error);
    return new PublicKey("");
  }
};


export const convertAmountToLamports = (amount: string) => {
  return new anchor.BN(Number(amount) * 10 ** 9); // 9 decimals
};

export const normalizeAmount = (lamports: number) => {
  return lamports / 10 ** 9;
};

export const stake = async (
  provider: any,
  wallet: any,
  connection: any,
  amount: string,
  lockingPeriod: string
): Promise<string> => {
  console.log("stake function", {
    wallet,
    connection,
    amount,
    lockingPeriod,
  });
  try {
    const sender = wallet.publicKey as PublicKey;

    // const provider = await getProvider(wallet);
    console.log("provider is ", provider);

    let associatedTokenAddress = await getUserTokenAccount(sender);

    let _amount = convertAmountToLamports(amount);

   
    //@ts-ignore
    let program = new anchor.Program(
      tarsStakingIDL as anchor.Idl,
      provider
    ) as Program<TarsStakingNftProgram>;

    console.log('idddddd', program.programId.toBase58())

    const programId = program.programId;
 
let [pda, bump] = PublicKey.findProgramAddressSync(
  [Buffer.from("dojo_stake_vault")],
  programId,
);

  console.log('pdaaaa', pda.toBase58())

console.log(`bump: ${bump}, pubkey: ${pda.toBase58()}`);

    let ix = await program.methods
      .stake(_amount, sender, 
        // Number(lockingPeriod)
      )
      .accounts({
        payer: sender,
        userDojoTokenAcc:associatedTokenAddress,
        // userTaiTokenAcc: associatedTokenAddress, // usually associated token program, spl token assoc token account derivation function
        // taiProgramVaultAcc: TAI_PROGRAM_VAULT_ID,
        tokenProgram: TOKEN_PROGRAM_ID,
        dojoProgramVaultAcc: pda,

      })
      .instruction();

    console.log("ix", ix);

    let tx = new anchor.web3.Transaction();

    tx.add(ix);

    console.log("tx", tx);

    tx.feePayer = sender;
    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    // console.log("simulating ");
    // let logs = await provider.simulate(tx);
    //  console.log("got logs ", logs);
    const signature = await wallet.sendTransaction(tx, connection);
    console.log("sign is ", signature);
    console.log('stake success')
    

    // const latestBlockhash = await connection.getLatestBlockhash(); 
    // console.log("latestBlockhash", latestBlockhash)
    // const confirmation = await connection.confirmTransaction({ signature, blockhash: latestBlockhash.blockhash, lastValidBlockHeight: latestBlockhash.lastValidBlockHeight }, 'finalized');
    // console.log("confirmation abc", confirmation)
    // if(confirmation?.value?.err) {
    //   throw new Error('error')
    // }


    return 'success'
  } catch (e) {
    console.log("stake failed", e);
    // console.log(e.toString())
    return 'error'
  }
};

export const restake = async (
  provider: any,
  wallet: any,
  connection: any,
  amount: string,
  lockingPeriod: number
): Promise<string> => {
  console.log("restake function", {
    wallet,
    connection,
    amount,
    lockingPeriod,
  });
  try {
    // console.clear()
    const sender = wallet.publicKey as PublicKey;
    // const provider = await getProvider(wallet);
    console.log("provider is ", provider);

    let associatedTokenAddress = await getUserTokenAccount(sender);

    let _amount = convertAmountToLamports(amount);

    console.log("_amount", _amount);

    //@ts-ignore
    let program = new anchor.Program(
      tarsStakingIDL as anchor.Idl,
      provider
    ) as Program<TarsStakingNftProgram>;

    const multiplierAccount = getMultiplierAccountAddress();

    console.log("multiplierAccount", multiplierAccount);

    const programId = program.programId;
 
    let [pda, bump] = PublicKey.findProgramAddressSync(
      [Buffer.from("dojo_stake_vault")],
      programId,
    );
    
      console.log('pdaaaa', pda.toBase58())


    //param unstake amount
    //optional type from rust  is null or the value in anchor
    let ix = await program.methods
      .increaseStakeOrLockin(_amount, 
        // Number(lockingPeriod)
      ) //optional locking period)
      .accounts({
        // userTaiTokenAcc: associatedTokenAddress, // usually associated token program, spl token assoc token account derivation function
        // taiProgramVaultAcc: TAI_PROGRAM_VAULT_ID,
        tokenProgram: TOKEN_PROGRAM_ID,
        userAuthoritySigner: sender,
        userDojoTokenAcc:associatedTokenAddress,
        dojoProgramVaultAcc:pda
      })
      .instruction();

    console.log("ix", ix);

    let tx = new anchor.web3.Transaction();

    tx.add(ix);

    console.log("tx", tx);

    tx.feePayer = sender;
    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    // console.log("simulating ");
    // let logs = await provider.simulate(tx);
    // console.log("got logs ", logs);

    const signature = await wallet.sendTransaction(tx, connection);
    console.log("sign is ", signature);
    console.log('re stake success')

    // const latestBlockhash = await connection.getLatestBlockhash(); 
    // console.log("latestBlockhash", latestBlockhash)
    // const confirmation = await connection.confirmTransaction({ signature, blockhash: latestBlockhash.blockhash, lastValidBlockHeight: latestBlockhash.lastValidBlockHeight }, 'finalized');
    // console.log("confirmation abc", confirmation)
    // if(confirmation?.value?.err) {
    //   throw new Error('error')
    // }

    return 'success'
  } catch (e) {
    console.log('re stake failed')
    console.log("error is e", e);
    return 'error'
  }
};

export const claimNFT = async (provider: any, wallet: any, tierId: number) => {
  try {
    // const provider = await getProvider(wallet);
    const sender = wallet.publicKey as PublicKey;

    const userAuthoritySigner = provider.wallet.publicKey;

    //@ts-ignore
    let program = new anchor.Program(
      tarsStakingIDL as anchor.Idl,
      provider
    ) as Program<TarsStakingNftProgram>;

    const STAKE_CONFIG_SEED = [Buffer.from("dojo_stake_config")];

    const USER_STAKE_ACCOUNT_SEED = [
      Buffer.from("user_stake"),
      Buffer.from(userAuthoritySigner.toBuffer()),
    ];

    const MULTIPLIER_ACC_SEED = [Buffer.from("multiplier_acc")];

    const NFT_TIER_SEED = [Buffer.from("nft_tier"), Buffer.from([tierId])];

    const STAKING_STATS_SEED = [Buffer.from("staking_stats")];

    const USER_NFT_TIER_TRACKER_SEED = [
      Buffer.from("nft_tier_indexer"),
      Buffer.from(provider.wallet.publicKey.toBuffer()),
      Buffer.from([tierId]),
    ];

    const STAKING_CONFIG_ACCOUNT = PublicKey.findProgramAddressSync(
      STAKE_CONFIG_SEED,
      stakingTarsId
    )[0];

    const USER_STAKE_ACCOUNT = PublicKey.findProgramAddressSync(
      USER_STAKE_ACCOUNT_SEED,
      stakingTarsId
    )[0];

    const STAKING_STATS_ACCOUNT = PublicKey.findProgramAddressSync(
      STAKING_STATS_SEED,
      stakingTarsId
    )[0];

    const MULTIPLIER_ACCOUNT = PublicKey.findProgramAddressSync(
      MULTIPLIER_ACC_SEED,
      stakingTarsId
    )[0];

    const NFT_TIER_ACCOUNT = PublicKey.findProgramAddressSync(
      NFT_TIER_SEED,
      stakingTarsId
    )[0];

    const USER_NFT_TIER_TRACKER_ACCOUNT = PublicKey.findProgramAddressSync(
      USER_NFT_TIER_TRACKER_SEED,
      stakingTarsId
    )[0];

    const NFT_COLLECTION_SEED = [
      Buffer.from("nft_collection"),
      Buffer.from([tierId]),
    ];

    const userTiers = await getUserTiers(provider.wallet.publicKey, program);
    const userTier = userTiers.find((tier: any) => tier.tierId === tierId);
    const nftMinted = userTier ? userTier.nftCount : 0;

    console.log('nft minted', tierId, nftMinted)
    console.log('user tiers', userTiers)

    const USER_NFT_TIMESTAMP_TRACKER_SEED = [
      Buffer.from("user_nft_timestamp_tracker"),
      Buffer.from(provider.wallet.publicKey.toBuffer()),
      Buffer.from([tierId]),
      toLeBytes32(Math.floor(nftMinted / 25)),
    ];

    const NFT_ASSET_SEED = [
      Buffer.from("nft_asset"),
      Buffer.from(provider.wallet.publicKey.toBuffer()),
      Buffer.from([tierId]),
      toLeBytes32(nftMinted + 1),
    ];

    const USER_NFT_TIMESTAMP_TRACKER = PublicKey.findProgramAddressSync(
      USER_NFT_TIMESTAMP_TRACKER_SEED,
      stakingTarsId
    )[0];

    const ASSET_ACCOUNT = PublicKey.findProgramAddressSync(
      NFT_ASSET_SEED,
      stakingTarsId
    )[0];

    const COLLECTION_ACCOUNT = PublicKey.findProgramAddressSync(
      NFT_COLLECTION_SEED,
      stakingTarsId
    )[0];

    console.log("accounts: ", {
      payer: sender.toBase58(),
      taiAuthorityAcc: TAI_AUTHORITY_ID.toBase58(),
      logWrapper: null,
      stakingConfigAccount: STAKING_CONFIG_ACCOUNT.toBase58(),
      userStakeAccount: USER_STAKE_ACCOUNT.toBase58(),
      stakingStatsAccount: STAKING_STATS_ACCOUNT.toBase58(),
      nftTierAccount: NFT_TIER_ACCOUNT.toBase58(),
      userNftTierTracker: USER_NFT_TIER_TRACKER_ACCOUNT.toBase58(),
      userNftTimestampTracker: USER_NFT_TIMESTAMP_TRACKER.toBase58(),
      mplCore: mplCoreId.toBase58(),
      asset: ASSET_ACCOUNT.toBase58(),
      userAuthoritySigner: sender,
      multiplierAcc: MULTIPLIER_ACCOUNT.toBase58(),
      collection: COLLECTION_ACCOUNT.toBase58(),
      systemProgram: SYSTEM_PROGRAM_ID.toBase58(),
    });
console.log("tierId", tierId)
    let ix = await program.methods
      .redeemNft(new anchor.BN(tierId))
      .accountsStrict({
        payer: sender,
        stakingConfigAccount: STAKING_CONFIG_ACCOUNT,
        userStakeAccount: USER_STAKE_ACCOUNT,
        userAuthoritySigner: sender,
        dojoAuthorityAcc:TAI_AUTHORITY_ID,
        stakingStatsAccount: STAKING_STATS_ACCOUNT,
        multiplierAcc: MULTIPLIER_ACCOUNT,
        nftTierAccount: NFT_TIER_ACCOUNT,
        userNftTierTracker: USER_NFT_TIER_TRACKER_ACCOUNT,
        userNftTimestampTracker: USER_NFT_TIMESTAMP_TRACKER,
        asset: ASSET_ACCOUNT,
        collection: COLLECTION_ACCOUNT,
        systemProgram: SYSTEM_PROGRAM_ID,
        logWrapper: null,
        mplCore: mplCoreId,
      })
      .instruction();

    const tx = new anchor.web3.Transaction();

    tx.add(ix);

    tx.feePayer = sender;
    tx.recentBlockhash = (
      await provider.connection.getLatestBlockhash()
    ).blockhash;

    const signature = await wallet.sendTransaction(tx, provider.connection);
    //     let logs = await provider.simulate(tx);
    //  console.log("got logs ", logs);
    console.log("sign is ", signature);
    return 'success';
  } catch (error) {
    console.log(error);
    console.log("simulating", error);
    return 'error';
  }
};

export const unstake = async (provider: any, wallet: any, connection: any, amount: any) => {
  try {
    const sender = wallet.publicKey as PublicKey;
    // const provider = await getProvider(wallet);

    //@ts-ignore
    let program = new anchor.Program(
      tarsStakingIDL as anchor.Idl,
      provider
    ) as Program<TarsStakingNftProgram>;

    const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID: PublicKey = new PublicKey(
      "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
    );

    const tokenMintAddress = new PublicKey(
      "3vmfEaTR9M2Pp5JcFNC8c8u6U4eFUBdq6FQjgPpcnfKS"
    );

    let associatedTokenAddress = PublicKey.findProgramAddressSync(
      [
        sender.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        tokenMintAddress.toBuffer(),
      ],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    )[0];

    const programId = program.programId;
 
let [pda, bump] = PublicKey.findProgramAddressSync(
  [Buffer.from("dojo_stake_vault")],
  programId,
);

let _amount = convertAmountToLamports(amount);


    //param unstake amount
    let ix = await program.methods
      .unstake(new anchor.BN(_amount))
      .accounts({
        // userTaiTokenAcc: associatedTokenAddress, // usually associated token program, spl token assoc token account derivation function
        // taiProgramVaultAcc: TAI_PROGRAM_VAULT_ID,
userDojoTokenAcc:associatedTokenAddress,
dojoProgramVaultAcc:pda,
        tokenProgram: TOKEN_PROGRAM_ID,
        userAuthoritySigner: sender,
        // taiAuthorityAcc: TAI_AUTHORITY_ID,
        dojoAuthorityAcc:TAI_AUTHORITY_ID
      })
      .instruction();

    let tx = new anchor.web3.Transaction();

    tx.add(ix);

    console.log("tx", tx);

    tx.feePayer = sender;
    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    // console.log("simulating ");
    // let logs = await provider.simulate(tx);
    //  console.log("got logs ", logs);
    const signature = await wallet.sendTransaction(tx, connection);
    console.log("sign is ", signature);
    // const signatureStatus = await connection.getSignatureStatus(signature)
    // console.log("signatureStatus", signatureStatus)


    // const latestBlockhash = await connection.getLatestBlockhash(); 

    // console.log("latestBlockhash", latestBlockhash)

    // const confirmation = await connection.confirmTransaction({ signature, blockhash: latestBlockhash.blockhash, lastValidBlockHeight: latestBlockhash.lastValidBlockHeight }, 'finalized');

    // console.log("confirmation abc", confirmation)
    // if(confirmation?.value?.err){
    //   throw new Error("Error")
    // }


    return 'success'

    //.signers(); // incase the payer is not the authority of all the acc passed and an external signature is needed
  } catch (e) {
    console.log("error is e", e);
    return 'error'
  }
};

export const dummy = async (provider: any, wallet: any) => {
  try{
  let totalPoints = await getUserTotalPointsAtCurrentTime(provider, wallet);
  console.log("total points", totalPoints);
  return totalPoints;
}catch(e){
  console.log("err :", e)
  return "0";
}
};
// export const getUserTotalPoints = async (provider: any, wallet: any) => {
//   try {
//     let totalPoints = await getUserTotalPointsAtCurrentTime(provider, wallet);
//     // console.log("totalPoints", totalPoints);

//     return totalPoints;
//   } catch (error) {
//     console.log("error in getUserTotalPoints ", error);
//     return 0;
//   }
// };

// export const restake = async (wallet: any, connection: any, amount: any) => {
//   try {
//     const sender = wallet.publicKey as PublicKey;
//     const provider = await getProvider(wallet);
//     //@ts-ignore
//     const program_tars = new anchor.Program(
//       tarsStakingIDL as anchor.Idl
//     ) as anchor.Program<TarsStakingNftProgram>;
//     let tx = new anchor.web3.Transaction();
//     //param unstake amount
//     //optional type from rust  is null or the value in anchor
//     let ix = await program_tars.methods
//       .increaseStakeOrLockin(new anchor.BN(1000), null) //optional lockin period)
//       .accounts({
//         userTaiTokenAcc: RANDOM_KEY, // usually associated token program, spl token assoc token account derivation function
//         taiProgramVaultAcc: TAI_PROGRAM_VAULT_ID,
//         tokenProgram: TOKEN_PROGRAM_ID,
//         userAuthoritySigner: sender,
//         multiplierAcc: RANDOM_KEY, //find the closest multiplier acc if lockin period is >30 < 180 then multiplier 1 acc, if >180 <365 multiplier 2 acc and if >365 and multiplier 4 acc, replace random key with the respective acc
//       })
//       .instruction();
//     //.signers(); // incase the payer is not the authority of all the acc passed and an external signature is needed
//   } catch (e) {
//     console.log("error is e", e);
//   }
// }; 
 
// export async function getProvider(wallet: anchor.Wallet) {
//   const opts = {
//     preflightCommitment: "processed",
//   } as any;
//   /* create the provider and return it to the caller */
//   /* network set to local network for now */
//   // console.log("connection");
//   // const network = "https://api.devnet.solana.com";

//   // const network = 'https://devnet.genesysgo.net/';
//   // const connection = new Connection(
//   //   "https://mainnet.helius-rpc.com/?api-key=571874a6-e07b-4be4-8296-e7329c31cc66",
//   //   opts.preflightCommitment
//   // );
//   const connection = new Connection(SOLANA_RPC, opts.preflightCommitment);

//   const provider = new anchor.AnchorProvider(
//     connection,
//     wallet,
//     opts.preflightCommitment
//   );

//   // console.log("provider ankr", provider);
//   return provider;
// }

export function convert(n: any) {
  var sign = +n < 0 ? "-" : "",
    toStr = n.toString();
  if (!/e/i.test(toStr)) {
    return n;
  }
  var [lead, decimal, pow] = n
    .toString()
    .replace(/^-/, "")
    .replace(/^([0-9]+)(e.*)/, "$1.$2")
    .split(/e|\./);
  return +pow < 0
    ? sign +
        "0." +
        "0".repeat(Math.max(Math.abs(pow) - 1 || 0, 0)) +
        lead +
        decimal
    : sign +
        lead +
        (+pow >= decimal.length
          ? decimal + "0".repeat(Math.max(+pow - decimal.length || 0, 0))
          : decimal.slice(0, +pow) + "." + decimal.slice(+pow));
}
