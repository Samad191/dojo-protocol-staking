import { Box, Button, Skeleton, Stack, Typography, useMediaQuery } from '@mui/material'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import {
  BlueNodeAnimation,
  GoldNodeAnimation,
  GreenNodeAnimation,
  IridescenceNodeAnimation,
  RedNodeAnimation,
} from '../../assets'
import './styles.css'
import { claimNFT, dummy, normalizeAmount } from '../../contract'
import { useEffect, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { Connection } from '@solana/web3.js'
import { SOLANA_RPC } from '../../utils'
import { calculateReward, getTiersDetails } from '../../script'
import * as anchor from "@coral-xyz/anchor";
import tarsIdlStaking from '../../contract/idl/dojo_staking_nft_program.json'
import { DojoStakingNftProgram as TarsStakingNftProgram } from '../../contract/types/dojo_staking_nft_program'
import OutOfCreditsPopUp from '../../components/common/popup'
import WalletModal from '../../components/WalletModal'

let animationsArray = [
  GoldNodeAnimation,
  RedNodeAnimation,
  GreenNodeAnimation,
  BlueNodeAnimation,
  IridescenceNodeAnimation,
]

let animationsArrayWithText = [
  {
    price: 15000,
    pays: "5,000",
    animation: GoldNodeAnimation,
  },
  {
    price: 35000,
    pays: "10,000",
    animation: RedNodeAnimation,
  },
  {
    price: 60000,
    pays: " 20,000",
    animation: GreenNodeAnimation,
  },
  {
    price: 100000,
    pays: "50,000",
    animation: BlueNodeAnimation,
  },
  {
    price: 250000,
    pays: "100,000",
    animation: IridescenceNodeAnimation,
  },
];

const Reward = ({ provider, mainTab }: any) => {
  console.log('handle reward main tab', mainTab)
  let carouselItems = []
  const [reward, setReward] = useState<any>(0);
  const [claimRes, setClaimRes] = useState('')
  const [currentItem, setCurrentItem] = useState(mainTab || 0);
  const [carouselFix, setCarouselFix] = useState(false)
  const [walletModal, setWalletModal] = useState(false)

  const { publicKey } = useWallet();
  const wallet = useWallet()

  useEffect(() => {
    if (publicKey) {
      setWalletModal(false)
    }
  }, [publicKey])

  useEffect(() => {
    if (publicKey && wallet) {
      (async () => {
        // const connection = new Connection(SOLANA_RPC);
        // const tiersRewards = await calculateReward(connection, publicKey);
        // let program = new anchor.Program(tarsIdlStaking as anchor.Idl, {
        //   connection,
        // }) as unknown as anchor.Program<TarsStakingNftProgram>;
        
        // const tierDetail: any = await getTiersDetails(8, program)
        
        // console.log('tierDetails', tierDetail)
       
        // tierDetail.length > 0 && tierDetail.map((tier: any) => {
        //   console.log('tier aaa', tier)
        // })

        // const tiers = Object.keys(tierDetail).map((key) => Number(key))
        // console.log('tiers aaa', tiers)

        // const tiersB = Object.values(tierDetail).map((key: any) => key.pointsCost.toString())
        // console.log('tiers bbb', tiersB)

        // tiersB.map((tier: any) => {
        //   const normal = normalizeAmount(tier)
        //   console.log('normal amount', normal)
        // })

        // console.log('xyz', normalizeAmount(tiersB[0]))

        const stakingReward = await dummy(provider, wallet)
        console.log("stakingReward", stakingReward)
        setReward(stakingReward);
      })();
    } else {
      setReward(0)
    }
  }, [publicKey]);

  //array of 3 items
  carouselItems = Array.from({ length: 3 }).fill('')

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 3000, min: 1860 },
      items: 1,
    },
    largeDesktop: {
      breakpoint: { max: 1860, min: 1600 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 1600, min: 1380 },
      items: 1,
    },
    smallDesktop: {
      breakpoint: { max: 1380, min: 1204 },
      items: 1,
    },
    largeTablet: {
      breakpoint: { max: 1204, min: 1070 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1070, min: 1000 },
      items: 1,
    },
    smallTablet: {
      breakpoint: { max: 1000, min: 700 },
      items: 1,
    },
    largeMobile: {
      breakpoint: { max: 700, min: 500 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 500, min: 350 },
      items: 1,
    },
    smallMobile: {
      breakpoint: { max: 350, min: 0 },
      items: 1,
    },
  }

  const handlePopUp = () => {
    setClaimRes('');
  };

  const handleClaimNft = async () => {
if(!publicKey){
  setWalletModal(true)
  return;
}
    const res = await claimNFT(provider, wallet, currentItem + 1)
      setClaimRes(res)
  }
