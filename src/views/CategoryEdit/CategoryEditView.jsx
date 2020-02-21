import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Button, Form, Input, Segment } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';

import ChooseFiles from '../../components/ChooseFiles';

import './CategoryEditView.scss';

const acceptedFileTypes = process.env.UPLOAD_ACCEPTED_IMAGE_TYPES;

@inject(({ categoriesStore }) => ({
  fetchCategory: categoriesStore.fetchCategory,
  isFetching: categoriesStore.isFetching,
  getCategory: categoriesStore.category,
  updateCategory: categoriesStore.updateCategory
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

    this.categoryId = id;

    this.state = {
      cover: null,
      titleRus: '',
      titleEng: ''
    };
  }

  componentDidMount() {
    // todo: functionality - add new category
    // todo: functionality - add new Album
    // this works, but we should put it in right place:
    // api.addAlbum({
    //   cover: fileList[0],
    //   categoryId: this.categoryId,
    //   titleEng,
    //   titleRus
    // });

    const { fetchCategory, getCategory } = this.props;

    fetchCategory(this.categoryId).then(() => {
      const category = getCategory(this.categoryId);

      if (!category) {
        return;
      }

      this.setState({
        titleRus: category.titleRus,
        titleEng: category.titleEng,
        cover: category.cover
      });
    });
  }

  handleImageSelected = ([image]) => this.setState({ cover: image });

  // todo [after release]: should be confirmed?
  handleFormSubmit = () => {
    if (!this.categoryId) {
      return this.createCategory();
    }

    const { cover, titleRus, titleEng } = this.state;
    return this.updateCategory(this.categoryId, { cover, titleRus, titleEng });
  };

  updateCategory = (categoryId, category) => {
    const { updateCategory } = this.props;

    // todo: здесь останвился - нужен бекенд
    return updateCategory(categoryId, category);
  };

  // todo: implement creation
  createCategory = () => {};

  handleInputChange = (e, { name, value }) => this.setState({ [name]: value });

  isSaveValid = (cover, titleRus, titleEng) => !(cover && titleRus && titleEng);

  // todo [after release]: add album with confirm
  // todo [after release]: Image selected to intl
  // todo [rerender optimization]: add album with confirm
  render() {
    const { cover, titleRus, titleEng } = this.state;
    const {
      intl: { formatMessage },
      isFetching
    } = this.props;

    return (
      <Segment
        className="category-edit-view no-borders fetching-min-height"
        loading={isFetching}
      >
        <Segment>
          <ChooseFiles
            onSelect={this.handleImageSelected}
            acceptedFileTypes={acceptedFileTypes}
            maxUploadFiles={1}
          />
          {cover ? (
            <span className="image-selected-label">Image Selected</span>
          ) : (
            <span className="image-not-selected-label">
              Image Was Not Selected
            </span>
          )}

          <Form onSubmit={this.handleFormSubmit} className="form-wrapper">
            <Form.Field
              width={4}
              control={Input}
              label="Title Rus"
              name="titleRus"
              placeholder="Title Rus"
              value={titleRus}
              onChange={this.handleInputChange}
            />
            <Form.Field
              width={4}
              control={Input}
              label="Title Eng"
              name="titleEng"
              placeholder="Title Eng"
              value={titleEng}
              onChange={this.handleInputChange}
            />
            <Form.Field
              disabled={this.isSaveValid(cover, titleRus, titleEng)}
              control={Button}
              content={formatMessage({
                id: 'common.save',
                defaultMessage: 'common.save'
              })}
            />
          </Form>
        </Segment>
      </Segment>
    );
  }
}

CategoryEditView.wrappedComponent.propTypes = {
  intl: PropTypes.shape().isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired,
  fetchCategory: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  getCategory: PropTypes.func.isRequired,
  updateCategory: PropTypes.func.isRequired
};

export default injectIntl(CategoryEditView);
