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
    items.push(
      <option key={item.value} value={item.value}>{item.text}</option>
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

  const fieldLabel = selectProps.required ? `${label}*` : label;

  return (
    <div className="inputGroup selectWrapper">
      <label htmlFor={id}>{fieldLabel}</label>
      <select id={id} {...selectProps}>
        {getOptions(options, placeholderText)}
      </select>
    </div>
  );
};

module.exports = SelectInput;
