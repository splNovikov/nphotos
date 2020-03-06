import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Card, Grid, Header, Segment } from 'semantic-ui-react';

import ImageEdit from '../../components/ImageEdit';
import AlbumModel from '../../models/AlbumModel';
import CategoryModel from '../../models/CategoryModel';

import './CategoryEditView.scss';

@inject(({ albumsStore, categoriesStore }) => ({
  fetchCategory: categoriesStore.fetchCategory,
  isCategoryFetching: categoriesStore.isFetching,
  getCategory: categoriesStore.category,
  updateCategory: categoriesStore.updateCategory,
  createCategory: categoriesStore.createCategory,
  isAlbumFetching: albumsStore.isFetching,
  createAlbum: albumsStore.createAlbum,
  updateAlbum: albumsStore.updateAlbum
}))
@observer
class CategoryEditView extends Component {
  categoryId;

  constructor(props) {
    super(props);

    const {
      match: {
        params: { id }
      }
    } = this.props;

    this.categoryId = id === 'add' ? null : id;

    this.state = {
      newCategory: new CategoryModel(this, {
        cover: null,
        titleRus: '',
        titleEng: ''
      }),
      newAlbum: new AlbumModel(this, {
        cover: null,
        titleRus: '',
        titleEng: ''
      })
    };
  }

  componentDidMount() {
    if (!this.categoryId) {
      return;
    }

    this.fetchCategory();
  }

  fetchCategory = () => {
    const { fetchCategory } = this.props;

    fetchCategory(this.categoryId);
  };

  updateModel = (model, { prop, value }) => {
    model.update({ prop, value });
  };

  createCategory = category => {
    const { createCategory } = this.props;

    return createCategory(category).then(this.createCategoryCallback);
  };

  createCategoryCallback = created => {
    this.categoryId = created.id;

    this.fetchCategory();
  };

  // todo [after release]: add album with confirm
  createAlbum = albumModel => {
    const { createAlbum } = this.props;

    return createAlbum({ ...albumModel, categoryId: this.categoryId }).then(
      this.createAlbumCallback
    );
  };

  createAlbumCallback = () => {
    this.fetchCategory();

    // reset state:
    this.setState({
      newAlbum: new AlbumModel(this, {
        cover: null,
        titleRus: '',
        titleEng: ''
      })
    });
  };

  // todo [after release]: when new image selected - the old one should be deleted from s3
  updateCategory = category => {
    const { updateCategory } = this.props;

    return updateCategory(category);
  };

  // todo [after release]: when new image selected - the old one should be deleted from s3
  updateAlbum = album => {
    const { updateAlbum } = this.props;

    return updateAlbum(album);
  };

  // todo: show albums for edit and check that after create and update - store is updating
  render() {
    const { isCategoryFetching, isAlbumFetching, getCategory } = this.props;
    const { newAlbum, newCategory } = this.state;
    // todo: newCategory should be new CategoryModel
    const category = getCategory(this.categoryId) || newCategory;

    return (
      <Segment className="category-edit-view no-borders fetching-min-height">
        <Grid
          container
          columns={4}
          className="main-category-administration-panel"
        >
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <Card fluid>
              <Card.Content>
                <Card.Header>
                  {this.categoryId ? 'Edit ' : 'Add '}
                  Category
                </Card.Header>
                <ImageEdit
                  model={category}
                  isCreate={!this.categoryId}
                  isFetching={isCategoryFetching}
                  create={this.createCategory}
                  update={this.updateCategory}
                  updateModelState={this.updateModel}
                />
              </Card.Content>
            </Card>
          </Grid.Column>
          {this.categoryId ? (
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <Card fluid>
                <Card.Content>
                  <Card.Header>Add Album</Card.Header>
                  <ImageEdit
                    model={newAlbum}
                    isCreate
                    isFetching={isAlbumFetching}
                    create={this.createAlbum}
                    updateModelState={this.updateModel}
                  />
                </Card.Content>
              </Card>
            </Grid.Column>
          ) : null}
        </Grid>

        {category && category.albums && category.albums.length ? (
          <Segment loading={isCategoryFetching}>
            <Header as="h2">Edit Albums</Header>
            <Grid container columns={4}>
              {category.albums.map(a => (
                <Grid.Column key={a.id} mobile={16} tablet={8} computer={4}>
                  <Card>
                    <Card.Content>
                      <Card.Header>{a.title}</Card.Header>
                      <ImageEdit
                        model={a}
                        isCreate={false}
                        isFetching={false}
                        update={this.updateAlbum}
                        updateModelState={this.updateModel}
                      />
                    </Card.Content>
                  </Card>
                </Grid.Column>
              ))}
            </Grid>
          </Segment>
        ) : null}
      </Segment>
    );
  }
}

CategoryEditView.wrappedComponent.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired,
  fetchCategory: PropTypes.func.isRequired,
  isCategoryFetching: PropTypes.bool.isRequired,
  getCategory: PropTypes.func.isRequired,
  updateCategory: PropTypes.func.isRequired,
  createCategory: PropTypes.func.isRequired,
  isAlbumFetching: PropTypes.bool.isRequired,
  createAlbum: PropTypes.func.isRequired,
  updateAlbum: PropTypes.func.isRequired
};

export default CategoryEditView;
