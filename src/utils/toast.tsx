import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Typography from '../components/atoms/Typography';

const ToastMessageFormat = ({ message, title }: { message: string; title: string }) => (
  <>
    <Typography fontsStyle="base-regular" className="toast-title">
      {title}
    </Typography>
    <Typography fontsStyle="small-semi-bold" className="toast-message">
      {message}
    </Typography>
  </>
);

export const toastError = (title: string, message: string = '') => {
  toast(<ToastMessageFormat title={title} message={message} />, { type: 'error' });
};

export const toastSuccess = (title: string, message: string = '') => {
  toast(<ToastMessageFormat title={title} message={message} />, { type: 'success' });
};
