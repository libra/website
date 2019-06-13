// Turn off ESLint for this file because it's sent down to users as-is.
/* eslint-disable */

/**
 * Add the segment loader to the page
 */
const script = document.createElement('script');
script.innerHTML = `
 ! function() { var analytics = window.analytics = window.analytics || []; if (!analytics.initialize)
     if (analytics.invoked) window.console && console.error && console.error("Segment snippet included twice.");
     else { analytics.invoked = !0;
       analytics.methods = ["trackSubmit", "trackClick", "trackLink", "trackForm", "pageview", "identify", "reset", "group", "track", "ready", "alias", "debug", "page", "once", "off", "on"];
       analytics.factory = function(t) { 
         return function() { 
           var e = Array.prototype.slice.call(arguments);
           e.unshift(t);
           analytics.push(e); 
           return analytics; 
         } 
       }; 
       for (var t = 0; t < analytics.methods.length; t++) { 
         var e = analytics.methods[t];
         analytics[e] = analytics.factory(e) 
       } 
       // analytics.load = function(t, e) { 
       //   var n = document.createElement("script");
       //   n.type = "text/javascript";
       //   n.async = !0;
       //   // n.src = "https://cdn.segment.com/analytics.js/v1/" + t + "/analytics.min.js"; 
       //   n.src = "INTERNAL CDN";
       //   var a = document.getElementsByTagName("script")[0];
       //   a.parentNode.insertBefore(n, a);
       //   analytics._loadOptions = e 
       //  };
       analytics.SNIPPET_VERSION = "4.1.0";

    // analytics.load("Llc3xSsbfceDLVBzwOJKoJSkSHMRoj8V");
    analytics.page();
  }}();    
`;
document.getElementsByTagName('head')[0].appendChild(script);

/**
 * Find the form on the loaded page and send segment the form data on submit
 */
document.addEventListener('DOMContentLoaded', (event) => {
  const forms = document.forms;
  for (i = 0; i < forms.length; i++) {
    const form = forms[i];
    trackFormData(form);
  }
});

/**
 * Get all the input and select fields from a form.
 */
function getFormFields(form) {
  const fields = [];
  // Iterate over the form controls
  for (i = 0; i < form.elements.length; i++) {
    const el = form.elements[i];
    if (el.nodeName === 'INPUT' || el.nodeName === 'SELECT') {
      fields.push(el);
    }
  }
  return fields;
}

/**
 * Filter an object by an array of fields passed in.
 */
function filterFields(data, fields) {
  const filtered = Object.keys(data)
    .filter(key => fields.includes(key))
    .reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {});

  return filtered;
}

function addOrganization(data) {
  const fields = [
    'organizationId',
    'organizationHQ',
    'organizationRevenue',
    'organizationType',
    'organizationWebsite',
  ];
  const filteredData = filterFields(data, fields);  
  const groupId = data.organizationId;
  const groupData = {
    ...filteredData,
    name: filteredData.organizationId,
  };
 
  analytics.group(groupId, groupData);
}

function addUser(data) {
  const fields = [
    'email',
    'firstName',
    'lastName',
    'phone',
    'title',
    'formId', 
    'organizationId',
  ];
  const filteredData = filterFields(data, fields);
  analytics.identify(filteredData.email, filteredData);
}

/**
 * Sends the submitted form data to segment in a track call.
 */
function trackFormData(form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const fields = getFormFields(form);
    const data = {
      formId: form.id,
    };
    fields.forEach(function(field) {
      data[field.id] = field.value;
    });

    analytics.track('Form Submitted', data)

    if (form.id === 'newsletterForm') {
      // A name is required for adding users
      data.name = data.email;
    }

    if (data.organizationId) {
      addOrganization(data);
    }
    addUser(data);
  })
}
