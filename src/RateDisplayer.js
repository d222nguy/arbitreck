import React, { useEffect, useState} from 'react';
import {Provider, connect, useSelector, useDispatch} from 'react-redux';

const RateDisplayer = () => {
    const rate = useSelector(state => state.rate);
    const firstCurrency = useSelector(state => state.firstCurrency);
    const secondCurrency = useSelector(state => state.secondCurrency);
    let first = firstCurrency;
    let second = secondCurrency;
    // useEffect( () =>{
    //     console.log("Listening!");
    //     first = firstCurrency;
    //     second = secondCurrency;
    //   });
    return (
        <div>
            <header className="tc pv4 pv5-ns">
            <img src={require("/Users/duynguyen/Downloads/currency/src/images/Arbitreck.png")} className="br3 ba b--black-10 h4 w4" alt="avatar"></img>
            {/* <h1 className="f5 f4-ns fw6 black-70">Jasper Whitehouse</h1>
            <h2 className="f6 black-70 fw2 ttu tracked">Los Angeles</h2> */}
            </header>
            <div className="flex items-center justify-center pa4 bg-light-gray">
                <svg className="w1" viewBox="0 0 32 32" style={{fill:"currentcolor"}}>
                    <path d="M16 0 A16 16 0 0 1 16 32 A16 16 0 0 1 16 0 M19 15 L13 15 L13 26 L19 26 z M16 6 A3 3 0 0 0 16 12 A3 3 0 0 0 16 6"></path>
                </svg>
                <span className="lh-solid ml3 f1">1 {first} = {rate} {second}</span>
            </div>

        </div>
    );
}
export default RateDisplayer;//src/images/Arbitreck.png
