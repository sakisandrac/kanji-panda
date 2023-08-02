import React from 'react';
import './KanjiSet.css'

const KanjiSet = ({kanjiSet, changeMainKanji}) => {

  const renderKanjiSet = () => {
    return kanjiSet.map(kanji => {
      return (
        <div className='kanji-container' key={kanji._id} onClick={() => {changeMainKanji(kanji)}}>
          <p className='kanj-set-char'>{kanji.ka_utf}</p>
          <p className='kanji-text'>Meaning: {kanji.meaning}</p>
          <p className='kanji-text'>Onyomi Pronounciation: {kanji.onyomi}</p>
          <p className='kanji-text'>Kunyomi Pronounciation: {kanji.kunyomi}</p>
        </div>
      )
    })
  }

  return (
    <section className='kanji-set-container'>
      <p className='set-header'>Random Kanji Set of the Day</p>
      <div className='kanji-set-box'>
        {kanjiSet.length < 5 ? <p>Loading! </p> : renderKanjiSet()}
      </div>
    </section>
  )
}

export default KanjiSet