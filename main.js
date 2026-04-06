// ============================================================
//  CosmosLab — main.js
// ============================================================

// ── THEME ────────────────────────────────────────────────────
function setTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('cosmosTheme', t);
  document.getElementById('btnDark').classList.toggle('active-theme', t === 'dark');
  document.getElementById('btnLight').classList.toggle('active-theme', t === 'light');
  if (t === 'dark') startShootingStar();
  else stopShootingStar();
}

function chooseTheme(t) {
  setTheme(t);
  localStorage.setItem('cosmosVisited', '1');
  document.getElementById('welcomeModal').classList.add('hidden');
}

function openSettings()  { document.getElementById('settingsPanel').classList.remove('hidden'); }
function closeSettings() { document.getElementById('settingsPanel').classList.add('hidden'); }
function resetVisit()    { localStorage.removeItem('cosmosVisited'); alert('Done! Refresh the page to see the welcome screen again.'); }

// ── SHOOTING STAR ────────────────────────────────────────────
let shootTimer = null;

function startShootingStar() {
  stopShootingStar();
  function fire() {
    const el = document.getElementById('shootingStar');
    if (!el) return;
    const top  = Math.random() * 55 + 3;
    const left = Math.random() * 60 + 5;
    const dur  = (Math.random() * 0.6 + 0.7).toFixed(2);
    el.style.cssText = `
      top:${top}%; left:${left}%;
      animation: shoot ${dur}s linear forwards;
      opacity:0;
    `;
    void el.offsetWidth;
    el.style.animation = `shoot ${dur}s linear forwards`;
    const next = Math.random() * 10000 + 5000;
    shootTimer = setTimeout(fire, next);
  }
  shootTimer = setTimeout(fire, 3000);
}

function stopShootingStar() {
  clearTimeout(shootTimer);
  const el = document.getElementById('shootingStar');
  if (el) el.style.animation = 'none';
}

