import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BillProvider } from './context/BillContext';
import AdminPage from './components/AdminPage';
import BillPage from './components/BillPage';

function App() {
  return (
    <BillProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AdminPage />} />
          <Route path="/bill" element={<BillPage />} />
        </Routes>
      </Router>
    </BillProvider>
  );
}

export default App;