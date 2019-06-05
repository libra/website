/**
 * Form for the Newletter signup.
 */
const React = require('react');
const FormContainer = require(`${process.cwd()}/core/ContactForm/form-container.js`);
const FieldSet = require(`${process.cwd()}/core/ContactForm/fieldset.js`);
const FormHeader = require(`${process.cwd()}/core/ContactForm/form-header.js`);
const countryCodes = require(`${process.cwd()}/core/ContactForm/country-codes.js`);

const formConfig = [{
  items: [{
    id: 'email',
    label: 'Email',
    type: 'email',
    required: true
  }, {
    id: 'interest',
    label: 'Interest',
    type: 'select',
    required: false,
    options: [{
      value: 'Protocol',
      text: 'Protocol'
    }, {
      value: 'Application development',
      text: 'Application development'
    }, {
      value: 'Both?',
      text: 'Both?'
    }]
  }, {
    id: 'background',
    label: 'Background',
    type: 'select',
    required: false,
    options: [{
      value: 'BlockchainDeveloper',
      text: 'Blockchain Developer'
    }, {
      value: 'Researcher',
      text: 'Researcher',
    }, {
      value: 'InstitutionalDeveloper',
      text: 'Institutional Developer'
    }, {
      value: 'dAppsDeveloper',
      text: 'dApps Developer'
    }, {
      value: 'Other',
      text: 'Other'
    }]
  }, {
    id: 'country',
    label: 'Country',
    type: 'select',
    required: false,
    options: countryCodes.map(country => {
      return {
        value: country.abbreviation,
        text: country.country
      };
    })
  }]
}];

const getFields = () => {
  return formConfig.map((config, idx) => {
    return <FieldSet key={`form-fieldset-${idx}`} {...config} />;
  });
};


function NewsletterForm(props) {
  return (
    <FormContainer {...props}>
      <FormHeader
        title="Newsletter Sign-up"
        subtitle="Please complete the form below and hit submit."
      />
      <form id="newsletterForm">
        {getFields()}
        <div className="formControlGroup">
          <button className="button right" type="submit">Submit</button>
        </div>
      </form>
    </FormContainer>
  );
}

module.exports = NewsletterForm;
