import React from 'react';

const PlaceholderMenu = ({ title }) => (
  <div>
    <h2 style={{ color: '#fff', borderBottom: '1px solid #444', paddingBottom: '10px' }}>
      {title}
    </h2>
    <p style={{ color: '#a0a0a0', marginTop: '20px' }}>
      Content for this section is under development.
    </p>
  </div>
);

export default PlaceholderMenu;