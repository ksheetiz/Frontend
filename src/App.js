import './App.css';
import { Routes, Route } from "react-router-dom";
import asset1 from './assets/meditating.png';
import asset2 from './assets/dancing.png';
import Form_register from './components/Form-register';
import Form_Login from './components/Form-login';
import Profile from './components/Profile';
import Home from './components/Home';
import { useState } from 'react';

function App() {

  const [credentials, setCredentials] = useState({id : 0, name : "", password : "", phone : "", email : "", timing : ""});
  const [creds, setCreds] = useState({});
  return (
    <div className="App-background">
        <div className="image-section-1"><img src={asset1} alt="asset1" /></div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Form_register credentials = {credentials} setCredentials = {setCredentials}/>} />
          <Route path="/login" element={<Form_Login credentials = {credentials} setCredentials = {setCredentials} creds = {creds} setCreds={setCreds}/>} />
          <Route path="/profile" element={<Profile credentials = {credentials} setCredentials = {setCredentials} creds = {creds}/>} />
        </Routes>
        <div className="image-section-2"><img src={asset2} alt="asset2" /></div>
    </div>
  );
}

export default App;
