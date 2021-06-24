
function ToyCard(props) {
    return (
        <div className="card" id={`toy-${props.id}`}>
            <h2>{props.name}</h2>
            <img src={props.image} alt="a toy character from disney" className="toy-avatar"/>
            <p>{props.likes}</p>
            <button className="like-btn">Like &lt;3</button>
        </div>
    )
}

export default ToyCard;

