import React, {Component} from "react";
import logohistory from "../assets/img/logohistory.svg";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

const app = document.getElementById('App');

class HistoryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "HistoryPage",
            memesHistory: null,
        };
    }


    async componentDidMount() {
        await fetch('http://localhost:5000/api/memes/memes-user-history/')
            .then(response => response.json())
            .then(data => {
                    this.state.memesHistory = data;
                    console.log('data : ', data);
                    this.setState({})
                }
            )
            .catch(err => {
                    console.error(err);
                    const errorMessage = document.createElement('marquee');
                    errorMessage.textContent = `Gah, problem on history page, ${err.message} !`;
                    app.appendChild(errorMessage);
                }
            );
    }

    // Check if an HTML compnent is empty
    isEmpty(id) {
        return document.getElementById(id).innerHTML.trim() === ""
    }

    createHistoryComponents = () => {
        /* cardLi.addEventListener("click", function (e) {
             that.handleClickCard(
                 memeHistory.id, memeHistory.name, memeHistory.url, memeHistory.width, memeHistory.height, memeHistory.box_count, memeHistory.captions,
             );
         });*/
    }

    render() {
        return (
            <div>
                <h1>HistoryPage</h1>
                <div className="result-container-history">
                    <ul>
                        {this.state.memesHistory ? this.state.memesHistory.map((e, index) => {
                            return (
                                <li key={index.toString()}>
                                    <Card style={{width: '18rem', backgroundColor: "dimgrey", borderRadius: 15}}
                                          className="d-flex align-items-center justify-content-center">
                                        <Card.Img variant="top" src={e.urlToRetriveMeme.toString()} style={{
                                            marginTop: 10,
                                            padding: 0,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 15
                                        }}/>
                                        <Card.Body>
                                            <Card.Title>{e.meme_name}</Card.Title>
                                            <Button variant="primary">Go somewhere</Button>
                                        </Card.Body>
                                    </Card>
                                </li>
                            );
                        }) : null}
                    </ul>
                </div>
                <img src={logohistory} alt="logohistory"/>
            </div>
        );
    }
}


export default HistoryPage;