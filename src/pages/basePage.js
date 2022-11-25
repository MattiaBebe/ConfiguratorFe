import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setConfig, setCounter } from "../redux/reducers/routeSlice";
import { Provider } from "react-redux";
import store from "../store";
import Intestazione from "../components/intestazione";


const BasePage = () => {


    const [list, setList] = useState([]);
    const config = useSelector(state => state.route.config);
    const dispatch = useDispatch();


    useEffect(() => {
        let configurationUrl = 'http://localhost:3000/configuration';
        fetch(configurationUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            dispatch(setConfig(data))
        })
        .catch(err => {console.log(err)})       
    }, [])

    useEffect(() => {
        let categories = [];
        if(config){
            config.categories.map(i => {
                console.log(i)
                categories.push(i)
            })
        setList(categories);
        }
    }, [config])

    const generateList = () => {
        return true
    }

    return(
        <>
            <Intestazione />
            {() => generateList()}
        </>
    )
}

export default BasePage;