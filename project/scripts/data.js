export const dishes = [
    {
        id: "jollof-rice",
        name: "Jollof Rice",
        type: "Main dish",
        regions: ["Nationwide"],
        spice: 3,
        image: "images/jollof-rice.jpg",
        alt: "A plate of smoky red jollof rice served with fried plantain",
        featured: true,
        description: "A one-pot rice dish cooked in a rich tomato and pepper sauce until every grain is tender and lightly smoky. Jollof rice is the centerpiece of weddings, birthdays, and holiday tables across Nigeria.",
        ingredients: ["Long-grain parboiled rice", "Tomatoes", "Red bell peppers (tatashe)", "Scotch bonnet pepper", "Onions", "Thyme and curry powder", "Vegetable oil"],
        serving: "Jollof rice is often served with fried plantain, grilled chicken, or coleslaw. Many cooks prize the lightly browned layer at the bottom of the pot, which gives party jollof its smoky flavor."
    },
    {
        id: "pounded-yam-egusi",
        name: "Pounded Yam and Egusi Soup",
        type: "Soup and swallow",
        regions: ["Southwest", "Southeast"],
        spice: 2,
        image: "images/pounded-yam.jpg",
        alt: "A smooth mound of pounded yam beside a bowl of green and orange egusi soup",
        featured: true,
        description: "Boiled yam is pounded until it is smooth and stretchy, then eaten with a thick soup made from ground melon seeds, palm oil, leafy vegetables, and meat or fish.",
        ingredients: ["Yam", "Ground egusi (melon seeds)", "Palm oil", "Leafy greens such as ugu or bitterleaf", "Dried crayfish", "Assorted meat or fish", "Locust beans (iru)", "Peppers and onions"],
        serving: "Pinch off a small piece of pounded yam, roll it into a ball with your fingers, and use it to scoop up the soup. It is called a swallow because it is swallowed rather than chewed."
    },
    {
        id: "suya",
        name: "Suya",
        type: "Grilled meat",
        regions: ["North"],
        spice: 4,
        image: "images/suya.jpg",
        alt: "Skewers of grilled suya beef topped with sliced onions and tomatoes",
        featured: true,
        description: "Thin slices of meat are coated in yaji, a spice mix made from ground peanuts and peppers, and then grilled over an open flame. Suya began with the Hausa people of northern Nigeria and is now a favorite street snack across the country.",
        ingredients: ["Thinly sliced beef, chicken, or ram", "Yaji spice mix", "Ground peanuts", "Ginger", "Cayenne pepper", "Onion powder", "Groundnut oil", "Fresh onions and tomatoes"],
        serving: "Suya is usually sold in the evening at roadside stands. The vendor wraps it in paper and tops it with sliced onions, tomatoes, and a sprinkle of extra yaji."
    },
    {
        id: "moi-moi",
        name: "Moi Moi",
        type: "Steamed bean pudding",
        regions: ["Nationwide"],
        spice: 2,
        image: "images/moi-moi.jpg",
        alt: "Slices of firm, golden moi moi on a plate with a boiled egg inside",
        featured: false,
        description: "A soft, steamed pudding made from blended black-eyed peas, peppers, onions, and oil. Cooks wrap the mixture in leaves or pour it into small containers and steam it until it is firm.",
        ingredients: ["Peeled black-eyed peas", "Red bell peppers", "Scotch bonnet pepper", "Onions", "Palm or vegetable oil", "Dried crayfish", "Boiled eggs or fish (optional)"],
        serving: "Moi moi is eaten on its own, with ogi (a smooth corn pudding), or beside jollof rice at parties and family meals."
    },
    {
        id: "akara",
        name: "Akara",
        type: "Fried snack",
        regions: ["Southwest"],
        spice: 2,
        image: "images/akara.jpg",
        alt: "A pile of golden brown akara bean fritters",
        featured: false,
        description: "Crispy on the outside and fluffy on the inside, akara is made by whipping peeled black-eyed pea paste and deep-frying spoonfuls of it. It is a popular breakfast in southwestern Nigeria and is sold on streets across the country.",
        ingredients: ["Peeled black-eyed peas", "Onions", "Scotch bonnet pepper", "Salt", "Vegetable oil for frying"],
        serving: "Akara tastes best hot from the pan. People often eat it with ogi or tuck it into fresh bread."
    },
    {
        id: "puff-puff",
        name: "Puff-Puff",
        type: "Fried snack",
        regions: ["Nationwide"],
        spice: 0,
        image: "images/puff-puff.jpg",
        alt: "Golden, round Nigerian puff-puff balls arranged on a plate",
        featured: false,
        description: "Puff-puff is a popular Nigerian street snack made from a soft yeast dough that is deep-fried until golden brown on the outside and fluffy on the inside. It is commonly enjoyed at parties, family gatherings, and as an everyday treat.",
        ingredients: ["All-purpose flour", "Yeast", "Sugar", "Warm water", "Salt", "Vegetable oil for frying"],
        serving: "Puff-puff is best served warm as a snack. It can be enjoyed on its own or dusted with sugar, and it is often served alongside other small chops at Nigerian celebrations."
    }
];