console.log("currentItem < ", {currentItem, carouselFix})
  return (
    <Box
      sx={{
        backgroundColor: '#000',
        my: '10px',
      }}
    >
      <Box sx={{ 
        mb: 2,
        // "& .react-multiple-carousel__arrow--left":"3px solid yellow"
        }}>
        <Carousel
          responsive={responsive}
          autoPlay={false}
          infinite={true}
          ssr={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          transitionDuration={500}
          arrows={true}
          
          beforeChange={(previousSlide, state) => {
            console.log('hi previous slide', previousSlide, state.currentSlide, currentItem)
            setCarouselFix(false)    
            if(state.currentSlide == 7) {
              console.log("hi previous slide mark1")
              // setCurrentItem(0)
            } else if (state.currentSlide == 1) {
              console.log("hi previous slide mark2")
              // setCurrentItem(4)
            } else if (state.currentSlide == 0) {
              console.log("hi previous slide mark3")
              // setCurrentItem(0)
              setCarouselFix(true)
            }
            else {
              console.log("hi previous slide mark4")
              // setCurrentItem(state.currentSlide - 2)
            }
            
            if(previousSlide<state.currentSlide){
              
              if(previousSlide === 1){
                setCurrentItem(4)    
              }else if(previousSlide === 0){
                setCurrentItem(3)
              }else{
              setCurrentItem(previousSlide - 2)  
            }
            }
            else if(state.currentSlide === 6){
              setCurrentItem(0)
            }else{
            setCurrentItem(state.currentSlide - 1)
          }
            console.log("hi previous slide state.currentSlide - 2", state.currentSlide - 1)

          }}
        >
          {animationsArrayWithText.map((animation, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <RenderCard animation={animation}  index={carouselFix ? 0 : index} />
            </Box>
          ))}
        </Carousel>
      </Box>

      {claimRes && (
            <OutOfCreditsPopUp handlePopUp={handlePopUp} stakeRes={claimRes} name={'Redeem'} />
          )}


      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
                <Typography
          fontSize={"16px"}
          fontWeight={500}
          lineHeight={"21px"}
          fontFamily={"Inter"}
          color="rgba(255, 255, 255, 1)"
          mb={1}
        >
          Price:{" "}
          <span
            style={{
              color: "rgba(134, 60, 255, 1)",
              fontFamily: "Inter",
              fontWeight: 600,
            }}
          >
            {animationsArrayWithText[currentItem]?.price.toLocaleString()}
            {"  "}
          </span>{" "}
          POINTS
        </Typography>
        
<Stack direction={"row"} >
        <Typography
          fontSize={'14px'}
          lineHeight={'21px'}
          mb={2}
          fontWeight={400}
          fontFamily={'Inter'}
          color='rgba(255, 255, 255, 0.5)'
          style={{marginRight:"5px"}}
        >
          Your Reward Balance:{' '}
          
        </Typography>
        {
            reward || !publicKey ? (
          <Typography
          fontSize={'14px'}
          lineHeight={'21px'}
          mb={2}
            style={{
              color: 'rgba(164, 62, 255, 1)',
              fontFamily: 'Inter',
              fontWeight: 400,
            }}
          >
            {!publicKey ? 'N/A' : Number(reward) === 0 ? "0" : reward.toLocaleString('en', { minimumFractionDigits: 6 }) || '0'}
          </Typography>
          ) : (
            <Skeleton variant="rectangular" width={60} height={20} />
          )
          }
</Stack>
        <Button
          variant='contained'
          sx={{
            outline: 'none',
            boxShadow: 'none',
            border: 'none',
            borderRadius: '30px',
            fontSize: '24px',
            textTransform: 'none',
            overflow: 'hidden',
            background:
              'linear-gradient(88.75deg, #1EFB9C -6.85%, #9845FF 106.9%)',
            height: '47px',
            width: '183px',
            '&:hover': {
              opacity: 0.9,
              backgroundColor: '#72AFF2',
            },
            '&:disabled': {
              background: "rgb(51, 51, 51)",
              opacity: 0.5,

              cursor: "not-allowed !important",
            },
          }}    
          onClick={() => handleClaimNft()}
          disabled={!publicKey ? false : reward < animationsArrayWithText[currentItem].price ? true : false}
          //  reward ? reward < animationsArrayWithText[currentItem].price : true}

          // disabled={(!publicKey) ? false : true}
          
        >
          <Typography
            fontSize={'16px'}
            fontWeight={600}
            lineHeight={'24px'}
            fontFamily={'Inter'}
            color='rgba(255, 255, 255, 1)'
          >
            {publicKey ? "Redeem" : "Connect Wallet"}
          </Typography>
        </Button>
      </Box>
      <WalletModal open={walletModal} setOpen={setWalletModal} />
    </Box>
  )
}

