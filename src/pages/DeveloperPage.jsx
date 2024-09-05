import { Box, Typography, Paper, Link, List, ListItem, ListItemText, Divider, Chip, Table, TableBody, TableCell, TableContainer, TableRow, Button } from "@mui/material";
import { GitHub, LinkedIn, Email, Web } from "@mui/icons-material";
import { FaReact, FaJs, FaHtml5, FaCss3Alt, FaNodeJs } from 'react-icons/fa';
import { SiNextdotjs, SiFirebase, SiMongodb, SiTailwindcss, SiExpress } from 'react-icons/si';
import dev from '../assets/dev.png';

const DeveloperPage = () => {
  const developerDetails = {
    name: "Chowdam Bhanu Prakash",
    title: "Web App Developer",
    email: "bchowdamfam@gmail.com",
    website: "cbhanuprakash.great-site.net",
    location: "India",
    systemsDeveloped: [
      "Next.js website for student fee management",
      "Mobile app for coastal tourism safety using INCOIS data",
      "Drug Inventory and Supply Chain Tracking System",
      "Applicant management system with Firebase integration",
    ],
    skills: [
      { name: "React", icon: <FaReact /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "JavaScript", icon: <FaJs /> },
      { name: "Firebase", icon: <SiFirebase /> },
      { name: "HTML5", icon: <FaHtml5 /> },
      { name: "CSS3", icon: <FaCss3Alt /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss /> },
      { name: "React Native", icon: <FaReact /> },
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "Node.js", icon: <FaNodeJs /> },
      { name: "Express.js", icon: <SiExpress /> },
    ],
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f9f9f9",
        color: "#333",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "fixed",
      }}
    >
      <Paper
        sx={{
          width: "100%",
          maxWidth: "1200px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "40px",
          overflow: "hidden",
          height: "100vh",
        }}
      >
        {/* Main Content - Flexbox layout */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "center", sm: "flex-start" },
            gap: "40px",
            overflow: "hidden",
          }}
        >
          {/* Left Section - Profile Image & Contact */}
          <Box sx={{ flexShrink: 0, textAlign: "center", minWidth: 350 }}>
            
            {/* Contact Details Table */}
            <TableContainer component={Paper} sx={{ marginTop: 0,width:450,boxShadow:"none" }}>
              <Table>
                <TableBody>
                <TableRow>
                    <TableCell>
                      <img src={dev} height={100} width={80}/>
                    </TableCell>
                    <TableCell>
                    <Chip label={developerDetails.name} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Email />
                    </TableCell>
                    <TableCell>
                      <Link href={`mailto:${developerDetails.email}`} color="inherit">
                        {developerDetails.email}
                      </Link>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Web />
                    </TableCell>
                    <TableCell>
                      <Link href={`http://${developerDetails.website}`} target="_blank" color="inherit">
                        {developerDetails.website}
                      </Link>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <GitHub />
                    </TableCell>
                    <TableCell>
                      <Link href="https://github.com/bhanuprakash1212" color="inherit">
                        GitHub Profile
                      </Link>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <LinkedIn />
                    </TableCell>
                    <TableCell>
                      <Link href="https://linkedin.com/in/bhanuprakashchowdam" color="inherit">
                        LinkedIn Profile
                      </Link>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

          </Box>

          {/* Right Section - About and Systems */}
          <Box sx={{ width: '100%' }}>
            <Button variant="contained" gutterBottom sx={{ marginBottom: "20px" }} color="success">
              About Developer
            </Button>
            <Typography lineHeight={2}>
              I am a passionate
              <Chip label={developerDetails.title} />
              developer with expertise in creating efficient and scalable web and mobile applications.
              I specialize in frontend development and have worked on multiple projects utilizing cutting-edge
              technologies.
            </Typography>

            {/* Divider between About and Systems Developed */}
            <Divider sx={{ marginY: "20px" }} />

            <Typography variant="h5" gutterBottom>
              Systems Developed
            </Typography>
            <List>
              {developerDetails.systemsDeveloped.map((system, index) => (
                <ListItem key={index}>
                  <ListItemText primary={system} sx={{marginLeft:"-15px"}} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableRow>
              <TableCell sx={{width:"38%"}}>
                Skills
              </TableCell>
              <TableCell>
                {developerDetails.skills.map((skill, index) => (
                  <Chip
                    key={index}
                    icon={skill.icon}
                    label={skill.name}
                    variant="outlined"
                    sx={{ fontSize: "16px", padding: "10px", color: "#333" ,margin:1}}
                  />
                ))}
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default DeveloperPage;
