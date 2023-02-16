function CardSubmitted({ setIsSubmitted, isSubmitted }) {
  return (
    <div className="card__submitted">
      <img src="/images/icon-complete.svg" alt="Submission complete" />
      <h1>THANK YOU!</h1>
      <p>We've added your card</p>
      <button
        onClick={() => {
          setIsSubmitted(false);
        }}
      >
        Continue
      </button>
    </div>
  );
}

export default CardSubmitted;
