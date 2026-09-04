import heroHeritage from "@/assets/hero-heritage.jpg";
import expHeritageWalk from "@/assets/exp-heritage-walk.jpg";
import expFood from "@/assets/exp-food.jpg";
import expArchitecture from "@/assets/exp-architecture.jpg";
import expCultural from "@/assets/exp-cultural.jpg";
import expCurated from "@/assets/exp-curated.jpg";
import destMumbai from "@/assets/dest-mumbai.jpg";
import destDelhi from "@/assets/dest-delhi.jpg";
import destJaipur from "@/assets/dest-jaipur.jpg";
import destVaranasi from "@/assets/dest-varanasi.jpg";
import destKolkata from "@/assets/dest-kolkata.jpg";
import destHyderabad from "@/assets/dest-hyderabad.jpg";
import destPune from "@/assets/dest-pune.jpg";
import destGoa from "@/assets/dest-goa.jpg";
import signatureJourney from "@/assets/signature-journey.jpg";
import philosophy from "@/assets/philosophy.jpg";
import storyArchitecture from "@/assets/story-architecture.jpg";
import storyFood from "@/assets/story-food.jpg";
import storyPeople from "@/assets/story-people.jpg";
import galleryMarket from "@/assets/gallery-market.jpg";
import galleryGroup from "@/assets/gallery-group.jpg";

export const images = {
  heroHeritage,
  signatureJourney,
  philosophy,
  galleryMarket,
  galleryGroup,
  storyArchitecture,
  storyFood,
  storyPeople,
};

export const contact = {
  phone: "+91 98200 41122",
  phoneHref: "tel:+919820041122",
  whatsapp: "https://wa.me/919820041122",
  email: "hello@derivativebharat.in",
  address: "Fort Heritage Precinct, Mumbai 400001, India",
};

export type ExperienceCategory = {
  slug: string;
  title: string;
  short: string;
  description: string;
  image: string;
};

export const experienceCategories: ExperienceCategory[] = [
  {
    slug: "heritage-walks",
    title: "Heritage Walks",
    short: "Old quarters read street by street.",
    description:
      "Slow, historian-led walks through old quarters where facades, doorways and street names carry the record.",
    image: expHeritageWalk,
  },
  {
    slug: "food-walks",
    title: "Food & Culinary Trails",
    short: "Kitchens, bazaars and recipes with a past.",
    description:
      "Trails that trace migration, trade and community through what a city cooks and how it eats.",
    image: expFood,
  },
  {
    slug: "architecture-tours",
    title: "Architecture Tours",
    short: "Stone, brick and the ideas behind them.",
    description:
      "Read buildings as documents — material, climate, patronage and the politics behind a facade.",
    image: expArchitecture,
  },
  {
    slug: "cultural-experiences",
    title: "Cultural Experiences",
    short: "Living traditions, met in person.",
    description:
      "Music, craft, ritual and performance experienced with the practitioners who keep them alive.",
    image: expCultural,
  },
  {
    slug: "curated-journeys",
    title: "Curated Journeys",
    short: "Multi-day routes across regions.",
    description:
      "Longer journeys that link cities, landscapes and communities into a single continuous narrative.",
    image: expCurated,
  },
];

export const experienceTypes = experienceCategories.map((c) => c.title);

export type Destination = {
  slug: string;
  city: string;
  state: string;
  tagline: string;
  intro: string;
  image: string;
  neighbourhoods: string[];
  bestTime: string;
  about: string;
  food: string;
  architecture: string;
  localStories: string;
};

