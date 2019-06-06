/**
 * Form for the Partner Interest data.
 */
const React = require('react');

const FormContainer = require(`${process.cwd()}/core/ContactForm/form-container.js`);


const formFields = [{
  items: [{
    id: 'first-name',
    label: 'First name',
    type: 'text',
    required: true
  }, {
    id: 'last-name',
    label: 'Last name',
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
},{
  items: [{
    id: 'org-name',
    label: 'Organization name',
    type: 'text',
    required: true
  }, {
    id: 'org-website',
    label: 'Organization website',
    type: 'url',
    required: true
  }, {
    id: 'org-type',
    label: 'Organization type',
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
    label: 'Organization revenue',
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
}, ];

function PartnerInterestForm(props) {
  return (
    <FormContainer
      {...props}
      formId="partnerForm"
      fields={formFields}
      title="Sign-up Form"
      subtitle="Please complete the form below and hit submit."
    />
  );
}

module.exports = PartnerInterestForm;
