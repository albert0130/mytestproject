const express = require('express');
const app = express();
const port = 9999;

const axios = require("axios")

const getTopCryptos = async () => {
    try{
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets',
            {
                params: {
                    vs_currency: 'usd',
                    order: 'market_cap_desc',
                    per_page: 20,
                    page: 1,
                    sparkline: false,
                },
            });
    
        return response.data;
        
    } catch (error) {
    console.error('Error fetching data from CoinGecko: ', error);
    }
};

app.use(express.static('./public'))

app.get('/get', async (req, res) => {
    const response = await getTopCryptos();
    res.json(response);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});