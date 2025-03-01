import React from "react";
import { AppBar, Toolbar, Button, Typography, Box, Container, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const Background = styled(Box)({
  position: "relative",
  width: "100%",
  height: "100vh",
  backgroundImage: "url('https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  textAlign: "center",
  "&::before": {
    content: "''",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(202, 49, 113, 0.6)",
  },
});

const Content = styled(Box)({
  position: "relative",
  zIndex: 2,
  maxWidth: "800px",
  padding: "20px",
});

const NavBar = () => (
  <AppBar position="absolute" sx={{ background: "transparent", boxShadow: "none" }}>
    <Toolbar sx={{ justifyContent: "space-between" }}>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>STUDY TOGETHER</Typography>
      <Box>
        <Button color="inherit">How to Study Together</Button>
        <Button color="inherit">Design a Study Universe</Button>
        <Button color="inherit">Community Events</Button>
        <Button color="inherit">About</Button>
        <Button variant="contained" sx={{ background: "#FF6B6B", marginLeft: 2 }}>Go To App</Button>
      </Box>
    </Toolbar>
  </AppBar>
);

const StudyTogether = () => {

    const navigate = useNavigate();

  return (
    <Box>
      <NavBar />
      <Background>
        <Content>
          <Typography variant="h3" fontWeight="bold">
            Meet, chat, and study with students from all over the world 🌍
          </Typography>
          <Typography variant="h6" mt={2}>
            Join the largest <b>global student community</b> online and say goodbye to lack of motivation.
          </Typography>
          <Button onClick={() => navigate("/groups")} variant="contained" sx={{ background: "#FF6B6B", mt: 3, px: 4, py: 1.5 }}>
            Study Together now
          </Button>
          <Box mt={2} display="flex" justifyContent="center" gap={2}>
            <Chip label="100% free!" color="secondary" />
            <Chip label="24,563 Online" color="success" />
          </Box>
        </Content>
      </Background>
    </Box>
  );
};

export default StudyTogether;
