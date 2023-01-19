import React, {Component} from "react";
import logohistory from "../assets/img/logohistory.svg";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

require('dotenv').config();
const app = document.getElementById('App');


class HistoryPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            name: "HistoryPage",
            memesHistory: null,
        };

        this.handleSendPictureByMail = this.handleSendPictureByMail.bind(this);
        this.refresMemeshHistoryPage = this.refresMemeshHistoryPage.bind(this);
    }

    handleDeletePicture = async (event) => {
        event.preventDefault();

        let url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}`;
        if (process.env.NODE_ENV === 'production') {
            url = 'https://meme-project-server-ava.onrender.com';
        }

        fetch(`${url}/api/memes/deleteMemeBdduser/${event.target.formIdMemeToDelete.value}`
            , {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'email': this.props.data_user.user_email,
                    'authorization': this.props.data_user.token,
                },
                data: {message: 'The delete from the client'}
            })
            .then((_) => {
                this.refresMemeshHistoryPage();
                this.setState({})
            }).catch(function (error) {
            console.log(error);
        })

    }

    handleSendPictureByMail = async (event) => {
        // Envoi d'
        event.preventDefault();

        let url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}`;
        if (process.env.NODE_ENV === 'production') {
            url = 'https://meme-project-server-ava.onrender.com';
        }

        fetch(`${url}/api/users/sendpicturebyemail/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'email': this.props.data_user.user_email,
                'authorization': this.props.data_user.token,
            },
            body: JSON.stringify({
                user_email: event.target.formBasicEmail.value,
                url_meme_to_retrive: event.target.formUrlRetreiveMeme.value,
                meme_name: event.target.formNameMeme.value,
            })
        })
            .then(response => {
                return response.json()
            })
            .then(_ => {
                    // Clear the email input to send picture
                    document.getElementById(`formTop_${event.target.formIndex.value}`).reset()
                }
            ).catch(err => {
                // Echèc de l'envoi de l'image par email
                console.error(err);
            }
        );
    }


    async componentDidMount() {
        await this.refresMemeshHistoryPage();
    }

    async refresMemeshHistoryPage() {
        // Récupère les mèmes d'un user à afficher sur la page historique

        let url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}`;
        if (process.env.NODE_ENV === 'production') {
            url = 'https://meme-project-server-ava.onrender.com';
        }

        await fetch(`${url}/api/memes/memes-user-history/${this.props.user_id}`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'email': this.props.data_user.user_email,
                    'authorization': this.props.data_user.token,
                },
                data: {message: 'The delete from the client'}
            })
            .then(response => response.json())
            .then(data => {
                    this.state.memesHistory = data;
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
                <div className="d-flex justify-content-center">
                    <h1>Memes saved</h1>
                </div>
                <div className="d-flex justify-content-between">
                    <ul>
                        {this.state.memesHistory ? this.state.memesHistory.map((e, index) => {
                            return (
                                <li key={index.toString()}>
                                    <Card className="card mx-2">
                                        <Card.Img variant="top" src={e.urlToRetriveMeme.toString()} style={{
                                            marginTop: 0,
                                            padding: 0,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 15
                                        }}/>
                                        <Card.Body>
                                            <Card.Title
                                                style={{color: 'black'}}><strong>{e.meme_name}</strong></Card.Title>
                                            <Form onSubmit={this.handleSendPictureByMail} id={`formTop_${index}`}>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Control type="email"
                                                                  placeholder="Enter email address"/>
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formUrlRetreiveMeme">
                                                    <Form.Control type="hidden" value={e.urlToRetriveMeme.toString()}/>
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formNameMeme">
                                                    <Form.Control type="hidden" value={e.meme_name.toString()}/>
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formIndex">
                                                    <Form.Control type="hidden" value={index}/>
                                                </Form.Group>
                                                <Button variant="primary" type="submit" size="sm">
                                                    Send by email
                                                </Button>
                                            </Form>
                                            <Form onSubmit={this.handleDeletePicture}>
                                                <Form.Group className="mb-3" controlId="formIdMemeToDelete">
                                                    <Form.Control type="hidden" value={e._id}/>
                                                </Form.Group>
                                                <Button variant="secondary" type="submit" size="sm">
                                                    Delete picture
                                                </Button>
                                            </Form>
                                        </Card.Body>
                                    </Card>
                                </li>
                            );
                        }) : null}
                    </ul>
                </div>
                <div className="d-flex justify-content-around">
                    <img src={logohistory} alt="logohistory"/>
                </div>
            </div>
        );
    }
}

export default HistoryPage;