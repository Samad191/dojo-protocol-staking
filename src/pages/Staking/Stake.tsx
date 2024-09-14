import { Box, Button, CircularProgress, TextField, Tooltip, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DojoLogoTextWhite } from '../../assets'
import Image from '../../components/common/Image'
import { Connection, SOLANA_SCHEMA } from '@solana/web3.js'
import { useWallet } from '@solana/wallet-adapter-react'
// import { getTotalStaked, stake } from '../../contract'
import { stake, restake, getUserStaked } from '../../contract'
import OutOfCreditsPopUp from '../../components/common/popup'
import InfoIcon from "@mui/icons-material/Info";

import WalletModal from '../../components/WalletModal'
import { getNumberForInputField, showNumber, SOLANA_RPC } from '../../utils'

const Stake = ({
  connection,
  provider,
  tokenBalance,
  contractLockingPeriod,
  firstTimeStaked,
  stakeStartTimeStamp,
  updateBalance,
}: {
  connection: any,
  provider: any,
  tokenBalance: number;
  contractLockingPeriod: string | null;
  firstTimeStaked: boolean;
  stakeStartTimeStamp: string;
  updateBalance: () => void;
}) => {
  console.log('stake comp props', provider)
  console.log("firstTimeStaked", firstTimeStaked)
  const [stakeInput, setStakeInput] = useState<string>("0");
  const [stakeRes, setStakeRes] = useState<string>("");
  // const [loader, setLoader] = useState(false)
  const [unlockedDurations, setUnlockedDurations] = useState<number[]>([
    30, 180, 365,
  ]);

  const isMobile = useMediaQuery('(max-width:640px)')
 

  // const { publicKey, disconnect } = useWallet()
  // console.log('navbar', publicKey?.toBase58())

  const [walletModal, setWalletModal] = useState(false)
 
  const [lockingPeriod, setLockingPeriod] = useState<string>(
    contractLockingPeriod || "30"
  );
  console.log('hi contract locking period', lockingPeriod)


//   useEffect(() => {
//     const checkLocalStorageChange = () => {
//       const currentUnstakeRes = localStorage.getItem("stakeRes");
//       if (currentUnstakeRes !== stakeRes) {
//         // @ts-ignore
//         setStakeRes(currentUnstakeRes);
//         console.log("listener chala and ye value set hui", currentUnstakeRes)
//       }
//     };
  
//     // Poll every 500ms
//     const intervalId = setInterval(checkLocalStorageChange, 500);
  
//     return () => clearInterval(intervalId); // Cleanup on unmount
//   }, [stakeRes]);



// const randomFunc = async () => {
//   console.log("randomFunc chala????")
//   const isTxnOngoing = await localStorage.getItem("txnLoaderForStake");
//   const unstakeResFromLS = await localStorage.getItem("stakeRes");
//   console.log("isTxnOngoing and other", {isTxnOngoing, unstakeResFromLS});
//   if(isTxnOngoing){
//   // @ts-ignore
//     setStakeRes(unstakeResFromLS)
//   }
//   // @ts-ignore
//   setLoader(isTxnOngoing)
//   console.log("randomFunc chala????//////////////////")
// }

// useEffect(()=>{
//   randomFunc()
// },[])

  useEffect(() => {
    console.log('stake res changed', stakeRes)
  }, [stakeRes])
 
  const [contractLockPeriod, setContractLockPeriod] = useState('0');

  const { publicKey, connected } = useWallet();
  const wallet = useWallet()

  const opts = {
    preflightCommitment: 'processed',
  } as any

  // const network = 'https://api.devnet.solana.com'
  // const connection = new Connection(SOLANA_RPC, opts.preflightCommitment)
  const [selectedDuration, setSelectedDuration] = useState<number>(0)

  console.log('stake connection', connection)

  function roundDownIfDecimal(num: number) {
    // if(num < 1) {
    //   return 1;
    // }
    if (num % 1 !== 0) {
      return Math.floor(num); 
    }
  
    return num;
  }

  useEffect(() => {
    ;(async () => {
      if (publicKey && provider) {
        console.log('publicKey', publicKey.toBase58())
        // let balance = await connection?.getBalance(publicKey)
        setWalletModal(false)
        // console.log('balance', balance)
      }else{
        setStakeInput('0')
      }
    })()
  }, [publicKey, provider])

  const onStake = async () => {
    console.clear()
    try {
      if(!publicKey){
        setWalletModal(true)
        return;
      }
      if (
        !wallet ||
        !wallet.publicKey ||
        !connection ||
        !stakeInput ||
        !lockingPeriod
      )
        return;

      console.log('drox hi')
      // setLoader(true)
      // await localStorage.setItem("txnLoaderForStake", "true")
      const currentTimestampInSeconds = Math.floor(Date.now() / 1000);

      let restakeLockingTime: number = 0;
      const contractLockingPeriodInSeconds =
        Number(contractLockingPeriod) * 86400;
    
      let timePassedInSeconds =
        currentTimestampInSeconds - Number(stakeStartTimeStamp);

      console.log('hi')

      const remainingTimeInSeconds =
        Number(contractLockingPeriodInSeconds) - timePassedInSeconds;
      console.log("drox remaining time in seconds", remainingTimeInSeconds);
      console.log(
        "drox remaining time in days",
        remainingTimeInSeconds / 86400
      );

      const remainingTimeInDays = remainingTimeInSeconds / 86400;
      const newLockingPeriod = Number(lockingPeriod) - remainingTimeInDays;
      console.log('locking period', lockingPeriod)
      
      console.log('drox newLockingPeriod', newLockingPeriod)

      if (remainingTimeInSeconds < 30 * 86400) {
        restakeLockingTime =
          Number(lockingPeriod) - remainingTimeInSeconds / 86400;
      
      } else {
        restakeLockingTime = Number(lockingPeriod);

      }
      // console.clear();

      if (firstTimeStaked) {
        console.log('drox stake')
        const res = await stake(provider, wallet, connection, stakeInput, lockingPeriod);
        console.log("drox res", res);

        setStakeRes(res);
        // localStorage.setItem("stakeRes", res)
      } else {
        let newLogicLockingPeriod = 0;
        let passedTime = 0;

         const thisValue = roundDownIfDecimal(passedTime)
         console.log('test this values passed to contract', thisValue)
        
        console.log("drox restake", roundDownIfDecimal(newLogicLockingPeriod));
        const res = await restake(
          provider,
          wallet,
          connection,
          stakeInput,
          roundDownIfDecimal(passedTime)
        );
        console.log("drox res", res, typeof res);
        // localStorage.setItem("stakeRes", res)

        setStakeRes(res);
        if(res === "success") setStakeInput('0')
      }

    } catch (err) {
      console.log("stake err", err);
    }
  };

  const handlePopUp = () => {
    setStakeRes('');
    setStakeInput("0")
    // localStorage.setItem("unstakeRes", "")
    // setLoader(false)
    // localStorage.setItem("txnLoaderForStake", "")
    // localStorage.setItem("stakeRes", "")
    // setTimeout(async () => {
    //   console.log('time out running')
    //   await updateStakedAmount();
    // }, 3500)
  };

  
  console.log('unlocked durations', {stakeInput, tokenBalance, firstTimeStaked, mainCond: !(!publicKey && !tokenBalance)})

  console.log("disabe condition", Number(stakeInput) > Number(tokenBalance) ? true :
  firstTimeStaked
    ? Number(stakeInput) < 1000
    : Number(stakeInput) < 1)

  return (
    <Box
      sx={{
        background: '#000',
        my: '10px',
      }}
    >
        {stakeRes && <OutOfCreditsPopUp handlePopUp={handlePopUp} stakeRes={stakeRes} name={'Stake'} />}
        
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
          className='childBox'
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
              Stake Amount: {'  '}
              <span
                style={{
                  color: 'rgba(164, 62, 255, 1)',
                  fontFamily: 'Inter',
                }}
              >
                
                Min 1,000 DOAI
              </span>
            {/* </Typography> */}
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
              value={stakeInput}
              defaultValue={0}
              disabled={!publicKey ? true : false}
              // onChange={e => setStakeInput(e.target.value)}
              onChange={(e) => {
                console.log("kar length", e.target.value.length);

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
                  setStakeInput("0");
                }

                const value = getNumberForInputField(input);
                if(value) setStakeInput(value);
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
                
                { !publicKey ? 'N/A' : tokenBalance.toLocaleString("en") + ' DOAI'} 
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
                console.log('max')
                // const splitted = tokenBalance.toString().split('.')
                // console.log('splitted', splitted[1])
                // if(splitted[1]?.length > 6) {
                //   setStakeInput(`${splitted[0]}.${splitted[1].slice(0, 6)}`)
                // }
                // else setStakeInput(tokenBalance.toString())
                setStakeInput(showNumber(tokenBalance.toString()))
              }}
            >
              MAX
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
      >
        <Typography
          fontSize={'14px'}
          fontWeight={400}
          lineHeight={'21px'}
          fontFamily={'Inter'}
          color='rgba(255, 255, 255, 1)'
          mb={'8px'}
          textAlign={'center'}
        >
          Your staking APY increases over time. {isMobile ? <br /> : null} The base APY is 40% <br/> After
        </Typography>

        <Box
          mb={2}
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'center'}
        >
          {/* <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }} >

          <DurationButton
            text='30 D'
            mr={'18px'}
            onClick={() => {
              setLockingPeriod('30')
            }}
            disabled={unlockedDurations.indexOf(30) === -1}
            duration={30}
            selectedDuration={0}
          />
          <Typography
            sx={{
              fontSize: '12px',
              marginLeft: '-15px'
            }}
          >1x Reward</Typography>
          </div> */}

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8
          }} >

          <DurationButton
            text='180 D'
            mr={'18px'}
            onClick={() => {
              setLockingPeriod('180')
            }}
            disabled={unlockedDurations.indexOf(180) === -1}
            duration={180}
            selectedDuration={0}
          />
          <Typography   sx={{
              fontSize: '12px',
              marginLeft: '-15px'
            }} >80% APY</Typography>
            
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8
          }} >

          <DurationButton
            text='1Y'
            onClick={() => {
              setLockingPeriod('365')
            }}
            disabled={unlockedDurations.indexOf(365) === -1}
            duration={365}
            selectedDuration={0}
          />
             <Typography   sx={{
              fontSize: '12px',
              marginLeft: '4px'
            }} >120% APY</Typography>
            </div>

            <Tooltip
            title={
              "Additional stakes will reset the APY timer"
            }
            placement="top"
            enterTouchDelay={0}
          >
            <InfoIcon
              fontSize="small"
              sx={{
                marginLeft: '10px',
                marginTop: '10px'
              }}
            />
          </Tooltip>

        </Box>

        
        {/* <Typography
          fontSize={'14px'}
          fontWeight={400}
          lineHeight={'21px'}
          fontFamily={'Inter'}
          color='rgba(255, 255, 255, 0.5)'
          mb={2}
        >
          Your Reward Multiplier:{' '}
          <span
            style={{
              color: 'rgba(164, 62, 255, 1)',
              fontWeight: 700,
              fontFamily: 'Inter',
            }}
          >
               {lockingPeriod === "30"
              ? "1x"
              : lockingPeriod === "180"
              ? "2x"
              : "4x"}
          </span>
        </Typography> */}

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
            marginTop: '10px',
            background:
              'linear-gradient(88.75deg, #1EFB9C -6.85%, #9845FF 106.9%)',
            height: '47px',
            width: '183px',
            '&:hover': {
              opacity: 0.9,
              backgroundColor: '#72AFF2',
            },
            // '&:disabled': {
            //   backgroundColor: '#72AFF2',
            // },
            "&:disabled": {
              background: "rgb(51, 51, 51)",
              opacity: 0.5,
              cursor: "not-allowed !important",
            },
          }}
          onClick={onStake}
          disabled={
            (!publicKey && !tokenBalance) ? false :
            Number(stakeInput) > Number(tokenBalance) ? true :
            firstTimeStaked
              ? Number(stakeInput) < 1000
              : Number(stakeInput) < 1
          }
        >
          <>
          {/* {
          loader ? (
          <CircularProgress  sx={{
            color: "rgba(164, 62, 255, 1)"
          }} /> 
        ) : (
          
          <Typography
            fontSize={'15px'}
            fontWeight={600}
            lineHeight={'24px'}
            fontFamily={'Inter'}
            color='rgba(255, 255, 255, 1)'
          >
            {publicKey ? Number(stakeInput) > Number(tokenBalance) ? 'Insufficient balance' : 'Stake' : "Connect Wallet"}  
          </Typography>
        )
      } */}

