import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Form from "react-bootstrap/Form";

function MydModalWithGrid(props) {

    const [message, setMessage] = useState('');

    const handleChange = event => {
        console.log('MydModalWithGrid/handleChange/event: ', event)
        console.log('MydModalWithGrid/handleChange/event.target: ', event.target)
        console.log('MydModalWithGrid/handleChange/event.target.value: ', event.target.value)
        setMessage(event.target.value);
    };

    const handleClick = event => {
        event.preventDefault();
        // 👇️ value of input field
        console.log('old value: ', message);
        // 👇️ set value of input field
        setMessage('');
        console.log('process.env.X_API_KEY: ', process.env.X_API_KEY);

        fetch('https://api.api-ninjas.com/v1/dadjokes?limit=1', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Api-Key': process.env.X_API_KEY
            },
        })
            .then(response => {
                console.log('************** client api-ninjas : ok response ', response);
                return response.json()
            })
            .then(data => {
                    // Do something with the sentence
                    console.log(`client/MydModalWithGrid/fetchJoke: data = `, data[0].joke)
                    setMessage(data[0].joke);

                    // Split the sentences into words without splite word
                    var chunks = splitSentence(data[0].joke, props.props.commentBoxes.length);
                    console.log('chunks: ', chunks)

                    for (let i = 0; i < props.props.commentBoxes.length; i++) {
                        let id = `message_${i + 1}`;
                        console.log('id = ', id)
                        document.getElementById(id.toString()).value = chunks[i];
                    }
                }
            ).catch(err => {
            console.log('************** client api-ninjas : KO  ');
            console.error(err);
        });


    }

    function splitSentence(sentence, numParts) {
        // split the sentence into an array of words
        let words = sentence.split(' ');
        // create an array to hold the split sentence parts
        let splitSentence = [];
        // determine the length of each part
        let partLength = Math.ceil(words.length / numParts);
        // loop through the words and add them to the split sentence parts
        for (let i = 0; i < words.length; i += partLength) {
            splitSentence.push(words.slice(i, i + partLength).join(' '));
        }
        // return the split sentence
        return splitSentence;
    }


    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.props.meme_name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                    <Col xs={10} md={20}>
                        <Row>
                            <img src={props.props.meme_url}
                                 alt={props.props.meme_name}/>
                        </Row>
                        <Row>
                            <form onSubmit={(event) => props.props.handleSubmitForm(event)}>
                                {
                                    props.props.commentBoxes.map((data, index) => {
                                        let _title = `Texte ${index + 1}`;
                                        let id = `message_${index + 1}`;

                                        return <div key={index.toString()}>
                                            <label htmlFor={_title}>{_title} :</label>
                                            <input
                                                type="text"
                                                //id="message"
                                                id={id}
                                                name={_title}
                                                placeholder={_title}
                                                // onChange={handleChange}
                                                //value={message}
                                            />
                                        </div>
                                    })
                                }
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <br></br>
                                    <Form.Label>---</Form.Label>
                                    <Button variant="primary" type="submit">
                                        Enregistrer
                                    </Button>
                                </Form.Group>
                            </form>
                            {' '}
                        </Row>
                        <Row>
                            <Button className="mb-3" variant="secondary" onClick={handleClick}>Random texts</Button>
                        </Row>
                    </Col>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Fermer</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MydModalWithGrid;