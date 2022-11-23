import React from "react";
import '../filecss/formLogin.css';
//import {Form, Input, Button} from 'semantic-ui-react';
import Intestazione from './intestazione';

    class FromLogin extends React.Component {

        render () {

            return (
                <>
                    <Intestazione />
                    <body class='sfondo'>
                        <div class = 'columns'>
                            <div class = 'column'></div>
                            <div class = 'column is-centered'>
                                <form>
                                    <input type="text" placeholder="Username" class='input'></input>
                                        <br />
                                    <input type="password" placeholder="Password" class='input'></input>
                                        <br />
                                    <button class='button is-info'>Accedi</button>
                                </form>
                            </div>
                            <div class = 'column'></div>
                        </div>
                    </body>
                        
                    

                    {/*}
                        <div className = "ui three column centered grid">
                            <div></div>
                                <div>
                                    <Form>
                                        <Input
                                            type = "text"
                                            placeholder="Username"
                                            className="dimension"
                                        />
                                            <br />
                                        <Input
                                            type = "password"
                                            placeholder = "Password"
                                            className = "dimension"
                                        />
                                            <br />
                                        <Button className = "dimension">Accedi</Button>
                                    </Form>
                                </div>
                            <div></div>
                        </div>*/}
                </>
            );

        }

    }

    export default FromLogin;