import React from 'react';

class GoogleAuth extends React.Component {

    constructor(props) {
        super(props);

        this.state = { isSignedIn: null }

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
                    this.auth = window.gapi.auth2.getAuthInstance();
                    this.setState({
                        isSignedIn: this.auth.isSignedIn.get()
                    })
                    this.auth.isSignedIn.listen(this.onAuthChange);
                })
        });
    }

    onAuthChange() {
        this.setState({
            isSignedIn: this.auth.isSignedIn.get()
        })
    }

    onSignInClick() {
        this.auth.signIn();
    }

    onSignOutClick() {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            console.log('null')
            return null;
        } else if (this.state.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            )
        } else {
            // console.log('signed out')
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
                {/* Google auth */}
            </div>
        )
    }
}

export default GoogleAuth;