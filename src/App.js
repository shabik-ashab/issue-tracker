import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AuthProvider from './contexts/AuthProvider';
import Register from './Components/Register';
import Login from './Components/Login';
import Choose from './Components/Choose';
import Header from './Components/Header';

function App() {
  
  return (
    <>
    <AuthProvider>
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/choose"> 
          <Choose />
        </Route>
      </Switch>
    </Router>
    </AuthProvider>
    </>
  );
}

export default App;
