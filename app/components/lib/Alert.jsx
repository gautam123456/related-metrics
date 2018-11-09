import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateNotificationOptions } from '../../actions';

class Alert extends Component {
  state = {
    triggerTime: 10
  }

  handleCancelClick = () => {
    clearInterval(this.interval);
    this.props.updateNotificationOptions({ show: false });
  }

  componentDidMount() {
    //if(this.props.notificationOptions.show){
      this.initiateTransition();
    //}
  }

  // componentWillReceiveProps(nextProps) {
  //   const {} = nextProps;
  //   if(nextProps.notificationOptions !== this.props.notificationOptions){
  //     this.initiateTransition();
  //   }
  // }

  initiateTransition() {
    const { callbackAfterTrigger, updateNotificationOptions } = this.props;

    this.interval = setInterval(() => {
      this.setState(({ triggerTime }) => ({ triggerTime: triggerTime - 1 }));
      if (this.state.triggerTime === 0) {
        clearInterval(this.interval);
        updateNotificationOptions({ show: false });
        callbackAfterTrigger();
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { title } = this.props,
      { triggerTime } = this.state,
      percentage = (triggerTime)/10 * 100;

    return (
      <div className={'alert-popup icard'}>
        <div className='bar' style={{ width: `${100 - percentage}%` }}></div>
        <div className='alert'>
          {title.replace('{0}', triggerTime)}
          <button onClick={this.handleCancelClick}>Cancel</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    title: state.misc.notificationOptions.title
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateNotificationOptions: options => {
      dispatch(updateNotificationOptions(options));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
