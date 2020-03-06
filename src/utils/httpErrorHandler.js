import { toast } from 'react-semantic-toasts';

const httpErrorHandler = ({ message, config }) => {
  return toast({
    type: 'error',
    size: 'small',
    title: message,
    description: `${config.method.toUpperCase()}: ${config.url}`,
    animation: 'bounce',
    time: 5000
  });
};

export default httpErrorHandler;
