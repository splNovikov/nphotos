import React from 'react';
import PropTypes from 'prop-types';

import { Button, Card } from 'semantic-ui-react';
import ImageEdit from '../../../../components/ImageEdit';

const EditCard = ({
  fluid,
  header,
  model,
  isCreate,
  isFetching,
  update,
  create,
  updateModel,
  remove
}) => {
  const handleRemoveClick = () => remove(model);

  return (
    <Card fluid={fluid}>
      <Card.Content>
        <Card.Header>{header}</Card.Header>
        <ImageEdit
          model={model}
          isCreate={isCreate}
          isFetching={isFetching}
          update={update}
          create={create}
          updateModelState={updateModel}
        />
      </Card.Content>
      {remove && (
        <Card.Content extra>
          <Button compact icon="trash" onClick={handleRemoveClick} />
        </Card.Content>
      )}
    </Card>
  );
};

EditCard.propTypes = {
  fluid: PropTypes.bool,
  header: PropTypes.string.isRequired,
  isCreate: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  updateModel: PropTypes.func.isRequired,
  /* eslint-disable react/require-default-props */
  model: PropTypes.shape({}),
  update: PropTypes.func,
  create: PropTypes.func,
  remove: PropTypes.func
  /* eslint-enable react/require-default-props */
};

EditCard.defaultProps = {
  fluid: false
};

export default EditCard;
