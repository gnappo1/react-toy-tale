import ToyCard from "./ToyCard"
import db from "./db.json"
import React, {Component} from 'react'

 class ToysContainer extends Component {
     constructor(props) {
         super(props)
         this.state = {
             toys: [],
             searchTerm: ""
         }
     }

     componentDidMount() {
        fetch("http://localhost:3000/toys")
        .then(resp => resp.json())
        .then(json => {
            this.setState({toys: json})
            // this.setState((state, props) => {
            //     return {toys: json}
            // })
        })
     }
     // alternative version
    // state = {
    //     toys: []
    // }

    makeToyCards() {
        let toys = this.state.toys
        if (this.state.searchTerm) {
            toys = this.state.toys.filter(toy => toy.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
        }
        return toys.map(toy => <ToyCard key={toy.id} {...toy} />)
    }

    handleChange = (e) => {
        e.preventDefault()
        this.setState({searchTerm: e.target.value})
    }

    render() {

        return(
            
            <div id="toy-container">
                <div>
                    <input type="text" onChange={this.handleChange} placeholder="Search for a toy..." />
                </div>
                {this.makeToyCards()}
            </div>
        )
    }
    
}

export default ToysContainer