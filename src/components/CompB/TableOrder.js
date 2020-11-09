import React from 'react';
import Format from 'format-currency';
import { STATE_USER, STATE_TABLE, STATE_BTC, STATE_BNB, STATE_ETH, STATE_LTC } from '../../stores';
import { useRecoilValue } from 'recoil';
import { F_CLOSE_ORDER } from '../../stores/functions';
import { store } from 'react-notifications-component';

function TableOrder() {

    let { balance } = useRecoilValue(STATE_USER);
    let OrderList = useRecoilValue(STATE_TABLE);
    let BTC = useRecoilValue(STATE_BTC);
    let LTC = useRecoilValue(STATE_LTC);
    let BCH = useRecoilValue(STATE_BNB);
    let ETH = useRecoilValue(STATE_ETH);

    return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
            <div style={{width: '91%'}}>
            <p style={{fontWeight: '600', fontSize: '16'}}>Demo Balance: $ {Format(balance)}</p>
            <table className="table table-bordered" style={{border: '1px solid #5d5d5d'}}>
                <thead>
                    <tr style={{backgroundColor: '#303960', color: 'white'}}>
                        <th scope="col">No.</th>
                        <th scope="col">Pair</th>
                        <th scope="col">Type</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Price</th>
                        <th scope="col" style={{textAlign: 'center'}}>Gain/Loss ($)</th>
                        <th scope="col" style={{textAlign: 'center'}}>Action</th>
                    </tr>
                </thead>
                <tbody style={{backgroundColor: 'white'}}>
                    {OrderList.length && BTC.currentPrice > 0 ? <>
                        
                        {OrderList.map((item, index) => {

                            let { pair } = item;
                            let newCryp;
                            if (pair === 'BTC') {
                                newCryp = BTC
                            }else if (pair === 'ETH') {
                                newCryp = ETH
                            }else if (pair === 'LTC') {
                                newCryp = LTC;
                            }else if (pair === 'BCH') {
                                newCryp = BCH;
                            }
                            return (
                                <ListOrder key={index} index={index} crypto={item} marketPrice={newCryp.currentPrice} />
                            )
                        })}
                    
                    </> : <tr></tr>}
                </tbody>
                </table>
            </div>
        </div>
    )
};

const ListOrder = (props) => {

    const [myColor, setMyColor] = React.useState({
        dif: null,
        color: "black",
        background: "#f6eedf"
    })

    const CheckDif = () => {
        let { crypto } = props;
        let price = props.marketPrice;
        let currentPrice = crypto.price;
        let myDif = Number(price) - Number(currentPrice);
        let myNewDif;
        let myColor2 = {color: "", background: ""}
        if (props.crypto.order_type === 'sell') {
            myNewDif = 0 - myDif;
            if (myDif < 0) {
                myColor2.color = "black"
                myColor2.background = '#79d70f'
            }else if (myDif > 0) {
                myColor2.color = 'yellow';
                myColor2.background = '#c40b13'
            }else {
                myColor2.color = myColor.color;
                myColor2.background = myColor.background;
            }
        }else {
            myNewDif = 0 + myDif;
            if (myDif > 0) {
                myColor2.color = "black"
                myColor2.background = '#79d70f'
            }else if (myDif < 0) {
                myColor2.color = 'yellow';
                myColor2.background = '#c40b13'
            }else {
                myColor2.color = myColor.color;
                myColor2.background = myColor.background;
            }
        } 
        
        setMyColor({dif: myNewDif, color: myColor2.color, background: myColor2.background});

    };

    const closeOrder = (priceNow, tradeId, amount) => {
        let newPrice = (priceNow + myColor.dif) * amount;
        F_CLOSE_ORDER(newPrice, tradeId, (err, data) => {
            if (data) {

            }else {
                store.addNotification({
                    title: "Error",
                    message: err.response.data.message,
                    type: "error",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                      duration: 2000,
                    }
                  });
            }
        })
    };

    React.useEffect(CheckDif, [props.crypto.price, props.marketPrice])

    return (
        <tr style={{height: '5px'}}>
            <th scope="row">{props.index + 1}</th>
            <td>{props.crypto.pair}/USDT</td>
            <td>{props.crypto.order_type.toUpperCase()}/USDT</td>
            <td>{props.crypto.amount}</td>
            <td>{Format(props.crypto.price, { format: '%v %c', code: 'USD' })}</td>
            <td style={{width: '180px', color: myColor.color, backgroundColor: myColor.background, fontWeight: '600'}}>
                {myColor.dif ? (myColor.dif * props.crypto.amount).toFixed(2) : Format(myColor.dif) }
            </td>
            <td style={{cursor: 'pointer'}}>
                <div style={{ display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <span onClick={() => closeOrder(props.marketPrice, props.crypto._id, props.crypto.amount)} style={{cursor: 'pointer', color: 'blue', fontSize: '17px'}}>Close</span>
                </div>
            </td>
        </tr>
    )
}

export default TableOrder;