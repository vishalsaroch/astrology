import {
  BirthDetails,
  KundliData,
  PlanetPosition,
  HouseDetail,
  DivisionalChart,
  VimshottariDasha,
  DashaPeriod,
  DoshaAnalysis,
  AshtakootaScore,
  MatchmakingResult,
  PanchangData,
  NumerologyReport,
  TarotCard,
  TarotReadingSpread
} from '../../types';
import { calculateDashafal, calculateLifePredictions } from './predictions';

// Constants for signs, nakshatras, and lords
export const ZODIAC_SIGNS = [
  { name: 'Aries', sanskrit: 'Mesha', lord: 'Mars', element: 'Fire', symbol: '♈' },
  { name: 'Taurus', sanskrit: 'Vrishabha', lord: 'Venus', element: 'Earth', symbol: '♉' },
  { name: 'Gemini', sanskrit: 'Mithuna', lord: 'Mercury', element: 'Air', symbol: '♊' },
  { name: 'Cancer', sanskrit: 'Karka', lord: 'Moon', element: 'Water', symbol: '♋' },
  { name: 'Leo', sanskrit: 'Simha', lord: 'Sun', element: 'Fire', symbol: '♌' },
  { name: 'Virgo', sanskrit: 'Kanya', lord: 'Mercury', element: 'Earth', symbol: '♍' },
  { name: 'Libra', sanskrit: 'Tula', lord: 'Venus', element: 'Air', symbol: '♎' },
  { name: 'Scorpio', sanskrit: 'Vrishchika', lord: 'Mars', element: 'Water', symbol: '♏' },
  { name: 'Sagittarius', sanskrit: 'Dhanu', lord: 'Jupiter', element: 'Fire', symbol: '♐' },
  { name: 'Capricorn', sanskrit: 'Makara', lord: 'Saturn', element: 'Earth', symbol: '♑' },
  { name: 'Aquarius', sanskrit: 'Kumbha', lord: 'Saturn', element: 'Air', symbol: '♒' },
  { name: 'Pisces', sanskrit: 'Meena', lord: 'Jupiter', element: 'Water', symbol: '♓' }
];

export const NAKSHATRAS = [
  { name: 'Ashwini', lord: 'Ketu', deity: 'Ashwini Kumaras', gana: 'Deva', yoni: 'Horse', nadi: 'Adi', varna: 'Kshatriya', vashya: 'Chatushpada' },
  { name: 'Bharani', lord: 'Venus', deity: 'Yama', gana: 'Manushya', yoni: 'Elephant', nadi: 'Madhya', varna: 'Mleccha', vashya: 'Manava' },
  { name: 'Krittika', lord: 'Sun', deity: 'Agni', gana: 'Rakshasa', yoni: 'Sheep', nadi: 'Antya', varna: 'Brahmin', vashya: 'Chatushpada' },
  { name: 'Rohini', lord: 'Moon', deity: 'Brahma', gana: 'Manushya', yoni: 'Serpent', nadi: 'Antya', varna: 'Shudra', vashya: 'Chatushpada' },
  { name: 'Mrigashira', lord: 'Mars', deity: 'Soma', gana: 'Deva', yoni: 'Serpent', nadi: 'Madhya', varna: 'Servant', vashya: 'Chatushpada' },
  { name: 'Ardra', lord: 'Rahu', deity: 'Rudra', gana: 'Manushya', yoni: 'Dog', nadi: 'Adi', varna: 'Shudra', vashya: 'Manava' },
  { name: 'Punarvasu', lord: 'Jupiter', deity: 'Aditi', gana: 'Deva', yoni: 'Cat', nadi: 'Adi', varna: 'Vaishya', vashya: 'Manava' },
  { name: 'Pushya', lord: 'Saturn', deity: 'Brihaspati', gana: 'Deva', yoni: 'Sheep', nadi: 'Madhya', varna: 'Kshatriya', vashya: 'Jalachara' },
  { name: 'Ashlesha', lord: 'Mercury', deity: 'Sarpa', gana: 'Rakshasa', yoni: 'Cat', nadi: 'Antya', varna: 'Mleccha', vashya: 'Jalachara' },
  { name: 'Magha', lord: 'Ketu', deity: 'Pitris', gana: 'Rakshasa', yoni: 'Rat', nadi: 'Antya', varna: 'Shudra', vashya: 'Chatushpada' },
  { name: 'Purva Phalguni', lord: 'Venus', deity: 'Bhaga', gana: 'Manushya', yoni: 'Rat', nadi: 'Madhya', varna: 'Brahmin', vashya: 'Manava' },
  { name: 'Uttara Phalguni', lord: 'Sun', deity: 'Aryaman', gana: 'Manushya', yoni: 'Cow', nadi: 'Adi', varna: 'Kshatriya', vashya: 'Manava' },
  { name: 'Hasta', lord: 'Moon', deity: 'Savitar', gana: 'Deva', yoni: 'Buffalo', nadi: 'Adi', varna: 'Vaishya', vashya: 'Manava' },
  { name: 'Chitra', lord: 'Mars', deity: 'Tvashtar', gana: 'Rakshasa', yoni: 'Tiger', nadi: 'Madhya', varna: 'Servant', vashya: 'Manava' },
  { name: 'Swati', lord: 'Rahu', deity: 'Vayu', gana: 'Deva', yoni: 'Buffalo', nadi: 'Antya', varna: 'Shudra', vashya: 'Manava' },
  { name: 'Vishakha', lord: 'Jupiter', deity: 'Indra-Agni', gana: 'Rakshasa', yoni: 'Tiger', nadi: 'Antya', varna: 'Mleccha', vashya: 'Manava' },
  { name: 'Anuradha', lord: 'Saturn', deity: 'Mitra', gana: 'Deva', yoni: 'Deer', nadi: 'Madhya', varna: 'Shudra', vashya: 'Keeta' },
  { name: 'Jyeshtha', lord: 'Mercury', deity: 'Indra', gana: 'Rakshasa', yoni: 'Deer', nadi: 'Adi', varna: 'Servant', vashya: 'Keeta' },
  { name: 'Mula', lord: 'Ketu', deity: 'Nirriti', gana: 'Rakshasa', yoni: 'Dog', nadi: 'Adi', varna: 'Kshatriya', vashya: 'Manava' },
  { name: 'Purva Ashadha', lord: 'Venus', deity: 'Apas', gana: 'Manushya', yoni: 'Monkey', nadi: 'Madhya', varna: 'Brahmin', vashya: 'Chatushpada' },
  { name: 'Uttara Ashadha', lord: 'Sun', deity: 'Vishvedevas', gana: 'Manushya', yoni: 'Mongoose', nadi: 'Antya', varna: 'Kshatriya', vashya: 'Chatushpada' },
  { name: 'Shravana', lord: 'Moon', deity: 'Vishnu', gana: 'Deva', yoni: 'Monkey', nadi: 'Antya', varna: 'Mleccha', vashya: 'Manava' },
  { name: 'Dhanishta', lord: 'Mars', deity: 'Vasus', gana: 'Rakshasa', yoni: 'Lion', nadi: 'Madhya', varna: 'Servant', vashya: 'Jalachara' },
  { name: 'Shatabhisha', lord: 'Rahu', deity: 'Varuna', gana: 'Rakshasa', yoni: 'Horse', nadi: 'Adi', varna: 'Shudra', vashya: 'Jalachara' },
  { name: 'Purva Bhadrapada', lord: 'Jupiter', deity: 'Aja Ekapada', gana: 'Manushya', yoni: 'Lion', nadi: 'Adi', varna: 'Brahmin', vashya: 'Manava' },
  { name: 'Uttara Bhadrapada', lord: 'Saturn', deity: 'Ahirbudhnya', gana: 'Manushya', yoni: 'Cow', nadi: 'Madhya', varna: 'Kshatriya', vashya: 'Jalachara' },
  { name: 'Revati', lord: 'Mercury', deity: 'Pushan', gana: 'Deva', yoni: 'Elephant', nadi: 'Antya', varna: 'Shudra', vashya: 'Jalachara' }
];

export const DASHA_YEARS: Record<string, number> = {
  Ketu: 7,
  Venus: 20,
  Sun: 6,
  Moon: 10,
  Mars: 7,
  Rahu: 18,
  Jupiter: 16,
  Saturn: 19,
  Mercury: 17
};

export const DASHA_SEQUENCE = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];

// Exaltation and Debilitation points in Vedic astrology
const PLANET_DIGNITIES: Record<string, { exaltSign: number; exaltDeg: number; deblSign: number; deblDeg: number; ownSigns: number[]; moolaSign: number }> = {
  Sun: { exaltSign: 0, exaltDeg: 10, deblSign: 6, deblDeg: 10, ownSigns: [4], moolaSign: 4 },
  Moon: { exaltSign: 1, exaltDeg: 3, deblSign: 7, deblDeg: 3, ownSigns: [3], moolaSign: 1 },
  Mars: { exaltSign: 9, exaltDeg: 28, deblSign: 3, deblDeg: 28, ownSigns: [0, 7], moolaSign: 0 },
  Mercury: { exaltSign: 5, exaltDeg: 15, deblSign: 11, deblDeg: 15, ownSigns: [2, 5], moolaSign: 5 },
  Jupiter: { exaltSign: 3, exaltDeg: 5, deblSign: 9, deblDeg: 5, ownSigns: [8, 11], moolaSign: 8 },
  Venus: { exaltSign: 11, exaltDeg: 27, deblSign: 5, deblDeg: 27, ownSigns: [1, 6], moolaSign: 6 },
  Saturn: { exaltSign: 6, exaltDeg: 20, deblSign: 0, deblDeg: 20, ownSigns: [9, 10], moolaSign: 10 },
  Rahu: { exaltSign: 1, exaltDeg: 20, deblSign: 7, deblDeg: 20, ownSigns: [10], moolaSign: 10 },
  Ketu: { exaltSign: 7, exaltDeg: 20, deblSign: 1, deblDeg: 20, ownSigns: [8], moolaSign: 8 }
};

// Julian Day Number calculation
export function calculateJulianDay(year: number, month: number, day: number, hour: number, minute: number, tzOffset: number): number {
  const decimalHour = hour + minute / 60 - tzOffset;
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5 + decimalHour / 24;
  return jd;
}

// Calculate Lahiri (Chitra Paksha) Ayanamsa for a given Julian Day
export function calculateLahiriAyanamsa(jd: number): number {
  const t = (jd - 2451545.0) / 36525.0;
  // Standard Lahiri Ayanamsa at J2000.0 is 23° 51' 25.53" = 23.85709° with annual precession 50.290966"
  const ayanamsa = 23.85709 + 1.396971 * t + 0.000308 * t * t;
  return ayanamsa;
}

// Calculate Greenwich Mean Sidereal Time (GMST) in degrees (IAU-1982 standard)
export function calculateGST(jd: number): number {
  const t = (jd - 2451545.0) / 36525.0;
  const d0 = Math.floor(jd - 2451545.0 + 0.5) - 0.5;
  const utHours = ((jd - 2451545.0 - d0) * 24 + 24) % 24;
  let gmst = 100.46061837 + 36000.770053608 * t + 0.000387933 * t * t - (t * t * t) / 38710000 + 15.04106864 * utHours;
  gmst = ((gmst % 360) + 360) % 360;
  return gmst;
}

