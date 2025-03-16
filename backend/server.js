const express = require('express');
const app = express();
const port = 5000;

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
        
        const topCryptos = response.data;

        console.log('Top 20 Cryptocurrencies: ');
        topCryptos.forEach((crypto, index) => {
            console.log(`${index + 1}.${crypto.name} (${crypto.symbol.toUpperCase()}):$${crypto.current_price}`);
        });
        return topCryptos;
        
    } catch (error) {
    console.error('Error fetching data from CoinGecko: ', error);
    }
};

app.use(express.static('./public'))

app.get('/gettopcryptos', async (req, res) => {
    const response = await getTopCryptos();
    res.json(response);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});