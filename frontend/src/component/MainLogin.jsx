import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MainLogin.css'
import Admin from './Admin';
const MainLogin = () => {
  const [userType, setUserType] = useState('admin');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [caseId, setcaseId] =useState('');
  
  const navigate = useNavigate()
  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    sendLoginDetails();
  };
  
  const handleCaseIdChange = (e)=>{
    e.preventDefault();
    setcaseId(e.target.value)
  }
  // ...
  
  
  
  const sendLoginDetails = async () => {
    const payload = {
      userType: userType,
      userId: userId,
      caseId: caseId,
      password: password,
    };
  
    const url = "http://localhost:8002/login";
  
    const headers = {
      "Content-Type": "application/json",
    };
  
    
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    };
  // const [file, setFile] = useState(null);

  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   setFile(selectedFile);
  // };

  // const handleUpload = () => {
  //   const formData = new FormData();
  //   formData.append('file', file);

  //   fetch('/upload', {
  //     method: 'POST',
  //     body: formData,
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('File uploaded successfully:', data);
  //     })
  //     .catch(error => {
  //       console.error('Error uploading file:', error);
  //     });
  // };
  
    try {
      const response = await fetch(url, requestOptions);
         
      // Handle the response from the server here.
      // You can check the 'response.status' to see the HTTP status code and
      // use 'response.json()' to parse the response body if it's JSON.
      
      if (response) {
        // Request was successful (status code 200).
        // You can process the response data here.
        const responseData = await response.json();
        if(responseData){
            navigate('/client',{ state: responseData })
            if(userType==="admin")navigate('/admin',{ state: responseData })
            else if(userType==="client")navigate('/client',{ state: responseData })
            else if(userType==="attorney")navigate('/attorney',{ state: responseData })
            else if(userType==="police")navigate('/police',{ state: responseData })
        }
        
      } else {
        
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      // Handle network errors or other exceptions.
      console.error("Error:", error);
    }
  };
  
  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userType">User Type</label>
          <select
            id="userType"
            name="userType"
            value={userType}
            onChange={handleUserTypeChange}
          >
            <option value="admin">Admin</option>
            <option value="attorney">Attorney</option>
            <option value="client">Client</option>
            <option value="police">Police</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="userId">ID</label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={userId}
            onChange={handleUserIdChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="caseId">Case ID</label>
          <input
            type="text"
            id="caseId"
            name="caseId"
            value={caseId}
            onChange={handleCaseIdChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default MainLogin;
