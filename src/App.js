import React from 'react';
import './App.css';
import HomePage from "./components/home_page";
import NavBar from "./components/navbar";
import SignInPage from "./components/signin_page";
import SignUpPage from "./components/signup_page";
import LogoutPage from "./components/logout_page";
import {Route, Routes} from "react-router-dom";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showHideLoginPage: false,
            showHideSignUpPage: false,
            showHideTabs: false,
            showHideHomePage: true,
            showHideHistoryPage: false,
        };
    }

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

    render() {
        const {showHideTabs, showHideLogInPage, showHideLogUpPage, showHideHomePage, showHideHistoryPage} = this.state;

        return (
            <div>
                <NavBar></NavBar>
                <div className="container">
                    <Routes>
                        <Route path="/" element={<HomePage/>}></Route>
                        <Route path="/signin" element={<SignInPage/>}></Route>
                        <Route path="/signup" element={<SignUpPage/>}></Route>
                        <Route path="/logout" element={<LogoutPage/>}></Route>
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

 */