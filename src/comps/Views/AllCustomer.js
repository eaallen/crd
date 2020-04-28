import React from 'react'
import {Container,Row,Col,Table} from 'react-bootstrap'
import { withFirebase } from '../Firebase'
import {useHistory} from 'react-router-dom'
import * as ROUTE from '../../constanst/router'
function AllCustomerbase(props){
    let data = props.context.data
    const hist = useHistory()
    const link = () =>{
        hist.push(ROUTE.DETIAL)
    }
    console.log('<><><><task_history><><><.',data)
    return(
        <div>        
            <Row noGutters>
                <Col md={2} className='bg-dark text-light'>
                    <div>
                        side bar
                    </div>
                    
                </Col>
                <Col md={10}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>
                                    name
                                </th>
                                <th>
                                    last visit
                                </th>
                                <th>
                                    last task
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(customer=>{
                                return(
                                <tr key={customer.id} onClick={e=>link()}>
                                    <td>
                                        {customer.first_name} {customer.last_name}
                                    </td>
                                    <td>
                                        {customer.task_history.start_date.toDate().toLocaleDateString()}
                                    </td>
                                    <td>
                                        {customer.task_history.task_desc}
                                    </td>
                                </tr>
                            )})}
                        </tbody>
                    </Table>
                </Col>
            </Row>        
        </div>
    )
}
const AllCustomer = withFirebase(AllCustomerbase)
export default AllCustomer