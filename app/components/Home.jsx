import React, { Component } from 'react';
import { connect } from 'react-redux';
import Topology from './Topology';
import Header from './Header';
import Logs from './Logs';
import Timer from './Timer';
import MainChart from './MainChart';
import Filter from './Filter';
import ThumbnailChart from './ThumbnailChart';
import Overlay from './Overlay';
import { toggleFilter } from '../actions';
import Alert from './lib/Alert';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      showTimer: false,
      showRelatedMetrics: true
    }
  }

  componentDidMount() {
   // console.log("Refs of chart...");
  }

  handleValueSet = (value) => {
    //console.log(value);
  }

  callbackAfterTrigger = ({ makeCall }) => {
    this.setState({ showTimer: false });
    if (makeCall) {
      this.setState({ showRelatedMetrics: true });
    }
  }

  handleKeyValueChange = (data) => {
    //console.log(data);
  }

  showFilter = () => {
    this.props.toggleFilter({showFilter: true});
  }

  componentWillReceiveProps(nextProps) {
    let {nodes} = this.props,
      { nodes: nextNodes } = nextProps;
    if(nodes && nextNodes){
      nodes = nodes.nodes;
      nextNodes = nextNodes.nodes;
      
      if (nodes.length !== nextNodes.length) {
        this.setState({ showRelatedMetrics: false });
        setTimeout(() => {
          this.setState({ showRelatedMetrics: true });
        }, 300);
      }
    }
  }

  callbackAfterTrigger = () => {

  }

  render() {
    const { showTimer, showRelatedMetrics } = this.state,
      { nodes, showNotification } = this.props;

    return (
      <div className='main-container'>
        <Overlay />
        {showTimer ? <Timer title={'Fetching related metrics'} triggerTime={10} callbackAfterTrigger={this.callbackAfterTrigger}/> : null}
        <Filter />
        <div className='icard heading'>
            <div>Related Metrics</div><button onClick={this.showFilter}>Filters</button>
        </div>
        <div style={{display: 'flex'}}>
          <div className='main-chart-container well icard'>
            <MainChart />
          </div>
          <div className='topology-conatiner well icard'>
            <div style={{display: 'flex'}}>
              {nodes ? nodes.nodes.map(ele => <div key={ele.id} style={{height: 2, flex: 1, backgroundColor: ele.color}}/>): null}
            </div>
            <Header />
            <Topology />
          </div>
        </div>
        {showRelatedMetrics && nodes ? <div className={'thumbnail-container'}>
          {nodes.nodes.map((ele, index) => index !== 0 ? <ThumbnailChart key={ele.id} options={ele}/> : null)}
        </div> : null}
        <div className='logs-container'>
          <Logs />
        </div>
        {showNotification ? <Alert callbackAfterTrigger={this.callbackAfterTrigger}/> : null}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    showFilter: state.misc.showFilter,
    nodes: state.misc.nodes,
    showNotification: state.misc.notificationOptions.show
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleFilter: (options) => {
      dispatch(toggleFilter(options));
    }
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(Home);
