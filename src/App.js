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
        // Get data from the user just connected
        this.state = ({
            ...this.state,
            token: data.token,
            user_id: data.user._id,
            user_email: data.user.email,
            user_name: data.user.name
        })


        await this.getUserMemesHistory(data.user._id)
        // Back to home page
        this.callbackHandleMenu("/home");
    }

    callbackSignUpSuccess(_) {
        // Back to the home page
        this.callbackHandleMenu("/home");
    }

    async getUserMemesHistory(id_user) {
        await fetch(`https://meme-project-server-ava.onrender.com/api/memes/memes-user-history/${id_user}`)
            .then(response => response.json())
            .then(data2 => {
                    this.state = ({...this.state, user_memes_history: data2});
                    this.setState({...this.state});
                }
            )
            .catch(err => {
                    console.error(err);
                }
            );
    }

    callbackHistorical(data) {
        // Refresh saved users memes
        this.setState({...this.state, user_memes_history: data});
    }

    callbackLogout() {
        // Clear user data when logout
        this.setState({
            ...this.state,
            user_name: '',
            token: '',
            user_id: '',
            user_email: '',
        })
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
                    user_name: '',
                })
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
            user_id,
            user_memes_history,
            user_name
        } = this.state;

        // Manage the disable state of button to access 'Memes saved' menu
        let isUserLogged = user_name !== undefined && user_name !== '';
        let _showHistoricButton = isUserLogged && (user_memes_history.length > 0);

        return (
            <div className="container">
                <div className={"mantine-hpmcve"}>
                    <img src={"../assets/img/cocktail.453b4e0dfb1d01d3b061116811e21cdf.svg"} alt={"logo"}/>
                    <div>
                        <a href={"/"}>Home</a>
                        <a href={"/"}>Cocktail</a>
                        <a href={"/"}>Favorite</a>
                        <a href={"/"}>Random</a>
                    </div>
                    <div>
                        <input className="mantine-Input-input mantine-TextInput-input mantine-1y8wd0o"
                               id="mantine-r0" type="text" placeholder="Search a cocktail"
                               aria-label="Search a cocktail" aria-invalid="false" value=""/>

                    </div>
                </div>

                <div className={"body-content"}>
                    {showHideHomePage &&
                        <HomePage getUserMemesHistory={this.getUserMemesHistory} isUserLogged={isUserLogged}
                                  user_id={this.state.user_id}/>}
                    {showHideHistoryPage && <HistoryPage user_memes_history={user_memes_history} user_id={user_id}
                                                         fromParentApp={this.callbackHistorical}/>}
                    {showHideSignInPage &&
                        <SignInPage callbackSignInSuccess={this.callbackSignInSuccess}/>}
                    {showHideSignUpPage && <SignUpPage callbackSignUpSuccess={this.callbackSignUpSuccess}/>}
                </div>
            </div>
        );
    }
}

/*
    <div className={"top-menubar"}>
                    <NavBar callbackHandleMenu={this.callbackHandleMenu} isUserLogged={isUserLogged}
                            showHistoricButton={_showHistoricButton}></NavBar>
                </div>
 */
export default App;