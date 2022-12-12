import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBreadcrumb, setConfig, setCounter, setCurrentRoute } from "../redux/reducers/routeSlice";
import { Provider } from "react-redux";
import store from "../store";
import Intestazione from "../components/intestazione";
import { setUseProxies } from "immer";
import Card from "../components/card";
import Configurazione from '../components/configurazione';
import ConfigurationPage from "./configurationPage";

const homepageIcon = require('../img/homepage.png')
let categories = [];

const BasePage = () => {

    const config = useSelector(state => state.route.config);
    const directory = useSelector(state => state.route.currentRuote)
    const dispatch = useDispatch();
    const breadcrumb = useSelector(state => state.route.breadcrumb);
    const [categoryList, setCategoryList] = useState();
    const [selezione, setSelezione] = useState(true);
    const [tipology, setTipology] = useState();
    const [tipologyIndex, setTipologyIndex] = useState();
    const [tipologyName, setTipologyName] = useState();
    const [subcategory, setSubcategory] = useState();
    const CONFIGURATIONURL = 'http://localhost:3000/configuration/';

    useEffect(() => {
        fetch(CONFIGURATIONURL)
        .then(response => response.json())
        .then(data => {
            dispatch(setConfig(data))
            dispatch(setCurrentRoute(CONFIGURATIONURL))
        })
        .catch(err => {console.log(err)})       
    }, [])

    useEffect(() => {
        fetch(directory)
        .then(response => response.json())
        .then(data => {
           const list = [];
           if(data.level === 'branch'){
                //data.response.find() potrei usare il find
                data.response.forEach((category, i) => {
                    if(category.name){
                        let val = category.name;
                        let image = category.image;
                        list.push(<div class="column"> <Card value={val} imageUrl={image} onClick={(e) => changeDirectory(e)} /> </div>)
                    }
                    else{
                        let val = category.value;
                        list.push(list.push(<div class="column"> <Card value={val} onClick={(e) => changeDirectory(e)} /> </div>))
                    }
                });
                generateList(list)
            }
            else{
                setSubcategory(data.subcategory);
                setTipology(data.tipology);
                setTipologyName(data.tipologyName);
                setTipologyIndex(data.index);
                dispatch(setSelezione(false));
            }
           
        })
    }, [directory])

    const generateList = (list) => {
        setCategoryList(list);
    }

    const changeDirectory = (e) => {
        categories.push(e.target.value);
        let newDirectory;
        if(directory === CONFIGURATIONURL){
            newDirectory = `${directory}${e.target.value}`
        }
        else{
            newDirectory = `${directory}@${e.target.value}`
        }
        const newBredcrumb = breadcrumb+'/'+e.target.value;
        dispatch(setCurrentRoute(newDirectory))
        dispatch(setBreadcrumb(newBredcrumb))
        dispatch(setCurrentRoute(newDirectory))
    }

    const homepage = () => {
        categories = [];
        const newDirectory = CONFIGURATIONURL;
        const newBredcrumb = 'HOME';
        dispatch(setBreadcrumb(newBredcrumb));
        dispatch(setCurrentRoute(newDirectory));
    }

    const generateSelectionPage = () => {
        return(
            <>
                <Intestazione />
                    <br />
                    <h1 class="title is-6 padding">
                        {breadcrumb}
                    </h1>
                    <div class="columns padding"> 
                        {categoryList?.map(category => { return(category)})}
                    </div>
                    <div class="columns padding">
                        <div class="column">
                            <center>
                                <img src={homepageIcon} onClick={() => homepage()}/> 
                            </center>
                        </div>
                    </div>
                    
            </>
        )
    }

    if(selezione === true){
        return(
            generateSelectionPage()
        )
    }  
    if(selezione === false){
        return(
            <Configurazione tipology={tipology} tipologyName={tipologyName} tipologyIndex={tipologyIndex} subcategory={subcategory}/>
        )
    }
}

export default BasePage;