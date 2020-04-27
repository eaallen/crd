import React from 'react';
import logo from './logo.svg';
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
function App(props) {
  return (
    <div>
      <Container fluid>
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
                <Route path='/CusomerDetail'>
                  <CustomerDetail/>
                </Route>
                <Route path='/AllCutomer'>
                  <AllCustomer/>
                </Route>
                <Route path='/'>
                  Sign in
                </Route>
              </Switch>
            </Router>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default withFirebase(App);
