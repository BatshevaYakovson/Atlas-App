export function getBorderingCountryNames(countryCode, allCountries) {
    console.log("All Countries:", allCountries);

    const country = allCountries.find((c) => c.cca3 === countryCode);
    console.log("Current Country:", country);

    if (!country || !country.borders || country.borders.length === 0) {
        return ["None"];
    }

    const borderingCountryNames = country.borders.map((borderCode) => {
        const borderCountry = allCountries.find((c) => c.cca3 === borderCode);
        return borderCountry ? borderCountry.name.common : "Unknown Country";
    });

    console.log("Bordering Countries:", borderingCountryNames);

    return borderingCountryNames;
}
