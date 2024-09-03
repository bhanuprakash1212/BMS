import { Card, CardContent, Typography, Box, CardMedia, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';



const eventsList = [
  {
    id: 'event1',
    title: 'Event 1',
    description: 'This is a brief description of Event 1.',
    imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.vlbJ0SSYV1jWSoe0QNCwMwHaEK&pid=Api&P=0&h=180', // Add appropriate image paths
  },
  {
    id: 'event2',
    title: 'Event 2',
    description: 'This is a brief description of Event 2.',
    imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.vlbJ0SSYV1jWSoe0QNCwMwHaEK&pid=Api&P=0&h=180',
  },
  {
    id: 'event3',
    title: 'Event 3',
    description: 'This is a brief description of Event 3.',
    imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.DOmEYoWXBWZGi5ObtOEh4QHaE8&pid=Api&P=0&h=180',
  },
  {
    id: 'event4',
    title: 'Event 4',
    description: 'This is a brief description of Event 3.',
    imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.vlbJ0SSYV1jWSoe0QNCwMwHaEK&pid=Api&P=0&h=180',
  },
  {
    id: 'event5',
    title: 'Event 4',
    description: 'This is a brief description of Event 3.',
    imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.vlbJ0SSYV1jWSoe0QNCwMwHaEK&pid=Api&P=0&h=180',
  },
  // Add more events as needed
];

const EventsPage = () => {
  const navigate = useNavigate();

  const handleNavigate = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <Box sx={{ padding: '20px' }}>
     
      <Button variant="contained" sx={{ mb: 3, mt: -1,ml:4, boxShadow: "none", background: "#171e30" }}>Application Form</Button>
      <Divider/>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: '40px',
          padding:"20px",
          marginTop:"20px"
        }}
      >
        {eventsList.map((event) => (
          <Card
            key={event.id}
            sx={{
              maxWidth: 455,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardActionArea onClick={() => handleNavigate(event.id)}>
              <CardMedia
                component="img"
                height="140"
                image={event.imageUrl}
                alt={event.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {event.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {event.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default EventsPage;
