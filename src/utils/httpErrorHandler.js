import { toast } from 'react-semantic-toasts';

const httpErrorHandler = (title, description) => {
  toast({
    type: 'error',
    icon: 'envelope',
    title,
    description,
    animation: 'bounce',
    time: 5000
  });
};

export default httpErrorHandler;
