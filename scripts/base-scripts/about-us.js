const menuIcon = document.querySelector('.js-bars');
const sidebar = document.querySelector('.sidebar');
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const aboutUsSection = document.querySelector('main');

menuIcon.addEventListener('click', () => {
  sidebar.classList.toggle('expanded');
  console.log('testing');
  
    sidebarLinks.forEach(element => {

      if(element.classList.contains('hidden')) {
        setTimeout( () => {
          element.classList.remove('hidden');
        }, 225);
      } else {
        setTimeout( () => {
          element.classList.add('hidden');
        }, 50);
      };
    });

    aboutUsSection.classList.toggle('diminished')

});

