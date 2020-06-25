import React from "react";

const LyricCreate = ({ onFormSubmit, handleInputChange, inputValue }) => {
  return (
    <form style={style.form} onSubmit={onFormSubmit}>
      <label style={style.label}>Add lyrics</label>
      <input value={inputValue} onChange={handleInputChange} />
      <button>Add</button>
    </form>
  );
};

const style = {
  form: {
    maxWidth: "500px",
  },

  label: {
    fontSize: "18px",
  },
};

export default LyricCreate;
