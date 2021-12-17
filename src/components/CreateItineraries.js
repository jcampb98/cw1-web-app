import React from 'react';

export default class CreateItineraries extends React.Component {
    //Constructor
    constructor(props){
        super(props);

        // Here we initialize our components state
        this.state = {
            stages: [],
            value: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event, key) {
        this.setState({
            [key]: event.target.value
        });
    }

    async handleSubmit(event) {
        const params = {
            user: this.state.namedata,
            hostel: this.state.numdata,
            nights: this.state.nightdata,
            startdate: this.state.datedata
        }

        //this creates the new user for the itineraries
        console.log('data is called');
        fetch('itineraries/new/' + this.state.namedata, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => this.setState({
            user: data.user
        }))
        .catch(err => console.log(err));
        
        //this is a fetch that submits the start date for the itineraries
        fetch('itineraries/startdate/' + this.state.namedata + 
            '/' + this.state.datedata, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => this.setState({
            startdate: data.startdate        
        }))
        .catch(err => console.log(err));

        //this a fetch that creates the itineraries 
        //and posts it to the api for the stages
        fetch('itineraries/stages/new/' + this.state.namedata, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        })
        .then(res => res.json())
        .then(data => this.setState({
            hostel: data.hostel,
            nights: data.nights
        }))
        .catch(err => console.log(err));

        event.preventDefault();
    }

    render() {
        return(
            <div class="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                            <div className="col-25">
                            <label>User:</label> 
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
                            <label>Hostel ID:</label> 
                            </div>
                            <div className="col-75">
                            <input 
                                type="text"
                                numdata={this.state.num_data}
                                onChange={(event) => this.handleChange(event, 'numdata')}
                            /> 
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-25">
                            <label>How Many Nights?:</label> 
                            </div>
                            <div className="col-75">
                            <input 
                                type="text"
                                nightdata={this.state.nightdata}
                                onChange={(event) => this.handleChange(event, 'nightdata')}
                            /> 
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-25">
                            <label>Start Date:</label> 
                            </div>
                            <div className="col-75">
                                <input 
                                    type="date"
                                    datedata={this.state.datedata}
                                    onChange={(event) => this.handleChange(event, 'datedata')}
                                /> 
                            </div>
                        </div>

                        <div class="row">
                            <input type="submit" value="Submit"/>
                        </div>
                </form>
            </div>
        );
    }
}