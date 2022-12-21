import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setConfig, setCounter } from "../redux/reducers/routeSlice";
import {Message, Button, Select, Checkbox} from "semantic-ui-react";
import '../filecss/configurazione.css';
import Intestazione from './intestazione';
import DropDownList from "./dropDownList";
import { defaultEqualityCheck } from "reselect";
import { castDraft } from "immer";

const Configurazione = ({tipology,tipologyName, tipologyIndex, subcategory, charatteristics}) =>{

    const [typologies, setTypologies] = useState([]);
    const [stroke, setStroke] = useState('');
    const [strokeList, setStrokeList] = useState([]);
    const [diameters, setDiameters] = useState([]);
    const [diameter, setDiameter] = useState([]);
    const [cost, setCost] = useState('');
    const [charatteristicsList, setCharatteristicsList] = useState(charatteristics);
    const [changes, setChanges] = useState([]);
    let [percentageList, setPercentageList] = useState([]);
    const [absoluteList, setAbsoluteList] = useState([])
    const [selectedOption, setSelectedOption] = useState([]);
    
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
        if(tipology){
            let url = 'http://localhost:3000/'+tipology+'/'+tipologyIndex+'/strokes';
            let urlDiameter = 'http://localhost:3000/'+tipology+'/'+tipologyIndex+'/diameters';
            fetch(url)
            .then(response => response.json())
            .then(data => {
                if(!stroke){
                    setStroke(data.strokes[0])
                }
                setStrokeList(data.strokes);
            })
            .catch(err => console.log(err));
            fetch(urlDiameter)
            .then(response => response.json())
            .then(data => {
                if(diameter.length == 0){
                    setDiameter(data.diameters[0])
                }
                setDiameters(data.diameters);
                setCharatteristicsList(charatteristics);
            })
        }
    }, [tipology])


    useEffect(() => {
        let urlCostCalculation = 'http://localhost:3000/'+tipology+'/'+stroke+'/'+diameter+'/'+tipologyIndex;
        fetch(urlCostCalculation)
        .then(response => response.json())
        .then(data => {
            if(Number(data.cost).toFixed(2) === 'NaN' || '//'){
                setCost('Prodotto non disponibile')
            }
            else{
                setCost(Number(data.cost).toFixed(2));
            }
            try{
                let newCost = Number(data.cost).toFixed(2);
                percentageList?.map((perc) => {
                    newCost = newCost * perc.value;
                })
                absoluteList?.map((value) => {
                    newCost = Number(newCost) + Number(value.mm * value.value);
                })
                setCost(Number(newCost).toFixed(2));
            }
            catch(e){console.log(e)}
        })
    }, [stroke, diameter, percentageList, absoluteList])

    const setVariables = (e) => {
        const key = e.target.id;
        setCharatteristicsList([...charatteristics]);
        let carat = charatteristicsList?.find(carat => carat.key === key)
        let caratteristicsValorizationURL = 'http://localhost:3000/caratteristicsValorization/'+tipology+'/'+diameter+'/'+tipologyIndex+'/'+carat.key;
        fetch(caratteristicsValorizationURL)
        .then(response => response.json())
        .then(data => {
            switch(typeof(data.value)){
                case 'number':
                    let list = []
                    list.push({key: key, value: data.value, mm: Number(e.target.value)});
                    setAbsoluteList([...list]);
                case 'string':
                    let newSelectedOption = [];
                    if(e.target.value === 'no'){
                        let val = data.value.split('%')
                        val = 1 + Math.floor(val[0])/100;
                        percentageList.push({key: key, value: val});
                        newSelectedOption = selectedOption.map(option => option.key === key ? {...option, css: 'button is-success is-medium', selectedValue: 'yes'} : option)
                    }
                    else{
                        percentageList = percentageList.filter(perc => {return perc.key !== key});
                        newSelectedOption = selectedOption.map(option => option.key === key ? {...option, css: 'button is-danger is-medium', selectedValue: 'no'} : option)
                    }
                
                    setSelectedOption([...newSelectedOption]);
                    setPercentageList([...percentageList])
            }
        })
    }

    const createConfigurationComponent = (charatteristics) => {
        if(charatteristics && selectedOption.length == 0){
            charatteristics.map(carat => {
                selectedOption.push({key: carat.key, selectedValue: 'no', css: 'button is-danger is-medium'})
                setSelectedOption([...selectedOption]);
            })
        }
        if(charatteristics){
            let carat = charatteristics.map(carat => {
                let thisOption = selectedOption?.find(option => option.key == carat.key);
                switch(carat.type){
                    case 'bool':
                        return (
                            <>
                            <div className="column is-one-quarter">
                                <p className="title is-5">
                                    <b>{carat.value}</b>
                                </p>                    
                                <div className="buttons">
                                    <button className={thisOption.css} id={carat.key} value={thisOption.selectedValue} onClick={(e) => setVariables(e)}>{thisOption.selectedValue}</button>
                                </div>
                            </div>
                            </>
                        )
                    case 'int' || 'special-int':
                        return(
                            <>
                            <div className="column is-one-quarter">
                                <p className="title is-5">
                                    <b>{carat.value}</b>    
                                </p>
                                <input type="text" className="input is-normal" id={carat.key} onChange={(e) => setVariables(e)}/> 
                            </div>
                            </>
                        )
                }
            })
            return (<> <div className="columns is-multiline"> {carat} </div></>)
        }
    }   

        return (
            <>
                <Intestazione tipology={tipologyName} subcategory={subcategory}/>
                    <div>
                        <br />
                        <div className = 'box'>
                            <center>
                                <div className = 'columns'>
                                    <div className = 'column'>
                                        <p className = 'title is-3'>
                                            Corsa:
                                        </p>
                                    </div>
                                    <div className = "select is-info is-medium"> 
                                        <select 
                                            name = 'strokes' 
                                            id = 'strokes' 
                                            onChange = {(e) => {setStroke(e.currentTarget.value)}}
                                        >
                                            {strokeList.map((s, i) => <DropDownList key = {'typology_'+i} value = {s}/>)}
                                        </select>
                                    </div>
                                    <div className = 'column'>
                                        <p className = 'title is-3'>
                                            Diametro:
                                        </p>
                                    </div>
                                    <div className = "select is-info is-medium"> 
                                        <select 
                                            name = 'diameters' 
                                            id = 'diameters' 
                                            onChange = {(e) => {setDiameter(e.currentTarget.value)}}
                                        >
                                            {diameters.map((d, i) => <DropDownList key={'diameters_'+i} value={d}/>)}
                                        </select>
                                    </div>
                                </div>
                            </center>
                            <br />
                        </div>
                            <div className="box">
                                {createConfigurationComponent(charatteristics)}
                            </div>
                        <div className = 'box'>
                            <center>
                                <section className = 'has-background-light p-5'>
                                    <p className = 'title is-3'>
                                        Prezzo
                                    </p>
                                </section>
                                <section className = 'section'>
                                    <p className = 'title is-3'>
                                        € {cost}
                                    </p>
                                </section>
                            </center>
                        </div>
                    </div>
            </>
        );
    }

    export default Configurazione;