document.addEventListener('DOMContentLoaded', function(event) {
  console.log('attached');
  const mainNavToggles = document.querySelectorAll('.main-nav .mobile.side-nav-trigger');
  const mainNav = document.querySelector('.main-nav .navigationWrapper.navigationSlider');
  mainNavToggles.forEach((node) => {
    node.addEventListener('click', () => {
      mainNavToggles.forEach((toggle) => {
        toggleVisibility(toggle);
      });
      toggleVisibility(mainNav);
    });
  });
});

function toggleVisibility(node) {
  node.classList.toggle('mobile-hidden');
}
