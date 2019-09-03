import { toast } from 'react-semantic-toasts';

const httpErrorHandler = error =>
  toast({
    type: 'error',
    size: 'small',
    title: 'Http error',
    description: error.message,
    animation: 'bounce',
    time: 5000
  });

export default httpErrorHandler;