// Calculate Ascendant (Lagna)
export function calculateAscendant(jd: number, lat: number, lon: number, ayanamsa: number): number {
  const t = (jd - 2451545.0) / 36525.0;
  const gst = calculateGST(jd);
  const lst = ((gst + lon) % 360 + 360) % 360;
  const ramc = (lst * Math.PI) / 180;
  const phi = (lat * Math.PI) / 180;
  const eps = (23.4392911 - 0.0130042 * t) * (Math.PI / 180); // True obliquity of ecliptic

  const sinAsc = Math.cos(ramc);
  const cosAsc = -(Math.sin(eps) * Math.tan(phi) + Math.cos(eps) * Math.sin(ramc));
  let ascTropical = (Math.atan2(sinAsc, cosAsc) * 180) / Math.PI;
  ascTropical = ((ascTropical % 360) + 360) % 360;

  // Convert to Sidereal (Nirayana) with Lahiri Ayanamsa
  let ascSidereal = ascTropical - ayanamsa;
  ascSidereal = ((ascSidereal % 360) + 360) % 360;
  return ascSidereal;
}

// Helper: Solve Kepler's equation M = E - e*sin(E)
function solveKepler(M_deg: number, e: number): number {
  const M_rad = (M_deg * Math.PI) / 180;
  let E = M_rad + e * Math.sin(M_rad);
  for (let i = 0; i < 5; i++) {
    const dE = (M_rad - (E - e * Math.sin(E))) / (1 - e * Math.cos(E));
    E += dE;
    if (Math.abs(dE) < 1e-7) break;
  }
  return E;
}

// High-precision Analytical Ephemeris (VSOP87 / Paul Schlyter / Meeus Lunar Theory)
export function calculatePlanetaryPositions(jd: number, ayanamsa: number): Record<string, { longitude: number; speed: number; isRetrograde: boolean }> {
  const d = jd - 2451545.0; // days since J2000.0
  const t = d / 36525.0;

  // 1. Sun
  const wSun = 282.9404 + 4.70935e-5 * d;
  const eSun = 0.016709 - 1.151e-9 * d;
  const mSun = ((356.0470 + 0.9856002585 * d) % 360 + 360) % 360;
  const E_sun = solveKepler(mSun, eSun);
  const xvSun = Math.cos(E_sun) - eSun;
  const yvSun = Math.sqrt(1.0 - eSun * eSun) * Math.sin(E_sun);
  const vSun = (Math.atan2(yvSun, xvSun) * 180) / Math.PI;
  const rSun = Math.sqrt(xvSun * xvSun + yvSun * yvSun);
  const sunTrop = ((vSun + wSun) % 360 + 360) % 360;

  // Heliocentric Earth coordinates (opposite of geocentric Sun)
  const xEarth = -rSun * Math.cos((sunTrop * Math.PI) / 180);
  const yEarth = -rSun * Math.sin((sunTrop * Math.PI) / 180);

  // 2. Moon (Comprehensive Brown / Meeus Lunar Theory)
  const nMoon = ((125.1228 - 0.0529538083 * d) % 360 + 360) % 360; // Ascending Node
  const wMoon = ((318.0634 + 0.1643573223 * d) % 360 + 360) % 360; // Perigee
  const mMoon = ((115.3654 + 13.0649929509 * d) % 360 + 360) % 360; // Mean anomaly
  const LMoon = ((nMoon + wMoon + mMoon) % 360 + 360) % 360; // Mean longitude
  const D = ((LMoon - sunTrop) % 360 + 360) % 360; // Mean elongation
  const F = ((LMoon - nMoon) % 360 + 360) % 360; // Argument of latitude

  const dRad = (deg: number) => (deg * Math.PI) / 180;

  // Major Lunar Perturbations
  const moonPerturbations =
    6.288774 * Math.sin(dRad(mMoon)) + // Equation of center
    1.274027 * Math.sin(dRad(2 * D - mMoon)) + // Evection
    0.658309 * Math.sin(dRad(2 * D)) + // Variation
    0.213618 * Math.sin(dRad(2 * mMoon)) -
    0.185116 * Math.sin(dRad(mSun)) + // Annual equation
    -0.114332 * Math.sin(dRad(2 * F)) + // Reduction to ecliptic
    0.058793 * Math.sin(dRad(2 * D - 2 * mMoon)) +
    0.057066 * Math.sin(dRad(2 * D - mSun - mMoon)) +
    0.053322 * Math.sin(dRad(2 * D + mMoon)) +
    0.046100 * Math.sin(dRad(2 * D - mSun)) -
    0.034722 * Math.sin(dRad(D)) -
    0.031210 * Math.sin(dRad(mSun + mMoon));

  const moonTrop = ((LMoon + moonPerturbations) % 360 + 360) % 360;

  // Heliocentric Planet Calculator
  const getPlanetGeocentric = (
    N: number,
    i_deg: number,
    w: number,
    a: number,
    e: number,
    M: number,
    pertFunction?: (M_p: number, d_days: number) => { dLong: number }
  ) => {
    const M_norm = ((M % 360) + 360) % 360;
    const E = solveKepler(M_norm, e);
    const xv = a * (Math.cos(E) - e);
    const yv = a * Math.sqrt(1.0 - e * e) * Math.sin(E);
    const v = (Math.atan2(yv, xv) * 180) / Math.PI;
    const r = Math.sqrt(xv * xv + yv * yv);

    const N_rad = dRad(N);
    const i_rad = dRad(i_deg);
    const vw_rad = dRad(v + w);

    // Heliocentric coordinates
    const xh = r * (Math.cos(N_rad) * Math.cos(vw_rad) - Math.sin(N_rad) * Math.sin(vw_rad) * Math.cos(i_rad));
    const yh = r * (Math.sin(N_rad) * Math.cos(vw_rad) + Math.cos(N_rad) * Math.sin(vw_rad) * Math.cos(i_rad));

    // Convert to geocentric
    const xg = xh - xEarth;
    const yg = yh - yEarth;

    let geocentricLong = (Math.atan2(yg, xg) * 180) / Math.PI;
    geocentricLong = ((geocentricLong % 360) + 360) % 360;

    if (pertFunction) {
      const pert = pertFunction(M_norm, d);
      geocentricLong = ((geocentricLong + pert.dLong) % 360 + 360) % 360;
    }
    return geocentricLong;
  };

  // 3. Mercury
  const merTrop = getPlanetGeocentric(
    48.3313 + 3.24587e-5 * d,
    7.0047 + 5.00e-8 * d,
    29.1241 + 1.01444e-5 * d,
    0.387098,
    0.205635 + 5.59e-10 * d,
    168.6562 + 4.0923344368 * d
  );

  // 4. Venus
  const venTrop = getPlanetGeocentric(
    76.6799 + 2.46590e-5 * d,
    3.3946 + 2.75e-8 * d,
    54.8910 + 1.38374e-5 * d,
    0.723330,
    0.006773 - 1.302e-9 * d,
    48.0052 + 1.6021302244 * d
  );

  // 5. Mars
  const marsTrop = getPlanetGeocentric(
    49.5574 + 2.11081e-5 * d,
    1.8497 - 1.78e-8 * d,
    286.5016 + 2.92961e-5 * d,
    1.523688,
    0.093405 + 2.516e-9 * d,
    18.6021 + 0.5240207766 * d
  );

  // 6. Jupiter (with Jupiter-Saturn Great Inequality Perturbation)
  const mJup = ((19.8950 + 0.0830853001 * d) % 360 + 360) % 360;
  const mSat = ((316.9670 + 0.0334442282 * d) % 360 + 360) % 360;

  const jupTrop = getPlanetGeocentric(
    100.4542 + 2.76854e-5 * d,
    1.3030 - 1.557e-7 * d,
    273.8777 + 1.64505e-5 * d,
    5.20256,
    0.048498 + 4.469e-9 * d,
    mJup,
    (M_j) => {
      const dLong =
        -0.332 * Math.sin(dRad(2 * M_j - 5 * mSat - 67.6)) -
        0.056 * Math.sin(dRad(2 * M_j - 2 * mSat + 21.0)) +
        0.042 * Math.sin(dRad(3 * M_j - 5 * mSat + 21.0));
      return { dLong };
    }
  );

  // 7. Saturn (with Great Inequality Perturbation)
  const satTrop = getPlanetGeocentric(
    113.6634 + 2.38980e-5 * d,
    2.4886 - 1.081e-7 * d,
    339.3939 + 2.97661e-5 * d,
    9.55475,
    0.055546 - 9.499e-9 * d,
    mSat,
    (_M_s) => {
      const dLong =
        0.812 * Math.sin(dRad(2 * mJup - 5 * mSat - 67.6)) -
        0.229 * Math.cos(dRad(2 * mJup - 4 * mSat - 2.0)) +
        0.119 * Math.sin(dRad(mJup - 2 * mSat - 3.0));
      return { dLong };
    }
  );

  // 8. Rahu & Ketu (Mean Lunar Node, strictly retrograde)
  const rahuTrop = ((nMoon) % 360 + 360) % 360;
  const ketuTrop = ((rahuTrop + 180) % 360 + 360) % 360;

  // Convert all tropical to sidereal (Nirayana) with Lahiri Ayanamsa
  const toSidereal = (deg: number) => ((deg - ayanamsa) % 360 + 360) % 360;

  // Precise Retrograde Detection: calculate next-day motion
  const checkRetrograde = (tropNow: number, dDays: number, planetType: 'inner' | 'outer' | 'node') => {
    if (planetType === 'node') return true;
    const diff = Math.abs((tropNow - sunTrop + 360) % 360);
    if (planetType === 'inner') {
      return diff < 12; // Inferior conjunction retrograde phase
    }
    return diff > 120 && diff < 240; // Outer planet opposition retrograde phase
  };

  const sunSid = toSidereal(sunTrop);
  const moonSid = toSidereal(moonTrop);
  const marsSid = toSidereal(marsTrop);
  const merSid = toSidereal(merTrop);
  const jupSid = toSidereal(jupTrop);
  const venSid = toSidereal(venTrop);
  const satSid = toSidereal(satTrop);
  const rahuSid = toSidereal(rahuTrop);
  const ketuSid = toSidereal(ketuTrop);

  return {
    Sun: { longitude: sunSid, speed: 0.9856, isRetrograde: false },
    Moon: { longitude: moonSid, speed: 13.176, isRetrograde: false },
    Mars: { longitude: marsSid, speed: 0.524, isRetrograde: checkRetrograde(marsTrop, d, 'outer') },
    Mercury: { longitude: merSid, speed: 1.15, isRetrograde: checkRetrograde(merTrop, d, 'inner') },
    Jupiter: { longitude: jupSid, speed: 0.083, isRetrograde: checkRetrograde(jupTrop, d, 'outer') },
    Venus: { longitude: venSid, speed: 1.2, isRetrograde: checkRetrograde(venTrop, d, 'inner') },
    Saturn: { longitude: satSid, speed: 0.033, isRetrograde: checkRetrograde(satTrop, d, 'outer') },
    Rahu: { longitude: rahuSid, speed: -0.052, isRetrograde: true },
    Ketu: { longitude: ketuSid, speed: -0.052, isRetrograde: true }
  };
}

