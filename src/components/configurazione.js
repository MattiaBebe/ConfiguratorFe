import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setConfig, setCounter } from "../redux/reducers/routeSlice";
import {Message, Button, Select} from "semantic-ui-react";
import '../filecss/configurazione.css';
import Intestazione from './intestazione';
import DropDownList from "./dropDownList";

const Configurazione = ({tipology,tipologyName, tipologyIndex, subcategory}) =>{

    const [typologies, setTypologies] = useState([]);
    const [stroke, setStroke] = useState('');
    const [strokeList, setStrokeList] = useState([]);
    const [typology, setTypology] = useState(tipology);
    const [diameters, setDiameters] = useState([]);
    const [diameter, setDiameter] = useState([]);
    const [cost, setCost] = useState('');
    
    const config = useSelector(state => state.route.config);
    const dispatch = useDispatch();

    useEffect(() => {
        let configurationUrl = 'http://localhost:3000/configuration';
        fetch(configurationUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                dispatch(setConfig(data.response))
            })
            .catch(err => {console.log(err)})
    }, []) 

    useEffect(() => {
        if(typology){
            let url = 'http://localhost:3000/'+typology+'/'+tipologyIndex+'/strokes';
            let urlDiameter = 'http://localhost:3000/'+typology+'/'+tipologyIndex+'/diameters';
            fetch(url)
            .then(response => response.json())
            .then(data => {
                setStrokeList(data.strokes);
            })
            .catch(err => console.log(err));
            fetch(urlDiameter)
            .then(response => response.json())
            .then(data => {
                setDiameters(data.diameters);
            })
        }
    }, [typology])

    const calculateCost = () => {
        let urlCostCalculation = 'http://localhost:3000/'+typology+'/'+stroke+'/'+diameter+'/'+tipologyIndex;
        console.log(diameter, stroke)
        fetch(urlCostCalculation)
        .then(response => response.json())
        .then(data => {
            if(Number(data.cost).toFixed(2) === 'NaN'){
                setCost('Prodotto non disponibile')
            }
            else{
                setCost('€ '+Number(data.cost).toFixed(2));
            }
        })
    }

        return (
            <>
                <Intestazione tipology={tipologyName} subcategory={subcategory}/>
                    <div>
                        <br />
                        <div class = 'box'>
                            <center>
                                <div class = 'columns'>
                                    <div class = 'column'>
                                        <p class = 'title is-3'>
                                            Corsa:
                                        </p>
                                    </div>
                                    <div class = "select is-info is-medium"> 
                                        <select 
                                            name = 'strokes' 
                                            id = 'strokes' 
                                            onChange = {(e) => {setStroke(e.currentTarget.value)}}
                                        >
                                            {/* {this.state.strokesList} */}
                                            {strokeList.map((s, i) => <DropDownList key = {'typology_'+i} value = {s}/>)}
                                        </select>
                                    </div>
                                    <div class = 'column'>
                                        <p class = 'title is-3'>
                                            Diametro:
                                        </p>
                                    </div>
                                    <div class = "select is-info is-medium"> 
                                        <select 
                                            name = 'diameters' 
                                            id = 'diameters' 
                                            onChange = {(e) => {setDiameter(e.currentTarget.value)}}
                                        >
                                            {/* {this.state.strokesList} */}
                                            {diameters.map((d, i) => <DropDownList key={'diameters_'+i} value={d}/>)}
                                        </select>
                                    </div>
                                </div>
                            </center>
                            <br />
                        </div>
                            <br />
                        <div class = 'box'>
                            <center>
                                <button class = 'button is-info is-medium is-outlined' onClick = {() => calculateCost()}>Calcola prezzo</button>
                            </center>
                            <br />
                        </div>
                        <div class = 'box'>
                            <center>
                                <section class = 'has-background-light p-5'>
                                    <p class = 'title is-3'>
                                        Prezzo
                                    </p>
                                </section>
                                <section class = 'section'>
                                    <p class = 'title is-3'>
                                        {cost}
                                    </p>
                                </section>
                            </center>
                        </div>
                    </div>
            </>
        );
    }

    export default Configurazione;