import {useState, useEffect} from 'react';

export default httpClient => {
    const [error, setError] = useState(null);

    const reqInterceptor = httpClient.interceptors.request.use( req => {
        // this.setState( { error: null } );
        setError(null);
        return req;
    } );
    const resInterceptor = httpClient.interceptors.response.use( res => res, err => {
        // this.setState( { error: error } );
        setError(err);
    } );

    // componentWillUnmount () {
    //     axios.interceptors.request.eject( this.reqInterceptor );
    //     axios.interceptors.response.eject( this.resInterceptor );
    // }

    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject( reqInterceptor );
            httpClient.interceptors.response.eject( resInterceptor );
        }
    }, [reqInterceptor, resInterceptor]);
    // return function is the cleanup function
    // useEffect runs when component mounts
    // useEffect return function runs when component unmounts

    const errorConfirmedHandler = () => {
        // this.setState( { error: null } );
        setError(null);
    }

    return [error, errorConfirmedHandler];
};