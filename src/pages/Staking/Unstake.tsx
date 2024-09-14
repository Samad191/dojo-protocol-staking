import { Box, Button, CircularProgress, TextField, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DojoLogoTextWhite } from '../../assets'
import Image from '../../components/common/Image'
import { unstake } from '../../contract'
import { useWallet } from '@solana/wallet-adapter-react'
import { Connection } from '@solana/web3.js'
import { getNumberForInputField, showNumber, SOLANA_RPC } from '../../utils'
import OutOfCreditsPopUp from '../../components/common/popup'
import WalletModal from '../../components/WalletModal'
import { getMultiplierAccInfo, getUserStakeAcc } from '../../contract/calc_rewards'
import { getApplicableMultiplier } from '../../contract/common'

// const Unstake = () => {
  const Unstake = ({
    connection,
    provider,
    lockingPeriod,  
    firstTimeStaked,
    stakedAmount,
    updateStakedAmount
  }: {
    connection: any,
    provider: any,
    lockingPeriod: string | null;
    firstTimeStaked: boolean;
    stakedAmount: string;
    updateStakedAmount: () => void;
  }) => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const opts = {
    preflightCommitment: "processed",
  } as any;
  // const connection = new Connection(SOLANA_RPC, opts.preflightCommitment);

  const [walletModal, setWalletModal] = useState(false)
  const [unstakeInput, setUnstakeInput] = useState<string | number>(0)
  const [unstakeRes, setUnstakeRes] = useState('');
  const [isRemainingAmountEnough, setIsRemainingAmountEnough] = useState<boolean>(true);
// const [loader, setLoader] = useState(localStorage.getItem("txnLoader")  || false)




// const randomFunc = async () => {
//   console.log("randomFunc chala????")
//   const isTxnOngoing = await localStorage.getItem("txnLoader");
//   const unstakeResFromLS = await localStorage.getItem("unstakeRes");
//   console.log("isTxnOngoing and other", {isTxnOngoing, unstakeResFromLS});
//   if(isTxnOngoing){
//   // @ts-ignore
//     setUnstakeRes(unstakeResFromLS)
//   }
//   // @ts-ignore
//   setLoader(isTxnOngoing)
//   console.log("randomFunc chala????//////////////////")
// }

// useEffect(()=>{
//   randomFunc()
// },[])


// useEffect(() => {
//   const checkLocalStorageChange = () => {
//     const currentUnstakeRes = localStorage.getItem("unstakeRes");
//     if (currentUnstakeRes !== unstakeRes) {
//       // @ts-ignore
//       setUnstakeRes(currentUnstakeRes);
//       console.log("listener chala and ye value set hui", currentUnstakeRes)
//     }
//   };

//   // Poll every 500ms
//   const intervalId = setInterval(checkLocalStorageChange, 500);

//   return () => clearInterval(intervalId); // Cleanup on unmount
// }, [unstakeRes]);


  useEffect(() => {
    if (publicKey) {
      setWalletModal(false)
    }else{
      setUnstakeInput('0')
    }
  }, [publicKey])

  const handleUnstake = async () => {
    // setLoader(true)
    // await localStorage.setItem("txnLoader", "true")
    
    if(!publicKey) {
      setWalletModal(true)
      return;
    }
    const res = await unstake(provider, wallet, connection, unstakeInput)
    // await localStorage.setItem("unstakeRes", res)
    setUnstakeRes(res);
    
    // await localStorage.setItem("unstakeRes", "")
    // setLoader(false)
    // if(res == 'success') {
    //   setTimeout(async () => {
    //     console.log('time out running')
    //     setUnstakeInput(0)
    //     await updateStakedAmount();
    //   }, 3500)

    // }
    
  }

  const handlePopUp = () => {
    setUnstakeRes('');
    setUnstakeInput(0)
    // localStorage.setItem("unstakeRes", "")
    // setLoader(false)
    // localStorage.setItem("txnLoader", "")
    // localStorage.setItem("unstakeRes", "")
    setTimeout(async () => {
      console.log('time out running')
      await updateStakedAmount();
    }, 3500)
  };
const [ bonusAPY ,setBonusAPY] = useState("40%");
  useEffect(()=>{
(async ()=>{

  console.log('wallet here', wallet);
  let userAddress = wallet.publicKey;
  console.log('wallet public key', userAddress)
  if(publicKey) {
    let userStakeAcc = await getUserStakeAcc(provider, wallet);
    let multiplierAcc = await getMultiplierAccInfo(provider, wallet);
  if(!userStakeAcc || !multiplierAcc){
    setBonusAPY("40%")
    return;
  }else{
    const rewardAge = ((Date.now()/1000) - Number(userStakeAcc.stake_start_time))/86400
    let applicableMultiplier = getApplicableMultiplier(
      // userStakeAccount.lockin_period,
      multiplierAcc,
      rewardAge
    );
    console.log("applicableMultiplier in new new", {userStakeAcc, multiplierAcc, applicableMultiplier, rewardAge})
    if(applicableMultiplier === 1){
      setBonusAPY("40%");
    }else if(applicableMultiplier === 2){
      setBonusAPY("80%");
    }else if(applicableMultiplier === 3){
      setBonusAPY("120%");
    }
  }
  }

})()
  },[publicKey])

