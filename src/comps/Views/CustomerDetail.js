import React from 'react'
import { withFirebase } from '../Firebase'
import { withRouter} from "react-router-dom";
import { Table, Button } from 'react-bootstrap';
import {TableRow} from './SubViews/TableRow'
class CustomerDetailBase extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            tasks: null,
            cust_data: null,
            edit: false,
        }
    }
    ////////SET UP/////////////////////////////////
   async componentDidMount(){
        const data = this.props.context.data
        let match = this.props.match;
        let cust_id = match.params.id //id of the customer
        let customer = data.find(x=> x.id===cust_id)
        let task_data = await this.props.context.doGetTaskByCustomerID('customers', cust_id)
        this.setState({...this.state, tasks:task_data, cust_data:customer})
    }
    edit(id){
        const hist = this.props.history
        hist.push(`/EditCustomer/${id}`)
    }
    render(){
        if(!this.state.cust_data){
            return(
              <div>
                Loading
              </div>
            )
          }

        return(
            <div>
                <div id='top'>
                    <div className='parent'>
                        <div className=' narrow text-center'>
                            <div className='box bg-primary'>
                                {this.state.cust_data.first_name.charAt(0)}
                            </div>
                            <br/>
                            <div style={{paddingLeft:'3rem', paddingRight:'3rem'}}>
                                <Button block onClick={e=>this.edit(this.state.cust_data.id)}>
                                    Edit Profile
                                </Button>
                            </div>
                        </div>
                        <div className='cust-info wide'>
                            <div className='info parent'>
                                <div className='wide'>
                                    <h2>
                                        {this.state.cust_data.first_name} {this.state.cust_data.last_name}
                                    </h2>
                                    <h6>
                                        {this.state.cust_data.phone_number}
                                    </h6>
                                    <h6>
                                        {this.state.cust_data.email_address}
                                    </h6>
                                </div>
                                <div className='wide'>
                                    <h2>Data Purchased</h2>
                                    <h5>12/12/1912</h5>
                                </div>
                            </div>
                            <div className='notes'>
                                <h6>Notes on {this.state.cust_data.first_name} {this.state.cust_data.last_name}</h6>
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
                    <div className="rTable">
                        <div className="rTableHeading">
                            <div className="rTableRow">
                                <div className="rTableHead">Task</div>
                                <div className="rTableHead">Date Recieved</div>
                                <div className="rTableHead">Date Finished</div>
                                <div className="rTableHead">Billing</div>
                                <div className="rTableHead"></div>
                            </div>
                        </div>
                
                        <div className="rTableBody">
                           {console.log('edit mode?', this.state.edit)}
                           {   
                            this.state.tasks?
                               <>
                                {this.state.tasks.map(task=>{
                                    return(
                                        <TableRow 
                                            key={task.id+'key'} 
                                            id={task.id} 
                                            task_desc={task.task_desc} 
                                            start_date={task.start_date.toDate().toLocaleDateString()}
                                            end_date={task.end_date.toDate().toLocaleDateString()}
                                            charge={task.charge}
                                        />
                                        // <div className='rTableRow' key={task.id+'key'} id={task.id} isEdit={false}>
                                        //     <div className="rTableCell">
                                        //         {task.task_desc}
                                        //     </div>
                                        //     <div className="rTableCell">
                                        //         {task.start_date.toDate().toLocaleDateString()}
                                        //     </div>
                                        //     <div className="rTableCell">
                                        //         {task.end_date.toDate().toLocaleDateString()}
                                        //     </div>
                                        //     <div className="rTableCell">
                                        //         {task.charge}
                                        //     </div>
                                        //     <div className="rTableCell" onClick={e=>this.state.edit? this.setState({...this.state, edit:false}): this.setState({...this.state, edit:true})}>
                                        //         edit
                                        //     </div>
                                        // </div>
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
                        </div>
                    </div>
               </div>
            </div>
        )
    
    }
}
const CustomerDetail = withRouter(withFirebase(CustomerDetailBase))
export default CustomerDetail