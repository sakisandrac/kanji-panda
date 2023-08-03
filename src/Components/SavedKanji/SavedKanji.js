import React from 'react';
import RandomKanji from '../RandomKanji/RandomKanji';
import './SavedKanji.css';
import ErrorMsg from '../ErrorMsg/ErrorMsg';
import PropTypes from 'prop-types';

const SavedKanji = ({saveKanji, savedKanji}) => {

  const renderSaved = () => {
    return savedKanji.map(k => {
      return (
        <RandomKanji key={k._id} mainKanji={k} saveKanji={saveKanji} savedKanji={savedKanji} />
      )
    })
  }

  return (
    <div className='saved-page'>
      <main className='dashboard'>
        <h1 className='header'>My Saved Kanji</h1>
        <div className='saved-container'>
          {savedKanji.length > 0 ? renderSaved() : <ErrorMsg message="You have not saved any kanji yet!"/>}
        </div>
      </main>
    </div>
  )
}

RandomKanji.propTypes = {
  saveKanji: PropTypes.func,
  savedKanji: PropTypes.arrayOf(PropTypes.shape({
    ka_utf: PropTypes.string,
    kunyomi: PropTypes.string,
    meaning: PropTypes.string,
    onyomi: PropTypes.string,
    _id: PropTypes.string,
    studied: PropTypes.bool
  }))
}

export default SavedKanji