document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
});

async function loadEvents() {
    try {
        const response = await fetch('data/events.json');
        const events = await response.json();
        renderEvents(events);
    } catch (error) {
        console.error('Error loading events:', error);
        document.getElementById('events-container').innerHTML = '<p>Error loading events. Please try again later.</p>';
    }
}

function renderEvents(events) {
    const container = document.getElementById('events-container');

    if (events.length === 0) {
        container.innerHTML = '<p>No upcoming events.</p>';
        return;
    }

    let html = '';

    events.forEach(event => {
        const date = new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        html += `
            <div class="card" style="display: flex; flex-direction: column; gap: 0.5rem;">
                <h3>${event.title}</h3>
                <p><strong>Date:</strong> ${date} at ${event.time}</p>
                <p><strong>Location:</strong> ${event.location}</p>
                <p>${event.description}</p>
                ${event.registration_link ? `<a href="${event.registration_link}" class="btn btn-primary" style="align-self: start; margin-top: 1rem;">Register Now</a>` : ''}
            </div>
        `;
    });

    container.innerHTML = html;
}
