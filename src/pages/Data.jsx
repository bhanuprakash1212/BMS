import { useState, useEffect } from "react";
import { db } from "../firebase.js";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Select, InputLabel, FormControl, Chip, OutlinedInput } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import "../styles/home.css";

const Data = () => {
  const [passId, setPassId] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [participationLimit, setParticipationLimit] = useState("");
  const [participationCount, setParticipationCount] = useState("");
  const [participatedEvents, setParticipatedEvents] = useState([]);
  const [issued, setIssued] = useState("Not Issued");
  const [pop, setPop] = useState(false);
  const [id, setId] = useState("");
  const [fetchd, setFetchd] = useState([]);
  const [inp, setInp] = useState("");
  const [action, setAction] = useState("add");
  const [loading, setLoading] = useState(true);

  const dbref = collection(db, "Applicant");

  const clear = () => {
    setPassId("");
    setPass("");
    setName("");
    setPhone("");
    setEmail("");
    setPaymentId("");
    setParticipationLimit("");
    setParticipationCount("");
    setParticipatedEvents([]);
    setIssued("Not Issued");
    setId("");
    setAction("add");
    setPop(false);
  };

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

  const update = async () => {
    if (participatedEvents.length > participationLimit) {
      alert("Selected events exceed the participation limit!");
      return;
    }
    try {
      const docRef = doc(db, "Applicant", id);
      await updateDoc(docRef, {
        passId,
        pass,
        name,
        phone,
        email,
        paymentId,
        participationLimit,
        participationCount,
        participatedEvents,
        issued: issued === "Issued" ? true : false
      });
      clear();
      fetch();
    } catch (error) {
      console.error("Error updating document:", error);
      alert("Error updating document");
    }
  };

  const handleSubmit = () => {
    if (action === "add") {
      // add();
    } else if (action === "edit") {
      update();
    }
  };

  const handleEdit = (person) => {
    setPassId(person.passId);
    setPass(person.pass);
    setName(person.name);
    setPhone(person.phone);
    setEmail(person.email || "");
    setPaymentId(person.paymentId || "");
    setParticipationLimit(person.participationLimit || "");
    setParticipationCount(person.participationCount || "");
    setParticipatedEvents(person.participatedEvents || []);
    setIssued(person.issued ? "Issued" : "Not Issued");
    setId(person.id);
    setAction("edit");
    setPop(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Applicant", id));
      fetch();
    } catch (error) {
      console.error("Error deleting document:", error);
      alert("Error deleting document");
    }
  };

  const handleIssuedToggle = async (id) => {
    try {
      const docRef = doc(db, "Applicant", id);
      await updateDoc(docRef, { issued: true });
      fetch();
    } catch (error) {
      console.error("Error updating issued field:", error);
      alert("Error updating issued field");
    }
  };

  // Search filter
  const filteredData = fetchd.filter((person) =>
    person.passId.toLowerCase().includes(inp.toLowerCase())
  );

  function Row({ person }) {
    const [open, setOpen] = useState(false);
    const [issued, setIssuedState] = useState(person.issued);

    return (
      <>
        <TableRow sx={{ "& > *": { borderBottom: "unset" }, backgroundColor: '#fff', color: 'black' }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>{person.passId}</TableCell>
          <TableCell>{person.pass}</TableCell>
          <TableCell>{person.name}</TableCell>
          <TableCell>{person.phone}</TableCell>
          <TableCell>
            <Button variant="outlined" color="secondary" startIcon={<EditNoteIcon />} onClick={() => handleEdit(person)}>Update</Button>
          </TableCell>
          <TableCell>
            <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(person.id)}>Delete</Button>
          </TableCell>
          <TableCell>
            <Button
              variant="outlined"
              onClick={() => {
                handleIssuedToggle(person.id, issued);
                setIssuedState(!issued);
              }}
              sx={{ color: issued ? 'white' : 'black', backgroundColor: issued ? 'green' : 'transparent' }}
            >
              {issued ? "Issued" : "Not Issued"}
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 3,ml:0 }}>
                <TableRow sx={{background:"grey"}}>
                    <TableCell>Pass ID:</TableCell>
                    <TableCell>Email:</TableCell>
                    <TableCell>Payment ID:</TableCell>
                    <TableCell>Participation Limit:</TableCell>
                    <TableCell>Participation Count:</TableCell>
                    <TableCell>Participated Events:</TableCell>
                </TableRow>
                <TableRow sx={{background:"lightgrey"}}>
                    <TableCell>{person.passId}</TableCell>
                    <TableCell>{person.email}</TableCell>
                    <TableCell>{person.paymentId}</TableCell>
                    <TableCell>{person.participationLimit}</TableCell>
                    <TableCell>{person.participationCount}</TableCell>
                    <TableCell>{person.participatedEvents?.join(", ")}</TableCell>
                </TableRow>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }

  Row.propTypes = {
    person: PropTypes.shape({
      passId: PropTypes.string.isRequired,
      pass: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      email: PropTypes.string,
      paymentId: PropTypes.string,
      participationLimit: PropTypes.string,
      participationCount: PropTypes.string,
      participatedEvents: PropTypes.arrayOf(PropTypes.string),
      issued: PropTypes.bool.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  };

  const events = ["Event 1", "Event 2", "Event 3", "Event 4", "Event 5"];

  return (
    <div className="data-container">
      <Dialog open={pop} onClose={() => setPop(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{action === "add" ? "Add Student" : "Edit Student"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Pass ID"
            fullWidth
            variant="outlined"
            onChange={(e) => setPassId(e.target.value)}
            value={passId}
            required
          />
          <TextField
            margin="dense"
            label="Pass"
            fullWidth
            variant="outlined"
            onChange={(e) => setPass(e.target.value)}
            value={pass}
            required
          />
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
          <TextField
            margin="dense"
            label="Phone"
            fullWidth
            variant="outlined"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            required
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextField
            margin="dense"
            label="Participation Limit"
            fullWidth
            variant="outlined"
            onChange={(e) => setParticipationLimit(e.target.value)}
            value={participationLimit}
          />
          <TextField
            margin="dense"
            label="Participation Count"
            fullWidth
            variant="outlined"
            onChange={(e) => setParticipationCount(e.target.value)}
            value={participationCount}
          />
          <FormControl fullWidth margin="dense" variant="outlined">
            <InputLabel id="participated-events-label">Participated Events</InputLabel>
            <Select
              labelId="participated-events-label"
              id="participated-events"
              multiple
              value={participatedEvents}
              onChange={(e) => setParticipatedEvents(e.target.value)}
              input={<OutlinedInput id="select-multiple-chip" label="Participated Events" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {events.map((event) => (
                <MenuItem key={event} value={event}>
                  {event}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense" variant="outlined">
            <InputLabel id="issued-label">Issued</InputLabel>
            <Select
              labelId="issued-label"
              value={issued}
              onChange={(e) => setIssued(e.target.value)}
              label="Issued"
            >
              <MenuItem value={"Issued"}>Issued</MenuItem>
              <MenuItem value={"Not Issued"}>Not Issued</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPop(false)} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">{action === "add" ? "Add" : "Update"}</Button>
        </DialogActions>
      </Dialog>
      <div className="table-container">
        <div className="table-header" style={{ display: "flex",}}>
          <TextField
            margin="dense"
            label="Search by Pass ID"
            variant="outlined"
            onChange={(e) => setInp(e.target.value)}
            value={inp}
            sx={{ marginRight: "auto",width:500 }}
          />
          <Button
            variant="outlined"
            startIcon={<PersonAddAlt1Icon />}
            sx={{ marginLeft: 2 }}
            onClick={() => setPop(true)}
            disabled
          >
            Add Student
          </Button>
        </div>
        {loading ? (
          <CircularProgress sx={{ margin: "auto" }} />
        ) : (
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow sx={{ background: '#2C3333' }}>
                  <TableCell />
                  <TableCell sx={{ color: 'white' }}>Pass ID</TableCell>
                  <TableCell sx={{ color: 'white' }}>Pass</TableCell>
                  <TableCell sx={{ color: 'white' }}>Name</TableCell>
                  <TableCell sx={{ color: 'white' }}>Phone</TableCell>
                  <TableCell sx={{ color: 'white' }}>Update</TableCell>
                  <TableCell sx={{ color: 'white' }}>Delete</TableCell>
                  <TableCell sx={{ color: 'white' }}>Issued</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.length ? filteredData.map((person) => (
                  <Row key={person.id} person={person} />
                )) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No data found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

export default Data;
