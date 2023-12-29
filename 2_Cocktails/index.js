const initChartLine = () => {
    const ctx = document.querySelector('#myChart');
    const objCocktailByYear = {};

    cocktails.forEach((cocktail) => {
        if (cocktail.dateModified) {
            const year = new Date(cocktail.dateModified).getFullYear();
            if (!objCocktailByYear[year]) {
                objCocktailByYear[year] = 1;
            } else {
                objCocktailByYear[year]++;
            }
        }
    });

    const labels = Object.keys(objCocktailByYear);
    const data = Object.values(objCocktailByYear);

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [
                {
                    label: "Cocktails By Year",
                    data,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'white',
                    }
                },
                x: {
                    ticks: {
                        color: 'white',
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: 'white',
                        font: {
                            size: 18
                        }
                    }
                }
            }
        }
    });
};
initChartLine();

const initChartPie = () => {
    const ctx = document.querySelector('#myChart2');
    ingredientsToFind = ['Gin', 'Vodka', 'Tequila', 'Rum', 'Whiskey'];
    const objIngredientCount = {};

    ingredientsToFind.forEach(ingredientToFind => {
        objIngredientCount[ingredientToFind] = 0;
    });
    cocktails.forEach(cocktail => {
        ingredientsToFind.forEach(ingredientToFind => {
            for (let i = 1; i <= 15; i++) {
                const ingredient = cocktail[`strIngredient${i}`];
                if (ingredient) {
                    if (ingredient === ingredientToFind) {
                        objIngredientCount[ingredientToFind]++;
                    }
                }
            }
        });
    });
    console.log(objIngredientCount)
    const labels = Object.keys(objIngredientCount);
    const data = Object.values(objIngredientCount);

    chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels,
            datasets: [
                {
                    label: "Cocktails By Ingredients",
                    data,
                    backgroundColor: [
                        'rgb(30, 0, 255)',
                        'rgb(226, 255, 5)',
                        'rgb(0, 255, 255)',
                        'rgb(43, 18, 89)',
                        'rgb(0, 255, 13)',
                    ],
                },
            ],
        },
        options: {
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: 'white',
                        font: {
                            size: 18
                        }
                    }
                }
            }
        }
    });
};
initChartPie();
