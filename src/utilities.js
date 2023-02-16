export const cardHolderNameValidator = (string) => {
  string = string.trim();
  if (string.length === 0) return `Can't be empty!`;
  if (string.search(/^\w+[^\d\w][\w]+/) === -1) return `Name is not valid`;
  return '';
};

export const CardNumberValidator = (string, noOfDigits) => {
  if (string.trim().length === 0) return `Can't be empty!`;
  if (string.trim().length !== noOfDigits) return `Not ${noOfDigits} digit long!`;
  return '';
};

export const stringToCreditCardNumberFormatter = (string) => {
  String.prototype.toGroupedString = function (groupBy = 3, groupSeperator = ' ') {
    return Array.from(this).reduce((prev, curr, index) => (index % groupBy === 0 ? `${prev}${groupSeperator}${curr}` : prev + curr));
  };

  string = string.replace(/[^\d]+/g, '');
  if (string.length < 1) return '';
  if (string.length > 16) return string.replace(/^(\d{16}).*$/, '$1').toGroupedString(4);
  return string.toGroupedString(4);
};

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'change':
      const { changeField, newValue, error } = payload;
      return {
        ...state,
        [changeField]: { value: newValue, error },
      };

    case 'update-error':
      let { cardHolderName, cardNumber, cardExpiryMonth, cardExpiryYear, cardCvc } = { ...state };
      cardHolderName.error = cardHolderNameValidator(cardHolderName.value);
      cardNumber.error = CardNumberValidator(cardNumber.value.replace(/[^\d]/g, '').substring(0, 16), 16);
      cardExpiryMonth.error = CardNumberValidator(cardExpiryMonth.value, 2);
      cardExpiryYear.error = CardNumberValidator(cardExpiryYear.value, 2);
      cardCvc.error = CardNumberValidator(cardCvc.value, 3);
      return { cardHolderName, cardNumber, cardExpiryMonth, cardExpiryYear, cardCvc };

    default:
      return state;
  }
};
