var E = require('./engine.js'), n = 0, bad = 0;
function eq(a, b, m, t) { n++; if (!(Math.abs(a - b) <= (t == null ? 1e-9 : t))) { bad++; console.log('FAIL', m, a, b); } }
function is(a, b, m) { n++; if (a !== b) { bad++; console.log('FAIL', m, a, b); } }
// greencalculus.com: L/100km = 235.215 / MPG (US), 282.481 / MPG (UK); 20 mpg = 11.76, 30 mpg = 7.84, 40 mpg = 5.88
eq(E.convert(30, 'mpg-us', 'l100'), 7.84, '30 mpg', 0.005); eq(E.convert(20, 'mpg-us', 'l100'), 11.76, '20 mpg', 0.005); eq(E.convert(40, 'mpg-us', 'l100'), 5.88, '40 mpg', 0.005);
eq(E.convert(1, 'mpg-us', 'l100'), 235.215, 'constant US', 0.001); eq(E.convert(1, 'mpg-uk', 'l100'), 282.481, 'constant UK', 0.001);
// the constant derivation: 100 x 3.785411784 / 1.609344
eq(100 * 3.785411784 / 1.609344, 235.2146, 'derivation', 0.001);
// The UK gallon is bigger, so a UK mpg figure is larger than the US figure for the same car: 30 UK mpg = 9.42 L/100km = about 25 US mpg
eq(E.convert(30, 'mpg-uk', 'l100'), 282.481 / 30, '30 UK', 0.001); eq(E.convert(30, 'mpg-uk', 'mpg-us'), 24.98, '30 UK = 25 US', 0.01);
// km/L: 10 km/L = 10 L/100km; 12.5 km/L = 8 L/100km
eq(E.convert(10, 'kml', 'l100'), 10, '10 km/L'); eq(E.convert(12.5, 'kml', 'l100'), 8, '12.5'); eq(E.convert(8, 'l100', 'kml'), 12.5, 'back');
// reverse formula is self-inverse
eq(E.convert(7.84, 'l100', 'mpg-us'), 30, '7.84 -> 30', 0.02); eq(E.convert(E.convert(33.3, 'mpg-us', 'l100'), 'l100', 'mpg-us'), 33.3, 'round trip', 1e-9);
eq(E.convert(E.convert(17, 'mpg-uk', 'kml'), 'kml', 'mpg-uk'), 17, 'round trip uk', 1e-9);
// 1 mpg US = 0.425144 km/L
eq(E.convert(1, 'mpg-us', 'kml'), 0.425144, 'mpg to km/L', 1e-5);
// invalid
is(isNaN(E.convert(0, 'mpg-us', 'l100')), true, 'zero'); is(isNaN(E.convert(-3, 'kml', 'l100')), true, 'neg');
// yearly cost: 8 L/100km, 15000 km, 1.50/L = 1200 L, 1800
var y = E.yearly(8, 15000, 1.5); eq(y.litres, 1200, 'litres'); eq(y.cost, 1800, 'cost');
// MPG illusion: 10 -> 20 mpg saves more fuel than 30 -> 50 mpg over 10,000 km
var a = E.savedPer10k(E.convert(10, 'mpg-us', 'l100'), E.convert(20, 'mpg-us', 'l100')), b = E.savedPer10k(E.convert(30, 'mpg-us', 'l100'), E.convert(50, 'mpg-us', 'l100'));
is(a > b, true, 'illusion'); eq(a, 1176.07, 'saved 10->20 = 1176 L per 10,000 km', 0.01); eq(b, (7.84 - 4.7043) * 100, 'saved 30->50', 0.2);
is(E.fmt(7.8405, 2), '7.84', 'fmt');
console.log((n - bad) + '/' + n + ' passed'); process.exit(bad ? 1 : 0);
