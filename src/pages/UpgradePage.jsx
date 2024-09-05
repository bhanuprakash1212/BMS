import { useState, useEffect } from "react";
import { db } from "../firebase.js";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";

const UpgradePage = () => {
  const [fetchd, setFetchd] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pop, setPop] = useState(false);
  const [search, setSearch] = useState("");
  const [proof, setProof] = useState("");
  const [increaseBy, setIncreaseBy] = useState(0);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const dbref = collection(db, "Applicant");

  const fetch = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(dbref);
      const fetchdata = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setFetchd(fetchdata);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleUpgrade = async () => {
    if (selectedPerson) {
      try {
        const docRef = doc(db, "Applicant", selectedPerson.id);
        await updateDoc(docRef, {
          participationLimit: parseInt(selectedPerson.participationLimit) + parseInt(increaseBy),
          proof,
        });
        fetch();
        setPop(false);
      } catch (error) {
        console.error("Error upgrading participation limit:", error);
        alert("Error upgrading participation limit");
      }
    }
  };

  const filteredData = fetchd.filter((person) =>
    person.passId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="upgrade-page">
      <Dialog open={pop} onClose={() => setPop(false)} maxWidth="md" fullWidth>
        <DialogTitle>Upgrade Participation Limit</DialogTitle>
        <DialogContent>
          {selectedPerson && (
            <>
              <TextField
                fullWidth
                variant="outlined"
                label="Pass ID"
                value={selectedPerson.passId}
                disabled
                sx={{ marginBottom: 2 }}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Name"
                value={selectedPerson.name}
                disabled
                sx={{ marginBottom: 2 }}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Current Participation Limit"
                value={selectedPerson.participationLimit}
                disabled
                sx={{ marginBottom: 2 }}
              />
            </>
          )}
          <TextField
            fullWidth
            variant="outlined"
            label="Proof (Payment ID)"
            value={proof}
            onChange={(e) => setProof(e.target.value)}
            sx={{
              marginBottom: 2,
            }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Increase By"
            type="number"
            value={increaseBy}
            onChange={(e) => setIncreaseBy(e.target.value)}
            sx={{
              marginBottom: 2,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPop(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpgrade} color="primary">
            Upgrade
          </Button>
        </DialogActions>
      </Dialog>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by Pass ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          marginBottom: 2,
        }}
      />

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="upgrade table">
            <TableHead>
              <TableRow>
                <TableCell>Pass ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Participation Limit</TableCell>
                <TableCell>Upgrade</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.passId}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.participationLimit}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setSelectedPerson(row);
                        setPop(true);
                      }}
                    >
                      Upgrade
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default UpgradePage;
