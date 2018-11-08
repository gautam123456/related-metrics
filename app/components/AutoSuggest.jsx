import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeApiCall } from '../actions';

class AutoSuggest extends Component {
    state = {
        value: this.props.value || '',
        showOptions: this.props.showOptions || false,
        options: []
    }

    handleChangeEvent = ({target: {value}}) => {
        const isValueLongEnough = value && value.length > 3;

        this.setState({ value, showOptions: isValueLongEnough});
        if(isValueLongEnough){
            this.updateOptions(value);
        }
        this.afterValueSet(value);
    }

    optionSelected = (value) => {
        this.setState({value, showOptions: false});
        this.afterValueSet(value);
    }

    afterValueSet = (value) => {
        const { callbackValueSet } = this.props;
        if (callbackValueSet){
            callbackValueSet(value);
        }
    }

    handleBlur = ({ target: { value } }) => {
        this.setState({ value, showOptions: (value && value.length > 3) });
        this.afterValueSet(value);
        this.timeout = setTimeout(() => {
            this.setState({ showOptions: false });
        }, 200)
    }

    successCallback = (options) => {
        this.setState({options});
    }

    errorCallback = () => {
        //TODO Will handle later..
    }

    componentDidMount() {
        this.updateOptions('');
    }

    updateOptions = (payloadString) => {
        const { options: { url, method }, makeApiCall } = this.props;
        makeApiCall({ url, method, payload: { str: payloadString }, successCallback: this.successCallback, errorCallback: this.errorCallback });
    }

    componentWillReceiveProps = (nextProps) => {
        const { value: nextValue } = nextProps,
            { value } = this.state;

            if(nextValue && nextValue !== value){
                this.setState({value: nextValue}, this.afterValueSet.bind(this, nextValue));
            }
    }

    render() {
        const { showOptions, options, value } = this.state,
            { placeholder } = this.props;

        return (
            <div className='auto-suggestion'>
                <input className='auto-suggest' type='text' onChange={this.handleChangeEvent} value={value} onBlur={this.handleBlur} placeholder={placeholder} style={{width: `${(50 + value.length * 5)}px`}}/>
                {showOptions ? <div className='suggestion-options'>
                    {options.map(ele => {
                        return <div key={ele} onClick={this.optionSelected.bind(this, ele)} className='option'>{ele}</div>
                    })}
                </div>: null}
            </div>
        )
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }
}

function mapDispatchToProps(dispatch) {
    return {
        makeApiCall: (data) => {
            dispatch(makeApiCall(data));
        }
    };
}

export default connect(null, mapDispatchToProps)(AutoSuggest);
