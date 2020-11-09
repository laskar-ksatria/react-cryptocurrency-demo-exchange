import axios from 'axios';
import { baseUrl } from './index';

export const F_GET_PRICE_CRYPTO = (cb) => {

    axios({
        url: `${baseUrl}/getprices`,
        method: 'GET'
    })
    .then(({data}) => {
        console.log(data);
        let newData = classification(data);
        cb(null, newData);
    })
    .catch(err => {
        cb(err, null);
    })

};

export const F_CLOSE_ORDER = (gainLoss, tradeId,cb) => {
    axios({
        url: `${baseUrl}/updatetrade/${tradeId}`,
        method: 'POST',
        headers: {
            cryptotoken: localStorage.getItem('cryptotoken')
        },
        data: {
            gainLoss
        }
    })
    .then(({data}) => {
        cb(null, data)
    })
    .catch(err => {
        cb(err, null)
    })
}

export const F_GET_LIST_ORDER = (cb) => {
    axios({
        url: `${baseUrl}/trade/mytrade`,
        method: 'GET',
        headers: {
            cryptotoken: localStorage.getItem('cryptotoken')
        }
    })
    .then(({data}) => {
        cb(null, data)
    })
    .catch(err => cb(err, null))
};

export const F_CHECKAUTH = (cb) => {
    axios({
        url: `${baseUrl}/users/me`,
        method: 'GET',
        headers: {
            cryptotoken: localStorage.getItem('cryptotoken')
        }
    })
    .then(({data}) => {
        cb(null, data);
    })
    .catch(err => cb(err, null))
}

const classification = (data) => {
    let { RAW, DISPLAY } = data;

    let BTC_DATA = {
        price: RAW.BTC.USD.PRICE,
        volume: RAW.BTC.USD.VOLUME24HOUR,
        MKTCAP: DISPLAY.BTC.USD.MKTCAP,
    };

    let ETH_DATA = {
        price: RAW.ETH.USD.PRICE,
        volume: RAW.ETH.USD.VOLUME24HOUR,
        MKTCAP: DISPLAY.ETH.USD.MKTCAP,
    };

    let LTC_DATA = {
        price: RAW.LTC.USD.PRICE,
        volume: RAW.LTC.USD.VOLUME24HOUR,
        MKTCAP: DISPLAY.LTC.USD.MKTCAP,
    };

    let BNB_DATA = {
        price: RAW.BCH.USD.PRICE,
        volume: RAW.BCH.USD.VOLUME24HOUR,
        MKTCAP: DISPLAY.BCH.USD.MKTCAP,
    };

    return { BTC_DATA, ETH_DATA, LTC_DATA, BNB_DATA };

};


export const F_LOGIN = (data, cb) => {
    axios({
        url: `${baseUrl}/users/login`,
        method: 'POST',
        data,
    })
    .then(({data}) => {
        cb(null, data);
    })
    .catch(err => {
        cb(err, null);
    });
};

export const F_REGISTER = (data, cb) => {
    axios({
        url: `${baseUrl}/users`,
        method: 'POST',
        data,
    })
    .then(({data}) => {
        cb(null, data);
    })
    .catch(err => {
        cb(err, null);
    })
};

export const F_ORDER = (data, cb) => {
    axios({
        url: `${baseUrl}/trade`,
        method: 'POST',
        data,
        headers: {
            cryptotoken: localStorage.getItem('cryptotoken')
        }
    })
    .then(({data}) => {
        cb(null, data);
    })
    .catch(err => {
        cb(err, null)
    })
};