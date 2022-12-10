import React from 'react';
import './App.css';
import TopBarMenu from "./components/top_bar_menu";
import HistoryPage from "./components/history_page";
import HomePage from "./components/home_page";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            memesCreatedHistory: [],
            indexMenuSelected: "Gallery",
            showHideHomePage: true,
            showHideHistoryPage: false,
            currentHistorySize: 0,
        };
    }

    handleCallbackMenu = (menuData) => {
        this.setState({indexMenuSelected: menuData})

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
        const {indexMenuSelected, showHideHomePage, showHideHistoryPage} = this.state;
        return (
            <div>
                <TopBarMenu menuAppCallBack={this.handleCallbackMenu}></TopBarMenu>
                {showHideHomePage && <HomePage/>}
                {showHideHistoryPage && <HistoryPage/>}
            </div>
        );
    }
}

export default App;
