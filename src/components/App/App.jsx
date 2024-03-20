import React, { useState, useEffect } from 'react';
import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';
import { nanoid } from 'nanoid';
import styles from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []); 

  const addContact = (name, number) => {
    const trimmedName = name.trim();
    const isDuplicate = contacts.some(contact => contact.name.toLowerCase() === trimmedName.toLowerCase());

    if (isDuplicate) {
      alert(`${trimmedName} is already in contacts!`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name: trimmedName,
      number
    };

    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts); 
    localStorage.setItem('contacts', JSON.stringify(updatedContacts)); 
  };

  const handleDelete = (id) => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts); 
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} onDelete={handleDelete} />
    </div>
  );
}

export default App;
