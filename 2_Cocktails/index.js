const initChartLine = () => {
    const ctx = document.querySelector('#myChart');
    const cocktailCountByYear = {};

    cocktails.forEach((cocktail) => {
        const year = new Date(cocktail.dateModified).getFullYear();
        if (!cocktailCountByYear[year]) {
            cocktailCountByYear[year] = 1;
        } else {
            cocktailCountByYear[year]++;
        }
    });
    const labels = Object.keys(cocktailCountByYear);
    const data = Object.values(cocktailCountByYear);

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
                    labels: {
                        font: {
                            size: 20,
                            color: 'white'
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
    coFind = ['Gin', 'Vodka', 'Tequila', 'Rum', 'Whiskey'];
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

    const labels = Object.keys(ingredientCounts);
    const data = Object.values(ingredientCounts);

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
        }
    });
};
initChartPie();
