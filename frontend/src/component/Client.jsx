import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
const Client= () => {
  const location = useLocation();
  const data = location.state;

  const tableCellStyle = {
    border: '1px solid #ddd',
    padding: '8px',
  };

  const tableHeaderStyle = {
    color: 'white',
    padding: '8px',
  };

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        // Send the file to the backend Node.js server running at port 8002
        const response = await fetch('http://localhost:8002/client/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('File uploaded successfully');
        } else {
          console.error('Failed to upload file');
        }
      } catch (error) {
        console.error('Error uploading file', error);
      }
    }
  };

  return (
    <div>
      <h2>Case Details </h2>
      <h3>{data.ID}</h3>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <tbody>
         
          <tr>
            <th style={tableHeaderStyle}>Attorney</th>
            <td colSpan="3" style={tableCellStyle}></td>
          </tr>
          <tr>
            <td style={tableCellStyle}>Defender Attorney:</td>
            <td style={tableCellStyle}>ID: {data.attorney.defenderAttorney.Id}</td>
            <td style={tableCellStyle}>Name: {data.attorney.defenderAttorney.Name}</td>
            <td style={tableCellStyle}></td>
          </tr>
          <tr>
            <td style={tableCellStyle}>Prosecution Attorney:</td>
            <td style={tableCellStyle}>ID: {data.attorney.prosecutionAttorney.Id}</td>
            <td style={tableCellStyle}>Name: {data.attorney.prosecutionAttorney.Name}</td>
            <td style={tableCellStyle}></td>
          </tr>
          <tr>
            <th style={tableHeaderStyle}>Defender Details</th>
            <td style={tableCellStyle}>Address: {data.defenderDetails.Address}</td>
            <td style={tableCellStyle}>Age: {data.defenderDetails.Age}</td>
            <td style={tableCellStyle}>Email: {data.defenderDetails.Email}</td>
          </tr>
          <tr>
            <td style={tableCellStyle}>First Name: {data.defenderDetails.FirstName}</td>
            <td style={tableCellStyle}>Gender: {data.defenderDetails.Gender}</td>
            <td style={tableCellStyle}>ID: {data.defenderDetails.Id}</td>
            <td style={tableCellStyle}>Last Name: {data.defenderDetails.LastName}</td>
          </tr>
          <tr>
            <th style={tableHeaderStyle}>Documents</th>
            <td style={tableCellStyle}>Attorney Documents</td>
            <td style={tableCellStyle}>Defender Attorney Documents: {data.documents.attorneyDocuments.defenderAttorneyDocuments.length}</td>
            <td style={tableCellStyle}>Prosecution Attorney Documents: {data.documents.attorneyDocuments.procecutionAttorneyDocuments.length}</td>
          </tr>
          <tr>
            <td style={tableCellStyle}>Client Documents</td>
            <td style={tableCellStyle}>
  Defender Documents: <a href={data.documents.clientDocuments.defenderDocuments[0]} target="_blank" rel="noopener noreferrer">Link Text</a>
</td>


            <td style={tableCellStyle}>Prosecution Documents: {data.documents.clientDocuments.procecutionDocuments.length}</td>
            <td style={tableCellStyle}>Police Documents: {data.documents.policeDocuments.length}</td>
          </tr>
          <tr>
            <th style={tableHeaderStyle}>Hearing Date</th>
            <td colSpan="3" style={tableCellStyle}>{data.hearingDate}</td>
          </tr>
          <tr>
            <th style={tableHeaderStyle}>ID</th>
            <td colSpan="3" style={tableCellStyle}>{data.ID}</td>
          </tr>
          <tr>
            <th style={tableHeaderStyle}>Notes</th>
            <td colSpan="3" style={tableCellStyle}>{data.Notes}</td>
          </tr>
          <tr>
            <th style={tableHeaderStyle}>Case Description</th>
            <td colSpan="3" style={tableCellStyle}>{data.caseDescription}</td>
          </tr>
          <tr>
            <th style={tableHeaderStyle}>Current Hearing</th>
            <td colSpan="3" style={tableCellStyle}></td>
          </tr>
          <tr>
            <td style={tableCellStyle}>Date: {data.currentHearing.date}</td>
            <td style={tableCellStyle}>Details: {data.currentHearing.details}</td>
            <td style={tableCellStyle}>Hearing Number: {data.currentHearing.hearingNumber}</td>
            <td style={tableCellStyle}>Verdict: {data.currentHearing.verdict}</td>
          </tr>
          <tr>
            <th style={tableHeaderStyle}>Document Type</th>
            <td colSpan="3" style={tableCellStyle}>{data.docType}</td>
          </tr>
          <tr>
            <th style={tableHeaderStyle}>Hearings</th>
            <td colSpan="3" style={tableCellStyle}></td>
          </tr>
          {data.hearings.map((hearing, index) => (
            <tr key={index}>
              <td style={tableCellStyle}>Date: {hearing.date}</td>
              <td style={tableCellStyle}>Details: {hearing.details}</td>
              <td style={tableCellStyle}>Hearing Number: {hearing.hearingNumber}</td>
              <td style={tableCellStyle}>Verdict: {hearing.verdict}</td>
            </tr>
          ))}
          <tr>
            <th style={tableHeaderStyle}>Prosecutor Details</th>
            <td style={tableCellStyle}>Address: {data.prosecutorDetails.Address}</td>
            <td style={tableCellStyle}>Age: {data.prosecutorDetails.Age}</td>
            <td style={tableCellStyle}></td>
          </tr>
          <tr>
            <td style={tableCellStyle}>Email: {data.prosecutorDetails.Email}</td>
            <td style={tableCellStyle}>First Name: {data.prosecutorDetails.FirstName}</td>
            <td style={tableCellStyle}>Gender: {data.prosecutorDetails.Gender}</td>
            <td style={tableCellStyle}></td>
          </tr>
          <tr>
            <td style={tableCellStyle}>ID: {data.prosecutorDetails.Id}</td>
            <td style={tableCellStyle}>Last Name: {data.prosecutorDetails.LastName}</td>
            <td style={tableCellStyle}>Phone: {data.prosecutorDetails.Phone}</td>
            <td style={tableCellStyle}></td>
          </tr>
        </tbody>
      </table>
      <h3>Upload Document</h3>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default Client;
