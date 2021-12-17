import React, { Component } from "react";
import { Bar as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import WriteReview from "./WriteReview.js";
import { MdSearch } from 'react-icons/md';
import "../App.css";

class Hostels extends Component {
    //Constructor
    constructor(props) {
        super(props);

        this.state = {
            items:[],
            DataisLoaded: false,
            search: null
        };
    }

    //this code was adapted from https://medium.com/crobyer/search-filter-with-react-js-88986c644ed5
    searchSpace = (event) => {
        let keyword = event.target.value;
        this.setState({search: keyword})
    }

    componentDidMount(){
        fetch("hostels")
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                items: json,
                DataisLoaded: true
            });
        })
    }

    divStyle={
        padding: "5%",
        margin: "5%",
        width: "50%",
        height: "50%"
    }
    
    //this code was adapted from https://stackoverflow.com/questions/53325348/how-to-display-nested-array-data-in-json-in-reactjs
    render(){
        const { DataisLoaded, items, search } = this.state;
        // eslint-disable-next-line array-callback-return
        const linkList = items.filter((item => {
                if(search == null){
                    return item
                }
                else if(item.name.toLowerCase().includes(search.toLowerCase()) || item.address.toLowerCase().includes(search.toLowerCase())) 
                {
                    return item
                }
            }
        )).map((item => ( 
                <li key = { item.id } className="List">
                    <h3>{item.name}</h3>
                    <p>Description: {item.description}</p>
                    <p>Address: {item.address}</p>
                    <p>Postcode: {item.postcode}</p>
                    {
                        item.reviews.map((details, index) => (
                            <div id="review-list">
                                <p>{details.reviewer} : {details.review}</p>
                            </div>
                        ))
                    }
                    <p>Average Rating: {item.ratings.reduce((sum, curr) => sum + Number(curr), 0) / item.ratings.length}</p>
                    <div style={this.divStyle}>
                        <Bar
                            data={{labels: [
                                ' ', ' ', '', '', ''],
                            datasets: [
                            {
                                label: 'Hostel Ratings',
                                data: item.ratings,
                                backgroundColor: 'rgba(113, 199, 236, 1)',
                            },
                            ],
                            }}
                            options={{
                                responsive:true,
                                title: { text: "THICCNESS SCALE", display: true },
                                scales:{
                                    yAxes:[ {
                                        ticks:{
                                            beginAtZero: true
                                        }
                                    }
                                    ]
                                }
                            }} 
                        />
                    </div>
                    <WriteReview data={item.id}></WriteReview>
                </li>
            )
        ))
        if (!DataisLoaded) return <div>
            <h1> Please wait some time.... </h1> </div> ;
        
        return (
            <div className="Hostel-List">
                <h1 className="Hostel-Header1"> List of Hostels </h1>
                <div className="search">
                    <MdSearch className="search-icons" size="1.3em" />
                    <input
                        onChange={(e)=>this.searchSpace(e)}                    
                        type="text" 
                        placeholder="type to search..."
                    />
                </div>
                <ul>{linkList}</ul>
            </div>
        );
    }

}

export default Hostels;