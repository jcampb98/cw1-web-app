import React, { Component } from "react";
import CreateItineraries from "./CreateItineraries.js";

class ViewItineraries extends Component {
    //Constructor
    constructor(props){
        super(props);

        this.state = {
            data:[],
            DataisLoaded: false
        }
    }

    componentDidMount(){
        fetch("itineraries")
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                data: json,
                DataisLoaded: true
            });
        })
    }
    
    handleDeleteClick(item){
        const newState = this.state.data.slice();

        if(newState.indexOf(item) > -1) {
            newState.splice(newState.indexOf(item), 1);
            this.setState({data: newState})
        }   
    }

    render(){
        const { data, DataisLoaded } = this.state;

        const linkList = data.map((item => ( 
            <li key = { item.user } className="List">
                <h3>{item.user}</h3>
                <p>Start Date: {item.startdate}</p>
                {
                    item.stages.map((details, index) => (
                        <div id="review-list">
                            <p> Stage: {details.stage}, Hostel ID: {details.hostel}, Nights Staying: {details.nights}</p>
                        </div>
                    ))
                }
                <button onClick={this.handleDeleteClick.bind(this, item)}>Remove</button>
            </li>
          )
        ))

        if (!DataisLoaded) return <div>
            <h1> Please wait some time.... </h1> </div> ;

        return(
            <div className="Itineraries-List">
                <h1 className="Itineraries-Header1"> List of Itineraries </h1>
                <div>
                    <ul>{linkList}</ul> 
                    <br></br>                    
                    <CreateItineraries/>  
                </div>
            </div>
        );
    }
}

export default ViewItineraries;