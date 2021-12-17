import React, { Component } from 'react';

export default class WriteReview extends Component{
    //this code has been amended from https://medium.com/path2code/how-react-js-toggle-button-works-99c838ae2fe1
    //Constructor
    constructor(props){
        super(props);

        // Here we initialize our components state
        this.state = {
            item: [],
            value: "",
            formDisplay: false
        };

        this.ToggleButton = this.ToggleButton.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    //this code for taking user input was amended from https://stackoverflow.com/questions/45040317/react-js-cannot-get-input-from-user-get-undefined-when-typing
    handleChange(event, key) {
        this.setState({
            [key]: event.target.value
        });
    }

    //this code was adapted from https://stackoverflow.com/questions/62462021/how-to-prop-an-input-value-into-a-parameter-for-an-api-call
    async handleSubmit(event) {
        const params = {
            reviewer: this.state.namedata,
            review: this.state.textdata
        }

        fetch('hostels/review/' + this.props.data, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        })
        .then(res => res.json())
        .then(data => this.setState({
            reviewer: data.reviews.reviewer,
            review: data.reviews.review
        }))
        .catch(err => console.log(err));
        
        event.preventDefault();
    }

    ToggleButton () {
        // On click we change our state – this will trigger our `render` method
        this.setState({
            formDisplay: true
        });
    }

    renderForm() {
        return(
            <div className="container"> 
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-25">
                           <label>Name:</label> 
                        </div>
                        <div className="col-75">
                          <input 
                            type="text"
                            namedata={this.state.namedata}
                            onChange={(event) => this.handleChange(event, 'namedata')}
                          />     
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                           <label>Review:</label> 
                        </div>
                        <div className="col-75">
                        <textarea
                            textdata={this.state.textdata}
                            onChange={(event) => this.handleChange(event, 'textdata')}
                            placeholder="Write something.."
                        /> 
                        </div>
                    </div>

                    <div class="row">
                        <input id="addReviewBtn" type="submit" value="Submit"/>
                    </div>
                </form>
            </div>
        );
    }

    render() {
        return(
            <div>
                <button type="button" onClick={() => this.ToggleButton()}>Add Review</button>
                {this.state.formDisplay ? this.renderForm() : null}
            </div>
        );
    }
}