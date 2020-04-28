import React from 'react'
import { withFirebase } from '../Firebase'
import { useRouteMatch,useHistory} from "react-router-dom";
import { Table, Button } from 'react-bootstrap';

function CustomerDetailBase(props){
    const data = props.context.data
    // console.log('!!!!!__DATA__>>>',data)
    let match = useRouteMatch("/CustomerDetail/:id");
    const hist = useHistory()
    let cust_id = match.params.id //id of the customer
    let customer = data.find(x=> x.id===cust_id)
    console.log(customer,'<-----')

    const edit = (id) =>{
        hist.push(`/EditCustomer/${id}`)
    }

    return(
        <div>
            <div id='top'>
                <div className='parent'>
                    <div className=' narrow text-center'>
                        <div className='box bg-primary'>
                            {customer.first_name.charAt(0)}
                        </div>
                        <br/>
                        <div style={{paddingLeft:'.25rem', paddingRight:'.25rem'}}>
                            <Button block onClick={e=>edit(customer.id)}>
                                Edit Profile
                            </Button>
                        </div>
                    </div>
                    <div className='cust-info wide'>
                        <div className='info parent'>
                            <div className='wide'>
                                <h2>
                                    {customer.first_name} {customer.last_name}
                                </h2>
                                <h6>
                                    {customer.phone_number}
                                </h6>
                                <h6>
                                    {customer.email_address}
                                </h6>
                            </div>
                            <div className='wide'>
                                <h2>Data Purchased</h2>
                                <h5>12/12/1912</h5>
                            </div>
                        </div>
                        <div className='notes'>
                            <h6>Notes on {customer.first_name} {customer.last_name}</h6>
                            <p>
                                Nullam commodo eros ut commodo aliquam. Cras vestibulum accumsan bibendum. Morbi tristique massa a elit vehicula pellentesque. Nam iaculis posuere dui eu fermentum. Quisque in lectus leo. Aenean libero nunc, rutrum quis velit vel, tristique vulputate magna. Sed et lorem et lectus tempus dignissim.
                            </p>
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
            <div>
               <Table>
                   <thead>
                       <tr>
                           <th>
                              Task
                            </th>
                            <th>
                               Date Recieved
                            </th>
                            <th>
                               Date Finished
                            </th>
                            <th>
                                Billing
                            </th>
                            <th>

                            </th>
                            </tr>
                   </thead>
                   <tbody>
                       {customer.task_history.map(task=>{
                           return(
                            <tr key={task.task_id}>
                                <td>
                                    {task.task_desc}
                                </td>
                                <td>
                                    {task.start_date.toDate().toLocaleDateString()}
                                </td>
                                <td>
                                    {task.end_date.toDate().toLocaleDateString()}
                                </td>    
                                <td>
                                    {task.charge}
                                </td>
                                <td>
                                    edit
                                </td>
                            </tr>
                           )
                       })}
                   </tbody>
               </Table>
           </div>
        </div>
    )
}
const CustomerDetail = withFirebase(CustomerDetailBase)
export default CustomerDetail