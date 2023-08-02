import React from 'react';
import notFoundImg from '../../images/404.png';
import PropTypes from 'prop-types';

const ErrorMsg = ({message}) => {

  const renderMsg = () => {
    if (message.includes("404")) {
      return (
        <main className='dashboard'>
          <img src={notFoundImg} />
        </main>
      )
    } else {
      return <h1>{message}</h1>
    }
  }

  return (
    <div className='error-page'> 
      {message && renderMsg()}
    </div>
  )
}

ErrorMsg.propTypes = {
  message: PropTypes.string
}

export default ErrorMsg

