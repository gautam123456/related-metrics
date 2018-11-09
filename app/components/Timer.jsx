import React, { Component } from 'react';
import ProgressBar from './ProgressBar';

export default class Timer extends Component {
    state = {
        triggerTime: this.props.triggerTime
    }

    componentDidMount() {
        const { callbackAfterTrigger } = this.props;

        this.interval = setInterval(() => {
            this.setState(state => ({ triggerTime: state.triggerTime - 1 }));
            if (this.state.triggerTime === 0){
                clearInterval(this.interval);
                callbackAfterTrigger({ makeCall: true });
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handleCancel = () => {
        clearInterval(this.interval);
        this.props.callbackAfterTrigger({ makeCall: false });
    }


    render() {
        const { title, triggerTime: totalTime } = this.props,
            { triggerTime } = this.state,
            completed = (((totalTime - triggerTime + 1)/totalTime) * 100)

        return (
            <div className='timer'>
                <ProgressBar completed={completed} />
                <div className='content'>
                {`${title} in ${triggerTime} Seconds`}
                <button name='' style={{marginLeft: 50}} onClick={this.handleCancel}>Cancel</button>
                </div>
            </div>
        )
    }
}
