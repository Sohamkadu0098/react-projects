import { createContext, useEffect, useState } from "react";
import { getFromApi } from "../lib/api";

export const CoinContext = createContext();

const CoinContextProvider = (props) =>{
    const [allCoin,setAllCoin] = useState([]);
    const[currency,setCurrency] =  useState({
        name:"usd",
        Symbol:"$"
    });
    const fetchAllCoin = async() => {
        try {
            const res = await getFromApi("coins/markets", {
                vs_currency: currency.name,
                order: "market_cap_desc",
                per_page: 100,
                page: 1,
                sparkline: false,
                price_change_percentage: "1h,24h,7d",
            });
            setAllCoin(res);
        } catch (err) {
            console.error(err);
        }
    }

    
    useEffect(() => {
        fetchAllCoin();

    },[currency]);

    const contextValue ={
        allCoin,currency,setCurrency

    };

    return(
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    )
}


export default CoinContextProvider;