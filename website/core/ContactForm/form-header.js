const React = require('react');


const FormHeader = ({ title, subtitle }) => {
  return (
    <header>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </header>
  );
};

module.exports = FormHeader;
