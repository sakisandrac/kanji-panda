import React from 'react';
import './KanjiSet.css'

const KanjiSet = ({setGetNewSet, kanjiSet, changeMainKanji, setKanjiSet}) => {

  const renderKanjiSet = () => {
    return kanjiSet?.map(kanji => {
      return (
        <div className='kanji-container' key={kanji._id} onClick={() => {changeMainKanji(kanji)}}>
          <p className='kanji-set-char'>{kanji.ka_utf}</p>
          <p className='kanji-text'><b>Meaning:</b> <i>{kanji.meaning}</i></p>
        </div>
      )
    })
  }
  const handleClick = () => {
    setKanjiSet([]);
    setGetNewSet (prev=> !prev);
  }


  return (
    <section className='kanji-set-container'>
      <p className='set-header'>Random Kanji Study Set</p>
      {kanjiSet.length < 5 && <p className='loading-text'>loading...</p>}
      <div className='kanji-set-box'>
        {renderKanjiSet()}
      </div>
      <button className='save-btn' onClick={handleClick}>Get Another Set!</button>
    </section>
  )
}

export default KanjiSet