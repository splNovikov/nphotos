import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Segment } from 'semantic-ui-react';

@observer
class LoadingFallback extends Component {
  render() {
    return <Segment className="no-borders fetching-min-height" loading />;
  }
}

export default LoadingFallback;
