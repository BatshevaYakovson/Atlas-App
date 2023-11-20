import { createCountry, updateAllCountriesData } from "./country.js";
let allCountriesData = [];

const sortCountriesByName = (countries) => {
    return countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
};


export const fetchAllCountriesData = async () => {
    const url = "https://restcountries.com/v3.1/all?fields=name,population,capital,currencies,region,languages,flags,latlng,cca3,borders";
    const resp = await fetch(url);
    allCountriesData = await resp.json();
    const countriesToDisplay = ["Israel", "United States", "France", "United Kingdom", "Thailand"];
    const initialCountriesData = sortCountriesByName (allCountriesData.filter(country => countriesToDisplay.includes(country.name.common)));
    createCountry(initialCountriesData);
    updateAllCountriesData(allCountriesData);
};

export const fetchCountryData = async (countryName) => {
    const url = `https://restcountries.com/v3.1/name/${countryName}`;
    const resp = await fetch(url);
    const data = await resp.json();
    const filteredData = data.filter((country) => isSimilarName(country.name.common, countryName));
    createCountry(filteredData);
};

const isSimilarName = (countryFullName, clickedCountryName) => {
    const sanitizedFullName = countryFullName.toLowerCase();
    const sanitizedClickedName = clickedCountryName.toLowerCase();
    return sanitizedFullName === sanitizedClickedName;
};

export const searchCountries = (searchTerm) => {
    const searchResults =sortCountriesByName ( allCountriesData.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    ));
    createCountry(searchResults);
}
