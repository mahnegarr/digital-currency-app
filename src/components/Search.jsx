import React, { useEffect, useState } from 'react'
import { searchCoinList } from '../services/cryptoApi';
import { RotatingLines } from 'react-loader-spinner';
import styles from "./Search.module.css"

function Search({ crypto, setCrypto }) {
    const [text, setText] = useState("")
    const [coins, setCoins] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const controller = new AbortController()
        setCoins([])
        if (!text) {
            setIsLoading(false)
            return
        }
        const searchData = async () => {

            try {
                const res = await fetch(searchCoinList(text), { signal: controller.signal })
                const json = await res.json()

                if (json.coins) { setIsLoading(false); setCoins(json.coins) } else {
                    alert(json.status.error_message)
                }

            } catch (error) {
                if (error.name !== "AbortError") {
                    alert(error.message)
                }
            }

        }

        setIsLoading(true)
        searchData()

        return () => controller.abort()
    }, [text])
    return (
        <div className={styles.searchBox}>
            <input type="text" value={text} onChange={e => setText(e.target.value)} />
            <select value={crypto} onChange={e => setCrypto(e.target.value)}>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="jpy">JPY</option>
            </select>
            {(!!coins.length || isLoading) && (<div className={styles.searchResult}>
                {isLoading && <RotatingLines width='50px' height="50px" strokeColor='#f72585' strokeWidth='2' />}
                <ul>
                    {coins.map(coin => <li key={coin.id} >
                        <img src={coin.thumb} alt={coin.name} />
                        <p>{coin.name}</p>
                    </li>)}
                </ul>
            </div>)}

        </div>
    )
}

export default Search