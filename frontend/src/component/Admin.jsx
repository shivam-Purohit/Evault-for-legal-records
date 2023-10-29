import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
const Admin = () => {
  const location = useLocation();
  const data = location.state;

  const tableCellStyle = {
    border: "1px solid #ddd",
    padding: "8px",
  };

  const tableHeaderStyle = {
    color: "white",
    padding: "8px",
    backgroundColor: "#007BFF",
  };

  return (
    <div>
      <h2>Case Details</h2>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Case ID</th>
            <th style={tableHeaderStyle}>Hearing Date</th>
            <th style={tableHeaderStyle}>Attorney</th>
            <th style={tableHeaderStyle}>Client</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.ID}>
              <td style={tableCellStyle}>{item.ID}</td>
              <td style={tableCellStyle}>{item.hearingDate}</td>
              <td style={tableCellStyle}>{item.attorney.prosecutionAttorney.Name}</td>
              <td style={tableCellStyle}>{item.prosecutorDetails.FirstName}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/admin/register">
      <button>Add Case</button>
    </Link>
    </div>
  );
};

export default Admin;
