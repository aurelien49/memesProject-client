import React, {Component} from "react";
import logohistory from "../assets/img/logohistory.svg";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

const app = document.getElementById('App');

class HistoryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "HistoryPage",
            memesHistory: null,
        };

        this.handleSendPictureByMail = this.handleSendPictureByMail.bind(this);
    }

    handleSendPictureByMail = async (event) => {
        // Envoi d'
        event.preventDefault();

        console.log(`__________________________ handleSendPictureByMail email: `, event.target.formBasicEmail.value);
        console.log(`__________________________ handleSendPictureByMail url: `, event.target.formUrlRetreiveMeme.value);

        fetch('http://localhost:5000/api/users/sendpicturebyemail/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_email: event.target.formBasicEmail.value,
                url_meme_to_retrive: event.target.formUrlRetreiveMeme.value,
            })
        })
            .then(response => {
                console.log(`client/HistoryPage/handleSendPictureByMail/response.status: ${response.status}`)
                console.log(`client/HistoryPage/handleSendPictureByMail/response: `, response)
                return response.json()
            })
            .then(data => {
                    // Succès de l'envoi de l'image par email
                    console.log(`client/HistoryPage/handleSendPictureByMail: data = `, data)
                }
            ).catch(err => {
                // Echèc de l'envoi de l'image par email
                console.error(err);
            }
        );
    }


    async componentDidMount() {
        // Récupère les mèmes d'un user à afficher sur la page historique

        console.log('********************** componentDidMount user_id: ', this.props.user_id)

        await fetch(`http://localhost:5000/api/memes/memes-user-history/${this.props.user_id}`)
            .then(response => response.json())
            .then(data => {
                    this.state.memesHistory = data;
                    console.log('data history : ', data);
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
                                        <Card.Title>{e.meme_name}</Card.Title>
                                        <Card.Img variant="top" src={e.urlToRetriveMeme.toString()} style={{
                                            marginTop: 10,
                                            padding: 0,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 15
                                        }}/>
                                        <Card.Body>

                                            <Form onSubmit={this.handleSendPictureByMail}>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Email address :</Form.Label>
                                                    <Form.Control type="email"
                                                                  placeholder="Enter email address"/>
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formUrlRetreiveMeme">
                                                    <Form.Control type="hidden" value={e.urlToRetriveMeme.toString()}/></Form.Group>
                                                <Button variant="primary" type="submit">
                                                    Send picture by email
                                                </Button>
                                            </Form>
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