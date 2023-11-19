import { getBorderingCountryNames } from './utils.js';

let allCountriesData = [];


export default class Country {
    constructor(_parent, _item) {
        this.parent = _parent;
        this.name = _item.name.common;
        this.pop = `${(Math.floor((_item.population / 1000000) * 100) / 100).toLocaleString()}M`
        this.region = _item.region;
        this.capital = _item.capital ? _item.capital : "none";
        this.languages = _item.languages ? Object.values(_item.languages).join(', ') : "none";
        this.coins = _item.currencies
            ? Object.entries(_item.currencies).map(([code, { name }]) => ({ code, name }))
            : "none";
        this.flag = _item.flags.png;
        this.lat = _item.latlng[0];
        this.lon = _item.latlng[1];
        this.countryCode = _item.cca3;
        this.borderingCountries = allCountriesData.length > 0
            ? getBorderingCountryNames(_item.cca3, allCountriesData)
            : ["Loading..."];
    }

    render() {
        const coinsString = this.coins.map(coin => `${coin.code}, ${coin.name}`).join(', ');
        const borderingCountriesLinks = this.borderingCountries.map(country => `<a href="#" class="bordering-link">${country}</a>`).join(', ');
        let div = document.createElement("div");
        div.className = "col-md-4 p-2";
        document.querySelector(this.parent).append(div);
        div.innerHTML = `
        <div class="card mx-auto my-5 " style="width: 24rem;">
        <div class="ratio ratio-16x9">
            <img src="${this.flag}" class="card-img-top" alt="${this.name}">
        </div>
        <div class="card-body">
            <h5 class="card-title text-center">${this.name}</h5>
            <p class="card-text text-center">Population: ${this.pop}.</p>
            <p class="card-text text-center">Capital: ${this.capital}.</p>
            <p class="card-text text-center">Region: ${this.region}.</p>
            <p class="card-text text-center">Languages: ${this.languages}.</p>
            <p class="card-text text-center">Coins: ${coinsString}.</p>
            <p class="card-text text-center">Bordering Countries: ${borderingCountriesLinks}.</p>
        </div>
        <div class="mapDiv">
            <iframe width="100%" height="200" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
                src="https://maps.google.com/maps?q=${this.lat},${this.lon}&hl=iw&z=4&amp;output=embed">
            </iframe>
        </div>
    </div>
     `
    }
}
export const centerSingleCityTab = () => {
    const countryTabs = document.querySelectorAll(".col-md-4.p-2");
    if (countryTabs.length === 1) {
        const container = document.querySelector("#id_row");
        container.style.display = "flex";
        container.style.justifyContent = "center";
    }
};


export const createCountry = (_ar) => {
    document.querySelector("#id_row").innerHTML = "";
    _ar.forEach(item => {
        let country = new Country("#id_row", item);
        country.render();
    });
    centerSingleCityTab();
};

export const updateAllCountriesData = (data) => {
    allCountriesData = data;
};

