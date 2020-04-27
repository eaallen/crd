import React from 'react'
import {Container,Row,Col,Table} from 'react-bootstrap'
import { withFirebase } from '../Firebase'
function AllCustomerbase(props){
    let data = props.context.data
    console.log('<><><><task_history><><><.',data)
    return(
        <div>
            <Container fluid>
                <Row noGutters>
                    <Col md={2} className='bg-dark text-light'>
                        <div>
                            side bar
                        </div>
                        
                    </Col>
                    <Col md={10}>
                        <Table>
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
                                    <tr key={customer.id}>
                                        <td>
                                            {customer.first_name} {customer.last_name}
                                        </td>
                                        <td>
                                            {customer.task_history.start_date.seconds}
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
            </Container>
        </div>
    )
}
const AllCustomer = withFirebase(AllCustomerbase)
export default AllCustomer