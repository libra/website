// Turn off ESLint for this file because it's sent down to users as-is.
/* eslint-disable */

!function(){
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
         analytics.SNIPPET_VERSION = "4.1.0";
      analytics.page();
    }}();
  `;
  document.getElementsByTagName('head')[0].appendChild(script);

  function testSegment() {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status === 0) {
        toggleAdBlockModal(true)
      }
    }
    request.open('POST','https://api.segment.io/v1/p');
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(null);
  }

  /**
   * Find the form on the loaded page and send segment the form data on submit
   */
  document.addEventListener('DOMContentLoaded', (event) => {
    testSegment();
    const forms = document.forms;
    for (i = 0; i < forms.length; i++) {
      const form = forms[i];
      trackFormData(form);
    }
  });

  function toggleEnabledFormButton(on) {
    const button = document.querySelector("button[type='submit']")
    if (on) {
      button.setAttribute("disabled", "disabled");
    } else {
      button.removeAttribute("disabled");
    }
  }

  function toggleAdBlockModal(on) {
    const modal = document.getElementById('disable-ad-block');
    if (on) {
      modal.classList.add('visible');
    } else {
      modal.classList.remove('visible');
    }
  }

  /**
   * Get the Segment event name by using the form's ID.
   *
   * Segment allows you to track by events and eventually retire an event name.
   * Being specific with an event name will help us maintain the full lifecycle
   * of events.
   */
  function getTrackFormEventName(form) {
    switch (form.id) {
      case 'partnerForm':
        return 'Partner Form Submit';
      case 'newsletterForm':
        return 'Newsletter Form Submit';
      default:
        return 'Form Submit';
    }
  }

  /**
   * Get all the input and select fields from a form.
   */
  function getFormFields(form) {
    const fields = [];
    // Iterate over the form controls
    for (i = 0; i < form.elements.length; i++) {
      const el = form.elements[i];
      if (el.nodeName === 'INPUT' ||
          el.nodeName === 'SELECT' ||
          el.nodeName === 'TEXTAREA') {
        fields.push(el);
      }
    }
    return fields;
  }

  /**
   * Filter an object by an array of fields passed in. If a mapping
   * is passed in we change the key.
   */
  function filterFields(data, fields, mapping) {
    const filtered = Object.keys(data)
      .filter(key => fields.includes(key))
      .reduce((obj, key) => {
        const mapKey = (mapping && mapping[key]) || key;
        obj[mapKey] = data[key];
        return obj;
      }, {});

    return filtered;
  }

  function addGroup(data) {
    const fields = [
      'organizationId',
      'organizationHQ',
      'organizationRevenue',
      'organizationType',
      'organizationWebsite',
    ];
    const filteredData = filterFields(data, fields);
    const groupId = filteredData.organizationId;
    const groupData = {
      ...filteredData,
      name: groupId,
    };

    analytics.group(groupId, groupData);
  }

  function addIndentity(data, form) {
    const fields = [
      'email',
      'firstName',
      'lastName',
      'phone',
      'title',
      'formId',
      'organizationId',
    ];

    // Using organizationId here will set off some automagic segment configuration
    // causing the call to Zendesk to fail. organizationId needs to be an int.
    const mapping = {
      organizationId: 'orgName'
    };

    const filteredData = filterFields(data, fields, mapping);
    analytics.identify(filteredData.email, filteredData);
  }

  /**
   * Sends the submitted form data to segment in a track call.
   */
  function trackFormData(form) {
    // FIXME: This needs to be in sync with the siteConfig
    const baseUrl = '/docs/';

    form.addEventListener('submit', (e) => {
      e.preventDefault()
      toggleEnabledFormButton(false);

      const fields = getFormFields(form);
      const data = {
        formId: form.id,
      };
      fields.forEach(function(field) {
        data[field.id] = field.value;
      });

      const trackName = getTrackFormEventName(form);
      // Dump the raw form data into the event.
      analytics.track(trackName, data)

      if (form.id === 'newsletterForm') {
        // A name is required for adding users to Zendesk
        data.name = data.email;
      }

      addIndentity(data, form);

      if (data.organizationId) {
        addGroup(data);
      }

      setTimeout(function() {
        toggleEnabledFormButton(true);
        window.location.replace(`/form-thanks`);
      }, 500);

    })
  }
}();
