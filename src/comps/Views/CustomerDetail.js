import React from 'react'
import { withFirebase } from '../Firebase'
import { useRouteMatch,useHistory} from "react-router-dom";
import { Table, Button } from 'react-bootstrap';

function CustomerDetailBase(props){
    ////////SET UP/////////////////////////////////
    const data = props.context.data
    let match = useRouteMatch("/CustomerDetail/:id");
    const hist = useHistory()
    let cust_id = match.params.id //id of the customer
    let task_hist = null//props.context.tasks_of_current_customer
    console.log('task_hist',task_hist)
    let [tasks, setTasks] = React.useState(null)
    //useEffect is similar to componentDidMount() basicaly I want get_task_info() to run only 
    //when this component is mounted, other wise we get into a crazy endless loop  
    React.useEffect(()=>{
        async function get_task_info(id){
            let tasks = await props.context.doGetTaskByCustomerID('customers', id)
            console.log('setState<><>',props.context.tasks_of_current_customer)
            // setTasks(props.context.tasks_of_current_customer)
             setTasks(tasks)
        }
        
        get_task_info(cust_id)
    }, [])
    const edit = (id) =>{
        hist.push(`/EditCustomer/${id}`)
    }

    let customer = data.find(x=> x.id===cust_id)
    console.log(customer,'<-----')
    console.log('before')
    // console.log('before',props.context.tasks_of_current_customer)
    console.log('after',tasks)

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
                       {   
                        tasks?
                           <>
                            {tasks.map(task=>{
                                return(
                                <tr key={task.id}>
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
                           </>
                           :
                           <>
                            <tr>
                                <td>loading</td>
                            </tr>
                           </>
                       }
                       
                   </tbody>
               </Table>
           </div>
        </div>
    )
}
const CustomerDetail = withFirebase(CustomerDetailBase)
export default CustomerDetail