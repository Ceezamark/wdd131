const menuButton = document.querySelector("#menu-button");
const nav = document.querySelector("#primary-nav");
const menuIcon = document.querySelector(".menu-icon");

menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuIcon.textContent = isOpen ? "✕" : "☰";
});

document.querySelector("#current-year").textContent = new Date().getFullYear();

const modified = new Date(document.lastModified);
document.querySelector("#last-modified").textContent =
    modified.toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });
