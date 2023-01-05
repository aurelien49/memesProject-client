import React, {Component} from "react";
import logo from "../assets/img/banksy.svg";
import MydModalWithGrid from "./modal_create_meme2";

const app = document.getElementById('App');

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "HomePage",
            memes: [],
            currentMemeSelected: {
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
        this.createComponents = this.createComponents.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }

    handleModalClose = () => {

        this.setState({
            currentMemeSelected: {
                showModalCreateMeme: false
            }
        });
    };

    async handleClickCard(meme_id, meme_name, meme_url, meme_width, meme_height, meme_box_count, meme_captions) {

        // Modification available only i a user is logged
        if (this.props.userLogged) {
            let commentBoxes = [];
            for (let i = 0; i < meme_box_count; i++) {
                commentBoxes.push({key: i, value: i});
            }

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
        fetch('http://localhost:5000/api/memes/createMeme/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: data
            })
        })
            .then(response => response.json())
            .then(data => {
                    this.state.currentMemeSelected.urlToRetriveMeme = data['urlToRetriveMeme'];
                }
            ).catch(err => {
                console.error(err);
                const errorMessage = document.createElement('marquee');
                errorMessage.textContent = `Gah, ${err.message} !`;
                app.appendChild(errorMessage);
            }
        );
    }

    render() {
        return (
            <>
                <h1>Créateur de mèmes</h1>
                <div className="result-container">
                    <ul id="result"></ul>
                </div>
                <img src={logo} alt="logo"/>
                {this.state.currentMemeSelected.meme_id ?
                    <MydModalWithGrid
                        backdrop="static"
                        keyboard={false}
                        centered
                        size="sm"
                        show={this.state.currentMemeSelected.showModalCreateMeme}
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

    componentDidMount() {
        fetch('http://localhost:5000/api/memes/imgflip/')
            .then(response => response.json())
            .then(data => {
                    this.memes = data['data']['memes'];
                    this.memes.length = 10;

                    this.setState({
                        memes: this.memes,
                    });
                }
            ).then((_) => this.createComponents())
            .catch(err => {
                    console.error(err);
                    const errorMessage = document.createElement('marquee');
                    errorMessage.textContent = `Gah, ${err.message} !`;
                    app.appendChild(errorMessage);
                }
            );
    }

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
                    pNbZoneTexte.textContent = meme.box_count;

                    const pTailleImage = document.createElement('div');
                    pTailleImage.textContent = meme.width + 'x' + meme.height;

                    const pIdMovie = document.createElement('div');
                    pIdMovie.textContent = meme.id;

                    divInfo.appendChild(pNbZoneTexte);
                    divInfo.appendChild(pTailleImage);
                    divInfo.appendChild(pIdMovie);

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
}

export default HomePage;