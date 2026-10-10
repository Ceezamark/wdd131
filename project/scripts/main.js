import { dishes, ingredients } from "./data.js";

const FAVORITES_KEY = "tasteOfNigeria.favorites";
const SUBMISSIONS_KEY = "tasteOfNigeria.submissions";
const VISITS_KEY = "tasteOfNigeria.visits";
const NAME_KEY = "tasteOfNigeria.visitorName";
const COMMENT_LIMIT = 300;

/* Storage helpers */

function loadList(key) {
    try {
        const stored = JSON.parse(localStorage.getItem(key));
        return Array.isArray(stored) ? stored : [];
    } catch (error) {
        return [];
    }
}

function saveValue(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.warn(`Could not save "${key}" to localStorage.`);
    }
}

function loadValue(key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (error) {
        return null;
    }
}

function toggleFavorite(id) {
    const saved = loadList(FAVORITES_KEY);
    const updated = saved.includes(id)
        ? saved.filter(savedId => savedId !== id)
        : [...saved, id];
    saveValue(FAVORITES_KEY, updated);
    return updated;
}

/* Shared page features */

function setupNavigation() {
    const toggle = document.querySelector("#nav-toggle");
    const nav = document.querySelector("#site-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", `${isOpen}`);
        toggle.textContent = isOpen ? "Close" : "Menu";
    });
}

function setupFooter() {
    const year = document.querySelector("#current-year");
    const modified = document.querySelector("#last-modified");
    if (year) year.textContent = `${new Date().getFullYear()}`;
    if (modified) modified.textContent = `Last modified: ${document.lastModified}`;
}

/* Dish cards */

function getSpiceLabel(level) {
    if (level >= 4) {
        return "Hot";
    } else if (level === 3) {
        return "Medium";
    }
    return "Mild";
}

function createDishCard(dish, isSaved) {
    const ingredientItems = dish.ingredients.map(item => `<li>${item}</li>`).join("");
    const regionText = dish.regions.join(", ");

    return `
    <article class="card">
      <img src="${dish.image}" alt="${dish.alt}" width="800" height="600" loading="lazy">
      <div class="card-body">
        <h3>${dish.name}</h3>
        <p class="meta">${dish.type}</p>
        <p class="meta">Popular in: ${regionText}</p>
        <p>${dish.description}</p>
        <p class="spice">Spice level: ${getSpiceLabel(dish.spice)}</p>
        <details>
          <summary>Ingredients and how it is served</summary>
          <h4>Main ingredients</h4>
          <ul>${ingredientItems}</ul>
          <p>${dish.serving}</p>
        </details>
        <button type="button" class="button button-toggle save-button" data-id="${dish.id}" aria-pressed="${isSaved}">
          ${isSaved ? "Saved" : "Save this dish"}
        </button>
      </div>
    </article>`;
}

function renderDishes(container, dishList) {
    const saved = loadList(FAVORITES_KEY);
    container.innerHTML = dishList
        .map(dish => createDishCard(dish, saved.includes(dish.id)))
        .join("");
}

function handleSaveClick(event, afterChange) {
    const button = event.target.closest(".save-button");
    if (!button) return;

    const saved = toggleFavorite(button.dataset.id);
    const isSaved = saved.includes(button.dataset.id);
    button.setAttribute("aria-pressed", `${isSaved}`);
    button.textContent = isSaved ? "Saved" : "Save this dish";

    if (afterChange) afterChange();
}

function setupHomePage() {
    const featured = document.querySelector("#featured-dishes");
    const message = document.querySelector("#visit-message");
    if (!featured || !message) return;

    renderDishes(featured, dishes.filter(dish => dish.featured));
    featured.addEventListener("click", event => handleSaveClick(event));

    const visits = (Number(loadValue(VISITS_KEY)) || 0) + 1;
    saveValue(VISITS_KEY, visits);
    const name = loadValue(NAME_KEY);

    if (visits === 1) {
        message.textContent = "Welcome to Taste of Nigeria! Start with the popular dishes below.";
    } else if (name) {
        message.textContent = `Welcome back, ${name}! This is visit number ${visits}.`;
    } else {
        message.textContent = `Welcome back! This is visit number ${visits}.`;
    }
}

