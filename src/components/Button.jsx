const Button = ({ text, handleClick, disabled }) => {
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className="pa2 ma2 bg-blue white bn br2 pointer"
    >
      {text}
    </button>
  );
};

export default Button;