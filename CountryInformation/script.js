// Select the elements
const countryInfoElement = document.querySelector('.country-info');
const countryInput = document.querySelector('#country-input');
const fetchButton = document.querySelector('#fetch-button');

// Define the URL of the Rest Countries API endpoint
const apiUrl = 'https://restcountries.com/v3.1/name'; // Replace with your API endpoint URL

// Function to fetch country data and update the HTML
function fetchCountryData(countryName) {
    countryInfoElement.textContent = 'Loading...';

    // Make a GET request to the Rest Countries API
    fetch(`${apiUrl}/${countryName}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then((countryData) => {
            // Extract relevant information from the API response
            const countryName = countryData[0].name.common;
            const capital = countryData[0].capital[0];
            const population = countryData[0].population;
            const region = countryData[0].region;
            const flagUrl = countryData[0].flags.png;

            // Create HTML elements to display the country data
            const countryInfoHTML = `
                <h2>${countryName}</h2>
                <img src="${flagUrl}" alt="${countryName} Flag" width="100">
                <p><strong>Capital:</strong> ${capital}</p>
                <p><strong>Population:</strong> ${population}</p>
                <p><strong>Region:</strong> ${region}</p>
            `;

            // Update the HTML with the country information
            countryInfoElement.innerHTML = countryInfoHTML;
        })
        .catch((error) => {
            console.error('Error fetching country data:', error);
            // Display an error message in case of an error
            countryInfoElement.textContent = 'Failed to fetch country data';
        });
}

// Event listener for the fetch button
fetchButton.addEventListener('click', () => {
    const userInput = countryInput.value.trim();
    if (userInput) {
        fetchCountryData(userInput);
    } else {
        alert('Please enter a country name.');
    }
});
