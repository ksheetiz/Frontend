import asset3 from '../assets/levitate.png';
import '../css/login.css';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const Form = ({credentials, setCredentials, creds, setCreds}) =>{
  const navigate = useNavigate();
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleClick = async() =>{
    if(!validateEmail(credentials.email) || credentials.password.length < 5){
      toast.error('Credentials Entered is InCorrect !');
    }
    else{
      const response = await fetch(`http://localhost:8800/api/person`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email, 
          pass: credentials.password,
        }),
      });

      //console.log(response);

      if(response.status !== 200 ){
        toast.error('Credentials are Incorrect !');
      }
      else{
        const json = await response.json();
        //console.log(json);
        
        setCreds(json);

        setCredentials({ ...credentials, id : json[0].memid});
        setCredentials({...credentials, name : json[0].uname, phone : json[0].phone, email : json[0].email, timing : json[0].batch_selected});

        setTimeout(() => {
          toast.success("Login Successful !")
          navigate("/profile");
        }, 1000);
      }
    }
  }

  const handleBack = ()=>{
    navigate("/");
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };


    return(
      <>
      <Toaster />
        <div className="form-section-login">
          
          <div className="form-header">
            <img src = {asset3} alt = "asset3" className='form-header-img'/>
            Yoga Classes
          </div>

          <div className="form-subtopics">
              <div className="form-subtopics-name">Email :</div>
              <div className="form-subtopics-input"><input type='email' name = 'email' value={credentials.email} onChange={onChange} className = "form-input" /></div>
          </div>
          <div className="form-subtopics">
              <div className="form-subtopics-name">Password :</div>
              <div className="form-subtopics-input"><input type='password' name = 'password' value={credentials.password} onChange={onChange} className = "form-input"/></div>
          </div>
          
          <div className="form-submit">
            <input type="button" value="Login" className='form-submit-button' onClick={handleClick}/>
            <input type="button" value="Back" className='form-submit-button' onClick={handleBack}/>
          </div>

        </div>
      </>
    )
}

export default Form;