import { Toaster } from 'react-hot-toast';
import AppRouter from './routes/AppRouter';
import './App.css';

export default function App() {
  return (
    <>
      <AppRouter />
      <Toaster position="top-right" />
    </>
  );
}
