import React from 'react'
import SignInForm from '../Form/SignInForm'
import {withFirebase} from '../Firebase'
function SignInBase(props){
    let user = props.context.user() 
    console.log('user info',user)
    return(
        <div>
            <div className='form'>
                <SignInForm/>       
            </div>              
        </div>
    )
}
const SignIn = withFirebase(SignInBase)
export default SignIn