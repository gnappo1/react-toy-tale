import ToyCard from "./ToyCard"
import db from "./db.json"
import React, {Component} from 'react'
import ToyForm from './ToyForm'

 class ToysContainer extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         toys: [],
    //         searchTerm: ""
    //     }
    //     this.handleChange = this.handleChange.bind(this)
    //  }
    state = {
        toys: [],
        searchTerm: ""
    }

     componentDidMount() {
        fetch("http://localhost:3000/toys")
        .then(resp => resp.json())
        .then(json => {
            this.setState({toys: json})
            // this.setState((prevState, prevProps) => {
            //     return {toys: json}
            // })
        })
     }

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
    
    handleCreate = (toyJson) => {
        this.setState({
            toys: [...this.state.toys, toyJson]
        })
    }

    render() {

        return(
            
            <div id="toy-container">
                <div>
                    <input type="text" onChange={this.handleChange} placeholder="Search for a toy..." />
                </div>
                <ToyForm handleCreate={this.handleCreate} />
                {this.makeToyCards()}
            </div>
        )
    }
    
}

export default ToysContainer