"use strict";

let tbody = document.getElementById("countries-tbody");

fill_countries();

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
    td.appendChild(img);
    
    tr.appendChild(td);

    // Add the row to the table body
    tbody.appendChild(tr);
});