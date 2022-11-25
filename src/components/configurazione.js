import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setConfig, setCounter } from "../redux/reducers/routeSlice";
import {Message, Button, Select} from "semantic-ui-react";
import '../filecss/configurazione.css';
import Intestazione from './intestazione';
import DropDownList from "./dropDownList";

const Configurazione = ({}) =>{

    const [typologies, setTypologies] = useState([]);
    const [stroke, setStroke] = useState('');
    const [strokeList, setStrokeList] = useState([]);
    const [className, setClassName] = useState('hidden');
    const [typology, setTypology] = useState('');
    const [diameters, setDiameters] = useState([]);
    const [diameter, setDiameter] = useState([]);
    const [cost, setCost] = useState('');
    
    const config = useSelector(state => state.route.config);
    const dispatch = useDispatch();

    const settaggioTipologia = async (e) => {
        let value = e.currentTarget.value;
        setTypology(value);
        setClassName('visible');
    }

    useEffect(() => {
        let tipologyURL = 'http://localhost:3000/tipology';
        let configurationUrl = 'http://localhost:3000/configuration';
        fetch(tipologyURL)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setTypologies(data.tipology);
            })
            .catch(err => {
                console.log(err);
            })
        fetch(configurationUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                dispatch(setConfig(data))
            })
            .catch(err => {console.log(err)})
    }, []) 

    useEffect(() => {
        if(typology){
            let url = 'http://localhost:3000/'+typology+'/strokes';
            let urlDiameter = 'http://localhost:3000/'+typology+'/diameters'
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
        let urlCostCalculation = 'http://localhost:3000/'+typology+'/'+stroke+'/'+diameter;
        console.log(diameter, stroke)
        fetch(urlCostCalculation)
        .then(response => response.json())
        .then(data => {
            setCost('€ '+Number(data.cost).toFixed(2));
        })
    }

        return (
            <>
                <Intestazione />
                    <div>
                        <br />
                        <div class = 'box'>
                            <center>
                                <div class = 'columns'>
                                    <div class = 'column'>
                                        <p class = 'title is-3'>
                                            Tipologia:
                                        </p>
                                    </div>
                                    <div class = 'column'>
                                        <div class = "select is-info is-medium"> 
                                            <select name = 'typology' id = 'typology' onChange = {(e) => settaggioTipologia(e)}>
                                                {typologies.map((t, i) => <DropDownList key = {'typology_'+i} value = {t}/>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div class = 'column'>
                                        <p class = 'title is-3'>
                                            Corsa:
                                        </p>
                                    </div>
                                    <div class = "select is-info is-medium"> 
                                        <select 
                                            name = 'strokes' 
                                            id = 'strokes' 
                                            className = {className} 
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
                                            className = {className} 
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
                      
                    {/*<br /> <br />
                            <div className="box is-3">
                                <p class="title is-2}">
                                    tipologia:
                                </p>
                                <div class="select is-info is-medium"> 
                                    <select name='typology' id='typology' onChange={(e) => settaggioTipologia(e)}>
                                        {typologies.map((t, i) => <DropDownList key={'typology_'+i} value={t}/>)}
                                    </select>
                                </div>
                                <br /> <br />
                                <p class="title is-2}">
                                    corsa:
                                </p> 
                                <div class="select is-info is-medium"> 
                                    <select 
                                    name='strokes' 
                                    id='strokes' 
                                    className={className} 
                                    onChange = {(e) => {setStroke(e.currentTarget.value)}}
                                    >
                                        {/* {this.state.strokesList} */}
        {/*                                {strokeList.map((s, i) => <DropDownList key={'typology_'+i} value={s}/>)}
                                    </select>
                                </div>
                                <br /> <br />
                                <p class="title is-2}">
                                tipologia:
                                </p> 
                                <div class="select is-info is-medium"> 
                                    <select 
                                    name='diameters' 
                                    id='diameters' 
                                    className={className} 
                                    onChange = {(e) => {setDiameter(e.currentTarget.value)}}
                                    >
                                        {/* {this.state.strokesList} */}
       {/*                                 {diameters.map((d, i) => <DropDownList key={'diameters_'+i} value={d}/>)}
                                    </select>
                                </div>
                            </div>
                            <div className="box"> 
                            <center>
                                <button class='button is-primary is-medium' onClick={() => calculateCost()}>Calcola prezzo</button>
                            </center>
                            </div>
                                <Message name='prezzo' id='prezzo'>Prezzo</Message>
                            <br /><br />
                            <div class="box is-medium" >
                                <center>
                                    <p class="title is-1">
                                        {cost}
                                    </p>
                                </center>
                            </div>          */}  
            </>
        );
    }

    export default Configurazione;