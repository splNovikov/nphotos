import React, { Component } from 'react';
import { observer } from 'mobx-react';

import Albums from '../../components/Albums';

@observer
class AlbumsView extends Component {
  render() {
    return (
      <div className="albums">
        <Albums />
      </div>
    );
  }
}

export default AlbumsView;
