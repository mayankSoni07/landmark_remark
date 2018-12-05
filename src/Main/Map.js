import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { testAction } from '../redux/actions';
// import './Map.css';

class Map extends Component {
  
  componentDidMount() {
    this.props.testAction({ test: "hello" });
  }

  render() {
    console.log('test reducer : ', this.props.test)
    return (
      <div className="Map">
          <p>
           Map Component
          </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    test: state.testReducer.test
  }
}

const mapDispatchToProps = (dispatch, getState) => bindActionCreators({
  testAction
}, dispatch);

Map = connect(mapStateToProps, mapDispatchToProps)(Map)
export default Map;