export const destinations: Destination[] = [
  {
    slug: "mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    tagline: "Colonial architecture, markets & hidden stories",
    intro:
      "Seven islands reclaimed into one restless city. Mumbai keeps its Gothic, Art Deco and mill-town histories stacked on top of each other, often on the same street.",
    image: destMumbai,
    neighbourhoods: ["Fort & Kala Ghoda", "Bhuleshwar", "Girangaon", "Bandra Village", "Dockyard Road"],
    bestTime: "November to February, and the first weeks of the monsoon for the Deco waterfront.",
    about:
      "Trade built Mumbai and trade rewrote it repeatedly — cotton, opium, textiles, cinema, finance. Every rewrite left a layer of buildings, communities and food behind.",
    food: "Parsi cafes, Gujarati thalis in Bhuleshwar, Konkani seafood, Irani bakeries and the mill-worker lunch economy.",
    architecture: "Victorian Gothic public buildings, the world's second-largest Art Deco ensemble, chawls, and Indo-Saracenic institutions.",
    localStories:
      "Mill families, dockworkers, Parsi philanthropists and the fishing communities who were here long before the reclamations.",
  },
  {
    slug: "delhi",
    city: "Delhi",
    state: "Delhi NCR",
    tagline: "Seven cities layered into one capital",
    intro:
      "Delhi has been rebuilt more times than almost any city in the subcontinent. Its ruins are not set aside — people live, cook and trade around them.",
    image: destDelhi,
    neighbourhoods: ["Shahjahanabad", "Mehrauli", "Nizamuddin", "Lutyens' Delhi", "Hauz Khas"],
    bestTime: "October to March, with early mornings for the old city lanes.",
    about:
      "Sultanate, Mughal and colonial capitals sit within a few kilometres of each other, each borrowing stone and ideas from the last.",
    food: "Mughlai kitchens, Punjabi refugee cuisine after 1947, halwai traditions and the winter street food of the walled city.",
    architecture: "Tughlaq rubble masonry, Mughal red sandstone and marble, and the imperial classicism of New Delhi.",
    localStories: "Sufi shrine communities, printing presses, kabaadi trades and families who have lived in the same haveli for generations.",
  },
  {
    slug: "jaipur",
    city: "Jaipur",
    state: "Rajasthan",
    tagline: "A planned city of pink stucco and craft guilds",
    intro:
      "Jaipur was drawn on paper before it was built in stone — a grid city of markets, guilds and astronomy, still working to its original plan.",
    image: destJaipur,
    neighbourhoods: ["Chandpole Bazaar", "Johari Bazaar", "Amber", "Nahargarh Ridge"],
    bestTime: "October to March.",
    about: "An eighteenth-century experiment in urban planning, built around trade streets of standard width and craft neighbourhoods.",
    food: "Rajasthani thalis, dal baati, kachori halwai traditions and the sweet shops of Johari Bazaar.",
    architecture: "Jharokha windows, chhatris, stepwells, the Jantar Mantar observatory and painted haveli facades.",
    localStories: "Block printers, blue potters, gem cutters and the guild families who still occupy their original streets.",
  },
  {
    slug: "varanasi",
    city: "Varanasi",
    state: "Uttar Pradesh",
    tagline: "Ghats, weavers and a river that orders the day",
    intro:
      "A city organised around water and ritual, where lanes only make sense once you understand where the river is.",
    image: destVaranasi,
    neighbourhoods: ["Assi to Dashashwamedh", "Madanpura", "Sarnath", "Pilikothi"],
    bestTime: "October to March, at sunrise.",
    about: "One of the longest continuously inhabited cities in the world, and a centre of Sanskrit learning, weaving and pilgrimage.",
    food: "Banarasi breakfast of kachori sabzi, chaat traditions, malaiyyo in winter and the paan economy.",
    architecture: "Ghat architecture, riverside palaces built by distant kingdoms, and dense lane housing.",
    localStories: "Silk weaving families, boatmen lineages, akhara wrestlers and priestly households.",
  },
  {
    slug: "kolkata",
    city: "Kolkata",
    state: "West Bengal",
    tagline: "Printing presses, adda and colonial cast iron",
    intro: "A city of intellectual argument, mercantile mansions and tram lines that still cut through nineteenth-century streets.",
    image: destKolkata,
    neighbourhoods: ["North Kolkata", "College Street", "Kumartuli", "Dalhousie Square", "Chinatown"],
    bestTime: "November to February, and the Durga Puja weeks.",
    about: "Built by trading companies and Bengali zamindars, then remade by printing, theatre, cinema and political thought.",
    food: "Bengali sweets, Chinese-Indian cooking from Tangra, kathi rolls and coffee house culture.",
    architecture: "Palladian mansions, thakur dalans, cast-iron balconies and the courtyard houses of the north.",
    localStories: "Idol makers of Kumartuli, publishers of College Street and the last Chinese families of Tiretta Bazaar.",
  },
  {
    slug: "hyderabad",
    city: "Hyderabad",
    state: "Telangana",
    tagline: "Qutb Shahi stone, Deccan food and bangle lanes",
    intro: "A Deccan capital where Persianate court culture met Telugu craft traditions and never fully separated again.",
    image: destHyderabad,
    neighbourhoods: ["Charminar precinct", "Golconda", "Begumpet", "Secunderabad Cantonment"],
    bestTime: "October to February.",
    about: "Founded on trade in diamonds and textiles, later a princely state with its own railways, currency and architecture.",
    food: "Deccani biryani lineages, Irani chai cafes, haleem in Ramzan and Telangana village cooking.",
    architecture: "Qutb Shahi tombs, Asaf Jahi palaces, stepwells and the granite outcrops the city was built into.",
    localStories: "Bangle makers, pearl setters, qawwali gatherings and Cantonment families.",
  },
  {
    slug: "pune",
    city: "Pune",
    state: "Maharashtra",
    tagline: "Wadas, water systems and Peshwa-era streets",
    intro: "Behind Pune's modern sprawl is a tightly planned eighteenth-century city of wadas, temples and aqueducts.",
    image: destPune,
    neighbourhoods: ["Kasba Peth", "Shaniwar Peth", "Camp", "Koregaon Park"],
    bestTime: "June to February; the monsoon suits the ghat routes nearby.",
    about: "A Maratha administrative capital that became a colonial cantonment and later an education and industrial city.",
    food: "Misal traditions, Maharashtrian breakfast houses, Parsi bakeries and the Camp's mixed kitchens.",
    architecture: "Wada courtyard houses, temple complexes, colonial bungalows and Deco cinemas.",
    localStories: "Temple trusts, printing houses, the water supply networks and the neighbourhoods called peths.",
  },
  {
    slug: "goa",
    city: "Goa",
    state: "Goa",
    tagline: "Indo-Portuguese houses, chapels and salt pans",
    intro: "Beyond the beaches, Goa is a landscape of ancestral houses, ward chapels, springs and rice fields.",
    image: destGoa,
    neighbourhoods: ["Fontainhas", "Old Goa", "Chandor", "Divar Island"],
    bestTime: "November to March; the monsoon for the fields and springs.",
    about: "Four and a half centuries of Portuguese rule layered on older Konkan village systems that still govern land and water.",
    food: "Saraswat and Catholic Goan kitchens, feni distilleries, bakery traditions and river fish.",
    architecture: "Balcao houses, azulejo tiles, laterite chapels and baroque churches.",
    localStories: "Communidade land systems, feni tappers, salt pan workers and village bands.",
  },
];

