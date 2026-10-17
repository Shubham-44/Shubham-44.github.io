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
