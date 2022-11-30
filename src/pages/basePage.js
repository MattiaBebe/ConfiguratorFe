import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setConfig, setCounter, setCurrentRoute } from "../redux/reducers/routeSlice";
import { Provider } from "react-redux";
import store from "../store";
import Intestazione from "../components/intestazione";
import { setUseProxies } from "immer";
import Card from "../components/card";


const BasePage = () => {

    const config = useSelector(state => state.route.config);
    const dispatch = useDispatch();
    const currentRuote = useSelector(state => state.route.currentRuote);
    const [directory, setDirectory] = useState()
    const [categoryList, setCategoryList] = useState();

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
        let configurationUrl = 'http://localhost:3000/configuration';
        fetch(configurationUrl)
        .then(response => response.json())
        .then(data => {
           const list = [];
           data.categories.forEach(category => {
               let val = {...Object.keys(category)}
               list.push(<> <button value={val[0]} onClick={(e) => alert(e.target.value)}> {val[0]} </button> </>)
           });
           generateList(list)
        })
    }, [directory, categoryList])

    const generateList = (list) => {
        setCategoryList(list);
    }

    return(
        <>
            <Intestazione />
                <h1>
                    {categoryList?.map(category => { return(category)})}
                </h1>
        </>
    )
}

export default BasePage;