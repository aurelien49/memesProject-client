import React from 'react';
import './App.css';
import HomePage from "./components/home_page";
import NavBar from "./components/navbar";
import SignInPage from "./components/signin_page";
import SignUpPage from "./components/signup_page";
import HistoryPage from "./components/history_page";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.callbackSignInSuccess = this.callbackSignInSuccess.bind(this);
        this.callbackSignUpSuccess = this.callbackSignUpSuccess.bind(this);
        this.callbackLogout = this.callbackLogout.bind(this);
        this.callbackHandleMenu = this.callbackHandleMenu.bind(this);
        this.getUserMemesHistory = this.getUserMemesHistory.bind(this);
        this.handleTokenUserDisconnection = this.handleTokenUserDisconnection.bind(this);

        this.state = {
            showHideHomePage: true,
            showHideHistoryPage: false,
            showHideSignInPage: false,
            showHideSignUpPage: false,
            showHideTabs: false,
            token: '',
            user_id: '',
            user_email: '',
            user_name: '',
            user_memes_history: [],
        };
    }

    callbackSignInSuccess = async (data) => {
        console.log('client/App/callbackSignInSuccess/data: ', data)
        // Get data from the user just connected
        this.state = ({
            ...this.state,
            token: data.token,
            user_id: data.user._id,
            user_email: data.user.email,
            user_name: data.user.name
        })


        await this.getUserMemesHistory(data.user._id)
        console.log('client/App/callbackSignInSuccess/ après getUserMemesHistory : ', data.user._id)
        // Back to home page
        this.callbackHandleMenu("/home");
    }

    callbackSignUpSuccess(_) {
        // Back to the home page
        this.callbackHandleMenu("/home");
    }

    async getUserMemesHistory(id_user) {
        console.log('client/App/getUserMemesHistory/ avant : ', id_user)
        await fetch(`https://meme-project-server-ava.onrender.com/api/memes/memes-user-history/${id_user}`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'email': this.state.user_email,
                    'authorization': this.state.token,
                },
            }
        )
            .then(response => response.json())
            .then(data2 => {
                    console.log('client/App/getUserMemesHistory/ then : ', data2)
                    this.state = ({...this.state, user_memes_history: data2});
                    this.setState({...this.state});
                }
            )
            .catch(err => {
                    console.log('client/App/getUserMemesHistory/ catch : ', err)
                    console.error(err);
                }
            );
    }

    callbackHistorical(data) {
        // Refresh saved users memes
        this.setState({...this.state, user_memes_history: data});
    }

    callbackLogout() {
        console.log('Client --> logout')
        // Clear user data when logout
        this.setState({
            ...this.state,
            user_name: '',
            token: '',
            user_id: '',
            user_email: '',
        })
        console.log('Client --> logout this.state.token = ', this.state.token)
    }

    handleTokenUserDisconnection() {
        // Erase user data
        this.callbackLogout();
        // Display sign-in page
        this.callbackHandleMenu("/signin");
    }

    callbackHandleMenu(data) {
        // Manage which page component to display
        switch (data) {
            case "/home":
                this.state = ({
                    ...this.state,
                    showHideHomePage: true,
                    showHideHistoryPage: false,
                    showHideSignInPage: false,
                    showHideSignUpPage: false
                })
                break;
            case "/history":
                this.state = ({
                    ...this.state,
                    showHideHomePage: false,
                    showHideHistoryPage: true,
                    showHideSignInPage: false,
                    showHideSignUpPage: false
                })
                break;
            case "/signin":
                this.state = ({
                    ...this.state,
                    showHideHomePage: false,
                    showHideHistoryPage: false,
                    showHideSignInPage: true,
                    showHideSignUpPage: false
                })
                break;
            case "/signup":
                this.state = ({
                    ...this.state,
                    showHideHomePage: false,
                    showHideHistoryPage: false,
                    showHideSignInPage: false,
                    showHideSignUpPage: true
                })
                break;
            case "/logout":
                this.state = ({
                    ...this.state,
                    showHideHomePage: true,
                    showHideHistoryPage: false,
                    showHideSignInPage: false,
                    showHideSignUpPage: false,
                })
                this.callbackLogout();
                break;
        }
        this.setState({...this.state});
    }

    render() {
        const {
            showHideHomePage,
            showHideHistoryPage,
            showHideSignInPage,
            showHideSignUpPage,
            token,
            user_id,
            user_email,
            user_memes_history,
        } = this.state;

        let data_user = {
            token: token,
            user_id: user_id,
            user_email: user_email,
            user_name: this.state.user_name,
            user_memes_history: user_memes_history,
        }

        // Manage the disable state of button to access 'Memes saved' menu
        let isUserLogged = token !== undefined && token !== '';
        let _showHistoricButton = isUserLogged && (user_memes_history.length > 0);

        console.log('client/App/avant render: ', token)

        return (
            <div className="container">
                <div className={"top-menubar"}>
                    <NavBar callbackHandleMenu={this.callbackHandleMenu} isUserLogged={isUserLogged}
                            showHistoricButton={_showHistoricButton}></NavBar>
                </div>
                <div className={"body-content"}>
                    {showHideHomePage &&
                        <HomePage getUserMemesHistory={this.getUserMemesHistory} isUserLogged={isUserLogged}
                                  data_user={data_user}
                                  handleTokenUserDisconnection={this.handleTokenUserDisconnection}/>}
                    {showHideHistoryPage && <HistoryPage user_memes_history={user_memes_history} user_id={user_id}
                                                         data_user={data_user}
                                                         fromParentApp={this.callbackHistorical}/>}
                    {showHideSignInPage &&
                        <SignInPage callbackSignInSuccess={this.callbackSignInSuccess}/>}
                    {showHideSignUpPage && <SignUpPage callbackSignUpSuccess={this.callbackSignUpSuccess}/>}
                </div>
            </div>
        );
    }
}

export default App;