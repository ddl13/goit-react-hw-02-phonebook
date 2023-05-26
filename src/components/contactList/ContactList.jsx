import styles from './ContactsList.module.css';

const ContactList = ({ newContact, contactDelete }) => {
  const listItems = newContact.map(contact => {
    return (
      <li className={styles.item} key={contact.id}>
        {contact.name}: {contact.number}
        <button
          className={styles.btn}
          onClick={() => {
            contactDelete(contact.id);
          }}
        >
          Delete
        </button>
      </li>
    );
  });

  return <ul>{listItems}</ul>;
};

export default ContactList;
