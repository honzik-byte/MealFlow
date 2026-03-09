import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { AppProvider } from './store/AppContext';
import Landing from './pages/Landing';
import Setup from './pages/Setup';
import Dashboard from './pages/Dashboard';
import MealPlan from './pages/MealPlan';
import Progress from './pages/Progress';

import Profile from './pages/Profile';
import Fridge from './pages/Fridge';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="setup" element={<Setup />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="plan" element={<MealPlan />} />
            <Route path="progress" element={<Progress />} />
            <Route path="profile" element={<Profile />} />
            <Route path="fridge" element={<Fridge />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
