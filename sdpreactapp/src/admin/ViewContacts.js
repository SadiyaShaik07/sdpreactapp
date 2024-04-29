import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config'
export default function ViewContacts() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${config.url}/viewcontacts`);
      setContacts(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Contacts</h1>
      
<div class="contact-container">
      <table border={1} align="center" style={{ width: 'auto', height: 'auto' }}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
  {Array.isArray(contacts) && contacts.length > 0 ? (
    contacts.map((contact, index) => (
      <tr key={index}>
        <td>{contact.username}</td>
        <td>{contact.message}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7">Data Not Found</td>
    </tr>
  )}
</tbody>
        </table>
        </div>
    </div>
  );
}