<Typography
            fontSize={'15px'}
            fontWeight={600}
            lineHeight={'24px'}
            fontFamily={'Inter'}
            color='rgba(255, 255, 255, 1)'
          >
            {publicKey ? Number(stakeInput) > Number(tokenBalance) ? 'Insufficient balance' : 'Stake' : "Connect Wallet"}  
          </Typography>
          </>
        </Button>
      </Box>
      <WalletModal open={walletModal} setOpen={setWalletModal} />
    </Box>
  )
}

const DurationButton = ({
  text,
  mr,
  onClick,
  duration,
  selectedDuration,
  disabled
}: {
  text: string
  mr?: string | number
  onClick?: () => void
  duration: number
  selectedDuration: number
  disabled: boolean
}) => {
  console.log('duration button', text, disabled)
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Button
        sx={{
          backgroundColor: disabled
          ? "rgb(51, 51, 51)"
          : "rgba(134, 60, 255, 0.15)",
          opacity: disabled ? 0.5 : 1,
          background:
            duration === selectedDuration
              ? 'linear-gradient(88.75deg, #1EFB9C -6.85%, #9845FF 106.9%)'
              : 'rgba(15, 15, 15, 1)',
          color: 'rgba(0, 255, 184, 1)',
          height: '29px',
          borderRadius: '22px',
          '&:hover': {
            backgroundColor: 'rgba(15, 15, 15, 0.9)',
          },
          mr: mr || '0px',
          p: '1px',
          minWidth: '63px',
          cursor: "initial"
          // duration === 30 ? '56px' : duration === 180 ? '62px' : '40px',
        }}
        onClick={disabled ? () => {} : onClick}
      >
        <Typography
          fontSize={'14px'}
          fontWeight={400}
          lineHeight={'21px'}
          fontFamily={'Inter'}
          color='rgba(0, 255, 184, 1)'
          sx={{
            backgroundColor:
              duration === selectedDuration ? '#000' : 'rgba(15, 15, 15, 1)',
            width: '100%',
            height: '100%',
            borderRadius: '22px',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {text}
        </Typography>
      </Button>
      {/* {selectedDuration === duration && (
        <Typography
          fontSize={'12px'}
          fontWeight={400}
          lineHeight={'16px'}
          fontFamily={'Inter'}
          color='#fff'
          mt={1}
        >
          <span
            style={{
              color: 'rgba(164, 62, 255, 1)',
              fontWeight: 700,
              fontFamily: 'Inter',
            }}
          >
            {selectedDuration === 180 ? '2x' : '4x'}
          </span>{' '}
          rewards
        </Typography>
      )} */}
    </Box>
  )
}

export default Stake
