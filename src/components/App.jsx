import { GlobalStyle } from './GlobalStyle';
import Notiflix from 'notiflix';
import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const listContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');

    if (savedContacts === null || JSON.parse(savedContacts).length === 0) {
      return listContacts;
    }
    const parsedContacts = JSON.parse(savedContacts);
    return parsedContacts;
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    const arrayOfContactsName = [];

    for (const contact of contacts) {
      arrayOfContactsName.push(contact.name);
    }

    if (arrayOfContactsName.includes(newContact.name)) {
      Notiflix.Notify.failure(`${newContact.name} is already in contacts`);
      return;
    }

    setContacts([...contacts, newContact]);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const handleInputChange = event => {
    setFilter(event.target.value);
  };

  const actualVisibleContact = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleInputChange} />
      {contacts.length > 0 ? (
        <ContactList items={actualVisibleContact()} onDelete={deleteContact} />
      ) : (
        <p> Phonebook is empty</p>
      )}
      <GlobalStyle />
    </div>
  );
};

Notiflix.Notify.init({
  position: 'center-top',
  width: '300px',
  distance: '10px',
  opacity: 1,
  rtl: false,
  timeout: 1000,
});
