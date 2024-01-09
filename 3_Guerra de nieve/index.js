class Player {
    constructor(name, amountLives, damage) {
        this.name = name;
        this.amountLives = amountLives;
        this.damage = damage;
    }
    snowballThrow() {
        return this.damage;
    }
    updateLives(amount) {
        this.amountLives = Math.max(0, this.amountLives - amount);
        updateChart(myChart, team1, team2);
    }

}

class Warrior extends Player {
    constructor(name) {
        super(name, 3, 1);
    }
}

class Wizard extends Player {
    constructor(name) {
        super(name, 2, 2);
    }
}

class Team {
    constructor() {
        this.players = [];
    }

    addPlayer(player) {
        this.players.push(player);
    }

    losingTeam() {
        for (const player of this.players) {
            if (player.amountLives > 0) {
                return false;
            }
        }
        return true;
        // return this.players.every(player => player.amountLives === 0);
    }
}

class snowWar {
    constructor(team1, team2) {
        this.team1 = team1;
        this.team2 = team2;
    }

    selectRandomPlayers(team) {
        const alivePlayers = team.players.filter(player => player.amountLives > 0)
        if (alivePlayers.length === 0) {
            return null;
        }
        const randomIndex = Math.floor(Math.random() * alivePlayers.length);
        return alivePlayers[randomIndex];
    }

    simulate() {
        const warLog = document.getElementById('war-log');
        const winnerMessage = document.getElementById('winner-message');

        const interval = setInterval(() => {
            const attackerTeam1 = this.selectRandomPlayers(this.team1)
            const receiverTeam2 = this.selectRandomPlayers(this.team2)
            const attackerTeam2 = this.selectRandomPlayers(this.team2)
            const receiverTeam1 = this.selectRandomPlayers(this.team1)

            const hurtTeam1 = attackerTeam1.snowballThrow();
            receiverTeam2.updateLives(hurtTeam1);
            warLog.innerHTML += `<span class="logStyle"><span class="styleTeam1">${attackerTeam1.name}</span> hurt <span class="styleTeam2">${receiverTeam2.name}</span>.<br>Remaining lives of <span class="styleTeam2">${receiverTeam2.name}</span>: ${receiverTeam2.amountLives}</span><br>`;

            if (this.team2.losingTeam()) {
                clearInterval(interval);
                winnerMessage.innerHTML = 'Team 1 has won the war';
            } else {
                const hurtTeam2 = attackerTeam2.snowballThrow();
                receiverTeam1.updateLives(hurtTeam2);
                warLog.innerHTML += `<span class="logStyle"><span class="styleTeam2">${attackerTeam2.name}</span> hurt <span class="styleTeam1">${receiverTeam1.name}</span>.<br>Remaining lives of <span class="styleTeam1">${receiverTeam1.name}</span>: ${receiverTeam1.amountLives}</span><br>`;

                if (this.team1.losingTeam()) {
                    clearInterval(interval);
                    winnerMessage.innerHTML = 'Team 2 has won the war';
                }
            }
        }, Math.floor(Math.random() * 3000) + 1000)
    }
}

const updateChart = (myChart, team1, team2) => {
    // Obtenemos valores para el Chart
    const amountLivesPlayers = {};

    team1.players.forEach((element) => {
        const namePLayers = element.name;
        const livesPLayers = element.amountLives;
        amountLivesPlayers[namePLayers] = livesPLayers;
    })

    team2.players.forEach((element) => {
        const namePLayers = element.name;
        const livesPLayers = element.amountLives;
        amountLivesPlayers[namePLayers] = livesPLayers;
    })
    myChart.data.labels = Object.keys(amountLivesPlayers);
    myChart.data.datasets[0].data = Object.values(amountLivesPlayers);
    myChart.update();
}

// Creamos equipos y jugadores

const team1 = new Team();
const team2 = new Team();

team1.addPlayer(new Warrior('Warrior1_EQ1'));
team1.addPlayer(new Wizard('Wizard1_EQ1'));
team1.addPlayer(new Warrior('Warrior2_EQ1'));
team1.addPlayer(new Wizard('Wizard2_EQ1'));

team2.addPlayer(new Warrior('WARRIOR1_EQ2'));
team2.addPlayer(new Wizard('WIZARD1_EQ2'));
team2.addPlayer(new Warrior('WARRIOR2_EQ2'));
team2.addPlayer(new Wizard('WIZARD2_EQ2'));
team2.addPlayer(new Warrior('WARRIOR3_EQ2'));
team2.addPlayer(new Wizard('WIZARD3_EQ2'));

//Creamos Chart
const ctx = document.querySelector('#myChart');
const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    backgroundColor: "rgb(25, 236, 236)",
                    label: "Amount Lives",
                    data: [],
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

//llamamos a la funcion para actualizar valores del chart
updateChart(myChart, team1, team2);

//Ejecutamos el metodo para simular la guerra
const war = new snowWar(team1, team2);
war.simulate();