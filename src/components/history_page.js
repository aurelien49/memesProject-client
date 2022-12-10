import React, {Component} from "react";
import logohistory from "../assets/img/logohistory.svg";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const app = document.getElementById('App');

class HistoryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "HistoryPage",
            memesHistory: null,
        };
    }


    render() {
        return (
            <div>
                <h1>HistoryPage</h1>
                <div className="result-container-history">
                    <ul id="result-history"></ul>
                </div>
                <img src={logohistory} alt="logohistory"/>
            </div>
        );
    }

    async componentDidMount() {
        await fetch('http://localhost:5000/api/memes/memes-user-history/')
            .then(response => response.json())
            .then(data => {
                    this.memesHistory = data;
                    console.log('data : ', data);
                    this.setState({
                        memesHistory: this.memesHistory,
                    });
                }
            ).then((_) => this.createHistoryComponents())
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

    createHistoryComponents() {
        // Is empty to avoid create twice ...
        if (this.isEmpty('result-history')) {
            var that = this;

            const resulthistory = document.getElementById('result-history');

            resulthistory.innerHTML = this.memesHistory.map((memeHistory, index) => {

                console.log('memeHistory: ', memeHistory.url);

                return `<li>
                    <h2>
                        <Card style={{ width: '18rem' }}>
                          <Card.Img variant="top" src={${memeHistory.url}} />
                          <Card.Img variant="top" src="../assets/img/logohistory.svg" />
                          <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                              Some quick example text to build on the card title and make up the
                              bulk of the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                          </Card.Body>
                        </Card>
                    </h2>
                </li>`
            }).join('');


            /* cardLi.addEventListener("click", function (e) {
                 that.handleClickCard(
                     memeHistory.id, memeHistory.name, memeHistory.url, memeHistory.width, memeHistory.height, memeHistory.box_count, memeHistory.captions,
                 );
             });
             */
        }
    }
}


export default HistoryPage;