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
import {setRates, setDates, setFirstCurrency, setSecondCurrency, setCurrentRate, setAmount} from './actions.js';
import { wait } from '@testing-library/react';

import 'semantic-ui-css/semantic.min.css';
import {Grid, Input, Button, GridColumn, GridRow} from 'semantic-ui-react';

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
  const amount = useSelector(state => state.amount);
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
    const fr = document.getElementById("from");
    const to = document.getElementById("to");
    console.log("Listened to a change from first currency!");
    fr.value = firstCurrency;
    to.value = secondCurrency;
    console.log(amount);

    
  }, [firstCurrency, secondCurrency, amount]);
  const getRate = (first, second) => {
    axios({
      method: "GET",
      url:  `https://free.currconv.com/api/v7/convert?q=${first}_${second}&compact=ultra&apiKey=7e0e20e7143a5fc03e56`
    })
    .then((response) =>{
      console.log(response.data);
      const pair = `${firstCurrency}_${secondCurrency}`;
      console.log(pair);
      const r = response.data[pair];
      console.log(r);
      dispatch(setCurrentRate(r));
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
      <div className="dtc dt--fixed" style={{marginLeft: "33%"}}> 
      </div>
      <br></br>
      <Grid stackable columns = {3} centered>
        <Grid.Row columns = {3}>
          <Grid.Column>
          <Input id = "amount" label='Amount' placeholder='1' size = "huge" 
              onChange = {(e) => dispatch(setAmount(e.target.value))} />
          </Grid.Column>
          <Grid.Column>
            <Input id = "from" label='From' placeholder='USD' size = "huge"
                onChange = {(e) => dispatch(setFirstCurrency(e.target.value))} />
          </Grid.Column>
          <Grid.Column>
            <Input id = "to" label= 'To' placeholder='CAD' size = "huge"
                onChange = {(e) => dispatch(setSecondCurrency(e.target.value))}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>OR, SEARCH CURRENCY CODE BY COUNTRY:</Grid.Row>

              {/* <div style={{padding: "1rem", fontSize: "1.5rem"}}>Or search by country name</div> */}
        <CountrySearch></CountrySearch>
        <Grid.Row>
        <Grid.Column width = {3}>
              <Button content='Convert' icon='right arrow' labelPosition='right' size="huge" 
                      onClick = {() => {
                                getRate(firstCurrency, secondCurrency);
                      }}/>
        </Grid.Column>
        <Grid.Column width = {3}>
            <Button content='Draw chart' icon='right arrow' labelPosition='right' size="huge" 
                      onClick = {() => {
                                getRate5Days(firstCurrency, secondCurrency);
                      }}/>
        </Grid.Column>
        </Grid.Row>
      </Grid>

      {/* <button onClick = {() => {
        getRate(firstCurrency, secondCurrency);
      }}>Convert</button>

      <button onClick = {() => {
        getRate5Days(firstCurrency, secondCurrency);
      }}>Convert</button> */}
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
