const searchButton = document.querySelector('#search');
const randomSearchButton = document.querySelector('#randomSearch');
let maxNumberPok = 0;
let chart;
axios.get('https://pokeapi.co/api/v2/pokemon/').then(({ data }) => { maxNumberPok = data.count })

randomSearchButton.addEventListener('click', () => {
    const randomPokemonNumber = Math.floor(Math.random() * maxNumberPok);

    axios
        .get(
            `https://pokeapi.co/api/v2/pokemon/${randomPokemonNumber}`
        )
        .then(({ data }) => {
            dataLoad(data);
        }).catch((error) => {
            alert("El pokemon no existe");
        });
});

searchButton.addEventListener('click', () => {
    const pokemonInput = document.querySelector('#pokemon');
    const pokemonNumber = pokemonInput.value;

    axios
        .get(
            `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`
        )
        .then(({ data }) => {
            dataLoad(data);
        }).catch((error) => {
            alert("El pokemon no existe");
        });
})

const initChartBar = (labels, data) => {
    const ctx = document.querySelector('#myChart');
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
                    backgroundColor: "rgb(25, 236, 236)",
                    label: "Estadisticas del Pokémon",
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

const dataLoad = (data) => {
    const pokemonInput = document.querySelector('#pokemon');
    const pokemonNumber = pokemonInput.value;
    if (chart) {
        chart.destroy();
    }
    pokemonInput.value = "";
    // VARIABLES
    const pokemonName = data.name;
    const pokemonImage = document.querySelector("#pokemonImage")
    const statsPokemon = {};
    const arrayStats = data.stats
    const imageDefault = document.querySelector('#pokemonDefault')
    const ctx = document.querySelector('#myChart');

    //Mostramos informacion del Pokemon
    document.querySelector('#pokemonName').textContent = pokemonName;

    // Condicional para evitar Imagen NOT FOUND
    if (data.sprites.other.dream_world.front_default !== null) {
        pokemonImage.src = data.sprites.other.dream_world.front_default;
    } else if(data.sprites.front_default !== null) {
        pokemonImage.src = data.sprites.front_default
    }else {
        pokemonImage.src = './pokemon.svg'
    }

    //RECORREMOS EL OBJETO PARA EXTRAER DATOS
    arrayStats.forEach(element => {
        const statName = element.stat.name;
        const baseStat = element.base_stat;
        statsPokemon[statName] = baseStat;
    })
    pokemonImage.style.display = 'flex';
    imageDefault.style.display = 'none';
    ctx.style.display = 'flex';

    const labels = Object.keys(statsPokemon);
    const datainfo = Object.values(statsPokemon);
    initChartBar(labels, datainfo);
}