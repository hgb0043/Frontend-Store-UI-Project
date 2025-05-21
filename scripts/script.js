const firstName = localStorage.getItem('first-name')

const menuIcon = document.querySelector('.js-bars');
const sidebar = document.querySelector('.sidebar');
const sidebarLinks = document.querySelectorAll('.sidebar-link');

const loginStatus = localStorage.getItem('login-status') || '';
const accountMessage = document.querySelector('.account-message');

if (loginStatus === 'logged-in') {
  document.querySelector('.account-message').innerHTML = `<p class="welcome-message">Welcome back, ${firstName}</p>`
} else {
  document.querySelector('.account-message').innerHTML = `<a href="login.html" class="permanent-header-link">Log in</a> <a href="signup.html" class="permanent-header-link">Sign up</p></a>` 
};

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
});