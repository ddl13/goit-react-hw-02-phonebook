import { Component } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';

import ContactForm from './contactForm/ContactForm';
import Filter from './filter/Filter';
import ContactList from './contactList/ContactList';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleSubmit = ({ name, number }) => {
    const userId = nanoid();
    const isNamePresent = this.state.contacts.find(el => el.name === name);
    if (isNamePresent) {
      return this.alert(name);
    } else {
      this.setState(({ contacts }) => ({
        contacts: [...contacts, { id: userId, name, number }],
      }));
    }
  };
  alert = name => {
    return Notiflix.Notify.failure(`${name} is alredy in contacts`);
  };
  contactDelet = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };
  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  foundedName = (name, contacts) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().replace(' ', '').includes(name)
    );
  };

  render() {
    return (
      <>
        <h2>Phonebook</h2>
        <ContactForm handleSubmit={this.handleSubmit} state={this.state} />
        <Filter findName={this.handleInput} filter={this.state.filter} />
        <ContactList
          newContact={this.foundedName(this.state.filter, this.state.contacts)}
          contactDelet={this.contactDelete}
        />
      </>
    );
  }
}

export default App;
