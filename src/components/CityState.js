// cityState.js — Indian city/state data, sourced from a precomputed static JSON
// (generated offline via generate.cjs using the country-state-city package,
// so we don't ship the entire world's city data in the browser bundle)
import indiaCities from "./indianCities.json";

let _cache = null;

export function getIndianCities() {
  if (_cache) return _cache;
  _cache = indiaCities; // already sorted + de-duplicated at generation time
  return _cache;
}
