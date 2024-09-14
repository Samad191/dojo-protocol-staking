import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { Box, useMediaQuery } from "@mui/material";
// import {
//   PopUpBackground,
// } from "../../assets";

const OutOfCreditsPopUp = ({ handlePopUp, stakeRes, name }: any) => {
  const isDown550 = useMediaQuery("(max-width:550px)");
  const isDown1200 = useMediaQuery("(max-width:1200px)");

//   const dispatch = useDispatch();

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  return (
    <Box>
      <React.Fragment>
        <Button variant="outlined">Open dialog</Button>
        <BootstrapDialog
          //   onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={true}
          sx={{
            "& .MuiDialog-paper": {
              padding: "30px",
              background: "linear-gradient(180deg, #000000 0%, #150925 100%)",
              position: "relative",
              border: "1px solid cyan",
              borderRadius: "30px !important",
              width: "500px",
            //   borderImage: 'linear-gradient(88.75deg, #1EFB9C -6.85%, #9845FF 106.9%)',
            //   borderImageSlice: '1;',
              
            },
          }}
        >
          {/* <img
            src={PopUpBackground}
            style={{
              position: "absolute",
              bottom: 0,
              width: "90%",
              height: "100%",
              zIndex: 0,
            }}
          /> */}
          
          <Typography
            gutterBottom
            sx={{
              paddingTop: "15px",
              fontSize: "24px",
              fontWeight: "400",
              lineHeight: "25.6px",
              letterSpacing: "0.05em",
              textAlign: "center",
            }}
          >
            {name} {stakeRes == 'success' ? 'Successful' : 'Failed!'} 
          </Typography>
          <Box
            style={{
              height: "44px",
            //   background: "#28124c",
              borderRadius: "30px",
              cursor: "pointer",
              marginTop: "20px",
              zIndex: 1,
              background:'linear-gradient(88.75deg, #1EFB9C -6.85%, #9845FF 106.9%)',
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                paddingTop: "8px",
                fontSize: "20px",
              }}
              onClick={() => {
                // dispatch(setShowError(""));
                handlePopUp()
              }}
            >
              OK
            </Typography>
          </Box>
        </BootstrapDialog>
      </React.Fragment>
    </Box>
  );
};

export default OutOfCreditsPopUp;
