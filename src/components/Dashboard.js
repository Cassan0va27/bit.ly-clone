import React from 'react';
import {v4 as uuid} from 'uuid';


// const Converter= (props) =>
// {
//     let main_link=props.mlink;
//     let email=props.email;
//     let password=props.password;
//     //LOGIC HERE



//     return(
//         <div className="holder">
//             <h1>{main_link}</h1>
//             <p>{email}</p>
//             <p>{password}</p>
//         </div>
//     );
// }

class Dashboard extends React.Component
{ 

    constructor(props)
    {
        super(props);
        this.linkGen=this.linkGen.bind(this);
        this.sublinkGen=this.sublinkGen.bind(this);
        this.displayContent=this.displayContent.bind(this);
        this.state={
            link: '',
            sublink: '',
            count: '',
        }
    }


    sublinkGen()
    {
        const prefix='https://bit.ly/';
        let sublinks=[];
        for(let i=0; i<this.state.count; i++)
        {
            let id=uuid();
            id=id.slice(0,4);
            let sf=prefix.concat(id);
            sublinks.push(sf);
        }
        
        return sublinks;
    }

    displayContent()
    {
        let identifier=this.props.location.state.email.concat(this.props.location.state.password); 
        let safe=[];
        safe=localStorage.getItem(identifier);
        safe=JSON.parse(safe);
        let done=[];
       
        if( localStorage.getItem(identifier) === null)
        {
            return <p>Enter Data</p>
        }
        else
        {
             for(let i=0;i<safe.length;i++)
            {
                done[i]=<h3> Original Link: {safe[i].main}    --->  Generated Links -> {''+safe[i].sub+ ';'} </h3>   
            }

            return done;
        }  

    }
    linkGen()
    {

        let email=this.props.location.state.email;
        let password=this.props.location.state.password;
        let identifier=email.concat(password);
        let main_link=this.state.link;
        let sublinks=[];
        if(this.state.count < 1 || this.state.count > 6 || this.state.count ===null)
        {
            alert('Invalid Count Entered');
        }
       
        sublinks=this.sublinkGen();
        let output={main: main_link, sub: sublinks};
        let op=[];
        op.push(output);
        if( localStorage.getItem(identifier) === null)
        {
            op=JSON.stringify(op);
            localStorage.setItem(identifier,op);
            this.forceUpdate();
        }

        else
        {
            let io;
            io=localStorage.getItem(identifier);
            io=io.slice(0, io.length-1);
            output=JSON.stringify(output);
            let js=',' + output + ']';
            let finale=io+js;
            localStorage.setItem(identifier,finale);
        }

      //this.displayContent();
      
        
   //localStorage.clear();
     
        this.forceUpdate();
    }

    render()
    {
        return (

             <div className="window">
                 <div className="linkgen">
                    <input type='text' placeholder='Enter your Link' className='input' onChange={(e) =>this.setState({ link: e.target.value})}/>
                    <input type='number' className='number-box' onChange={(e) =>this.setState({ count: e.target.value})} placeholder='count'></input>   
                    <input type='button' value='Generate Link' className='generate' onClick={this.linkGen}></input>                     
                </div>
                     <p className='warning'> * Enter the link and select how many copies you want(Do not enter 0 and more than 6)</p>
                 <div className="display-box">
                    {
                        this.displayContent()
                    }
                 </div>
             </div>
        );
    }
}

export default Dashboard;