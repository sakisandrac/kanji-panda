import React from 'react';
import RandomKanji from '../RandomKanji/RandomKanji';
import './Homepage.css'
import KanjiSet from '../KanjiSet/KanjiSet';

const Homepage = ({setKanjiSet, setGetMoreKanji, mainKanji, kanjiSet, changeMainKanji, saveKanji, savedKanji}) => {
  const handleClick = () => {
    setKanjiSet([]);
    // setGetMoreKanji(prev => !prev);
  }

  return (
    <div className='main-container'>
      <main className='dashboard'>
        <RandomKanji saveKanji={saveKanji} mainKanji={mainKanji} savedKanji={savedKanji}/>
        <KanjiSet saveKanji={saveKanji}  kanjiSet={kanjiSet} changeMainKanji={changeMainKanji}/>
        <button className='btn' onClick={handleClick}>Get Another Set!</button>
      </main>
    </div>
  )
}

export default Homepage