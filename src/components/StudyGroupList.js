import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import GroupIcon from "@mui/icons-material/Group";

const Background = styled(Box)({
  position: "relative",
  width: "100%",
  height: "100vh",
  backgroundImage: "url('https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "left",
  justifyContent: "start",
  color: "white",
  textAlign: "left",
  "&::before": {
    content: "''",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(202, 49, 113, 0.2)", // Dark overlay
  },
});

// Styled Card with 3D Effect
const StyledCard = styled(Card)({
  background: "linear-gradient(145deg, #ffffff, #e0e0e0)",
  borderRadius: "15px",
  boxShadow: "8px 8px 16px rgba(0,0,0,0.2), -8px -8px 16px rgba(255,255,255,0.8)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "10px 10px 20px rgba(0,0,0,0.25), -10px -10px 20px rgba(255,255,255,0.9)",
  },
  padding: "10px",
});

function StudyGroupList() {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    const response = await axios.get("http://localhost:3001/studyGroups");
    setGroups(response.data);
  };

  const joinGroup = async (groupId) => {
    const group = groups.find((g) => g.id === groupId);
    if (!group.members.includes(currentUser.id)) {
      const updatedGroup = {
        ...group,
        members: [...group.members, currentUser.id],
      };
      await axios.put(`http://localhost:3001/studyGroups/${groupId}`, updatedGroup);
      fetchGroups();
    }
  };

  return (
    <Background>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#fff" }}>
            Study Groups
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            sx={{ backgroundColor: "#fff", color: "#c23171", fontWeight: "bold" }}
            onClick={() => navigate("/create-group")}
          >
            Create New Group
          </Button>
        </Box>
        <Grid container spacing={3}>
          {groups.map((group) => (
            <Grid item xs={12} sm={6} md={4} key={group.id}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {group.name}
                  </Typography>
                  <Typography  variant="body2">Subject: {group.subject}</Typography>
                  <Typography variant="body2">Location: {group.place}</Typography>
                  <Typography variant="body2">
                    Time: <Typography variant="subtitle1">
                      <strong>Time:</strong> {new Date(group.startTime).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false, // 24-hour format
                      })} - {new Date(group.endTime).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </Typography>
                  </Typography>
                  <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
                    <GroupIcon fontSize="small" sx={{ mr: 1, color: "#c23171" }} />
                    {group.members.length} Members
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    sx={{ fontWeight: "bold", color: "#c23171" }}
                    onClick={() => joinGroup(group.id)}
                  >
                    Join
                  </Button>
                  <Button
                    size="small"
                    sx={{ fontWeight: "bold", color: "#000" }}
                    onClick={() => navigate(`/analytics/${group.id}`)}
                  >
                    Analytics
                  </Button>
                </CardActions>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Background>
  );
}

export default StudyGroupList;
