import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Loader from './Loader';
import Highcharts from 'highcharts/highcharts';
import HighchartsReact from 'highcharts-react-official';
import { makeApiCall, updateActiveTimeRange } from '../actions';
import { getDefaultHighchartsOptions } from '../data/highchartOptions';
import { GET, URL_FOR_MAIN_CHART_DATA, COLOR_PALETTE } from '../constants';
import ComboButton from './lib/ComboButton';

class MainChart extends Component {
    state = {
        options: null,
        showLoader: false,
        timeRange: null,
        buttonOptions: [{ id: '1H', label: '1H' }, { id: '2H', label: '2H' }, { id: '3H', label: '3H' }, { id: '1D', label: '1D' }]
    }

    componentDidMount() {
        this.getUpdatedChart(this.props.filterQuery, '1D');
    }

    getUpdatedChart = (filterQuery, timeFrame) => {
        this.setState({ showLoader: true });
        this.props.makeApiCall({ url: URL_FOR_MAIN_CHART_DATA, method: GET, successCallback: this.successCallback, errorCallback: this.errorCallback })
    }

    successCallback = (data) => {
        this.setState({ showLoader: false, options: getDefaultHighchartsOptions({ data, color: COLOR_PALETTE[0], onRangeSelect: this.handleZoomRangeSelection}) });
    }

    errorCallback() {

    }

    handleZoomRangeSelection = (xMin, xMax) => {
        this.props.updateActiveTimeRange({activeTimeRange: [xMin, xMax]});
    }

    componentWillReceiveProps(nextProps) {
        const { filterQuery, activeTimeRange } = this.props,
            { filterQuery: nextFilterQuery, activeTimeRange: nextActiveTimeRange } = nextProps;
        if (nextFilterQuery !== filterQuery || activeTimeRange !== nextActiveTimeRange){
            this.getUpdatedChart({ filterQuery, activeTimeRange});
        }
    }

    // handleButtonClick = (id) => {
    //     const { buttonOptions } = this.state;
    //     buttonOptions.map(ele => {
    //         ele.active = ele.id === id;
    //     });
    //     this.setState({buttonOptions});
    //     this.getUpdatedChart(this.props.filterQuery, id);
    // }

    render() {
        const { options, showLoader, buttonOptions } = this.state,
            { activeNode, activeTimeRange } = this.props;

        if (showLoader || !options){
            return <Loader />
        }

        return (
            <div className={'main-chart' + (activeNode === 1 ? ' active' : '')}>
                <div style={{ height: 2, backgroundColor: COLOR_PALETTE[0] }}></div>
                <Header />
                <div>
                    <ComboButton options={buttonOptions} />
                    <span className='time-range'>{Array.isArray(activeTimeRange) ? `Time Range Selected : ${new Date(activeTimeRange[0]).toUTCString()} - ${new Date(activeTimeRange[1]).toUTCString()}` : null}</span>
                </div>
                <HighchartsReact
                    ref="chart"
                    highcharts={Highcharts}
                    options={options}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        filterQuery: state.misc.filterQuery,
        activeNode: state.misc.activeNode,
        activeTimeRange: state.misc.activeTimeRange
    };
}

function mapDispatchToProps(dispatch) {
    return {
        makeApiCall: data => {
            dispatch(makeApiCall(data));
        },
        updateActiveTimeRange: options => {
            dispatch(updateActiveTimeRange(options));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainChart);
