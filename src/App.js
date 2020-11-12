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
import * as ROUTE from './constanst/router'

function App(props) {
  return (
    <div>
      
        <Row noGutters>
          <Col>
            <Top/>
          </Col>
        </Row>
        <div className='content'>
          <Row noGutters >          
            <Col>
              <Router>
                <Switch>
                  <Route path={ROUTE.TESTING}>
                    <EditCustomer/>
                  </Route>
                  <Route path='/EditCustomer/:id'>
                    <EditCustomer/>
                  </Route>
                  <Route path='/NewCustomer'>
                    <NewCustomer/>
                  </Route>
                  <Route path={ROUTE.DETAIL}>
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
    </div>
  );
}

export default withFirebase(App);
