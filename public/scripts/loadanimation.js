const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

const hiddenElements = document.querySelectorAll(".slidetrans");
hiddenElements.forEach((el) => observer.observe(el));

const hiddenElementsl = document.querySelectorAll(".slidetransl");
hiddenElementsl.forEach((el) => observer.observe(el));
