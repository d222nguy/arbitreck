import React, {useState, useEffect} from 'react';
import axios from "axios"

import {Provider, connect, useDispatch, useSelector} from 'react-redux';
import {createStore} from 'redux';
import {searchRobots} from './reducers.js';
import {setSearchField, setFirstCurrency, setSecondCurrency} from './actions.js';

//in this component we would want to change the currency code

const CountrySearch = (props) => {
    const [firstCountryName, setFirstCountryName] = useState("Vietnam");
    const [secondCountryName, setSecondCountryName] = useState("Vietnam");
    const updateCurrency = props.updateCurrency;
    const dispatch = useDispatch();
    const firstCurrency = useSelector((state) => state.firstCurrency);
    const secondCurrency = useSelector((state) => state.secondCurrency);
    const searchField = useSelector((state) => state.searchField);
    const setCurrencyByCountryName = (countryName, isFirst) => {
        axios({
          method: "GET",
          //url:  `https://free.currconv.com/api/v7/convert?q=${first}_${second}&compact=ultra&apiKey=7e0e20e7143a5fc03e56`
          url: `https://restcountries.eu/rest/v2/name/${countryName}`
        })
        .then((response) =>{
            //console.log(response.data);
            const code = response.data[0][`currencies`][0][`code`];
            console.log(code);
          //setCurrencyCode(response.data[`${first}_${second}`]);
        //   setCurrencyCode(response.data["currencies"]);
        //   console.log(props.store);
        //   updateCurrency(response.data["currencies"]);
            console.log("isfirst = " + isFirst);
            if (isFirst){
                dispatch(setFirstCurrency(code));
            }
            else{
                dispatch(setSecondCurrency(code));
            }
        })
        .catch((error) => {
          console.log(error);
        });
      };

    return (
        <div className="f1 tc" style={{marginLeft: "33%"}}> 
        <br></br>
        <input type="text" value={firstCountryName} onChange = {(e) => setFirstCountryName(e.target.value)}/>
        <button onClick = {() => {setCurrencyByCountryName(firstCountryName, true);}}>Search</button>

        <input type="text" value={secondCountryName} onChange = {(e) => setSecondCountryName(e.target.value)}/>
        <button onClick = {() => {setCurrencyByCountryName(secondCountryName, false);}}>Search</button>

        </div>
    );
}
export default CountrySearch;//src/images/Arbitreck.png
