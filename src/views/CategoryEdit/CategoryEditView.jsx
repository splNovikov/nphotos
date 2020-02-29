import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Segment } from 'semantic-ui-react';

import appRoutes from '../../constants/appRoutes';
import ImageEdit from '../../components/ImageEdit';

import './CategoryEditView.scss';

@inject(({ categoriesStore, routingStore }) => ({
  navigate: routingStore.push,
  fetchCategory: categoriesStore.fetchCategory,
  isFetching: categoriesStore.isFetching,
  getCategory: categoriesStore.category,
  updateCategory: categoriesStore.updateCategory,
  createCategory: categoriesStore.createCategory
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
      category: { cover: null, titleRus: '', titleEng: '' }
    };
  }

  // todo [after release]: add album with confirm
  // todo: functionality - add new Album
  // this works, but we should put it in right place:
  // api.addAlbum({
  //   cover: fileList[0],
  //   categoryId: this.categoryId,
  //   titleEng,
  //   titleRus
  // });

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

  createCategory = category => {
    const { createCategory, navigate } = this.props;

    return createCategory(category).then(() => navigate(appRoutes.categories));
  };

  // todo [after release]: when new image selected - the old one should be deleted from s3
  updateCategory = category => {
    const { updateCategory } = this.props;

    return updateCategory(this.categoryId, category);
  };

  render() {
    const { isFetching } = this.props;
    const { category } = this.state;

    return (
      <Segment className="category-edit-view no-borders fetching-min-height">
        <ImageEdit
          isCreate={!this.categoryId}
          titleRus={category.titleRus}
          titleEng={category.titleEng}
          cover={category.cover}
          isFetching={isFetching}
          create={this.createCategory}
          update={this.updateCategory}
          updateRelativeState={this.updateCategoryState}
        />
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
  isFetching: PropTypes.bool.isRequired,
  getCategory: PropTypes.func.isRequired,
  updateCategory: PropTypes.func.isRequired,
  createCategory: PropTypes.func.isRequired
};

export default CategoryEditView;
