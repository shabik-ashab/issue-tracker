import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AuthProvider from './contexts/AuthProvider';
import Register from './Components/Register';

function App() {
  
  return (
    <>
    <AuthProvider>
    <Router>
      <Register />
    </Router>
    </AuthProvider>
    </>
  );
}

export default App;
