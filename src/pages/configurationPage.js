const ConfigurationPage = ({tipology, tipologyName}) =>{

    return(
        <>
        <div className="columns header">
            <div className="column">
                <h1 className="title">
                    <center>
                    {tipologyName}
                    </center>
                </h1>
            </div>
        </div>
        </>
    )
}

export default ConfigurationPage