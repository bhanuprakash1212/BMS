import { useState, useEffect } from "react";
import { db } from "../firebase.js";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import {
  Box,
  Collapse,
  IconButton,
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
  Snackbar,
  Alert,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Delete, PersonAddAlt1 } from "@mui/icons-material";

const Event1Page = () => {
  const [fetchd, setFetchd] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pop, setPop] = useState(false);
  const [search, setSearch] = useState("");
  const [eventSearch, setEventSearch] = useState("");
  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });

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

  const handleAddToEvent = async (id, participationCount, participationLimit) => {
    if (participationCount < participationLimit) {
      try {
        const docRef = doc(db, "Applicant", id);
        await updateDoc(docRef, {
          participatedEvents: arrayUnion("Event 1"),
          participationCount: parseInt(participationCount) + 1,
        });
        fetch();
        setPop(false);
        setAlert({ open: true, message: "Added to Event 1", severity: "success" });
      } catch (error) {
        console.error("Error adding to event:", error);
        setAlert({ open: true, message: "Error adding to event", severity: "error" });
      }
    } else {
      setAlert({ open: true, message: "Participation limit reached", severity: "warning" });
    }
  };

  const handleRemoveFromEvent = async (id, participationCount) => {
    if (participationCount > 0) {
      try {
        const docRef = doc(db, "Applicant", id);
        await updateDoc(docRef, {
          participatedEvents: arrayRemove("Event 1"),
          participationCount: parseInt(participationCount) - 1,
        });
        fetch();
        setAlert({ open: true, message: "Removed from Event 1", severity: "success" });
      } catch (error) {
        console.error("Error removing from event:", error);
        setAlert({ open: true, message: "Error removing from event", severity: "error" });
      }
    } else {
      setAlert({ open: true, message: "No participation to remove", severity: "warning" });
    }
  };

  const filteredData = fetchd.filter((person) =>
    person.participatedEvents?.includes("Event 1") &&
    person.passId.toLowerCase().includes(eventSearch.toLowerCase())
  );

  const popupFilteredData = fetchd.filter((person) =>
    person.passId.toLowerCase().includes(search.toLowerCase())
  );

  function Row({ person }) {
    const [open, setOpen] = useState(false);

    return (
      <>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
          <TableCell>{person.passId}</TableCell>
          <TableCell>{person.pass}</TableCell>
          <TableCell>{person.name}</TableCell>
          <TableCell>{person.phone}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 3 }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<Delete />}
                  onClick={() => handleRemoveFromEvent(person.id, person.participationCount)}
                >
                  Remove Event
                </Button>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }

  return (
    <div className="event1-page">
      <Dialog open={pop} onClose={() => setPop(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add Applicant to Event 1</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by Pass ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              backgroundColor: 'lightgrey',
              marginBottom: 2,
            }}
          />
          <TableContainer component={Paper}>
            <Table aria-label="popup table">
              <TableHead>
                <TableRow>
                  <TableCell>Pass ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Add to Event</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {popupFilteredData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.passId}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAddToEvent(row.id, row.participationCount, row.participationLimit)}
                      >
                        Add Event
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPop(false)} color="secondary">Close</Button>
        </DialogActions>
      </Dialog>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search Event Participants by Pass ID"
        value={eventSearch}
        onChange={(e) => setEventSearch(e.target.value)}
        sx={{
          backgroundColor: 'lightgrey',
          marginBottom: 2,
        }}
      />

      <Button
        variant="contained"
        color="success"
        startIcon={<PersonAddAlt1 />}
        onClick={() => setPop(true)}
        sx={{ marginBottom: 2 }}
      >
        Add New
      </Button>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Pass ID</TableCell>
                <TableCell>Pass</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row) => (
                <Row key={row.id} person={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Event1Page;
