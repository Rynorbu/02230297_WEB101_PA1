# Pokédex Application

## Overview

The Pokédex application is a web-based tool that allows users to explore and learn about various Pokémon. It provides the following key functionalities:

* Displaying a List of Pokémon: The application fetches and displays a list of Pokémon from the PokeAPI, showing their name, image, and basic information.

* Searching for Pokémon: Users can search for Pokémon by name or ID, and the application will display the corresponding Pokémon details.

* Viewing Pokémon Details: When a user clicks on a Pokémon, the application displays detailed information about the selected Pokémon, including its type, abilities, weight, and height.

* Pagination or Infinite Scrolling: The application implements either pagination or infinite scrolling to allow users to load more Pokémon beyond the initial set. after every 10 pokemons it loads and displays another 10 pokemons.

* Marking Pokémon as "Seen" and "Umseen": When the user clicks the Pokémon it is stored in seen list and the user can view the seen list by clicking on the seen button. The pokemons that are not seen are stored in not seen list and the user can view the not seen list by clicking on the not seen button.

## API Endpoints Used

The Pokédex application uses the following PokeAPI endpoints:

* https://pokeapi.co/api/v2/pokemon?limit=10&offset={page}: Fetches a list of Pokémon, with the ability to specify the page number.

* https://pokeapi.co/api/v2/pokemon/{id} or https://pokeapi.co/api/v2/pokemon/{name}: Fetches detailed information about a specific Pokémon.


## Technical Details

The Pokédex application is built using:

* HTML, CSS, and JavaScript (using only the DOM API)
* The fetch() function for making API requests.


## Future Enhancements

Here are some potential future enhancements for the Pokédex application:

* Filtering and Sorting: Implementing the ability for users to filter Pokémon by type, generation, or other criteria, and sort the list based on various attributes.

* Pokémon Comparison: Allow users to select and compare the details of multiple Pokémon side-by-side.

* Improved User Experience: Continuously enhance the user interface and user experience, focusing on aspects like responsiveness, accessibility, and overall visual design.
