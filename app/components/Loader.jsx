import React, { Component } from 'react';

export default class Loader extends Component {
    render() {
        const { isThumbnail } = this.props;

        return (
            <div className={'loading ' + (isThumbnail ? 'icard thumbnail' : '')}>
                <div className='head'>
                    <div>
                        <div className='animated-background' style={{height: 14, width: 130}}></div>
                        <div className='animated-background' style={{height: 10, width: 230}}></div>
                    </div>
                    <div>
                        <div className='animated-background' style={{height: 25, width: 80}}></div>
                        <div className='animated-background' style={{height: 16, width: 50}}></div>
                    </div>
                </div>
                <div className='loader'>
                    <div className='animated-background'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 600" className="polylion">
                            <polyline points="0,0 0,215 100,150 120,180 250,120 300,130, 450,70, 550,120, 650,20 800,0" style={{fill: '#fff'}} strokeWidth={10}/>
                        </svg>
                    </div>
                </div>
            </div>
        )
    }
}
