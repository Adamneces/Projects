/*const cocktails = [
    {
        photo: "",
        name: 'Cosmopolitan',
        base: ['Vodka'],
        ingredients: 'vodka, cranberry, lime',
        taste: 'sweet'
    },
    {
        photo: "",
        name: 'Whisky Sour',
        base: ['Whisky'],
        ingredients: 'whisky, lemon, egg white',
        taste: 'sour'
    },
    {
        photo: "",
        name: 'Sex on the Beach',
        base: ['Vodka', 'Rum'],
        ingredients: 'vodka, peach, orange',
        taste: 'very sweet'
    },
    {
        photo: "",
        name: 'Long Island Iced Tea',
        base: ['Vodka', 'Rum', 'Gin', 'Tequila'],
        ingredients: 'vodka, rum, gin, tequila, triple sec, sour mix, cola',
        taste: 'strong'
    },
    {
        photo: "",
        name: 'Margarita',
        base: ['Tequila'],
        ingredients: 'tequila, lime juice, triple sec',
        taste: 'tangy'
    },
    {
        photo: "",
        name: 'Martini',
        base: ['Gin', 'Vodka'],
        ingredients: 'gin or vodka, vermouth, olives',
        taste: 'dry'
    },
    {
        photo: "",
        name: 'Piña Colada',
        base: ['Rum'],
        ingredients: 'rum, coconut cream, pineapple juice',
        taste: 'tropical'
    },
    {
        photo: "",
        name: 'Mojito',
        base: ['Rum'],
        ingredients: 'rum, mint, lime juice, sugar, soda water',
        taste: 'refreshing'
    },
    {
        photo: "",
        name: 'Daiquiri',
        base: ['Rum'],
        ingredients: 'rum, lime juice, simple syrup',
        taste: 'tangy'
    },
    {
        photo: "",
        name: 'Bloody Mary',
        base: ['Vodka'],
        ingredients: 'vodka, tomato juice, various spices',
        taste: 'savory'
    },
    {
        photo: "",
        name: 'Old Fashioned',
        base: ['Whisky'],
        ingredients: 'whisky, sugar, bitters, orange twist',
        taste: 'classic'
    },
    {
        photo: "",
        name: 'Gin and Tonic',
        base: ['Gin'],
        ingredients: 'gin, tonic water, lime wedge',
        taste: 'crisp'
    },
    {
        photo: "",
        name: 'Blue Lagoon',
        base: ['Vodka'],
        ingredients: 'vodka, blue curaçao, lemonade',
        taste: 'tropical'
    },
    {
        photo: "",
        name: 'Tequila Sunrise',
        base: ['Tequila'],
        ingredients: 'tequila, orange juice, grenadine',
        taste: 'vibrant'
    },
    {
        photo: "",
        name: 'Singapore Sling',
        base: ['Gin'],
        ingredients: 'gin, cherry brandy, pineapple juice, grenadine',
        taste: 'tropical'
    },
    {
        photo: "",
        name: 'Moscow Mule',
        base: ['Vodka'],
        ingredients: 'vodka, ginger beer, lime juice',
        taste: 'spicy'
    },
    {
        photo: "",
        name: 'Black Russian',
        base: ['Vodka'],
        ingredients: 'vodka, coffee liqueur',
        taste: 'bold'
    },
    {
        photo: "",
        name: 'White Russian',
        base: ['Vodka'],
        ingredients: 'vodka, coffee liqueur, cream',
        taste: 'creamy'
    },
    {
        photo: "",
        name: 'Mimosa',
        base: ['Champagne'],
        ingredients: 'champagne, orange juice',
        taste: 'bubbly'
    },
    {
        photo: "",
        name: 'Irish Coffee',
        base: ['Whisky'],
        ingredients: 'whisky, hot coffee, sugar, cream',
        taste: 'warm'
    }
];

// Get references to HTML elements we will interact with.
const baseSelect = document.getElementById("base");
const generateButton = document.getElementById("generate");
const nameDisplay = document.getElementById("name");
const ingredientsDisplay = document.getElementById("ingredients");

// Add a click event listener to the "Generate" button.
generateButton.addEventListener("click", () => {
    const selectedBase = baseSelect.value.toLowerCase();
    let filteredCocktails = cocktails;

    if (selectedBase !== "all") {
        filteredCocktails = cocktails.filter(cocktail => cocktail.base.map(b => b.toLowerCase()).includes(selectedBase));
    }

    // Check if there are cocktails matching the selected criteria.
    if (filteredCocktails.length > 0) {
        // Generate a random index within the filtered cocktails array.
        const randomIndex = Math.floor(Math.random() * filteredCocktails.length);
        // Retrieve the random cocktail.
        const randomCocktail = filteredCocktails[randomIndex];
        // Display the name and ingredients of the random cocktail.
        nameDisplay.textContent = randomCocktail.name;
        ingredientsDisplay.textContent = randomCocktail.ingredients;
    } else {
        // Display a message if no cocktails match the selected criteria.
        nameDisplay.textContent = "No cocktails found";
        ingredientsDisplay.textContent = "";
    }
}); */

