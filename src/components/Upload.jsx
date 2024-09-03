import { useState, useEffect } from "react";
import { db } from "../firebase.js";
import { addDoc, collection } from "firebase/firestore";
import { TextField, Button, Container, MenuItem, Box, Typography, Divider } from "@mui/material";

const UploadData = () => {
  const [passId, setPassId] = useState("");
  const [pass, setPass] = useState("Silver");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [participationLimit, setParticipationLimit] = useState(2); // Default to Silver
  const [participationCount, setParticipationCount] = useState(0); // Default to 0
  const [issued, setIssued] = useState("Not Issued"); // Default value for issued

  const dbref = collection(db, "Applicant");

  useEffect(() => {
    // Set participationLimit based on pass type
    if (pass === "Silver") {
      setParticipationLimit(2);
    } else if (pass === "Gold") {
      setParticipationLimit(3);
    } else if (pass === "Platinum") {
      setParticipationLimit(5);
    }
  }, [pass]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(dbref, {
        passId: passId,
        pass: pass,
        name: name,
        phone: phone,
        email: email,
        paymentId: paymentId,
        participationLimit: participationLimit,
        participationCount: participationCount,
        issued: issued === "Issued" // Save as boolean: true for Issued, false for Not Issued
      });
      // Clear form fields after submission
      setPassId("");
      setPass("Silver"); // Reset to default
      setName("");
      setPhone("");
      setEmail("");
      setPaymentId("");
      setParticipationCount(0);
      setIssued("Not Issued"); // Reset issued field
      alert("Data uploaded successfully!");
    } catch (error) {
      console.error("Error uploading data:", error);
      alert("Error uploading data");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 0 }}>
      <Button variant="contained" sx={{ mb: 3, mt: 2, boxShadow: "none", background: "#171e30" }}>Application Form</Button>
      <Divider sx={{ mb: 5 }} />
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexWrap="wrap" gap={4}>

          <Box sx={{ flex: "1 1 45%" }}>
            <Typography variant="subtitle1" gutterBottom>Pass ID</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={passId}
              onChange={(e) => setPassId(e.target.value)}
              required
            />
          </Box>

          <Box sx={{ flex: "1 1 45%" }}>
            <Typography variant="subtitle1" gutterBottom>Pass</Typography>
            <TextField
              select
              fullWidth
              variant="outlined"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
            >
              <MenuItem value="Silver">Silver</MenuItem>
              <MenuItem value="Gold">Gold</MenuItem>
              <MenuItem value="Platinum">Platinum</MenuItem>
            </TextField>
          </Box>

          <Box sx={{ flex: "1 1 45%" }}>
            <Typography variant="subtitle1" gutterBottom>Name</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Box>

          <Box sx={{ flex: "1 1 45%" }}>
            <Typography variant="subtitle1" gutterBottom>Phone</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Box>

          <Box sx={{ flex: "1 1 45%" }}>
            <Typography variant="subtitle1" gutterBottom>Email</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Box>

          <Box sx={{ flex: "1 1 45%" }}>
            <Typography variant="subtitle1" gutterBottom>Payment ID</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={paymentId}
              onChange={(e) => setPaymentId(e.target.value)}
              required
            />
          </Box>

          <Box sx={{ flex: "1 1 45%" }}>
            <Typography variant="subtitle1" gutterBottom>Participation Limit</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={participationLimit}
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>

          <Box sx={{ flex: "1 1 45%" }}>
            <Typography variant="subtitle1" gutterBottom>Participation Count</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={participationCount}
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>

          <Box sx={{ flex: "1 1 45%" }}>
            <Typography variant="subtitle1" gutterBottom>Issued</Typography>
            <TextField
              select
              fullWidth
              variant="outlined"
              value={issued}
              onChange={(e) => setIssued(e.target.value)}
              required
            >
              <MenuItem value="Not Issued">Not Issued</MenuItem>
              <MenuItem value="Issued">Issued</MenuItem>
            </TextField>

          </Box>
          <Box  sx={{ flex: "1 1 45%" }}>
              <Button type="submit" variant="contained" color="success" fullWidth sx={{ mt:4.3, height: '55px' }}>
                Submit
            </Button>
          </Box>
        </Box>
      </form>
    </Container>
  );
};

export default UploadData;
