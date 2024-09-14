import { styled } from "@mui/material";

export default styled("div")<{ size?: string }>(({ theme, size }) => ({
  // minHeight: 200,
  // minWidth: 200,
  background: theme.palette.primary.main,
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  display: "flex",
  flexDirection: "column",
  // alignItems: 'center',
  // justifyContent: 'center',
  borderRadius: 10,
  boxShadow: `17px 19px 37px -10px black`,
  padding: 30,
  height: size,
  width: size,
}));
