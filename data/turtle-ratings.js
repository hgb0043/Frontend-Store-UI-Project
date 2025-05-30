// DON'T DELETE! Delete turtle-ratings.html if not needed but NOT THIS FILE.

// Create localStorage variable for each possible review rating
let turtle = '';
  for(let i = 1; i <= 5; i++) {
    turtle = '';
    for(let index = 1; index <= i; index++) {
        turtle += `<img class="turtle-icon", src="/images/base-images/turtle-icon.png">`;
    }
    localStorage.setItem(`${i}star-turtle-rating`, turtle);  
}

// Check results
for(let i = 1; i <= 5; i++) {
  console.log(localStorage.getItem(`${i}star-turtle-rating`));
}