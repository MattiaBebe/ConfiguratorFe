const path = require('../img/cilinders.jpeg')

const Card = ({value, onClick, imageUrl}) => {
    
    const execute = onClick;
    let image
    //if(imageUrl){image = require(imageUrl)};
    return(
        <>
        <div class="card">
        <div class="card-image">
            <figure class="image is-4by3">
            {/* <Image source={require(imageURL)} /> */}
            <img src={path} alt="Placeholder image" />
            </figure>
        </div>
        <div class="card-content">
            <div class="media">
            <div class="media-left">
                <figure class="image is-48x48">
                <img src={path} alt="Placeholder image" />
                </figure>
            </div>
            <div class="media-content">
                <p class="title is-4">{value}</p>
                <p class="subtitle is-6">@{value}</p>
            </div>
            </div>
            <center>
                <div class="content">
                    <button class='button is-success' value={value} onClick={execute}> {value} </button>
                </div>
            </center>
        </div>
        </div>
        </>
    )
}

export default Card;