const RenderCard = ({ animation, index }: any) => {
  const isDown1000 = useMediaQuery('(max-width:1000px)')
  const isDown600 = useMediaQuery('(max-width:600px)')
  return (
    <Box
      sx={{
        background: 'linear-gradient(119.94deg, #13C378 0%, #38383C 21.46%)',
        position: 'relative',
        width: '95%',
        height: '180px',
        cursor: 'pointer',
        clipPath:
          'polygon(0% 0%, calc(100% - 1.5rem) 0%, 100% 20%, 100% 80%, 100% 100%, 1.5rem 100%, 0% calc(100% - 1.5rem), 0 0)',
        '& > .childBox': {
          clipPath:
            'polygon(0% 0%, calc(100% - 1.5rem) 0%, 100% 20%, 100% 80%, 100% 100%, 1.5rem 100%, 0% calc(100% - 1.5rem), 0 0)',
          background: '#000000',
          width: 'calc(100% - 2px)',
          height: 'calc(100% - 2px)',
          position: 'absolute',
          left: '1px',
          top: '1px',
        },
      }}
    >
      <Box
        className='childBox'
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: '100%',
          // border:"2px solid red"

        }}
      >
        <Box
          sx={{
            flex: '0 0 40%',
            height: '100%',
            position: 'relative',
            // border:"3px solid yellow"
          }}
        >
           {/* <img
            src={animation.animation}
            style={{
              height: "100%",
              width: "100%",
            }}
          /> */}
          <video
            loop
            muted
            playsInline
            autoPlay
            style={{
              height: '100%',
              width: '100%',
              marginLeft: '16px',
              // border:"3px solid green"
            }}
          >
            <source src={animation.animation} type='video/quicktime' />
            <source src={animation.animation} type='video/webm' />
            Your browser does not support the video tag.
          </video>
        </Box>
        <Box
          sx={{
            flex: '0 0 60%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingRight: isDown600 ? '10px' : '30px',
            zIndex: 100
            // border:"3px solid yellow"
          }}
        >
          <Typography
            fontSize={isDown600 ? '16px' : '20px'}
            fontWeight={500}
            lineHeight={'21px'}
            fontFamily={'Inter'}
            color='rgba(255, 255, 255, 1)'
            textAlign={'center'}
            mb={1}
          >
            TIER {index + 1}
          </Typography>
          <Typography
            fontSize={isDown600 ? '12px' : '16px'}
            fontWeight={500}
            lineHeight={'21px'}
            fontFamily={'Inter'}
            color='rgba(255, 255, 255, 1)'
            textAlign={'center'}
          >
            Mines:{' '}
            <span
              style={{
                color: 'rgba(134, 60, 255, 1)',
                fontFamily: 'Inter',
                fontWeight: 900,
              }}
            >
              {animation.pays}{' '}
            </span>
            $DOAI/year
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Reward
