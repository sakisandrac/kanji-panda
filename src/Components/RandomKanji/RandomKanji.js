import React from 'react';
import './RandomKanji.css'

const RandomKanji = ({mainKanji}) => {

  return (
    <section className='main-kanji-container'>
      <div className='main-kanji'>
        <p className='main-char'>{mainKanji?.ka_utf}</p>
        <div className='description'>
          <p>Meaning: {mainKanji?.meaning}</p>
          <p className='kanji-text'>Onyomi Pronounciation: {mainKanji?.onyomi}</p>
          <p className='mainKanji-text'>Kunyomi Pronounciation: {mainKanji?.kunyomi}</p>
        </div>
      </div>
    </section>
  )
}

export default RandomKanji