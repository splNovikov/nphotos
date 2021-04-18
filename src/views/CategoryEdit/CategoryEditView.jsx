import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Confirm, Grid, Header, Segment } from 'semantic-ui-react';

import EditCard from './components/EditCard';
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
  updateAlbum: albumsStore.updateAlbum,
  deleteAlbum: albumsStore.deleteAlbum
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
      }),
      isRemoveModalOpened: false,
      removeModalEntity: null
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

  createCategory = categoryModel => {
    const { createCategory } = this.props;

    return createCategory(categoryModel).then(this.createCategoryCallback);
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
  updateCategory = categoryModel => {
    const { updateCategory } = this.props;

    return updateCategory(categoryModel);
  };

  // todo [after release]: when new image selected - the old one should be deleted from s3
  updateAlbum = albumModel => {
    const { updateAlbum } = this.props;

    return updateAlbum(albumModel);
  };

  handleRemove = entity => {
    this.setState({
      isRemoveModalOpened: true,
      removeModalEntity: entity
    });
  };

  removeEntity = () => {
    const { deleteAlbum } = this.props;
    const { removeModalEntity } = this.state;

    if (deleteAlbum && removeModalEntity) {
      deleteAlbum(removeModalEntity, this.categoryId);
    }

    this.closeRemoveModal();
  };

  closeRemoveModal = () => {
    this.setState({
      isRemoveModalOpened: false,
      removeModalEntity: null
    });
  };

  render() {
    const { isCategoryFetching, isAlbumFetching, getCategory } = this.props;
    const { newAlbum, newCategory, isRemoveModalOpened } = this.state;
    const category = getCategory(this.categoryId) || newCategory;

    return (
      <Segment
        className="category-edit-view no-borders fetching-min-height"
        loading={isCategoryFetching || isAlbumFetching}
      >
        <Confirm
          open={isRemoveModalOpened}
          onCancel={this.closeRemoveModal}
          onConfirm={this.removeEntity}
          size="mini"
        />
        <Grid container className="main-category-administration-panel">
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <EditCard
              fluid
              header={this.categoryId ? 'Edit Category' : 'Add Category'}
              model={category}
              isCreate={!this.categoryId}
              isFetching={false}
              create={this.createCategory}
              update={this.updateCategory}
              updateModel={this.updateModel}
            />
          </Grid.Column>
          {this.categoryId ? (
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <EditCard
                fluid
                header="Add Album"
                model={newAlbum}
                isCreate
                isFetching={false}
                create={this.createAlbum}
                updateModel={this.updateModel}
              />
            </Grid.Column>
          ) : null}
        </Grid>

        {category && category.albums && category.albums.length ? (
          <Segment>
            <Header as="h2">Edit Albums</Header>
            <Grid container>
              {category.albums.map(a => (
                <Grid.Column key={a.id} mobile={16} tablet={8} computer={4}>
                  <EditCard
                    header={a.title}
                    model={a}
                    isCreate={false}
                    isFetching={false}
                    update={this.updateAlbum}
                    updateModel={this.updateModel}
                    remove={this.handleRemove}
                  />
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
  updateAlbum: PropTypes.func.isRequired,
  deleteAlbum: PropTypes.func.isRequired
};

export default CategoryEditView;
