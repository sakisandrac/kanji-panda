import Homepage from '../Homepage/Homepage';
import SavedKanji from '../SavedKanji/SavedKanji';
import Nav from '../Nav/Nav';
import SearchPage from '../SearchPage/SearchPage';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getKanji, getSingleKanji } from '../../apiCalls';
import { cleanUpData, getRandNum } from '../../utils';
import './App.css';
import ErrorMsg from '../ErrorMsg/ErrorMsg';

const App = () => {
  const [mainKanji, setMainKanji] = useState({});
  const [kanjiSet, setKanjiSet] = useState([]);
  const [savedKanji, setSavedKanji] = useState([]);
  const [error, setError] = useState({ error: false, message: "" });
  const [getNewSet, setGetNewSet] = useState(false);

  const getKanjiSet = async () => {
    const kData = await getKanji()
    const set = []
    for (let i = 0; i < 5; i++) {
      set.push(kData[getRandNum(kData.length)].kanji.character);
    }
    return set
  }

  const getKanjiDetails = async (k) => {
    const data = await getSingleKanji('kanji', k);
    setKanjiSet(prev => [...prev, cleanUpData(data)]);
    setMainKanji(data);
  }

  useEffect(() => {

    getKanjiSet().then(set => {
      set.forEach(k => {
        try {
          getKanjiDetails(k)
        } catch (err) {
          setError({ error: true, message: `${err}` });
        }
      })
    }).catch(err => setError({ error: true, message: `${err}` }))
  }, [getNewSet])

  const changeMainKanji = (kanji) => {
    setMainKanji(kanji);
  }
  
  const saveKanji = (kanji) => {
    const isSaved = savedKanji.find(saved => {
      return saved._id === kanji._id;
    })

    if (!isSaved) {
      setSavedKanji(prev => [...prev, kanji]);
    } else {
      setSavedKanji(() => {
        const filteredKanji = savedKanji.filter(k => k._id !== kanji._id);
        return filteredKanji;
      })
    }
  }

  return (
    <>
    <div className="App">
      <Nav />
    </div>
    <Routes>
      <Route path="/" element={
        <Homepage
          error={error}
          setKanjiSet={setKanjiSet} 
          savedKanji={savedKanji} 
          saveKanji={saveKanji} 
          kanjiSet={kanjiSet} 
          mainKanji={mainKanji}
          setGetNewSet={setGetNewSet}
          changeMainKanji={changeMainKanji}/>} />
      <Route path="/saved" element={<SavedKanji savedKanji={savedKanji} saveKanji={saveKanji}/>}/>
      <Route path="/search" element={<SearchPage saveKanji={saveKanji} savedKanji={savedKanji}/>}/>
      <Route path="*" element={<ErrorMsg message={"404"} />}/>
    </Routes>
  </>
  );
}

export default App;
