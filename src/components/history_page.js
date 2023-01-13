import React, {Component} from "react";
import logohistory from "../assets/img/logohistory.svg";
import Button from 'react-bootstrap/Button';
import {Button2} from '@mui/material/Button';
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
        this.refresMemeshHistoryPage = this.refresMemeshHistoryPage.bind(this);
    }

    handleDeletePicture = async (event) => {
        event.preventDefault();
        console.log(`__________________________ handleDeletePicture _id meme to delete: `, event.target.formIdMemeToDelete.value);

        fetch(`https://meme-project-server-ava.onrender.com/api/memes/deleteMemeBdduser/${event.target.formIdMemeToDelete.value}`
            , {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {message: 'The delete from the client'}
            })
            .then((resp) => {
                console.log('server: ---------------- deleteMeme ok');
                this.refresMemeshHistoryPage();
                this.setState({})
            }).catch(function (error) {
            console.log(error);
            console.log('server: ---------------- deleteMeme failed');
        })

    }

    handleSendPictureByMail = async (event) => {
        // Envoi d'
        event.preventDefault();

        fetch('https://meme-project-server-ava.onrender.com/api/users/sendpicturebyemail/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_email: event.target.formBasicEmail.value,
                url_meme_to_retrive: event.target.formUrlRetreiveMeme.value,
                meme_name: event.target.formNameMeme.value,
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

        console.log('********************** componentDidMount user_id: ', this.props.user_id)

        await fetch(`https://meme-project-server-ava.onrender.com/api/memes/memes-user-history/${this.props.user_id}`)
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
                <h1>Memes saved</h1>
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

                                            <Form onSubmit={this.handleSendPictureByMail} id={`formTop_${index}`}>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Email address :</Form.Label>
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
                                                <Button2 type="submit" size="lg"
                                                         titleStyle={{
                                                             color: "white",
                                                             fontSize: 16,
                                                         }}
                                                         buttonStyle={{
                                                             backgroundColor: "white",
                                                             borderRadius: 60,
                                                             flex: 1,
                                                             height: 30,
                                                             width: 30,
                                                         }}>
                                                    Send picture by email
                                                </Button2>
                                            </Form>
                                            <Form onSubmit={this.handleDeletePicture}>
                                                <Form.Group className="mb-3" controlId="formIdMemeToDelete">
                                                    <Form.Control type="hidden" value={e._id}/></Form.Group>
                                                <Button variant="secondary" type="submit" size="lg">
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
                <img src={logohistory} alt="logohistory"/>
            </div>
        );
    }
}

export default HistoryPage;