import React from 'react';
import './App.css';
import HomePage from "./components/home_page";
import NavBar from "./components/navbar";
import SignInPage from "./components/signin_page";
import SignUpPage from "./components/signup_page";
import HistoryPage from "./components/history_page";
import support from "./assets/img/support.svg";

class App extends React.Component {

    constructor(props) {
        super(props);
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
        this.callbackSignInSuccess = this.callbackSignInSuccess.bind(this);
        this.callbackSignUpSuccess = this.callbackSignUpSuccess.bind(this);
        this.callbackLogout = this.callbackLogout.bind(this);
        this.callbackHandleMenu = this.callbackHandleMenu.bind(this);
        this.getUserMemesHistory = this.getUserMemesHistory.bind(this);
    }

    callbackSignInSuccess = async (data) => {
        console.log('__________________________ callbackLogin');
        this.state = ({
            ...this.state,
            token: data.token,
            user_id: data.user._id,
            user_email: data.user.email,
            user_name: data.user.name
        })

        console.log(`** data.user.name = ${data.user.name}, data.user._id = ${data.user._id}`)

        // Get user historic memes
        await this.getUserMemesHistory(data.user._id)
        // Return to the home page
        this.callbackHandleMenu("/home");
    }

    callbackSignUpSuccess(data) {
        // Return to the home page
        this.callbackHandleMenu("/home");
    }

    async getUserMemesHistory(id_user) {
        let {
            user_memes_history,
        } = this.state;
        console.log(`__________________________ getUserMemesHistory(${id_user})`);
        await fetch(`https://meme-project-server-ava.onrender.com/api/memes/memes-user-history/${id_user}`)
            .then(response => response.json())
            .then(data2 => {
                    console.log('client/App/getUserMemesHistory: data2: ', data2)
                    console.log('client/App/getUserMemesHistory: this.state: avant ', this.state)
                    this.state = ({...this.state, user_memes_history: data2});
                    console.log('client/App/getUserMemesHistory: this.state: après ', this.state)
                    this.setState({...this.state});
                }
            )
            .catch(err => {
                    console.error(err);
                }
            );
    }

    callbackHistorical(data) {
        this.setState({...this.state, user_memes_history: data});
    }

    callbackLogout() {
        console.log('__________________________ callbackLogout');
        localStorage.clear();
        this.setState({...this.state, user_name: ''})
    }

    callbackHandleMenu(data) {
        console.log('++++ client : callbackMenu : ', data)
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
                    ...this.state, showHideHomePage: false,
                    showHideHistoryPage: true,
                    showHideSignInPage: false,
                    showHideSignUpPage: false
                })
                break;
            case "/signin":
                this.state = ({
                    ...this.state, showHideHomePage: false,
                    showHideHistoryPage: false,
                    showHideSignInPage: true,
                    showHideSignUpPage: false
                })
                break;
            case "/signup":
                this.state = ({
                    ...this.state, showHideHomePage: false,
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

        let isUserLogged = user_name !== undefined && user_name !== '';
        let _showHistoricButton = window.location.pathname === '/';
        _showHistoricButton = _showHistoricButton && isUserLogged && (user_memes_history.length > 0);

        /* console.log(`++++
          isUserLogged: ${isUserLogged},
          _showHistoricButton: ${_showHistoricButton},
          user_memes_history.length: ${user_memes_history.length},
          user_memes_history: ${user_memes_history},
          user_name: ${user_name},
          user_id ${user_id}`)*/

        return (
            <div>
                <NavBar callbackHandleMenu={this.callbackHandleMenu} isUserLogged={isUserLogged}
                        showHistoricButton={_showHistoricButton}></NavBar>
                <span><br></br></span>
                <span><img hidden={!isUserLogged} src={support} alt="support face"></img></span>
                <span><h1>{!isUserLogged ? 'No user connected !' : 'Connected with ' + this.state.user_name}</h1></span>

                <div className="container">
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

export default App;
/*
                {showHideTabs && <TopBarMenu menuAppCallBack={this.callbackMenu}/>}
                {showHideHomePage && <HomePage userLogged={false}/>}
                {showHideHistoryPage && <HistoryPage/>}
                {showHideLogInPage && <LoginPage userLogged={this.callbackShowLogInPage}/>}
                {showHideLogUpPage && <LoginPage userLogged={this.callbackShowLogUpPage}/>}

                        let Component;
        switch (window.location.pathname) {
            case "/":
                Component = HomePage;
                break;
            case "/signin":
                Component = SignInPage;
                break;
            case "/signup":
                Component = SignUpPage;
                break;
            case "/logout":
                Component = LogoutPage;
                break;
        }


                        <Route path="/" element={<HomePage/>}></Route>
                        <Route path="/signin" element={<SignInPage/>}></Route>
                        <Route path="/signup" element={<SignUpPage/>}></Route>
                        <Route path="/logout" element={<LogoutPage/>}></Route>

                        <Route path="/signin" render={this.callbackLogin} component={<SignInPage/>}></Route>


    callbackShowLogInPage = (data) => {
        this.setState({
            showHideLoginPage: true,
            showHideSignUpPage: false,
            showHideHomePage: false,
            showHideHistoryPage: false,
        })
    }

    callbackShowLogUpPage = (data) => {
        this.setState({
            showHideLoginPage: false,
            showHideSignUpPage: true,
            showHideHomePage: false,
            showHideHistoryPage: false,
        })
    }

    callbackMenu = (menuData) => {
        switch (menuData) {
            case "gallery":
                this.setState({
                    showHideHomePage: true,
                    showHideHistoryPage: false,
                });
                break;
            case "hystory":
                this.setState({
                    showHideHomePage: false,
                    showHideHistoryPage: true,
                });
                break;
            default:
                console.error('Erreur gestion du menu');
        }
    }

                        <Routes>
                        <Route path="/"
                               element={<HomePage isUserLogged={isUserLogged} user_id={this.state.user_id}/>}></Route>
                        <Route path="/signin" element={<SignInPage fromParentApp={this.callbackLogin}/>}></Route>
                        <Route path="/signup" element={<SignUpPage/>}></Route>
                        <Route path="/historical"
                               element={<HistoryPage user_memes_history={user_memes_history}
                                                     user_id={user_id}
                                                     fromParentApp={this.callbackHistorical}/>}></Route>
                    </Routes>
 */