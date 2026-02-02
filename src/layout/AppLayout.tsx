import { Box } from "@mui/material";
import { Outlet } from "react-router";
import Header from "./components/Header";

const AppLayout = () => {
  return (
    <Box>
      <Header />
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;
