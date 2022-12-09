import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import ModalCreateMeme from "./modal_create_meme";

function MydModalWithGrid(props) {
    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.props.movie_name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                    <Col xs={10} md={20}>
                        <Row>
                            <img src={props.props.movie_url}
                                 alt={props.props.movie_name}/>
                        </Row>
                        <Row>
                            <form onSubmit={(event) => props.props.handleSubmitForm(event)}>
                                {
                                    props.props.commentBoxes.map((data, index) => {
                                        let _title = `Texte ${index + 1}`;

                                        return <div key={index.toString()}>
                                            <label htmlFor={_title}>{_title} :</label>
                                            <input
                                                name={_title}
                                                placeholder={_title}
                                            />
                                        </div>
                                    })
                                }
                                <Button variant="primary" type="submit">
                                    Enregistrer
                                </Button>
                            </form>
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