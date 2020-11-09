import React from 'react';
import BTC from '../TVChartContainer/BTCUSD';
import ETH from '../TVChartContainer/ETHUSD';
import LTC from '../TVChartContainer/LTCUSD';
import BCH from '../TVChartContainer/BCHUSD';


function Chart({ name }) {

    if (name === 'BTC') {
        return <BTC />;
    }else if (name === 'ETH') {
        return <ETH />;
    }else if (name === 'LTC') {
        return <LTC />;
    }else {
        return <BCH />
    }

};

export default Chart;