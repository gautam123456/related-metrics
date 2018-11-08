import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleOverlay } from '../actions';

class Overlay extends Component {
  handleClick = () => {
    this.props.toggleOverlay({showOverlay: false});
  }
  
  render() {
    const { showOverlay } = this.props;

    if(!showOverlay){
      return null;
    }

    return (
      <div className='overlay' onClick={this.handleClick}>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    showOverlay: state.misc.showOverlay
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleOverlay: (options) => {
      dispatch(toggleOverlay(options));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);


