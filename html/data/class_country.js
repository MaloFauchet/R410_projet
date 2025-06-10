"use strict";

class Country{

    static all_countries = {};

    constructor(alpha3, name, capital, continent, pop, area, lsCountriesNeighbor, currencies, languages, translations, demonym, topLevelDomains, url_flag_svg){
        this._alpha3 = alpha3;
        this._name = name;
        this._capital = capital;
        this._continent = continent;
        this._pop = pop;
        this._area = area;
        this._ls_countries_neighbor = lsCountriesNeighbor;
        this._currencies = currencies;
        this._languages = languages;
        this._translations = translations;
        this._demonym = demonym;
        this._top_level_domains = topLevelDomains;
        this._url_flag_svg = url_flag_svg;
    }

    toString() {
        let stringLsCountriesNeighbors = "";

        if (this._ls_countries_neighbor)
            this._ls_countries_neighbor.forEach(element => stringLsCountriesNeighbors += element + ", ");

        return `${this._alpha3}, ${this._name}, ${this._capital}, ${this._continent}, ${this._pop}, (${stringLsCountriesNeighbors.slice(0,-2)})`
    }

    getPopDensity() {
        return Number((this._pop / this._area).toFixed(2));;
    }

    getBorders(){
        return this._ls_countries_neighbor.map(element => Country.all_countries[element]);
    }

    getCurrencies(){
        return this._currencies.map(element => Currency.all_currencies[element]);
    }

    getLanguages(){
        return this._languages.map(element => Language.all_languages[element]);
    }

    get alpha3() {
        return this._alpha3;
    }

    get name() {
        return this._name;
    }

    get capital() {
        return this._capital;
    }

    get continent() {
        return this._continent;
    }

    get pop() {
        return this._pop;
    }

    get area() {
        return this._area ? this._area : NaN;
    }

    get ls_countries_neighbor() {
        return this._ls_countries_neighbor;
    }

    get currencies() {
        return this._currencies;
    }

    get languages() {
        return this._languages;
    }

    get translations() {
        return this._translations;
    }

    get demonym() {
        return this._demonym;
    }

    get top_level_domains() {
        return this._top_level_domains;
    }

    get url_flag_svg() {
        return this._url_flag_svg;
    }
}

function fill_countries(){
    countries.forEach(element => {
        let country = new Country(element.alpha3Code, element.name, element.capital, element.region, element.population, element.area, element.borders, element.currencies ? element.currencies.map(elem => elem.code) : undefined, element.languages.map(elem => elem.iso639_2), element.translations, element.demonym, element.topLevelDomain, element.flag)
        Country.all_countries[element.alpha3Code] = country;
    });
}

fill_countries();
