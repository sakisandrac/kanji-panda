import React from 'react';
import './RandomKanji.css'

const RandomKanji = ({mainKanji, saveKanji, savedKanji}) => {

  return (
    <section className='main-kanji-container'>
      <div className='main-kanji'>
        <p className='main-char'>{mainKanji?.ka_utf}</p>
        <div className='description'>
          <p><b>Meaning:</b> <i>{mainKanji?.meaning}</i></p>
          <p className='kanji-text'><b>Onyomi Pronounciation:</b> <i>{mainKanji?.onyomi}</i></p>
          <p className='mainKanji-text'><b>Kunyomi Pronounciation:</b> <i>{mainKanji?.kunyomi}</i></p>
        </div>
        {mainKanji && <button className='save-btn' onClick={() => {saveKanji(mainKanji)}}>{savedKanji?.some(k => k._id === mainKanji._id) ? "Unsave" : "Save"} Kanji</button>}
      </div>
    </section>
  )
}

export default RandomKanji