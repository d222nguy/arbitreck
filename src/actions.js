import {CHANGE_SEARCHFIELD, CHANGE_FIRST_CURRENCY, CHANGE_SECOND_CURRENCY} from './constants.js'
export const setSearchField = (text) => ({
    type: CHANGE_SEARCHFIELD,
    payload: text
});
export const setFirstCurrency = (text) =>({
    type: CHANGE_FIRST_CURRENCY,
    payload: text
});
export const setSecondCurrency = (text) =>({
    type: CHANGE_SECOND_CURRENCY,
    payload: text
});
export const setRates = (arr) => ({
    type: "SET_RATES",
    payload: arr
});
export const setCurrentRate = (num) => ({
    type: "SET_CURRENT_RATE",
    payload: num
});
export const setDates = (arr) => ({
    type: "SET_DATES",
    payload: arr
});
export const getRate = () => ({
    type: "GET_RATE"
});
export const setAmount = (num) =>({
    type: "SET_AMOUNT",
    payload: num
});
