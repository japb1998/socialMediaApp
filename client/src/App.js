import {BrowserRouter as Router,Route} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import { Container } from 'semantic-ui-react'
import Home from './components/pages/Home';
import Register  from './components/pages/Register';
import Login from './components/pages/Login';
import Menu from './components/Menu';
function App() {
  return (
    <Router>
    <Container>
      <Menu></Menu>
      <Route exact path='/' >
      <Home/>
      </Route>
      <Route exact path='/login' >
      <Login/>
      </Route>
      <Route exact path='/register' >
      <Register/>
      </Route>
      </Container>
    </Router>
  );
}

export default App;
