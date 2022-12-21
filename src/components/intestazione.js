import React from 'react';
import '../filecss/header.css';
import logo from '../img/logoCypag.svg'
//import 'semantic-ui-css/semantic.min.css';

    class intestazione extends React.Component {
        constructor(props){
            super(props);
            const {tipology, subcategory} = props;
            this.generateTipology = this.generateTipology.bind(this);
        }

        generateTipology = () => {
            if(this.props.tipology){
                return(
                    <>
                        <h1 className="title header">
                            {this.props.tipology}   {this.props.subcategory}
                        </h1>
                    </>
                )
            }
            else{
                return(
                    <>
                    </>
                )
            }
        }

        render () {

            return (
                <>
                    <div className = 'sfondoHeader'>
                        <img src = {logo} alt = '' className = 'imgLogo'></img>
                        {this.generateTipology()}
                    </div>
                </>
            );

        }
    }

    export default intestazione;