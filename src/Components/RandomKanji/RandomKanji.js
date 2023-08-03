import React from 'react';
import './RandomKanji.css';
import PropTypes from 'prop-types';

const RandomKanji = ({mainKanji, saveKanji, savedKanji}) => {

 const checkSaved = () => {
  return savedKanji?.some(k => k._id === mainKanji._id)
 }
 
  return (
    <section className='main-kanji-container'>
      <div className='main-kanji'>
        <p className='main-char'>{mainKanji?.ka_utf}</p>
        <div className='description'>
          <p className='kanji-text'><b>Meaning:</b> <i>{mainKanji?.meaning}</i></p>
          <p className='kanji-text'><b>Onyomi Pronounciation:</b> <i>{mainKanji?.onyomi}</i></p>
          <p className='kanji-text'><b>Kunyomi Pronounciation:</b> <i>{mainKanji?.kunyomi}</i></p>
        </div>
        {mainKanji && <button className='save-btn' onClick={() => {saveKanji(mainKanji)}}>{checkSaved() ? "Unsave" : "Save"} Kanji</button>}
      </div>
    </section>
  )
}

RandomKanji.propTypes = {
  mainKanji: PropTypes.shape({
    ka_utf: PropTypes.string,
    kunyomi: PropTypes.string,
    meaning: PropTypes.string,
    onyomi: PropTypes.string,
    _id: PropTypes.string,
  }),
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

export default RandomKanji