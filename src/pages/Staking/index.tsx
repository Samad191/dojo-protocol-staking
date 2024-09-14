import { Box, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MainTabs from './MainTabs'
import { HeroBackground, HeroMobileBackground } from '../../assets'
import StakingMainTab from './StakingMainTab'
import Image from '../../components/common/Image'
import GPUTab from './GPUTab'
import { useWallet } from '@solana/wallet-adapter-react'
import { Connection } from '@solana/web3.js'
import { SOLANA_RPC } from '../../utils'
import { Provider } from '@coral-xyz/anchor'
import * as anchor from "@coral-xyz/anchor";

const Staking = () => {
  const [mainTab, setMainTab] = useState(0)
  const isDown1000 = useMediaQuery('(max-width:1000px)')
  const [stakingTabs, setStakingTabs] = useState(0)

  const [rootConnection, setRootConnection] = useState<Connection>();
  const [rootProvider, setRootProvider] = useState<anchor.AnchorProvider | undefined>()

  // const { publicKey } = useWallet();
  const wallet: any = useWallet()
  const { publicKey } = wallet;
  console.log('idhar dekh', publicKey?.toBase58())

  useEffect(() => {
    if(publicKey) {
      const opts = {
        preflightCommitment: "processed",
      } as any;

      const connection = new Connection(SOLANA_RPC);
      setRootConnection(connection);


      const provider = new anchor.AnchorProvider(
        connection,
        wallet,
        opts.preflightCommitment
      );
      console.log('root', provider)
      setRootProvider(provider)
     
    }
  }, [publicKey])
  

  const handleMainTabChange = (value: number) => {
    console.log('main tab', value)
    setMainTab(value)
  }


  const handleGoToNft = (value: number, tierNo: number) => {
    console.log('handle go to nft', value, tierNo)
    setMainTab(value)
    setStakingTabs(1)
    // setMainTab(1)
  }

  const handleStakeTabChange = (value: number) => {
    setStakingTabs(value)
  }
  const isDown767 = useMediaQuery('(max-width:767px)')

  const isDown600 = useMediaQuery('(max-width:600px)')

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: '100%',
        marginTop: isDown1000 ? '0px' : '50px',
        borderTop: isDown1000 ? '0.5px solid rgba(255, 255, 255, 0.2)' : 'none',
      }}
    >
      <Image
        src={isDown1000 ? HeroMobileBackground : HeroBackground}
        alt='hero background'
        loading='lazy'
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          objectFit: isDown1000 ? 'cover' : 'contain',
          zIndex: -1,
        }}
      />
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            width: isDown600 ? '90%' : '500px',
          }} 
        >
          <MainTabs handleTabChange={handleMainTabChange} tab={mainTab} />

          {mainTab === 0 && <StakingMainTab 
          connection={rootConnection}
          provider={rootProvider}
          stakingTabs={stakingTabs} setStakingTabs={setStakingTabs} mainTab={mainTab} />}
          {mainTab === 1 && <GPUTab connection={rootConnection} handleMainTabChange={handleGoToNft} />}
        </Box>
      </Box>
    </Box>
  )
}

export default Staking
