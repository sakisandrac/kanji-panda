import React from 'react';
import RandomKanji from '../RandomKanji/RandomKanji';
import './Homepage.css'
import KanjiSet from '../KanjiSet/KanjiSet';
import ErrorMsg from '../ErrorMsg/ErrorMsg';

const Homepage = ({setGetNewSet, error, setKanjiSet, mainKanji, kanjiSet, changeMainKanji, saveKanji, savedKanji}) => {
  
  return (
    <div className='main-container'>
      <main className='dashboard'>
        <h1 className='header'>Let's Study Kanji!</h1>
        {error.error && <ErrorMsg message={error.message} />}
        <RandomKanji saveKanji={saveKanji} mainKanji={mainKanji} savedKanji={savedKanji}/>
        <KanjiSet setGetNewSet={setGetNewSet} setKanjiSet={setKanjiSet} saveKanji={saveKanji}  kanjiSet={kanjiSet} changeMainKanji={changeMainKanji}/>
      </main>
    </div>
  )
}

export default Homepage