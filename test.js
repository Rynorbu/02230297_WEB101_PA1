// Initialization and Fetching Pokemon List
let seenPokemons = [];
let unseenPokemons = [];

document.addEventListener('DOMContentLoaded', async () => {
    let offset = 0;
    const limit = 10;
    await fetchAndDisplayPokemons(offset, limit);

    // Add scroll event listener
    window.addEventListener('scroll', async () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            offset += limit;
            await fetchAndDisplayPokemons(offset, limit);
        }
    });

    // Add click event listeners for seen and not seen links
    const seenLink = document.getElementById('seen-link');
    const notSeenLink = document.getElementById('not-seen-link');

    seenLink.addEventListener('click', () => {
        displayPokemonList(seenPokemons);
    });

    notSeenLink.addEventListener('click', () => {
        displayPokemonList(unseenPokemons);
    });
});

async function fetchAndDisplayPokemons(offset, limit) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        const pokemonList = document.getElementById('pokemon_list');

        for (const pokemon of data.results) {
            const pokemonDetailResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
            const pokemonDetail = await pokemonDetailResponse.json();

            const pokemonElement = document.createElement('div');
            pokemonElement.classList.add('pokemon');

            // Display Pokemon number
            const numberElement = document.createElement('p');
            numberElement.textContent = `#${pokemonDetail.id}`;
            pokemonElement.appendChild(numberElement);

            // Display Pokemon image
            const imgElement = document.createElement('img');
            imgElement.src = pokemonDetail.sprites.front_default;
            imgElement.alt = pokemon.name;
            pokemonElement.appendChild(imgElement);

            // Display Pokemon name
            const nameElement = document.createElement('h3');
            nameElement.textContent = `Name: ${pokemon.name}`;
            pokemonElement.appendChild(nameElement);

            // Display Pokemon weight
            const weightElement = document.createElement('p');
            weightElement.textContent = `Weight: ${pokemonDetail.weight} kg`;
            pokemonElement.appendChild(weightElement);

            // Display Pokemon height
            const heightElement = document.createElement('p');
            heightElement.textContent = `Height: ${pokemonDetail.height} dm`;
            pokemonElement.appendChild(heightElement);

            // Add click event listener to display Pokemon details on the home page
            pokemonElement.addEventListener('click', async () => {
                // Hide all Pokemon containers
                const allPokemonContainers = document.querySelectorAll('.pokemon');
                allPokemonContainers.forEach(container => container.style.display = 'none');

                // Display Pokemon details
                await displayPokemonDetails(pokemon.name);
            });

            pokemonList.appendChild(pokemonElement);

            // Update the unseen Pokemon list
            if (!seenPokemons.includes(pokemon.name)) {
                unseenPokemons.push(pokemon.name);
            }
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Function to display Pokemon details
async function displayPokemonDetails(pokemonName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) throw new Error('Pokemon not found');
        const pokemon = await response.json();

        const container = document.querySelector('.text'); // Assuming this is where you want to display the details

        // Clear previous Pokemon details
        container.innerHTML = '';

        // Display Pokemon name
        const nameElement = document.createElement('h2');
        nameElement.textContent = pokemon.name.toUpperCase();
        container.appendChild(nameElement);

        // Display Pokemon image
        const imgElement = document.createElement('img');
        imgElement.src = pokemon.sprites.front_default;
        imgElement.alt = pokemon.name;
        container.appendChild(imgElement);

        // Display Pokemon weight
        const weightElement = document.createElement('p');
        weightElement.textContent = `Weight: ${pokemon.weight} kg`;
        container.appendChild(weightElement);

        // Display Pokemon height
        const heightElement = document.createElement('p');
        heightElement.textContent = `Height: ${pokemon.height} dm`;
        container.appendChild(heightElement);

        // Fetch and display Pokemon types and abilities
        const typesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const typesData = await typesResponse.json();
        const typesElement = document.createElement('p');
        typesElement.textContent = `Types: ${typesData.types.map(type => type.type.name).join(', ')}`;
        container.appendChild(typesElement);

        const abilitiesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const abilitiesData = await abilitiesResponse.json();
        const abilitiesElement = document.createElement('p');
        abilitiesElement.textContent = `Abilities: ${abilitiesData.abilities.map(ability => ability.ability.name).join(', ')}`;
        container.appendChild(abilitiesElement);

        // Update the seen and unseen Pokemon lists
        if (!seenPokemons.includes(pokemonName)) {
            seenPokemons.push(pokemonName);
            unseenPokemons = unseenPokemons.filter(p => p !== pokemonName);
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        // Optionally, display an error message to the user
        container.innerHTML = `<p>${error.message}</p>`;
    }
}

// Function to display the list of seen or unseen Pokemon
async function displayPokemonList(pokemonList) {
    const pokemonListElement = document.getElementById('pokemon_list');
    pokemonListElement.innerHTML = ''; // Clear the existing list

    for (const pokemonName of pokemonList) {
        const pokemonElement = document.createElement('div');
        pokemonElement.classList.add('pokemon');

        // Display Pokemon number
        const pokemonDetailResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const pokemonDetail = await pokemonDetailResponse.json();
        const numberElement = document.createElement('p');
        numberElement.textContent = `#${pokemonDetail.id}`;
        pokemonElement.appendChild(numberElement);

        // Display Pokemon image
        const imgElement = document.createElement('img');
        imgElement.src = pokemonDetail.sprites.front_default;
        imgElement.alt = pokemonName;
        pokemonElement.appendChild(imgElement);

        // Display Pokemon name
        const nameElement = document.createElement('h3');
        nameElement.textContent = `Name: ${pokemonName}`;
        pokemonElement.appendChild(nameElement);

        // Add click event listener to display Pokemon details
        pokemonElement.addEventListener('click', async () => {
            // Hide all Pokemon containers
            const allPokemonContainers = document.querySelectorAll('.pokemon');
            allPokemonContainers.forEach(container => container.style.display = 'none');

            // Display Pokemon details
            await displayPokemonDetails(pokemonName);
        });

        pokemonListElement.appendChild(pokemonElement);
    }
}


// Enhanced Search Functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search_btn');
    const searchInput = document.getElementById('search');

    searchBtn.addEventListener('click', async () => {
        const searchValue = searchInput.value.toLowerCase().trim();
        if (!searchValue) return; // Exit if the input is empty

        // Check if the input is a number
        const isNumber = !isNaN(searchValue);

        // Hide all Pokemon containers
        const allPokemonContainers = document.querySelectorAll('.pokemon');
        allPokemonContainers.forEach(container => container.style.display = 'none');

        try {
            if (isNumber) {
                // Fetch Pokemon by ID
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`);
                if (!response.ok) throw new Error('Pokemon not found');
                const pokemon = await response.json();
                await displayPokemonDetails(pokemon.name);

                // Update the seen and unseen Pokemon lists
                if (!seenPokemons.includes(pokemon.name)) {
                    seenPokemons.push(pokemon.name);
                    unseenPokemons = unseenPokemons.filter(p => p !== pokemon.name);
                }
            } else {
                // Fetch Pokemon by name
                await displayPokemonDetails(searchValue);

                // Update the seen and unseen Pokemon lists
                if (!seenPokemons.includes(searchValue)) {
                    seenPokemons.push(searchValue);
                    unseenPokemons = unseenPokemons.filter(p => p !== searchValue);
                }
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            // Optionally, display an error message to the user
            const container = document.querySelector('.text');
            container.innerHTML = `<p>${error.message}</p>`;
        }
    });
});
