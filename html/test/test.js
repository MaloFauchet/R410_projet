"use strict";

// Malo

/**
 * Tableau des pays dont au moins un pays frontalier n'est pas dans le même continent.
 */
function outsideTheContinent() {

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
function neighborless() {
    
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
function withCommonLanguage() {
    
}

// Igor
function withoutCommonCurrency() {
    console.table(Object.values(Country.all_countries).filter((country) => {
        let res = country.ls_countries_neighbor.ever((code) => Country.all_languages[code].currency) 
    }))
}

// Malo
function sortingDecreasingDensity() {
    
}

// Igor
function moreTopLevelDomains() {
    console.table(Object.values(Country.all_countries).filter(country => country.top_level_domains.length > 1))
}