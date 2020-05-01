import React from 'react'
export default class TableRow extends React.Component{
    constructor(props){
        super(props)
        this.state={
            edit: false,
            task_desc:this.props.task_desc,
            start_date:this.props.start_date,
            end_date:this.props.end_date,
            charge:this.props.charge
        }
    }
    handleChange =(e) => {
        e.preventDefault()
        let new_state={[e.target.getAttribute('name')]: e.target.value}
        this.setState(new_state)        
    }
    submit(){
        console.log('Submitting!')
        //make an edit action for the dakine
    }
    render(){
        if(this.state.edit){
            return(
                <div className='rTableRow' id={this.props.id}>
                    <div className="rTableCell">
                        <input value={this.state.task_desc} name='task_desc' onChange={e=>this.handleChange(e)}/>
                    </div>
                    <div className="rTableCell">
                        <input value={this.state.start_date} name='start_date' onChange={e=>this.handleChange(e)}/>
                    </div>
                    <div className="rTableCell">
                        <input value={this.state.end_date} name='end_date' onChange={e=>this.handleChange(e)}/>
                    </div>
                    <div className="rTableCell">
                        <input value={this.state.charge} name='charge' onChange={e=>this.handleChange(e)}/>
                    </div>
                    <div 
                        className="rTableCell" 
                        onClick={e=>{
                            this.state.edit? this.setState({...this.state, edit:false}) : this.setState({...this.state, edit:true}) 
                            this.submit()
                        }}
                    >
                        submit
                    </div>
                    
                </div>
            )
        }
        return(
            <div className='rTableRow' id={this.props.id}>
                <div className="rTableCell">
                    {this.state.task_desc}
                </div>
                <div className="rTableCell">
                    {this.state.start_date}
                </div>
                <div className="rTableCell">
                    {this.state.end_date}
                </div>
                <div className="rTableCell">
                    {this.state.charge}
                </div>
                <div className="rTableCell" onClick={e=>this.state.edit? this.setState({...this.state, edit:false}) : this.setState({...this.state, edit:true})}>
                    edit
                </div>
            </div>
        )
    }
}
