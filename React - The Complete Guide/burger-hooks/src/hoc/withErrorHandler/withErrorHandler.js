import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../_Aux/_Aux';

import useHttpErrorHandler from '../../hooks/http-errorHandler'; // custom hook

const withErrorHandler = ( WrappedComponent, axios ) => {
    return props => {
        // custom hooks that returns an error and a function to clear error
        const [error, clearError] = useHttpErrorHandler(axios); 

        return (
            <Aux>
                <Modal
                    show={error}
                    modalClosed={clearError}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        );
    }
}

export default withErrorHandler;