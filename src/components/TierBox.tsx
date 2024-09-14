import { Box, Typography, useMediaQuery } from '@mui/material'
interface TierBoxProps {
  tierNo: number;
  ownedNFTs: number;
  animation: string;
  pays: string;
  price: string;
  handleMainTabChange: (value: number, tierNo: number) => void;
}

const TierBox = ({  
  tierNo,
  ownedNFTs,
  animation,
  pays,
  price,
  handleMainTabChange }: TierBoxProps) => {
  const isDown640 = useMediaQuery('(max-width:640px)')
  const isDown600 = useMediaQuery("(max-width:600px)");

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: '12px',
          lineHeight: '16px',
          color: 'rgba(255, 255, 255, 1)',
          marginBottom: '12px',
          fontFamily: 'Inter',
        }}
      >
        {`TIER ${tierNo}`}
      </Typography>

      <Box
        sx={{
          background: 'linear-gradient(119.94deg, #13C378 0%, #38383C 21.46%)',
          position: 'relative',
          width: isDown640 ? '90%' : '330px',
          maxWidth: '1250px',
          height: '150px',
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
        <Box className='childBox' sx={{ gap: 1}} />
        <Box
            sx={{
              height: "120px",
              width: "40%",
              position: "absolute",
              top: "13px",
              left: isDown600 ? 5 : 0,
              // border:"3px solid red"
            }}
          >
            {/* <img src={animation} style={{
              height: "125%",
              width: "55%",
              marginLeft: '40px',
            }} /> */}
           <video
              loop
              muted
              playsInline
              autoPlay
              style={{
                height: "100%",
                width: "100%",
                // border:"5px solid green"
              }}
            >
              <source src={animation} type="video/quicktime" />
              <source src={animation} type="video/mp4" />
              <source src={animation} type="video/webm" />
              Your browser does not support the video tag.
            </video>
           
          </Box>
          <Box
            sx={{
              //  position: "absolute",
              // height: "100%",
              // width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              right: isDown600 ? 2 : 6,
              position: "absolute",
              // center vertically
              top: "49%",
              transform: "translateY(-50%)",
              // border:"3px solid red",
              width: "60%",
            }}
          >
            <Typography
              fontSize={isDown600 ? "9px" : "10px"}
              fontWeight={500}
              lineHeight={"16px"}
              fontFamily={"Bruno Ace"}
              color="rgba(255, 255, 255, 1)"
            >
              Price:{" "}
              <span
                style={{
                  color: "rgba(134, 60, 255, 1)",
                  fontFamily: "Bruno Ace",
                  fontWeight: 900,
                }}
              >
                {price}{" "}
              </span>
              POINTS
            </Typography>
            <Typography
              fontSize={isDown600 ? "9px" : "10px"}
              fontWeight={500}
              lineHeight={"16px"}
              fontFamily={"Bruno Ace"}
              color="rgba(255, 255, 255, 1)"
            >
              Mines:{" "}
              <span
                style={{
                  color: "rgba(134, 60, 255, 1)",
                  fontFamily: "Bruno Ace",
                  fontWeight: 900,
                }}
              >
                {pays + '    '}
              </span>
              $DOAI/year
            </Typography>
          </Box>
      </Box>
      
      <Box
        sx={{
          background: 'rgba(18, 253, 160, 0.1)',
          padding: '4px 10px',
          color: 'rgba(134, 60, 255, 1)',
          width: '80px',
          textAlign: 'center',
          cursor: 'pointer',
          mt: '12px',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '150%',
            display: 'flex',
            alignItems: 'center',
            background:
              'linear-gradient(88.75deg, #1EFB9C -6.85%, #9845FF 106.9%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textFillColor: 'transparent',
          }}
          onClick={() => handleMainTabChange(0, tierNo)}
        >
          {ownedNFTs} Owned
        </Typography>
      </Box>
    </Box>
  )
}

export default TierBox
