import { Component } from 'react';
import { nanoid } from 'nanoid';

import Section from './Section';
import ContactsForm from './ContactsForm';
import ContactList from './ContactList';

import styles from './app.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const newContacts = JSON.parse(localStorage.getItem('contacts'));
    if (newContacts) {
      this.setState({ contacts: newContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContacts = ({ name, number }) => {
    const newContact = {
      name,
      number,
      id: nanoid(),
    };
    this.setState(prevState => {
      const findName = prevState.contacts.find(el => el.name === name);
      if (!findName) {
        return { contacts: [...prevState.contacts, newContact] };
      } else {
        alert(`${newContact.name} is already in contacts`);
      }
    });
  };

  removeContacts = id => {
    this.setState(({ contacts }) => {
      return {
        contacts: contacts.filter(contact => contact.id !== id),
      };
    });
  };

  handleFilter = ({ target }) => {
    this.setState({
      filter: target.value,
    });
  };

  getFiltredContacts = () => {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }
    const filterValue = filter.toLowerCase();
    const filterContacts = contacts.filter(({ name }) => {
      const nameValue = name.toLowerCase();
      return nameValue.includes(filterValue);
    });
    return filterContacts;
  };

  render() {
    const { addContacts, removeContacts, handleFilter } = this;

    const contacts = this.getFiltredContacts();

    return (
      <div className={styles.container}>
        <Section title="Phonebook">
          <ContactsForm onSubmit={addContacts} />
        </Section>
        <Section title="Contacts">
          <div className={styles.wrap}>
            <label className={styles.label}>
              Find contacts by name
              <input
                className={styles.input}
                onChange={handleFilter}
                type="text"
                name="filter"
              />
            </label>
          </div>
          <ContactList contacts={contacts} removeContacts={removeContacts} />
        </Section>
      </div>
    );
  }
}
