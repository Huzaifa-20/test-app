import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const CustomAlert = ({ showAlert, handleCloseAlert, message }) => {
  return (
    <Snackbar
      open={showAlert}
      autoHideDuration={4000}
      onClose={handleCloseAlert}
    >
      <Alert onClose={handleCloseAlert} severity='error' sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;
