const projects = {
  peter: {name:'PETER BOX',description:'A custom storefront for unisex sports and lifestyle footwear, with an editorial approach to product presentation.',features:['Responsive storefront and product detail pages','Search, collection filters, UK-size filters, and sorting','Browser-local wishlist and shopping bag','Light and dark colour themes'],status:'Storefront prototype. Product designs are concept visuals; purchases, pricing, and live inventory are not enabled.'},
  pu: {name:'PU LINE SOLUTION',description:'A React website for PUF sandwich panel production-line consultancy, making technical services and components easier to explore.',features:['Service-led homepage and component sections','Responsive navigation and service carousel','Dedicated enquiry page with service preselection','Static build prepared for hosting'],status:'Website preview. Enquiry submission is disabled pending contact and delivery setup. Industrial imagery is conceptual.'},
  icy: {name:'ICY JEWELS',description:'A responsive bracelet ecommerce frontend with customer journeys, custom-piece enquiries, and administrator flows.',features:['Bracelet browsing and product presentation','Customer and administrator interface flows','Craft Your Piece enquiry and proposal workflow','Frontend service structure prepared for backend integration'],status:'Frontend demo. Authentication, payments, inventory, and administrative actions require backend validation before launch.'}
};
const dialog = document.querySelector('#project-dialog');
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
 const project = projects[button.dataset.project];
 document.querySelector('#dialog-title').textContent = project.name;
 document.querySelector('#dialog-description').textContent = project.description;
 document.querySelector('#dialog-status').textContent = project.status;
 document.querySelector('#dialog-features').replaceChildren(...project.features.map(text => {const li=document.createElement('li');li.textContent=text;return li;}));
 dialog.showModal();
}));
document.querySelectorAll('.close,.close-bottom').forEach(button => button.addEventListener('click',()=>dialog.close()));
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
document.querySelector('#year').textContent = new Date().getFullYear();

// Prepare only off-screen blocks; no-JS and reduced-motion visits stay visible.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !motionPreference.matches) {
 const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
   if (!entry.isIntersecting || entry.intersectionRatio < 0.12) return;
   entry.target.classList.add('is-revealed');
   revealObserver.unobserve(entry.target);
  });
 }, {threshold: 0.12, rootMargin: '0px 0px -80px 0px'});
 const revealBlocks = document.querySelectorAll('.section-head, .project, .service-layout > div:first-child, .service-list article, .about > div, .contact');
 revealBlocks.forEach(element => {
  if (element.getBoundingClientRect().top >= window.innerHeight * 0.85) {
   element.classList.add('reveal-pending');
   revealObserver.observe(element);
  }
 });
 // Keyboard navigation should never land in transparent content.
 document.addEventListener('focusin', event => {
  const block = event.target.closest('.reveal-pending');
  if (block) {
   block.classList.add('is-revealed');
   revealObserver.unobserve(block);
  }
 });
 motionPreference.addEventListener('change', event => {
  if (event.matches) {
   revealObserver.disconnect();
   revealBlocks.forEach(element => element.classList.add('is-revealed'));
  }
 });
}

const header = document.querySelector('.header');
const menuToggle = document.querySelector('.menu-toggle');
const mobileNavigation = document.querySelector('#main-navigation');
const mobileViewport = window.matchMedia('(max-width: 700px)');
function setMenuOpen(open) {
 header.classList.toggle('menu-open', open);
 menuToggle.setAttribute('aria-expanded', String(open));
 menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
}
menuToggle.addEventListener('click', () => {
 setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
});
mobileNavigation.addEventListener('click', event => {
 const link = event.target.closest('a');
 if (!link || !mobileViewport.matches) return;
 setMenuOpen(false);
 const section = document.querySelector(link.getAttribute('href'));
 if (section) {
  section.setAttribute('tabindex', '-1');
  section.focus({preventScroll: true});
 }
});
document.addEventListener('keydown', event => {
 if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
  setMenuOpen(false);
  menuToggle.focus();
 }
});
document.addEventListener('pointerdown', event => {
 if (!header.contains(event.target)) setMenuOpen(false);
});
document.addEventListener('focusin', event => {
 if (!header.contains(event.target)) setMenuOpen(false);
});
mobileViewport.addEventListener('change', () => {
 setMenuOpen(false);
 if (mobileViewport.matches && mobileNavigation.contains(document.activeElement)) menuToggle.focus();
 if (!mobileViewport.matches && document.activeElement === menuToggle) mobileNavigation.querySelector('a').focus();
});
menuToggle.hidden = false;
header.classList.add('nav-ready');
