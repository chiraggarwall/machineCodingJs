const divs = document.querySelectorAll(".img");

divs.forEach((element, index) => {
  element.style.left = `${index * 100}%`;
  console.log(index);
});

function fetchImages() {
  divs.forEach((element, index) => {
    fetch(`https://picsum.photos/id/${236 + index}/1000/500`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok"); //As fetch API separates network errors(which cause rejection) from HTTP status codes(not treated as errors).
        }
        return response.blob(); //converting to blob format
      })
      .then((blob) => {
        const imgUrl = URL.createObjectURL(blob); //creating url from blob
        element.src = imgUrl; //assigning url to element src
      })
      .catch((error) => console.error("Fetch error:", error));
  });
}

fetchImages(); // Initialfetch
let a = 0;
function next() {
  if (a == divs.length - 1) {
    a = 0;
    move();
  } else {
    a = a + 1;
    move();
  }
  move();
}

function prev() {
  if (a == 0) {
    a = divs.length - 1;
    move();
  } else {
    a = a - 1;
    move();
  }
}

function move() {
  divs.forEach((element) => {
    element.style.transform = `translate(${a * -100}%)`; //changes position from original position
  });
}

//container-relative
//img-absolute
//move each image to left by index*100
//next =>a=a+1 => move()=>element.stlye.transform=translatex(a*-100%)
//prev =>a=a-1 => move()=>element.stlye.transform=translatex(a*-100%)
