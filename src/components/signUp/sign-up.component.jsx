import React, { Component } from "react";
import './sign-up.component.styles.scss'
import { auth,createUserProfileDocument } from "../../firebase/firebase.utils";
import { createUserWithEmailAndPassword } from "firebase/auth";

class SignUp extends Component{
    constructor(props){
        super(props)
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }
    
    handleSubmit = async (event) =>{
        event.preventDefault()
        const {displayName,email, password, confirmPassword} = this.state;

        console.log(displayName,email, password,confirmPassword)

        if(password!==confirmPassword){
            alert("password don't match")
            return;
        }
        try{
            const { user } = await createUserWithEmailAndPassword(auth, email, password)
            await createUserProfileDocument(user,{displayName})
            console.log(user,'profile created')
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
          

            }catch(error){
                console.log('Error',error)
        }

    }
    handleChange = event =>{
        const {name, value} = event.target ;
        this.setState({[name]: value})
        
    }
    render(){
        return(
            <div className="auth-container">
                <h2>SignUp</h2>

                    <div className="input-container">
                        <form className="sign-up-form" onSubmit={this.handleSubmit}>
                        <input type="text" name="displayName" value={this.state.displayName} placeholder="Name" onChange={this.handleChange} />
                        <input type="email" name="email" value={this.state.email} placeholder="Email" onChange={this.handleChange} />
                        <input type="password" name='password' value={this.state.password} placeholder='password' onChange={this.handleChange} />
                        <input type="password" name='confirmPassword' value={this.state.confirmPassword} placeholder="Confirm-Password" onChange={this.handleChange} />
                        <button type = 'submit'>SignUp</button>
                       </form>
                    </div>
                
            </div>
        )
    }
}

export default SignUp;