import {useReducer, useCallback} from 'react';

const initialState = {
    loading: false,
    error: null,
    data: null,
    extra: null,
    identifier: null
  };

const httpReducer = (curHttpState, action) => {
    switch(action.type) {
      case 'SEND':
        return {loading: true, error: null, data: null, extra: null, identifier: action.identifier};
      case 'RESPONSE':
          console.log(action.data);
        return {...curHttpState, loading: false, data: action.data, extra: action.extra};
      case 'ERROR':
        return {loading: false, error: action.error};
      case 'CLEAR':
        return initialState;
      default:
        throw new Error('Should not get here.');
    }
  };

const useHttp = () => { 
    const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);


    const sendRequest = useCallback((url, method, body, extra, identifier) => {
        // console.log('SEND REQUEST URL');
        // console.log(url);
        dispatchHttp({type: 'SEND', identifier: identifier});
        fetch(url,{
            method: method,
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            // console.log('SEND REQUEST RESPONSE DATA');
            // console.log(response.json());
            return response.json();
        })
        .then(response => {
            dispatchHttp({type: 'RESPONSE', data: response, extra: extra});
        }).catch(err => {
            dispatchHttp({type: 'ERROR', error: err.message});
        }); 
    }, []);

    const clear = useCallback(() => {
        dispatchHttp({type: 'CLEAR'});
    }, []);


    return {
        isLoading: httpState.loading,
        data: httpState.data,
        error: httpState.error,
        sendReq: sendRequest,
        extra: httpState.extra,
        clear: clear,
        identifier: httpState.identifier
    };
};

export default useHttp;