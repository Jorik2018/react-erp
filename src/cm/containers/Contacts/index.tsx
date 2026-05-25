import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ContactPanel from '../../components/Contact/Contact';
import { getContacts } from "../../actions/contactActions";
import { Contact } from '../../models';

class Contacts extends Component<{
    contacts: Contact[]
    getContacts: () => void
}> {

    static propTypes = {
        contacts: PropTypes.array.isRequired,
        getContacts: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getContacts();
    }

    render() {
        const { contacts } = this.props;
        return (
            <>
                <h1 className="display-4 mb-2">
                    <span className="text-danger">Contact</span> List
                </h1>
                {contacts.map(contact => (
                    <ContactPanel key={contact.id} contact={contact} />
                ))}
            </>
        );
    }
}

const mapStateToProps = (state: { contact: { contacts: Contact[] } }) => ({
    contacts: state.contact.contacts
});

const ConnectedComponent = connect(mapStateToProps, { getContacts })(Contacts);

export default ConnectedComponent;