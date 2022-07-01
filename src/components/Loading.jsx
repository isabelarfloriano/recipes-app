import React from 'react';
import ReactLoading from 'react-loading';

function Loading() {
  return (
    <section className="d-flex align-items-center justify-content-center min-vh-100">
      <ReactLoading
        type="bubbles"
        color="#dc3545"
        width={ 100 }
        height={ 100 }
      />
    </section>
  );
}

export default Loading;
