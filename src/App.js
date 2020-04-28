import React from 'react';
import './App.css';
import {withFirebase} from './comps/Firebase'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container} from 'react-bootstrap';
import Top from './comps/Views/Top'
import AllCustomer from './comps/Views/AllCustomer';
import CustomerDetail from './comps/Views/CustomerDetail';
import NewCustomer from './comps/Views/NewCustomer';
import EditCustomer from './comps/Views/EditCustomer';
import SignIn from './comps/Views/SignIn'
function App(props) {
  return (
    <div>
      
        <Row noGutters>
          <Col>
            <Top/>
          </Col>
        </Row>
        <Row noGutters>
          <Col>
            <Router>
              <Switch>
                <Route path='/EditCustomer'>
                  <EditCustomer/>
                </Route>
                <Route path='/NewCustomer'>
                  <NewCustomer/>
                </Route>
                <Route path='/CustomerDetail'>
                  <CustomerDetail/>
                </Route>
                <Route path='/AllCustomer'>
                  <AllCustomer/>
                </Route>
                <Route path='/'>
                  <SignIn/>
                </Route>
              </Switch>
            </Router>
          </Col>
        </Row>
      
    </div>
  );
}

export default withFirebase(App);
