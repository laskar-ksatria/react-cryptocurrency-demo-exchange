import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './index.css';
import Datafeed from './api';

function getLanguageFromURL() {
  const regex = new RegExp('[\\?&]lang=([^&#]*)');
  const results = regex.exec(window.location.search);
  return results === null
    ? null
    : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

class DynamicChart extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  static defaultProps = {
    interval: '15',
    containerId: 'tv_chart_container',
    libraryPath: '/charting_library/',
    chartsStorageUrl: 'https://saveload.tradingview.com',
    chartsStorageApiVersion: '1.1',
    clientId: 'tradingview.com',
    userId: 'public_user_id',
    fullscreen: false,
    autosize: true,
    studiesOverrides: {},
  };

  componentDidMount() {
    const { path } = this.props.match;

    const widgetOptions = {
      debug: false,
      symbol: path.split('/').pop().replace('-', '/').toUpperCase(),
      datafeed: Datafeed,
      interval: this.props.interval,
      theme: 'dark',
      container_id: this.props.containerId,
      library_path: this.props.libraryPath,
      locale: getLanguageFromURL() || 'en',
      disabled_features: ['use_localstorage_for_settings'],
      enabled_features: ['study_templates'],
      charts_storage_url: this.props.chartsStorageUrl,
      charts_storage_api_version: this.props.chartsStorageApiVersion,
      client_id: this.props.clientId,
      user_id: this.props.userId,
      fullscreen: this.props.fullscreen,
      autosize: this.props.autosize,
      studies_overrides: this.props.studiesOverrides,
      overrides: {
        'mainSeriesProperties.showCountdown': true,
        'paneProperties.background': '#131722',
        'paneProperties.vertGridProperties.color': '#363c4e',
        'paneProperties.horzGridProperties.color': '#363c4e',
        'symbolWatermarkProperties.transparency': 90,
        'scalesProperties.textColor': '#AAA',
        'mainSeriesProperties.candleStyle.wickUpColor': '#336854',
        'mainSeriesProperties.candleStyle.wickDownColor': '#7f323f',
      },
    };
    const widget = (window.tvWidget = new window.TradingView.widget(
      widgetOptions
    ));

    widget.onChartReady(() => {
      // console.log('Chart has loaded!');
    });
  }

  render() {
    return <div id={this.props.containerId} className={'TVChartContainer'} />;
  }
}

export default withRouter(DynamicChart);
