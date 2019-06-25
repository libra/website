/**
 * Copyright (c) The Libra Core Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

const React = require('react');


const getInput = (id, inputProps) => {
  const type = inputProps.type || 'text';
  if (type === 'textarea') {
    return <textarea id={id} type="text" {...inputProps} />;
  } else {
    return <input id={id} type="text" {...inputProps} />;
  }
};

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
  const fieldLabel = inputProps.required ? `${label}*` : label;
  return (
    <div className="inputGroup">
      <label htmlFor={id}>{fieldLabel}</label>
      {getInput(id, inputProps)}
    </div>
  );
};

module.exports = TextInput;
