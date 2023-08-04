import React from 'react';
import './KanjiSet.css';
import PropTypes from 'prop-types';

const KanjiSet = ({handleNewSetClick,  kanjiSet, changeMainKanji}) => {

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

  return (
    <section className='kanji-set-container'>
      <p className='set-header'>Random Kanji Study Set</p>
      {kanjiSet.length < 5 && <p className='loading-text'>loading...</p>}
      <div className='kanji-set-box'>
        {renderKanjiSet()}
      </div>
      <button className='save-btn' onClick={handleNewSetClick}>Get Another Set!</button>
    </section>
  )
}

KanjiSet.propTypes = {
  handleNewSetClick: PropTypes.func,
  kanjiSet: PropTypes.arrayOf(PropTypes.shape({
    ka_utf: PropTypes.string,
    kunyomi: PropTypes.string,
    meaning: PropTypes.string,
    onyomi: PropTypes.string,
    _id: PropTypes.string,
  })),
  changeMainKanji: PropTypes.func,
}

export default KanjiSet