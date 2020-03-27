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
        <Grid container stackable>
          {about.map(a =>
            a.row ? (
              <Grid.Column key={a.index} width={8} className="about-column">
                <SanitizeHTML html={a.row} />
              </Grid.Column>
            ) : null
          )}
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
