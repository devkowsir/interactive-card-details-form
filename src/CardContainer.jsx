function CardContainer({ cardHolderName, cardNumber, cardExpiryMonth, cardExpiryYear, cardCvc }) {
  cardHolderName = cardHolderName.length === 0 ? 'Jane AppleSeed' : cardHolderName;
  cardNumber = cardNumber.length === 0 ? '0000000000000000' : cardNumber.replace(/[^\d]/g, '').replace(/$/, '                ').slice(0, 16);
  cardExpiryMonth = cardExpiryMonth.length === 0 ? '00' : cardExpiryMonth;
  cardExpiryYear = cardExpiryYear.length === 0 ? '00' : cardExpiryYear;
  cardCvc = cardCvc.length === 0 ? '000' : cardCvc;

  return (
    <div className="card__container">
      <div className="card__front">
        <div>
          <img className="card__logo" src="/images/card-logo.svg" alt="card logo" />
          <div className="card__number">
            {cardNumber.split('').map((digit, index) => (
              <span key={digit + index}>{digit}</span>
            ))}
          </div>
          <span className="card__name">{cardHolderName}</span>
          <span className="card__expiry">
            {cardExpiryMonth}/{cardExpiryYear}
          </span>
        </div>
      </div>
      <div className="card__back">
        <span className="card__cvc">{cardCvc}</span>
      </div>
    </div>
  );
}

export default CardContainer;
