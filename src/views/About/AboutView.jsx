import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment } from 'semantic-ui-react';
import { observer, inject } from 'mobx-react';

import SanitizeHTML from '../../components/SanitizeHTML';

@inject(({ aboutStore }) => ({
  fetchAbout: aboutStore.fetchAbout,
  isFetching: aboutStore.isFetching,
  about: aboutStore.about
}))
@observer
class AboutView extends Component {
  static propTypes = {
    about: PropTypes.string,
    fetchAbout: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired
  };

  static defaultProps = {
    about: ''
  };

  componentDidMount() {
    const { fetchAbout, about } = this.props;

    if (!about.length) {
      fetchAbout();
    }
  }

  render() {
    const { isFetching, about } = this.props;

    return (
      <Segment
        className="about-view no-borders fetching-min-height"
        loading={isFetching}
      >
        <Grid container stackable>
          <Grid.Column width={8}>
            <SanitizeHTML html={about} />
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

export default AboutView;
