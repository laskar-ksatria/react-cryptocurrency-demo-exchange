import React from 'react';
import Header from '../components/Header';
import PriceCard from '../components/CompB/PriceCard';
import Socket from 'socket.io-client';
import { baseUrl, STATE_BNB, STATE_BTC, STATE_LTC, STATE_ETH, STATE_USER, STATE_TABLE} from '../stores';
import { F_GET_PRICE_CRYPTO, F_CHECKAUTH, F_GET_LIST_ORDER } from '../stores/functions';
import { useRecoilState } from 'recoil';
import { cryptoList } from '../stores/data';

function ExchangePage() {

    const [BTC, setBTC] = useRecoilState(STATE_BTC);
    const [ETH, setETH] = useRecoilState(STATE_ETH);
    const [LTC, setLTC] = useRecoilState(STATE_LTC);
    const [BNB, setBNB] = useRecoilState(STATE_BNB);
    const [userData, setUserData] = useRecoilState(STATE_USER);
    const [tableList, setTableList] = useRecoilState(STATE_TABLE)

    const [checkData, setCheckData] = React.useState(false);

    let ENDPOINT = baseUrl;
    const getSocketUser = () => {
        if (userData.user) {
            let Io = Socket(ENDPOINT);
            Io.on(`${userData.user._id}-balance`, newBalance => {
                setUserData({...userData, balance: newBalance})
            })
            Io.on(`${userData.user._id}-updateorder`, newOrders => {
                setTableList(newOrders);
            })
        }
    };

    React.useEffect(getSocketUser, [ENDPOINT, userData.user])

    const getSocket = () => {
        let Io = Socket(ENDPOINT);
        if (checkData) {
            Io.on(`realtime-price`, data => {
                console.log(data.PRICE);
                let { PRICE, FROMSYMBOL, VOLUME24HOUR } = data;
                let cryptoPrice;
                let newColor;
                let newBackground;
                let newBottomColor;
                let direction;
                if (PRICE) {
                    if (FROMSYMBOL === 'BTC') {
                        cryptoPrice = BTC.currentPrice;
                        if (PRICE > cryptoPrice) {
                            newColor = 'green';
                            newBackground = 'yellowgreen';
                            newBottomColor = '#363636';
                            direction = 'up';
                        }else if (PRICE < cryptoPrice) {
                            newColor = 'red';
                            newBackground = '#c40b13';
                            newBottomColor = 'yellow';
                            direction = 'down';
                        }else {
                            newColor = BTC.color;
                            newBackground = BTC.background;
                            newBottomColor = BTC.bottomColor;
                            direction = BTC.direction;
                        }
        
                        setBTC({MKTCAP: BTC.MKTCAP, currentPrice: PRICE, lastPrice: cryptoPrice, 
                            background: newBackground, color: newColor, bottomColor: newBottomColor,
                            volume: VOLUME24HOUR, direction: direction
                        })
        
                    }else if (FROMSYMBOL === 'ETH') {
                        cryptoPrice = ETH.currentPrice;
                        if (PRICE > cryptoPrice) {
                            newColor = 'green';
                            newBackground = '#79d70f';
                            newBottomColor = '#363636';
                            direction = 'up';
                        }else if (PRICE < cryptoPrice) {
                            newColor = 'red';
                            newBackground = '#c40b13';
                            newBottomColor = 'yellow';
                            direction = 'down';
                        }else {
                            newColor = ETH.color;
                            newBackground = ETH.background;
                            newBottomColor = ETH.bottomColor;
                            direction = ETH.direction;
                        }
        
                        setETH({MKTCAP: ETH.MKTCAP, currentPrice: PRICE, lastPrice: cryptoPrice, 
                            background: newBackground, color: newColor, bottomColor: newBottomColor,
                            volume: VOLUME24HOUR, direction: direction
                        })
                    }else if (FROMSYMBOL === 'LTC') {
                        cryptoPrice = LTC.currentPrice;
                        if (PRICE > cryptoPrice) {
                            newColor = 'green';
                            newBackground = '#79d70f';
                            newBottomColor = '#363636';
                            direction = 'up';
                        }else if (PRICE < cryptoPrice) {
                            newColor = 'red';
                            newBackground = '#c40b13';
                            newBottomColor = 'yellow';
                            direction = 'down';
                        }else {
                            newColor = LTC.color;
                            newBackground = LTC.background;
                            newBottomColor = LTC.bottomColor;
                            direction = LTC.direction;
                        }
                        setLTC({MKTCAP: LTC.MKTCAP, currentPrice: PRICE, lastPrice: cryptoPrice, 
                            background: newBackground, color: newColor, bottomColor: newBottomColor,
                            volume: VOLUME24HOUR, direction: direction
                        })
                    }else if (FROMSYMBOL === 'BCH') {
                        cryptoPrice = BNB.currentPrice;
                        if (PRICE > cryptoPrice) {
                            newColor = 'green';
                            newBackground = '#79d70f';
                            newBottomColor = '#363636';
                            direction = 'up';
                        }else if (PRICE < cryptoPrice) {
                            newColor = 'red';
                            newBackground = '#c40b13';
                            newBottomColor = 'yellow';
                            direction = 'down';
                        }else {
                            newColor = BNB.color;
                            newBackground = BNB.background;
                            newBottomColor = BNB.bottomColor;
                            direction = BNB.direction;
                        }   
                        setBNB({MKTCAP: BNB.MKTCAP, currentPrice: PRICE, lastPrice: cryptoPrice, 
                            background: newBackground, color: newColor, bottomColor: newBottomColor,
                            volume: VOLUME24HOUR, direction: direction
                        })
                    }
                }
               
            })
        }

    };

    const getCryptoPrice = () => {
            F_GET_PRICE_CRYPTO((err, data) => {
                if (data) {
                    
                    let { BTC_DATA, ETH_DATA, LTC_DATA, BNB_DATA } = data;
                    setBTC({...BTC, currentPrice: BTC_DATA.price, volume: BTC_DATA.volume, lastPrice: BTC_DATA.price, MKTCAP: BTC_DATA.MKTCAP})
                    setETH({...ETH, currentPrice: ETH_DATA.price, volume: ETH_DATA.volume, lastPrice: ETH_DATA.price, MKTCAP: ETH_DATA.MKTCAP})
                    setLTC({...LTC, currentPrice: LTC_DATA.price, volume: LTC_DATA.volume, lastPrice: LTC_DATA.price, MKTCAP: LTC_DATA.MKTCAP})
                    setBNB({...BNB, currentPrice: BNB_DATA.price, volume: BNB_DATA.volume, lastPrice: BNB_DATA.price, MKTCAP: BNB_DATA.MKTCAP})
                    setCheckData(true);
                }
            })
    };

    const getUserData = () => {
        if (!userData.user) {
            F_CHECKAUTH((err, data) => {
                if (data) {
                    let { demo_balance } = data;
                    setUserData({user: data, balance: demo_balance})
                }else {

                }
            })
        }
    };

    const getTableList = () => {
        F_GET_LIST_ORDER((err, data) => {
            if (data) {
                setTableList(data);
            }
        })
    };

    React.useEffect(getTableList, []);

    React.useEffect(getUserData, []);

    React.useEffect(getCryptoPrice, []);

    React.useEffect(getSocket, [ENDPOINT, checkData]);

    return (
        <>
            <Header />
            <div style={{marginTop: '30px', display: 'flex', justifyContent: 'space-around', padding: '0 20px 0 20px'}}>
                {cryptoList.map((item, index) => {
                    let {name} = item;
                    let crypto;
                    if (name === 'BTC') {
                        crypto = BTC;
                    }else if (name === 'ETH') {
                        crypto = ETH;
                    }else if (name === 'LTC') {
                        crypto = LTC;
                    }else if (name === 'BCH') {
                        crypto = BNB;
                    }
                    return (
                        <PriceCard 
                            key={index} 
                            name={item.name} 
                            volSymbol={item.volSymbol} 
                            crypto={crypto}
                        />
                    )
                })}
            </div>
        </>
    )
};

export default ExchangePage;