// ── 110 DISCOVER ENTRIES ─────────────────────────────────────
const discoverData = [
  // PHENOMENA
  { tag:'phenomenon', title:'Magnetar Starquake', desc:'A magnetar can release more energy in 0.1 seconds than our Sun emits in 100,000 years — caused by fractures in its ultra-dense crystalline crust.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Magnetar_SGR_1806-20.jpg/640px-Magnetar_SGR_1806-20.jpg', wiki:'https://en.wikipedia.org/wiki/Magnetar' },
  { tag:'phenomenon', title:'Quantum Chromodynamic Plasma', desc:'A quark-gluon plasma existed microseconds after the Big Bang — a soup of free quarks behaving like a perfect liquid with near-zero viscosity.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Quark_gluon_plasma.jpg/640px-Quark_gluon_plasma.jpg', wiki:'https://en.wikipedia.org/wiki/Quark%E2%80%93gluon_plasma' },
  { tag:'phenomenon', title:'Cosmic Ray Air Shower', desc:'A single ultra-high-energy cosmic ray particle hits Earth\'s atmosphere and spawns billions of secondary particles in a cascading shower detectable across kilometers.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Extensive_Air_Shower.jpg/640px-Extensive_Air_Shower.jpg', wiki:'https://en.wikipedia.org/wiki/Air_shower_(physics)' },
  { tag:'phenomenon', title:'Hawking Radiation', desc:'Black holes slowly evaporate by emitting thermal radiation due to quantum effects near the event horizon — meaning even black holes eventually die.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Hawkingradiation-a.svg/640px-Hawkingradiation-a.svg.png', wiki:'https://en.wikipedia.org/wiki/Hawking_radiation' },
  { tag:'phenomenon', title:'Gravitational Lensing Arcs', desc:'Massive galaxy clusters bend spacetime so severely that background galaxies are smeared into luminous arcs and rings — acting as natural cosmic telescopes.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/A_Horseshoe_Einstein_Ring_from_Hubble.JPG/640px-A_Horseshoe_Einstein_Ring_from_Hubble.JPG', wiki:'https://en.wikipedia.org/wiki/Gravitational_lens' },
  { tag:'phenomenon', title:'Pulsar Glitch', desc:'A neutron star suddenly spins faster in milliseconds — thought to be caused by a superfluid inside the star suddenly transferring angular momentum to its crust.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Pulsar_schematic.svg/640px-Pulsar_schematic.svg.png', wiki:'https://en.wikipedia.org/wiki/Glitch_(astronomy)' },
  { tag:'phenomenon', title:'Baryonic Acoustic Oscillation', desc:'Sound waves from the early universe left a 500-million-light-year imprint on the distribution of galaxies — a cosmic ruler for measuring dark energy.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/BAO_Sphere.png/640px-BAO_Sphere.png', wiki:'https://en.wikipedia.org/wiki/Baryon_acoustic_oscillations' },
  { tag:'phenomenon', title:'Penrose Process', desc:'Energy can be extracted from a spinning black hole by splitting a particle inside the ergosphere — one piece falls in, the other escapes with more energy than it started with.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Ergosphere.svg/640px-Ergosphere.svg.png', wiki:'https://en.wikipedia.org/wiki/Penrose_process' },
  { tag:'phenomenon', title:'Neutrino Oscillation', desc:'Neutrinos change "flavor" as they travel — electron neutrinos become muon or tau neutrinos mid-flight, proving they have mass and violating the Standard Model.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Neutrino_oscillation.svg/640px-Neutrino_oscillation.svg.png', wiki:'https://en.wikipedia.org/wiki/Neutrino_oscillation' },
  { tag:'phenomenon', title:'Polar Vortex on Saturn', desc:'A hexagonal jet stream the size of two Earths sits perfectly at Saturn\'s north pole — a stable geometric storm that has persisted for decades.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Saturn%27s_hexagon_-_Cassini.jpg/640px-Saturn%27s_hexagon_-_Cassini.jpg', wiki:'https://en.wikipedia.org/wiki/Saturn%27s_hexagon' },
  { tag:'phenomenon', title:'Relativistic Jet', desc:'Supermassive black holes launch plasma jets at 99.9% the speed of light extending millions of light-years — among the most energetic structures in the universe.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/M87_jet.jpg/640px-M87_jet.jpg', wiki:'https://en.wikipedia.org/wiki/Astrophysical_jet' },
  { tag:'phenomenon', title:'Cosmic Web Filaments', desc:'Dark matter filaments connect galaxy clusters across billions of light-years, forming the largest known structures in existence — the cosmic web.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Cosmic_web.jpg/640px-Cosmic_web.jpg', wiki:'https://en.wikipedia.org/wiki/Observable_universe#Large-scale_structure' },
  { tag:'phenomenon', title:'Spaghettification', desc:'Near a black hole, tidal forces stretch matter into a thin stream of particles — a fate awaiting any object that crosses the event horizon too slowly.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Tidal_disruption_event.jpg/640px-Tidal_disruption_event.jpg', wiki:'https://en.wikipedia.org/wiki/Spaghettification' },
  { tag:'phenomenon', title:'Frame Dragging', desc:'A rotating massive body literally drags spacetime around it — confirmed by Gravity Probe B and felt as a subtle torque on orbiting gyroscopes.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Gravitomagnetic_field_of_earth.png/640px-Gravitomagnetic_field_of_earth.png', wiki:'https://en.wikipedia.org/wiki/Frame-dragging' },
  { tag:'phenomenon', title:'Magnetospheric Eternally Collapsing Object', desc:'A theoretical alternative to black holes — an object that never quite collapses, radiating away mass and never forming a true singularity.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Black_hole_lensing_web.gif/320px-Black_hole_lensing_web.gif', wiki:'https://en.wikipedia.org/wiki/Magnetospheric_eternally_collapsing_object' },

  // THEORIES
  { tag:'theory', title:'Cyclic Cosmology (Conformal)', desc:'Roger Penrose\'s CCC proposes that the universe goes through infinite aeons — each Big Bang is the "death" of the previous universe compressed to a point.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Conformal_cyclic_cosmology.png/640px-Conformal_cyclic_cosmology.png', wiki:'https://en.wikipedia.org/wiki/Conformal_cyclic_cosmology' },
  { tag:'theory', title:'Holographic Principle', desc:'All the information in a 3D volume of space may be encoded on its 2D boundary surface — the universe could be a hologram projected from a flat horizon.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Holographic_principle.svg/640px-Holographic_principle.svg.png', wiki:'https://en.wikipedia.org/wiki/Holographic_principle' },
  { tag:'theory', title:'Fecund Universes', desc:'Lee Smolin\'s idea that black holes birth new universes with slightly tweaked constants — universes "evolve" via cosmological natural selection.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Lee_Smolin.jpg/480px-Lee_Smolin.jpg', wiki:'https://en.wikipedia.org/wiki/Fecund_universes' },
  { tag:'theory', title:'Ekpyrotic Universe', desc:'Our universe was formed by the collision of two 3D membranes (branes) floating in a higher-dimensional bulk — the Big Bang was a brane collision.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Ekpyrotic_universe.jpg/640px-Ekpyrotic_universe.jpg', wiki:'https://en.wikipedia.org/wiki/Ekpyrotic_universe' },
  { tag:'theory', title:'Chronology Protection Conjecture', desc:'Hawking proposed that the laws of physics conspire to prevent time travel — quantum fluctuations destroy any time machine before it can be used.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Stephen_Hawking.StarChild.jpg/480px-Stephen_Hawking.StarChild.jpg', wiki:'https://en.wikipedia.org/wiki/Chronology_protection_conjecture' },
  { tag:'theory', title:'Causal Dynamical Triangulation', desc:'Spacetime itself is built from tiny triangular simplices — this quantum gravity model predicts spacetime has 4 dimensions at large scales but only 2 at Planck scale.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/CDT_triangulation.png/480px-CDT_triangulation.png', wiki:'https://en.wikipedia.org/wiki/Causal_dynamical_triangulation' },
  { tag:'theory', title:'String Gas Cosmology', desc:'An alternative to inflation — in the early universe, strings wrap around compact dimensions, halting collapse and seeding structure without exponential expansion.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/String_theory.svg/640px-String_theory.svg.png', wiki:'https://en.wikipedia.org/wiki/String_gas_cosmology' },
  { tag:'theory', title:'Firewall Paradox', desc:'AMPS showed a contradiction: either information is lost in black holes, or an observer falling in hits a wall of fire at the horizon — both violate known physics.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Black_hole_lensing_web.gif/320px-Black_hole_lensing_web.gif', wiki:'https://en.wikipedia.org/wiki/Firewall_(physics)' },
  { tag:'theory', title:'Cosmic Inflation (Eternal)', desc:'Inflation never fully stops — it continues forever in most of the universe, creating an infinite fractal multiverse of bubble universes, each with different physics.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Eternal_inflation.svg/640px-Eternal_inflation.svg.png', wiki:'https://en.wikipedia.org/wiki/Eternal_inflation' },
  { tag:'theory', title:'ER=EPR Conjecture', desc:'Juan Maldacena proposed that entangled particles (EPR pairs) are connected by microscopic wormholes (Einstein-Rosen bridges) — entanglement IS geometry.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Wormhole-demo.png/480px-Wormhole-demo.png', wiki:'https://en.wikipedia.org/wiki/ER%3DEPR' },
  { tag:'theory', title:'Zero-Energy Universe', desc:'The total energy of the universe may be exactly zero — positive energy in matter perfectly cancels the negative energy of gravity, meaning the universe cost nothing.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/CMB_Timeline300_no_WMAP.jpg/640px-CMB_Timeline300_no_WMAP.jpg', wiki:'https://en.wikipedia.org/wiki/Zero-energy_universe' },
  { tag:'theory', title:'Planck Star', desc:'Inside a black hole, quantum gravity prevents a true singularity — matter bounces at Planck density and slowly re-emerges as a white hole over cosmic timescales.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Black_hole_-_Messier_87.jpg/640px-Black_hole_-_Messier_87.jpg', wiki:'https://en.wikipedia.org/wiki/Planck_star' },
  { tag:'theory', title:'Cosmic Censorship Hypothesis', desc:'Penrose conjectured that singularities always hide behind event horizons — naked singularities, visible to the outside universe, cannot form in nature.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/BH_LMC.png/480px-BH_LMC.png', wiki:'https://en.wikipedia.org/wiki/Cosmic_censorship_hypothesis' },
  { tag:'theory', title:'Unruh Effect', desc:'An accelerating observer sees thermal radiation where an inertial observer sees nothing — the vacuum is only empty if you\'re not accelerating.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Unruh_effect.svg/640px-Unruh_effect.svg.png', wiki:'https://en.wikipedia.org/wiki/Unruh_effect' },
  { tag:'theory', title:'Tipler Cylinder', desc:'An infinitely long, rapidly rotating cylinder of dense matter could theoretically create closed timelike curves — a time machine using general relativity.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Time_travel_hypothesis_using_wormhole.jpg/480px-Time_travel_hypothesis_using_wormhole.jpg', wiki:'https://en.wikipedia.org/wiki/Tipler_cylinder' },

  // OBJECTS
  { tag:'object', title:'Magnetar SGR 1806-20', desc:'The most magnetic object ever observed — a field 10^15 times Earth\'s. Its 2004 flare hit Earth from 50,000 light-years away with detectable effects on our ionosphere.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Magnetar_SGR_1806-20.jpg/640px-Magnetar_SGR_1806-20.jpg', wiki:'https://en.wikipedia.org/wiki/SGR_1806%E2%80%9320' },
  { tag:'object', title:'Boötes Void', desc:'A supervoid 330 million light-years wide containing almost no galaxies — so empty it challenges standard cosmological models of structure formation.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Bootes_void.jpg/640px-Bootes_void.jpg', wiki:'https://en.wikipedia.org/wiki/Bo%C3%B6tes_void' },
  { tag:'object', title:'Quasi-Star', desc:'A theoretical star from the early universe — a stellar-mass black hole feeding inside a star, making it millions of times brighter than the Sun until it tears itself apart.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_quasar.jpg/640px-A_quasar.jpg', wiki:'https://en.wikipedia.org/wiki/Quasi-star' },
  { tag:'object', title:'Thorne–Żytkow Object', desc:'A red supergiant with a neutron star at its core — a bizarre hybrid star with unique nucleosynthesis creating elements not found elsewhere.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Star_forming_region_S106_%28captured_by_the_Hubble_Space_Telescope%29.jpg/480px-Star_forming_region_S106_%28captured_by_the_Hubble_Space_Telescope%29.jpg', wiki:'https://en.wikipedia.org/wiki/Thorne%E2%80%93%C5%BBytkow_object' },
  { tag:'object', title:'Cosmic Microwave Background', desc:'The afterglow of the Big Bang, 380,000 years after — a perfect thermal map of the early universe visible in every direction at 2.725 Kelvin.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Planck_CMB.jpg/640px-Planck_CMB.jpg', wiki:'https://en.wikipedia.org/wiki/Cosmic_microwave_background' },
  { tag:'object', title:'Hypercompact Stellar System', desc:'A cluster of millions of stars compressed into just a few light-years — left behind when a supermassive black hole is ejected from a galaxy by a gravitational slingshot.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Globular_cluster_Messier_2_Hubble.jpg/640px-Globular_cluster_Messier_2_Hubble.jpg', wiki:'https://en.wikipedia.org/wiki/Hypercompact_stellar_system' },
  { tag:'object', title:'Proplyds of Orion', desc:'Newly forming solar systems caught in the act — protoplanetary disks glowing under the ultraviolet radiation of nearby massive stars in the Orion Nebula.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg/640px-Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg', wiki:'https://en.wikipedia.org/wiki/Proplyd' },
  { tag:'object', title:'GN-z11 Galaxy', desc:'The most distant confirmed galaxy — 13.4 billion light-years away, we see it as it was just 400 million years after the Big Bang, already forming stars rapidly.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/GNz11_Hubble.jpg/640px-GNz11_Hubble.jpg', wiki:'https://en.wikipedia.org/wiki/GN-z11' },
  { tag:'object', title:'Neutron Star Merger Kilonova', desc:'When two neutron stars collide, they forge heavy elements like gold and platinum in a kilonova explosion — most of Earth\'s gold was made this way.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Neutron_star_merger_kilonova_%28NASA%29.jpg/640px-Neutron_star_merger_kilonova_%28NASA%29.jpg', wiki:'https://en.wikipedia.org/wiki/Kilonova' },
  { tag:'object', title:'Galactic Cannibalism', desc:'The Milky Way is currently consuming the Sagittarius Dwarf Galaxy — stellar streams wrap around our galaxy like a shell, remnants of the meal in progress.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Sagittarius_Stream.jpg/640px-Sagittarius_Stream.jpg', wiki:'https://en.wikipedia.org/wiki/Sagittarius_Dwarf_Elliptical_Galaxy' },
  { tag:'object', title:'Diamond Planet (55 Cancri e)', desc:'A super-Earth exoplanet possibly covered in graphite and diamond — its interior may be one-third pure diamond under crushing pressures.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/55Cancri_e_NASA.jpg/640px-55Cancri_e_NASA.jpg', wiki:'https://en.wikipedia.org/wiki/55_Cancri_e' },
  { tag:'object', title:'Stephan\'s Quintet', desc:'A compact group of 5 galaxies — four engaged in a violent collision, generating a shock wave larger than the Milky Way visible in X-ray and infrared.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Stephans_Quintet_JWST_NIRCam_MIRI_brighten.jpg/640px-Stephans_Quintet_JWST_NIRCam_MIRI_brighten.jpg', wiki:'https://en.wikipedia.org/wiki/Stephan%27s_Quintet' },
  { tag:'object', title:'Kerr Black Hole', desc:'A rotating black hole with an ergosphere and ring singularity instead of a point — theoretically allowing stable orbits inside the event horizon.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Kerr_black_hole.jpg/480px-Kerr_black_hole.jpg', wiki:'https://en.wikipedia.org/wiki/Kerr_metric' },
  { tag:'object', title:'Magnetospheric Radio Transient', desc:'GLEAM-X J162759.5−523504.3 pulses radio waves every 18 minutes — a bizarre ultra-long period magnetar that shouldn\'t produce radio emission by known physics.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Magnetar_SGR_1806-20.jpg/480px-Magnetar_SGR_1806-20.jpg', wiki:'https://en.wikipedia.org/wiki/GLEAM-X_J162759.5%E2%88%92523504.3' },
  { tag:'object', title:'Cosmic Horseshoe', desc:'A near-perfect Einstein ring — a galaxy 10 billion light-years away lensed into a horseshoe arc by an intervening galaxy exactly in front of it.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/A_Horseshoe_Einstein_Ring_from_Hubble.JPG/640px-A_Horseshoe_Einstein_Ring_from_Hubble.JPG', wiki:'https://en.wikipedia.org/wiki/Cosmic_Horseshoe' },
  { tag:'object', title:'Great Attractor', desc:'An invisible gravitational anomaly pulling the Milky Way and thousands of galaxies toward a single point at 600 km/s — its nature is still debated.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/2MASS_LSS_chart-NEW_Nasa.jpg/640px-2MASS_LSS_chart-NEW_Nasa.jpg', wiki:'https://en.wikipedia.org/wiki/Great_Attractor' },
  { tag:'object', title:'Cosmic String (Hypothetical)', desc:'1-dimensional defects from the early universe — infinitely thin but with the mass of a galaxy per light-year, they could cause double images of stars if they pass by.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/CMB_Timeline300_no_WMAP.jpg/480px-CMB_Timeline300_no_WMAP.jpg', wiki:'https://en.wikipedia.org/wiki/Cosmic_string' },
  { tag:'object', title:'Herbig-Haro Object', desc:'Jets of gas ejected by newborn stars slamming into interstellar gas at hundreds of km/s — glowing nebulae that change shape visibly over human lifetimes.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Herbig_Haro_object.jpg/640px-Herbig_Haro_object.jpg', wiki:'https://en.wikipedia.org/wiki/Herbig%E2%80%93Haro_object' },
  { tag:'object', title:'Magnetized Neutron Star with Quark Core', desc:'Some neutron stars may contain a core of strange quark matter — a phase of matter denser than nuclei where quarks roam freely in color-superconducting pairs.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Neutron_star_cross_section.svg/480px-Neutron_star_cross_section.svg.png', wiki:'https://en.wikipedia.org/wiki/Quark_star' },
  { tag:'object', title:'Fast Radio Burst (FRB)', desc:'Millisecond radio flashes releasing more energy than the Sun in a year — most come from billions of light-years away; some repeat, but their mechanism remains unsolved.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Artist%27s_impression_of_FRB_181112_%28frame_1%29.jpg/640px-Artist%27s_impression_of_FRB_181112_%28frame_1%29.jpg', wiki:'https://en.wikipedia.org/wiki/Fast_radio_burst' },

  // MISSIONS
  { tag:'mission', title:'Voyager 1 in Interstellar Space', desc:'Launched in 1977, Voyager 1 crossed the heliopause in 2012 and still sends data from 24 billion km away — the farthest human-made object ever.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Voyager_spacecraft.jpg/640px-Voyager_spacecraft.jpg', wiki:'https://en.wikipedia.org/wiki/Voyager_1' },
  { tag:'mission', title:'JWST Deep Field', desc:'The James Webb Space Telescope\'s first deep field image shows thousands of galaxies in a patch of sky the size of a grain of sand held at arm\'s length.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Webb%27s_First_Deep_Field_%28adjusted%29.jpg/640px-Webb%27s_First_Deep_Field_%28adjusted%29.jpg', wiki:'https://en.wikipedia.org/wiki/James_Webb_Space_Telescope' },
  { tag:'mission', title:'Cassini Grand Finale', desc:'NASA\'s Cassini dove between Saturn\'s rings and atmosphere 22 times before plunging in — discovering a gap with almost no ring particles and a complex atmosphere.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Saturn_Storm.jpg/640px-Saturn_Storm.jpg', wiki:'https://en.wikipedia.org/wiki/Cassini%E2%80%93Huygens' },
  { tag:'mission', title:'DART Asteroid Deflection', desc:'NASA\'s DART spacecraft intentionally crashed into asteroid Dimorphos in 2022, successfully changing its orbital period — humanity\'s first planetary defense test.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/DART_Mission_Impact.jpg/640px-DART_Mission_Impact.jpg', wiki:'https://en.wikipedia.org/wiki/Double_Asteroid_Redirection_Test' },
  { tag:'mission', title:'Parker Solar Probe', desc:'Traveling at 690,000 km/h — the fastest human-made object — Parker dips into the Sun\'s corona, sampling solar wind at its source for the first time.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Parker_Solar_Probe_spacecraft.jpg/640px-Parker_Solar_Probe_spacecraft.jpg', wiki:'https://en.wikipedia.org/wiki/Parker_Solar_Probe' },
  { tag:'mission', title:'New Horizons at Arrokoth', desc:'After Pluto, New Horizons flew past Arrokoth — a pristine contact binary 6.6 billion km from Earth, revealing how planetesimals gently merge in the early solar system.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Arrokoth_%28cropped%29.png/480px-Arrokoth_%28cropped%29.png', wiki:'https://en.wikipedia.org/wiki/486958_Arrokoth' },
  { tag:'mission', title:'Hayabusa2 Sample Return', desc:'Japan\'s Hayabusa2 collected pristine samples from asteroid Ryugu and returned them to Earth — the first confirmed samples from a C-type carbonaceous asteroid.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Ryugu_top_Hayabusa2.jpg/640px-Ryugu_top_Hayabusa2.jpg', wiki:'https://en.wikipedia.org/wiki/Hayabusa2' },
  { tag:'mission', title:'LISA Pathfinder', desc:'ESA\'s precursor to a space-based gravitational wave detector — it demonstrated free-fall precision 5x better than required, clearing the path for LISA in the 2030s.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/LISA_Pathfinder.jpg/640px-LISA_Pathfinder.jpg', wiki:'https://en.wikipedia.org/wiki/LISA_Pathfinder' },
  { tag:'mission', title:'Event Horizon Telescope', desc:'A planet-sized virtual telescope made of synchronized radio dishes worldwide — it captured the first real image of a black hole shadow in M87 in 2019.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Black_hole_-_Messier_87_crop_max_res.jpg/640px-Black_hole_-_Messier_87_crop_max_res.jpg', wiki:'https://en.wikipedia.org/wiki/Event_Horizon_Telescope' },
  { tag:'mission', title:'Ingenuity Mars Helicopter', desc:'The first powered aircraft to fly on another planet — a technology demo that exceeded its planned 5 flights by performing over 70, scouting terrain for Perseverance.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Ingenuity_during_3rd_flight_from_Perseverance_-_26_April_2021.png/640px-Ingenuity_during_3rd_flight_from_Perseverance_-_26_April_2021.png', wiki:'https://en.wikipedia.org/wiki/Ingenuity_(helicopter)' },

  // ENGINEERING
  { tag:'engineer', title:'Alcubierre Warp Drive', desc:'Miguel Alcubierre\'s 1994 solution to Einstein\'s equations allows faster-than-light travel by contracting space ahead and expanding it behind — but requires exotic negative energy.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Alcubierre.png/640px-Alcubierre.png', wiki:'https://en.wikipedia.org/wiki/Alcubierre_drive' },
  { tag:'engineer', title:'Dyson Sphere', desc:'A hypothetical megastructure enclosing a star to capture all its energy output — a Type II Kardashev civilization could build one using the star\'s own planetary material.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Dyson_Swarm.png/640px-Dyson_Swarm.png', wiki:'https://en.wikipedia.org/wiki/Dyson_sphere' },
  { tag:'engineer', title:'Space Elevator', desc:'A cable extending from Earth\'s equator to geostationary orbit — a climber could ride it to space for a fraction of rocket cost, requiring a material stronger than any known.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Space_elevator_structural_diagram--corrected_to_show_MgSi03_instead_of_SiO2.png/480px-Space_elevator_structural_diagram--corrected_to_show_MgSi03_instead_of_SiO2.png', wiki:'https://en.wikipedia.org/wiki/Space_elevator' },
  { tag:'engineer', title:'Orion Nuclear Pulse Propulsion', desc:'A 1950s design using nuclear bombs detonated behind a massive pusher plate — could theoretically reach 10% the speed of light with 1950s technology.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Project_Orion_Dyson.jpg/480px-Project_Orion_Dyson.jpg', wiki:'https://en.wikipedia.org/wiki/Project_Orion_(nuclear_propulsion)' },
  { tag:'engineer', title:'Laser Sail (Breakthrough Starshot)', desc:'A gram-scale chip-spacecraft pushed by a 100-gigawatt laser array to 20% the speed of light — reaching Alpha Centauri in 20 years to image Proxima b.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Breakthrough_Starshot_Initiative.jpg/640px-Breakthrough_Starshot_Initiative.jpg', wiki:'https://en.wikipedia.org/wiki/Breakthrough_Starshot' },
  { tag:'engineer', title:'Magnetohydrodynamic Drive', desc:'Propulsion using electromagnetic forces on a conducting fluid — silent, no moving parts, and theoretically scalable to spacecraft using superconducting magnets and plasma.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/MHD_Thruster.svg/480px-MHD_Thruster.svg.png', wiki:'https://en.wikipedia.org/wiki/Magnetohydrodynamic_drive' },
  { tag:'engineer', title:'Ion Thruster (Hall Effect)', desc:'NASA\'s Dawn spacecraft used a xenon ion drive for years — ejecting ions at 90,000 mph for extreme efficiency, making missions to Vesta and Ceres possible on one fuel load.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Ion_Engine_Test_Firing_-_GPN-2000-000482.jpg/640px-Ion_Engine_Test_Firing_-_GPN-2000-000482.jpg', wiki:'https://en.wikipedia.org/wiki/Hall-effect_thruster' },
  { tag:'engineer', title:'Vasimr Plasma Rocket', desc:'Variable Specific Impulse Magnetoplasma Rocket heats plasma using radio waves to 11 million°C — a potential Mars engine that could cut travel time to 39 days.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/VASIMR_plasma_rocket.jpg/480px-VASIMR_plasma_rocket.jpg', wiki:'https://en.wikipedia.org/wiki/Variable_Specific_Impulse_Magnetoplasma_Rocket' },
  { tag:'engineer', title:'Gravitational Wave Detector (LIGO)', desc:'LIGO stretches 4-km arms to detect spacetime distortions smaller than 1/1000th the width of a proton — using laser interferometry to hear the universe\'s collisions.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/LIGO_Hanford_aerial_05.jpg/640px-LIGO_Hanford_aerial_05.jpg', wiki:'https://en.wikipedia.org/wiki/LIGO' },
  { tag:'engineer', title:'Solar Sail (IKAROS)', desc:'JAXA\'s IKAROS deployed a 14m polyimide sail 0.0075mm thin in 2010 — the first spacecraft to demonstrate interplanetary solar sailing, accelerating using photon pressure alone.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/IKAROS_spacecraft.jpg/480px-IKAROS_spacecraft.jpg', wiki:'https://en.wikipedia.org/wiki/IKAROS' },

  // More phenomena, objects, theories to hit 110+
  { tag:'phenomenon', title:'Ohm Pulse — Magnetar Giant Flare', desc:'SGR 1806-20\'s 2004 flare released 10^46 joules in 0.2 seconds — briefly outshining the entire Milky Way and measurably ionizing Earth\'s upper atmosphere from 50,000 light-years.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Magnetar_SGR_1806-20.jpg/480px-Magnetar_SGR_1806-20.jpg', wiki:'https://en.wikipedia.org/wiki/SGR_1806%E2%80%9320' },
  { tag:'object', title:'Pillars of Creation (JWST)', desc:'The iconic Eagle Nebula pillars reimaged by JWST in infrared — revealing hundreds of previously hidden newly forming stars embedded within the dusty columns.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Pillars_of_creation_2014_HST_WFC3-UVIS_full-res_denoised.jpg/480px-Pillars_of_creation_2014_HST_WFC3-UVIS_full-res_denoised.jpg', wiki:'https://en.wikipedia.org/wiki/Pillars_of_Creation' },
  { tag:'theory', title:'Simulation Hypothesis (Bostrom)', desc:'If advanced civilizations run many simulations, statistically we are almost certainly living inside one — and physics at the Planck scale may reveal the grid.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/SimCity_4_-_New_Bustonton.jpg/480px-SimCity_4_-_New_Bustonton.jpg', wiki:'https://en.wikipedia.org/wiki/Simulation_hypothesis' },
  { tag:'phenomenon', title:'Plasma Double Layer', desc:'In space plasma, sharp voltage boundaries form — some accelerate particles to relativistic energies, powering cosmic jets and auroras through electric double layers.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Aurora_Borealis_and_Australis_Poster.jpg/480px-Aurora_Borealis_and_Australis_Poster.jpg', wiki:'https://en.wikipedia.org/wiki/Double_layer_(plasma_physics)' },
  { tag:'object', title:'Taffy Galaxies (UGC 12914/15)', desc:'Two galaxies that passed through each other leaving a bridge of plasma — so much gas was stripped in the collision that star formation is suppressed across the bridge.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/UGC_12914_UGC_12915_Taffy_Galaxies.jpg/640px-UGC_12914_UGC_12915_Taffy_Galaxies.jpg', wiki:'https://en.wikipedia.org/wiki/Taffy_Galaxies' },
  { tag:'theory', title:'Many-Worlds Interpretation', desc:'Every quantum measurement causes the universe to branch — every possible outcome happens in a separate world. There is no collapse; there are only splits.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Schroedingers_cat.svg/480px-Schroedingers_cat.svg.png', wiki:'https://en.wikipedia.org/wiki/Many-worlds_interpretation' },
  { tag:'engineer', title:'Nuclear Thermal Rocket (NTR)', desc:'Heat propellant using a fission reactor instead of combustion — twice the efficiency of chemical rockets, enabling 90-day Mars transit with 1960s-era NERVA technology.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/NERVA_nozzle.jpg/480px-NERVA_nozzle.jpg', wiki:'https://en.wikipedia.org/wiki/Nuclear_thermal_rocket' },
  { tag:'object', title:'Rogue Planet (FFP)', desc:'Free-floating planets not bound to any star — ejected during system formation, they drift in darkness. The Milky Way may have more rogue planets than stars.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/PSO_J318.5-22.jpg/480px-PSO_J318.5-22.jpg', wiki:'https://en.wikipedia.org/wiki/Rogue_planet' },
  { tag:'phenomenon', title:'Tidal Disruption Event', desc:'A star wandering too close to a supermassive black hole is ripped apart — half the star falls in as a luminous flare, the other half is flung into space at relativistic speed.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Neutron_star_merger_kilonova_%28NASA%29.jpg/480px-Neutron_star_merger_kilonova_%28NASA%29.jpg', wiki:'https://en.wikipedia.org/wiki/Tidal_disruption_event' },
  { tag:'theory', title:'Quantum Darwinism', desc:'Classical reality emerges when quantum states leave copies of themselves in the environment — only states that survive environmental decoherence become "real" and observable.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Quantum_Darwinism.png/480px-Quantum_Darwinism.png', wiki:'https://en.wikipedia.org/wiki/Quantum_Darwinism' },
  { tag:'object', title:'Lyman-Alpha Blob', desc:'Enormous glowing clouds of hydrogen — some larger than a galaxy — powered by star formation, AGN, or gas collapsing along cosmic filaments in the early universe.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Lyman_alpha_blob.jpg/480px-Lyman_alpha_blob.jpg', wiki:'https://en.wikipedia.org/wiki/Lyman-alpha_blob' },
  { tag:'mission', title:'Rosetta & Philae Comet Landing', desc:'ESA\'s Rosetta orbited comet 67P for 2 years while Philae became the first spacecraft to land on a comet — discovering organic molecules and unexpected hardness.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Comet_on_19_September_2014_NavCam.jpg/640px-Comet_on_19_September_2014_NavCam.jpg', wiki:'https://en.wikipedia.org/wiki/Rosetta_(spacecraft)' },
  { tag:'phenomenon', title:'Pulsar Timing Array (Gravitational Wave Background)', desc:'An array of pulsars detected a gravitational wave background in 2023 — a constant hum from supermassive black hole binaries throughout the universe merging everywhere at once.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Pulsar_timing_array.jpg/480px-Pulsar_timing_array.jpg', wiki:'https://en.wikipedia.org/wiki/Pulsar_timing_array' },
  { tag:'object', title:'Hypervelocity Star', desc:'Stars ejected from the galactic center at 1-4 million km/h by interactions with Sagittarius A* — some have enough velocity to escape the Milky Way entirely.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_quasar.jpg/480px-A_quasar.jpg', wiki:'https://en.wikipedia.org/wiki/Hypervelocity_star' },
  { tag:'theory', title:'Penrose–Hawking Singularity Theorems', desc:'Mathematical proof that under general relativity, singularities are not exotic edge cases — they are inevitable consequences of gravitational collapse and the Big Bang.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Stephen_Hawking.StarChild.jpg/480px-Stephen_Hawking.StarChild.jpg', wiki:'https://en.wikipedia.org/wiki/Penrose%E2%80%93Hawking_singularity_theorems' },
  { tag:'engineer', title:'Aerocapture Maneuver', desc:'A spacecraft dips into an atmosphere to shed velocity without fuel — used by future Mars and Neptune missions to reach orbit using the planet\'s air as a brake.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Aerocapture.jpg/480px-Aerocapture.jpg', wiki:'https://en.wikipedia.org/wiki/Aerocapture' },
  { tag:'object', title:'Circumgalactic Medium', desc:'A vast halo of hot, diffuse gas surrounding the Milky Way — it contains roughly as much baryonic matter as the entire galaxy and regulates star formation.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Milky_Way_Galaxy.jpg/640px-Milky_Way_Galaxy.jpg', wiki:'https://en.wikipedia.org/wiki/Circumgalactic_medium' },
  { tag:'phenomenon', title:'Bipolar Outflow in Star Formation', desc:'As a protostar grows it launches supersonic jets perpendicular to its accretion disk — carving out cavities in the parent molecular cloud parsecs in length.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Herbig_Haro_object.jpg/480px-Herbig_Haro_object.jpg', wiki:'https://en.wikipedia.org/wiki/Bipolar_outflow' },
  { tag:'theory', title:'CPT Symmetry Violation', desc:'If matter and antimatter behaved identically, nothing would exist. CP violation — the slight asymmetry in particle-antiparticle reactions — explains why the universe is made of matter.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/CPT_Violation.png/480px-CPT_Violation.png', wiki:'https://en.wikipedia.org/wiki/CP_violation' },
  { tag:'object', title:'Sagittarius A* Shadow', desc:'The EHT imaged the shadow of the Milky Way\'s own supermassive black hole in 2022 — a 4-million-solar-mass object just 26,000 light-years from Earth.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Sgr_A_star_from_EHT.jpg/640px-Sgr_A_star_from_EHT.jpg', wiki:'https://en.wikipedia.org/wiki/Sagittarius_A*' }
];