export type Tour = {
  slug: string;
  title: string;
  destination: string;
  destinationSlug: string;
  category: string;
  categorySlug: string;
  duration: string;
  durationBand: "Under 3 hours" | "3–5 hours" | "Full day" | "Multi-day";
  price: number;
  rating: number;
  reviews: number;
  language: string[];
  image: string;
  summary: string;
  overview: string;
  highlights: string[];
  discover: string[];
  itinerary: { time: string; title: string; detail: string }[];
  meetingPoint: string;
  included: string[];
  excluded: string[];
  important: string[];
  faqs: { q: string; a: string }[];
  trending?: boolean;
  seasonal?: string;
  popular?: boolean;
};

const baseFaqs = [
  {
    q: "How large are the groups?",
    a: "Most experiences run with 6 to 12 travellers so that everyone can hear the guide and ask questions. Private departures are available on request.",
  },
  {
    q: "Is the route accessible?",
    a: "Routes vary. Several walks use uneven lanes and steps. Tell us your requirements when you enquire and we will suggest a suitable route or adapt the walk.",
  },
  {
    q: "What happens if it rains?",
    a: "Walks run in light rain with covered stops built in. If conditions are unsafe we reschedule or refund in full.",
  },
];

export const tours: Tour[] = [
  {
    slug: "fort-and-kala-ghoda-heritage-walk",
    title: "Fort & Kala Ghoda Heritage Walk",
    destination: "Mumbai",
    destinationSlug: "mumbai",
    category: "Heritage Walks",
    categorySlug: "heritage-walks",
    duration: "3 hours",
    durationBand: "3–5 hours",
    price: 1850,
    rating: 4.9,
    reviews: 214,
    language: ["English", "Hindi", "Marathi"],
    image: destMumbai,
    summary:
      "Trace the making of colonial Bombay through its Gothic public buildings, courtyards and the reclamations beneath your feet.",
    overview:
      "This walk begins where the old fort walls once stood and follows the nineteenth-century building boom that turned a trading outpost into an imperial port city. We read facades, read inscriptions, and talk about who paid for what and why.",
    highlights: [
      "Victorian Gothic and Indo-Saracenic public buildings",
      "Merchant courtyards usually walked past",
      "The reclamation history under the pavement",
      "Stone, iron and the economics of an imperial port",
    ],
    discover: [
      "How cotton money financed civic architecture",
      "Why the city's street grid bends where it does",
      "The philanthropic families behind the institutions",
      "What conservation looks like in a working precinct",
    ],
    itinerary: [
      { time: "08:00", title: "Meet at the fountain", detail: "Introductions, a short map briefing and the plan for the morning." },
      { time: "08:30", title: "The fort that isn't there", detail: "Reading the removed walls through street alignment and place names." },
      { time: "09:30", title: "Gothic public quarter", detail: "Facade reading, stone sources and the workshops that carved them." },
      { time: "10:30", title: "Courtyards and closing chai", detail: "A merchant courtyard, questions and a cup of chai to finish." },
    ],
    meetingPoint: "Kala Ghoda fountain plaza, Fort, Mumbai. Look for the Derivative Bharat marker.",
    included: ["Historian-led guiding", "Printed route map", "Chai at the closing stop", "Entry where applicable"],
    excluded: ["Hotel transfers", "Meals beyond the closing stop", "Personal expenses"],
    important: ["Comfortable walking shoes recommended", "Roughly 3 km of walking", "Please arrive 10 minutes early"],
    faqs: baseFaqs,
    trending: true,
    popular: true,
    seasonal: "Colonial Mumbai Stories",
  },
  {
    slug: "shahjahanabad-old-city-food-trail",
    title: "Shahjahanabad Old City Food Trail",
    destination: "Delhi",
    destinationSlug: "delhi",
    category: "Food & Culinary Trails",
    categorySlug: "food-walks",
    duration: "4 hours",
    durationBand: "3–5 hours",
    price: 2400,
    rating: 4.8,
    reviews: 186,
    language: ["English", "Hindi", "Urdu"],
    image: destDelhi,
    summary:
      "Eat your way through the walled city while tracing Mughal kitchens, partition arrivals and the halwai trades that survived both.",
    overview:
      "A tasting walk with a historian and a local food researcher. We move between eight small stops, each chosen because it explains something about who came to Delhi, when, and what they cooked when they arrived.",
    highlights: [
      "Eight tasting stops across the walled city",
      "Mughal, Punjabi and Jain kitchen traditions",
      "A working halwai's kitchen visit",
      "Spice market context, not just spice photos",
    ],
    discover: [
      "How 1947 changed what Delhi eats",
      "Why certain sweets are seasonal",
      "The economics of a lane kitchen",
      "Which recipes travelled and which stayed",
    ],
    itinerary: [
      { time: "16:00", title: "Spice market briefing", detail: "Trade routes, wholesale systems and what is actually grown nearby." },
      { time: "17:00", title: "Savoury stops", detail: "Four stops across kebab, chaat and Jain vegetarian kitchens." },
      { time: "18:30", title: "Halwai visit", detail: "Behind the counter with a family that has worked the same stove for decades." },
      { time: "19:30", title: "Sweets and close", detail: "Final tasting and conversation over kulfi." },
    ],
    meetingPoint: "Gate 3, Chawri Bazaar metro station, Old Delhi.",
    included: ["All tastings", "Historian and food researcher", "Bottled water", "Route notes with addresses"],
    excluded: ["Transfers", "Additional food ordered on your own", "Gratuities"],
    important: ["Vegetarian and Jain routes available on request", "Come hungry — portions add up", "Roughly 2.5 km of walking"],
    faqs: baseFaqs,
    trending: true,
    popular: true,
    seasonal: "Old City Food Trails",
  },
  {
    slug: "varanasi-ghats-at-dawn",
    title: "Varanasi Ghats at Dawn",
    destination: "Varanasi",
    destinationSlug: "varanasi",
    category: "Cultural Experiences",
    categorySlug: "cultural-experiences",
    duration: "3.5 hours",
    durationBand: "3–5 hours",
    price: 2100,
    rating: 4.9,
    reviews: 302,
    language: ["English", "Hindi"],
    image: destVaranasi,
    summary: "A river-first reading of the city: boat, ghats, weaving lanes and the ritual calendar that orders daily life.",
    overview:
      "We start on the water before sunrise, then walk back into the lanes to understand how the river, the ghats and the neighbourhoods behind them depend on each other.",
    highlights: [
      "Sunrise boat along the principal ghats",
      "Ghat patronage and who built what",
      "A weaver's workshop visit",
      "Ritual calendar explained without spectacle",
    ],
    discover: [
      "Why distant kingdoms built palaces here",
      "How the silk trade organises whole lanes",
      "The relationship between water level and city life",
      "What pilgrimage economies actually look like",
    ],
    itinerary: [
      { time: "05:15", title: "Boat at first light", detail: "Reading the ghat skyline from the water." },
      { time: "06:30", title: "Ghat walk", detail: "Stone, steps, patrons and the annual flood line." },
      { time: "07:30", title: "Weaving lanes", detail: "A working handloom and the families behind it." },
      { time: "08:30", title: "Breakfast close", detail: "Banarasi breakfast and conversation." },
    ],
    meetingPoint: "Assi Ghat, near the main steps, Varanasi.",
    included: ["Private boat", "Historian guide", "Workshop visit", "Breakfast"],
    excluded: ["Transfers", "Donations at shrines", "Personal expenses"],
    important: ["Early start — 05:15", "Modest clothing recommended", "Steps can be slippery"],
    faqs: baseFaqs,
    trending: true,
    popular: true,
    seasonal: "Temple Architecture Journeys",
  },
  {
    slug: "jaipur-craft-quarters-walk",
    title: "Jaipur Craft Quarters Walk",
    destination: "Jaipur",
    destinationSlug: "jaipur",
    category: "Cultural Experiences",
    categorySlug: "cultural-experiences",
    duration: "3 hours",
    durationBand: "3–5 hours",
    price: 1950,
    rating: 4.7,
    reviews: 128,
    language: ["English", "Hindi"],
    image: destJaipur,
    summary: "Meet block printers, blue potters and gem setters in the guild streets the city was planned around.",
    overview:
      "Jaipur's grid was drawn with craft in mind. This walk follows that logic, visiting three workshops and reading the market streets that connect them.",
    highlights: ["Three working craft studios", "The original planned market grid", "Pigment, clay and stone sourcing", "Guild families in conversation"],
    discover: ["How a planned city allocates trades", "Why certain crafts cluster", "What patronage means today", "How craft prices are set"],
    itinerary: [
      { time: "09:00", title: "Market gate briefing", detail: "The city plan explained on the street it describes." },
      { time: "09:45", title: "Block printing studio", detail: "Carving, dyeing and repeat patterns." },
      { time: "10:45", title: "Blue pottery workshop", detail: "Quartz paste, glaze chemistry and kiln economics." },
      { time: "11:30", title: "Bazaar close", detail: "Gem setting street and a closing conversation." },
    ],
    meetingPoint: "Chandpole Gate, Jaipur old city.",
    included: ["Guide", "Workshop demonstrations", "Water", "Route notes"],
    excluded: ["Purchases at workshops", "Transfers", "Meals"],
    important: ["Photography allowed with permission", "2 km of walking", "Workshops closed on some festival days"],
    faqs: baseFaqs,
    trending: true,
    popular: true,
    seasonal: "Festival Trails",
  },
  {
    slug: "art-deco-and-mill-lands-architecture-tour",
    title: "Art Deco & Mill Lands Architecture Tour",
    destination: "Mumbai",
    destinationSlug: "mumbai",
    category: "Architecture Tours",
    categorySlug: "architecture-tours",
    duration: "Full day",
    durationBand: "Full day",
    price: 4200,
    rating: 4.8,
    reviews: 96,
    language: ["English", "Hindi"],
    image: destMumbai,
    summary: "From the Deco waterfront to Girangaon's mill chimneys — one day on how industry shaped a modern city.",
    overview:
      "A full-day architecture tour with an architect-historian, tracing the 1930s building boom and the textile industry that funded and then vacated it.",
    highlights: ["Deco waterfront ensemble", "Chawl typologies", "A surviving mill precinct", "Adaptive reuse debates"],
    discover: ["Why Deco arrived when it did", "How chawls housed a workforce", "What happened after the mill strike", "Where redevelopment is heading"],
    itinerary: [
      { time: "09:00", title: "Deco waterfront", detail: "Ensembles, materials and the cinema facades." },
      { time: "12:00", title: "Lunch stop", detail: "A mill-district lunch house." },
      { time: "13:30", title: "Girangaon", detail: "Chawls, chimneys and the geography of labour." },
      { time: "16:30", title: "Reuse and close", detail: "Contemporary conversions and a closing discussion." },
    ],
    meetingPoint: "Oval Maidan north gate, Mumbai.",
    included: ["Architect-historian guide", "Lunch", "Air-conditioned transfers between precincts", "Reading list"],
    excluded: ["Hotel pickup", "Museum tickets", "Personal expenses"],
    important: ["Full day, 09:00 to 17:00", "Some sites are privately owned and viewed externally", "Comfortable shoes required"],
    faqs: baseFaqs,
    popular: true,
  },
  {
    slug: "sahyadri-monsoon-heritage-route",
    title: "Sahyadri Monsoon Heritage Route",
    destination: "Pune",
    destinationSlug: "pune",
    category: "Curated Journeys",
    categorySlug: "curated-journeys",
    duration: "3 days",
    durationBand: "Multi-day",
    price: 24500,
    rating: 4.9,
    reviews: 61,
    language: ["English", "Hindi", "Marathi"],
    image: expCurated,
    summary: "Three days through ghat forts, rock-cut caves and village kitchens while the monsoon rewrites the landscape.",
    overview:
      "A multi-day journey built around water: how rainfall shaped fortification, trade routes, rock-cut architecture and the food of the western ghats.",
    highlights: ["Two ghat forts", "Rock-cut cave complexes", "Village kitchen meals", "Heritage stay accommodation"],
    discover: ["How monsoon dictated military planning", "Why caves sit where they do", "Trade routes over the ghats", "Rain-fed agriculture and its food"],
    itinerary: [
      { time: "Day 1", title: "Pune to the ghats", detail: "Wada city briefing, then the climb into the ranges." },
      { time: "Day 2", title: "Forts and caves", detail: "Fortification logic and rock-cut architecture." },
      { time: "Day 3", title: "Villages and return", detail: "Kitchens, fields and the drive back." },
    ],
    meetingPoint: "Pune, pickup from your accommodation.",
    included: ["2 nights heritage accommodation", "All meals", "Transport", "Guide and permits"],
    excluded: ["Flights and trains to Pune", "Travel insurance", "Personal expenses"],
    important: ["Moderate fitness required", "Monsoon season departures only", "Waterproofs essential"],
    faqs: baseFaqs,
    popular: true,
    seasonal: "Monsoon Heritage Walks",
  },
  {
    slug: "north-kolkata-courtyard-houses",
    title: "North Kolkata Courtyard Houses",
    destination: "Kolkata",
    destinationSlug: "kolkata",
    category: "Architecture Tours",
    categorySlug: "architecture-tours",
    duration: "2.5 hours",
    durationBand: "Under 3 hours",
    price: 1600,
    rating: 4.7,
    reviews: 84,
    language: ["English", "Bengali", "Hindi"],
    image: destKolkata,
    summary: "Thakur dalans, cast-iron balconies and the family houses that shaped nineteenth-century Bengal.",
    overview:
      "A walk through north Kolkata's mansion streets with access to two private courtyard houses and the families who maintain them.",
    highlights: ["Two private house visits", "Thakur dalan courtyards", "Cast-iron and stucco detailing", "Puja architecture explained"],
    discover: ["Zamindari wealth and its buildings", "How courtyards manage heat", "Why the north declined", "Conservation without funding"],
    itinerary: [
      { time: "16:00", title: "Mansion street", detail: "Reading the street before entering a house." },
      { time: "16:45", title: "First courtyard house", detail: "Layout, ritual space and daily life." },
      { time: "17:30", title: "Second house and close", detail: "A family in conversation over tea." },
    ],
    meetingPoint: "Girish Park metro, Gate 1, Kolkata.",
    included: ["Guide", "Private house access", "Tea", "Route notes"],
    excluded: ["Transfers", "Meals", "Donations"],
    important: ["Interior photography restricted", "1.5 km of walking", "Best in the cooler months"],
    faqs: baseFaqs,
    trending: true,
  },
  {
    slug: "deccan-stone-and-biryani-trail",
    title: "Deccan Stone & Biryani Trail",
    destination: "Hyderabad",
    destinationSlug: "hyderabad",
    category: "Food & Culinary Trails",
    categorySlug: "food-walks",
    duration: "4 hours",
    durationBand: "3–5 hours",
    price: 2250,
    rating: 4.8,
    reviews: 143,
    language: ["English", "Hindi", "Telugu"],
    image: destHyderabad,
    summary: "Qutb Shahi granite in the morning, Deccani kitchens by afternoon — one trail, two ways of reading the city.",
    overview:
      "Hyderabad's food carries its court history. We pair monument visits with kitchens that still cook to Deccani lineages, including an Irani cafe and a home kitchen.",
    highlights: ["Qutb Shahi monuments", "Home kitchen tasting", "Irani cafe chai ritual", "Bangle lane walk"],
    discover: ["Persianate and Telugu culinary overlap", "Granite quarrying and city form", "Why Irani cafes exist", "Ramzan food calendars"],
    itinerary: [
      { time: "10:00", title: "Granite and tombs", detail: "Stone sourcing and Qutb Shahi patronage." },
      { time: "11:30", title: "Home kitchen", detail: "A Deccani family lunch with the cook." },
      { time: "13:00", title: "Bangle lanes", detail: "Craft, labour and the market economy." },
      { time: "13:45", title: "Irani chai close", detail: "Chai, Osmania biscuits and questions." },
    ],
    meetingPoint: "Qutb Shahi tombs, main entrance, Hyderabad.",
    included: ["Guide", "All tastings and lunch", "Monument entry", "Water"],
    excluded: ["Transfers", "Purchases", "Gratuities"],
    important: ["Vegetarian route available", "Sun protection recommended", "2 km of walking"],
    faqs: baseFaqs,
    trending: true,
  },
  {
    slug: "fontainhas-and-village-goa",
    title: "Fontainhas & Village Goa",
    destination: "Goa",
    destinationSlug: "goa",
    category: "Heritage Walks",
    categorySlug: "heritage-walks",
    duration: "3 hours",
    durationBand: "3–5 hours",
    price: 1750,
    rating: 4.6,
    reviews: 72,
    language: ["English", "Konkani", "Hindi"],
    image: destGoa,
    summary: "Balcao houses, ward chapels and the village land systems that still shape Goan life.",
    overview:
      "A walk through the Latin quarter and out into a working village to see how communidade land systems, chapels and houses fit together.",
    highlights: ["Fontainhas street walk", "A private balcao house", "Ward chapel and its calendar", "Communidade land explained"],
    discover: ["What azulejo tiles record", "How laterite is quarried and used", "Village governance systems", "Why houses face where they do"],
    itinerary: [
      { time: "08:30", title: "Latin quarter", detail: "Colour codes, tiles and street form." },
      { time: "09:30", title: "House visit", detail: "Interiors, furniture and family history." },
      { time: "10:30", title: "Village and close", detail: "Chapel, fields and closing conversation." },
    ],
    meetingPoint: "Fontainhas chapel square, Panaji.",
    included: ["Guide", "House visit", "Refreshments", "Route notes"],
    excluded: ["Transfers", "Meals", "Personal expenses"],
    important: ["Morning departures only", "2 km of walking", "Respect residents' privacy"],
    faqs: baseFaqs,
  },
  {
    slug: "mehrauli-archaeological-walk",
    title: "Mehrauli Archaeological Walk",
    destination: "Delhi",
    destinationSlug: "delhi",
    category: "Architecture Tours",
    categorySlug: "architecture-tours",
    duration: "2.5 hours",
    durationBand: "Under 3 hours",
    price: 1500,
    rating: 4.7,
    reviews: 109,
    language: ["English", "Hindi"],
    image: expArchitecture,
    summary: "A thousand years of building in one park: Sultanate tombs, stepwells and colonial follies side by side.",
    overview:
      "Mehrauli holds structures from at least seven periods within walking distance. We read them in sequence to understand how each borrowed from the last.",
    highlights: ["Sultanate-era tombs", "A working stepwell", "Colonial garden follies", "Spolia and reused stone"],
    discover: ["How rubble masonry works", "Water architecture in a dry ridge", "Who reused whose stone", "Conservation choices in a live park"],
    itinerary: [
      { time: "07:30", title: "Ridge entry", detail: "Geology and why settlement began here." },
      { time: "08:15", title: "Tombs and mosques", detail: "Sequence, material and inscription reading." },
      { time: "09:15", title: "Stepwell close", detail: "Water systems and the walk back." },
    ],
    meetingPoint: "Mehrauli Archaeological Park, main gate, Delhi.",
    included: ["Guide", "Route map", "Water"],
    excluded: ["Transfers", "Meals", "Entry to ticketed monuments"],
    important: ["Early morning start", "Uneven ground", "Carry sun protection"],
    faqs: baseFaqs,
  },
  {
    slug: "pune-wada-and-water-walk",
    title: "Pune Wada & Water Walk",
    destination: "Pune",
    destinationSlug: "pune",
    category: "Heritage Walks",
    categorySlug: "heritage-walks",
    duration: "2.5 hours",
    durationBand: "Under 3 hours",
    price: 1400,
    rating: 4.6,
    reviews: 58,
    language: ["English", "Marathi", "Hindi"],
    image: destPune,
    summary: "Courtyard houses, temple trusts and the eighteenth-century aqueducts still running under the old peths.",
    overview:
      "An old-city walk on how Pune was planned around water — the aqueduct network, its wells and the wadas that grew around them.",
    highlights: ["Peth street planning", "A surviving wada courtyard", "Aqueduct outlets and wells", "Temple trust archives"],
    discover: ["How the water network was funded", "Why peths are named as they are", "Wada construction methods", "What replaced the system"],
    itinerary: [
      { time: "08:00", title: "Kasba Peth", detail: "The oldest quarter and its temple." },
      { time: "08:45", title: "Wada courtyard", detail: "Timber, stone and courtyard climate." },
      { time: "09:30", title: "Water close", detail: "Aqueduct outlet and closing chai." },
    ],
    meetingPoint: "Kasba Ganpati temple, Pune.",
    included: ["Guide", "Chai", "Route notes"],
    excluded: ["Transfers", "Meals", "Donations"],
    important: ["Remove footwear at temple stops", "2 km of walking", "Morning departures"],
    faqs: baseFaqs,
    seasonal: "Monsoon Heritage Walks",
  },
  {
    slug: "banaras-weavers-and-workshops",
    title: "Banaras Weavers & Workshops",
    destination: "Varanasi",
    destinationSlug: "varanasi",
    category: "Cultural Experiences",
    categorySlug: "cultural-experiences",
    duration: "3 hours",
    durationBand: "3–5 hours",
    price: 1900,
    rating: 4.8,
    reviews: 77,
    language: ["English", "Hindi"],
    image: expCultural,
    summary: "Inside the silk lanes: looms, design cards, dyeing yards and the families holding the craft together.",
    overview:
      "A workshop-focused afternoon in the weaving neighbourhoods, following a sari from design card to loom to market.",
    highlights: ["Handloom and design card demonstration", "Dyeing yard visit", "Master weaver conversation", "Market pricing explained"],
    discover: ["How motifs are recorded", "Why power looms changed the trade", "Cooperative structures", "How to identify genuine Banarasi work"],
    itinerary: [
      { time: "15:00", title: "Design studio", detail: "Cards, motifs and pattern memory." },
      { time: "16:00", title: "Loom floor", detail: "Weaving in progress with the family." },
      { time: "17:00", title: "Market close", detail: "Pricing, quality and questions." },
    ],
    meetingPoint: "Madanpura crossing, Varanasi.",
    included: ["Guide", "Workshop access", "Refreshments"],
    excluded: ["Purchases", "Transfers", "Meals"],
    important: ["Afternoon departures", "Narrow lanes", "Modest clothing recommended"],
    faqs: baseFaqs,
    seasonal: "Festival Trails",
  },
];

