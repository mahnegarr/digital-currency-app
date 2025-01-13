import React, { useEffect, useState } from 'react'
import TableCoin from './TableCoin'
import { getCoinList } from '../services/cryptoApi'
import Pagination from './Pagination'
import Search from './Search'

function HomePage() {
    const [coins, setCoins] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [crypto, setCrypto] = useState("usd")
    const [search, setSearch] = useState("")

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch(getCoinList(page, crypto))
                const json = await res.json()
                setCoins(json)
                setIsLoading(false)

            } catch (error) {
                console.log(error);

            }
        }

        getData();

    }, [page, crypto])
    return (
        <div>
            <Search crypto={crypto} setCrypto={setCrypto} search={search} setSearch={setSearch} />
            <TableCoin crypto={crypto} coins={coins} isLoading={isLoading} />
            <Pagination page={page} setPage={setPage} />
        </div>
    )
}

export default HomePage