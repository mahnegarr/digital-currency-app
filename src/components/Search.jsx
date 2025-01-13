import React, { useEffect, useState } from 'react'
import { searchCoinList } from '../services/cryptoApi';
function Search({ crypto, setCrypto }) {
    const [text, setText] = useState("")
    const [coins, setCoins] = useState([])

    useEffect(() => {
        const controller = new AbortController()
        if (!text) return;
        const searchData = async () => {

            try {
                const res = await fetch(searchCoinList(text), { signal: controller.signal })
                const json = await res.json()

                if (json.coins) { setCoins(json.coins) } else {
                    alert(json.status.error_message)
                }

            } catch (error) {
                if (error.name !== "AbortError") {
                    alert(error.message)
                }
            }

        }
        searchData()

        return () => controller.abort()
    }, [text])
    return (
        <div>
            <input type="text" value={text} onChange={e => setText(e.target.value)} />
            <select value={crypto} onChange={e => setCrypto(e.target.value)}>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="jpy">JPY</option>
            </select>
        </div>
    )
}

export default Search