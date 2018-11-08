import React, { Component } from 'react';
import AutoSuggest from './AutoSuggest';
import { URL_FOR_FILTER_KEY_OPTIONS, URL_FOR_FILTER_VALUE_OPTIONS, GET, AND } from '../constants';

export default class KeyValueAutoSuggest extends Component {
    constructor(props) {
        super(props);
        const {options: {key = '', value = '', operator = AND}} = props;

        this.state = {
            key,
            value,
            operator
        }
    }
    

    //count = 0

    handleChange = ({term}, data) => {
        const { callbackKeyValueSet } = this.props,
            { key, value, operator } = this.state;

        this.setState({ [term]: data });
        console.log("KeyValueAutoSuggest -> handleChange Called -> ", term, data);

        if(term === 'key'){
            callbackKeyValueSet({ key: data, value, operator});
        }else{
            callbackKeyValueSet({ key, value: data, operator});
        }
    }

    handleDiscard = () => {
        this.props.callbackForDiscard();
    }

    componentWillReceiveProps = (nextProps) => {
        // console.log(++this.count);
        // console.log(nextProps);

        const { options: {value: nextValue, key: nextKey}} = nextProps,
            { value, key } = this.state;


        if (nextValue !== value || nextKey !== key) {
            this.setState({ value: nextValue, key: nextKey }, this.props.callbackKeyValueSet.bind(this, {key: nextKey, value: nextValue}));
        }

    }

    render() {
        const {key, value} = this.state,
            keyOptions = { url: URL_FOR_FILTER_KEY_OPTIONS, method: GET },
            valueOptions = { url: URL_FOR_FILTER_VALUE_OPTIONS, method: GET };;

        return (
            <div className='key-value-auto-suggest'>
                <AutoSuggest key={'key1'} placeholder='key' value={key} options={keyOptions} callbackValueSet={this.handleChange.bind(this, {term: 'key'})} />
                =
                <AutoSuggest key={'key2'} placeholder='value' value={value} options={valueOptions} callbackValueSet={this.handleChange.bind(this, {term: 'key2'})} />
                <i className="fa fa-times clickable" onClick={this.handleDiscard}></i>
            </div>
        )
    }
}
