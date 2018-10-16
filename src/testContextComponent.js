import React, {Component, PureComponent} from 'react';

const {Provider, Consumer} = React.createContext("test");

let mounts = 0;

class DummyLeafComponent extends Component {

  componentDidMount() {
    mounts++;
    console.log("leaf render number" + mounts);
  }

  componentDidUpdate() {
    mounts++;
    console.log("leaf render number" + mounts);
  }

  render() {
    return null
  }
}

export class TestContextComponent extends PureComponent {

  wrapNode = (innerNode, useContext, wrapperCount) => {

    if(useContext) {
      if(wrapperCount === 0) {
        return innerNode;
      }
      return this.wrapNode(<Consumer>{ () => innerNode }</Consumer>, useContext, wrapperCount - 1);
    } else{
      return innerNode;
    }
  }

  render() {

    const renderNestedNodes = () => {

      let nodes = <DummyLeafComponent forceRenderCount={this.props.forceRenderCount}></DummyLeafComponent>;
      const wrapperCount = 4;
      let levelsLeftToBranch = 7;

      for(var level = 0; level < this.props.nestNodeDepth; level++) {
        nodes = this.wrapNode(<div>{nodes}</div>, this.props.useContext, this.props.useContext ? wrapperCount : 0);

        if(levelsLeftToBranch > 0) { // Level with a branching factor of 4
          nodes = <div>
            {nodes}
            {nodes}
            {nodes}
            {nodes}
          </div>
          levelsLeftToBranch--;
        }
      }

      return nodes;
    };

    return (
         this.props.useContext ?
            <Provider value={this.props.nestNodeDepth}>
              {renderNestedNodes()}
            </Provider> :
             renderNestedNodes()
    );
  }
}


