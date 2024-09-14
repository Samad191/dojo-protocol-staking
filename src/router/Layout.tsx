import { FC } from "react";
import AppRoutes from ".";
import { useMediaQuery } from "@mui/material";

const AppLayout: FC = () => {
  const isDown1000 = useMediaQuery("(max-width:1000px)");
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      <AppRoutes />
    </div>
  );
};

export default AppLayout;
