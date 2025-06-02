// DON'T DELETE! Delete turtle-ratings.html and the "Check result"s section if no longer needed but NOT THE REST OF THE FILE

  for (let i = 1; i <= 5; i+= 0.5) {
    turtle = '';

    // Generate full turtle icons
    for (let index = 1; index <= i; index++) {
        turtle += `<img class="turtle-icon" src="/images/base-images/turtle-icon.png">`;
    }

    // Generate half turtle icons
    if ((i % 1) === 0.5) {
      turtle += `<img 
      class="turtle-icon" 
      id="halved-turtle-icon"
      src="/images/base-images/halved-turtle-icon.png">`
    }
    localStorage.setItem(`${i}star-turtle-rating`, turtle);
  }

console.log(localStorage.getItem('4.5star-turtle-rating'));

// Check results
for (let i = 1; i <= 5; i+= 0.5) {
  console.log(localStorage.getItem(`${i}star-turtle-rating`));
}