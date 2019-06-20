// Turn off ESLint for this file because it's sent down to users as-is.
/* eslint-disable */
!function(){

  document.addEventListener('DOMContentLoaded', (event) => {
    // Do not add search on form pages
    const search = document.querySelector('.navSearchWrapper.reactNavSearchWrapper');
    if (search && document.forms.length > 0) {
      search.remove();
    }
  });
}();
