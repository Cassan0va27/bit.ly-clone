import React from 'react';
import '../styles/styles.scss';
import {Redirect} from 'react-router-dom';


class Homepage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.submitHandler=this.submitHandler.bind(this);
        this.checkifExists=this.checkifExists.bind(this);
        this.loginHandler=this.loginHandler.bind(this);
        this.state={
            email:'',
            password:'',
            login: false
        }
    }

    submitHandler()
    {
        console.log(this.state.email);
        console.log(this.state.password);
        const checker=this.validatorCreate();
        
        if(!this.checkifExists())
        {
            localStorage.setItem(checker,1);
            alert('Signup Successful');
        }
        else
        {
            alert('User exists');
        }
    }

    loginHandler()
    {
        if(this.checkifExists())
        {
           this.setState({ login: true});
        }
        else
        {
            alert('Invalid Email or Password');
        }
    }

    checkifExists()
    {
        const validator=this.validatorCreate();
        const checker=localStorage.getItem(validator);
        if(checker === null)
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    validatorCreate()
    {
        let validator=this.state.email.concat(this.state.password);
        validator=validator+'login';
        return validator;
    }
    render()
    {
        if(this.state.login)
        {
           return <Redirect to={
               {
                   pathname:'/dashboard',
                   state:{ email: this.state.email,password: this.state.password}
               }
           }/>
        }
        return (

             <div className="window">
                <div className="window-header"> 
                     URL Shortner
                </div>
                <div className="window-content">
                    <form>
                        <input type='email' placeholder="Email" className='email' onChange={(e) => this.setState({ email: e.target.value})}></input>
                        <input type='password' placeholder="Password" className='password' onChange={(e) => this.setState({password: e.target.value})}></input>
                        <input type='button' value="Login" className='login' onClick={this.loginHandler}></input>
                        <input type='button' value="Sign Up" className='login' onClick={this.submitHandler}></input>

                    </form>
                </div>
             </div>
        );
    }
}

export default Homepage