// ── 50 DID YOU KNOW ENTRIES ───────────────────────────────────
const dykData = [
  { title:'A day on Venus is longer than its year', text:'Venus rotates so slowly that it completes an orbit around the Sun before it finishes one full rotation on its axis — a Venusian day lasts 243 Earth days.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Venus-real_color.jpg/480px-Venus-real_color.jpg', link:'https://en.wikipedia.org/wiki/Venus' },
  { title:'Neutron stars can spin 716 times per second', text:'PSR J1748-2446ad rotates 716 times per second — a point on its equator moves at about 24% the speed of light. If it spun much faster, it would tear itself apart.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Pulsar_schematic.svg/480px-Pulsar_schematic.svg.png', link:'https://en.wikipedia.org/wiki/PSR_J1748-2446ad' },
  { title:'The Sun loses 4 million tons per second', text:'Through nuclear fusion and solar wind, the Sun converts about 4 million tons of mass into pure energy every second — yet it\'s lost less than 0.1% of its total mass.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/480px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg', link:'https://en.wikipedia.org/wiki/Solar_wind' },
  { title:'Space smells like seared steak and hot metal', text:'Astronauts on the ISS report that spacesuits returning from EVAs carry a distinct odor — sweet metallic, like welding fumes and hot metal, from atomic oxygen in low Earth orbit.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/STS-116_spacewalk_1.jpg/480px-STS-116_spacewalk_1.jpg', link:'https://www.nasa.gov/missions/station/space-smells/' },
  { title:'Water ice exists inside permanently shadowed craters on Mercury', text:'Despite being the closest planet to the Sun, Mercury has polar craters that never see sunlight — temperatures inside stay at –180°C, and radar confirms water ice sitting there for billions of years.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Mercury_in_color_-_Prockter07-edit1.jpg/480px-Mercury_in_color_-_Prockter07-edit1.jpg', link:'https://en.wikipedia.org/wiki/Mercury_(planet)#Polar_ice' },
  { title:'A year on the ISS ages you slightly less', text:'Astronauts traveling at 7.7 km/s experience time dilation — after 6 months, clocks on the ISS are about 0.007 seconds behind Earth clocks due to special and general relativity combined.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/International_Space_Station_after_undocking_of_STS-132.jpg/640px-International_Space_Station_after_undocking_of_STS-132.jpg', link:'https://en.wikipedia.org/wiki/Time_dilation#Velocity_and_gravitational_time_dilation' },
  { title:'There are more stars than grains of sand on Earth', text:'The observable universe contains roughly 2 trillion galaxies with an average of 100 billion stars each — about 200 sextillion stars total — far exceeding all Earth\'s grains of sand.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Webb%27s_First_Deep_Field_%28adjusted%29.jpg/480px-Webb%27s_First_Deep_Field_%28adjusted%29.jpg', link:'https://en.wikipedia.org/wiki/Observable_universe' },
  { title:'Pluto\'s heart is a nitrogen glacier', text:'The iconic heart-shaped region on Pluto — Tombaugh Regio — is a 1,000-km-wide nitrogen ice plain, actively convecting like a giant slow lava lamp driven by Pluto\'s internal heat.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Pluto_in_True_Color_-_High-Res.jpg/480px-Pluto_in_True_Color_-_High-Res.jpg', link:'https://en.wikipedia.org/wiki/Tombaugh_Regio' },
  { title:'Jupiter\'s Great Red Spot is shrinking', text:'Once three Earths wide, Jupiter\'s centuries-old storm is now barely one Earth wide — it\'s been measurably shrinking since the 1800s and may disappear within decades.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg/480px-Jupiter_and_its_shrunken_Great_Red_Spot.jpg', link:'https://en.wikipedia.org/wiki/Great_Red_Spot' },
  { title:'The Moon is slowly leaving Earth', text:'The Moon recedes from Earth at 3.8 cm per year — due to tidal friction — which means billions of years ago the Moon was much closer and lunar days were far shorter.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/480px-FullMoon2010.jpg', link:'https://en.wikipedia.org/wiki/Lunar_recession' },
  { title:'Saturn would float on water', text:'Saturn\'s average density is just 0.687 g/cm³ — less than water — making it the only planet in the solar system that would theoretically float if placed in a large enough ocean.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/480px-Saturn_during_Equinox.jpg', link:'https://en.wikipedia.org/wiki/Saturn' },
  { title:'Mars has the largest volcano in the solar system', text:'Olympus Mons is 21 km tall and 600 km wide — so large that an astronaut standing on its slopes would not know they were on a mountain due to its shallow gradient and the curvature of Mars.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Olympus_Mons_alt.jpg/640px-Olympus_Mons_alt.jpg', link:'https://en.wikipedia.org/wiki/Olympus_Mons' },
  { title:'Our galaxy smells of raspberries and rum', text:'The molecular cloud Sagittarius B2, near the galactic center, contains ethyl formate — the molecule responsible for the flavors of raspberries and rum — among 50 other organic molecules.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/ESO-VLT-Laser-phot-33a-07.jpg/640px-ESO-VLT-Laser-phot-33a-07.jpg', link:'https://en.wikipedia.org/wiki/Sagittarius_B2' },
  { title:'One cubic centimeter of neutron star weighs a billion tons', text:'Neutron stars pack the mass of the Sun into a sphere 20 km across — nuclear matter so dense that a sugar-cube-sized piece would outweigh every human who has ever lived.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Neutron_star_cross_section.svg/480px-Neutron_star_cross_section.svg.png', link:'https://en.wikipedia.org/wiki/Neutron_star' },
  { title:'The universe has a detectable sound', text:'Before the CMB released, the early universe was filled with acoustic pressure waves — their imprint is measurable in the cosmic microwave background as slight temperature fluctuations.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Planck_CMB.jpg/480px-Planck_CMB.jpg', link:'https://en.wikipedia.org/wiki/Baryon_acoustic_oscillations' },
  { title:'Europa may have twice as much liquid water as Earth', text:'Under Jupiter\'s moon Europa\'s icy crust lies a saltwater ocean 100 km deep — containing more liquid water than all of Earth\'s oceans combined, and possibly hosting life.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Europa-moon-with-margins.jpg/480px-Europa-moon-with-margins.jpg', link:'https://en.wikipedia.org/wiki/Europa_(moon)' },
  { title:'Photons inside the Sun take 100,000 years to escape', text:'A photon created in the Sun\'s core takes between 10,000 and 170,000 years of random-walk scattering to reach the surface — but then travels to Earth in just 8 minutes.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/480px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg', link:'https://en.wikipedia.org/wiki/Solar_core' },
  { title:'Dark energy makes up 68% of the universe', text:'The universe\'s expansion is accelerating — driven by dark energy, a mysterious property of space itself that has no confirmed explanation in particle physics.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/CMB_Timeline300_no_WMAP.jpg/480px-CMB_Timeline300_no_WMAP.jpg', link:'https://en.wikipedia.org/wiki/Dark_energy' },
  { title:'Titan has a methane cycle like Earth\'s water cycle', text:'Saturn\'s moon Titan has lakes, rivers, and rain — but of liquid methane at -179°C. It\'s the only other body in the solar system with a liquid cycle on its surface.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Titan_in_true_color.jpg/480px-Titan_in_true_color.jpg', link:'https://en.wikipedia.org/wiki/Titan_(moon)' },
  { title:'Uranus rotates on its side', text:'Uranus has an axial tilt of 98° — it essentially rolls around the Sun on its side. One pole faces the Sun for 42 years while the other is in complete darkness.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/480px-Uranus2.jpg', link:'https://en.wikipedia.org/wiki/Uranus' },
  { title:'The Milky Way and Andromeda will collide', text:'In about 4.5 billion years, the Andromeda Galaxy will merge with the Milky Way — but the stars are so spread out that almost none will actually collide, just reorganize into a new galaxy.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Andromeda_Galaxy_560mm_FL.jpg/640px-Andromeda_Galaxy_560mm_FL.jpg', link:'https://en.wikipedia.org/wiki/Andromeda%E2%80%93Milky_Way_collision' },
  { title:'There is a giant water reservoir 12 billion light-years away', text:'Quasar APM 08279+5255 is surrounded by a cloud of water vapor 140 trillion times more water than Earth\'s oceans — the largest and most distant known water reservoir.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_quasar.jpg/480px-A_quasar.jpg', link:'https://en.wikipedia.org/wiki/APM_08279%2B5255' },
  { title:'Io has the most active volcanism in the solar system', text:'Jupiter\'s moon Io is squeezed by gravitational tidal forces so intensely that it has hundreds of active volcanoes — some erupting plumes 500 km high. Its surface is constantly reshaped.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Io_highest_resolution_true_color.jpg/480px-Io_highest_resolution_true_color.jpg', link:'https://en.wikipedia.org/wiki/Io_(moon)' },
  { title:'Galaxies are mostly empty space', text:'If the Milky Way were scaled to the size of a continent, every star would be smaller than a grain of sand — the distance between stars is so vast that galaxies are almost entirely void.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/ESO-VLT-Laser-phot-33a-07.jpg/480px-ESO-VLT-Laser-phot-33a-07.jpg', link:'https://en.wikipedia.org/wiki/Milky_Way' },
  { title:'Black holes do not suck', text:'A black hole has the same gravitational pull as any object of the same mass — if the Sun became a black hole, Earth\'s orbit would not change. You have to get very close to be pulled in.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Black_hole_-_Messier_87_crop_max_res.jpg/480px-Black_hole_-_Messier_87_crop_max_res.jpg', link:'https://en.wikipedia.org/wiki/Black_hole' },
  { title:'The biggest known structure is the Hercules–Corona Borealis Great Wall', text:'Spanning 10 billion light-years — about 10% of the observable universe — this superstructure of galaxies challenges models of how large structures can grow since the Big Bang.', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Hercules%E2%80%93Corona_Borealis_Great_Wall.jpg/640px-Hercules%E2%80%93Corona_Borealis_Great_Wall.jpg', link:'https://en.wikipedia.org/wiki/Hercules%E2%80%93Corona_Borealis_Great_Wall' },
];

// ── 35 EXPLORE WEB LINKS ─────────────────────────────────────
const webLinks = [
  { icon:'🔭', name:'NASA Astronomy Picture of the Day', desc:'A new stunning space image with expert explanation every single day since 1995.', url:'https://apod.nasa.gov/apod/', tag:'Images & Discovery' },
  { icon:'🌌', name:'ESA / Hubble Space Telescope', desc:'All Hubble images, press releases and science results from the European Space Agency.', url:'https://esahubble.org/', tag:'Space Telescope' },
  { icon:'🪐', name:'NASA Solar System Exploration', desc:'Interactive 3D tours of every planet, moon, and small body in our solar system.', url:'https://solarsystem.nasa.gov/', tag:'Solar System' },
  { icon:'🌠', name:'Universe Today', desc:'Daily breaking space and astronomy news, deep dives and mission coverage.', url:'https://www.universetoday.com/', tag:'News' },
  { icon:'📡', name:'SETI Institute', desc:'The search for extraterrestrial intelligence — research, news and live data streams.', url:'https://www.seti.org/', tag:'Astrobiology' },
  { icon:'🧲', name:'LIGO Caltech', desc:'Gravitational wave detection — live alerts, data and tutorials on spacetime ripples.', url:'https://www.ligo.caltech.edu/', tag:'Gravitational Waves' },
  { icon:'🌍', name:'Heavens Above', desc:'Real-time satellite tracking — see the ISS, Hubble and thousands of satellites pass over your location.', url:'https://www.heavens-above.com/', tag:'Satellite Tracking' },
  { icon:'🔬', name:'arXiv Astrophysics', desc:'Free preprint server for cutting-edge astrophysics papers before journal publication.', url:'https://arxiv.org/list/astro-ph/recent', tag:'Research Papers' },
  { icon:'🌀', name:'Black Hole Encyclopedia', desc:'Comprehensive resource on black hole types, physics, imaging and theoretical models.', url:'https://blackholes.stardate.org/', tag:'Black Holes' },
  { icon:'💫', name:'Stellarium Web', desc:'A free, open-source planetarium in your browser — point anywhere in the sky in real time.', url:'https://stellarium-web.org/', tag:'Planetarium' },
  { icon:'🚀', name:'SpaceX Launches', desc:'Upcoming Falcon 9, Falcon Heavy and Starship launches with live webcast links.', url:'https://www.spacex.com/launches/', tag:'Commercial Space' },
  { icon:'🛸', name:'Planetary.org', desc:'Carl Sagan\'s society — advocacy, citizen science and the best space exploration content.', url:'https://www.planetary.org/', tag:'Exploration' },
  { icon:'📸', name:'JWST Image Gallery', desc:'Every public image released by the James Webb Space Telescope in full resolution.', url:'https://webbtelescope.org/news/webb-news', tag:'Space Telescope' },
  { icon:'🌞', name:'NASA Solar Dynamics Observatory', desc:'Live solar imagery in multiple wavelengths — watch the Sun\'s surface in real time.', url:'https://sdo.gsfc.nasa.gov/gallery/main.php', tag:'Solar Science' },
  { icon:'🔭', name:'Chandra X-Ray Observatory', desc:'NASA\'s X-ray telescope revealing high-energy phenomena — black holes, supernovae and neutron stars.', url:'https://chandra.si.edu/', tag:'X-Ray Astronomy' },
  { icon:'🌙', name:'NASA Moon Trek', desc:'Interactive 3D map of the entire Moon surface using LRO data — plan your own lunar mission.', url:'https://trek.nasa.gov/moon/', tag:'Lunar Exploration' },
  { icon:'🔴', name:'NASA Mars Exploration', desc:'Live rover data, maps, panoramas and mission updates from Curiosity and Perseverance.', url:'https://mars.nasa.gov/', tag:'Mars' },
  { icon:'⚛️', name:'CERN Public Portal', desc:'The world\'s largest particle accelerator — news, live data and physics explainers.', url:'https://home.cern/science', tag:'Particle Physics' },
  { icon:'📊', name:'NASA Exoplanet Archive', desc:'Searchable database of every confirmed exoplanet with all known parameters and data.', url:'https://exoplanetarchive.ipac.caltech.edu/', tag:'Exoplanets' },
  { icon:'🌊', name:'NASA Eyes on the Solar System', desc:'Real-time 3D simulation of every spacecraft NASA has ever launched — explore their trajectories.', url:'https://eyes.nasa.gov/apps/solar-system/', tag:'3D Simulation' },
  { icon:'🧑‍🚀', name:'NASA Human Spaceflight', desc:'Live ISS tracking, crew information, spacewalk schedules and mission updates.', url:'https://www.nasa.gov/international-space-station/', tag:'Human Spaceflight' },
  { icon:'📡', name:'Jet Propulsion Laboratory', desc:'JPL develops NASA\'s robotic explorers — news, data and engineering behind Mars rovers and deep space missions.', url:'https://www.jpl.nasa.gov/', tag:'Engineering' },
  { icon:'🌌', name:'ESA Science & Technology', desc:'European Space Agency\'s science portal — Gaia, BepiColombo, EnVision and future mission data.', url:'https://sci.esa.int/', tag:'Space Agency' },
  { icon:'🌐', name:'NASA WorldWind', desc:'Open source virtual globe — explore Earth, Moon, Mars and Jupiter\'s moons in 3D.', url:'https://worldwind.arc.nasa.gov/', tag:'3D Exploration' },
  { icon:'🔭', name:'Sky & Telescope', desc:'Observation guides, equipment reviews and breaking astronomy news since 1941.', url:'https://skyandtelescope.org/', tag:'Amateur Astronomy' },
  { icon:'🧬', name:'Astrobiology Magazine (NASA)', desc:'NASA\'s dedicated resource on the origin, evolution and distribution of life in the cosmos.', url:'https://astrobiology.nasa.gov/', tag:'Astrobiology' },
  { icon:'🌟', name:'Hubble Heritage Gallery', desc:'25 years of Hubble\'s most iconic images in the highest available resolution for download.', url:'https://hubblesite.org/images/gallery', tag:'Images' },
  { icon:'⚡', name:'NASA Goddard Scientific Visualization', desc:'Stunning 4K visualizations of space phenomena — corona eruptions, black hole accretion and galaxy mergers.', url:'https://svs.gsfc.nasa.gov/', tag:'Visualizations' },
  { icon:'🎓', name:'MIT OpenCourseWare — Astrophysics', desc:'Free MIT lecture notes, problem sets and exams for undergraduate and graduate astrophysics.', url:'https://ocw.mit.edu/courses/8-902-astrophysics-ii-fall-2004/', tag:'Education' },
  { icon:'🛰️', name:'N2YO Real-Time Satellite Tracker', desc:'Track any satellite live on a map — ISS, Hubble, GPS, spy satellites and debris clouds.', url:'https://www.n2yo.com/', tag:'Satellite Tracking' },
  { icon:'🌠', name:'Zooniverse — Galaxy Zoo', desc:'Real citizen science — help astronomers classify millions of real galaxy images from JWST and Hubble.', url:'https://www.zooniverse.org/projects/zookeeper/galaxy-zoo', tag:'Citizen Science' },
  { icon:'📖', name:'Sean Carroll — Mindscape Blog', desc:'Theoretical physicist Sean Carroll explains quantum mechanics, cosmology and spacetime in depth.', url:'https://www.preposterousuniverse.com/blog/', tag:'Physics Blog' },
  { icon:'🌌', name:'Crash Course Astronomy (YouTube)', desc:'Phil Plait\'s 47-episode complete astronomy course — free on YouTube, covers everything from telescopes to cosmology.', url:'https://www.youtube.com/playlist?list=PL8dPuuaLjXtPAJr1ysd5yGIyiSFuh0mIL', tag:'Video Course' },
  { icon:'📡', name:'Radio JOVE — NASA Citizen Science', desc:'Listen to Jupiter\'s radio emissions and solar bursts using your own antenna — a real NASA citizen science project.', url:'https://radiojove.gsfc.nasa.gov/', tag:'Citizen Science' },
  { icon:'🔭', name:'Lowell Observatory', desc:'Historic observatory that discovered Pluto — live sky cameras, public programs and research news.', url:'https://lowell.edu/', tag:'Observatory' },
];

// ── RENDER DISCOVER CARDS ─────────────────────────────────────
function renderDiscover(filter) {
  const grid = document.getElementById('discoverGrid');
  grid.innerHTML = '';
  const data = filter === 'all' ? discoverData : discoverData.filter(d => d.tag === filter);
  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'disc-card';
    card.innerHTML = `
      <img class="disc-card-img" src="${item.img}" alt="${item.title}" loading="lazy" onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/CMB_Timeline300_no_WMAP.jpg/480px-CMB_Timeline300_no_WMAP.jpg'"/>
      <div class="disc-card-body">
        <div class="disc-card-tag">${item.tag}</div>
        <div class="disc-card-title">${item.title}</div>
        <div class="disc-card-desc">${item.desc}</div>
      </div>`;
    card.addEventListener('click', () => openCardModal(item));
    grid.appendChild(card);
  });
}

