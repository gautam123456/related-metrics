import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Loader from './Loader';
import Highcharts from 'highcharts/highcharts';
import HighchartsReact from 'highcharts-react-official';
import { makeApiCall } from '../actions';
import { getThumbnailHighchartsOptions } from '../data/highchartOptions';
import { URL_FOR_MAIN_CHART_DATA, GET } from '../constants';
//import '../../dist/styles/style.css';

class ThumbnailChart extends Component {
    state = {
        chhartOptions: null
    }

    componentDidMount() {
        this.updateChart();
    }

    updateChart() {
        const { makeApiCall } = this.props;
        makeApiCall({ url: URL_FOR_MAIN_CHART_DATA, method: GET, successCallback: this.successCallback, errorCallback: this.errorCallback });
    }

    successCallback = (data) => {
        const { options: {color} } = this.props;
        setTimeout(() => {
            this.setState({ chhartOptions: getThumbnailHighchartsOptions({data, color}) });
        }, 2000);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.options !== this.props.options){
            this.updateChart();
        }
    }

    errorCallback() {

    }

    handleChartClick() {

    }

    render() {
        const { chhartOptions } = this.state,
            { options: { color, id, label }, activeNode } = this.props,
            cardStyle = activeNode === id ? { boxShadow: `0 0 10px 0 ${color}` } : {};

        if (!chhartOptions){
            return <Loader isThumbnail={true}/>
        }

        return (
            <div className={'icard thumbnail clickable'} style={cardStyle} onClick={this.handleChartClick}>
                <div style={{height: 2, backgroundColor: color}}></div>
                <Header isThumbnail='true' options={{
                    header: `Metrics for ${label}`,
                    description: `Some description related to given metrics(${label}) a bit longer like this...`,
                    max: 234,
                    min: 34}}
                    />
                <HighchartsReact
                    ref="chart"
                    highcharts={Highcharts}
                    options={chhartOptions}
                />
          </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        activeNode: state.misc.activeNode
    };
}

function mapDispatchToProps(dispatch) {
    return {
        makeApiCall: (data) => {
            dispatch(makeApiCall(data));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ThumbnailChart);
