"use strict";

class Language {
    static all_languages = {};

    constructor(code, name) {
        this._code = code;
        this._name = name;
    }

    toString() {
        return `${this._name} (${this._code})`;
    }

    get code() {
        return this._code;
    }

    set code(new_code) {
        this._code = new_code;
    }

    get name() {
        return this._name;
    }

    set name(new_name) {
        this._name = new_name;
    }
}

function fill_languages() {
    let tab = Language.all_languages;

    // loop through each countries
    countries.forEach((country) => {
        // if country has no languages, skip this country
        if (country.languages === undefined) {
            return;
        }

        // loop through each language of that country
        country.languages.forEach((language) => {
            // if the currency is not already registered            
            if (!Object.keys(tab).includes(language.iso639_2)) {
                tab[language.iso639_2] = new Language(language.iso639_2, language.name);
            }
        });
    });
}
