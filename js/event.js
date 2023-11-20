import { fetchAllCountriesData, fetchCountryData, searchCountries } from "./initialFilter.js";
export const declareEvents = () => {
    const homeLink = document.querySelector("#home_link");
    const israelLink = document.querySelector("#israel_link");
    const usaLink = document.querySelector("#USA_link");
    const franceLink = document.querySelector("#france_link");
    const ukLink = document.querySelector("#UK_link");
    const thailandLink = document.querySelector("#thailand_link");
    const searchInput = document.querySelector("#id_input");
    const searchButton = document.querySelector("#search_btn");

    homeLink.addEventListener("click", fetchAllCountriesData);
    israelLink.addEventListener("click", () => fetchCountryData("Israel"));
    usaLink.addEventListener("click", () => fetchCountryData("United States"));
    franceLink.addEventListener("click", () => fetchCountryData("France"));
    ukLink.addEventListener("click", () => fetchCountryData("United Kingdom"));
    thailandLink.addEventListener("click", () => fetchCountryData("Thailand"));

    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("bordering-link")) {
            event.preventDefault();
            const countryName = event.target.textContent;
            fetchCountryData(countryName);
        }
    });

    searchButton.addEventListener("click", () => {
        const searchTerm = searchInput.value;
        searchCountries(searchTerm);
    });

    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value;
        searchCountries(searchTerm);
    });
}