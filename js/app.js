import { declareEvents } from "./event.js";
import { fetchAllCountriesData } from "./initialFilter.js";

export const doApi = () => {
  declareEvents();
  fetchAllCountriesData();
};

const init = () => {
  doApi();
};

init();
declareEvents();