export const ingredients = [
    { name: "Palm oil", localName: "Epo pupa", category: "Flavor", description: "Red oil pressed from palm fruit. It gives soups and stews their bright color and deep, earthy flavor.", usedIn: ["Egusi Soup", "Moi Moi"] },
    { name: "Scotch bonnet pepper", localName: "Ata rodo", category: "Flavor", description: "A small, very hot pepper with a fruity smell. A little goes a long way.", usedIn: ["Jollof Rice", "Moi Moi", "Akara"] },
    { name: "Tomato and pepper base", localName: "", category: "Vegetable", description: "Tomatoes, red bell peppers (tatashe), and onions are blended and fried to make the sauce that gives many stews and rice dishes their color.", usedIn: ["Jollof Rice", "Moi Moi"] },
    { name: "Long-grain rice", localName: "Shinkafa", category: "Staple", description: "Parboiled long-grain rice stays firm while it simmers in sauce, which makes it ideal for jollof rice.", usedIn: ["Jollof Rice"] },
    { name: "Yam", localName: "Isu", category: "Staple", description: "A starchy tuber that can be boiled, fried, roasted, or pounded into a smooth swallow.", usedIn: ["Pounded Yam"] },
    { name: "Plantain", localName: "Dodo (when fried)", category: "Staple", description: "A cooking banana that is sliced and fried until golden and sweet. It is a popular side dish.", usedIn: ["Jollof Rice"] },
    { name: "Black-eyed peas", localName: "Ewa", category: "Protein", description: "Peeled and blended into a smooth paste, these beans are the base of both moi moi and akara.", usedIn: ["Moi Moi", "Akara"] },
    { name: "Egusi", localName: "Melon seeds", category: "Protein", description: "Dried melon seeds are ground and cooked in palm oil to make a rich, thick soup.", usedIn: ["Egusi Soup"] },
    { name: "Dried crayfish", localName: "Isapa", category: "Protein", description: "Small dried shrimp that are ground or added whole to give soups, stews, and bean dishes a savory depth.", usedIn: ["Egusi Soup", "Moi Moi"] },
    { name: "Locust beans", localName: "Iru, ogiri, or dawadawa", category: "Flavor", description: "Fermented seeds with a strong smell and a deep savory taste. Cooks use them much like a seasoning.", usedIn: ["Egusi Soup"] },
    { name: "Fluted pumpkin leaves", localName: "Ugu", category: "Vegetable", description: "Tender green leaves that are chopped and stirred into soups just before serving.", usedIn: ["Egusi Soup"] },
    { name: "Yaji", localName: "Suya spice", category: "Flavor", description: "A dry spice mix of ground peanuts, ginger, cayenne pepper, and onion powder that coats grilled suya.", usedIn: ["Suya"] }
];
