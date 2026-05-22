import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout/AdminLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import Users from './pages/Users/Users';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/subscription" element={<PlaceholderPage title="Subscription" />} />
          <Route path="/transaction" element={<PlaceholderPage title="Transaction" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div style={{ padding: '32px', color: '#6b7280', fontSize: 14 }}>
      {title} page — coming soon
    </div>
  );
}

export default App;
