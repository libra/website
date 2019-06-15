/**
 * Copyright (c) The Libra Core Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

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
  const fieldLabel = inputProps.required ? `${label}*` : label;
  return (
    <div className="inputGroup">
      <label htmlFor={id}>{fieldLabel}</label>
      <input id={id} type="text" {...inputProps} />
    </div>
  );
};

module.exports = TextInput;
