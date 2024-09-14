import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { ReactNode, useEffect, useState } from 'react'
import { DojoLogoTextWhite } from '../../assets'
import Image from '../../components/common/Image'
import TierBox from '../../components/TierBox'
import {
  BlueNodeAnimation,
  GoldNodeAnimation,
  GreenNodeAnimation,
  IridescenceNodeAnimation,
  RedNodeAnimation,
} from "../../assets";
import { normalizeAmount } from '../../contract'
import { calculateReward, getUserTiers } from '../../script'
import { useWallet } from '@solana/wallet-adapter-react'
import { Connection } from '@solana/web3.js'
import { SOLANA_RPC } from '../../utils'
import * as anchor from "@coral-xyz/anchor";
import { DojoStakingNftProgram as TarsStakingNftProgram } from "../../contract/types/dojo_staking_nft_program";
import tarsIdlStaking from '../../contract/idl/dojo_staking_nft_program.json';


// const GPUTab = () => {
  const GPUTab = ({connection, handleMainTabChange}: {connection: any, handleMainTabChange: (value: number, tierNo: number) => void }) => {

  const [claimInput, setClaimInput] = useState<string | number>(0)
  const isDown900 = useMediaQuery('(max-width:900px)')
  const [claimAmount, setClaimAmount] = useState(0)
  const [nftCount, setNftCount] = useState({} as Record<number, number>) 
  
  const { publicKey } = useWallet();
  
  // const tiers = [
  //   { tierNo: 1, ownedNFTs: 5 },
  //   { tierNo: 2, ownedNFTs: 3 },
  //   { tierNo: 3, ownedNFTs: 4 },
  //   { tierNo: 4, ownedNFTs: 2 },
  //   { tierNo: 5, ownedNFTs: 1 },
  // ]

  const tiers = [
    {
      tierNo: 1,
      ownedNFTs: 0,
      price: "15,000 ",
      pays: "5,000",
      animation: GoldNodeAnimation,
    },
    {
      tierNo: 2,
      ownedNFTs: 0,
      price: "35,000",
      pays: "10,000",
      animation: RedNodeAnimation,
    },
    {
      tierNo: 3,
      ownedNFTs: 0,
      price: "60,000",
      pays: " 20,000",
      animation: GreenNodeAnimation,
    },
    {
      tierNo: 4,
      ownedNFTs: 0,
      price: "100,000",
      pays: "50,000",
      animation: BlueNodeAnimation,
    },
    {
      tierNo: 5,
      ownedNFTs: 0,
      price: "250,000",
      pays: "100,000",
      animation: IridescenceNodeAnimation,
    },
  ];

  useEffect(() => {
    (async () => {
      if(publicKey) {
        // const connection = new Connection(SOLANA_RPC);
        const tiersRewards = await calculateReward(connection, publicKey);
        let program = new anchor.Program(tarsIdlStaking as anchor.Idl, {
          connection,
        }) as unknown as anchor.Program<TarsStakingNftProgram>;
        
        console.log("gpu tab", tiersRewards);
      
        const sum = normalizeAmount(Object.values(tiersRewards).reduce((acc, value) => {
          return acc += value;  
        }, 0))
        console.log('sum', sum)

        setClaimAmount(sum)

        const userTiers = await getUserTiers(publicKey, program);
        console.log('user tiers aaa', userTiers)

        const nftCount = userTiers.reduce((acc: Record<number, number>, value) => {
          acc[value.tierId] = value.nftCount;
          return acc;
        }, {})
        console.log('nft count', nftCount)
        setNftCount(nftCount)

      } else {
        console.log('pub key not found')
        setNftCount({})
        setClaimAmount(0)
      }
    }) ()
  }, [publicKey?.toBase58()])

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
          mb={2}
        >
          Claim your $DOAI
        </Typography>
        <Typography
          fontSize={'20px'}
          fontWeight={400}
          lineHeight={'30px'}
          fontFamily={'Inter'}
          color='rgba(255, 255, 255, 0.7)'
          textAlign={'center'}
        >
          {/* Number(stakedAmount).toLocaleString("en") */}
          Your Reward Balance: {!isDown900 && <br />} {!publicKey ? "N/A" : claimAmount.toLocaleString("en") + ' $DOAI'}
        </Typography>
      </Box>
      <Box
        sx={{
          background: '#000',
          padding: '8px',
          border: '1px solid rgba(40, 40, 43, 1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingBottom: '20px',
        }}
      >
        <Box
          sx={{
            background: 'rgba(15, 15, 15, 1)',
            border: 'none',
            clipPath:
              'polygon(1.5rem 0%, 100% 0, 100% 1.5rem, 100% 100%, 80% 100%, 1.5rem 100%, 0 100%, 0% 1.5rem)',
            position: 'relative',
            width: '100%',
            height: 'max-content',
            marginBottom: '25px',
            cursor: 'pointer',
          }}
          onClick={() => {}}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '16px 24px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              <Typography
                fontSize={'16px'}
                fontWeight={400}
                lineHeight={'24px'}
                fontFamily={'Bruno Ace'}
                color='rgba(255, 255, 255, 0.5)'
              >
                Claim Amount
              </Typography>
              <Image
                src={DojoLogoTextWhite}
                alt='logo'
                sx={{
                  height: '16px',
                  width: '66px',
                }}
              />
            </Box>
            <Box>
              <TextField
                variant='standard'
                InputProps={{
                  disableUnderline: true,
                  style: {
                    fontSize: '24px',
                    fontWeight: 400,
                    lineHeight: '36px',
                    fontFamily: 'Inter',
                    color: 'rgba(255, 255, 255, 1)',
                    paddingTop: '6px',
                    paddingBottom: '6px',
                  },
                }}
                autoComplete='off'
                autoCorrect='off'
                autoCapitalize='off'
                value={claimInput}
                defaultValue={0}
                disabled={true}
                // onChange={e => setClaimInput(e.target.value)}
                onChange={e => {
                  let input = e.target.value;

                  console.log("kar input", input);
  
                  const regex = /^0+(?!$)/;
                  input = input.replace(regex, "");
  
                  console.log('input', input)
  
                  var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
                  const formatRes = format.test(input)
                  console.log('format res', formatRes)
  
                  if(formatRes) {return}
  
                  if (input.length == 0) {
                    setClaimInput("0");
                  }
  
                  if (input && input[input.length - 1].match("[0-9.]")) {
                    const splittedArray = input.split(".");
                    console.log("kar splittedArray", splittedArray);
                    if (
                      splittedArray.length > 2 ||
                      (splittedArray[1] && splittedArray[1].length > 6)
                    ) {
                      console.log("kar multiple decimals");
                    } else {
                      setClaimInput(input);
                    }
                  } else {
                    console.log("kar else");
                  }
                }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography
                fontSize={'14px'}
                fontWeight={400}
                lineHeight={'21px'}
                fontFamily={'Inter'}
                color='rgba(255, 255, 255, 0.5)'
              >
                Balance:{' '}
                <span
                  style={{
                    color: 'rgba(164, 62, 255, 1)',
                    fontFamily: 'Inter',
                  }}
                >
                  {!publicKey ? "N/A" : claimAmount.toLocaleString("en") + ' DOAI'} 
                </span>
              </Typography>

              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  background:
                    'linear-gradient(88.75deg, #1EFB9C -6.85%, #9845FF 106.9%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  // setClaimInput(claimAmount) disabled
                }}
              >
                MAX
              </Typography>
            </Box>
          </Box>
        </Box>

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
              // backgroundColor: '#72AFF2',
              background: "rgb(51, 51, 51)",
              opacity: 0.5,
              cursor: "not-allowed !important",
            },
          }}
          onClick={() => {}}
          disabled={true}
        >
          <Typography
            fontSize={'15px'}
            fontWeight={600}
            lineHeight={'24px'}
            fontFamily={'Inter'}
            color='rgba(255, 255, 255, 1)'
          >
            Claim Coming Soon
          </Typography>
        </Button>
      </Box>

      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        position='relative'
        mt={9.3}
        mb={5.6}
      >
        <Typography
          sx={{
            mx: '9.5px',
            fontFamily: 'Bruno Ace',
            fontSize: '20px',
            fontWeight: 400,
            lineHeight: '30px',
            textAlign: 'center',
          }}
        >
          My GPU NFTS
        </Typography>
      </Box>

      <ResponsiveContainer>
        {tiers.slice(0, 3).map((tier, index) => (
          <TierBox
            // key={index}
            // tierNo={tier.tierNo}
            // ownedNFTs={tier.ownedNFTs}
            key={index}
            tierNo={tier.tierNo}
            ownedNFTs={nftCount[tier.tierNo] || 0}
            animation={tier.animation}
            pays={tier.pays}
            price={tier.price}
            handleMainTabChange={handleMainTabChange}
          />
        ))}
      </ResponsiveContainer>

      <ResponsiveContainer>
        {tiers.slice(3, 5).map((tier, index) => (
          <TierBox
            // key={index}
            // tierNo={tier.tierNo}
            // ownedNFTs={tier.ownedNFTs}
            key={index}
            tierNo={tier.tierNo}
            ownedNFTs={nftCount[tier.tierNo] || 0}
            animation={tier.animation}
            pays={tier.pays}
            price={tier.price}
            handleMainTabChange={handleMainTabChange}
          />
        ))}
      </ResponsiveContainer>
    </Box>
  )
}
interface ResponsiveContainerProps {
  children: ReactNode
}

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
}) => (
  <Box
    display='flex'
    width='100%'
    justifyContent='center'
    flexDirection={{ xs: 'column', md: 'row' }}
    gap='60px'
    paddingBottom={'40px'}
  >
    {children}
  </Box>
)

export default GPUTab
