// Track completed reviews in localStorage
let count = parseInt(localStorage.getItem("reviewCount"), 10) || 0;
count += 1;
localStorage.setItem("reviewCount", count);
document.querySelector("#review-count").textContent = count;

// Footer
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#modified").textContent = document.lastModified;
