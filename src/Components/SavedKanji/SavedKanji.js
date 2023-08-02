import React from 'react';
import RandomKanji from '../RandomKanji/RandomKanji';
import './SavedKanji.css';

const SavedKanji = ({saveKanji, savedKanji}) => {
  return (
    <div className='saved-page'>
      <main className='dashboard'>
        <h1 className='header'>My Saved Kanji</h1>
        <div className='saved-container'>
          {savedKanji.map(k => {
            return (
              <RandomKanji mainKanji={k} saveKanji={saveKanji} savedKanji={savedKanji} />
            )
          })}
        </div>
      </main>
    </div>
  )
}

export default SavedKanji