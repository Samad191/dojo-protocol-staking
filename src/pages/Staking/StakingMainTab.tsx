import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import StakeTabs from './StakeTabs'
import Stake from './Stake'
import Reward from './Reward'
import Unstake from './Unstake'
import { useWallet } from '@solana/wallet-adapter-react'
import { SOLANA_RPC } from '../../utils'
import { Connection, PublicKey } from '@solana/web3.js'
import { getUserStaked, getUserTokenAccount } from '../../contract'
// import { getUserStaked, getUserTokenAccount } from '../../contract'

// const StakingMainTab = () => {
  const StakingMainTab = ({  
    connection, 
    provider,
    stakingTabs, setStakingTabs, mainTab }: any) => {

  // const [stakingTabs, setStakingTabs] = useState(0)
  const [tokenBalance, setTokenBalance] = useState<number>(0);
  const [stakedAmount, setStakedAmount] = useState<string>("0");
  const [totalPoints, setTotalPoints] = useState<string>("0");
  const [firstTimeStaked, setFirstTimeStaked] = useState<boolean>(true);
  const [stakeStartTimeStamp, setStakeStartTimeStamp] = useState<string>("0");
  const [lockingPeriod, setLockingPeriod] = useState<string | null>(null);
  
  const handleStakeTabChange = (value: number) => {
    setStakingTabs(value)
  }
  const { publicKey, connected, disconnecting } = useWallet();
  const wallet = useWallet();

  
  const opts = {
    preflightCommitment: "processed",
  } as any;

  // const connection = new Connection(
  //   "https://mainnet.helius-rpc.com/?api-key=571874a6-e07b-4be4-8296-e7329c31cc66",
  //   opts.preflightCommitment
  // );

  // const connection = new Connection(SOLANA_RPC, opts.preflightCommitment);


  useEffect(() => {
    (async () => {
      try {
        console.log('xord listener', publicKey?.toBase58())
        if (publicKey && wallet && connection && connected) {
          // console.log("publicKey", publicKey.toBase58());
          let solBalance = await connection.getBalance(publicKey);

          // console.log("solBalance", solBalance);

          let associatedTokenAddress = await getUserTokenAccount(
            wallet.publicKey
          );

          let tokenBalance = await connection.getTokenAccountBalance(
            associatedTokenAddress
          );
          console.log("tokenBalance", tokenBalance.value.uiAmount);
          setTokenBalance(tokenBalance.value.uiAmount || 0);
          console.log('xord 333333', connected)
        }
      } catch (error) {
        console.log("error", error);
        setTokenBalance(0);
        // alert('4')
        console.log('xord 444444')
      }
    })();
  }, [publicKey?.toBase58(), connected, provider]);

  const updateStakedAmount = async () => {
    let userStakeInfo = await getUserStaked(provider ,wallet);
   
    if (userStakeInfo?.stakeAmount) {
      const newAmount = (userStakeInfo.stakeAmount / 10 ** 9).toString();
      console.log("new staked amount blah blah", newAmount)
      setStakedAmount(newAmount);
    }
  }

  useEffect(() => {
    (async () => {
      console.log('public key changed', publicKey?.toBase58())
      console.log('new console', connected, disconnecting)
      if(!connected) {
        console.log('xord 22222222')
        setLockingPeriod('30')
        setStakedAmount('0')
        setTokenBalance(0)
        return;
      }
      else if (connected) {
        console.log('public key and wallet listener running', provider)
        let userStakeInfo = await getUserStaked(provider, wallet);
        console.log("userStakeInfo", userStakeInfo);
        console.log('test start time stamp', userStakeInfo?.stakingStartTimestamp.toString())
        console.log('test current time stamp', Date.now())
        // console.log('test locking period', userStakeInfo?.lockinPeriod)

        console.log('test minus', Date.now() - userStakeInfo?.stakingStartTimestamp.toString())


        // if(userStakeInfo) {
        //   const diff = getDifferenceInDays(userStakeInfo?.stakingStartTimestamp.toString(), Date.now())
        //   const res = userStakeInfo?.lockinPeriod - diff;
        //   console.log('test difference res', res)
        // }

        if (userStakeInfo) {
          // console.log('first time stake', false)
          setFirstTimeStaked(false);
        } else {
          // console.log('first time stake', true)
          setFirstTimeStaked(true);
        }

        if(userStakeInfo?.stakingStartTimestamp){
          setStakeStartTimeStamp(userStakeInfo.stakingStartTimestamp.toString())
        }

        // if (userStakeInfo?.lockinPeriod) {
        //   // lockinPeriod is 35 then make it 30
        //   if (userStakeInfo.lockinPeriod === 35) {
        //     setLockingPeriod("30");
        //   } else setLockingPeriod(userStakeInfo.lockinPeriod.toString());
        // }

        if (userStakeInfo?.totalPoints) {
          // setTotalPoints(userStakeInfo.totalPoints.toString());
        }

        if (userStakeInfo?.stakeAmount) {
          setStakedAmount((userStakeInfo.stakeAmount / 10 ** 9).toString());
        }
        else if(!userStakeInfo) {
          setStakedAmount('0')
        }
      }
    })();
  }, [connected, publicKey, provider]);

  // Function to listen for token account balance changes
async function listenForTokenBalanceChanges(walletPublicKey: PublicKey) {
  // const associatedTokenAddress = await getAssociatedTokenAddress(
  //     walletPublicKey,
  //     tokenMintAddress
  // );
  let associatedTokenAddress = await getUserTokenAccount(
    wallet.publicKey
  );

  console.log("in new blah bah", {associatedTokenAddress: associatedTokenAddress.toBase58()})

  connection?.onAccountChange(
      associatedTokenAddress,
      async (accountInfo: any, context: any) => {
          
        // balance update
        const tokenBalance = await connection.getTokenAccountBalance(associatedTokenAddress);
          console.log('in new blah bah Token balance updated:', tokenBalance.value.uiAmount);
          setTokenBalance(tokenBalance.value.uiAmount || 0);

          // staked amount update
          await updateStakedAmount()
          console.log('in new blah bah StaKED AMOUNT updated');
      }
  );
}

useEffect(()=>{
  if(publicKey){
  try{
    listenForTokenBalanceChanges(publicKey)
  }catch(e){
    console.log("error in balance update listener", e)
  }
}
},[publicKey])

  const updateBalance = async () => {
    let associatedTokenAddress = await getUserTokenAccount(
      wallet.publicKey
    );

    console.log("in old blah bah", {associatedTokenAddress: associatedTokenAddress.toBase58()})

    let tokenBalance = await connection.getTokenAccountBalance(
      associatedTokenAddress
    );
    console.log("in old blah bah Token balance updated", tokenBalance.value.uiAmount);
    // alert('idhar 1')
    console.log('xord 111111')
    setTokenBalance(tokenBalance.value.uiAmount || 0);

      let userStakeInfo = await getUserStaked(provider, wallet);
      console.log("userStakeInfo", userStakeInfo);
      // console.log('userStakeInfo time', userStakeInfo?.stakingStartTimestamp.toString())

      if (userStakeInfo) {
        // console.log('first time stake', false)
        setFirstTimeStaked(false);
      } else {
        // console.log('first time stake', true)
        setFirstTimeStaked(true);
      }

      if(userStakeInfo?.stakingStartTimestamp){
        setStakeStartTimeStamp(userStakeInfo.stakingStartTimestamp.toString())
      }

      // if (userStakeInfo?.lockinPeriod) {
      //   // lockinPeriod is 35 then make it 30
      //   if (userStakeInfo.lockinPeriod === 35) {
      //     setLockingPeriod("30");
      //   } else setLockingPeriod(userStakeInfo.lockinPeriod.toString());
      // }

      if (userStakeInfo?.totalPoints) {
        // setTotalPoints(userStakeInfo.totalPoints.toString());
      }

      if (userStakeInfo?.stakeAmount) {
        setStakedAmount((userStakeInfo.stakeAmount / 10 ** 9).toString());
      }
    
  }
  console.log("stakingTabs", stakingTabs)

  return (
    <Box width='100%'>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
        my={2}
      >
        <Typography
          fontSize={'24px'}
          fontWeight={400}
          lineHeight={'36px'}
          fontFamily={'Bruno Ace'}
          color='rgba(255, 255, 255, 1)'
          mb={'12px'}
        >
          
          {
            stakingTabs === 0 ?
          "Stake DOAI" : stakingTabs === 1 ? "GPU Points" : "Unstake DOAI"
          }
        </Typography>
        <Typography
          fontSize={'14px'}
          fontWeight={400}
          lineHeight={'21px'}
          fontFamily={'Inter'}
          color='rgba(255, 255, 255, 0.5)'
        >
          {stakingTabs === 0 ?
          "Select how much DOAI you want to stake" : stakingTabs === 1 ? "Redeem your rewards" : "Select how much DOAI you want to unstake"
          }
        </Typography>
      </Box>
      <Box
        sx={{
          border: '1px solid',
          borderImageSource:
            'linear-gradient(119.94deg, #13C378 0%, #38383C 21.46%)',
          borderImageSlice: 1,
          padding: '8px',
          backgroundColor: '#000000',
        }}
      >
        <StakeTabs handleTabChange={handleStakeTabChange} tab={stakingTabs} />

        {stakingTabs === 0 && <Stake
        connection={connection}
        provider={provider}
          tokenBalance={tokenBalance}
          contractLockingPeriod={lockingPeriod}
          firstTimeStaked={firstTimeStaked}
          stakeStartTimeStamp={stakeStartTimeStamp}
          updateBalance={updateBalance}
        />}
        {stakingTabs === 1 && <Reward provider={provider} mainTab={mainTab} />}
        {stakingTabs === 2 && <Unstake
         connection={connection}
        provider={provider}
           lockingPeriod={lockingPeriod}
           firstTimeStaked={firstTimeStaked}
           stakedAmount={stakedAmount}
           updateStakedAmount={updateStakedAmount}
        />}
      </Box>
    </Box>
  )
}

export default StakingMainTab
