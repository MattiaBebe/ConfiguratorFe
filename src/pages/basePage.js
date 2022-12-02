import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBreadcrumb, setConfig, setCounter, setCurrentRoute } from "../redux/reducers/routeSlice";
import { Provider } from "react-redux";
import store from "../store";
import Intestazione from "../components/intestazione";
import { setUseProxies } from "immer";
import Card from "../components/card";
import Configurazione from '../components/configurazione';

const homepageIcon = require('../img/homepage.png')

const BasePage = () => {

    const config = useSelector(state => state.route.config);
    const directory = useSelector(state => state.route.currentRuote)
    const dispatch = useDispatch();
    const breadcrumb = useSelector(state => state.route.breadcrumb);
    const [categoryList, setCategoryList] = useState();
    const [selezione, setSelezione] = useState(true);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        let configurationUrl = 'http://localhost:3000/configuration';
        fetch(configurationUrl)
        .then(response => response.json())
        .then(data => {
            dispatch(setConfig(data))
            dispatch(setCurrentRoute(configurationUrl))
        })
        .catch(err => {console.log(err)})       
    }, [])

    useEffect(() => {
        let configurationUrl = directory;
        fetch(configurationUrl)
        .then(response => response.json())
        .then(data => {
           const list = [];
           data.forEach((category, i) => {
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
        })
    }, [directory])

    const generateList = (list) => {
        setCategoryList(list);
    }

    const changeDirectory = (e) => {
        const newDirectory = directory+'/'+e.target.value;
        const newBredcrumb = breadcrumb+'/'+e.target.value;
        setCategories(categories.push(e.target.value));
        dispatch(setBreadcrumb(newBredcrumb))
        dispatch(setCurrentRoute(newDirectory))
    }

    const homepage = () => {
        const newDirectory = 'http://localhost:3000/configuration';
        const newBredcrumb = 'HOME';
        setCategories([]);
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
            <Configurazione />
        )
    }
}

export default BasePage;