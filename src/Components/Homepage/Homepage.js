import React from 'react';
import RandomKanji from '../RandomKanji/RandomKanji';
import './Homepage.css'
import KanjiSet from '../KanjiSet/KanjiSet';

const Homepage = ({setKanjiSet, mainKanji, kanjiSet, changeMainKanji, saveKanji, savedKanji}) => {
  const handleClick = () => {
    setKanjiSet([]);
  }

  return (
    <div className='main-container'>
      <main className='dashboard'>
        <h1 className='header'>Let's Study Kanji!</h1>
        <RandomKanji saveKanji={saveKanji} mainKanji={mainKanji} savedKanji={savedKanji}/>
        <KanjiSet saveKanji={saveKanji}  kanjiSet={kanjiSet} changeMainKanji={changeMainKanji}/>
        <button className='save-btn' onClick={handleClick}>Get Another Set!</button>
      </main>
    </div>
  )
}

export default Homepage