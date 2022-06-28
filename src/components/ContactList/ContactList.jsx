import PropTypes from "prop-types";

import styles from './contactList.module.css'

const ContactList = ({ contacts, removeContacts }) => {
    const contactEl = contacts.map(({ id, name, number }) => (
        <li className={styles.item} key={id}><span className={styles.name}>{name}:</span> <span className={styles.text}>{number}</span>
            <button className={styles.btn} onClick={() => removeContacts(id)}>Delete</button></li>
    ))

    return (
        <ul className={styles.list}>
            {contactEl}
        </ul>
    )
}

ContactList.defaultProps = {
    contacts: [],
    removeContacts: ()=>{},
}

ContactList.propTypes = {
    removeContacts: PropTypes.func,
    contacts: PropTypes.arrayOf(PropTypes.exact({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    })),
}

export default ContactList;