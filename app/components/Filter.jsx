import React, { Component } from 'react';
import { connect } from 'react-redux';
import AutoSuggest from './AutoSuggest';
import KeyValueAutoSuggest from './KeyValueAutoSuggest';
import { getQuery } from '../utility/utility';
import { toggleFilter, updateFilterQuery } from '../actions';
import { URL_FOR_METRICS_OPTIONS, GET, OPERATORS, COLOR_PALETTE } from '../constants';

class Filter extends Component {
    state = {
        metrics: 'metrics3',
        filters: [],
        showTransition: false
    }

    handleValueSet = (value) => {
        this.setState({metrics: value});
    }

    handleKeyValueChange = (index, data) => {
        //console.log("Filter -> handleKeyValueChange Called -> ", index, data);
        //const { filters } = this.state;
        //filters[index] = data;
        this.setState(({filters}) => {
            filters[index] = data;
            return {filters};
        });
        //this.setState({filters});
    }

    handleDiscard = (index) => {
        const { filters } = this.state;
        filters.splice(index, 1);
        this.setState({ filters });
    }

    addFilter = () => {
        const { filters } = this.state;
        filters.push({key: '', value: '', operator: 'and'});
        this.setState({filters});
    }

    handleApplyClick = () => {
        const { metrics, filters } = this.state;
        this.props.toggleFilter({showFilter: false});
        this.props.updateFilterQuery({ filterQuery: getQuery(metrics, filters)});
    }

    handleCancelClick = () => {
        this.props.toggleFilter({ showFilter: false });
        // Do nothing...
    }

    operatorChange = (index, { currentTarget: { value } }) => {
        this.setState(({ filters }) => {
            filters[index].operator = value;
            return { filters };
        });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.showFilter !== this.props.showFilter){
            this.setState({showTransition: true});
            this.timeout = setTimeout(() => {
                this.setState({showTransition: false, showFilter: false});
            }, 300);
        }
    }

    render() {
        const { metrics, filters} = this.state,
            { showFilter } = this.props,
            metricsOptions = {url: URL_FOR_METRICS_OPTIONS, method: GET};

        if (!showFilter){
            return null;
        }    

        return (
            <div className={'filter' + (showFilter ? ' visible' : '')}>
                <div style={{ height: 2, backgroundColor: COLOR_PALETTE[0] }}></div>
                <div className='filter-body'>
                    <div className='filter-section'>
                        <span className='fade'>Metrics:</span> 
                        <AutoSuggest callbackValueSet={this.handleValueSet} value={metrics} options={metricsOptions}/>
                        <span className='fade'>Filters</span>
                        {filters.map((ele, index) => {
                            return (
                                <div key={index}>
                                    <KeyValueAutoSuggest index={index} key={ele.value + index} options={ele} callbackKeyValueSet={this.handleKeyValueChange.bind(this, index)} callbackForDiscard={this.handleDiscard.bind(this, index)}/>
                                    <select onChange={this.operatorChange.bind(this, index)}>
                                        {OPERATORS.map(ele => <option key={ele} value={ele}>{ele}</option>)}
                                    </select>
                                </div>
                                )
                        })}
                        <i className="fa fa-filter clickable fil" onClick={this.addFilter}></i>
                    </div>
                    <div className='query'>
                        <span className='fade'>Query:</span>{getQuery(metrics, filters)}
                    </div>
                    <div className='action'>
                        <button onClick={this.handleApplyClick}>Apply</button>
                        <button onClick={this.handleCancelClick}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        showFilter: state.misc.showFilter
    };
}

function mapDispatchToProps(dispatch) {
    return {
        toggleFilter: (options) => {
            dispatch(toggleFilter(options));
        },
        updateFilterQuery: (options) => {
            dispatch(updateFilterQuery(options));
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Filter);