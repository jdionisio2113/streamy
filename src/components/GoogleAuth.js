import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions'

class GoogleAuth extends React.Component {

    constructor(props) {
        super(props);

        this.renderAuthButton = this.renderAuthButton.bind(this);
        this.onAuthChange = this.onAuthChange.bind(this);
        this.onSignInClick = this.onSignInClick.bind(this);
        this.onSignOutClick = this.onSignOutClick.bind(this);
    }

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '236808226059-h88pnirto7pphi34uk9b0mu5m8ukb2s3.apps.googleusercontent.com',
                scope: 'email'
            })
                .then(() => {
                    // Assign auth instance to this.auth
                    this.auth = window.gapi.auth2.getAuthInstance();

                    // Update auth state in redux store
                    this.onAuthChange(this.auth.isSignedIn.get())
                    // Wait for authentication status to change
                    this.auth.isSignedIn.listen(this.onAuthChange);
                })
        });
    }

    onAuthChange(isSignedIn) {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    onSignInClick() {
        this.auth.signIn();
    }

    onSignOutClick() {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            )
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon" />
                    Sign in
                </button>
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);