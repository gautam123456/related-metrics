import React, { Component } from 'react';

class LogsTable extends Component {
    state = {
        showDetail: false
    }

    render() {
        const { timestamp, content: { header, description, detailedDescription }, type} = this.props.content,
            {showDetail} = this.state,
            date = new Date(timestamp);

        return (
            <div className='logs-row'>
                <div className='col1'>
                    <div>{date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()}</div>
                    <div className='bold'>{date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()}</div>
                </div>
                <div className='col2'>
                    <div className='bold'>{header}</div>
                    <div>{description}</div>
                    {showDetail ? <div>{detailedDescription}</div> : null}
                </div>
                <div className='col3'>
                    <div className={'type ' + type}>{type}</div>
                    <div className='clickable' onClick={this.handleShowDetail}>
                        <i className={'fa fa-lg fa-angle-' + (showDetail ? 'up' : 'right')}></i>
                    </div>
                </div>
            </div>
        )
    }

    handleShowDetail = () => {
        this.setState(state => ({showDetail: !state.showDetail}));
    }
}

export default LogsTable;
