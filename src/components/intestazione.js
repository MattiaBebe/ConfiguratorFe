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
                        <h1 class="title header">
                            {this.props.tipology}
                        </h1>
                        <h1 class="title is-5 header">
                            {this.props.subcategory}
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