import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setConfig, setCounter } from "../redux/reducers/routeSlice";
import {Message, Button, Select, Checkbox} from "semantic-ui-react";
import '../filecss/configurazione.css';
import Intestazione from './intestazione';
import DropDownList from "./dropDownList";
import { defaultEqualityCheck } from "reselect";
import { castDraft } from "immer";
import hierarcky from "../utilities/codeHierarky";

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
    let [absoluteList, setAbsoluteList] = useState([])
    let [numberList, setNumberList] = useState([]);
    let [selectedOption, setSelectedOption] = useState([]);
    let [codeList, setCodeList] = useState([]);
    let [mm, setMM] = useState();
    let [code, setCode] = useState('');

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
        console.log(codeList);
        let code = '';
        code = subcategory.split(' ').map(word => word.charAt(0)).join('').toUpperCase();
        console.log(hierarcky);
        console.log(codeList);
        hierarcky.map(cat => {
            if(cat.key === 'diametro'){
                code = code + diameter + '/'
            }
            if(cat.key === 'corsa'){
                code = code + stroke;
            }
            codeList?.map(value => {
                if(value.key === cat.key){
                    code = code + cat.value
                }
                if(cat.key === 'STELO PROLUNGATO - ROD EXTENSION (mm)' && value.key === 'STELO PROLUNGATO - ROD EXTENSION (mm)'){
                    code = code + mm;
                }
            })
        })
        setCode(code);
    },[codeList, diameter, stroke]);

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
                numberList?.map((number) => {
                    newCost = Number(newCost) + Number(number.value);
                })
                setCost(Number(newCost).toFixed(2));
            }
            catch(e){console.log(e)}
        })
    }, [stroke, diameter, percentageList, absoluteList, numberList])

    const setVariables = (e, type) => {
        let key;
        let value;
        if(type === 'list'){
            key = e.target.value;
            value = e.target.id;
        }
        else{
            key = e.target.id;
            value = e.target.value;
        }
        if(e.target.value !== 'none'){
            setCharatteristicsList([...charatteristics]);
            let carat = charatteristicsList?.find(carat => carat.key === key)
            let caratteristicsValorizationURL = 'http://localhost:3000/caratteristicsValorization/'+tipology+'/'+diameter+'/'+tipologyIndex+'/'+key;
            fetch(caratteristicsValorizationURL)
            .then(response => response.json())
            .then(data => {
                switch(typeof(data.value)){
                    case 'number':
                        switch(type){
                            case 'special-int':
                                let list = []
                                list.push({key: key, value: data.value, mm: Number(e.target.value)});
                                if(!codeList.find(code => code.key === key)){codeList.push({key: key});}
                                setCodeList([...codeList]);
                                setMM(Number(e.target.value));
                                setAbsoluteList([...list]);
                                break;
                            case 'int':
                            case 'bool':
                                if(e.target.value === 'no'){
                                    numberList.push({key: key, value: data.value});
                                    codeList.push({key: key});
                                    selectedOption = selectedOption.map(option => option.key === key ? {...option, css: 'button is-success is-medium', selectedValue: 'yes'} : option)
                                }
                                else{
                                    try{
                                        codeList = codeList.filter(code => code.key !== key);
                                        numberList = numberList.filter(obj => {return obj.key !== key});
                                        selectedOption = selectedOption.map(option => option.key === key ? {...option, css: 'button is-danger is-medium', selectedValue: 'no'} : option)
                                    }
                                    catch(e){console.log(e)}
                                }
                                setCodeList([...codeList]);
                                setSelectedOption([...selectedOption]);
                                setNumberList([...numberList]);
                                break;
                            }
                    case 'string':
                        let val = data?.value.split('%');
                        switch(type){
                            case 'int':
                                if(value === '' || value === '0'){
                                    codeList = codeList.filter(code => code.key !== key);
                                    numberList = numberList.filter(carat => {return carat.key !== key})
                                }
                                else{
                                    if(numberList?.filter(carat => {return carat.key === key && carat.value === val[0]}).length === 0){
                                        codeList.push({key: key});
                                        numberList.push({key: key, value: val[0]})
                                    }
                                }
                                break;
                            case 'bool':
                                if(e.target.value === 'no'){
                                    val = 1 + Math.floor(val[0])/100;
                                    percentageList.push({key: key, value: val});
                                    codeList.push({key: key});
                                    selectedOption = selectedOption.map(option => option.key === key ? {...option, css: 'button is-success is-medium', selectedValue: 'yes'} : option)
                                }
                                else{
                                    codeList = codeList.filter(code => code.key !== key);
                                    percentageList = percentageList.filter(perc => {return perc.key !== key});
                                    selectedOption = selectedOption.map(option => option.key === key ? {...option, css: 'button is-danger is-medium', selectedValue: 'no'} : option)
                                }
                                break;
                            case 'list':
                                if(!percentageList.find(perc => perc.key === value)){
                                    codeList.push({key: key});
                                    val = 1 + Math.floor(val[0])/100;
                                    percentageList = percentageList.push({key: value, value: val});
                                }       
                        }
                        setCodeList([...codeList]);
                        setNumberList([...numberList]);
                        setSelectedOption([...selectedOption]);
                        setPercentageList([...percentageList])
                }
            })
        }
        else{
            percentageList = percentageList.filter(perc => perc.key !== value);
            setPercentageList([...percentageList])
        }
    }

    const createConfigurationComponent = (charatteristics) => {
        if(charatteristics && selectedOption.length == 0){
            charatteristics.map(carat => {
                selectedOption.push({key: carat.key, selectedValue: 'no', css: 'button is-danger is-medium'})
                setSelectedOption([...selectedOption]);
            })
        }
        if(charatteristics){
            let carat = charatteristics.map(option => {
                let thisOption = selectedOption?.find(value => value.key === option.key);
                switch(option.type){
                    case 'bool':
                        return (
                            <>
                            <div className="column is-one-quarter">
                                <p className="title is-5">
                                    <b>{option.value}</b>
                                </p>                    
                                <div className="buttons">
                                    <button className={thisOption.css} id={option.key} value={thisOption.selectedValue} onClick={(e) => setVariables(e, option.type)}>{thisOption.selectedValue}</button>
                                </div>
                            </div>
                            </>
                        )
                    case 'special-int':
                    case 'int':
                        return(
                            <>
                            <div className="column is-one-quarter">
                                <p className="title is-5">
                                    <b>{option.value}</b>    
                                </p>
                                <input type="text" className="input is-normal" id={option.key} onChange={(e) => setVariables(e, option.type)}/> 
                            </div>
                            </>
                        )
                    case 'list':
                            if(option.options[0] !== 'none'){
                                option.options.unshift('none');
                            }
                            return(
                                <>
                                <div className="column is-one-quarter">
                                    <p className="title is-5">
                                        <b> {option.key} </b>    
                                    </p>
                                    <div className = "select is-info is-medium"> 
                                        <select 
                                            name = 'grease' 
                                            id = {option.key}
                                            onChange = {(e) => {setVariables(e, option.type)}}
                                        >
                                            {option.options.map((grease, i) => <DropDownList key = {'typology_'+i} value = {grease}/>)}
                                        </select>
                                    </div>
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
                        <div className = 'box'>
                            <center>
                                <section className = 'has-background-light p-5'>
                                    <p className = 'title is-3'>
                                        Codice
                                    </p>
                                </section>
                                <section className = 'section'>
                                    <p className = 'title is-3'>
                                        {code}
                                    </p>
                                </section>
                            </center>
                        </div>
                    </div>
            </>
        );
    }

    export default Configurazione;