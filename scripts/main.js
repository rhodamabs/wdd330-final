
  
  // load the header and footer
   function loadHeaderFooter(header,footer) {
    const header = '../partials/header.html';
    const footer = '../partials/footer.html';
    const headerElement = document.getElementById('main-header');
    const footerElement = document.getElementById('main-footer');
    headerElement.innerText= header;
    footerElement.innerText= footer;
  }
  
  loadHeaderFooter(header,footer);