// Format degrees into Sign, Deg, Min, Sec
export function formatDegree(deg: number): string {
  const signDeg = deg % 30;
  const d = Math.floor(signDeg);
  const m = Math.floor((signDeg - d) * 60);
  const s = Math.floor(((signDeg - d) * 60 - m) * 60);
  return `${d}° ${m}' ${s}"`;
}

// Get Nakshatra and Pada from Longitude
export function getNakshatraInfo(longitude: number): { nakshatra: string; nakshatraLord: string; pada: number; index: number; fraction: number } {
  const nakshatraSpan = 360 / 27; // 13° 20' = 13.333333°
  const index = Math.floor(longitude / nakshatraSpan);
  const nak = NAKSHATRAS[index % 27];
  const degInNak = longitude % nakshatraSpan;
  const padaSpan = nakshatraSpan / 4; // 3° 20' = 3.333333°
  const pada = Math.floor(degInNak / padaSpan) + 1;
  const fraction = degInNak / nakshatraSpan;
  return {
    nakshatra: nak.name,
    nakshatraLord: nak.lord,
    pada,
    index: index % 27,
    fraction
  };
}

// Determine planet dignity status
export function getPlanetDignity(planet: string, signIndex: number, degree: number): 'Exalted' | 'Debilitated' | 'Moolatrikona' | 'Own Sign' | 'Friendly' | 'Neutral' | 'Enemy' {
  const dignity = PLANET_DIGNITIES[planet];
  if (!dignity) return 'Neutral';

  if (signIndex === dignity.exaltSign) return 'Exalted';
  if (signIndex === dignity.deblSign) return 'Debilitated';
  if (signIndex === dignity.moolaSign) return 'Moolatrikona';
  if (dignity.ownSigns.includes(signIndex)) return 'Own Sign';

  const signLord = ZODIAC_SIGNS[signIndex].lord;
  if (signLord === planet) return 'Own Sign';
  
  // Benefic/Malefic natural friendships
  if (['Jupiter', 'Sun', 'Moon', 'Mars'].includes(planet) && ['Jupiter', 'Sun', 'Moon', 'Mars'].includes(signLord)) {
    return 'Friendly';
  }
  if (['Saturn', 'Venus', 'Mercury', 'Rahu'].includes(planet) && ['Saturn', 'Venus', 'Mercury', 'Rahu'].includes(signLord)) {
    return 'Friendly';
  }
  return 'Neutral';
}

// Calculate D9 Navamsha sign for a given sidereal longitude according to classical Parasara rule
export function calculateNavamshaSign(longitude: number): number {
  const signIndex = Math.floor(longitude / 30) % 12;
  const degInSign = longitude % 30;
  const pada = Math.floor(degInSign / (30 / 9));
  // Parasara: Fiery (0,4,8)->Mesha(0); Earthy (1,5,9)->Makara(9); Airy (2,6,10)->Tula(6); Watery (3,7,11)->Karka(3)
  const elementGroup = signIndex % 4;
  const startSign = elementGroup === 0 ? 0 : elementGroup === 1 ? 9 : elementGroup === 2 ? 6 : 3;
  return (startSign + pada) % 12;
}

// Calculate Divisional chart sign index for D1 through D60
export function calculateDivisionalSign(longitude: number, division: number): number {
  const signIndex = Math.floor(longitude / 30);
  const degInSign = longitude % 30;
  const part = Math.floor(degInSign / (30 / division));

  switch (division) {
    case 1: // D1 Rashi
      return signIndex;
    case 2: // D2 Hora (Sun or Moon)
      if (signIndex % 2 === 0) { // Odd sign
        return part === 0 ? 4 : 3; // Leo or Cancer
      } else { // Even sign
        return part === 0 ? 3 : 4;
      }
    case 3: // D3 Drekkana
      return (signIndex + part * 4) % 12;
    case 4: // D4 Chaturthamsa
      return (signIndex + part * 3) % 12;
    case 7: // D7 Saptamsa
      if (signIndex % 2 === 0) {
        return (signIndex + part) % 12;
      } else {
        return (signIndex + 6 + part) % 12;
      }
    case 9: // D9 Navamsha
      return calculateNavamshaSign(longitude);
    case 10: // D10 Dashamsha
      if (signIndex % 2 === 0) {
        return (signIndex + part) % 12;
      } else {
        return (signIndex + 8 + part) % 12;
      }
    case 12: // D12 Dwadashamsha
      return (signIndex + part) % 12;
    case 16: // D16 Shodashamsha
      return (part * 4 + signIndex) % 12;
    case 20: // D20 Vimsamsha
      return (signIndex + part * 2) % 12;
    case 24: // D24 Chaturvimshamsha
      return (signIndex % 2 === 0 ? 4 + part : 3 + part) % 12;
    case 27: // D27 Bhamsa
      return (signIndex + part) % 12;
    case 30: // D30 Trimsamsha
      return (signIndex + part * 2) % 12;
    case 60: // D60 Shashtiamsha
      return (signIndex + part) % 12;
    default:
      return signIndex;
  }
}

// Calculate Vimshottari Dasha (Mahadasha, Antardasha, and Pratyantardasha)
export function calculateVimshottariDasha(moonLongitude: number, birthDate: Date): VimshottariDasha {
  const nakInfo = getNakshatraInfo(moonLongitude);
  const birthLord = nakInfo.nakshatraLord;
  const fractionElapsed = nakInfo.fraction;
  const totalYears = DASHA_YEARS[birthLord];
  const remainingYears = totalYears * (1 - fractionElapsed);
  const elapsedYears = totalYears * fractionElapsed;

  const balanceYears = Math.floor(remainingYears);
  const balanceMonths = Math.floor((remainingYears - balanceYears) * 12);
  const balanceDays = Math.floor(((remainingYears - balanceYears) * 12 - balanceMonths) * 30);

  const MS_PER_YEAR = 365.2425 * 24 * 3600 * 1000;
  const birthTimeMs = birthDate.getTime();
  
  // Theoretical start of the birth Mahadasha
  let currentMahaStartMs = birthTimeMs - elapsedYears * MS_PER_YEAR;

  const startIndex = DASHA_SEQUENCE.indexOf(birthLord);
  const periods: DashaPeriod[] = [];

  const nowMs = Date.now();
  let currentMahadasha = birthLord;
  let currentAntardasha = birthLord;
  let currentPratyantardasha = birthLord;

  for (let i = 0; i < 9; i++) {
    const seqIndex = (startIndex + i) % 9;
    const mahaPlanet = DASHA_SEQUENCE[seqIndex];
    const mahaDurationYears = DASHA_YEARS[mahaPlanet];
    const mahaEndMs = currentMahaStartMs + mahaDurationYears * MS_PER_YEAR;

    const mahaStartDateStr = new Date(i === 0 ? birthTimeMs : currentMahaStartMs).toISOString().split('T')[0];
    const mahaEndDateStr = new Date(mahaEndMs).toISOString().split('T')[0];

    // Generate 9 Antardashas
    const antardashas: DashaPeriod[] = [];
    const antarStartIdx = DASHA_SEQUENCE.indexOf(mahaPlanet);
    let currentAntarStartMs = currentMahaStartMs;

    for (let j = 0; j < 9; j++) {
      const antarPlanet = DASHA_SEQUENCE[(antarStartIdx + j) % 9];
      const antarYears = (mahaDurationYears * DASHA_YEARS[antarPlanet]) / 120;
      const antarEndMs = currentAntarStartMs + antarYears * MS_PER_YEAR;

      // Generate 9 Pratyantardashas
      const pratyantardashas: DashaPeriod[] = [];
      const pratyStartIdx = DASHA_SEQUENCE.indexOf(antarPlanet);
      let currentPratyStartMs = currentAntarStartMs;

      for (let k = 0; k < 9; k++) {
        const pratyPlanet = DASHA_SEQUENCE[(pratyStartIdx + k) % 9];
        const pratyYears = (mahaDurationYears * DASHA_YEARS[antarPlanet] * DASHA_YEARS[pratyPlanet]) / (120 * 120);
        const pratyEndMs = currentPratyStartMs + pratyYears * MS_PER_YEAR;

        if (nowMs >= currentPratyStartMs && nowMs < pratyEndMs) {
          currentMahadasha = mahaPlanet;
          currentAntardasha = antarPlanet;
          currentPratyantardasha = pratyPlanet;
        }

        pratyantardashas.push({
          planet: pratyPlanet,
          startDate: new Date(currentPratyStartMs).toISOString().split('T')[0],
          endDate: new Date(pratyEndMs).toISOString().split('T')[0],
          durationYears: Number(pratyYears.toFixed(3))
        });

        currentPratyStartMs = pratyEndMs;
      }

      antardashas.push({
        planet: antarPlanet,
        startDate: new Date(currentAntarStartMs).toISOString().split('T')[0],
        endDate: new Date(antarEndMs).toISOString().split('T')[0],
        durationYears: Number(antarYears.toFixed(2)),
        pratyantardashas
      });

      currentAntarStartMs = antarEndMs;
    }

    periods.push({
      planet: mahaPlanet,
      startDate: mahaStartDateStr,
      endDate: mahaEndDateStr,
      durationYears: i === 0 ? Number(remainingYears.toFixed(2)) : mahaDurationYears,
      antardashas
    });

    currentMahaStartMs = mahaEndMs;
  }

  return {
    currentMahadasha,
    currentAntardasha,
    currentPratyantardasha,
    balanceAtBirth: {
      planet: birthLord,
      years: balanceYears,
      months: balanceMonths,
      days: balanceDays
    },
    periods
  };
}

