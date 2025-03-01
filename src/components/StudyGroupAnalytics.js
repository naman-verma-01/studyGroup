import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,

} from "@mui/material";

import { styled } from "@mui/material/styles";

const Background = styled(Box)({
  position: "relative",
  width: "100%",
  height: "100vh",
  backgroundImage: "url('https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "left",
  justifyContent: "flex-start",
  color: "white",
  textAlign: "center",
  "&::before": {
    content: "''",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(202, 49, 113, 0)", // Dark overlay
  },
});

function StudyGroupAnalytics() {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchGroupDetails();
  }, []);

  const fetchGroupDetails = async () => {
    const groupResponse = await axios.get(
      `http://localhost:3001/studyGroups/${groupId}`
    );
    setGroup(groupResponse.data);

    const memberDetails = await Promise.all(
      groupResponse.data.members.map((memberId) =>
        axios.get(`http://localhost:3001/users/${memberId}`)
      )
    );
    setMembers(memberDetails.map((res) => res.data));
  };

  if (!group) return <Typography>Loading...</Typography>;

  return (
    <Background>
      <Container
        maxWidth={false} // Allow full width
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent", // Matching pink background
        }}
      >
        <Paper
          elevation={5}
          sx={{
            width: "90vw", // Cover 90% of screen width
            maxWidth: "1200px", // Prevent it from being too large on big screens
            padding: "24px",
            textAlign: "center",
            borderRadius: "16px",
            background: "white",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#9B2242" }}>
            {group.name} Analytics
          </Typography>
          <Typography variant="subtitle1">
            <strong>Subject:</strong> {group.subject}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Location:</strong> {group.place}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Time:</strong> {group.startTime} - {group.endTime}
          </Typography>

          <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
            Members ({group.members.length})
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#9B2242" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Phone</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.userId}>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.emailId}</TableCell>
                    <TableCell>{member.phonenumber}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Background>
  );
}

export default StudyGroupAnalytics;
