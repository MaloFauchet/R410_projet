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
    // on trouve le max de voisins
    let max = 0;
    Object.values(Country.all_countries).forEach(country => {
        if(country.ls_countries_neighbor && country.ls_countries_neighbor.length > max) 
            max = country.ls_countries_neighbor.length;
    });

    // on affiche la liste des pays qui possèdent le max de voisins 
    let ls_max_neighbors = Object.values(Country.all_countries).filter(country => country.ls_countries_neighbor && country.ls_countries_neighbor.length == max);
    console.log("--- Pays avec le plus de voisins ---");
    console.table(ls_max_neighbors);
    
    // on affiche leurs voisins
    let ls_with_country_max_neighbors = [];
    ls_max_neighbors.forEach(country => country.ls_countries_neighbor.forEach(code => ls_with_country_max_neighbors.push(Country.all_countries[code])));
    console.log("--- Leurs Voisins ---");
    console.table(ls_with_country_max_neighbors);
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
        // on trouve le max de Langues
        let max = 0;
        Object.values(Country.all_countries).forEach(country => {
            if(country.languages && country.languages.length > max) 
                max = country.languages.length;
        });
    
        // on retourne la liste des pays qui possèdent le max de voisins 
        let ls_max_languages = Object.values(Country.all_countries).filter(country => country.languages && country.languages.length == max);
        console.log("--- Pays avec le plus de langues ---");
        console.table(ls_max_languages);
    
        // on affiche leurs langues
        let ls_languages = [];
        ls_max_languages.forEach(country => country.languages.forEach(code => ls_languages.push(Language.all_languages[code])));
        console.log("--- Leurs Langues ---");
        console.table(ls_languages);
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
    console.table(Object.values(Country.all_countries).filter( (country) => {
        let country_currencies = country.currencies;
        console.log(country_currencies);
        return country.ls_countries_neighbor ? country.ls_countries_neighbor.every(code => Country.all_countries[code].currencies.every(currency => currency ? !country_currencies.includes(currency) : true)) : true
    }))
}

// Malo
function sortingDecreasingDensity() {
    let result = Object.values(Country.all_countries).sort((a, b) => b.getPopDensity() - a.getPopDensity());
    console.table(result);
}

// Igor
function moreTopLevelDomains() {
    console.table(Object.values(Country.all_countries).filter(country => country.top_level_domains.length > 1))
}