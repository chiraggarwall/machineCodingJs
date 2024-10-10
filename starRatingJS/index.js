const stars = document.querySelectorAll("i");
const rating = document.querySelector(".rating");
const starContainer = document.querySelector(".stars");

starContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "I") {
    const index1 = Array.from(stars).indexOf(e.target);
    rating.innerText = index1 + 1;
    console.log(rating);
    stars.forEach((star, index) => {
      if (index1 >= index) {
        star.classList.add("active");
      } else {
        star.classList.remove("active");
      }
    });
  }
});

starContainer.addEventListener("mouseover", (e) => {
  if (e.target.tagName === "I") {
    const index1 = Array.from(stars).indexOf(e.target);

    // Temporarily highlight stars on hover
    stars.forEach((star, index) => {
      if (index1 >= index) {
        star.classList.add("hover");
      } else {
        star.classList.remove("hover");
      }
    });
  }
});

starContainer.addEventListener("mouseout", (e) => {
  if (e.target.tagName === "I") {
    // Remove 'hover' class when the mouse leaves the stars
    stars.forEach((star) => {
      star.classList.remove("hover");
    });
  }
});

//apply listener on each star
//then clicked star index get compare with each star index
//
