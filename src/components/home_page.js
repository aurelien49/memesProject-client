import React, {Component} from "react";
import logo from "../assets/img/banksy.svg";
import MydModalWithGrid from "./modal_create_meme";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const app = document.getElementById('App');

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "HomePage",
            memes: [],
            currentMemeSelected: {
                user_id: null,
                meme_id: null,
                meme_name: '',
                meme_url: null,
                meme_width: null,
                meme_height: null,
                meme_box_count: null,
                meme_captions: null,
                showModalCreateMeme: false,
                urlToGenerateMeme: null,
                urlToRetriveMeme: null,
                commentBoxes: null,
                handleSubmitForm: null,
            },
        };
        //this.createComponents = this.createComponents.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
    }

    async handleClickCard(meme_id, meme_name, meme_url, meme_width, meme_height, meme_box_count, meme_captions) {
        //handleClickCard = (e) => {

        console.log('client/HomePage/handleClickCard/e = ', meme_id)
        console.log('client/HomePage/handleClickCard/e = ', meme_name)

        // Modification available only i a user is logged
        if (this.props.isUserLogged) {
            let commentBoxes = [];
            for (let i = 0; i < meme_box_count; i++) {
                commentBoxes.push({key: i, value: i});
            }

            this.state.currentMemeSelected.user_id = this.props.user_id;
            this.state.currentMemeSelected.meme_id = meme_id;
            this.state.currentMemeSelected.meme_name = meme_name;
            this.state.currentMemeSelected.meme_url = meme_url;
            this.state.currentMemeSelected.meme_width = meme_width;
            this.state.currentMemeSelected.meme_height = meme_height;
            this.state.currentMemeSelected.meme_box_count = meme_box_count;
            this.state.currentMemeSelected.meme_captions = meme_captions;
            this.state.currentMemeSelected.commentBoxes = commentBoxes;
            this.state.currentMemeSelected.handleSubmitForm = this.handleSubmitForm;
            this.state.currentMemeSelected.showModalCreateMeme = true;
            this.setState({});
        }
    }

    handleModalClose = () => {
        this.setState({
            currentMemeSelected: {
                showModalCreateMeme: false
            }
        });
    };

    handleSubmitForm = async (event) => {
        event.preventDefault();
        /*
                const data = new FormData(event.target);
        const data = new FormData(event.target);
        const formData = new FormData(event.currentTarget);

        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
        for (let i = 0; i < event.target.length - 1; i++) {
             console.log(`data[i].value: text ${i + 1}`, data.get(`Texte ${i + 1}`));
         }*/

        let commentBoxes = [];
        let str = "";
        for (let i = 0; i < event.target.length - 1; i++) {
            // console.log(`event.target.elements: Text ${i + 1}`, event.target.elements[i].value);
            str += `&boxes[${i}][text]=${event.target.elements[i].value}&boxes[${i}][color]=%23C0C0C0`;

            // Save comments
            commentBoxes.push(event.target.elements[i].value);
        }

        this.state.currentMemeSelected.urlToGenerateMeme = `https://api.imgflip.com/caption_image?username=AurelienVAILLANT&password=nW@:-*9a&template_id=${this.state.currentMemeSelected.meme_id}&font=arial` + str;
        this.state.currentMemeSelected.showModalCreateMeme = false;
        this.state.currentMemeSelected.commentBoxes = commentBoxes;

        this.setState({});

        this.createMemeOnImgflip({
            user_id: this.state.currentMemeSelected.user_id,
            meme_id: this.state.currentMemeSelected.meme_id,
            meme_name: this.state.currentMemeSelected.meme_name,
            meme_url: this.state.currentMemeSelected.meme_url,
            meme_width: this.state.currentMemeSelected.meme_width,
            meme_height: this.state.currentMemeSelected.meme_height,
            meme_box_count: this.state.currentMemeSelected.meme_box_count,
            meme_captions: this.state.currentMemeSelected.meme_captions,
            urlToGenerateMeme: this.state.currentMemeSelected.urlToGenerateMeme,
            commentBoxes: this.state.currentMemeSelected.commentBoxes,
        });
    }

    createMemeOnImgflip(data) {
        console.log(`__________________________ createMemeOnImgflip: `, data);

        fetch('https://meme-project-server-ava.onrender.com/api/memes/createMeme/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: data
            })
        })
            .then(response => {
                console.log(`client/HomePage/createMemeOnImgflip/response.status: ${response.status}`)
                console.log(`client/HomePage/createMemeOnImgflip/response: `, response)
                return response.json()
            })
            .then(data => {
                    this.state.currentMemeSelected.urlToRetriveMeme = data['urlToRetriveMeme'];
                    // Refresh memes history
                    console.log(`client/HomePage/createMemeOnImgflip: data = `, data)
                    this.props.getUserMemesHistory(data['idUser']);

                    // Close the create modal
                    this.handleModalClose();
                }
            ).catch(err => {
                console.error(err);
                const errorMessage = document.createElement('marquee');
                errorMessage.textContent = `Gah, ${err.message} !`;
                app.appendChild(errorMessage);
            }
        );
    }

    /*
    <!--<div className="result-container">
                    <ul id="result"></ul>
                </div>-->
     */
    render() {
        console.log('Client/home_page/render: ', this.state.memes)
        return (
            <>
                <h1>Home</h1>
                <div className="result-container-history">
                    <ul>
                        {this.state.memes ? this.state.memes.map((e, index) => {

                            return (
                                <li key={index.toString()}>
                                    <Card style={{
                                        width: '16rem',
                                        backgroundColor: "rgba(148,201,210,0.77)",
                                        borderRadius: 15
                                    }}
                                          className="d-flex align-items-center justify-content-center">
                                        <Card.Title style={{color: 'black'}}>{e.meme_name}</Card.Title>
                                        <Card.Img variant="top" src={e.url.toString()} style={{
                                            marginTop: 10,
                                            padding: 0,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 15
                                        }}
                                                  onClick={this.handleClickCard.bind(this, e.id, e.name, e.url, e.width, e.height, e.box_count, e.captions)}/>
                                        <Card.Body>
                                            <Card.Title>{e.name}</Card.Title>
                                            <Card.Subtitle
                                                className="mb-2 text-muted">{e.width + ' x ' + e.height}</Card.Subtitle>
                                            <Card.Text>
                                                {e.box_count + ' text zones'}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </li>
                            );
                        }) : null}
                    </ul>
                </div>
                <img src={logo} alt="logo"/>
                {this.state.currentMemeSelected.meme_id ?
                    <MydModalWithGrid
                        backdrop="static"
                        keyboard={this.state.currentMemeSelected.showModalCreateMeme}
                        centered
                        size="sm"
                        show={true}
                        onHide={this.handleModalClose}
                        props={this.state.currentMemeSelected}
                    /> : null}
            </>
        );
    }

    // Check if an HTML compnent is empty
    isEmpty(id) {
        return document.getElementById(id).innerHTML.trim() === ""
    }

