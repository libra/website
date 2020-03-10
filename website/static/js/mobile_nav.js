document.addEventListener('DOMContentLoaded', function(event) {
  const mainNavToggles = document.querySelectorAll('.main-nav .mobile.side-nav-trigger');
  const mainNav = document.querySelector('.main-nav .navigationWrapper.navigationSlider');
  window.addEventListener('click', (event) => {
    closeMainNav(mainNav, mainNavToggles);
  });
  mainNav.addEventListener('click', (event) => {
    event.stopPropagation();
  });
  mainNavToggles.forEach((node) => {
    node.addEventListener('click', (event) => {
      event.stopPropagation();
      mainNavToggles.forEach((toggle) => {
        toggleVisibility(toggle);
        toggle.classList.contains('trigger-open');
      });
      toggleVisibility(mainNav);
    });
  });
});

function toggleVisibility(node) {
  node.classList.toggle('mobile-hidden');
}

function closeMainNav(mainNav, mainNavToggles) {
  mainNavToggles.forEach((toggle) => {
    if (toggle.classList.contains('trigger-open')) {
      toggle.classList.remove('mobile-hidden');
    } else {
      toggle.classList.add('mobile-hidden');
    }
  });
  mainNav.classList.add('mobile-hidden');
}
