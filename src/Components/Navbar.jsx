import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { createTheme } from "@mui/material";

import { ThemeProvider } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    secondary: {
      main: "#101010",
      contrastText: "#FFFFFF",
    },
  },
});

const ResponsiveAppBar = () => {
  const [userData, setUserData] = useState();
  const getuserData = () => {
    axios.get("https://assessment.api.vweb.app/user").then((response) => {
      // console.log(response);
      const data = response.data;
      setUserData(data);
    });
   
  };
  useEffect(() => {
    getuserData();
  }, [],[userData]);
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" color={"secondary"}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "flex", flexGrow: 1 } }}
            >
              Edvora
            </Typography>

            <Box sx={{ flexGrow: 0, display: "flex" }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, mt: 0.5 }}
              >
                {userData?.name}
              </Typography>
              <Avatar alt="Remy Sharp" src={userData?.profile_key} />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default ResponsiveAppBar;
