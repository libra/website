const React = require('react');

/**
 * Input element. The type defaults to "text" but you can pass in any type
 * to override it. Except for "label" all the props are passed directly to
 * the input component.
 *
 * Here's an example of adding an email input:
 *
 * <TextInput label="Email" className="my-class" type="email" />
 *
 */
const TextInput = ({ label, id, ...inputProps }) => {
  return (
    <div className="inputGroup">
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" {...inputProps} />
    </div>
  );
};

module.exports = TextInput;
