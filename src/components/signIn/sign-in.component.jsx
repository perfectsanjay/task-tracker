import React,{Component} from "react";
import './sign-in.component.styles.scss'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

class SignIn extends Component {
    constructor(props){
        super()
        this.state = {
            email:'',
            password: ''
        }  
    }
    handleSubmit = async (event) => {
        event.preventDefault()
        const {email, password} = this.state
        try{
            await signInWithEmailAndPassword(auth, email, password)
            this.setState({email:'',password:''})
        

        }catch(error){
            console.error("Error in signIn",error)
            alert("failed to signIn",+ error.message)

        }
        

        }
 
    handleChange = event => {
        const {name, value} = event.target 
        this.setState({[name]: value})
    }

      

    render(){
        return (
            <div className="auth-container">
                <h2>Sign In</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="input-container">
                        <input type="email" name='email' placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                        <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                        <button type="submit">Sign In</button>
                        <button type='button' onClick={signInWithGoogle} isgooglesignin>Sign In With Google</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn