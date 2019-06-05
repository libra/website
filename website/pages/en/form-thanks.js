/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const FormContainer = require(`${process.cwd()}/core/ContactForm/form-container.js`);
const FormHeader = require(`${process.cwd()}/core/ContactForm/form-header.js`);


const FromThanks = (props) => {
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

module.exports = FromThanks;
