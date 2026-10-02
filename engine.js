(function (root) {
  'use strict';
  var KM_MI = 1.609344, L_USGAL = 3.785411784, L_UKGAL = 4.54609;
  // Everything goes through L/100km, the reciprocal scale.
  var UNITS = { 'mpg-us': 'MPG (US)', 'mpg-uk': 'MPG (UK)', 'l100': 'L/100 km', 'kml': 'km/L' };
  function toL100(v, u) {
    if (!(v > 0)) return NaN;
    if (u === 'l100') return v; if (u === 'kml') return 100 / v;
    if (u === 'mpg-us') return 100 * L_USGAL / (KM_MI * v); if (u === 'mpg-uk') return 100 * L_UKGAL / (KM_MI * v); return NaN;
  }
  function fromL100(l, u) {
    if (u === 'l100') return l; if (u === 'kml') return 100 / l;
    if (u === 'mpg-us') return 100 * L_USGAL / (KM_MI * l); if (u === 'mpg-uk') return 100 * L_UKGAL / (KM_MI * l); return NaN;
  }
  function convert(v, from, to) { return fromL100(toL100(v, from), to); }
  // Fuel used and cost for a yearly distance (km) at a price per litre
  function yearly(l100, km, pricePerL) { var litres = l100 * km / 100; return { litres: litres, cost: litres * pricePerL }; }
  // Fuel saved by moving from one rating to another (the "MPG illusion": 10->20 saves more than 30->50)
  function savedPer10k(fromL, toL, km) { return (fromL - toL) * (km || 10000) / 100; }
  function fmt(v, d) { return (Math.round(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d); }
  var api = { UNITS: UNITS, KM_MI: KM_MI, L_USGAL: L_USGAL, L_UKGAL: L_UKGAL, toL100: toL100, convert: convert, yearly: yearly, savedPer10k: savedPer10k, fmt: fmt };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Fuel = api;
})(typeof window !== 'undefined' ? window : this);
