import React from 'react';
import notFoundImg from '../../images/404.png';

const ErrorMsg = ({message}) => {

  const renderMsg = () => {
    if (message.includes("404")) {
      return (
        <main className='dashboard'>
          <img alt="404 not found" src={notFoundImg} />
        </main>
      )
    } else {
      return <h1>{message}</h1>
    }
  }

  return (
    <div className='error-page'> 
      {renderMsg()}
    </div>
  )
}

export default ErrorMsg