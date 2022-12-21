const path = require('../img/cilinders.jpeg')

const Card = ({value, onClick, imageUrl}) => {
    
    const execute = onClick;
    let image
    //if(imageUrl){image = require(imageUrl)};
    return(
        <>
        <div className="card">
        <div className="card-image">
            <figure className="image is-4by3">
            {/* <Image source={require(imageURL)} /> */}
            <img src={path} alt="Placeholder image" />
            </figure>
        </div>
        <div className="card-content">
            <div className="media">
            <div className="media-left">
                <figure className="image is-48x48">
                <img src={path} alt="Placeholder image" />
                </figure>
            </div>
            <div className="media-content">
                <p className="title is-4">{value}</p>
                <p className="subtitle is-6">@{value}</p>
            </div>
            </div>
            <center>
                <div className="content">
                    <button className='button is-success' value={value} onClick={execute}> {value} </button>
                </div>
            </center>
        </div>
        </div>
        </>
    )
}

export default Card;