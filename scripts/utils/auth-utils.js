// Controls visibility of password through the eye icon
export function eyeEventListener(eye, box) {
  eye.addEventListener('click', () => {
    if (box.type === "password") {
    box.type = "text";
    } else if (box.type === "text") {
      box.type = "password";
    } 
  });
}