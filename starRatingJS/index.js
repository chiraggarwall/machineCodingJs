const stars = document.querySelectorAll("i");
const rating = document.querySelector(".rating");

stars.forEach((star, index1) => {
  console.log(index1);
  star.addEventListener("click", (e) => {
    rating.innerText = index1 + 1;
    console.log(index1);
    stars.forEach((star, index2) => {
      console.log(index2);
      if (index1 >= index2) {
        star.classList.add("active");
      } else {
        star.classList.remove("active");
      }
    });
  });

  star.addEventListener("mouseover", () => {
    stars.forEach((star, index2) => {
      if (index1 >= index2) {
        star.classList.add("hover");
      }
    });
  });

  star.addEventListener("mouseout", () => {
    stars.forEach((star) => {
      star.classList.remove("hover");
    });
  });
});

//apply listener on each star
//then clicked star index get compare with each star index
//