function filterCards(tag, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderDiscover(tag);
}

// ── CARD MODAL (reuse learn modal) ───────────────────────────
function openCardModal(item) {
  document.getElementById('learnBadge').textContent = item.tag.toUpperCase();
  document.getElementById('learnImg').src = item.img;
  document.getElementById('learnImg').onerror = function(){ this.src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/CMB_Timeline300_no_WMAP.jpg/480px-CMB_Timeline300_no_WMAP.jpg'; };
  document.getElementById('learnTitle').textContent = item.title;
  document.getElementById('learnDesc').textContent = item.desc;
  document.getElementById('learnMore').href = item.wiki;
  document.getElementById('learnModal').classList.remove('hidden');
}

// ── LEARN SOMETHING NEW ───────────────────────────────────────
let lastLearnIdx = -1;
function openLearnNew() {
  shuffleLearn();
  document.getElementById('learnModal').classList.remove('hidden');
}
function closeLearnNew() { document.getElementById('learnModal').classList.add('hidden'); }
function shuffleLearn() {
  let idx;
  do { idx = Math.floor(Math.random() * discoverData.length); } while (idx === lastLearnIdx);
  lastLearnIdx = idx;
  const item = discoverData[idx];
  document.getElementById('learnBadge').textContent = item.tag.toUpperCase();
  const img = document.getElementById('learnImg');
  img.src = item.img;
  img.onerror = function(){ this.src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/CMB_Timeline300_no_WMAP.jpg/480px-CMB_Timeline300_no_WMAP.jpg'; };
  document.getElementById('learnTitle').textContent = item.title;
  document.getElementById('learnDesc').textContent = item.desc;
  document.getElementById('learnMore').href = item.wiki;
}

// ── RENDER DID YOU KNOW ───────────────────────────────────────
function renderDYK() {
  const container = document.getElementById('dykContainer');
  dykData.forEach(item => {
    const card = document.createElement('div');
    card.className = 'dyk-card';
    card.innerHTML = `
      <img class="dyk-card-img" src="${item.img}" alt="${item.title}" loading="lazy" onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/CMB_Timeline300_no_WMAP.jpg/480px-CMB_Timeline300_no_WMAP.jpg'"/>
      <div class="dyk-body">
        <div class="dyk-label">💡 Did You Know?</div>
        <div class="dyk-title">${item.title}</div>
        <div class="dyk-text">${item.text}</div>
        <a class="dyk-link" href="${item.link}" target="_blank" rel="noopener">Learn more →</a>
      </div>`;
    container.appendChild(card);
  });
}

// ── SCROLL REVEAL ─────────────────────────────────────────────
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.dyk-card').forEach(el => observer.observe(el));
}

// ── RENDER EXPLORE WEB ────────────────────────────────────────
function renderWebLinks() {
  const grid = document.getElementById('webGrid');
  webLinks.forEach(item => {
    const a = document.createElement('a');
    a.className = 'web-card';
    a.href = item.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.innerHTML = `
      <div class="web-card-icon">${item.icon}</div>
      <div class="web-card-name">${item.name}</div>
      <div class="web-card-desc">${item.desc}</div>
      <div class="web-card-tag">${item.tag}</div>`;
    grid.appendChild(a);
  });
}

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('cosmosTheme');
  const visited = localStorage.getItem('cosmosVisited');

  if (visited && saved) {
    setTheme(saved);
    document.getElementById('welcomeModal').classList.add('hidden');
  } else if (saved) {
    document.getElementById('welcomeModal').classList.remove('hidden');
  }

  renderDiscover('all');
  renderDYK();
  renderWebLinks();
  setTimeout(initScrollReveal, 100);

  document.getElementById('learnModal').addEventListener('click', function(e) {
    if (e.target === this) closeLearnNew();
  });
});