export const seasonalThemes = [
  { name: "Monsoon Heritage Walks", note: "Ghats, forts and fields at their greenest.", image: expCurated },
  { name: "Festival Trails", note: "Craft, ritual and neighbourhood celebration.", image: expCultural },
  { name: "Old City Food Trails", note: "Kitchens that record migration and trade.", image: expFood },
  { name: "Temple Architecture Journeys", note: "Stone, inscription and sacred geometry.", image: destVaranasi },
  { name: "Colonial Mumbai Stories", note: "Deco, Gothic and the port that paid for both.", image: destMumbai },
];

export const testimonials = [
  {
    name: "Ananya Raghunathan",
    location: "Bengaluru, India",
    rating: 5,
    quote:
      "I have lived in Mumbai for a decade and walked past those buildings daily. Three hours with a historian and the street read completely differently.",
  },
  {
    name: "Daniel Okonjo",
    location: "London, United Kingdom",
    rating: 5,
    quote:
      "Not a checklist tour. Our guide answered every awkward question about colonial history honestly, which is rare and the reason we booked twice.",
  },
  {
    name: "Meera Shah",
    location: "Ahmedabad, India",
    rating: 5,
    quote:
      "The food trail was about people, not photographs. We met cooks, heard how their families arrived in Delhi, and ate extremely well.",
  },
  {
    name: "Kenji Watanabe",
    location: "Osaka, Japan",
    rating: 5,
    quote:
      "Small group, careful pace, excellent notes afterwards. The Varanasi dawn boat is the best guided morning I have had in India.",
  },
];

