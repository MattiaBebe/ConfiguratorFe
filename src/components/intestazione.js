import React from 'react';
import '../filecss/header.css';
import logo from '../img/logoCypag.svg'
//import 'semantic-ui-css/semantic.min.css';

    class intestazione extends React.Component {

        render () {

            return (
                <>
                    <div className = 'sfondoHeader'>
                        <img src = {logo} alt = '' className = 'imgLogo'></img>
                    </div>
                </>
            );

        }
    }

    export default intestazione;