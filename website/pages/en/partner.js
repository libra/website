/**
 * Form for the Partner Interest data.
 */
const React = require('react');
const CompLibrary = require('../../core/CompLibrary.js');
const FormContainer = require(`${process.cwd()}/core/ContactForm/form-container.js`);
const FieldSet = require(`${process.cwd()}/core/ContactForm/fieldset.js`);
const FormHeader = require(`${process.cwd()}/core/ContactForm/form-header.js`);

const Container = CompLibrary.Container;

const formConfig = [{
  title: 'Organization',
  items: [{
    id: 'org-name',
    label: 'Organization name',
    type: 'text',
    required: true
  }, {
    id: 'org-website',
    label: 'Organization name',
    type: 'url',
    required: true
  }, {
    id: 'org-type',
    label: 'Organization name',
    type: 'select',
    required: true,
    options: [{
      value: 'Enterprise',
      text: 'Enterprise'
    }, {
      value: 'NGO',
      text: 'NGO'
    }, {
      value: 'Multilateral',
      text: 'Multilateral'
    }, {
      value: 'Social impact partner',
      text: 'Social impact partner'
    }, {
      value: 'University',
      text: 'University'
    }]
  }, {
    id: 'org-revenue',
    label: 'Organization name',
    type: 'select',
    required: true,
    options: [{
      value: 'greaterThan5M',
      text: '<5M USD'
    }, {
      value: '5M-25M',
      text: '5M - 25M USD'
    }, {
      value: '25M-50M',
      text: '25M - 50M USD'
    }, {
      value: '50M-100M',
      text: '50M - 100M USD'
    }, {
      value: 'lessThan100MUSD',
      text: '>100M USD'
    }]
  }, {
    id: 'org-hq',
    label: 'Organization HQ',
    type: 'text',
    required: true
  }]
}, {
  title: 'Contact',
  items: [{
    id: 'name',
    label: 'Name',
    type: 'text',
    required: true
  }, {
    id: 'title',
    label: 'Title',
    type: 'text',
    required: true
  }, {
    id: 'phone',
    label: 'Phone number',
    type: 'tel',
    required: true
  }, {
    id: 'email',
    label: 'Email address',
    type: 'email',
    required: true
  }]
}];

const getFields = () => {
  return formConfig.map((config, idx) => {
    return <FieldSet key={`form-fieldset-${idx}`} {...config} />;
  });
};


function PartnerInterestForm(props) {
  return (
    <FormContainer {...props}>
      <FormHeader
        title="Sign-up Form"
        subtitle="Please complete the form below and hit submit."
      />
      <form id="partnerForm">
        {getFields()}
        <div className="formControlGroup">
          <button className="button right" type="submit">Submit</button>
        </div>
      </form>
    </FormContainer>
  );
}

module.exports = PartnerInterestForm;
