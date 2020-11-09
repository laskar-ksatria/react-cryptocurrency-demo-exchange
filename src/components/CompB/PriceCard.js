import React from 'react';
import './priceCard.css';
import UpArrow from '../../assets/uparrow.png';
import DownArrow from '../../assets/donwarrow.png';
import Format from 'format-currency';
import { store } from 'react-notifications-component';
import { F_ORDER } from '../../stores/functions';
import Chart from './Chart';
import { Button, Modal } from 'react-bootstrap';

function PriceCard({ name, volSymbol, crypto }) {

    const [amount, setAmount] = React.useState("");

    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClick = (type) => {
        let newAmount = Number(amount);
        if (newAmount === NaN) {
            store.addNotification({
                title: "Error",
                message: "Amount must be in number",
                type: "error",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 2000,
                }
              });
        }else {
            let myOrder = {
                order_type: type,
                amount: amount,
                pair: name,
                price: crypto.currentPrice,
            };
            F_ORDER(myOrder, (err, data) => {
                if (err) {
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
                }else {
                    setAmount("")
                }
            })
        }
    }

    return (
        <div style={{margin: '15px',width: '270px',display: 'flex', flexDirection: 'column' ,height: '180px', background: 'white', border: '1px solid grey', borderRadius: '5px', boxShadow: '3px 3px #888888'}}>       
                <div style={{boxSizing: 'border-box',padding: '5px 10px 0px 10px', width: '100%', height: '15px', display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{fontWeight: '600'}}>
                        {name} - USD
                    </div>
                    <div style={{fontSize: '10px'}}>
                        <p>Vol:   {volSymbol} {crypto.volume ? Format(crypto.volume.toFixed(2)) : ""} 
                            </p>
                    </div>
                </div>
            
                <div style={{marginTop: '20px',flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '19px'}}>
                   {crypto.currentPrice ? 
                     <p style={{fontWeight: 'bold'}}>$ 
                     <span style={{color: crypto.color, fontWeight: '500', marginLeft: '5px'}}>
                         {Format(crypto.currentPrice)}
                     </span>
                     <span style={{marginLeft: '10px'}}>
                         {crypto.direction ? 
                     <>
                             {crypto.direction === 'up' ? <img src={UpArrow} width="17" style={{marginBottom: '3px'}} />
                                 : <img src={DownArrow} width="17" style={{marginBottom: '3px'}} />      
                             }
                     </> 
                     : ""}
                     </span>
                 </p>   
                
                : 
                             
                <div className="spinner-border text-primary" role="status" style={{fontWeight: 'bold', marginTop: '40px'}}>
                    <span className="sr-only">Loading...</span>
                </div>
                
                }
                </div>
  
                <div style={{height: '15px', marginTop: '5px',display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {crypto.currentPrice ? <input value={amount} onChange={e => setAmount(e.target.value)} className="input-text"  style={{border: '1px solid whitesmoke',marginBottom: '2px'}} type="text" placeholder="Enter amount" /> : ""}
                </div>

                <div style={{marginTop: '10px',padding: '0 10px 0 10px', marginBottom: '10px',display: 'flex', justifyContent: 'center'}}>
                   {crypto.currentPrice ? 
                    <>
                        <div onClick={() => handleClick('buy')}  style={{textDecoration: 'none', cursor: 'pointer', fontWeight: '600', color: 'green', marginRight: '70px'}}>Buy</div>
                        <div onClick={() => handleClick('sell')}  style={{textDecoration: 'none', cursor: 'pointer', fontWeight: '600', color: 'red'}}>Sell</div>
                    </>   
                    : 
                    <>
                        <div onClick={() => handleClick('buy')}  style={{textDecoration: 'none', cursor: 'pointer', fontWeight: '600', color: 'white', marginRight: '70px'}}>Buy</div>
                        <div onClick={() => handleClick('sell')}  style={{textDecoration: 'none', cursor: 'pointer', fontWeight: '600', color: 'white'}}>Sell</div>
                    </>
                }
                </div>

                {/* MODAL ------------------------------ */}


                <div onClick={handleShow} style={{color: crypto.currentPrice ? crypto.bottomColor : 'white',cursor: 'pointer',fontSize: '16px', fontWeight: 'bold',background: crypto.currentPrice ? crypto.background : 'white', height: '100px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {/* MKTCAP: {crypto.MKTCAP} */}
                    See Chart
                </div>

                <Modal show={show} onHide={handleClose}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                >
                  {/* <Modal.Header closeButton>
                  <Modal.Title>{`${name} - USD`}</Modal.Title>
                  </Modal.Header>  */}
                  <Modal.Body >
                    <div style={{width: '760px', height: '380px'}}>
                      <Chart name={name} />
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                      Quit
                    </Button>
                  </Modal.Footer>
              </Modal>

        </div>
        )
};

export default PriceCard;