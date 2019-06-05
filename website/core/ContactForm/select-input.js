const React = require('react');


/**
 * Get the option elements. An initial disabled option is added for the
 * placeholder text.
 *
 * @param  {Array<string>} options
 * @param  {string} placeholderText Override the default text
 */
const getOptions = (options, placeholderText) => {
  const items = [(
    <option value="" disabled selected>
      {placeholderText || 'Please choose an option'}
    </option>
  )];

  options.forEach(item => {
    const value = item.replace(' ','');
    items.push(
      <option key={value} value={value}>{item}</option>
    );
  });
  return items;
};

/**
 * Simple select input. The following passed in props are pulled out:
 *   - label (label text)
 *   - options (array of options)
 *   - placeholderText (optional text to override placeholder)
 *
 * All other props passed in are passed directly to the select component.
 */
const SelectInput = (props) => {
  const {
    label,
    id,
    options,
    placeholderText,
    ...selectProps
  } = props;

  return (
    <div className="inputGroup selectWrapper">
      <label htmlFor={id}>{label}</label>
      <select id={id} {...selectProps}>
        {getOptions(options, placeholderText)}
      </select>
    </div>
  );
};

module.exports = SelectInput;
