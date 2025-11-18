document.addEventListener('DOMContentLoaded', () => {

    // Get all our DOM elements
    const container = document.querySelector('.solar-system-container');
    const addBodyBtn = document.getElementById('add-body-btn');
    const saveGalaxyBtn = document.getElementById('save-galaxy-btn');
    const loadGalaxyBtn = document.getElementById('load-galaxy-btn');
    const clearGalaxyBtn = document.getElementById('clear-galaxy-btn');
    const loadGalaxyMenu = document.getElementById('load-galaxy-menu');

    // === 1. The Core "State" Object ===
    // This object holds all the data for our simulation.
    // Saving and loading is just saving/loading this object.
    let currentGalaxy = {
        centralBody: null,
        planets: []
    };

    // === 2. The Main Render Function ===
    // This function clears the simulation and redraws it
    // based on the currentGalaxy object.
    function renderGalaxy() {
        // Clear the container
        container.innerHTML = '';

        // Draw the Central Body (Star or Black Hole)
        if (currentGalaxy.centralBody) {
            const body = currentGalaxy.centralBody;
            const bodyEl = document.createElement('div');
            
            bodyEl.classList.add(body.type); // 'star' or 'black-hole'
            bodyEl.style.width = `${body.size}px`;
            bodyEl.style.height = `${body.size}px`;
            
            // Set color for stars, use box-shadow for black holes
            if (body.type === 'star') {
                bodyEl.style.backgroundColor = body.color;
                bodyEl.style.boxShadow = `0 0 30px ${body.color}, 0 0 60px ${body.color}`;
            }
            
            container.appendChild(bodyEl);
        }

        // Draw all the Planets and their Orbits
        currentGalaxy.planets.forEach(planet => {
            const orbit = document.createElement('div');
            orbit.classList.add('orbit');
            orbit.style.width = `${planet.orbitSize}px`;
            orbit.style.height = `${planet.orbitSize}px`;
            orbit.style.animationDuration = `${planet.orbitDuration}s`;

            const planetEl = document.createElement('div');
            planetEl.classList.add('planet');
            planetEl.style.width = `${planet.planetSize}px`;
            planetEl.style.height = `${planet.planetSize}px`;
            planetEl.style.backgroundColor = planet.color;
            planetEl.style.top = `-${planet.planetSize / 2}px`;

            orbit.appendChild(planetEl);
            container.appendChild(orbit);
        });
    }

    // === 3. UI Event Listeners ===

    // --- ADD A NEW BODY ---
    addBodyBtn.addEventListener('click', () => {
        // Get all values from the form
        const type = document.getElementById('body-type').value;
        const size = document.getElementById('body-size').value;
        const color = document.getElementById('body-color').value;

        if (type === 'planet') {
            const planetData = {
                name: document.getElementById('body-name').value,
                planetSize: parseInt(size),
                color: color,
                orbitSize: parseInt(document.getElementById('orbit-size').value),
                orbitDuration: parseInt(document.getElementById('orbit-duration').value)
            };
            // Add the new planet to our state
            currentGalaxy.planets.push(planetData);
        } else {
            // Set the central body in our state
            currentGalaxy.centralBody = {
                type: type, // 'star' or 'black-hole'
                name: document.getElementById('body-name').value,
                size: parseInt(size),
                color: color // Only used by stars, but we save it anyway
            };
        }
        
        // Re-draw the entire simulation
        renderGalaxy();
    });

    // --- SAVE GALAXY ---
    saveGalaxyBtn.addEventListener('click', () => {
        const galaxyName = document.getElementById('galaxy-name').value;
        if (!galaxyName) {
            alert('Please enter a name for your galaxy!');
            return;
        }
        // Save the currentGalaxy object to localStorage as a JSON string
        localStorage.setItem(galaxyName, JSON.stringify(currentGalaxy));
        alert(`Galaxy "${galaxyName}" saved!`);
        populateLoadMenu(); // Update the dropdown list
    });

    // --- LOAD GALAXY ---
    loadGalaxyBtn.addEventListener('click', () => {
        const galaxyName = loadGalaxyMenu.value;
        if (!galaxyName) {
            alert('Please select a galaxy to load.');
            return;
        }
        
        // Get the JSON string from localStorage
        const savedData = localStorage.getItem(galaxyName);
        
        // Convert the string back into an object
        currentGalaxy = JSON.parse(savedData);
        
        // Re-draw the simulation with the loaded data
        renderGalaxy();
        alert(`Galaxy "${galaxyName}" loaded!`);
    });

    // --- CLEAR GALAXY ---
    clearGalaxyBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear the current galaxy?')) {
            // Reset the state to empty
            currentGalaxy = { centralBody: null, planets: [] };
            // Re-draw the empty simulation
            renderGalaxy();
        }
    });

    // === 4. Utility Functions ===

    // This function fills the <select> dropdown with saved galaxies
    function populateLoadMenu() {
        loadGalaxyMenu.innerHTML = ''; // Clear existing options
        
        // Loop through all items in localStorage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const option = document.createElement('option');
            option.value = key;
            option.textContent = key;
            loadGalaxyMenu.appendChild(option);
        }
    }

    // --- Initial Setup ---
    // Populate the load menu when the page first loads
    populateLoadMenu();
    // Render the (initially empty) galaxy
    renderGalaxy();
});
