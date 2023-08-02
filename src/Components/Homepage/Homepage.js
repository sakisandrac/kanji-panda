import React from 'react';
import RandomKanji from '../RandomKanji/RandomKanji';
import './Homepage.css'
import KanjiSet from '../KanjiSet/KanjiSet';

const Homepage = ({mainKanji, kanjiSet, changeMainKanji }) => {
  return (
    <div className='main-container'>
      <main className='dashboard'>
        <RandomKanji mainKanji={mainKanji}/>
        <KanjiSet kanjiSet={kanjiSet} changeMainKanji={changeMainKanji}/>
      </main>
    </div>
  )
}

export default Homepage