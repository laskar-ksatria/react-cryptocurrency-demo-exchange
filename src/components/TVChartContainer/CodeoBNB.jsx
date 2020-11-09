import * as React from "react";
import "./index.css";
import Datafeed from "./api/indexcodeo";

export class TVChartContainer extends React.PureComponent {
  static defaultProps = {
    symbol: "CODEO/BNB",
    // interval: "D",
    containerId: "tv-chart",
    libraryPath: "/charting_library/",
    chartsStorageUrl: "https://saveload.tradingview.com",
    chartsStorageApiVersion: "1.1",
    clientId: "tradingview.com",
    userId: "public_user_id",
    fullscreen: false,
    autosize: true,
    studiesOverrides: {},
    theme: "Dark",
  };

  componentDidMount() {
    const widgetOptions = {
      debug: false,
      symbol: this.props.symbol,
      datafeed: Datafeed,
      interval: this.props.interval,
      container_id: this.props.containerId,
      library_path: this.props.libraryPath,
      locale: "en",
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
      disabled_features: ["top_toolbar", "hide_top_toolbar", "hide_legend"],
      enabled_features: ["study_templates", "hide_left_toolbar_by_default"],
      disabledDrawings: true,
      charts_storage_url: this.props.chartsStorageUrl,
      charts_storage_api_version: this.props.chartsStorageApiVersion,
      client_id: this.props.clientId,
      user_id: this.props.userId,
      fullscreen: this.props.fullscreen,
      autosize: this.props.autosize,
      theme: this.props.theme,
    };
    // window.TradingView.onready(() => {
    const widget = (window.tvWidget = new window.TradingView.widget(
      widgetOptions
    ));
    widget.onChartReady(() => {
      //   widget
      //     .createButton()
      //     .attr("title", "Select or Search Pairings")
      //     .addClass("apply-common-tooltip")
      //     .on("click", () =>
      //       widget.chart().executeActionById("symbolSearch")
      //     )[0].innerHTML = "Pairings";
      widget
        .createButton()
        .attr("title", "Dark Mode")
        .addClass("apply-common-tooltip")
        .on("click", () => widget.changeTheme("Dark"))[0].innerHTML = "Dark";
      widget
        .createButton()
        .attr("title", "Light Mode")
        .addClass("apply-common-tooltip")
        .on("click", () => widget.changeTheme("Light"))[0].innerHTML = "Light";
    });
  }

  render() {
    return <div id={this.props.containerId} className={"TVChartContainer"} />;
  }
}

export default TVChartContainer;
