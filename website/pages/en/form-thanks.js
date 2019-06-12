/**
 * Copyright (c) The Libra Core Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

const React = require('react');
const FormContainer = require(`${process.cwd()}/core/ContactForm/form-container.js`);
const FormHeader = require(`${process.cwd()}/core/ContactForm/form-header.js`);


const FormThanks = (props) => {
  return (
    <FormContainer {...props} >
      <FormHeader
        title="Thank you!"
        subtitle="You will hear from us soon"
      />
      <button className="button">Return</button>
    </FormContainer>
  );
};

module.exports = FormThanks;
