import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment } from 'semantic-ui-react';
import { observer, inject } from 'mobx-react';

import SanitizeHTML from '../../components/SanitizeHTML';

import './AboutView.scss';

@inject(({ aboutStore }) => ({
  fetchAbout: aboutStore.fetchAbout,
  about: aboutStore.about
}))
@observer
class AboutView extends Component {
  componentDidMount() {
    const { fetchAbout, about } = this.props;

    if (!about.length) {
      fetchAbout();
    }
  }

  render() {
    const { about } = this.props;

    return (
      <Segment className="about-view no-borders fetching-min-height">
        <Grid container stackable columns={3}>
          <Grid.Column width={3} />
          <Grid.Column width={10}>
            {about.map(a =>
              a.row ? (
                <Grid.Row key={a.index} className="about-column">
                  <SanitizeHTML html={a.row} />
                </Grid.Row>
              ) : null
            )}
          </Grid.Column>
          <Grid.Column width={3} />
        </Grid>
      </Segment>
    );
  }
}

AboutView.wrappedComponent.propTypes = {
  about: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.string,
      row: PropTypes.string
    })
  ),
  fetchAbout: PropTypes.func.isRequired
};

AboutView.wrappedComponent.defaultProps = {
  about: []
};

export default AboutView;
