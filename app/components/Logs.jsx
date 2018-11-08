import React, { Component } from 'react';
import Filters from './Filter';
import LogsRow from './LogsRow';
import { logs } from '../data/logs';

export default class Logs extends Component {
  state = {
    acendingOrder: true
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    
  }

  render() {
    const { acendingOrder } = this.state;

    return (
      <div className='logs'>
        <div className='logs-container'>
          {/* <div className='tags'>Tags</div> */}
          <div className='log-header'>
            <span className='date-time clickable' onClick={this.handleSortingOrderChange}><span><i className={'fa fa-arrow-' + (acendingOrder ? 'down' : 'up')} style={{ marginRight: 12 }}></i></span>DateTime</span>
            <span><input className='search' type='text' /></span>
          </div>
          <div className='logs-table'>
            {
              logs.map((ele, index) => {
                const { machine, logs } = ele;
                logs.sort((ele1, ele2) => acendingOrder ? ele2.timestamp - ele1.timestamp : ele1.timestamp - ele2.timestamp);

                return (
                  <div key={ele.timestamp + '' + index} className='machine'>
                    <span className={'name machine' + index}>{machine}</span>
                    <div className={'machine' + index}>
                      {logs.map((ele, index) => {
                        const { timestamp } = ele;
                        return <LogsRow key={timestamp + index} content={ele} />
                      })}
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }

  handleSortingOrderChange = () => {
    this.setState(state => ({ acendingOrder: !state.acendingOrder }));
  }
}