function setupDishesPage() {
    const list = document.querySelector("#dish-list");
    const regionFilter = document.querySelector("#region-filter");
    const savedOnly = document.querySelector("#saved-only");
    const status = document.querySelector("#dish-status");
    if (!list || !regionFilter || !savedOnly || !status) return;

    function getVisibleDishes() {
        const saved = loadList(FAVORITES_KEY);
        return dishes.filter(dish => {
            const matchesRegion =
                regionFilter.value === "all" ||
                dish.regions.includes("Nationwide") ||
                dish.regions.includes(regionFilter.value);
            const matchesSaved = !savedOnly.checked || saved.includes(dish.id);
            return matchesRegion && matchesSaved;
        });
    }

    function update() {
        const visible = getVisibleDishes();
        const savedCount = loadList(FAVORITES_KEY).length;
        renderDishes(list, visible);

        if (visible.length === 0) {
            status.textContent = "No dishes match these filters. Save a dish or choose a different region.";
        } else {
            status.textContent = `Showing ${visible.length} of ${dishes.length} dishes. You have saved ${savedCount}.`;
        }
    }

    regionFilter.addEventListener("change", update);
    savedOnly.addEventListener("change", update);
    list.addEventListener("click", event => {
        handleSaveClick(event, () => {
            if (savedOnly.checked) {
                update();
            } else {
                const savedCount = loadList(FAVORITES_KEY).length;
                status.textContent = `Showing ${getVisibleDishes().length} of ${dishes.length} dishes. You have saved ${savedCount}.`;
            }
        });
    });

    update();
}

/* Ingredients */

function createIngredientCard(item) {
    const localName = item.localName
        ? `<p class="meta">Local name: ${item.localName}</p>`
        : "";

    return `
    <article class="card ingredient">
      <div class="card-body">
        <h3>${item.name}</h3>
        <p class="meta">${item.category}</p>
        ${localName}
        <p>${item.description}</p>
        <p class="meta">Used in: ${item.usedIn.join(", ")}</p>
      </div>
    </article>`;
}

function setupIngredientsPage() {
    const list = document.querySelector("#ingredient-list");
    const filters = document.querySelector("#ingredient-filters");
    const status = document.querySelector("#ingredient-status");
    if (!list || !filters || !status) return;

    function showCategory(category) {
        const matches = category === "All"
            ? ingredients
            : ingredients.filter(item => item.category === category);
        const sorted = [...matches].sort((a, b) => a.name.localeCompare(b.name));

        list.innerHTML = sorted.map(createIngredientCard).join("");
        status.textContent = `Showing ${sorted.length} of ${ingredients.length} ingredients.`;
    }

    filters.addEventListener("click", event => {
        const button = event.target.closest("button");
        if (!button) return;

        filters.querySelectorAll("button").forEach(other => {
            other.setAttribute("aria-pressed", `${other === button}`);
        });
        showCategory(button.dataset.category);
    });

    showCategory("All");
}

/* Contact form */

function setupContactForm() {
    const form = document.querySelector("#favorite-form");
    if (!form) return;

    const dishSelect = form.elements.favoriteDish;
    const comment = form.elements.comment;
    const hint = document.querySelector("#comment-hint");
    const counter = document.querySelector("#comment-counter");
    const message = document.querySelector("#form-message");
    const history = document.querySelector("#submission-history");

    dishSelect.innerHTML = `
    <option value="">Choose a dish</option>
    ${dishes.map(dish => `<option value="${dish.id}">${dish.name}</option>`).join("")}
    <option value="other">Another Nigerian dish</option>`;

    const storedName = loadValue(NAME_KEY);
    if (storedName) form.elements.name.value = storedName;

    function updateCounter() {
        counter.textContent = `${COMMENT_LIMIT - comment.value.length} characters left`;
    }

    function updateHistory() {
        const submissions = loadList(SUBMISSIONS_KEY);
        if (submissions.length === 0) {
            history.textContent = "You have not shared a dish from this browser yet.";
            return;
        }
        const last = submissions[submissions.length - 1];
        const noun = submissions.length === 1 ? "dish" : "dishes";
        history.textContent = `You have shared ${submissions.length} ${noun} from this browser. Your latest was ${last.dishName}.`;
    }

    dishSelect.addEventListener("change", () => {
        const isOther = dishSelect.value === "other";
        comment.required = isOther;
        hint.textContent = isOther
            ? "Required: tell us the name of the dish you chose."
            : "Optional: tell us why you love this dish.";
    });

    comment.addEventListener("input", updateCounter);

    form.addEventListener("submit", event => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const data = Object.fromEntries(new FormData(form));
        const chosen = dishes.find(dish => dish.id === data.favoriteDish);
        const entry = {
            name: data.name.trim(),
            dishName: chosen ? chosen.name : "another Nigerian dish",
            spice: data.spice,
            cookedAtHome: form.elements.cooked.checked,
            comment: data.comment.trim(),
            savedOn: new Date().toISOString()
        };

        const submissions = loadList(SUBMISSIONS_KEY);
        submissions.push(entry);
        saveValue(SUBMISSIONS_KEY, submissions);
        saveValue(NAME_KEY, entry.name);

        message.textContent = `Thank you, ${entry.name}! Your favorite, ${entry.dishName}, is saved on this device.`;
        message.classList.add("visible");
        form.reset();
        form.elements.name.value = entry.name;
        comment.required = false;
        hint.textContent = "Optional: tell us why you love this dish.";
        updateCounter();
        updateHistory();
    });

    updateCounter();
    updateHistory();
}

/* Start */

setupNavigation();
setupFooter();
setupHomePage();
setupDishesPage();
setupIngredientsPage();
setupContactForm();
