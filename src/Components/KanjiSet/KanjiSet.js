import React from 'react';
import './KanjiSet.css'

const KanjiSet = ({kanjiSet, changeMainKanji}) => {

  const renderKanjiSet = () => {
    return kanjiSet?.map(kanji => {
      return (
        <div className='kanji-container' key={kanji._id} onClick={() => {changeMainKanji(kanji)}}>
          <p className='kanji-set-char'>{kanji.ka_utf}</p>
          <p className='kanji-text'><b>Meaning:</b> <i>{kanji.meaning}</i></p>
          {/* <p className='kanji-text'><b>Onyomi Pronounciation:</b> <i>{kanji.onyomi}</i></p> */}
          {/* <p className='kanji-text'><b>Kunyomi Pronounciation:</b> <i>{kanji.kunyomi}</i></p> */}
        </div>
      )
    })
  }

  return (
    <section className='kanji-set-container'>
      <p className='set-header'>Random Kanji Set of the Day</p>
      <div className='kanji-set-box'>
        {renderKanjiSet()}
      </div>
    </section>
  )
}

export default KanjiSet