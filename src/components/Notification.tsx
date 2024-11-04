import { Snackbar, Alert } from '@mui/material';

interface NotificationProps {
  open: boolean;
  message: string;
  severity: 'error' | 'warning' | 'info' | 'success';
  onClose: () => void;
}

const Notification = ({ open, message, severity, onClose }: NotificationProps) => {
  return (
    <Snackbar 
      open={open} 
      autoHideDuration={3000} 
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification; 