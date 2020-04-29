import React from 'react'
import {Container,Row,Col,Table} from 'react-bootstrap'
import { withFirebase } from '../Firebase'
import {useHistory} from 'react-router-dom'
import * as ROUTE from '../../constanst/router'
function AllCustomerbase(props){
    let data = props.context.data
    const hist = useHistory()
   
    const link = (id) =>{
        hist.push(`/CustomerDetail/${id}`)
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
                                    Name
                                </th>
                                <th>
                                    Date of Last Visit
                                </th>
                                <th>
                                    Last Task Reiceved 
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(customer=>{
                                return(
                                <tr key={customer.id} onClick={e=>link(customer.id)}>
                                    <td>
                                        {customer.first_name} {customer.last_name}
                                    </td>
                                    <td>
                                        {customer.last_in.toDate().toLocaleDateString()}
                                    </td>
                                    <td>
                                        {customer.recent_task}
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