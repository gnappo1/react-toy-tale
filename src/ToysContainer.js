import ToyCard from "./ToyCard"
import React, {Component} from 'react'
import ToyForm from './ToyForm'

 class ToysContainer extends Component {
    state = {
        toys: [],
        searchTerm: ""
    }

    componentDidMount() {
        console.log("componentDidMount")
        fetch("http://localhost:3000/toys")
        .then(resp => resp.json())
        .then(json => {
            this.setState({toys: json})
        })
    }

    handleLike = (id) => {
        const toy = this.state.toys.find(toy => toy.id === id)
        const configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                accepts: "application/json"
            },
            body: JSON.stringify({likes: toy.likes + 1})
        }
        fetch(`http://localhost:3000/toys/${id}`, configObj)
        .then(resp => resp.json())
        .then(json => {
            this.setState(previousState => {
                let index = previousState.toys.findIndex(toy => toy.id === json.id)
                return {
                    toys: [
                        ...previousState.toys.slice(0, index), 
                        json, 
                        ...previousState.toys.slice(index + 1)
                    ]
                }
            })
        })

    }

    makeToyCards() {
        let toys = this.state.toys
        if (this.state.searchTerm) {
            toys = this.state.toys.filter(toy => toy.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
        }
        return toys.map(toy => <ToyCard key={toy.id} handleLike={this.handleLike} {...toy} />)
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