document.addEventListener('DOMContentLoaded', () => {
    loadPlayers();
});

async function loadPlayers() {
    try {
        const response = await fetch('data/players.json');
        const players = await response.json();
        renderPlayers(players);
    } catch (error) {
        console.error('Error loading players:', error);
        document.getElementById('players-container').innerHTML = '<p>Error loading player roster. Please try again later.</p>';
    }
}

function renderPlayers(players) {
    const container = document.getElementById('players-container');

    if (players.length === 0) {
        container.innerHTML = '<p>No players found.</p>';
        return;
    }

    let html = '';

    players.forEach(player => {
        html += `
            <div class="card">
                <div style="background-color: var(--primary-color); height: 150px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 3rem; margin-bottom: 1rem;">
                    ${player.name.charAt(0)}
                </div>
                <h3>${player.name} <span style="font-size: 0.8em; color: var(--accent-color);">#${player.jersey_number}</span></h3>
                <p><strong>Role:</strong> ${player.role}</p>
                <p><strong>Batting:</strong> ${player.batting_style}</p>
                <p><strong>Bowling:</strong> ${player.bowling_style || 'N/A'}</p>
                <p style="margin-top: 1rem; font-style: italic;">"${player.bio || 'Player for Tuskers CC'}"</p>
            </div>
        `;
    });

    container.innerHTML = html;
}
