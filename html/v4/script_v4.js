"use strict";

// Get the table body element
let tbody = document.getElementById("countries-tbody");

// Holds the formatted rows in an object
// The key is the tr element and the value is the country object
let rows = {};

// Holds the DOM elements for the page numbers
let page_numbers = document.getElementsByClassName("page-number");

// Page number
let page = 1;

// Number of rows per page
let rows_per_page = 25;

// DOM element of the popup
let popup = document.getElementById("popup");
popup.style.display = "none";

// DOM element of the popup content
let popup_content = document.getElementById("popup-content");

let popup_close_button = document.getElementById("popup-close-button");
popup_close_button.onclick = closePopup;

// Function to close the popup
function closePopup() {
    popup.style.display = "none";
}

// Function to fill the Country class with data
fill_countries();
// Function to fill the Language class with data
fill_languages();

/////////////
// FILTERS //
/////////////

let filtered_rows = [];

// continent filter
let continent_filter = document.getElementById("continent-select");
continent_filter.onchange = updateFilters;
let continents = [];

// fill the continent filter with the continents
Object.values(Country.all_countries).forEach((country) => {
    // Check if the continent is already in the array
    if (continents.includes(country.continent)) {
        return;
    }
    // Create a new option for each continent
    let option = document.createElement("option");
    option.value = country.continent;
    option.innerText = country.continent;
    continent_filter.appendChild(option);
    continents.push(country.continent);
});

let language_filter = document.getElementById("language-select");
language_filter.onchange = updateFilters;

// fill the language filter with the languages
Object.values(Language.all_languages).forEach((language) => {
    // Create a new option for each language
    let option = document.createElement("option");
    option.value = language.name;
    option.innerText = language.name;
    language_filter.appendChild(option);
});


let country_filter = document.getElementById("country-select");
country_filter.onchange = updateFilters;


// Loads the coutry rows into the rows array
Object.values(Country.all_countries).map((country) => {
    // Create a new row and cells for each property
    let tr = document.createElement("tr");

    // Country Name
    let td = document.createElement("td");
    td.innerText = country.name;
    td.setAttribute("data-type", "country-name");
    tr.appendChild(td);

    // Country Population
    td = document.createElement("td");
    td.innerText = country.pop;
    td.setAttribute("data-type", "country-population");
    tr.appendChild(td);

    // Country Area
    td = document.createElement("td");
    td.innerText = country.area;
    td.setAttribute("data-type", "country-area");
    tr.appendChild(td);

    // Country Population Density
    td = document.createElement("td");
    td.innerText = country.getPopDensity();
    td.setAttribute("data-type", "country-population-density");
    tr.appendChild(td);

    // Country Continent
    td = document.createElement("td");
    td.innerText = country.continent;
    td.setAttribute("data-type", "country-continent");
    tr.appendChild(td);

    // Country flag
    td = document.createElement("td");
    
    let img = document.createElement("img");
    img.src = country.url_flag_svg;
    img.alt = country.name + " flag";
    img.title = country.name + " flag";
    img.style.width = "50px";
    img.onclick = (event) => imgClick(event, country);
    td.setAttribute("data-type", "country-flag");
    td.appendChild(img);
    
    tr.appendChild(td);

    tr.onclick = () => trClick(country);
    // Add the row to the table body
    rows[country.alpha3] = tr;
});

/**
 * Updates the filters and reloads the filtered rows
 * @returns {void}
 */
function updateFilters() {
    reloadFilteredRows();
    loadPage(page);
}

/**
 * Reloads the filtered rows based on the selected filters
 * @returns {void}
 */
function reloadFilteredRows() {
    filtered_rows = Object.keys(rows).filter((key) => {
        let row = rows[key];
        let country = Country.all_countries[key];

        // Get the country name from the row
        let country_name = country.name;

        // Get the language from the row
        let languages = country.languages;

        // Filter by country name
        if (country_filter.value !== "" && !country_name.includes(country_filter.value)) {
            return false;
        }

        // Filter by language
        debugger;
        let languages_names = languages.map((language) => Language.all_languages[language].name);
        // laguage_filter.value must be equal to Language.all_languages[languages].name
        if (language_filter.value !== "" && !languages_names.includes(language_filter.value)) {
            return false;
        }

        // Filter by continent
        if (continent_filter.value !== "" && continent_filter.value !== country.continent) {
            return false;
        }
        
        return true;
    });
    console.log(filtered_rows);
}

/**
 * Updates the page number display
 * @returns {void}
 */
function updatePageNumber() {
    let number_of_pages = Math.ceil(filtered_rows.length / rows_per_page);
    // Update the page number display
    for (let i = 0; i < page_numbers.length; i++) {
        page_numbers[i].innerText = page + " / " + number_of_pages;
    }
}


/**
 * Loads the specified page of the table
 * @param {number} page_number Integer page number to load
 * @returns {void}
 */
function loadPage(page_number) {
    // Minimum and maximum page number validations
    if (page_number < 1) {
        page_number = 1;
    }
    if (page_number > Math.ceil(filtered_rows.length / rows_per_page)) {
        page_number = Math.ceil(filtered_rows.length / rows_per_page);
    }

    // Clear the table body
    tbody.innerHTML = "";

    // Calculate the start and end index for the current page
    let start = (page_number - 1) * rows_per_page;
    let end = Math.min(start + rows_per_page, filtered_rows.length);

    // Append the rows for the current page to the table body
    for (let i = start; i < end; i++) {
        let row = filtered_rows[i];
        // Append the row to the table body
        tbody.appendChild(rows[row]);
    }

    // Update the page number display
    updatePageNumber();

    // Disable the previous button if on the first page
    if (page_number === 1) {
        document.getElementById("previous-button").disabled = true;
    } else {
        document.getElementById("previous-button").disabled = false;
    }

    // Disable the next button if on the last page
    if (page_number === Math.ceil(filtered_rows.length / rows_per_page)) {
        document.getElementById("next-button").disabled = true;
    } else {
        document.getElementById("next-button").disabled = false;
    }
}

updateFilters();

// Event listeners for the previous and next buttons
document.getElementById("previous-button").addEventListener("click", () => {
    page--;
    loadPage(page);
});

document.getElementById("next-button").addEventListener("click", () => {
    page++;
    loadPage(page);
});

/**
 * Fired when clicked on an image. Shows the popup with the flag image.
 * @param {MouseEvent} event Click event
 * @param {Country} country Country object
 * @returns {void}
 */
function imgClick(event, country) {
    // prevent event bubbling
    event.stopPropagation();

    // set the popup content
    popup_content.innerHTML = "<img src='" + country.url_flag_svg + "' alt='" + country.name + " flag' style='width: 100%;' />";

    // show the popup
    popup.style.display = "block";
}

/**
 * Fired when clicked on a row. Shows the popup with the country information.
 * @param {Country} country Country object
 */
function trClick(country) {
    // set the popup content
    popup_content.innerHTML = "<h2>" + country.name + "</h2>" +
        "<p>Population: " + country.pop + "</p>" +
        "<p>Area: " + country.area + "</p>" +
        "<p>Population Density: " + country.getPopDensity() + "</p>" +
        "<p>Continent: " + country.continent + "</p>";

    // show the popup
    popup.style.display = "block";
}