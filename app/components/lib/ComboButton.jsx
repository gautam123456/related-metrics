import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateActiveTimeRange } from '../../actions';

class ComboButton extends Component {
  handleButtonClick = (id) => {
    this.props.updateActiveTimeRange({activeTimeRange: id});
  }

  render() {
    const { options, activeTimeRange } = this.props;
    
    if (!options){
      return null;
    }

    return (
      <span className='combo-button'>
        {options.map(({ id, label }) => <div key={id} className={'button clickable' + (activeTimeRange === id ? ' active' : '')} onClick={this.handleButtonClick.bind(this, id)}>{label}</div>)}
      </span>
    )
  }
}

function mapStateToProps(state) {
  return {
    activeTimeRange: state.misc.activeTimeRange
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateActiveTimeRange: options => {
      dispatch(updateActiveTimeRange(options));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ComboButton);
