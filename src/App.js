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
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

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
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <PrivateRoute exact path="/choose"> 
          <Choose />
        </PrivateRoute>
      </Switch>
    </Router>
    </AuthProvider>
    </>
  );
}

export default App;
