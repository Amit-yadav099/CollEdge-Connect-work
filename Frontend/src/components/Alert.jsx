import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Alert = ({ type, message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const alertStyles = {
    success: 'bg-green-100 border-green-400 text-green-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700',
  };

  return (
    <div className={`fixed top-4 right-4 z-50 border rounded-md p-4 max-w-md ${alertStyles[type]}`}>
      <div className="flex justify-between items-center">
        <div>
          <span className="font-medium">
            {type === 'success' ? 'Success!' : 
             type === 'error' ? 'Error!' : 
             'Notice!'}
          </span>
          <p className="text-sm mt-1">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-4 text-lg font-semibold focus:outline-none hover:opacity-70"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'info']).isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Alert;