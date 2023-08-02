import React from 'react'
import RandomKanji from '../RandomKanji/RandomKanji'

const SavedKanji = ({saveKanji, savedKanji}) => {
  return (
    <div className='saved-container'>
      {savedKanji.map(k => {
        return (
          <RandomKanji mainKanji={k} saveKanji={saveKanji} savedKanji={savedKanji} />
        )
      })}
    </div>
  )
}

export default SavedKanji