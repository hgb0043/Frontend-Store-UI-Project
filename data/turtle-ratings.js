let turtle = '';
  for(let i = 1; i < 6; i++) {
    turtle = '';
    for(let index = 1; index < (i + 1); index++) {
        turtle += `<img class="turtle-icon", src="/images/turtle-icon.png">`

    localStorage.setItem(`${i}star-turtle-rating`, turtle);  
  }
}

for(let i = 1; i < 6; i++) {
console.log(localStorage.getItem(`${i}star-turtle-rating`));
}