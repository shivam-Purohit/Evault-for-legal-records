import React, { useState } from "react";
import "../styles/createcase.css"
const CreateCase = () => {
  const [formData, setFormData] = useState({
    ID: "",
    prosecutorDetails: {
      Id: "",
      FirstName: "",
      LastName: "",
      Age: "",
      Gender: "",
      Address: "",
      Email: "",
      Phone: "",
    },
    DefenderDetails: {
      Id: "",
      FirstName: "",
      LastName: "",
      Age: "",
      Gender: "",
      Address: "",
      Email: "",
      Phone: "",
    },
    caseDescription: "",
    Attorney: {
      prosecutionAttorney: {
        Id: "",
        Name: "",
      },
      DefenderAttorney: {
        Id: "",
        Name: "",
      },
    },
    HearingDate: "2023-12-12",
    Documents: {
      clientDocuments: {
        procecutionDocuments: "",
        defenderDocuments: "",
      },
      policeDocuments: "",
      AttorneyDocuments: {
        procecutionAttorneyDocuments: "",
        defenderAttorneyDocuments: "",
      },
    },
    hearings: [
      {
        hearingNumber: "",
        date: "",
        details: "",
        verdict: "",
      },
    ],
    currentHearing: {
      hearingNumber: "",
      date: "",
      details: "",
      verdict: "",
    },
    Notes: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const names = name.split('.');
    
    if (names.length === 1) {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else if (names.length === 2) {
      const [section, field] = names;
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [field]: value,
        },
      });
    } else if (names.length === 3) {
      const [section, subsection, field] = names;
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [subsection]: {
            ...formData[section][subsection],
            [field]: value,
          },
        },
      });
    }
  };
  

  
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send the formData to the backend route (replace with your actual API endpoint)
    const response = await fetch("http://localhost:8002/admin/add-case", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log("Data sent successfully!");
    } else {
      console.error("Failed to send data.");
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-section">
        <label>Case ID:</label>
        <input
          type="text"
          name="ID"
          value={formData.ID}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-section">
      <h3 className="form-section-title">Prosecutor Details</h3>
        <input
          className="form-field"
          type="text"
          name="prosecutorDetails.Id"
          value={formData.prosecutorDetails.Id}
          onChange={handleInputChange}
          placeholder="ID"
        />
        <input
          className="form-field"
          type="text"
          name="prosecutorDetails.FirstName"
          value={formData.prosecutorDetails.FirstName}
          onChange={handleInputChange}
          placeholder="First Name"
        />
        <input
          className="form-field"
          type="text"
          name="prosecutorDetails.LastName"
          value={formData.prosecutorDetails.LastName}
          onChange={handleInputChange}
          placeholder="Last Name"
        />
        <input
          className="form-field"
          type="text"
          name="prosecutorDetails.Age"
          value={formData.prosecutorDetails.Age}
          onChange={handleInputChange}
          placeholder="Age"
        />
        <input
          className="form-field"
          type="text"
          name="prosecutorDetails.Gender"
          value={formData.prosecutorDetails.Gender}
          onChange={handleInputChange}
          placeholder="Gender"
        />
        <input
          className="form-field"
          type="text"
          name="prosecutorDetails.Address"
          value={formData.prosecutorDetails.Address}
          onChange={handleInputChange}
          placeholder="Address"
        />
        <input
          className="form-field"
          type="text"
          name="prosecutorDetails.Email"
          value={formData.prosecutorDetails.Email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        <input
          className="form-field"
          type="text"
          name="prosecutorDetails.Phone"
          value={formData.prosecutorDetails.Phone}
          onChange={handleInputChange}
          placeholder="Phone"
        />
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Defender Details</h3>
        <input
          className="form-field"
          type="text"
          name="DefenderDetails.Id"
          value={formData.DefenderDetails.Id}
          onChange={handleInputChange}
          placeholder="ID"
        />
        <input
          className="form-field"
          type="text"
          name="DefenderDetails.FirstName"
          value={formData.DefenderDetails.FirstName}
          onChange={handleInputChange}
          placeholder="First Name"
        />
        <input
          className="form-field"
          type="text"
          name="DefenderDetails.LastName"
          value={formData.DefenderDetails.LastName}
          onChange={handleInputChange}
          placeholder="Last Name"
        />
        <input
          className="form-field"
          type="text"
          name="DefenderDetails.Age"
          value={formData.DefenderDetails.Age}
          onChange={handleInputChange}
          placeholder="Age"
        />
        <input
          className="form-field"
          type="text"
          name="DefenderDetails.Gender"
          value={formData.DefenderDetails.Gender}
          onChange={handleInputChange}
          placeholder="Gender"
        />
        <input
          className="form-field"
          type="text"
          name="DefenderDetails.Address"
          value={formData.DefenderDetails.Address}
          onChange={handleInputChange}
          placeholder="Address"
        />
        <input
          className="form-field"
          type="text"
          name="DefenderDetails.Email"
          value={formData.DefenderDetails.Email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        <input
          className="form-field"
          type="text"
          name="DefenderDetails.Phone"
          value={formData.DefenderDetails.Phone}
          onChange={handleInputChange}
          placeholder="Phone"
        />
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Case Description</h3>
        <textarea
          className="form-textarea"
          name="caseDescription"
          value={formData.caseDescription}
          onChange={handleInputChange}
          placeholder="Case Description"
        />
      </div>

      
      <div className="form-section">
        <h3 className="form-section-title">Attorney Details</h3>
        
        <div className="form-section">
          <h4 className="form-section-title">Prosecution Attorney</h4>
          <input
            className="form-field"
            type="text"
            name="Attorney.prosecutionAttorney.Id"
            value={formData.Attorney.prosecutionAttorney.Id}
            onChange={handleInputChange}
            placeholder="ID"
          />
          <input
            className="form-field"
            type="text"
            name="Attorney.prosecutionAttorney.Name"
            value={formData.Attorney.prosecutionAttorney.Name}
            onChange={handleInputChange}
            placeholder="Name"
          />
        </div>

        <div className="form-section">
          <h4 className="form-section-title">Defender Attorney</h4>
          <input
            type="text"
            name="Attorney.DefenderAttorney.Id"
            value={formData.Attorney.DefenderAttorney.Id}
            onChange={handleInputChange}
            placeholder="ID"
          />
          <input
            type="text"
            name="Attorney.DefenderAttorney.Name"
            value={formData.Attorney.DefenderAttorney.Name}
            onChange={handleInputChange}
            placeholder="Name"
          />
      
      </div>
  </div>
  

<div className="form-section">
  <label className="form-label">Notes:</label>
  <textarea
    className="form-textarea"
    name="Notes"
    value={formData.Notes}
    onChange={handleInputChange}
  />
</div>

<button className="form-button" type="submit">
  Submit
</button>
</form>
)};

export default CreateCase;
