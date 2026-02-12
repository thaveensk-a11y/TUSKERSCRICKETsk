document.addEventListener('DOMContentLoaded', () => {
    loadMatches();

    document.getElementById('show-upcoming').addEventListener('click', () => filterMatches('upcoming'));
    document.getElementById('show-past').addEventListener('click', () => filterMatches('past'));
});

let allMatches = [];

async function loadMatches() {
    try {
        const response = await fetch('data/matches.json');
        allMatches = await response.json();
        filterMatches('upcoming'); // Default view
    } catch (error) {
        console.error('Error loading matches:', error);
        document.getElementById('matches-container').innerHTML = '<p>Error loading match data. Please try again later.</p>';
    }
}

function filterMatches(type) {
    const container = document.getElementById('matches-container');
    const today = new Date().toISOString().split('T')[0];

    // Update active button state
    const upcomingBtn = document.getElementById('show-upcoming');
    const pastBtn = document.getElementById('show-past');

    if (type === 'upcoming') {
        upcomingBtn.classList.add('btn-primary');
        upcomingBtn.classList.remove('btn-secondary');
        pastBtn.classList.remove('btn-primary');
        pastBtn.classList.add('btn-secondary');
    } else {
        pastBtn.classList.add('btn-primary');
        pastBtn.classList.remove('btn-secondary');
        upcomingBtn.classList.remove('btn-primary');
        upcomingBtn.classList.add('btn-secondary');
    }

    // Filter Logic
    const filteredMatches = allMatches.filter(match => {
        if (type === 'upcoming') {
            return match.date >= today;
        } else {
            return match.date < today;
        }
    }).sort((a, b) => {
        return type === 'upcoming'
            ? new Date(a.date) - new Date(b.date)
            : new Date(b.date) - new Date(a.date);
    });

    renderMatches(filteredMatches);
}

function renderMatches(matches) {
    const container = document.getElementById('matches-container');

    if (matches.length === 0) {
        container.innerHTML = '<p>No matches found in this category.</p>';
        return;
    }

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Opponent</th>
                    <th>Venue</th>
                    <th>Result / Time</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
    `;

    matches.forEach(match => {
        html += `
            <tr>
                <td data-label="Date">${match.date}</td>
                <td data-label="Opponent">${match.opponent}</td>
                <td data-label="Venue">${match.venue}</td>
                <td data-label="Result/Time">${match.result === 'Upcoming' ? match.time : match.result}</td>
                <td data-label="Notes">${match.notes || '-'}</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    container.innerHTML = html;
}
