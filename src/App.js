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
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import ResponsiveDrawer from './Components/Dashboard/ResponsiveDrawer';

function App() {
  
  return (
    <>
    <AuthProvider>
    <Router>
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
        <Route exact path="/login">
          <Login />
        </Route><Route  path="/dash">
          <ResponsiveDrawer />
        </Route>
      </Switch>
    </Router>
    </AuthProvider>
    </>
  );
}

export default App;
