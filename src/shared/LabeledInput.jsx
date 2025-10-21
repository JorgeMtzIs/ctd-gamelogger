function LabeledInput({ elementId, labelText, onChange, value, name, type }) {
  return (
    <>
      <label htmlFor={elementId}>
        {labelText}
        <input
          type={type}
          id={elementId}
          value={value}
          onChange={onChange}
          name={name}
        />
      </label>
    </>
  );
}

export default LabeledInput;
