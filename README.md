# FuelFlip

Fuel economy converter (MPG US, MPG UK, L/100 km, km/L) and a two-car yearly cost comparison.

MPG and L/100 km are reciprocals: L/100 km = 235.215 / MPG (US) = 282.481 / MPG (UK), where 235.215 = 100 x 3.785411784 / 1.609344 (https://greencalculus.com/convert/mpg-to-l-per-100km/; also checkyourmath.com and mycarcalc.com). Everything routes through L/100 km.
Tests: 23 checks. 20 mpg = 11.76, 30 mpg = 7.84, 40 mpg = 5.88 L/100 km; 30 UK mpg = about 25 US mpg; km/L is 100 / L/100 km; round trips; and the "MPG illusion" (10 to 20 mpg saves more fuel than 30 to 50 over 10,000 km).
Real-world consumption varies with driving, load and weather.

Static client-side. `node test-engine.js` runs the tests.
