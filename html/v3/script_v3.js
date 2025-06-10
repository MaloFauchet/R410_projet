"use strict";

// Get the table body element
let tbody = document.getElementById("countries-tbody");

// Holds the formatted rows in an array
let rows = [];

// Holds the DOM elements for the page numbers
let page_numbers = document.getElementsByClassName("page-number");

// Page number
let page = parseInt(localStorage.getItem("page_number"));

if (page === null) {
    page = 1;
}

// Number of rows per page
let rows_per_page = 25;

// DOM element of the popup
let popup = document.getElementById("container-pop-up");
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

// Loads the coutry rows into the rows array
Object.values(Country.all_countries).map((country) => {
    // Create a new row and cells for each property
    let tr = document.createElement("tr");

    // Country Name
    let td = document.createElement("td");
    td.innerText = country.name;
    tr.appendChild(td);

    // Country Population
    td = document.createElement("td");
    td.innerText = country.pop;
    tr.appendChild(td);

    // Country Area
    td = document.createElement("td");
    td.innerText = country.area;
    tr.appendChild(td);

    // Country Population Density
    td = document.createElement("td");
    td.innerText = country.getPopDensity();
    tr.appendChild(td);

    // Country Continent
    td = document.createElement("td");
    td.innerText = country.continent;
    tr.appendChild(td);

    // Country flag
    td = document.createElement("td");
    
    let img = document.createElement("img");
    img.src = country.url_flag_svg;
    img.alt = country.name + " flag";
    img.title = country.name + " flag";
    img.style.width = "50px";
    img.onclick = (event) => imgClick(event, country);
    td.appendChild(img);
    
    tr.appendChild(td);

    tr.onclick = (event) => trClick(event,country);
    // Add the row to the table body
    rows.push(tr);
});

/**
 * Updates the page number display
 * @returns {void}
 */
function updatePageNumber() {
    // Update the page number display
    for (let i = 0; i < page_numbers.length; i++) {
        page_numbers[i].innerText = page;
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
    if (page_number > Math.ceil(rows.length / rows_per_page)) {
        page_number = Math.ceil(rows.length / rows_per_page);
    }

    localStorage.setItem("page_number", page_number.toString());

    // Clear the table body
    tbody.innerHTML = "";

    // Calculate the start and end index for the current page
    let start = (page_number - 1) * rows_per_page;
    let end = Math.min(start + rows_per_page, rows.length);

    // Append the rows for the current page to the table body
    for (let i = start; i < end; i++) {
        tbody.appendChild(rows[i]);
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
    if (page_number === Math.ceil(rows.length / rows_per_page)) {
        document.getElementById("next-button").disabled = true;
    } else {
        document.getElementById("next-button").disabled = false;
    }
}

loadPage(page);

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
    popup.style.display = "flex";
    popup.style.alignItems = "center";
    popup.style.justifyContent = "center";
}

/**
 * Fired when clicked on a row. Shows the popup with the country information.
 * @param {Country} country Country object
 */
function trClick(event, country) {
    // set the popup content
    popup_content.innerHTML = "<h2>" + country.name + "</h2>" +
        "<p>Population: " + country.pop + "</p>" +
        "<p>Area: " + country.area + "</p>" +
        "<p>Population Density: " + country.getPopDensity() + "</p>" +
        "<p>Continent: " + country.continent + "</p>";

    // show the popup
    popup.style.display = "flex";
    popup.style.alignItems = "center";
    popup.style.justifyContent = "center";
}