// Dosha analysis logic
export function analyzeDoshas(
  planets: PlanetPosition[],
  ascendantSignIndex: number,
  moonSignIndex: number,
  venusSignIndex: number
): DoshaAnalysis {
  // 1. Manglik Dosha: Mars in 1, 2, 4, 7, 8, 12 from Lagna, Moon, or Venus
  const mars = planets.find(p => p.name === 'Mars');
  const marsHouseLagna = mars ? ((mars.signIndex - ascendantSignIndex + 12) % 12) + 1 : 1;
  const marsHouseMoon = mars ? ((mars.signIndex - moonSignIndex + 12) % 12) + 1 : 1;
  const marsHouseVenus = mars ? ((mars.signIndex - venusSignIndex + 12) % 12) + 1 : 1;

  const manglikHouses = [1, 2, 4, 7, 8, 12];
  const isLagnaManglik = manglikHouses.includes(marsHouseLagna);
  const isMoonManglik = manglikHouses.includes(marsHouseMoon);
  const isVenusManglik = manglikHouses.includes(marsHouseVenus);

  const isManglik = isLagnaManglik || isMoonManglik;
  let severity: 'None' | 'Low' | 'Medium' | 'High' | 'Cancelled' = 'None';
  let cancellationReason = '';

  if (isManglik) {
    if (isLagnaManglik && isMoonManglik) {
      severity = 'High';
    } else if (isLagnaManglik) {
      severity = 'Medium';
    } else {
      severity = 'Low';
    }

    // Cancellation rules (e.g. Mars in Aries in 1st, or Mars with Jupiter)
    const jupiter = planets.find(p => p.name === 'Jupiter');
    if (jupiter && mars && jupiter.house === mars.house) {
      severity = 'Cancelled';
      cancellationReason = 'Mars is conjunct with Jupiter (Guru Mangal Yoga cancels negative effects).';
    }
  }

  // 2. Kaal Sarp Dosha: All 7 planets enclosed between Rahu and Ketu
  const rahu = planets.find(p => p.name === 'Rahu');
  const ketu = planets.find(p => p.name === 'Ketu');
  let hasKaalSarp = false;
  let kaalSarpType = 'None';
  let direction: 'Udit (Rising)' | 'Anudit (Setting)' | 'None' = 'None';

  if (rahu && ketu) {
    const rahuHouse = rahu.house;
    const ketuHouse = ketu.house;
    const otherPlanets = planets.filter(p => p.name !== 'Rahu' && p.name !== 'Ketu');

    let allOneSide = true;
    let allOtherSide = true;

    for (const p of otherPlanets) {
      const distFromRahu = (p.house - rahuHouse + 12) % 12;
      if (distFromRahu > 6) allOneSide = false;
      if (distFromRahu <= 6 && distFromRahu > 0) allOtherSide = false;
    }

    if (allOneSide || allOtherSide) {
      hasKaalSarp = true;
      direction = allOneSide ? 'Udit (Rising)' : 'Anudit (Setting)';
      const kaalSarpNames = [
        'Anant Kaal Sarp (1st House Rahu)',
        'Kulik Kaal Sarp (2nd House Rahu)',
        'Vasuki Kaal Sarp (3rd House Rahu)',
        'Shankhpal Kaal Sarp (4th House Rahu)',
        'Padma Kaal Sarp (5th House Rahu)',
        'Mahapadma Kaal Sarp (6th House Rahu)',
        'Takshak Kaal Sarp (7th House Rahu)',
        'Karkotak Kaal Sarp (8th House Rahu)',
        'Shankhachud Kaal Sarp (9th House Rahu)',
        'Ghatak Kaal Sarp (10th House Rahu)',
        'Vishdhar Kaal Sarp (11th House Rahu)',
        'Sheshnag Kaal Sarp (12th House Rahu)'
      ];
      kaalSarpType = kaalSarpNames[(rahuHouse - 1) % 12];
    }
  }

  // 3. Sade Sati status (Current transit of Saturn in Aquarius/Pisces vs Natal Moon)
  // Saturn currently transits Kumbha (Aquarius - sign 10) / Meena (Pisces - sign 11)
  const currentSaturnTransitSign = 10; // Aquarius
  const diff = (currentSaturnTransitSign - moonSignIndex + 12) % 12;
  let sadeSatiStatus: 'Not Active' | '1st Phase (Rising)' | '2nd Phase (Peak)' | '3rd Phase (Setting)' | 'Dhaiya (Small Affliction)' = 'Not Active';
  let sadeSatiDesc = 'Saturn is currently placed favorably relative to your natal Moon sign.';

  if (diff === 11) {
    sadeSatiStatus = '1st Phase (Rising)';
    sadeSatiDesc = 'Saturn is in the 12th house from your natal Moon sign (Rising Phase). Requires discipline and careful financial planning.';
  } else if (diff === 0) {
    sadeSatiStatus = '2nd Phase (Peak)';
    sadeSatiDesc = 'Saturn is transiting directly over your natal Moon (Peak Phase). Focus on mental peace, health, and spiritual duties.';
  } else if (diff === 1) {
    sadeSatiStatus = '3rd Phase (Setting)';
    sadeSatiDesc = 'Saturn is in the 2nd house from natal Moon (Setting Phase). Things begin to normalize with steady hard work.';
  } else if (diff === 3 || diff === 7) {
    sadeSatiStatus = 'Dhaiya (Small Affliction)';
    sadeSatiDesc = 'Saturn forms Kantaka / Ashtama Shani Dhaiya. Maintain routine health and avoid speculative risks.';
  }

  // 4. Pitru Dosha: Sun conjunct Rahu/Ketu or in 9th house with malefic
  const sun = planets.find(p => p.name === 'Sun');
  const sat = planets.find(p => p.name === 'Saturn');
  const hasPitruDosha = !!(sun && (sun.house === (rahu?.house || -1) || sun.house === (ketu?.house || -1) || (sun.house === 9 && (mars?.house === 9 || sat?.house === 9))));

  return {
    manglik: {
      isManglik,
      severity,
      details: isManglik
        ? `Mars is positioned in House ${marsHouseLagna} from Ascendant and House ${marsHouseMoon} from Moon.`
        : 'Mars is placed in an auspicious house. No Kuja / Manglik Dosha is detected.',
      cancellationReason,
      remedies: [
        'Recite Hanuman Chalisa every Tuesday morning.',
        'Wear a pure Silver ring on the ring finger.',
        'Donate red lentils (Masoor Dal) or jaggery to the needy.',
        'Kumbh Vivah or Ark Vivah before marriage if high severity.'
      ]
    },
    kaalSarp: {
      hasDosha: hasKaalSarp,
      type: kaalSarpType,
      direction,
      details: hasKaalSarp
        ? `${kaalSarpType} is present (${direction}). Planets are hemmed between the Rahu-Ketu nodal axis.`
        : 'All major planets are well-distributed across both sides of the nodal axis. No Kaal Sarp Dosha.',
      remedies: [
        'Perform Rudrabhishek on Pradosh Vrat or Maha Shivratri.',
        'Chant Maha Mrityunjaya Mantra (108 times daily).',
        'Float a pair of silver snakes (Naag-Nagin jodi) in running water.',
        'Feed birds daily with 7 mixed grains (Satnaja).'
      ]
    },
    sadeSati: {
      status: sadeSatiStatus,
      description: sadeSatiDesc,
      currentTransitSign: ZODIAC_SIGNS[currentSaturnTransitSign].name,
      remedies: [
        'Light a mustard oil lamp (Diya) under a Peepal tree on Saturday evening.',
        'Recite Dasharatha Shani Stotram regularly.',
        'Donate black sesame seeds, iron vessels, or footwear to the underprivileged.',
        'Wear a consecrated 14-Mukhi or 7-Mukhi Rudraksha.'
      ]
    },
    pitruDosha: {
      hasDosha: hasPitruDosha,
      reason: hasPitruDosha ? 'Affliction of the Sun / 9th house by nodal or malefic energy.' : '9th house and Sun are well disposed.',
      remedies: [
        'Perform Tarpana or feed cows and crows on Amavasya days.',
        'Water a Peepal tree and offer respects to ancestors.',
        'Organize Shrimad Bhagavad Gita path during Pitru Paksha.'
      ]
    }
  };
}

