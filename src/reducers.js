import {CHANGE_FIRST_CURRENCY, CHANGE_SECOND_CURRENCY, CHANGE_SEARCHFIELD, GET_RATE} from './constants.js'
import { bindActionCreators } from 'redux';
const initialState = {
    secondCurrency: 'USD',
    searchField: '123',
    firstCurrency: 'CAD',
}
export const searchRobots = (state = initialState, action = {}) => {
    // console.log(action.type);
    // console.log(state);
    // console.log("action payload = " + action.payload);
    switch (action.type){
        case CHANGE_SECOND_CURRENCY:
            return Object.assign({}, state, {secondCurrency: action.payload});
        case CHANGE_SEARCHFIELD: //if action = change search field, then return new state
            return Object.assign({}, state, {searchField: action.payload});
        case CHANGE_FIRST_CURRENCY:
            return Object.assign({}, state, {firstCurrency: action.payload});
        case "SET_RATES":
            return Object.assign({}, state, {rates: action.payload});
        case "GET_RATE":
            return Object.assign({}, state, {get_rate: true});
        case "SET_DATES":
            return Object.assign({}, state, {dates: action.payload});
        default:
            return state;
    }
}