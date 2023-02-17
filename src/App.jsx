import { useState } from 'react';
import useStore from './useStore';
import CardSubmitted from './CardSubmitted';
import CardForm from './CardForm';
import CardContainer from './CardContainer';
import './App.scss';

const fadeIn = {
  hidden: { opacity: 0 },
  hiddenLeft: { x: '-100%', opacity: 0 },
  hiddenRight: { x: '100%', opacity: 0 },
  visible: { x: '0%', opacity: 1 },
};

function App() {
  const { state, dispatch } = useStore();
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="card">
      <CardContainer cardHolderName={state.cardHolderName.value} cardNumber={state.cardNumber.value} cardExpiryMonth={state.cardExpiryMonth.value} cardExpiryYear={state.cardExpiryYear.value} cardCvc={state.cardCvc.value} />
      <main>{!isSubmitted ? <CardForm isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} state={state} dispatch={dispatch} /> : <CardSubmitted isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} />}</main>
    </div>
  );
}

export default App;