console.log("max new bonusAPY", bonusAPY)
const formatter = new Intl.NumberFormat("en-US");
  return (
    <Box
      sx={{
        backgroundColor: '#000',
        my: '10px',
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
              {unstakeRes && (
            <OutOfCreditsPopUp handlePopUp={handlePopUp} stakeRes={unstakeRes} name={'Unstake'} />
          )}
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
              Unstake Amount
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
              // type='number'
              autoComplete='off'
              autoCorrect='off'
              autoCapitalize='off'
              value={unstakeInput}
              defaultValue={0}
              disabled={!publicKey ? true : false}
              // onChange={e => setUnstakeInput(e.target.value)}
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
                  setUnstakeInput("0");
                }

                const value = getNumberForInputField(input);
                if(value){
                   setUnstakeInput(value);
                
                   if(Number(value) > Number(stakedAmount)){
                    setIsRemainingAmountEnough(true)
                  }else if(Number(stakedAmount) === Number(value)){
                    setIsRemainingAmountEnough(true)
                  }else if(Number(stakedAmount) - Number(value) >= 1000){
                    setIsRemainingAmountEnough(true)
                  } else{
                    setIsRemainingAmountEnough(false)
                  }
                  
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
              Staked:{' '}
              <span
                style={{
                  color: 'rgba(164, 62, 255, 1)',
                  fontFamily: 'Inter',
                }}
              >
                {!publicKey ? 'N/A' :  formatter.format(Number(showNumber(stakedAmount.toString(), 2))) + ' DOAI'} 
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

                console.log('max', stakedAmount.toString())
                // const splitted = stakedAmount.toString().split('.')
                // console.log('splitted', splitted[1])
                // if(splitted[1]?.length > 6) {
                //   setUnstakeInput(`${splitted[0]}.${splitted[1].slice(0, 6)}`)
                // }
                // else setUnstakeInput(stakedAmount.toString())
setUnstakeInput(showNumber(stakedAmount.toString()))
setIsRemainingAmountEnough(true)
                // setUnstakeInput(Number(stakedAmount).toFixed(6));
              }}
            >
              MAX
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0px 24px',
        }}
      >
        <Box
          sx={{
            marginBottom: '16px',
          }}
        >
          <Typography
            fontSize={'14px'}
            fontWeight={400}
            lineHeight={'21px'}
            fontFamily={'Inter'}
            color='rgba(255, 255, 255, 0.5)'
            textAlign='center'
          >
            A 5% fee on your staked amount is applied when unstaking tokens.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '16px',
            width: '100%',
            gap: '8px',
          }}
        >
          <Typography
            fontSize={'14px'}
            fontWeight={400}
            lineHeight={'21px'}
            fontFamily={'Inter'}
            color='rgba(255, 255, 255, 0.5)'
          >
            Your current APY:
          </Typography>
          <Typography
            fontSize={'14px'}
            fontWeight={400}
            lineHeight={'21px'}
            fontFamily={'Inter'}
            color='rgba(235, 235, 222, 1)'
          >
             {/* {lockingPeriod && Number(lockingPeriod) >= 30 && Number(lockingPeriod) < 180 ? '1x' : Number(lockingPeriod) >= 180 && Number(lockingPeriod) < 365 ? '2x' : Number(lockingPeriod) >= 365 ? '4x' : 'N/A'} */}
             {/* 40% APY */}
             {!publicKey || firstTimeStaked ? "N/A" : `${bonusAPY} APY`}
          </Typography>
        </Box>
        {/* <Button
          sx={{
            backgroundImage:
              'linear-gradient(270deg, #12FDA0 0%, #7730F5 100%)',
            height: '47px',
            width: '183px',
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: '16px',
            lineHeight: '19.36px',
            textAlign: 'center',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '0px',
            cursor: 'pointer',
            textTransform: 'none',
            clipPath:
              'polygon(0% 0%, calc(100% - 1rem) 0%, 100% 30%, 100% 80%, 100% 100%, 1rem 100%, 0% calc(100% - 1rem), 0 0)',
          }}
        >
          Unstake
        </Button> */}
                <Tooltip
            title={
              isRemainingAmountEnough ? "" : "Maintain 1,000 DOJO staked, or use Max Unstake."
            }
            placement="top"
            enterTouchDelay={0}
          >
            <span>
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
          onClick={handleUnstake}
          disabled={ !publicKey ? false : !isRemainingAmountEnough ? true : Number(unstakeInput) == 0 || Number(unstakeInput) > Number(stakedAmount)}
        >
          <>
          {/* {
            loader ? (
          <CircularProgress  sx={{
            color: "rgba(164, 62, 255, 1)"
          }} /> 
        ) : (
           <Typography
            fontSize={Number(unstakeInput) > Number(stakedAmount) ? '15px' : '18px'}
            fontWeight={600}
            lineHeight={'24px'}
            fontFamily={'Inter'}
            color='rgba(255, 255, 255, 1)'
          >
             {publicKey ? Number(unstakeInput) > Number(stakedAmount) ? 'Insufficient balance' : 'Unstake' : "Connect Wallet"}  
          </Typography> 
          )
          } */}
           <Typography
            fontSize={Number(unstakeInput) > Number(stakedAmount) ? '15px' : '18px'}
            fontWeight={600}
            lineHeight={'24px'}
            fontFamily={'Inter'}
            color='rgba(255, 255, 255, 1)'
          >
             {publicKey ? Number(unstakeInput) > Number(stakedAmount) ? 'Insufficient balance' : 'Unstake' : "Connect Wallet"}  
          </Typography> 
          </>
        </Button>
        </span>
        </Tooltip>
      </Box>
      <WalletModal open={walletModal} setOpen={setWalletModal} />
    </Box>
  )
}
export default Unstake
