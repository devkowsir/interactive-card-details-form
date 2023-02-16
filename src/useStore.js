import { useReducer } from 'react';
import { reducer } from './utilities';

function useStore() {
  const [state, dispatch] = useReducer(reducer, {
    cardHolderName: { value: '', error: '' },
    cardNumber: { value: '', error: '' },
    cardExpiryMonth: { value: '', error: '' },
    cardExpiryYear: { value: '', error: '' },
    cardCvc: { value: '', error: '' },
  });

  return { state, dispatch };
}

export default useStore;
