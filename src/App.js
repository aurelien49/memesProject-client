import React from 'react';
import './App.css';
import HomePage from "./components/home_page";
import NavBar from "./components/navbar";
import SignInPage from "./components/signin_page";
import SignUpPage from "./components/signup_page";
import {Route, Routes} from "react-router-dom";

class App extends React.Component {

    constructor(props) {
        super(props);

        const locStorage = this.getLocalStorage();

        this.state = {
            showHideLoginPage: false,
            showHideSignUpPage: false,
            showHideTabs: false,
            showHideHomePage: true,
            showHideHistoryPage: false,
            token: locStorage['token'],
            user_id: locStorage['user_id'],
            user_email: locStorage['user_email'],
            user_name: locStorage['user_name'],
        };
        this.callbackLogin = this.callbackLogin.bind(this);
        this.callbackLogout = this.callbackLogout.bind(this);
    }

    getLocalStorage() {
        console.log('__________________________ getLocalStorage');
        let token = localStorage.getItem("token");
        let user_id = localStorage.getItem("user_id");
        let user_email = localStorage.getItem("user_email");
        let user_name = localStorage.getItem("user_name");

        token = token !== null ? token : '';
        user_id = user_id !== null ? user_id : '';
        user_email = user_email !== null ? user_email : '';
        user_name = user_name !== null ? user_name : '';

        return {token: token, user_id: user_id, user_email: user_email, user_name: user_name}
    }


    callbackLogin = async (data) => {
        console.log('__________________________ callbackLogin');
        localStorage.setItem("token", JSON.stringify(data.token));
        localStorage.setItem("user_id", JSON.stringify(data.user._id));
        localStorage.setItem("user_email", JSON.stringify(data.user.email));
        localStorage.setItem("user_name", JSON.stringify(data.user.name));

        console.log('********************** data.user.name: ', data.user.name)
        console.log('********************** data.user.user_id: ', data.user._id)

        this.state.user_name = data.user.name;
        this.state.user_id = data.user._id;
        this.setState({})
    }

    callbackLogout() {
        console.log('__________________________ callbackLogout');
        localStorage.clear();
        this.state.user_name = '';
    }

    render() {
        const {
            showHideTabs,
            showHideLogInPage,
            showHideLogUpPage,
            showHideHomePage,
            showHideHistoryPage,
            user_id
        } = this.state;

        let isUserLogged = this.state.user_name !== undefined && this.state.user_name !== '';

        console.log('---------------------- data.user.name: ', this.state.user_name)
        console.log('---------------------- data.user.user_id: ', this.state.user_id)

        return (
            <div>
                <NavBar isUserLogged={isUserLogged} callbackLogout={this.callbackLogout}></NavBar>
                {!isUserLogged ? <h1>Bonjour visiteur</h1> :
                    <h1>Bonjour {this.state.user_name} !</h1>}
                <div className="container">
                    <Routes>
                        <Route path="/"
                               element={<HomePage isUserLogged={isUserLogged} user_id={this.state.user_id}/>}></Route>
                        <Route path="/signin" element={<SignInPage fromParentApp={this.callbackLogin}/>}></Route>
                        <Route path="/signup" element={<SignUpPage/>}></Route>
                    </Routes>
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
 */