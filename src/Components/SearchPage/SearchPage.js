import React, { useEffect, useState } from 'react';
import { getSingleKanji } from '../../apiCalls';
import { cleanUpData } from '../../utils';
import RandomKanji from '../RandomKanji/RandomKanji';
import './SearchPage.css';
import ErrorMsg from '../ErrorMsg/ErrorMsg';
import PropTypes from 'prop-types';

const SearchPage = ({ saveKanji, savedKanji }) => {

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchType, setSearchType] = useState("");
  const [error, setError] = useState({ error: false, fetchError: false, message: "" });
  const [reRender, setReRender] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {

    if (searchTerm) {
      setSearchResult([]);
      setError({ error: false, message: "" })
      getSingleKanji(searchType, searchTerm.toLowerCase())
        .then(data => {
          setError({ error: false, message: "" })
          const cleanData = cleanUpData(data);

          if (data.error === "No kanji found." || data.length === 0) {
            return setSearchResult([{ error: true, message: "No kanji found." }])
          }

          if (searchType === 'search') {
            data?.forEach((k) => {
              getSingleKanji('kanji', k.kanji.character).then(data => {
                setError({ error: false, message: "" })
                setSearchResult(prev => [...prev, data]);
              })
                .catch(err => {
                  setError({ error: true, fetchError: true, message: err });
                });
            })
          } else {
            setSearchResult([cleanData]);
          }
        })
        .catch(err => {
          setError({ error: true, fetchError: true, message: `${err}` })
        })
    }
  }, [reRender])

  const setSearch = (e) => {
    const { name, value } = e.target;
    name === 'select' ? setSearchType(value) : setSearchTerm(value);
  }

  const runSearch = () => {
    if (searchType) {
      setError({ error: false, message: "" });
      setIsSubmitted(true);
      setReRender(prev => !prev);
    } else {
      setIsSubmitted(false);
      setSearchResult([]);
      setError({ error: true, message: "select search type" });
    }
  }

  const submitSearch = (e) => {
    e.preventDefault();

    if (searchTerm) {
      runSearch();
    } else {
      setIsSubmitted(false);
      setError({ error: true, message: "search cannot be blank!" })
    }
  }

  const renderResults = () => {
    if (searchResult[0].error) {
      return <ErrorMsg message={"no results found"} />
    } else {
      return searchResult.map(kanji => <RandomKanji key={kanji._id} mainKanji={kanji} saveKanji={saveKanji} savedKanji={savedKanji} />)
    }
  }

  return (
    <div className='search-page'>
      <div className='dashboard'>
        <h1 className='header'>Search for Kanji:</h1>
        <article className='info-box'>
          <p className='kanji-text'>Search for Kanji by English meaning or by character. Please enter only 1 word or character at a time to search!</p>
        </article>
        <form>
          <label className='hidden' htmlFor='typeSelect'>Select Type</label>
          <select id='typeSelect' className='type-select' name="select" onChange={(e) => { setSearch(e) }}>
            <option value="">Search By:</option>
            <option value='search'>English Meaning</option>
            <option value='kanji'>Kanji Character</option>
          </select>
          <label className='hidden' htmlFor='searchText'>Search</label>
          <input id='searchText' className='search-text' name='input' type='text' value={searchTerm} onChange={(e) => { setSearch(e) }} placeholder='enter search' />
          <button className='save-btn search-btn' onClick={(e) => { submitSearch(e) }}>search</button>
        </form>
        <div className='search-results-container'>
          <section className='search-results'>
            {error.fetchError && <ErrorMsg message={error.message} />}
            {isSubmitted ?
              searchResult.length > 0 ?
                renderResults() : <ErrorMsg message={"loading..."} />
              : <ErrorMsg message={error.message} />
            }
          </section>
        </div>
      </div>
    </div>
  )
}

SearchPage.propTypes = {
  saveKanji: PropTypes.func,
  savedKanji: PropTypes.arrayOf(PropTypes.shape({
    ka_utf: PropTypes.string,
    kunyomi: PropTypes.string,
    meaning: PropTypes.string,
    onyomi: PropTypes.string,
    _id: PropTypes.string,
    studied: PropTypes.bool
  }))
}


export default SearchPage