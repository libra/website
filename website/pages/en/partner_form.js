/**
 * Form for the Partner Interest data.
 */
const React = require('react');

const FormContainer = require(`${process.cwd()}/core/ContactForm/form-container.js`);

/**
 * NOTE: These ids should map to the Segment Zendesk mapping.
 * https://segment.com/docs/destinations/zendesk/
 */
const formFields = [{
  items: [{
    id: 'firstName',
    label: 'First name',
    type: 'text',
    required: true
  }, {
    id: 'lastName',
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
    id: 'interestsAndExpertise',
    label: 'Describe why you’re interested in joining Libra and the expertise you’d bring to the network (1000 characters max)',
    type: 'textarea',
    maxLength: '1000',
    rows: '5',
    required: true
  }, {
    id: 'projects',
    label: 'Please provide a list of your current projects related to Blockchain, include links (1000 characters max)',
    type: 'textarea',
    maxLength: '1000',
    rows: '5',
    required: true
  }, {
    id: 'sip',
    label: 'SIP',
    type: 'select',
    required: true,
    options: [{
      value: 'Yes',
      text: 'Yes'
    }, {
      value: 'No',
      text: 'No'
    }]
  }]
},{
  items: [{
    id: 'organizationId',
    label: 'Organization name',
    type: 'text',
    required: true
  }, {
    id: 'organizationWebsite',
    label: 'Organization website',
    type: 'url',
    required: true
  }, {
    id: 'organizationType',
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
    id: 'organizationRevenue',
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
    id: 'organizationHQ',
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
      title="Partner Interest"
      subtitle="Please complete the form below and hit submit."
    />
  );
}

module.exports = PartnerInterestForm;