export const stories = [
  {
    slug: "reading-a-facade",
    category: "Architecture",
    title: "How to Read a Facade Without a Guidebook",
    excerpt: "Cornices, brackets and window proportions record more about a building's date and patron than most plaques do.",
    image: storyArchitecture,
    readTime: "6 min read",
  },
  {
    slug: "kitchens-that-remember",
    category: "Food History",
    title: "Kitchens That Remember: Migration on a Plate",
    excerpt: "Follow a single spice through four Indian cities and you have followed four centuries of trade, displacement and adaptation.",
    image: storyFood,
    readTime: "8 min read",
  },
  {
    slug: "the-last-looms",
    category: "People & Communities",
    title: "The Last Looms of a Weaving Lane",
    excerpt: "What happens to a craft neighbourhood when the market moves online and the next generation moves out.",
    image: storyPeople,
    readTime: "7 min read",
  },
];

export const stats = [
  { value: "50+", label: "Curated Experiences" },
  { value: "15+", label: "Cities Explored" },
  { value: "1000+", label: "Happy Travellers" },
  { value: "100+", label: "Stories Documented" },
];

export const gallery = [
  { src: galleryMarket, alt: "Marigold garlands stacked at an Indian flower market" },
  { src: expFood, alt: "Street food vendor cooking in an old Indian market" },
  { src: destVaranasi, alt: "Boats and temple spires at the Varanasi ghats at dawn" },
  { src: storyArchitecture, alt: "Carved detail on a heritage Indian building facade" },
  { src: galleryGroup, alt: "Small travel group listening to a guide at an Indian monument" },
  { src: destKolkata, alt: "Tram tracks and colonial buildings on a Kolkata street" },
];

export const durationBands = ["Under 3 hours", "3–5 hours", "Full day", "Multi-day"] as const;
export const languages = ["English", "Hindi", "Marathi", "Bengali", "Telugu", "Konkani", "Urdu"];

export function formatPrice(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}
