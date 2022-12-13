import asset3 from '../assets/levitate.png';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const Form = ({credentials, setCredentials}) =>{
  const [restrict, setRestrict] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const CompletePayment = async()=>{

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let next_month;
    if(month +1 === 13){
      next_month = 1;
      year++;
    }
    else  next_month++;

    const response = await fetch(`https://yoga-app-api.onrender.com/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name, 
        phone: credentials.phone, 
        email: credentials.email, 
        fees_date: `${year}-${month}-${day}`, 
        valid_date: `${year}-${next_month}-${day}`, 
        pass: credentials.password,
        batch: credentials.timing
      }),
    });
    if(response.status === 200){
      const json = await response.json();
      
      setCredentials({ ...credentials, id: json});
      console.log(credentials);
      return true;
    }
    return false;
  }

  const handleSubmit = ()=>{
    if(credentials.name.length === 0){
      toast.error('Name Cannot be Blank !')
    }
    else if(!validateEmail(credentials.email)){
      toast.error('Email is InCorrect !');
    }
    else if(credentials.password.length < 5){
      toast.error('Password minimum length is 5 !');
    }
    else if(credentials.phone.length < 10 || credentials.phone.length > 10){
      toast.error('Phone Number is InCorrect !');
    }
    else if(credentials.timing.length === 0){
      toast.error('Select a Batch To Join !')
    }
    else if(!restrict){
      toast.error('You are UnderAge !');
    }
    else{
      const mypromise = new Promise((resolve, reject) => {
        var status = CompletePayment();
        setTimeout(() => {
          if(status)  resolve();
          else  reject();
        }, 3000);
      });
      toast.promise(mypromise, {
        loading: 'Processing Payment',
        success: 'Payment Successful ! Taking to Profile',
        error: 'Error in Payment !',
      });
      
      mypromise.then(() => {
        setTimeout(() => {
          navigate("/profile");
        }, 5000);
      });
    }
  }

    return(
      <>
      <Toaster />
          <div className="form-section">
            <div className="form-header">
              <img src = {asset3} alt = "asset3" className='form-header-img'/>
              Yoga Classes
            </div>

            <div className="form-topic">
              <div className="form-topic-number">1</div>
              <div className="form-topic-name">Your Basic Info</div>
            </div>
            <div className="form-subtopics">
                <div className="form-subtopics-name">Name :</div>
                <div className="form-subtopics-input"><input type='text' name = "name" value={credentials.name} className = "form-input" onChange={onChange}/></div>
            </div>
            <div className="form-subtopics">
                <div className="form-subtopics-name">Email :</div>
                <div className="form-subtopics-input"><input type='email' name = "email" value={credentials.email} className = "form-input" onChange={onChange}/></div>
            </div>
            <div className="form-subtopics">
                <div className="form-subtopics-name">Password :</div>
                <div className="form-subtopics-input"><input type='password' name = "password" value={credentials.password} className = "form-input" onChange={onChange}/></div>
            </div>
            
            <div className="form-subtopics">
                <div className="form-subtopics-name">Phone Number :</div>
                <div className="form-subtopics-input"><input type='text' name = "phone" value={credentials.phone} className = "form-input" onChange={onChange}/></div>
            </div>

            <div className="form-topic">
              <div className="form-topic-number">2</div>
              <div className="form-topic-name">Are you between 18-65 ? <input type='checkbox' onClick={()=>{setRestrict(!restrict);}}/></div>
            </div>

            <div className="form-topic">
              <div className="form-topic-number">3</div>
              <div className="form-topic-name">Your Subscription Details</div>
            </div>
            <div className="form-subtopics">
                <div className="form-subtopics-name"><input type='radio' value="6-7 AM" id='option-1' name='timing' onClick={onChange}/> 6-7 AM Batch Timing</div>
                <div className="form-subtopics-name"><input type='radio' value="7-8 AM" id='option-1' name='timing' onClick={onChange}/> 7-8 AM Batch Timing</div>
                <div className="form-subtopics-name"><input type='radio' value="8-9 AM" id='option-1' name='timing' onClick={onChange}/> 8-9 AM Batch Timing</div>
                <div className="form-subtopics-name"><input type='radio' value="5-6 PM" id='option-1' name='timing' onClick={onChange}/> 5-6 PM Batch Timing</div>
            </div>
            
            <div className="form-submit">
              <input type="button" value="Pay Fee !!" className='form-submit-button' onClick={handleSubmit}/>
              <input type="button" value="Back" className='form-submit-button' onClick={()=>{navigate("/")}}/>
            </div>

          </div>
        </>
    )
}

export default Form;