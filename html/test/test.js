"use strict";

// Malo

/**
 * Tableau des pays dont au moins un pays frontalier n'est pas dans le même continent.
 */
function outsideTheContinent() {
    let ls_countries = Country.all_countries;
    let result = [];

    // For each country
    Object.keys(ls_countries).forEach(country => {
        // console.log(country);
        // If the country has no neighbors, skip it
        if (ls_countries[country].ls_countries_neighbor === undefined) return;

        // For each neighbor of the country
        for (let i = 0; i < ls_countries[country].ls_countries_neighbor.length; i++) {
            const neighbor = ls_countries[country].ls_countries_neighbor[i];
            // If the neighbor is not in the same continent, add the country to the result
            if (ls_countries[neighbor].continent !== ls_countries[country].continent) {
                result.push(ls_countries[country]);
                break;
            }    
        }
    });
    console.table(result);
}

// Igor
function moreNeighbors() {
    
}

// Malo
/**
 * Tableau des pays n'ayant aucun voisin.
 */
function neighborless() {
    let ls_countries = Country.all_countries;
    let result = [];

    // For each country
    Object.keys(ls_countries).forEach(country => {
        // If the country has no neighbors, add it
        if (ls_countries[country].ls_countries_neighbor === undefined) {
            result.push(ls_countries[country]);
        }
    });
    console.table(result);
}

// Igor
function moreLanguages() {
    
}

// Malo
/**
 * Tableau des pays ayant au moins un voisin parlant l'une de ses langues.
 * (+Affichage des pays voisins, +Affichage des Langues en question)
 */
function withCommonLanguage() {
    let result = [];
    let ls_countries = Country.all_countries;

    // For each country
    Object.keys(ls_countries).forEach(country => {
        // If the country has no neighbors, skip it
        if (ls_countries[country].ls_countries_neighbor === undefined) return;

        // Create a temporary object to hold the country's name, its neighbors and the languages they have in common
        let tmp_obj = {};
        tmp_obj.name = ls_countries[country].name;
        tmp_obj.neighbors = [];
        tmp_obj.languages = [];
        // For each neighbor of the country
        for (let i = 0; i < ls_countries[country].ls_countries_neighbor.length; i++) {
            const neighbor = ls_countries[country].ls_countries_neighbor[i];
            // If the neighbor speaks the same language as the country, add the country to the result
            if (ls_countries[neighbor].languages.some(language => ls_countries[country].languages.includes(language))) {
                tmp_obj.neighbors.push(ls_countries[neighbor]);
                // console.log(Language.all_languages[ls_countries[neighbor].languages.filter(language => ls_countries[country].languages.includes(language))]);
                tmp_obj.languages.push(Language.all_languages[ls_countries[neighbor].languages.filter(language => ls_countries[country].languages.includes(language))]);
            }
        }

        // If the country has at least one neighbor speaking the same language, add it to the result
        if (tmp_obj.neighbors.length > 0) {
            result.push(tmp_obj);
        }
    });
    console.table(result);
}

// Igor
function withoutCommonCurrency() {
    
}

// Malo
function sortingDecreasingDensity() {
    let result = Object.values(Country.all_countries).sort((a, b) => b.getPopDensity() - a.getPopDensity());
    console.table(result);
}

// Igor
function moreTopLevelDomains() {
    
}