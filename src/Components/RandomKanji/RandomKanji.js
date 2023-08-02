import React from 'react';
import './RandomKanji.css'

const RandomKanji = ({mainKanji, saveKanji, savedKanji}) => {

  return (
    <section className='main-kanji-container'>
      <div className='main-kanji'>
        <p className='main-char'>{mainKanji?.ka_utf}</p>
        <div className='description'>
          <p>Meaning: {mainKanji?.meaning}</p>
          <p className='kanji-text'>Onyomi Pronounciation: {mainKanji?.onyomi}</p>
          <p className='mainKanji-text'>Kunyomi Pronounciation: {mainKanji?.kunyomi}</p>
        </div>
        <button className='save-btn' onClick={() => {saveKanji(mainKanji)}}>{savedKanji?.some(k => k._id === mainKanji._id) ? "Unsave" : "Save"} Kanji</button>
      </div>
    </section>
  )
}

export default RandomKanji