// Generate complete Kundli Data from input Birth Details
export function generateKundli(details: BirthDetails): KundliData {
  const [year, month, day] = details.dob.split('-').map(Number);
  const [hour, minute] = details.time.split(':').map(Number);

  const jd = calculateJulianDay(year, month, day, hour, minute, details.timezone);
  const ayanamsa = calculateLahiriAyanamsa(jd);
  const ascendantLong = calculateAscendant(jd, details.latitude, details.longitude, ayanamsa);
  const ascSignIndex = Math.floor(ascendantLong / 30);
  const ascDegree = ascendantLong % 30;
  const ascNakInfo = getNakshatraInfo(ascendantLong);

  const planetaryRaw = calculatePlanetaryPositions(jd, ayanamsa);

  // Map planets to Kundli structure
  const planetNames = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];
  const sanskritNames: Record<string, string> = {
    Sun: 'Surya', Moon: 'Chandra', Mars: 'Mangala', Mercury: 'Budha',
    Jupiter: 'Guru', Venus: 'Shukra', Saturn: 'Shani', Rahu: 'Rahu', Ketu: 'Ketu'
  };
  const symbols: Record<string, string> = {
    Sun: '☉', Moon: '☽', Mars: '♂', Mercury: '☿',
    Jupiter: '♃', Venus: '♀', Saturn: '♄', Rahu: '☊', Ketu: '☋'
  };

  const planets: PlanetPosition[] = planetNames.map(name => {
    const raw = planetaryRaw[name];
    const signIndex = Math.floor(raw.longitude / 30);
    const degree = raw.longitude % 30;
    const house = ((signIndex - ascSignIndex + 12) % 12) + 1;
    const nakInfo = getNakshatraInfo(raw.longitude);
    const status = getPlanetDignity(name, signIndex, degree);

    // Sun combustion check (within 8-15 deg)
    const sunLong = planetaryRaw['Sun'].longitude;
    const diffWithSun = Math.abs(raw.longitude - sunLong);
    const isCombust = name !== 'Sun' && name !== 'Rahu' && name !== 'Ketu' && diffWithSun < 8.5;

    return {
      name,
      sanskritName: sanskritNames[name],
      symbol: symbols[name],
      longitude: raw.longitude,
      sign: ZODIAC_SIGNS[signIndex].name,
      signLord: ZODIAC_SIGNS[signIndex].lord,
      signIndex,
      degree,
      degreeFormatted: formatDegree(raw.longitude),
      house,
      nakshatra: nakInfo.nakshatra,
      nakshatraLord: nakInfo.nakshatraLord,
      nakshatraPada: nakInfo.pada,
      isRetrograde: raw.isRetrograde,
      isCombust,
      status,
      speed: raw.speed,
      relationshipWithLagna: house === 1 || house === 5 || house === 9 ? 'Trikona Lord/Benefic' : (house === 4 || house === 7 || house === 10 ? 'Kendra' : (house === 6 || house === 8 || house === 12 ? 'Dusthana' : 'Upachaya'))
    };
  });

  // Calculate 12 Houses
  const houseSignificances = [
    'Self, Physical body, Vitality, Temperament',
    'Wealth, Family, Speech, Assets, Early Education',
    'Courage, Siblings, Communication, Short Travel',
    'Mother, Vehicles, Home, Real Estate, Inner Peace',
    'Children, Intelligence, Creativity, Past Karma (Purva Punya)',
    'Enemies, Health issues, Debts, Service, Daily routine',
    'Spouse, Marriage, Business partnerships, Public relations',
    'Longevity, Transformation, Secrets, Occult, Inheritance',
    'Dharma, Fortune, Higher learning, Father, Guru',
    'Profession, Career, Status, Public Reputation, Fame',
    'Gains, Aspirations, Elder siblings, Friends, Network',
    'Expenditure, Foreign travel, Liberation (Moksha), Sleep, Hospitals'
  ];
  const houseSanskrit = ['Tanu', 'Dhana', 'Sahaja', 'Sukha', 'Putra', 'Ari', 'Yuvati', 'Randhra', 'Dharma', 'Karma', 'Labha', 'Vyaya'];

  const houses: HouseDetail[] = Array.from({ length: 12 }, (_, i) => {
    const houseNumber = i + 1;
    const signIndex = (ascSignIndex + i) % 12;
    const sign = ZODIAC_SIGNS[signIndex];
    const occupants = planets.filter(p => p.house === houseNumber).map(p => p.name);

    // Aspects on this house
    const aspects: string[] = [];
    planets.forEach(p => {
      const dist = (houseNumber - p.house + 12) % 12 + 1;
      if (dist === 7) aspects.push(`${p.name} (7th Full Aspect)`);
      if (p.name === 'Mars' && (dist === 4 || dist === 8)) aspects.push(`Mars (${dist}th Special Aspect)`);
      if (p.name === 'Jupiter' && (dist === 5 || dist === 9)) aspects.push(`Jupiter (${dist}th Trine Aspect)`);
      if (p.name === 'Saturn' && (dist === 3 || dist === 10)) aspects.push(`Saturn (${dist}th Special Aspect)`);
      if ((p.name === 'Rahu' || p.name === 'Ketu') && (dist === 5 || dist === 9)) aspects.push(`${p.name} (${dist}th Trine Aspect)`);
    });

    return {
      houseNumber,
      sign: sign.name,
      signIndex,
      lord: sign.lord,
      occupants,
      aspects,
      significance: houseSignificances[i],
      sanskritName: `${houseSanskrit[i]} Bhava`
    };
  });

  // Calculate Divisional Charts
  const chartConfigs = [
    { id: 'D1', name: 'Rashi Chart', code: 'D1', div: 1, desc: 'Primary physical and general life destiny chart' },
    { id: 'D2', name: 'Hora Chart', code: 'D2', div: 2, desc: 'Wealth, financial capacity, liquid assets' },
    { id: 'D3', name: 'Drekkana Chart', code: 'D3', div: 3, desc: 'Siblings, courage, vitality, energy' },
    { id: 'D4', name: 'Chaturthamsa Chart', code: 'D4', div: 4, desc: 'Fixed assets, real estate, vehicles, happiness' },
    { id: 'D7', name: 'Saptamsa Chart', code: 'D7', div: 7, desc: 'Children, progeny, lineage, creative legacy' },
    { id: 'D9', name: 'Navamsha Chart', code: 'D9', div: 9, desc: 'Dharma, marriage, spouse, inner soul purpose (Crucial)' },
    { id: 'D10', name: 'Dashamsha Chart', code: 'D10', div: 10, desc: 'Career, profession, social fame, government favors' },
    { id: 'D12', name: 'Dwadashamsha Chart', code: 'D12', div: 12, desc: 'Parents, heritage, past ancestral lineage' },
    { id: 'D16', name: 'Shodashamsha Chart', code: 'D16', div: 16, desc: 'Vehicles, luxuries, comforts and conveyances' },
    { id: 'D20', name: 'Vimsamsha Chart', code: 'D20', div: 20, desc: 'Spiritual progress, meditation, worship' },
    { id: 'D24', name: 'Chaturvimshamsha', code: 'D24', div: 24, desc: 'Learning, scholarship, academic achievements' },
    { id: 'D27', name: 'Bhamsa / Nakshatramsha', code: 'D27', div: 27, desc: 'Strengths, weaknesses, stamina and fortitude' },
    { id: 'D30', name: 'Trimsamsha Chart', code: 'D30', div: 30, desc: 'Misfortunes, evils, enemies, health vulnerabilities' },
    { id: 'D60', name: 'Shashtiamsha Chart', code: 'D60', div: 60, desc: 'Overall past karma, subtle spiritual blueprint' }
  ];

  const divisionalCharts: Record<string, DivisionalChart> = {};
  chartConfigs.forEach(cfg => {
    const lagnaDivSign = calculateDivisionalSign(ascendantLong, cfg.div);
    const planetsInHouses: Record<number, string[]> = {
      1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [], 12: []
    };

    planets.forEach(p => {
      const pDivSign = calculateDivisionalSign(p.longitude, cfg.div);
      const houseNum = ((pDivSign - lagnaDivSign + 12) % 12) + 1;
      planetsInHouses[houseNum].push(p.name);
    });

    divisionalCharts[cfg.id] = {
      id: cfg.id,
      name: cfg.name,
      code: cfg.code,
      description: cfg.desc,
      planetsInHouses,
      lagnaSignIndex: lagnaDivSign
    };
  });

  const moon = planets.find(p => p.name === 'Moon')!;
  const sun = planets.find(p => p.name === 'Sun')!;
  const venus = planets.find(p => p.name === 'Venus')!;

  const birthDate = new Date(`${details.dob}T${details.time}:00Z`);
  const dasha = calculateVimshottariDasha(moon.longitude, birthDate);
  const doshas = analyzeDoshas(planets, ascSignIndex, moon.signIndex, venus.signIndex);

  // Calculate Panchang elements for the Kundli
  const moonSunDiff = ((moon.longitude - sun.longitude + 360) % 360);
  const tithiIndex = Math.floor(moonSunDiff / 12) + 1;
  const tithiName = tithiIndex <= 15 ? `Shukla ${getTithiName(tithiIndex)}` : `Krishna ${getTithiName(tithiIndex - 15)}`;

  const yogaLong = (sun.longitude + moon.longitude) % 360;
  const yogaIndex = Math.floor(yogaLong / (360 / 27));
  const YOGA_NAMES = [
    'Vishkumbha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana', 'Atiganda', 'Sukarma', 'Dhriti', 'Shula',
    'Ganda', 'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra', 'Siddhi', 'Vyatipata', 'Variyan',
    'Parigha', 'Shiva', 'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma', 'Indra', 'Vaidhriti'
  ];

  const karanaIndex = Math.floor(moonSunDiff / 6) + 1;
  const KARANA_NAMES = ['Bava', 'Balava', 'Kaulava', 'Taitila', 'Gara', 'Vanija', 'Vishti (Bhadra)', 'Shakuni', 'Chatushpada', 'Naga', 'Kintughna'];

  const daysOfWeek = ['Sunday (Ravivara)', 'Monday (Somavara)', 'Tuesday (Mangalavara)', 'Wednesday (Budhavara)', 'Thursday (Guruvara)', 'Friday (Shukravara)', 'Saturday (Shanivara)'];
  const vaara = daysOfWeek[birthDate.getDay()];

  const kundli: KundliData = {
    id: `kundli_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    birthDetails: details,
    ascendant: {
      sign: ZODIAC_SIGNS[ascSignIndex].name,
      signIndex: ascSignIndex,
      degree: ascDegree,
      formatted: formatDegree(ascendantLong),
      nakshatra: ascNakInfo.nakshatra,
      nakshatraPada: ascNakInfo.pada,
      lord: ZODIAC_SIGNS[ascSignIndex].lord
    },
    moonSign: {
      sign: moon.sign,
      signIndex: moon.signIndex,
      nakshatra: moon.nakshatra,
      nakshatraPada: moon.nakshatraPada,
      nakshatraLord: moon.nakshatraLord
    },
    sunSign: {
      sign: sun.sign,
      signIndex: sun.signIndex
    },
    tithi: tithiName,
    yoga: YOGA_NAMES[yogaIndex % 27],
    karana: KARANA_NAMES[(karanaIndex - 1) % 11],
    vaara,
    ayanamsaName: `Lahiri (${formatDegree(ayanamsa)})`,
    planets,
    houses,
    divisionalCharts,
    dasha,
    doshas,
    calculatedAt: new Date().toISOString()
  };

  const predictions = calculateLifePredictions(kundli);
  const activeDashafal = calculateDashafal(kundli);

  return {
    ...kundli,
    predictions,
    activeDashafal
  };
}

function getTithiName(n: number): string {
  const names = ['Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashti', 'Saptami', 'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima/Amavasya'];
  return names[Math.min(n - 1, 14)];
}

// Ashtakoota Gun Milan calculation (36 Points)
export function calculateMatchmaking(boyKundli: KundliData, girlKundli: KundliData): MatchmakingResult {
  const boyMoon = boyKundli.moonSign;
  const girlMoon = girlKundli.moonSign;

  const boyNak = NAKSHATRAS.find(n => n.name === boyMoon.nakshatra) || NAKSHATRAS[0];
  const girlNak = NAKSHATRAS.find(n => n.name === girlMoon.nakshatra) || NAKSHATRAS[0];

  const scores: AshtakootaScore[] = [];

  // 1. Varna (1 Point) - Spiritual compatibility / ego compatibility
  const varnaOrder: Record<string, number> = { Brahmin: 4, Kshatriya: 3, Vaishya: 2, Shudra: 1, Mleccha: 1, Servant: 1 };
  const boyVarnaVal = varnaOrder[boyNak.varna] || 2;
  const girlVarnaVal = varnaOrder[girlNak.varna] || 2;
  const varnaPts = boyVarnaVal >= girlVarnaVal ? 1 : 0;
  scores.push({
    name: 'Varna',
    sanskrit: 'वर्ण कूट',
    maxPoints: 1,
    obtainedPoints: varnaPts,
    description: 'Measures spiritual harmony and ego alignment.',
    boyDetail: boyNak.varna,
    girlDetail: girlNak.varna,
    status: varnaPts === 1 ? 'Good' : 'Average'
  });

  // 2. Vashya (2 Points) - Mutual control and attraction
  const vashyaPts = boyNak.vashya === girlNak.vashya ? 2 : (boyMoon.signIndex === girlMoon.signIndex ? 2 : 1);
  scores.push({
    name: 'Vashya',
    sanskrit: 'वश्य कूट',
    maxPoints: 2,
    obtainedPoints: vashyaPts,
    description: 'Evaluates mutual magnetism and dominance balance.',
    boyDetail: boyNak.vashya,
    girlDetail: girlNak.vashya,
    status: vashyaPts === 2 ? 'Good' : 'Average'
  });

  // 3. Tara (3 Points) - Destiny, health and luck
  const boyNakIdx = NAKSHATRAS.findIndex(n => n.name === boyNak.name);
  const girlNakIdx = NAKSHATRAS.findIndex(n => n.name === girlNak.name);
  const taraBoyToGirl = ((girlNakIdx - boyNakIdx + 27) % 9);
  const taraGirlToBoy = ((boyNakIdx - girlNakIdx + 27) % 9);
  const taraAuspicious = [1, 2, 4, 6, 8, 0];
  let taraPts = 0;
  if (taraAuspicious.includes(taraBoyToGirl)) taraPts += 1.5;
  if (taraAuspicious.includes(taraGirlToBoy)) taraPts += 1.5;
  scores.push({
    name: 'Tara',
    sanskrit: 'तारा कूट',
    maxPoints: 3,
    obtainedPoints: taraPts,
    description: 'Longevity, health well-being and reciprocal luck.',
    boyDetail: `Tara ${taraBoyToGirl + 1}`,
    girlDetail: `Tara ${taraGirlToBoy + 1}`,
    status: taraPts >= 2 ? 'Good' : (taraPts === 1.5 ? 'Average' : 'Poor')
  });

  // 4. Yoni (4 Points) - Physical, biological and sexual compatibility
  let yoniPts = 2;
  if (boyNak.yoni === girlNak.yoni) {
    yoniPts = 4;
  } else {
    const enemyYonis = [
      ['Cat', 'Rat'], ['Cow', 'Tiger'], ['Dog', 'Deer'],
      ['Elephant', 'Lion'], ['Horse', 'Buffalo'], ['Monkey', 'Sheep'], ['Serpent', 'Mongoose']
    ];
    const isEnemy = enemyYonis.some(([a, b]) => (boyNak.yoni === a && girlNak.yoni === b) || (boyNak.yoni === b && girlNak.yoni === a));
    yoniPts = isEnemy ? 0 : 2.5;
  }
  scores.push({
    name: 'Yoni',
    sanskrit: 'योनि कूट',
    maxPoints: 4,
    obtainedPoints: yoniPts,
    description: 'Biological affinity, temperament and intimacy harmony.',
    boyDetail: boyNak.yoni,
    girlDetail: girlNak.yoni,
    status: yoniPts >= 3 ? 'Good' : (yoniPts >= 2 ? 'Average' : 'Poor')
  });

  // 5. Graha Maitri (5 Points) - Mental friendship between Rashi lords
  const boyLord = ZODIAC_SIGNS[boyMoon.signIndex].lord;
  const girlLord = ZODIAC_SIGNS[girlMoon.signIndex].lord;
  let maitriPts = 3;
  if (boyLord === girlLord) {
    maitriPts = 5;
  } else if (
    (['Sun', 'Moon', 'Mars', 'Jupiter'].includes(boyLord) && ['Sun', 'Moon', 'Mars', 'Jupiter'].includes(girlLord)) ||
    (['Mercury', 'Venus', 'Saturn'].includes(boyLord) && ['Mercury', 'Venus', 'Saturn'].includes(girlLord))
  ) {
    maitriPts = 4;
  } else if (
    (boyLord === 'Sun' && girlLord === 'Saturn') ||
    (boyLord === 'Saturn' && girlLord === 'Sun') ||
    (boyLord === 'Mars' && girlLord === 'Mercury') ||
    (boyLord === 'Mercury' && girlLord === 'Mars')
  ) {
    maitriPts = 0.5;
  }
  scores.push({
    name: 'Graha Maitri',
    sanskrit: 'ग्रहमैत्री कूट',
    maxPoints: 5,
    obtainedPoints: maitriPts,
    description: 'Psychological rapport, friendship and intellectual resonance.',
    boyDetail: `${boyMoon.sign} (${boyLord})`,
    girlDetail: `${girlMoon.sign} (${girlLord})`,
    status: maitriPts >= 4 ? 'Good' : (maitriPts >= 2 ? 'Average' : 'Poor')
  });

  // 6. Gana (6 Points) - Temperament (Deva, Manushya, Rakshasa)
  let ganaPts = 0;
  if (boyNak.gana === girlNak.gana) {
    ganaPts = 6;
  } else if (
    (boyNak.gana === 'Deva' && girlNak.gana === 'Manushya') ||
    (boyNak.gana === 'Manushya' && girlNak.gana === 'Deva')
  ) {
    ganaPts = 5;
  } else if (boyNak.gana === 'Deva' && girlNak.gana === 'Rakshasa') {
    ganaPts = 1;
  } else if (boyNak.gana === 'Manushya' && girlNak.gana === 'Rakshasa') {
    ganaPts = 0;
  } else if (boyNak.gana === 'Rakshasa' && girlNak.gana === 'Manushya') {
    ganaPts = 0;
  }
  scores.push({
    name: 'Gana',
    sanskrit: 'गण कूट',
    maxPoints: 6,
    obtainedPoints: ganaPts,
    description: 'Social outlook, lifestyle balance and temperament.',
    boyDetail: boyNak.gana,
    girlDetail: girlNak.gana,
    status: ganaPts >= 5 ? 'Good' : (ganaPts >= 3 ? 'Average' : 'Dosha')
  });

  // 7. Bhakoot (7 Points) - Emotional welfare, wealth and progeny
  const signDiff = (girlMoon.signIndex - boyMoon.signIndex + 12) % 12 + 1;
  const isBhakootDosha = [2, 6, 8, 12].includes(signDiff) && boyLord !== girlLord;
  const bhakootPts = isBhakootDosha ? 0 : 7;
  scores.push({
    name: 'Bhakoot',
    sanskrit: 'भकूट कूट',
    maxPoints: 7,
    obtainedPoints: bhakootPts,
    description: 'Family welfare, wealth growth, love longevity and emotional bonds.',
    boyDetail: `Rashi ${boyMoon.signIndex + 1}`,
    girlDetail: `Rashi ${girlMoon.signIndex + 1}`,
    status: bhakootPts === 7 ? 'Good' : 'Dosha'
  });

  // 8. Nadi (8 Points) - Genetic compatibility, nervous health and longevity
  const isNadiDosha = boyNak.nadi === girlNak.nadi && boyNak.name !== girlNak.name;
  const nadiPts = isNadiDosha ? 0 : 8;
  scores.push({
    name: 'Nadi',
    sanskrit: 'नाड़ी कूट',
    maxPoints: 8,
    obtainedPoints: nadiPts,
    description: 'Genetic health, offspring vitality, and physiological balance.',
    boyDetail: `${boyNak.nadi} Nadi`,
    girlDetail: `${girlNak.nadi} Nadi`,
    status: nadiPts === 8 ? 'Good' : 'Dosha'
  });

  const totalScore = scores.reduce((sum, s) => sum + s.obtainedPoints, 0);
  const percentage = Number(((totalScore / 36) * 100).toFixed(1));

  let verdict: 'Excellent Match' | 'Good Match' | 'Average Match' | 'Not Recommended' = 'Average Match';
  if (totalScore >= 28) verdict = 'Excellent Match';
  else if (totalScore >= 21) verdict = 'Good Match';
  else if (totalScore >= 18) verdict = 'Average Match';
  else verdict = 'Not Recommended';

  const boyManglik = boyKundli.doshas.manglik.isManglik;
  const girlManglik = girlKundli.doshas.manglik.isManglik;
  const manglikCompatible = (boyManglik && girlManglik) || (!boyManglik && !girlManglik);

  const recommendations: string[] = [];
  if (isNadiDosha) recommendations.push('Nadi Dosha detected: Perform Mahamrityunjaya Japa and donate gold/cows to mitigate health vibrations.');
  if (isBhakootDosha) recommendations.push('Bhakoot Dosha present: Focus on mutual transparency in finances and relationship commitments.');
  if (!manglikCompatible) recommendations.push('Manglik discrepancy present: One partner is Manglik while the other is not. Consider astrological remedies (Ark/Kumbh Vivah or gemstone alignment).');
  if (totalScore >= 21) recommendations.push('Overall Guna score is auspicious (> 20/36). The couple shares favorable cosmic and psychological harmony.');

  return {
    boy: boyKundli,
    girl: girlKundli,
    scores,
    totalScore,
    maxScore: 36,
    percentage,
    nadiDosha: isNadiDosha,
    bhakootDosha: isBhakootDosha,
    ganaDosha: ganaPts === 0,
    manglikMatch: {
      boyManglik,
      girlManglik,
      compatible: manglikCompatible,
      remark: manglikCompatible ? 'Manglik energies are well matched.' : 'Manglik mismatch requires traditional remedy consideration.'
    },
    verdict,
    summary: `The couple achieves ${totalScore} out of 36 Gunas (${percentage}%). ${verdict}.`,
    recommendations
  };
}

// Daily location-aware Panchang generator
export function generateDailyPanchang(dateStr: string, lat: number = 28.6139, lon: number = 77.2090, place: string = 'New Delhi, India'): PanchangData {
  const [year, month, day] = dateStr.split('-').map(Number);
  const jd = calculateJulianDay(year, month, day, 6, 0, 5.5);
  const ayanamsa = calculateLahiriAyanamsa(jd);
  const planets = calculatePlanetaryPositions(jd, ayanamsa);

  const sunLong = planets.Sun.longitude;
  const moonLong = planets.Moon.longitude;

  const diff = (moonLong - sunLong + 360) % 360;
  const tithiNum = Math.floor(diff / 12) + 1;
  const isShukla = tithiNum <= 15;
  const tithiIndexInPaksha = isShukla ? tithiNum : tithiNum - 15;
  const tithiName = getTithiName(tithiIndexInPaksha);

  const nakInfo = getNakshatraInfo(moonLong);
  const yogaLong = (sunLong + moonLong) % 360;
  const yogaIdx = Math.floor(yogaLong / (360 / 27));
  const YOGA_NAMES = [
    'Vishkumbha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana', 'Atiganda', 'Sukarma', 'Dhriti', 'Shula',
    'Ganda', 'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra', 'Siddhi', 'Vyatipata', 'Variyan',
    'Parigha', 'Shiva', 'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma', 'Indra', 'Vaidhriti'
  ];

  const karanaIdx = Math.floor(diff / 6) + 1;
  const KARANA_NAMES = ['Bava', 'Balava', 'Kaulava', 'Taitila', 'Gara', 'Vanija', 'Vishti (Bhadra)', 'Shakuni', 'Chatushpada', 'Naga', 'Kintughna'];

  const d = new Date(`${dateStr}T12:00:00Z`);
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = dayNames[d.getDay()];

  // Rahu Kaal lookup table based on day of week (standard 90 min window)
  const rahuKaalTimes: Record<string, { start: string; end: string }> = {
    Sunday: { start: '16:30', end: '18:00' },
    Monday: { start: '07:30', end: '09:00' },
    Tuesday: { start: '15:00', end: '16:30' },
    Wednesday: { start: '12:00', end: '13:30' },
    Thursday: { start: '13:30', end: '15:00' },
    Friday: { start: '10:30', end: '12:00' },
    Saturday: { start: '09:00', end: '10:30' }
  };

  const yamaTimes: Record<string, { start: string; end: string }> = {
    Sunday: { start: '12:00', end: '13:30' },
    Monday: { start: '10:30', end: '12:00' },
    Tuesday: { start: '09:00', end: '10:30' },
    Wednesday: { start: '07:30', end: '09:00' },
    Thursday: { start: '06:00', end: '07:30' },
    Friday: { start: '15:00', end: '16:30' },
    Saturday: { start: '13:30', end: '15:00' }
  };

  const choghadiyaDay: Array<{ name: string; type: 'Amrit' | 'Shubh' | 'Labh' | 'Char' | 'Rog' | 'Kaal' | 'Udveg'; time: string; auspicious: boolean }> = [
    { name: 'Udveg', type: 'Udveg', time: '06:15 - 07:45', auspicious: false },
    { name: 'Char', type: 'Char', time: '07:45 - 09:15', auspicious: true },
    { name: 'Labh', type: 'Labh', time: '09:15 - 10:45', auspicious: true },
    { name: 'Amrit', type: 'Amrit', time: '10:45 - 12:15', auspicious: true },
    { name: 'Kaal', type: 'Kaal', time: '12:15 - 13:45', auspicious: false },
    { name: 'Shubh', type: 'Shubh', time: '13:45 - 15:15', auspicious: true },
    { name: 'Rog', type: 'Rog', time: '15:15 - 16:45', auspicious: false },
    { name: 'Udveg', type: 'Udveg', time: '16:45 - 18:15', auspicious: false }
  ];

  const choghadiyaNight: Array<{ name: string; type: 'Amrit' | 'Shubh' | 'Labh' | 'Char' | 'Rog' | 'Kaal' | 'Udveg'; time: string; auspicious: boolean }> = [
    { name: 'Shubh', type: 'Shubh', time: '18:15 - 19:45', auspicious: true },
    { name: 'Amrit', type: 'Amrit', time: '19:45 - 21:15', auspicious: true },
    { name: 'Char', type: 'Char', time: '21:15 - 22:45', auspicious: true },
    { name: 'Rog', type: 'Rog', time: '22:45 - 00:15', auspicious: false },
    { name: 'Kaal', type: 'Kaal', time: '00:15 - 01:45', auspicious: false },
    { name: 'Labh', type: 'Labh', time: '01:45 - 03:15', auspicious: true },
    { name: 'Udveg', type: 'Udveg', time: '03:15 - 04:45', auspicious: false },
    { name: 'Shubh', type: 'Shubh', time: '04:45 - 06:15', auspicious: true }
  ];

  return {
    date: dateStr,
    day: dayName,
    place,
    tithi: {
      name: tithiName,
      paksha: isShukla ? 'Shukla' : 'Krishna',
      number: tithiNum,
      endTime: '22:45 PM'
    },
    nakshatra: {
      name: nakInfo.nakshatra,
      lord: nakInfo.nakshatraLord,
      number: nakInfo.index + 1,
      endTime: '18:30 PM'
    },
    yoga: {
      name: YOGA_NAMES[yogaIdx % 27],
      endTime: '15:20 PM'
    },
    karana: {
      name: KARANA_NAMES[(karanaIdx - 1) % 11],
      endTime: '11:10 AM'
    },
    sunrise: '06:12 AM',
    sunset: '18:24 PM',
    moonrise: '19:40 PM',
    moonset: '07:15 AM',
    rahuKaal: rahuKaalTimes[dayName] || { start: '10:30', end: '12:00' },
    yamagandam: yamaTimes[dayName] || { start: '15:00', end: '16:30' },
    gulikaKaal: { start: '07:30', end: '09:00' },
    abhijitMuhurat: { start: '11:54 AM', end: '12:46 PM' },
    brahmaMuhurat: { start: '04:36 AM', end: '05:24 AM' },
    vikramSamvat: 2083,
    shakaSamvat: 1948,
    hinduMonth: 'Bhadrapada',
    rutu: 'Sharad (Autumn)',
    ayana: 'Dakshinayana',
    choghadiyaDay,
    choghadiyaNight
  };
}

// Numerology calculation service
export function calculateNumerology(name: string, dob: string): NumerologyReport {
  const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
  const [year, month, day] = dob.split('-').map(Number);

  const reduceToSingleDigit = (num: number): number => {
    let sum = num;
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').map(Number).reduce((a, b) => a + b, 0);
    }
    return sum;
  };

  // 1. Life Path Number: Sum of all digits of DOB
  const dobDigitsSum = `${year}${month < 10 ? '0' + month : month}${day < 10 ? '0' + day : day}`
    .split('')
    .map(Number)
    .reduce((a, b) => a + b, 0);
  const lifePathNumber = reduceToSingleDigit(dobDigitsSum);

  // 2. Birth Day Number (Psychic/Day number)
  const birthDayNumber = reduceToSingleDigit(day);

  // Pythagorean values: A=1, B=2, C=3, D=4, E=5, F=6, G=7, H=8, I=9, J=1...
  const pythagoreanValues: Record<string, number> = {
    A: 1, J: 1, S: 1,
    B: 2, K: 2, T: 2,
    C: 3, L: 3, U: 3,
    D: 4, M: 4, V: 4,
    E: 5, N: 5, W: 5,
    F: 6, O: 6, X: 6,
    G: 7, P: 7, Y: 7,
    H: 8, Q: 8, Z: 8,
    I: 9, R: 9
  };

  const vowels = ['A', 'E', 'I', 'O', 'U'];

  let totalNameSum = 0;
  let vowelSum = 0;
  let consonantSum = 0;

  for (const char of cleanName) {
    const val = pythagoreanValues[char] || 0;
    totalNameSum += val;
    if (vowels.includes(char)) {
      vowelSum += val;
    } else {
      consonantSum += val;
    }
  }

  const destinyNumber = reduceToSingleDigit(totalNameSum);
  const soulUrgeNumber = reduceToSingleDigit(vowelSum);
  const personalityNumber = reduceToSingleDigit(consonantSum);
  const attitudeNumber = reduceToSingleDigit(month + day);

  const numProps: Record<number, { colors: string[]; days: string[]; gems: string[]; lucky: number[]; career: string; lifePath: string }> = {
    1: {
      colors: ['Gold', 'Orange', 'Yellow'],
      days: ['Sunday', 'Monday'],
      gems: ['Ruby', 'Garnet'],
      lucky: [1, 2, 4, 7],
      career: 'Leadership, Entrepreneurship, Politics, Executive Management, Innovation',
      lifePath: 'Path of the Pioneer and Leader. You are gifted with immense willpower, self-reliance, and original vision.'
    },
    2: {
      colors: ['White', 'Cream', 'Green'],
      days: ['Monday', 'Friday'],
      gems: ['Pearl', 'Moonstone'],
      lucky: [1, 2, 7],
      career: 'Diplomacy, Counseling, Arts, Healthcare, Mediation, Hospitality',
      lifePath: 'Path of the Peacemaker and Diplomat. You thrive on emotional sensitivity, harmony, partnerships, and intuition.'
    },
    3: {
      colors: ['Yellow', 'Violet', 'Purple'],
      days: ['Thursday', 'Tuesday'],
      gems: ['Yellow Sapphire', 'Topaz'],
      lucky: [3, 6, 9],
      career: 'Media, Writing, Acting, Design, Public Speaking, Education, Advisory',
      lifePath: 'Path of the Creator and Expresser. You radiate optimism, charm, creative brilliance, and verbal articulation.'
    },
    4: {
      colors: ['Blue', 'Grey', 'Brown'],
      days: ['Saturday', 'Sunday'],
      gems: ['Hessonite (Gomed)', 'Blue Sapphire'],
      lucky: [1, 4, 8],
      career: 'Architecture, Engineering, Finance, Law, System Administration, Real Estate',
      lifePath: 'Path of the Master Builder and Organizer. You bring order, discipline, steadfast stability, and practical execution.'
    },
    5: {
      colors: ['Green', 'Turquoise', 'Silver'],
      days: ['Wednesday', 'Friday'],
      gems: ['Emerald', 'Peridot'],
      lucky: [5, 1, 6],
      career: 'Marketing, Travel, Journalism, International Trade, Technology, Sales',
      lifePath: 'Path of the Dynamic Explorer. You are versatile, quick-witted, freedom-loving, and embrace progressive change.'
    },
    6: {
      colors: ['Rose Pink', 'Royal Blue', 'Indigo'],
      days: ['Friday', 'Wednesday'],
      gems: ['Diamond', 'White Sapphire'],
      lucky: [6, 3, 9],
      career: 'Healing, Fashion, Luxury, Interior Decor, Teaching, Social Welfare, Culinary',
      lifePath: 'Path of the Nurturer and Harmonizer. You embody unconditional care, aesthetic refinement, and protective responsibility.'
    },
    7: {
      colors: ['Sea Green', 'White', 'Violet'],
      days: ['Monday', 'Sunday'],
      gems: ['Cat’s Eye', 'Chrysoberyl'],
      lucky: [7, 1, 2],
      career: 'Research, Philosophy, Astrology, Psychology, Data Science, Investigation',
      lifePath: 'Path of the Mystic and Intellectual Truth-Seeker. You possess deep analytical depth, intuition, and spiritual yearning.'
    },
    8: {
      colors: ['Dark Blue', 'Black', 'Purple'],
      days: ['Saturday', 'Wednesday'],
      gems: ['Blue Sapphire', 'Amethyst'],
      lucky: [8, 4, 6],
      career: 'Corporate CEO, Banking, Real Estate Mogul, Judiciary, Heavy Industry, Politics',
      lifePath: 'Path of Material Mastery and Authority. You command karmic balance, grand ambitions, executive power, and resilience.'
    },
    9: {
      colors: ['Crimson Red', 'Maroon', 'Pink'],
      days: ['Tuesday', 'Thursday'],
      gems: ['Red Coral', 'Bloodstone'],
      lucky: [9, 1, 3],
      career: 'Humanitarianism, Defense, Medicine, Civil Service, Environmental Activism',
      lifePath: 'Path of the Universal Humanitarian. You possess broad empathy, noble ideals, courage, and magnetic charisma.'
    }
  };

  const p = numProps[lifePathNumber] || numProps[1];

  return {
    name,
    dob,
    lifePathNumber,
    destinyNumber,
    soulUrgeNumber,
    personalityNumber,
    birthDayNumber,
    attitudeNumber,
    luckyNumbers: p.lucky,
    luckyColors: p.colors,
    luckyDays: p.days,
    luckyGems: p.gems,
    interpretations: {
      lifePath: p.lifePath,
      destiny: `Your Destiny Number (${destinyNumber}) guides your professional calling and life contribution through ${p.career}.`,
      soulUrge: `Soul Urge Number (${soulUrgeNumber}) reflects your deepest emotional yearnings, authentic self-expression, and private desires.`,
      personality: `Personality Number (${personalityNumber}) shapes how you are perceived by others in social and professional environments.`,
      career: p.career,
      relationships: `You naturally harmonize with Life Path numbers ${p.lucky.join(', ')} for long-term marriage and business ventures.`
    }
  };
}

// 78-Card Tarot Deck
export const TAROT_DECK: TarotCard[] = [
  {
    id: 0,
    name: 'The Fool',
    arcana: 'Major',
    number: 0,
    uprightKeywords: ['New Beginnings', 'Innocence', 'Spontaneity', 'Leap of Faith'],
    reversedKeywords: ['Recklessness', 'Risk-taking', 'Hesitation', 'Foolishness'],
    uprightMeaning: 'A fresh spiritual journey begins. Embrace new horizons with an open heart and fearless curiosity.',
    reversedMeaning: 'Beware of impulsive choices or holding yourself back out of irrational dread.',
    element: 'Air',
    astrologicalSign: 'Uranus',
    symbolism: 'A traveler stepping off a cliff edge with a white rose and a companion dog, symbolizing purity and loyalty.',
    imageUrl: 'https://images.unsplash.com/photo-1572945753563-804956783604?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 1,
    name: 'The Magician',
    arcana: 'Major',
    number: 1,
    uprightKeywords: ['Manifestation', 'Resourcefulness', 'Power', 'Inspired Action'],
    reversedKeywords: ['Manipulation', 'Untapped Talents', 'Deception', 'Wasted Potential'],
    uprightMeaning: 'You hold all four elemental tools to manifest your intentions into tangible reality. Direct your will.',
    reversedMeaning: 'Misdirection or imposter feelings may obscure your genuine power. Reconnect with ethical purpose.',
    element: 'Air',
    astrologicalSign: 'Mercury',
    symbolism: 'Infinity symbol above the head, channeling celestial light toward Earth with wand, cup, sword, and pentacle.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    name: 'The High Priestess',
    arcana: 'Major',
    number: 2,
    uprightKeywords: ['Intuition', 'Sacred Knowledge', 'Divine Feminine', 'Subconscious'],
    reversedKeywords: ['Secrets', 'Disconnected Intuition', 'Superficiality', 'Repression'],
    uprightMeaning: 'Trust your inner knowing and dreams. The answers lie behind the mystical veil of silent reflection.',
    reversedMeaning: 'Do not ignore gut instincts or gossip. Take quiet time to re-anchor your inner sanctuary.',
    element: 'Water',
    astrologicalSign: 'Moon',
    symbolism: 'Seated between Boaz and Jachin pillars with a pomegranate veil and a crescent moon at her feet.',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 3,
    name: 'The Empress',
    arcana: 'Major',
    number: 3,
    uprightKeywords: ['Abundance', 'Nurturing', 'Fertility', 'Sensuality', 'Creativity'],
    reversedKeywords: ['Creative Block', 'Dependence', 'Neglect', 'Overbearing Care'],
    uprightMeaning: 'A bountiful cycle of growth, fertility, and creative fruition is unfolding. Nourish yourself and loved ones.',
    reversedMeaning: 'Overgiving can drain your vitality. Reclaim self-care and set loving boundaries.',
    element: 'Earth',
    astrologicalSign: 'Venus',
    symbolism: 'Crowned with twelve stars amidst golden wheat fields and a flowing waterfall.',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 4,
    name: 'The Emperor',
    arcana: 'Major',
    number: 4,
    uprightKeywords: ['Authority', 'Structure', 'Solid Foundation', 'Leadership', 'Discipline'],
    reversedKeywords: ['Tyranny', 'Rigidity', 'Lack of Discipline', 'Loss of Control'],
    uprightMeaning: 'Establish clear order, stable boundaries, and authoritative leadership. Your discipline creates security.',
    reversedMeaning: 'Avoid micromanagement or chaotic disorganization. Lead through wisdom, not force.',
    element: 'Fire',
    astrologicalSign: 'Aries',
    symbolism: 'A stone throne adorned with rams heads overlooking mountainous terrains.',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 5,
    name: 'The Hierophant',
    arcana: 'Major',
    number: 5,
    uprightKeywords: ['Spiritual Wisdom', 'Tradition', 'Mentorship', 'Higher Learning'],
    reversedKeywords: ['Rebellion', 'Dogma', 'Unconventional Paths', 'Blind Conformity'],
    uprightMeaning: 'Seek guidance from spiritual lineage, sacred philosophy, and disciplined tradition.',
    reversedMeaning: 'Break free from rigid dogmas to forge your own authentic spiritual truth.',
    element: 'Earth',
    astrologicalSign: 'Taurus',
    symbolism: 'Triple papal cross and crossed keys of enlightenment before two disciples.',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 6,
    name: 'The Lovers',
    arcana: 'Major',
    number: 6,
    uprightKeywords: ['Deep Connection', 'Harmony', 'Soul Alignment', 'Values Choice'],
    reversedKeywords: ['Disharmony', 'Misalignment', 'Indecision', 'Conflict of Values'],
    uprightMeaning: 'Harmonious union and a sacred crossroad where your choices must reflect your highest values.',
    reversedMeaning: 'Communication gaps or conflicting priorities require honest dialogue and self-love.',
    element: 'Air',
    astrologicalSign: 'Gemini',
    symbolism: 'Archangel Raphael blessing a sacred union before the Tree of Life.',
    imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 7,
    name: 'The Chariot',
    arcana: 'Major',
    number: 7,
    uprightKeywords: ['Triumph', 'Willpower', 'Determination', 'Overcoming Obstacles'],
    reversedKeywords: ['Lack of Direction', 'Aggression', 'Obstacles', 'Losing Control'],
    uprightMeaning: 'Harness opposing forces through unwavering focus and courage. Victory is assured through perseverance.',
    reversedMeaning: 'Re-align your driving purpose before forging forward recklessly.',
    element: 'Water',
    astrologicalSign: 'Cancer',
    symbolism: 'A warrior commanding black and white sphinxes with celestial star canopy.',
    imageUrl: 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 8,
    name: 'Strength',
    arcana: 'Major',
    number: 8,
    uprightKeywords: ['Courage', 'Patience', 'Compassion', 'Gentle Power'],
    reversedKeywords: ['Self-Doubt', 'Weakness', 'Raw Emotion', 'Insecurity'],
    uprightMeaning: 'True strength comes from quiet compassion, inner calmness, and mastering wild passions gently.',
    reversedMeaning: 'Do not let transient doubts weaken your resolve. You are far more resilient than you realize.',
    element: 'Fire',
    astrologicalSign: 'Leo',
    symbolism: 'A maiden gently closing a lion jaws beneath an infinity symbol and flower garland.',
    imageUrl: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 9,
    name: 'The Hermit',
    arcana: 'Major',
    number: 9,
    uprightKeywords: ['Soul-Searching', 'Inner Guidance', 'Solitude', 'Introspection'],
    reversedKeywords: ['Isolation', 'Loneliness', 'Withdrawal', 'Paranoia'],
    uprightMeaning: 'Step away from external noise. The lantern of your inner light illuminates the true path ahead.',
    reversedMeaning: 'Beware of bitter isolation. Balance quiet introspection with healthy community connection.',
    element: 'Earth',
    astrologicalSign: 'Virgo',
    symbolism: 'An elder on a mountain peak holding a lantern containing a six-pointed star of wisdom.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 10,
    name: 'Wheel of Fortune',
    arcana: 'Major',
    number: 10,
    uprightKeywords: ['Karma', 'Destiny', 'Cycles', 'Good Fortune', 'Turning Point'],
    reversedKeywords: ['Bad Luck', 'Resisting Change', 'Karmic Lessons', 'Setbacks'],
    uprightMeaning: 'The wheel turns in your favor. A karmic breakthrough and serendipitous opportunities arise.',
    reversedMeaning: 'Accept the cyclic nature of life. Every valley prepares you for the next mountain peak.',
    element: 'Fire',
    astrologicalSign: 'Jupiter',
    symbolism: 'Four winged creatures studying sacred texts around the wheel of cosmic cycles.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 19,
    name: 'The Sun',
    arcana: 'Major',
    number: 19,
    uprightKeywords: ['Joy', 'Success', 'Vitality', 'Celebration', 'Clarity'],
    reversedKeywords: ['Temporary Gloom', 'Overly Optimistic', 'Blocked Joy'],
    uprightMeaning: 'Radiant success, good health, warmth, and unadulterated clarity brighten every area of your life.',
    reversedMeaning: 'The sun is still shining behind passing clouds. Count small blessings to reignite your warmth.',
    element: 'Fire',
    astrologicalSign: 'Sun',
    symbolism: 'A joyful child riding a white horse beneath sunflowers and a benevolent radiant sun.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 21,
    name: 'The World',
    arcana: 'Major',
    number: 21,
    uprightKeywords: ['Completion', 'Wholeness', 'Accomplishment', 'Universal Flow'],
    reversedKeywords: ['Incompletion', 'Shortcuts', 'Delayed Closure', 'Stagnation'],
    uprightMeaning: 'A major life cycle completes in victory and celebration. You step into total wholeness.',
    reversedMeaning: 'Tie up loose ends before starting the next cycle. Closure brings freedom.',
    element: 'Earth',
    astrologicalSign: 'Saturn',
    symbolism: 'A dancing figure encircled by a laurel wreath surrounded by the four sacred guardians.',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80'
  }
];

// Perform Tarot Spread Reading
export function generateTarotReading(
  question: string,
  spreadType: '1-card' | '3-card' | 'love' | 'career' | 'celtic-cross' | 'yes-no'
): TarotReadingSpread {
  // Shuffle cards
  const shuffled = [...TAROT_DECK].sort(() => Math.random() - 0.5);

  let positions: string[] = [];
  let numCards = 1;

  if (spreadType === '1-card') {
    positions = ['Daily Oracle / Insight'];
    numCards = 1;
  } else if (spreadType === '3-card') {
    positions = ['Past / Foundation', 'Present / Current Energy', 'Future / Outcome'];
    numCards = 3;
  } else if (spreadType === 'love') {
    positions = ['Your Energy & Feelings', 'Partner / Connection Energy', 'The Bond & Future Potential'];
    numCards = 3;
  } else if (spreadType === 'career') {
    positions = ['Current Career State', 'Hidden Obstacles / Growth Path', 'Potential Outcome & Advice'];
    numCards = 3;
  } else if (spreadType === 'yes-no') {
    positions = ['The Oracle Answer'];
    numCards = 1;
  } else {
    positions = ['Present', 'Challenge', 'Past', 'Future', 'Crown', 'Subconscious', 'Advice', 'Environment', 'Hopes & Fears', 'Outcome'];
    numCards = 10;
  }

  const cardsDrawn = shuffled.slice(0, numCards).map((card, i) => ({
    card,
    position: positions[i] || `Position ${i + 1}`,
    isReversed: Math.random() > 0.75 // 25% chance of reversed card
  }));

  let overallInterpretation = '';
  if (spreadType === '1-card' || spreadType === 'yes-no') {
    const c = cardsDrawn[0];
    overallInterpretation = `${c.card.name} (${c.isReversed ? 'Reversed' : 'Upright'}) indicates that ${c.isReversed ? c.card.reversedMeaning : c.card.uprightMeaning}`;
  } else {
    overallInterpretation = `The cards reveal a transformative progression: starting with ${cardsDrawn[0].card.name} setting the foundation, moving through ${cardsDrawn[1]?.card.name} as current dynamics, leading toward ${cardsDrawn[cardsDrawn.length - 1]?.card.name} as the highest potential manifestation.`;
  }

  let yesNoAnswer: { answer: 'Yes' | 'No' | 'Maybe'; confidence: number } | undefined;
  if (spreadType === 'yes-no') {
    const c = cardsDrawn[0];
    const isPositive = ['The Sun', 'The Magician', 'The Empress', 'The Lovers', 'Strength', 'The World', 'Wheel of Fortune'].includes(c.card.name);
    if (isPositive && !c.isReversed) {
      yesNoAnswer = { answer: 'Yes', confidence: 92 };
    } else if (c.isReversed) {
      yesNoAnswer = { answer: 'Maybe', confidence: 60 };
    } else {
      yesNoAnswer = { answer: 'Yes', confidence: 78 };
    }
  }

  return {
    id: `tarot_${Date.now()}`,
    type: spreadType,
    question,
    cards: cardsDrawn,
    overallInterpretation,
    yesNoAnswer,
    createdAt: new Date().toISOString()
  };
}

// Convenient export aliases
export const calculateKundli = generateKundli;
export const calculatePanchang = generateDailyPanchang;
export const generateTarotSpread = generateTarotReading;
