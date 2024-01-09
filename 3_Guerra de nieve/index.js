
const initChartBar = (labels, data) => {
    const ctx = document.querySelector('#myChart');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
                    backgroundColor: "rgb(25, 236, 236)",
                    label: "Amount Lives",
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
        this.amountLives -= amount;
        updateChart();
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
            receiverTeam2.amountLives(hurtTeam1);
            warLog.innerHTML += `${attackerTeam1.name} hurt ${receiverTeam2.name}. Remaining lives of ${receiverTeam2.name}: ${receiverTeam2.amountLives}<br>`;

            if (this.team2.losingTeam()) {
                clearInterval(interval);
                winnerMessage.innerHTML = 'Team 1 has won the war';
            } else {
                const hurtTeam2 = attackerTeam2.snowballThrow();
                receiverTeam1.amountLives(hurtTeam2);
                warLog.innerHTML += `${attackerTeam2.name} hurt ${receiverTeam1.name}. Remaining lives of ${receiverTeam1.name}: ${receiverTeam1.amountLives}<br>`;

                if (this.team1.losingTeam()) {
                    clearInterval(interval);
                    winnerMessage.innerHTML = 'Team 2 has won the war';
                }
            }
        }, Math.floor(Math.random() * 3000) + 1000)
    }
}


// TEST

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

const updateChart = () => {
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
    myChart.datasets[0].data = Object.values(amountLivesPlayers);
    myChart.update();

}


const labels = Object.keys(amountLivesPlayers);
const data = Object.values(amountLivesPlayers);
initChartBar(labels, data);

//Inicializamos la guerra
const war = new snowWar(team1, team2);
war.simulate();