import React, {useState, useEffect, useRef} from 'react';

import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
import './Search.css';

import useHttp from '../../hooks/http';

const Search = React.memo(props => {
  const {onLoadIngredients} = props; // object destructuring
  const [enteredFilter, setEnteredFilter] = useState(''); // array destructuring
  const inputRef = useRef();
  const {isLoading, data, error, sendReq, clear} = useHttp();

  useEffect(() => {
    const timer = setTimeout(() => {
      // eneteredFilter value will be value when setTimeout is set - not latest value
      if (enteredFilter===inputRef.current.value) {
        const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`;
        // fetch('https://reacthooks-7a2b4.firebaseio.com/ingredients.json'+query)
        // .then(response => response.json())
        // .then(responseData => {
        //   const loadedIngredients = [];
        //   for (const key in responseData) {
        //     loadedIngredients.push({
        //       id: key,
        //       title: responseData[key].title,
        //       amount: responseData[key].amount
        //     });
        //   }
        //   onLoadIngredients(loadedIngredients);
        // })
        sendReq('https://reacthooks-7a2b4.firebaseio.com/ingredients.json'+query, 'GET');
      }      
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, inputRef, sendReq]); 
  // will run this function everytime enteredFilter is changed
  // returning a function from useEffect() will cause that function to run first before the useEffect() main function
  // exception is the first time, when only main function is called
  // this is a clean up function


  useEffect(() => {
    if (!isLoading && !error && data) {
        const loadedIngredients = [];
        for (const key in data) {
          loadedIngredients.push({
            id: key,
            title: data[key].title,
            amount: data[key].amount
          });
        }
        onLoadIngredients(loadedIngredients);
    }
  }, [data, isLoading, error, onLoadIngredients]);

  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error.message}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>Loading...</span>}
          <input ref={inputRef} type="text" value={enteredFilter} onChange={event => setEnteredFilter(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;