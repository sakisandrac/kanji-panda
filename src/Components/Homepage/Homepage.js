import React from 'react';
import RandomKanji from '../RandomKanji/RandomKanji';
import './Homepage.css'
import KanjiSet from '../KanjiSet/KanjiSet';
import ErrorMsg from '../ErrorMsg/ErrorMsg';
import PropTypes from 'prop-types';

const Homepage = ({error, handleNewSetClick, mainKanji, kanjiSet, changeMainKanji, saveKanji, savedKanji}) => {
  
  return (
    <div className='main-container'>
      <main className='dashboard'>
        <h1 className='header'>Let's Study Kanji!</h1>
        <article className='info-home-box'>Click on a Kanji to see more details, and save!</article>
        {error.error && <ErrorMsg message={error.message} />}
        <RandomKanji saveKanji={saveKanji} mainKanji={mainKanji} savedKanji={savedKanji}/>
        <KanjiSet handleNewSetClick={handleNewSetClick} saveKanji={saveKanji}  kanjiSet={kanjiSet} changeMainKanji={changeMainKanji}/>
      </main>
    </div>
  )
}


Homepage.propTypes = {
  error: PropTypes.shape({
    error: PropTypes.bool,
    message: PropTypes.string
  }),
  handleNewSetClick: PropTypes.func,
  mainKanji: PropTypes.shape({
    ka_utf: PropTypes.string,
    kunyomi: PropTypes.string,
    meaning: PropTypes.string,
    onyomi: PropTypes.string,
    _id: PropTypes.string,
  }),
  kanjiSet: PropTypes.arrayOf(PropTypes.shape({
    ka_utf: PropTypes.string,
    kunyomi: PropTypes.string,
    meaning: PropTypes.string,
    onyomi: PropTypes.string,
    _id: PropTypes.string,
  })),
  changeMainKanji: PropTypes.func,
  saveKanji: PropTypes.func,
  savedKanji: PropTypes.arrayOf(PropTypes.shape({
    ka_utf: PropTypes.string,
    kunyomi: PropTypes.string,
    meaning: PropTypes.string,
    onyomi: PropTypes.string,
    _id: PropTypes.string,
  }))
}

export default Homepage