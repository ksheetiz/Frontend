import '../css/home.css';
import asset3 from '../assets/levitate.png';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className='home-section'>
            <div className="form-header">
                <img src = {asset3} alt = "asset3" className='form-header-img'/>
                Yoga Classes
            </div>
            <div className="home-options-section">
                <input type="button" value="Login" className='home-option-button' onClick = {()=>{navigate("/login")}}/>
                <input type="button" value="SignUp" className='home-option-button' onClick = {()=>{navigate("/register")}}/>
            </div>
        </div>
    )
}

export default Home;