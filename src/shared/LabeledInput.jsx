function LabeledInput({ elementId, labelText, onChange, value, name, type }) {
  return (
    <>
      <label htmlFor={elementId}>{labelText}</label>
      <input
        type={type}
        id={elementId}
        value={value}
        onChange={onChange}
        name={name}
      />
    </>
  );
}

export default LabeledInput;
