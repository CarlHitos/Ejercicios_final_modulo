const cocktailList = document.getElementById('cocktailList');
const cocktailDetails = document.getElementById('cocktailDetails');

// cocktails.forEach(cocktail => {
//     console.log(cocktail.strAlcoholic)
// })

const showCocktailDetails = (cocktail) => {
    document.getElementById('cocktailName').innerText = cocktail.strDrink;
    document.getElementById('cocktailImage').src = cocktail.strDrinkThumb;
    const ingredientsList = document.getElementById('ingredientsList');
    ingredientsList.innerHTML = "";
    for (let i = 1; i <= 15; i++) {
        const ingredient = cocktail[`strIngredient${i}`];
        if (ingredient) {
            const measure = cocktail[`strMeasure${i}`];
            const listItem = document.createElement('li');
            listItem.innerText = `${measure} ${ingredient}`;
            ingredientsList.appendChild(listItem);
        }
    }
    document.getElementById('instructions').innerText = cocktail.strInstructions;
    document.getElementById('glassType').innerText = cocktail.strGlass;
    document.getElementById('alcoholicType').innerText = cocktail.strAlcoholic;
}

const sortedCocktails = cocktails.sort((a, b) => {
    const dateA = new Date(a.dateModified);
    const dateB = new Date(b.dateModified);
    if (dateA === null && dateB === null) {
        return 0; 
    } else if (dateA === null) {
        return 1; 
    } else if (dateB === null) {
        return -1; 
    }
    return dateB - dateA;
});

const lastCocktails = sortedCocktails.filter((cocktail, index) => index < 20)
// console.log(lastCocktails)

lastCocktails.forEach(cocktail => {
    const listItem = document.createElement('li');
    listItem.innerText = cocktail.strDrink;
    listItem.addEventListener('click', () => {
        cocktailDetails.classList.add('show');
        showCocktailDetails(cocktail);
    });
    cocktailList.appendChild(listItem);
});