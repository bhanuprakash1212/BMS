// App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import UploadPage from './pages/UploadPage';
import Event1 from "./Events/Event1"
import Event2 from "./Events/Event2"
import Event3 from "./Events/Event3"
import EventsPage from './pages/EventsPage';
import UpgradePage from './pages/UpgradePage';
import DeveloperPage from './pages/DeveloperPage';
function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flexGrow: 1, padding: '16px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/upgrade" element={<UpgradePage />} />
            <Route path="/event" element={<EventsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/event/event1" element={<Event1 />} />
            <Route path="/event/event2" element={<Event2 />} />
            <Route path="/event/event3" element={<Event3 />} />
            <Route path="/dev" element={<DeveloperPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
