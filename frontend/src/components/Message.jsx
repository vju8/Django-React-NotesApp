import React from 'react';

const Message = ({ message, type }) => {
  if (!message) return null;

  const style = {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    textAlign: 'center',
    backgroundColor: type === 'success' ? '#d4edda' : '#f8d7da',
    color: type === 'success' ? '#155724' : '#721c24',
  };

  return (
    <div style={style}>
      {message}
    </div>
  );
};

export default Message;