import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Header, Segment } from 'semantic-ui-react';

import appRoutes from '../../constants/appRoutes';
import ImageEdit from '../../components/ImageEdit';

import './CategoryEditView.scss';

@inject(({ albumsStore, categoriesStore, routingStore }) => ({
  navigate: routingStore.push,
  fetchCategory: categoriesStore.fetchCategory,
  isCategoryFetching: categoriesStore.isFetching,
  getCategory: categoriesStore.category,
  updateCategory: categoriesStore.updateCategory,
  createCategory: categoriesStore.createCategory,
  isAlbumFetching: albumsStore.isFetching,
  createAlbum: albumsStore.createAlbum
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
      category: { cover: null, titleRus: '', titleEng: '' },
      newAlbum: { cover: null, titleRus: '', titleEng: '' }
    };
  }

  componentDidMount() {
    if (!this.categoryId) {
      return;
    }

    const { fetchCategory, getCategory } = this.props;

    fetchCategory(this.categoryId).then(() => {
      const category = getCategory(this.categoryId);

      if (!category) {
        return;
      }

      this.updateCategoryState(category);
    });
  }

  updateCategoryState = category =>
    this.setState(state => ({
      category: {
        ...state.category,
        ...category
      }
    }));

  updateAlbumState = album =>
    this.setState(state => ({
      newAlbum: {
        ...state.newAlbum,
        ...album
      }
    }));

  createCategory = category => {
    const { createCategory, navigate } = this.props;

    return createCategory(category).then(() => navigate(appRoutes.categories));
  };

  // todo [after release]: add album with confirm
  createAlbum = album => {
    const { createAlbum } = this.props;

    return createAlbum({ ...album, categoryId: this.categoryId }).then(() => {
      // todo: clear state
    });
  };

  // todo [after release]: when new image selected - the old one should be deleted from s3
  updateCategory = category => {
    const { updateCategory } = this.props;

    return updateCategory(this.categoryId, category);
  };

  // todo [after release]: when new image selected - the old one should be deleted from s3
  updateAlbum = album => {
    // const { updateAlbum } = this.props;
    // return updateAlbum(ID, updateAlbum);
  };

  // todo: show albums for edit and check that after create and update - store is updating
  render() {
    const { isCategoryFetching, isAlbumFetching } = this.props;
    const { category, newAlbum } = this.state;

    return (
      <Segment className="category-edit-view no-borders fetching-min-height">
        <Segment>
          <Header>
            {this.categoryId ? 'Edit' : 'Add'}
            Category
          </Header>
          <ImageEdit
            isCreate={!this.categoryId}
            titleRus={category.titleRus}
            titleEng={category.titleEng}
            cover={category.cover}
            isFetching={isCategoryFetching}
            create={this.createCategory}
            update={this.updateCategory}
            updateRelativeState={this.updateCategoryState}
          />
        </Segment>
        {this.categoryId ? (
          <Segment>
            <Header>Add Album</Header>
            <ImageEdit
              isCreate
              titleRus={newAlbum.titleRus}
              titleEng={newAlbum.titleEng}
              cover={newAlbum.cover}
              isFetching={isAlbumFetching}
              create={this.createAlbum}
              update={this.updateAlbum}
              updateRelativeState={this.updateAlbumState}
            />
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
  navigate: PropTypes.func.isRequired,
  fetchCategory: PropTypes.func.isRequired,
  isCategoryFetching: PropTypes.bool.isRequired,
  getCategory: PropTypes.func.isRequired,
  updateCategory: PropTypes.func.isRequired,
  createCategory: PropTypes.func.isRequired,
  isAlbumFetching: PropTypes.bool.isRequired,
  createAlbum: PropTypes.func.isRequired
};

export default CategoryEditView;
