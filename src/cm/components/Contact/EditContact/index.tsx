import { Component, FormEvent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getContact, updateContact } from "../../../actions/contactActions";
import TextInputGroup from '../../../../bit/components/TextInputGroup';
import { Contact } from '../../../models';

class EditContact extends Component<{
    getContact: (id: string) => Promise<void>,
    updateContact: (connect: Contact) => void,
    match: { params: { id: string } },
    history: { push: (path: string) => void }
}, Contact & { errors: Contact }> {

    state = {
        name: '',
        email: '',
        phone: '',
        errors: {} as Contact
    };

    static propTypes = {
        contact: PropTypes.object.isRequired,
        getContact: PropTypes.func.isRequired
    };

    onChange = (e: { target: HTMLInputElement }) => {
        this.setState({ ...this.state, [e.target.name]: e.target.value });
    };

    onSubmit = (e: FormEvent) => {
        e.preventDefault();
        const { name, email, phone } = this.state;

        if (name === '') {
            this.setState({ errors: { name: 'Name is required' } });
            return;
        }

        if (email === '') {
            this.setState({ errors: { email: 'Email is required' } });
            return;
        }

        if (phone === '') {
            this.setState({ errors: { phone: 'Phone is required' } });
            return;
        }

        const newContact: Contact = {
            name,
            email,
            phone
        };

        this.props.updateContact(newContact);

        this.setState({
            name: '',
            phone: '',
            email: '',
            errors: {}
        });

        this.props.history.push('/');

    };

    componentWillReciveProps(nextProps: { contact: Contact }) {
        const { email, name, phone } = nextProps.contact;
        this.setState({
            name,
            email,
            phone
        });
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getContact(id);
    }

    render() {

        const { name, email, phone, errors } = this.state;

        return (
            <div className="card mb-3">
                <div className="card-header">Edit Contact</div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                        <TextInputGroup
                            label="Name"
                            name="name"
                            placeholder="Enter Name"
                            value={name}
                            onChange={this.onChange}
                            error={errors.name}
                        />
                        <TextInputGroup
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={this.onChange}
                            error={errors.email}
                        />
                        <TextInputGroup
                            label="Phone"
                            name="phone"
                            placeholder="Enter Phone"
                            value={phone}
                            onChange={this.onChange}
                            error={errors.phone}
                        />
                        <input
                            type="submit"
                            value="Update Contact"
                            className="btn btn-light btn-block"
                        />
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: { contact: { contact: Contact } }) => ({
    contact: state.contact.contact
});

const ConectedComponent = connect(mapStateToProps, { getContact, updateContact })(EditContact);

export default ConectedComponent;