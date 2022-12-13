import '../css/profile.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import asset3 from '../assets/levitate.png';
import asset4 from '../assets/groovy.png';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const Profile = ({credentials, setCredentials, creds}) =>{

    const [timing, setTiming] = useState(credentials.timing);
    const navigate = useNavigate();

    const handleClick = async() =>{
        //console.log(timing);
        const response = await fetch(`http://localhost:8800/api/update_batch`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            batch: timing,
            id: credentials.id
            }),
        });

      if(response.status != 200){
        toast.error('Cannot Change Timing Right now !');
      }
      else{
        const json = await response.json();

        toast.promise(json, {
          loading: 'Checking Details',
          success: 'Batch Timing Changed',
          error: 'Batch Timing not Chnaged',
        });
        console.log(json);
        if(json.length !== 0)
            setCredentials({ ...credentials, timing: timing });
      }
    }

    const handleMembership = async() =>{
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        const response = await fetch(`http://localhost:8800/api/update_membership`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fees_date :`${year}-${month}-${day}`,
                id: credentials.email
            }),
        });

        if(response !== 200){
            toast.error("Cannot Extended Membership Now !");
        }
        else{
            toast.success("Membership Extended !");
        }
    }
    

    

    const onChange = (e) => {
        setTiming(e.target.value);
    };

    const handleBack = () =>{
        setCredentials({...credentials, id : 0, name : "", phone : "", email : "", timing : ""});
        navigate("/");
    }

    return(
    <>
    <Toaster />
        <div className="profile-section">
            <div className="profile-header">
                <div className="profile-header-content">
                    <img src = {asset3} alt = "asset3" className='form-header-img'/>
                    Yoga Classes
                </div>
            </div>
            <div className="profile-body">
                <div className="profile-body-section1">
                    <div className="profile-section-header">
                        <div className="form-topic-number">1</div>
                        Details
                    </div>

                    <div className="profile-section-body">

                        <div className="profile-section-body-content">
                            <div className="profile-section-option">Name : </div>
                            <div className="profile-section-data">{credentials.name}</div>
                        </div>
                        <div className="profile-section-body-content">
                            <div className="profile-section-option">Email : </div>
                            <div className="profile-section-data">{credentials.email}</div>
                        </div>
                        <div className="profile-section-body-content">
                            <div className="profile-section-option">Batch Timing : </div>
                            <div className="profile-timing">
                                <div className="profile-section-data">{credentials.timing}</div>
                                <Popup trigger={<button className="button timing-change-button"> Change </button>} modal>
                                    <div className="profile-modal">
                                        <span> Select New Timing </span>
                                        <div className="profile-subtopics-name"><input type='radio' value="6-7 AM" id='option-1' name='timing' onClick={onChange}/> 6-7 AM Batch Timing</div>
                                        <div className="profile-subtopics-name"><input type='radio' value="7-8 AM" id='option-1' name='timing' onClick={onChange}/> 7-8 AM Batch Timing</div>
                                        <div className="profile-subtopics-name"><input type='radio' value="8-9 AM" id='option-1' name='timing' onClick={onChange}/> 8-9 AM Batch Timing</div>
                                        <div className="profile-subtopics-name"><input type='radio' value="5-6 PM" id='option-1' name='timing' onClick={onChange}/> 5-6 PM Batch Timing</div>
                                        <input type="button" value="Change" className='timing-change-button' onClick={handleClick}/>
                                    </div>
                                </Popup>
                                {/* <input type="button" value="Change" className='timing-change-button' onClick={handleClick}/> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile-body-section2"><img src={asset4} alt="asset" className='profile-body-img'/></div>
            </div>
            <div className="profile-renew-membership">
                Renew Your Membership
            <input type="button" value="Renew Membership" className='profile-renew-button' onClick={handleMembership}/>
          </div>
            <div className="profile-renew-membership">
            <input type="button" value="Logout" className='profile-renew-button' onClick={handleBack}/>
          </div>
        </div>
    </>
    )
}

export default Profile;