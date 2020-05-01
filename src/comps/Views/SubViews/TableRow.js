import React from 'react'
export default function TableRow(props){
    let[edit, setEdit] = React.useState(false)
    console.log('edit here===>', edit)
    return(
        <div className='rTableRow' id={props.id} isEdit={false}>
            <div className="rTableCell">
                {props.task_desc}
            </div>
            <div className="rTableCell">
                {props.start_date.toDate().toLocaleDateString()}
            </div>
            <div className="rTableCell">
                {props.end_date.toDate().toLocaleDateString()}
            </div>
            <div className="rTableCell">
                {props.charge}
            </div>
            <div className="rTableCell" onClick={e=>edit? setEdit(false): setEdit(true)}>
                edit
            </div>
        </div>
    )
}
