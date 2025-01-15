const BASE_URL = "https://api.coingecko.com/api/v3"
const API_KEY = "CG-yzfdbPvdW6E6P6N5pFkkFQe8"

const getCoinList = (page,crypto)=>{
    
    return `${BASE_URL}/coins/markets?vs_currency=${crypto}&order=market_cap_desc&per_page=20&page=${page}&x_cg_demo_api_key=${API_KEY}`
}

const searchCoinList = (text)=>{
    return `${BASE_URL}/search?query=${text}&x_cg_demo_api_key=${API_KEY}`
}
export {getCoinList , searchCoinList}


