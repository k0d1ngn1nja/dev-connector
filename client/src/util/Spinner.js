import React from 'react';
import spinnerGIF from './spinner.gif';

export default () => {
  return (
    <div>
      <img
        src={spinnerGIF}
        alt="Loading..."
        style={{ width: '200px', margin: 'auto', display: 'block' }}
      />
    </div>
  );
};
