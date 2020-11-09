import axios from 'axios';

const baseUrl = 'http://localhost:3020'

export const buyOrder = (pair, amount, price) => {



    return new Promise((res, rej) => {
        axios({
            url: `${baseUrl}/trade`,
            method: 'POST',
            headers: {
                cryptotoken: localStorage.getItem('cryptotoken')
            },
            data: {
                pair, amount, price, order_type: 'buy'
            }
        })
        .then(({data}) => {
            res(data);
        })
        .catch(err => {
            rej(err);
        })

    })
};

export const sellOrder = (pair, amount, price) => {
    return new Promise((res, rej) => {
        axios({
            url: `${baseUrl}/trade`,
            method: 'POST',
            headers: {
                cryptotoken: localStorage.getItem('cryptotoken')
            },
            data: {
                pair, amount, price, order_type: 'sell'
            }
        })
        .then(({data}) => {
            res(data)
        })
        .catch(err => {
            rej(err);
        })
    })
};

export const getMyOrder = () => {
    return new Promise((res, rej) => {
        axios({
            url: `${baseUrl}/trade/mytrade`,
            method: 'GET',
            headers: {
                cryptotoken: localStorage.getItem('cryptotoken')
            },
            
        })
        .then(({data}) => {
            console.log(data);
            res(data);
        })
        .catch(err => {
            rej(err)
        })
    })
};


export const updateGainLoss = (gainLoss, tradeId) => {
    return new Promise((res, rej) => {
        axios({
            url: `${baseUrl}/trade/${tradeId}`,
            method: 'PATCH',
            headers: {
                cryptotoken: localStorage.getItem('cryptotoken')
            },
            data: {
                gainLoss
            }
        })
        .then(({data}) => {
            res(data);
        })
        .catch(err => {
            rej(err);
        })
    })
}

