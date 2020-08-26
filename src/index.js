import React, { useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {render} from "react-dom"
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from "axios"
import "tachyons";
import RateDisplayer from './RateDisplayer';
import CountrySearch from './CountrySearch';

import {Provider, connect, useSelector, useDispatch} from 'react-redux';
import {createStore} from 'redux';
import {searchRobots} from './reducers.js';
import LineChart from './components/LineChart.js';
import {setRates, setDates, setFirstCurrency, setSecondCurrency} from './actions.js';
import { wait } from '@testing-library/react';

import 'semantic-ui-css/semantic.min.css'

const store = createStore(searchRobots);
// console.log(store);
//this would set firstCurrency to something
// const mapStateToProps = (state) => {
//   return{
//     searchField: state.searchField,
//     firstCurrency: state.firstCurrency
// }};
// const mapDispatchToProps = (dispatch) => {
//   return{
//     onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
//     onFirstCurrencyChange: (event) => dispatch(setCurrency(event.target.value))
//   }
// };

const CurrencyConverter = (props) => {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [rate, setRate] = useState([]);
  const firstCurrency = useSelector(state => state.firstCurrency);
  const secondCurrency = useSelector(state => state.secondCurrency);
  let rates = [];
  let dates = [];
  console.log(firstCurrency);
  console.log(secondCurrency);
  const dispatch = useDispatch();

  var today = new Date();
  today.setDate(today.getDate() - 1);
  var seven_days_ago = new Date();
  seven_days_ago.setDate(seven_days_ago.getDate() - 7);
  today = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  seven_days_ago = seven_days_ago.getFullYear()+'-'+(seven_days_ago.getMonth()+1)+'-'+seven_days_ago.getDate();
  console.log(today);
  console.log(seven_days_ago);
  useEffect( () =>{
    console.log(props);
    const a = document.getElementById("A1");
    const b = document.getElementById("A2");
    console.log("Listened a change from first currency!");
    console.log(a)
    a.value = firstCurrency;
    b.value = secondCurrency;

    
  }, [firstCurrency, secondCurrency]);
  const getRate = (first, second) => {
    axios({
      method: "GET",
      url:  `https://free.currconv.com/api/v7/convert?q=${first}_${second}&compact=ultra&apiKey=7e0e20e7143a5fc03e56`
    })
    .then((response) =>{
      console.log(response.data);
      // setRate(response.data[`${first}_${second}`]);
    })
    .catch((error) => {
      console.log(error);
    });
  };
  const getRate5Days = (first, second) => {

    axios({
      method: "GET",
      url:  `https://free.currconv.com/api/v7/convert?q=${first}_${second}&compact=ultra&date=${seven_days_ago}&endDate=${today}&apiKey=7e0e20e7143a5fc03e56`
    })
    .then((response) => {
      const pair = firstCurrency + "_" + secondCurrency;
      console.log(pair);
      console.log(response.data);
      console.log(response.data[pair])
      rates = Object.values(response.data[pair]);
      dates = Object.keys(response.data[pair]);
      console.log(rates);
      console.log(dates);
      dispatch(setRates(rates));
      dispatch(setDates(dates));
    })
    .catch((error) => {
      console.log(error);
    })
  }
  return (
  <div>
    <RateDisplayer></RateDisplayer>
      <div className="f1 tc" style={{marginLeft: "33%"}}> 
      {/* 1 USD = {uSDPHP} PHP */}
      1 {first} = {rate}{second}
      </div>
      <br></br>
      <input id = "A1" type="text" onChange = {(e) => dispatch(setFirstCurrency(e.target.value))} />
      <input id = "A2" type="text" onChange = {(e) => dispatch(setSecondCurrency(e.target.value))} />

      <button onClick = {() => {
        getRate(firstCurrency, secondCurrency);
      }}>Convert</button>

      <button onClick = {() => {
        getRate5Days(firstCurrency, secondCurrency);
      }}>Convert</button>
      <CountrySearch></CountrySearch>
      <LineChart></LineChart>
  </div>
  );
};
render (<Provider store = {store}>
          <CurrencyConverter/>
        </Provider>, document.querySelector("#root")
        );
//export default CurrencyConverter;
export default (CurrencyConverter);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
