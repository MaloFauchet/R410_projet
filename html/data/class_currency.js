"use strict";

class Currency {
    static all_currencies = {};

    constructor(code, name, symbol) {
        this._code = code;
        this._name = name;
        this._symbol = symbol;
    }

    toString() {
        return `${this._code}, ${this._name}, ${this._symbol}`;
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
    
    get symbol() {
        return this._symbol;
    }

    set symbol(new_symbol) {
        this._symbol = new_symbol;
    }
}


function fill_currencies() {
    let tab = Currency.all_currencies;

    // loop through each countries
    countries.forEach(country => {
        // if country has no currency, skip this country
        if (country.currencies === undefined) {
            return;
        }

        // loop through each currency of that country
        country.currencies.forEach(currency => {
            // if the currency is not already registered
            if (!Object.keys(tab).includes(currency.code)) {
               tab[currency.code] = new Currency(currency.code, currency.name, currency.symbol); 
            }
        })
    })
}

fill_currencies();