import React, { Component } from 'react';
const FILTERS = ['F', 'I', 'L', 'T', 'E', 'R', 'S'];

export default class LogsFilter extends Component {
  state = {
    expanded: false,
    hidden: true
  }

  toggleFilter = () => {
    if (!this.state.expanded) {
      this.setState(state => ({ expanded: !state.expanded }));
      setTimeout(() => {
        this.setState(state => ({ hidden: !state.hidden }));
      }, 300);
    } else {
      this.setState(state => ({ expanded: !state.expanded, hidden: !state.hidden }));
    }
  }

  render() {
    const { expanded, hidden } = this.state;

    return (
      <div className={'logs-filter ' + expanded}>
        <div className='head'>
          <div className='filter-text'>
            {!hidden ? <div><i className="fa fa-filter"></i></div> : null}
            <div className="spans">
              {FILTERS.map(ele => {
                return <span key={ele}>{ele}</span>;
              })}
            </div>
          </div>
          <div onClick={this.toggleFilter} className='clickable'><i className={'fa fa-lg fa-angle-double-' + (hidden ? 'right' : 'left')}></i></div>
        </div>
        <div>

        </div>
      </div>
    )
  }
}
