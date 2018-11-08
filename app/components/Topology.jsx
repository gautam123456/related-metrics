import React, { Component } from 'react';
import { connect } from 'react-redux';
import Graph from 'vis-react';
import { URL_FOR_TOPOLOGY, UTL_FOR_TOPOLOGY_2, GET, COLOR_PALETTE } from '../constants'; 
import { makeApiCall, updateNodes, updateActiveNode } from '../actions';

const options = {
  layout: {
    hierarchical: true
  },
  edges: {
    color: '#888',
    dashes: true,
    smooth: {
      enabled: true
    }
  },
  nodes: {
    shadow: {
      enabled: true
    },
    shape: 'circle',
    font: {
      color: '#fff'
    }
  },
  autoResize: true
};

class Topology extends Component {
  componentDidMount() {
    this.getUpdatedTopology();
  }

  componentWillReceiveProps(nextProps) {
    const { filterQuery, activeTimeRange } = this.props,
      { filterQuery: nextFilterQuery, activeTimeRange: nextActiveTimeRange } = nextProps;
    
    if (nextFilterQuery !== filterQuery || activeTimeRange !== nextActiveTimeRange) {
      this.getUpdatedTopology({ filterQuery, activeTimeRange });
    }
  }

  getUpdatedTopology = (options) => {
    this.number = (this.number || 0) + 1;
    this.props.makeApiCall({ url: (this.number % 2 === 0) ? URL_FOR_TOPOLOGY : UTL_FOR_TOPOLOGY_2, method: GET, successCallback: this.successCallback, errorCallback: this.errorCallback })
  }

  successCallback = (data) => {
    data.nodes.map((ele, index) => {
      ele.color = COLOR_PALETTE[index] || COLOR_PALETTE[0];
    });
    this.props.updateNodes({ nodes: data });
  }

  errorCallback = () => {

  }

  handleNodeSelection = ({nodes}) => {
    this.props.updateActiveNode({activeNode: nodes[0]});
  }

  render() {
    const { nodes } = this.props,
      events = {
        select: this.handleNodeSelection
      }

    return nodes ? <Graph graph={nodes} options={options} events={events} /> : null;
  }
}

function mapStateToProps(state) {
  return {
    nodes: state.misc.nodes,
    filterQuery: state.misc.filterQuery,
    activeTimeRange: state.misc.activeTimeRange
  };
}

function mapDispatchToProps(dispatch) {
  return {
    makeApiCall: data => {
      dispatch(makeApiCall(data));
    },
    updateNodes: options => {
      dispatch(updateNodes(options));
    },
    updateActiveNode: options => {
      dispatch(updateActiveNode(options));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Topology);
