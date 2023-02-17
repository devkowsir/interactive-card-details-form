import { useState } from 'react';
import { cardHolderNameValidator, CardNumberValidator, stringToCreditCardNumberFormatter } from './utilities';

function CardForm({ isSubmitted, setIsSubmitted, state, dispatch }) {
  const [showError, setShowError] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setShowError(true);

    if (!isSubmitted) dispatch({ type: 'update-error' });

    if (!state.cardHolderName.error && !state.cardNumber.error && !state.cardExpiryMonth.error && !state.cardExpiryYear.error && !state.cardCvc.error && state.cardCvc.value) {
      setIsSubmitted(true);
    }
  };

  const changeDispatcher = (field, value, error) => {
    dispatch({ type: 'change', payload: { changeField: field, newValue: value, error } });
  };

  return (
    <>
      <h1 className="card__nodisplay">Enter Card Details</h1>
      <form className="card__form" onSubmit={submitHandler}>
        <div className="card__input card__input--full">
          <label htmlFor="name">cardholder's name</label>
          <input id="name" type="text" name="cardholder's name" value={state.cardHolderName.value} onChange={(event) => changeDispatcher('cardHolderName', event.target.value, cardHolderNameValidator(event.target.value))} placeholder="Jane Appleseed" />
          {showError && state.cardHolderName.error && <span className="card__error">{state.cardHolderName.error}</span>}
        </div>
        <div className="card__input card__input--full">
          <label htmlFor="number">card number</label>
          <input id="number" type="text" name="card number" value={state.cardNumber.value} onChange={(event) => changeDispatcher('cardNumber', stringToCreditCardNumberFormatter(event.target.value), CardNumberValidator(event.target.value.replace(/[^\d]/g, '').substring(0, 16), 16))} placeholder="1234 1234 1234 1234" />
          {showError && state.cardNumber.error && <span className="card__error">{state.cardNumber.error}</span>}
        </div>
        <div className="card__input card__input--half">
          EXP. DATE(<label htmlFor="month">mm</label>/<label htmlFor="year">yy</label>)
          <div className="card__input--flex">
            <div>
              <input id="month" type="number" name="card expiry month" min="1" max="12" placeholder="12" value={state.cardExpiryMonth.value} onChange={(event) => changeDispatcher('cardExpiryMonth', event.target.value, CardNumberValidator(event.target.value, 2))} />
              {showError && state.cardExpiryMonth.error && <span className="card__error">{state.cardExpiryMonth.error}</span>}
            </div>
            <div>
              <input id="year" type="number" name="card expiry year" min="1" max="99" placeholder="12" value={state.cardExpiryYear.value} onChange={(event) => changeDispatcher('cardExpiryYear', event.target.value, CardNumberValidator(event.target.value, 2))} />
              {showError && state.cardExpiryYear.error && <span className="card__error">{state.cardExpiryYear.error}</span>}
            </div>
          </div>
        </div>
        <div className="card__input card__input--half">
          <label htmlFor="cvc">cvc</label>
          <input type="number" name="CVC" max="999" value={state.cardCvc.value} onChange={(event) => changeDispatcher('cardCvc', event.target.value, CardNumberValidator(event.target.value, 3))} placeholder="123" />
          {showError && state.cardCvc.error && <span className="card__error">{state.cardCvc.error}</span>}
        </div>
        <div className="card__input card__input--half"></div>
        <button className="card__input card__input--full" type="submit">
          Confirm
        </button>
      </form>
    </>
  );
}

export default CardForm;
