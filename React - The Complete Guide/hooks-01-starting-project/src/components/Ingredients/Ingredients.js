import React, {useState, useEffect, useCallback, useReducer, useMemo} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

import ErrorModal from '../UI/ErrorModal';

import useHttp from '../../hooks/http';

const ingredientReducer = (currentIng, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      console.log('ING_REDUCER - new ing to add');
      return [...currentIng, action.ingredient]
    case 'DEL':
      return currentIng.filter(ing => ing.id!==action.id);
    default:
      throw new Error('Should not get here.');
  }
};

// const httpReducer = (curHttpState, action) => {
//   switch(action.type) {
//     case 'SEND':
//       return {loading: true, error: null};
//     case 'RESPONSE':
//       return {...curHttpState, loading: false};
//     case 'ERROR':
//       return {loading: false, error: action.error};
//     case 'CLEAR':
//       return {...curHttpState, error: null}
//     default:
//       throw new Error('Should not get here.');
//   }
// };

const  Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const {isLoading, data, error, sendReq, extra, clear, identifier} = useHttp();
  // const [httpState, dispatchHttp] = useReducer(httpReducer, {loading: false, error: null});

  // const [userIngredients, setUserIngredients] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  // useEffect(() => {
  //   fetch('https://reacthooks-7a2b4.firebaseio.com/ingredients.json')
  //   .then(response => response.json())
  //   .then(responseData => {
  //     const loadedIngredients = [];
  //     for (const key in responseData) {
  //       loadedIngredients.push({
  //         id: key,
  //         title: responseData[key].title,
  //         amount: responseData[key].amount
  //       });
  //     }
  //     setUserIngredients(loadedIngredients);
  //   })
  // }, []); 
  // used for side effects ie http requests. useEffect() will run every time after component gets rerendered
  // useEffect takes in two arguments - the function to execute and then the dependancy of the function - the function will only run after a change to the dependency
  // when no dependcies exist, pass empty array - this then acts like componentDidMount and runs only once, after the first render
  // can have several useEffect() calls, just like useState

  useEffect(() => {
    if (!isLoading && !error && identifier==='REMOVE_ING'){
      dispatch({type:'DEL', id: extra});
    } else if(!isLoading && !error && identifier==='ADD_ING') {
      // console.log('USE_EFFECT - new ing to add');
      // console.log(data);
      dispatch({type:'ADD', ingredient: {
        id: data.name,
        ...extra
      }});
    }
    
  }, [data, extra, identifier, isLoading, error]);

  const filteredIngredientHandler = useCallback(filteredIngs => {
    // setUserIngredients(filteredIngs);
    dispatch({
      type: 'SET',
      ingredients: filteredIngs
    });
  }, []); // useCallback() allows function to survive rerenders and not 'change' and therefore trigger functions where it is a dependency

  const addIngredientHandler = useCallback((newIng) => {
    sendReq('https://reacthooks-7a2b4.firebaseio.com/ingredients.json', 'POST', JSON.stringify(newIng), newIng, 'ADD_ING');
    // setIsLoading(true);
    // dispatchHttp({type: 'SEND'});
    // fetch('https://reacthooks-7a2b4.firebaseio.com/ingredients.json',{
    //   method: 'POST',
    //   body: JSON.stringify(newIng),
    //   headers: {'Content-Type': 'application/json'}
    // }).then(response => {
    //   // setIsLoading(false);
    //   dispatchHttp({type: 'RESPONSE'});
    //   return response.json();      
    // }).then(responeData => {
    //   // setUserIngredients(prevIng => [...prevIng, {id: responeData.name, ...newIng}]);
    //   dispatch({
    //     type: 'ADD',
    //     ingredient: {
    //       id: responeData.name, 
    //       ...newIng
    //     }
    //   });
    // });    
  }, [sendReq]);

  const removeIngredientHandler = useCallback((id) => {
    sendReq(`https://reacthooks-7a2b4.firebaseio.com/ingredients/${id}.json`, 'DELETE', null, id, 'REMOVE_ING');
    
    // setIsLoading(true);
    //dispatchHttp({type: 'SEND'});
    // fetch(`https://reacthooks-7a2b4.firebaseio.com/ingredients/${id}.json`,{
    //   method: 'DELETE'
    // }).then(response => {
    //   // setIsLoading(false);
    //   dispatchHttp({type: 'RESPONSE'});
    //   // setUserIngredients(prevIng => prevIng.filter((ing) => ing.id!==id));
    //   dispatch({
    //     type: 'DEL',
    //     id: id
    //   });
    // }).catch(err => {
    //   // react will batch these two state updates together to save on render cycles
    //   // setError(err.message);
    //   // setIsLoading(false);
    //   dispatchHttp({type: 'ERROR', error: err.message});
    // });    
  }, [sendReq]);

  // const clearError = useCallback(() => {
  //   // setError(null);
  //   // dispatchHttp({type: 'CLEAR'});
  //   clear();
  // }, []);

  const ingList = useMemo(() => <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler}/>, [userIngredients, removeIngredientHandler]);;

  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <IngredientForm onAddIng={addIngredientHandler} loading={isLoading}/>
      <section>
        <Search onLoadIngredients={filteredIngredientHandler}/>
        {ingList}
      </section>
    </div>
  );
}

export default Ingredients;