//  onClick={this.handleClickCard(e.id, e.name, e.url, e.width, e.height, e.box_count, e.captions)}/>
    componentDidMount() {
        fetch('https://meme-project-server-ava.onrender.com/api/memes/imgflip/')
            .then(response => response.json())
            .then(data => {
                    this.memes = data;
                    this.memes.length = 20;

                    this.setState({
                        memes: this.memes,
                    });
                }
            )//.then((_) => this.createComponents())
            .catch(err => {
                    console.error(err);
                    //const errorMessage = document.createElement('marquee');
                    //errorMessage.textContent = `Gah, ${err.message} !`;
                    //app.appendChild(errorMessage);
                }
            );
    }

    /*
        componentWillUnmount() {
            document.getElementById('result').removeEventListener('click', this.handleClick)
        }

        createComponents() {
            // Is empty to avoid create twice ...
            if (this.isEmpty('result')) {
                var that = this;
                const container = document.getElementById('result');
                this.memes.forEach((meme, index) => {
                        const cardLi = document.createElement('li');
                        cardLi.setAttribute('key', index.toString());

                        const h2 = document.createElement('h2');
                        h2.textContent = meme.name;

                        const divCardContent = document.createElement('div');
                        divCardContent.setAttribute('className', "card-content");

                        const image = document.createElement('img');
                        image.src = meme.url;
                        image.alt = "my-image";

                        const divInfo = document.createElement('div');
                        divInfo.setAttribute('className', "info");

                        const pNbZoneTexte = document.createElement('div');
                        pNbZoneTexte.textContent = meme.box_count + ' Text zones';

                        const pTailleImage = document.createElement('div');
                        pTailleImage.textContent = meme.width + ' x ' + meme.height;

                        //const pIdMovie = document.createElement('div');
                        //pIdMovie.textContent = meme.id;

                        divInfo.appendChild(pNbZoneTexte);
                        divInfo.appendChild(pTailleImage);
                        //divInfo.appendChild(pIdMovie);

                        divCardContent.appendChild(image);
                        divCardContent.appendChild(divInfo);

                        cardLi.appendChild(h2);
                        cardLi.appendChild(divCardContent);

                        container.appendChild(cardLi);

                        cardLi.addEventListener("click", function (e) {
                            that.handleClickCard(
                                meme.id, meme.name, meme.url, meme.width, meme.height, meme.box_count, meme.captions,
                            );
                        });
                    },
                );
            }
        }
        */
}

export default HomePage;