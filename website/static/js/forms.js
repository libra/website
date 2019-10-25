// Turn off ESLint for this file because it's sent down to users as-is.
/* eslint-disable */
!function(){
  var enterpriseFields = [
    'enterpriseField',
  ];

  var vcFields = [
    'enterpriseAssets',
  ];

  var nonVcFields = [
    'enterpriseUserBase',
    'enterpriseCustomerBase',
    'enterpriseMarketCap',
  ];

  function showFields(fields, required) {
    for (var i = 0, fieldId; fieldId = fields[i]; i++) {
      var input = document.getElementById(fieldId);
      var labelSelector = 'label[for="' + fieldId + '"]';
      var label = document.querySelector(labelSelector);
      if (input) {
        input.parentElement.classList.remove('hidden');
        if (required) {
          input.required = true;
          if (label) {
             label.classList.add('required');
          }
        }
      }
    }
  }

  function hideFields(fields, required) {
    for (var i = 0, fieldId; fieldId = fields[i]; i++) {
      var input = document.getElementById(fieldId);
      var labelSelector = 'label[for="' + fieldId + '"]';
      var label = document.querySelector(labelSelector);
      if (input) {
        input.parentElement.classList.add('hidden');
        input.value = '';
        input.required = false;
        if (label) {
           label.classList.remove('required');
        }
      }
    }
  }

  function handleOrgTypeChange(val) {
    if (val === 'Enterprise') {
      showFields(enterpriseFields, true);
    } else {
      hideFields(enterpriseFields);
      hideFields(nonVcFields);
      hideFields(vcFields);
    }
  }

  function handleEnterpriseChange(val) {
    if (val === 'VCIForg') {
      showFields(vcFields, true);
      hideFields(nonVcFields);
    } else {
      hideFields(vcFields);
      showFields(nonVcFields, true);
    }
  }

  document.addEventListener('DOMContentLoaded', function(event) {
    // Do not add search on form pages
    const search = document.querySelector('.navSearchWrapper.reactNavSearchWrapper');
    if (search && document.forms.length > 0) {
      // The following does not work on IE 11: search.remove();
      search.outerHTML = "";
    }

    var orgInput = document.getElementById('organizationType');
    if (orgInput) {
      orgInput.addEventListener('change', function(event) {
        handleOrgTypeChange(orgInput.value);
      });
    }

    var enterpriseInput = document.getElementById('enterpriseField');
    if (enterpriseInput) {
      enterpriseInput.addEventListener('change', function(event) {
        handleEnterpriseChange(enterpriseInput.value);
      });
    }
  });

}();
