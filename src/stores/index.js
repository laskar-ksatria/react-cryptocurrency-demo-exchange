import { atom } from 'recoil';

export const baseUrl = 'http://45.32.100.72';

// export const baseUrl = 'http://localhost:3020'

export const STATE_USER = atom({
    key: 'userState',
    default: {
        user: null,
        balance: null,
    }
});

export const STATE_TABLE = atom({
    key: 'tableState',
    default: [],
})

export const STATE_BTC = atom({
    key: 'btcState',
    default: {
        currentPrice: null,
        volume: null,
        lastPrice: null,
        color: "black",
        background: "#f6eedf",
        bottomColor: "#363636",
        MKTCAP: "",
        direction: ""
    }
});

export const STATE_ETH = atom({
    key: 'ethState',
    default: {
        currentPrice: null,
        lastPrice: null,
        volume: null,
        color: "black",
        background: "#f6eedf",
        bottomColor: "#363636",
        MKTCAP: "",
        direction: ""
    }
});

export const STATE_LTC = atom({
    key: 'ltcState',
    default: {
        currentPrice: null,
        volume: null,
        lastPrice: null,
        color: "#363636",
        background: "#f6eedf",
        bottomColor: "#363636",
        MKTCAP: "",
        direction: ""
    }
});

export const STATE_BNB = atom({
    key: 'bnbState',
    default: {
        currentPrice: null,
        lastPrice: null,
        volume: null,
        color: "#363636",
        background: "#f6eedf",
        bottomColor: "#363636",
        MKTCAP: "",
        direction: ""
    }
})