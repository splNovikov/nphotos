import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment } from 'semantic-ui-react';
import { observer, inject } from 'mobx-react';

import SanitizeHTML from '../../components/SanitizeHTML';

import './AboutView.scss';

@inject(({ aboutStore }) => ({
  fetchAbout: aboutStore.fetchAbout,
  isFetching: aboutStore.isFetching,
  about: aboutStore.about
}))
@observer
class AboutView extends Component {
  static propTypes = {
    about: PropTypes.arrayOf(
      PropTypes.shape({
        index: PropTypes.string,
        row: PropTypes.string
      })
    ),
    fetchAbout: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired
  };

  static defaultProps = {
    about: []
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
          {about.map(a => (
            <Grid.Column key={a.index} width={8} className="about-column">
              <SanitizeHTML html={a.row} />
            </Grid.Column>
          ))}
        </Grid>
      </Segment>
    );
  }
}

export default AboutView;
