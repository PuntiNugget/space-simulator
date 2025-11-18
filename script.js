// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    const container = document.querySelector('.solar-system-container');

    // Define our planets
    // You can easily add more!
    const planets = [
        {
            name: 'Mercury',
            orbitSize: 100, // px (diameter)
            planetSize: 8,  // px
            color: '#a9a9a9', // Grey
            orbitDuration: '5s' // 5 seconds per orbit
        },
        {
            name: 'Earth',
            orbitSize: 220,
            planetSize: 12,
            color: '#3d91f0', // Blue
            orbitDuration: '10s'
        },
        {
            name: 'Mars',
            orbitSize: 340,
            planetSize: 10,
            color: '#c1440e', // Red
            orbitDuration: '18s'
        }
    ];

    // Loop through each planet in the array
    planets.forEach(planet => {
        
        // 1. Create the orbit div
        const orbit = document.createElement('div');
        orbit.classList.add('orbit');
        // Set orbit size and animation speed from our data
        orbit.style.width = `${planet.orbitSize}px`;
        orbit.style.height = `${planet.orbitSize}px`;
        orbit.style.animationDuration = planet.orbitDuration;

        // 2. Create the planet div
        const planetEl = document.createElement('div');
        planetEl.classList.add('planet');
        // Set planet size and color from our data
        planetEl.style.width = `${planet.planetSize}px`;
        planetEl.style.height = `${planet.planetSize}px`;
        planetEl.style.backgroundColor = planet.color;
        
        // Adjust planet position to sit ON the orbit line
        // It's offset by half its own size
        planetEl.style.top = `-${planet.planetSize / 2}px`;

        // 3. Assemble: Put the planet inside its orbit
        orbit.appendChild(planetEl);
        
        // 4. Add the complete orbit (with its planet) to the container
        container.appendChild(orbit);
    });

});
