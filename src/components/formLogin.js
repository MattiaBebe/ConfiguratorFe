import React from "react";
import '../filecss/formLogin.css';
//import {Form, Input, Button} from 'semantic-ui-react';
import Intestazione from './intestazione';

    class FromLogin extends React.Component {

        render () {

            return (
                <>
                    <Intestazione />
                    <body className='sfondo'>
                        <div className = 'columns'>
                            <div className = 'column'></div>
                            <div className = 'column is-centered'>
                                <form>
                                    <input type="text" placeholder="Username" className='input'></input>
                                        <br />
                                    <input type="password" placeholder="Password" className='input'></input>
                                        <br />
                                    <button className='button is-info'>Accedi</button>
                                </form>
                            </div>
                            <div className = 'column'></div>
                        </div>
                    </body>
                </>
            );

        }

    }

    export default FromLogin;