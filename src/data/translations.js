/**
 * Complete English & Turkish Translations for Space Base Rescue! (NASA Space Apps 2026)
 * Supports Difficulty Modes, Achievements, Leaderboard, and Astronaut Name.
 */

export const translations = {
  en: {
    // Header & Navigation
    gameTitle: "Space Base Rescue!",
    musicBtn: "Music",
    musicOn: "Music: ON",
    musicOff: "Music: OFF",
    sfxBtn: "SFX",
    sfxOn: "SFX: ON",
    sfxOff: "SFX: OFF",
    nasaDataBtn: "NASA Data (Judges & Parents)",
    dayIndicator: "Day {current} of {total}",
    unmute: "Unmute Sound",
    mute: "Mute Sound",
    changeBase: "Change Planet Base",
    dropPrompt: "Drop card on base!",
    dragOrTap: "Drag card onto base or tap below!",
    shieldBubbleUp: "Shield Bubble Up!",
    helperBadge: "HELPER",

    // Start Screen & Name Input
    tagline: "2026 NASA Space Apps Challenge",
    subtitle: "Pick a base and keep your crew safe!",
    playBtn: "PLAY! ➔",
    nameLabel: "Astronaut Call-Sign:",
    namePlaceholder: "Enter cadet name...",
    randomBtn: "Random 🎲",
    randomNames: ['Captain Nova', 'Astro Leo', 'Commander Ada', 'Cosmo Maya', 'Cadet Orion', 'Pilot Luna', 'Major Sam'],

    // Difficulty Modes
    diffLabel: "Mission Difficulty:",
    diffEasy: "🌟 Explorer",
    diffMed: "🚀 Commander",
    diffHard: "🔥 NASA Pro",
    diffDescEasy: "4 Days • Safe Supplies",
    diffDescMed: "5 Days • Standard Storms",
    diffDescHard: "7 Days • Extreme Storms • 2x Score",

    // Planet Cards
    moonBase: "Moon Base",
    moonLocation: "Shackleton Crater (South Pole)",
    moonBadge1: "❄️ Freezing Cold",
    moonBadge2: "🌫️ Sticky Dust",
    marsBase: "Mars Base",
    marsLocation: "Jezero Crater Delta",
    marsBadge1: "🌪️ Dust Storms",
    marsBadge2: "📡 Slow Radio",

    // Buttons
    badgesBtn: "🏅 Badges",
    leaderboardBtn: "🏆 Leaderboard",
    customizeBtn: "🎨 Customize",
    clansNavBtn: "👥 Clans",

    // Clan System
    clansTitle: "Space Clans & Squads",
    myClansTab: "My Clans",
    createClanTab: "Create Clan",
    joinClanTab: "Join by Code",
    clanLeaderboardTab: "Clan Leaderboard",
    clanCodeLabel: "Invite Code:",
    copyCode: "Copy",
    codeCopied: "Copied! ✓",
    enterClanName: "Enter clan name (e.g. Apollo Squad)...",
    enterClanCode: "Enter 6-character code (e.g. MARS42)...",
    createClanBtn: "Create Clan 🚀",
    joinClanBtn: "Join Clan ➔",
    noClansYet: "You haven't joined any clans yet! Create one or enter an invite code.",
    maxClansError: "You can join at most 3 clans!",
    alreadyMemberError: "You are already in this clan!",
    clanNotFoundError: "Clan not found! Check the 6-character code.",
    invalidNameError: "Please enter a clan name (at least 2 letters).",
    invalidCodeError: "Please enter a valid 6-character code.",
    refreshBtn: "Refresh",
    noScoresUniversal: "No mission records yet — be the first cadet to complete a mission!",
    filterAllDiff: "All Difficulties",

    // Avatar Customizer
    customizerTitle: "Design Your Astronaut!",
    customizerSubtitle: "Pick your space suit, helmet, expression, and badge!",
    saveAstronautBtn: "Save Astronaut! 🚀",
    randomAvatarBtn: "Randomize 🎲",
    suitColorTab: "Space Suit",
    skinToneTab: "Skin Tone",
    faceStyleTab: "Expression",
    helmetStyleTab: "Helmet & Hat",
    patchTab: "Chest Patch",

    // Star Coins & Customizer Page
    starCoins: "Star Coins",
    coinsLabel: "{n} 🪙",
    customizePageTitle: "Astronaut Customizer Studio",
    customizePageSubtitle: "Style your cadet, unlock cosmic gear with Star Coins!",
    saveAndBack: "Save & Back ➔",
    buyConfirmTitle: "Unlock Cosmetic?",
    buyConfirmDesc: "Unlock this item for {price} 🪙?",
    buyBtn: "Buy for {price} 🪙",
    notEnoughCoins: "Need {need} more 🪙! Earn coins in Space Quiz or Daily Rewards!",
    takeQuizBtn: "Take Space Quiz (+🪙)",
    dailyRewardBanner: "🎁 Daily Top-10 Cadet Reward! Rank #{rank}: +{reward} 🪙",
    claimRewardBtn: "Claim +{reward} 🪙!",
    rewardClaimed: "Claimed! 🎉",
    quizTitle: "NASA Space Academy Quiz",
    quizSubtitle: "Answer correctly to earn Star Coins!",
    bonusQuizBtn: "🧠 Bonus Quiz (+🪙)",
    correctToast: "🎉 Correct! +{coins} 🪙 Earned!",
    incorrectToast: "Good try! Here is the real NASA fact:",
    continueBtn: "Continue ➔",

    // Gauges
    battery: "Battery",
    airHeat: "Air & Heat",
    shield: "Shield",
    statusLow: "⚠️ Low!",
    statusFull: "{n}/5 Full",

    // Outcome Modal
    nextDayBtn: "Next Day (Day {n}) ➔",
    finalScoreBtn: "See Final Score! 🏆",
    curiousFactToggle: "Curious? Read Real NASA Fact ▾",
    hideFactToggle: "Hide Real NASA Fact",
    realNasaFactTitle: "Real NASA Mission Science:",

    // Debrief
    winTitle3: "Super Space Hero! 🌟",
    winDesc3: "You balanced all your base systems like a champion NASA flight director!",
    winTitle2: "Star Base Defender! 🥈",
    winDesc2: "Great job keeping your crew safe through real space storms!",
    winTitle1: "Good Try, Cadet! 🚀",
    winDesc1: "Your base ran low on power, but the rescue pod saved the crew! Try again to earn 3 stars!",
    playAgainBtn: "Play Again! 🚀",
    switchPlanetBtn: "Play {planet} ➔",
    scoreLabel: "Final Mission Score:",
    scoreBreakdown: "{score} pts ({mult}x Multiplier)",

    // Badges Modal
    badgesTitle: "Space Badges & Trophies",
    unlockedCount: "{count} of {total} Badges Unlocked",
    lockedBadge: "Locked",
    badgeToast: "🎉 Badge Unlocked!",

    // Leaderboard Modal
    leaderboardTitle: "Mission Hall of Fame",
    filterAll: "All Outposts",
    filterMoon: "Moon Base",
    filterMars: "Mars Base",
    colRank: "Rank",
    colPlayer: "Cadet",
    colOutpost: "Planet",
    colDiff: "Difficulty",
    colDays: "Days",
    colScore: "Score",
    colDate: "Date",
    noScores: "No scores yet! Play a mission to enter the Hall of Fame!",

    // NASA Sources Modal
    sourcesTitle: "NASA Data & Science Attribution",
    sourcesSubtitle: "Verified Information for Space Apps Judges & Parents",
    liveBadge: "Data: Live NASA DONKI API",
    fallbackBadge: "Data: Archived NASA Dataset (Offline Fallback)",
    checkedTime: "Checked:",
    liveDesc: "Connected directly to NASA DONKI API endpoints. Space weather events match current satellite telemetry.",
    fallbackDesc: "Utilizing our verified offline historical NASA archive. To maintain strict scientific honesty, archived data is never presented as live.",
    verifiedPrograms: "Verified NASA Scientific Programs Used",
    judgesNote: "2026 NASA Space Apps Challenge ('Build a Junior Astronaut Mission Trainer'). Engineered to make real aerospace engineering trade-offs fun and intuitive for kids ages 7-12 without sacrificing scientific accuracy.",
    closeBtn: "Close",

    // Scenarios & Decisions (Days 1 to 7)
    scenarios: {
      moon: [
        {
          title: "Day 1: Cold Moon Morning!",
          buddySpeech: "{name}! It's freezing cold on the Moon! Let's power up our base!",
          decisions: [
            {
              id: "moon_1a",
              title: "Warm Blankets",
              actionText: "Wrap Base",
              comicOutcome: "Cozy! Warm thermal blankets kept the crew nice and toasty!",
              nasaFact: "Real NASA Artemis Fact: Lunar craters dip to -203°C (-334°F)! Electric blankets stop water pipes and astronaut suits from freezing solid."
            },
            {
              id: "moon_1b",
              title: "Turn Solar Panels",
              actionText: "Catch Sunshine",
              comicOutcome: "Zap! Solar panels soaked up bright sunlight to fill our batteries!",
              nasaFact: "Real NASA Fact: Mountains at the Lunar South Pole receive continuous sunshine (Peaks of Eternal Light), great for solar power towers."
            },
            {
              id: "moon_1c",
              title: "Power Shield Bubble",
              actionText: "Raise Bubble",
              comicOutcome: "Whoosh! A glowing blue shield bubble popped up around our base!",
              nasaFact: "Real NASA OSDR Fact: Without Earth’s magnetic field, the Moon receives 150 times more space radiation, making shields super important."
            }
          ]
        },
        {
          title: "Day 2: Space Storm Alert!",
          buddySpeech: "Look out, {name}! A giant Solar Flare is blasting from the Sun!",
          eventAlert: "NASA DONKI Alert: Solar Storm incoming!",
          decisions: [
            {
              id: "moon_2a",
              title: "Super Shield Dome",
              actionText: "Full Shield!",
              comicOutcome: "Direct hit bounced off! The glowing shield bubble saved the day!",
              nasaFact: "Real NASA DONKI Fact: Solar flares send electromagnetic energy traveling at the speed of light. Magnetic deflectors push charged particles away!"
            },
            {
              id: "moon_2b",
              title: "Hide in Crater Cave",
              actionText: "Duck Underground",
              comicOutcome: "Safe inside! Thick moon rocks blocked all the solar radiation!",
              nasaFact: "Real NASA Fact: Deep underground lava tubes and caves on the Moon provide natural shelter against solar storms."
            },
            {
              id: "moon_2c",
              title: "Fold Panels Away",
              actionText: "Protect Panels",
              comicOutcome: "Locked tight! We protected the solar glass from solar storm damage!",
              nasaFact: "Real NASA Fact: Solar energetic particles (SEPs) can crack solar panel glass, so folding them into armored boxes saves them."
            }
          ]
        },
        {
          title: "Day 3: Sticky Moon Dust!",
          buddySpeech: "Yuck! Sharp Moon dust is covering our solar panels!",
          decisions: [
            {
              id: "moon_3a",
              title: "Shake Off Dust",
              actionText: "Zap Dust Off",
              comicOutcome: "Bzzzt! An electric pulse flung all the sharp dust off the panels!",
              nasaFact: "Real NASA Fact: NASA created Electrodynamic Dust Shields (EDS) that use tiny electric waves to fling moon dust right off windows and suits."
            },
            {
              id: "moon_3b",
              title: "Spacewalk Brush",
              actionText: "Send Astronauts",
              comicOutcome: "Clean sweep! Our astronauts brushed the panels sparkling clean!",
              nasaFact: "Real NASA Fact: Apollo astronauts said lunar dust was sharp like volcanic glass and stuck to suits like static cling."
            },
            {
              id: "moon_3c",
              title: "Start Nuclear Pack",
              actionText: "Turn On Pack",
              comicOutcome: "Power surged! The mini power-pack gave our base tons of juice!",
              nasaFact: "Real NASA Fact: NASA’s Fission Surface Power project is building compact mini-nuclear power plants that run on the Moon for 10 years without sunshine!"
            }
          ]
        },
        {
          title: "Day 4: Giant Shadow Freeze!",
          buddySpeech: "Brrr! A huge shadow is freezing our base to -203°C!",
          decisions: [
            {
              id: "moon_4a",
              title: "Turn Heaters Max",
              actionText: "Super Heat",
              comicOutcome: "Warm and snug! The heaters fought off the freezing lunar shadow!",
              nasaFact: "Real NASA Fact: Permanently Shadowed Regions (PSRs) at the Moon’s poles are colder than Pluto! Good heaters keep humans alive."
            },
            {
              id: "moon_4b",
              title: "Huddle in Pods",
              actionText: "Cozy Sleep",
              comicOutcome: "Snug as bugs! The crew huddled in insulated sleep pods to save power!",
              nasaFact: "Real NASA Fact: Spacecraft use 'load shedding'—shutting down non-essential lights and computers—during power emergencies."
            },
            {
              id: "moon_4c",
              title: "Beam Laser Light",
              actionText: "Satellite Beam",
              comicOutcome: "Laser beam received! A satellite in orbit beamed power down to us!",
              nasaFact: "Real NASA Fact: NASA tests laser power beaming to shoot energy into dark craters where rovers explore for frozen water."
            }
          ]
        },
        {
          title: "Day 5: Cargo Rocket Landing!",
          buddySpeech: "Hooray, {name}! The supply rocket is landing! Guide it down!",
          decisions: [
            {
              id: "moon_5a",
              title: "Landing Radar",
              actionText: "Guide Rocket",
              comicOutcome: "Touchdown! The rocket brought fresh oxygen tanks and snacks!",
              nasaFact: "Real NASA Fact: Artemis cargo landers use Terrain Relative Navigation cameras to land safely within meters of the target."
            },
            {
              id: "moon_5b",
              title: "Dust Blast Shield",
              actionText: "Block Dust",
              comicOutcome: "Protected! The blast wall stopped rocket dust from scratching windows!",
              nasaFact: "Real NASA Fact: Rocket thrusters in space kick up supersonic dust. NASA designs landing pads and berm walls to protect bases."
            },
            {
              id: "moon_5c",
              title: "Rover Ice Fuel",
              actionText: "Pump Ice Fuel",
              comicOutcome: "Full power! The ice-mining rover pumped fresh hydrogen fuel into the base!",
              nasaFact: "Real NASA Fact: VIPER and future rovers mine frozen water on the Moon to make rocket fuel and drinking water (ISRU)."
            }
          ]
        },
        // Hard Mode Day 6
        {
          title: "Day 6: Micrometeorite Swarm!",
          buddySpeech: "Whoa, {name}! Tiny space pebbles are zipping past our Moon base!",
          decisions: [
            {
              id: "moon_6a",
              title: "Magnetic Pulse",
              actionText: "Zap Field",
              comicOutcome: "Deflected! The magnetic pulse vaporized the space pebbles!",
              nasaFact: "Real NASA Fact: Micrometeorites travel at over 20 kilometers per second in the lunar vacuum."
            },
            {
              id: "moon_6b",
              title: "Armored Shield Wall",
              actionText: "Raise Armor",
              comicOutcome: "Clang! The Kevlar Whipple shield absorbed every micro-impact!",
              nasaFact: "Real NASA Fact: Space stations and lunar modules use layered Whipple shields that break pebbles on impact."
            },
            {
              id: "moon_6c",
              title: "Fold Panel Wings",
              actionText: "Hide Panels",
              comicOutcome: "Smart move! Retracting the panels kept the delicate glass safe!",
              nasaFact: "Real NASA Fact: Spacecraft orient fragile surfaces parallel to meteor streams during peak showers."
            }
          ]
        },
        // Hard Mode Day 7
        {
          title: "Day 7: Final Lunar Ascent & Shuttle!",
          buddySpeech: "Final day, Commander {name}! The return shuttle is docking!",
          decisions: [
            {
              id: "moon_7a",
              title: "Full Laser Beacon",
              actionText: "Beam Shuttle",
              comicOutcome: "Docking confirmed! Fresh crew arrived and relieved your base!",
              nasaFact: "Real NASA Fact: Autonomous docking systems on the Lunar Gateway satellite use laser LiDAR sensors."
            },
            {
              id: "moon_7b",
              title: "Deploy Blast Berm",
              actionText: "Protect Pad",
              comicOutcome: "Safe touchdown! The sintered regolith berm deflected all exhaust plumes!",
              nasaFact: "Real NASA Fact: Sintered regolith microwave bricks can create permanent, dust-free landing pads on the Moon."
            },
            {
              id: "moon_7c",
              title: "Ice Fuel Cells Max",
              actionText: "Surge Power",
              comicOutcome: "Record breaker! Extracted crater ice powered the entire colony to 100%!",
              nasaFact: "Real NASA Fact: Lunar South Pole ice extraction will sustain human bases without Earth resupply."
            }
          ]
        }
      ],
      mars: [
        {
          title: "Day 1: Welcome to Mars!",
          buddySpeech: "{name}! Welcome to Mars! We need to make fresh oxygen to breathe!",
          decisions: [
            {
              id: "mars_1a",
              title: "Start MOXIE Maker",
              actionText: "Make Oxygen",
              comicOutcome: "Puff! MOXIE turned Martian carbon dioxide into pure fresh oxygen!",
              nasaFact: "Real NASA Fact: NASA’s MOXIE machine on the Perseverance rover proved humans can make oxygen right on Mars out of thin Martian air!"
            },
            {
              id: "mars_1b",
              title: "Aim Solar Wings",
              actionText: "Catch Sun",
              comicOutcome: "Charged up! Big solar panels caught the Martian sunshine!",
              nasaFact: "Real NASA Fact: Mars is farther from the Sun than Earth, so it receives less than half as much solar energy."
            },
            {
              id: "mars_1c",
              title: "Power Dome Shield",
              actionText: "Shield Dome",
              comicOutcome: "Sparkle! The magnetic shield bubble covered our geodesic dome!",
              nasaFact: "Real NASA Fact: Mars lost its global magnetic field billions of years ago, so human habitats need artificial deflectors."
            }
          ]
        },
        {
          title: "Day 2: Space Storm Alert!",
          buddySpeech: "Space storm alert, {name}! Solar particles are zooming right at Mars!",
          eventAlert: "NASA DONKI Alert: Solar Storm incoming!",
          decisions: [
            {
              id: "mars_2a",
              title: "Lava Tube Bunker",
              actionText: "Hide in Cave",
              comicOutcome: "Safe and sound! Deep red Martian volcanic rocks stopped the storm!",
              nasaFact: "Real NASA OSDR Fact: Underground lava tubes on Mars provide total radiation shielding for astronaut colonies."
            },
            {
              id: "mars_2b",
              title: "Water Wall Shield",
              actionText: "Pump Water Wall",
              comicOutcome: "Splosh! Water tanks in the habitat walls blocked the proton storm!",
              nasaFact: "Real NASA Fact: Water contains hydrogen atoms, which are the best natural shields against fast solar protons."
            },
            {
              id: "mars_2c",
              title: "Turn Panels Edge-On",
              actionText: "Tilt Panels",
              comicOutcome: "Clever move! Tilting panels prevented the solar cells from burning out!",
              nasaFact: "Real NASA Fact: High-speed protons can permanently damage delicate silicon in solar panels."
            }
          ]
        },
        {
          title: "Day 3: Martian Dust Storm!",
          buddySpeech: "Whoosh! A big red dust storm is blocking our sunshine!",
          decisions: [
            {
              id: "mars_3a",
              title: "Air Blasters",
              actionText: "Blow Dust Off",
              comicOutcome: "Whoosh! Puffs of compressed CO2 blew all the red dust away!",
              nasaFact: "Real NASA Fact: Opportunity rover survived on Mars for 14 years thanks to Martian wind gusts that blew dust off its panels."
            },
            {
              id: "mars_3b",
              title: "Burn Methane Fuel",
              actionText: "Fire Fuel Cell",
              comicOutcome: "Warm power! The fuel cell hummed to life and charged the base!",
              nasaFact: "Real NASA Fact: NASA plans to make rocket fuel directly on Mars using the Sabatier reaction by combining CO2 and water."
            },
            {
              id: "mars_3c",
              title: "Low Power Nap",
              actionText: "Save Power",
              comicOutcome: "Quiet time! Dimming the lights let us wait out the dust storm safely!",
              nasaFact: "Real NASA Fact: During global dust storms, sunlight on Mars drops to twilight gloom for weeks at a time."
            }
          ]
        },
        {
          title: "Day 4: Air Valve Mystery!",
          buddySpeech: "Air leak alarm! Earth is far away—radio takes 18 minutes!",
          eventAlert: "NASA NTRS Fact: Radio takes 18 minutes one-way to Earth!",
          decisions: [
            {
              id: "mars_4a",
              title: "Call Houston (Earth)",
              actionText: "Radio Earth",
              comicOutcome: "Beep beep! Signal beamed to Earth! Houston’s super-fix arrives tomorrow!",
              nasaFact: "Real NASA NTRS Fact: Radio signals travel at the speed of light, but Mars is so far away that signals take 15 to 22 minutes one-way!"
            },
            {
              id: "mars_4b",
              title: "Robot AI Auto-Fix",
              actionText: "Robot Fix",
              comicOutcome: "Fixed instantly! Our smart robot helper sealed the leaky valve!",
              nasaFact: "Real NASA Fact: Because of the 18-minute lag, astronauts on Mars will use autonomous AI robots to fix emergencies in seconds."
            },
            {
              id: "mars_4c",
              title: "Space Glue Patch",
              actionText: "Spray Glue",
              comicOutcome: "Patched! Quick-drying space foam sealed the outer air pipe!",
              nasaFact: "Real NASA Fact: Astronauts practice patching space suits and modules with quick-setting space resin."
            }
          ]
        },
        {
          title: "Day 5: Cargo Lander Arrival!",
          buddySpeech: "Final day, {name}! The cargo lander is here! Bring it home!",
          decisions: [
            {
              id: "mars_5a",
              title: "Laser Landing Beacon",
              actionText: "Guide Lander",
              comicOutcome: "Touchdown! The big cargo lander landed right on the landing target!",
              nasaFact: "Real NASA Fact: Mars landers use supersonic parachutes and rocket thrusters because the air is too thin for parachutes alone."
            },
            {
              id: "mars_5b",
              title: "Magnetic Debris Net",
              actionText: "Shield Blast",
              comicOutcome: "Safe! The magnetic canopy bounced flying gravel and dust away!",
              nasaFact: "Real NASA Fact: Rocket exhaust on Mars blasts gravel at over 1,000 meters per second, so blast nets are vital."
            },
            {
              id: "mars_5c",
              title: "Rover Swarm Unload",
              actionText: "Send Rovers",
              comicOutcome: "Unpacked! Little robot rovers carried all the fresh batteries inside!",
              nasaFact: "Real NASA Fact: NASA envisions teams of autonomous rovers setting up bases and unloading cargo before human crews arrive."
            }
          ]
        },
        // Hard Mode Day 6
        {
          title: "Day 6: Martian Atmospheric Lightning!",
          buddySpeech: "Static electricity in the red dust is sparking lightning bolts!",
          decisions: [
            {
              id: "mars_6a",
              title: "Grounding Rod Pulse",
              actionText: "Ground Energy",
              comicOutcome: "Absorbed! Grounding rods channeled static lightning right into the batteries!",
              nasaFact: "Real NASA Fact: Low pressure and dry dust on Mars generate intense static triboelectric fields."
            },
            {
              id: "mars_6b",
              title: "Super Dome Canopy",
              actionText: "Raise Canopy",
              comicOutcome: "Shielded! The electromagnetic field safely deflected electrical discharges!",
              nasaFact: "Real NASA Fact: Martian habitats will feature Faraday cage mesh to safeguard electronics."
            },
            {
              id: "mars_6c",
              title: "Pure O2 Buffer",
              actionText: "Buffer Oxygen",
              comicOutcome: "Air secured! Extra oxygen reserves kept cabin pressure rock solid!",
              nasaFact: "Real NASA Fact: Martian life support systems store redundant high-pressure oxygen buffers."
            }
          ]
        },
        // Hard Mode Day 7
        {
          title: "Day 7: Supersonic Ascent Touchdown!",
          buddySpeech: "Final Sol, Commander {name}! The Mars Ascent Vehicle is landing!",
          decisions: [
            {
              id: "mars_7a",
              title: "High-Gain Beacon",
              actionText: "Lock Telemetry",
              comicOutcome: "Bullseye! The ascent rocket touched down right on the target pad!",
              nasaFact: "Real NASA Fact: NASA Mars sample return and crew architectures rely on pinpoint autonomous guidance."
            },
            {
              id: "mars_7b",
              title: "Debris Blast Canopy",
              actionText: "Shield Base",
              comicOutcome: "Protected! Supersonic grit was harmlessly deflected away from habitat glass!",
              nasaFact: "Real NASA Fact: Rocket plume interactions at Mach 3 kick up grit that requires physical and electromagnetic berms."
            },
            {
              id: "mars_7c",
              title: "Rover Fuel Pipeline",
              actionText: "Pump Propellant",
              comicOutcome: "Mission triumph! In-situ fuel cells topped off base power to the maximum!",
              nasaFact: "Real NASA Fact: Making return propellant directly on Mars is essential for getting astronauts back home."
            }
          ]
        }
      ]
    }
  },

  tr: {
    // Header & Navigation
    gameTitle: "Uzay Üssü Kurtarma!",
    musicBtn: "Müzik",
    musicOn: "Müzik: AÇIK",
    musicOff: "Müzik: KAPALI",
    sfxBtn: "Ses",
    sfxOn: "Ses: AÇIK",
    sfxOff: "Ses: KAPALI",
    nasaDataBtn: "NASA Verileri (Jüri & Ebeveynler)",
    dayIndicator: "{total} Günün {current}. Günü",
    unmute: "Sesi Aç",
    mute: "Sesi Kapat",
    changeBase: "Gezegen Üssünü Değiştir",
    dropPrompt: "Kartı üssün üzerine bırak!",
    dragOrTap: "Kartı üsse sürükle ya da tıkla!",
    shieldBubbleUp: "Kalkan Balonu Devrede!",
    helperBadge: "YARDIMCI",

    // Start Screen & Name Input
    tagline: "2026 NASA Space Apps Challenge",
    subtitle: "Bir üs seç ve ekibini güvende tut!",
    playBtn: "OYNA! ➔",
    nameLabel: "Astronot Adın / Kod Adın:",
    namePlaceholder: "Kadet adını yaz...",
    randomBtn: "Rastgele 🎲",
    randomNames: ['Kaptan Nova', 'Astro Efe', 'Komutan Ada', 'Uzaycı Maya', 'Kadet Doğa', 'Pilot Ayaz', 'Yıldız Kaşifi'],

    // Difficulty Modes
    diffLabel: "Görev Zorluğu:",
    diffEasy: "🌟 Kaşif",
    diffMed: "🚀 Komutan",
    diffHard: "🔥 NASA Uzmanı",
    diffDescEasy: "4 Gün • Güvenli Erzak",
    diffDescMed: "5 Gün • Standart Fırtınalar",
    diffDescHard: "7 Gün • Zorlu Fırtınalar • 2x Puan",

    // Planet Cards
    moonBase: "Ay Üssü",
    moonLocation: "Shackleton Krateri (Güney Kutbu)",
    moonBadge1: "❄️ Dondurucu Soğuk",
    moonBadge2: "🌫️ Yapışkan Toz",
    marsBase: "Mars Üssü",
    marsLocation: "Jezero Krateri Deltası",
    marsBadge1: "🌪️ Toz Fırtınaları",
    marsBadge2: "📡 Gecikmeli Telsiz",

    // Buttons
    badgesBtn: "🏅 Başarımlar",
    leaderboardBtn: "🏆 Liderlik Tablosu",
    customizeBtn: "🎨 Özelleştir",
    clansNavBtn: "👥 Klanlar",

    // Clan System
    clansTitle: "Uzay Klanları & Ekipler",
    myClansTab: "Klanlarım",
    createClanTab: "Klan Kur",
    joinClanTab: "Kodla Katıl",
    clanLeaderboardTab: "Klan Sıralaması",
    clanCodeLabel: "Davet Kodu:",
    copyCode: "Kopyala",
    codeCopied: "Kopyalandı! ✓",
    enterClanName: "Klan adı gir (örn. Apollo Ekibi)...",
    enterClanCode: "6 haneli kodu gir (örn. MARS42)...",
    createClanBtn: "Klanı Kur 🚀",
    joinClanBtn: "Klana Katıl ➔",
    noClansYet: "Henüz bir klana katılmadın! Yeni bir klan kur veya davet kodu gir.",
    maxClansError: "En fazla 3 klana katılabilirsin!",
    alreadyMemberError: "Zaten bu klandasın!",
    clanNotFoundError: "Klan bulunamadı! 6 haneli kodu kontrol et.",
    invalidNameError: "Lütfen geçerli bir klan adı gir (en az 2 harf).",
    invalidCodeError: "Lütfen geçerli 6 haneli bir kod gir.",
    refreshBtn: "Yenile",
    noScoresUniversal: "Henüz görev kaydı yok — görevi tamamlayan ilk kadet sen ol!",
    filterAllDiff: "Tüm Zorluklar",

    // Avatar Customizer
    customizerTitle: "Astronotunu Tasarla!",
    customizerSubtitle: "Uzay kıyafetini, kaskını, yüzünü ve armanı seç!",
    saveAstronautBtn: "Astronotu Kaydet! 🚀",
    randomAvatarBtn: "Rastgele 🎲",
    suitColorTab: "Uzay Kıyafeti",
    skinToneTab: "Ten Rengi",
    faceStyleTab: "Yüz İfadesi",
    helmetStyleTab: "Kask & Şapka",
    patchTab: "Göğüs Arması",

    // Star Coins & Customizer Page
    starCoins: "Yıldız Paraları",
    coinsLabel: "{n} 🪙",
    customizePageTitle: "Astronot Özelleştirme Stüdyosu",
    customizePageSubtitle: "Kadetini tasarla, Yıldız Paralarıyla kozmik eşyaları aç!",
    saveAndBack: "Kaydet & Geri Dön ➔",
    buyConfirmTitle: "Eşyayı Aç?",
    buyConfirmDesc: "Bu eşyayı {price} 🪙 karşılığında açmak istiyor musun?",
    buyBtn: "{price} 🪙 ile Satın Al",
    notEnoughCoins: "{need} 🪙 daha gerekli! Bilgi yarışmasından veya günlük ödüllerden kazan!",
    takeQuizBtn: "Uzay Bilgi Yarışmasına Katıl (+🪙)",
    dailyRewardBanner: "🎁 Günlük İlk 10 Kadet Ödülü! Sıralama #{rank}: +{reward} 🪙",
    claimRewardBtn: "+{reward} 🪙 Al!",
    rewardClaimed: "Ödül Alındı! 🎉",
    quizTitle: "NASA Uzay Akademisi Bilgi Yarışması",
    quizSubtitle: "Doğru cevap ver ve Yıldız Parası kazan!",
    bonusQuizBtn: "🧠 Bonus Bilgi Yarışması (+🪙)",
    correctToast: "🎉 Tebrikler! +{coins} 🪙 Kazanıldı!",
    incorrectToast: "İyi deneme! İşte gerçek NASA bilgisi:",
    continueBtn: "Devam Et ➔",

    // Gauges
    battery: "Batarya",
    airHeat: "Hava & Isı",
    shield: "Kalkan",
    statusLow: "⚠️ Düşük!",
    statusFull: "{n}/5 Dolu",

    // Outcome Modal
    nextDayBtn: "Sonraki Gün ({n}. Gün) ➔",
    finalScoreBtn: "Sonucu Gör! 🏆",
    curiousFactToggle: "Merak ettin mi? Gerçek NASA Bilgisi ▾",
    hideFactToggle: "NASA Bilgisini Gizle",
    realNasaFactTitle: "Gerçek NASA Görev Bilimi:",

    // Debrief
    winTitle3: "Süper Uzay Kahramanı! 🌟",
    winDesc3: "Tüm üs sistemlerini şampiyon bir NASA uçuş direktörü gibi yönettin!",
    winTitle2: "Yıldız Üssü Koruyucusu! 🥈",
    winDesc2: "Ekibini gerçek uzay fırtınalarında güvende tutarak harika bir iş başardın!",
    winTitle1: "Güzel Deneme, Kadet! 🚀",
    winDesc1: "Üssün enerjisi azaldı ama kurtarma kapsülü ekibi kurtardı! 3 yıldız almak için tekrar dene!",
    playAgainBtn: "Yeniden Oyna! 🚀",
    switchPlanetBtn: "{planet} Oyna ➔",
    scoreLabel: "Toplam Görev Puanı:",
    scoreBreakdown: "{score} Puan ({mult}x Çarpan)",

    // Badges Modal
    badgesTitle: "Uzay Başarımları & Kupalar",
    unlockedCount: "{total} Başarımdan {count} Tanesi Açıldı",
    lockedBadge: "Kilitli",
    badgeToast: "🎉 Başarım Açıldı!",

    // Leaderboard Modal
    leaderboardTitle: "Görev Şöhretler Tablosu",
    filterAll: "Tüm Üsler",
    filterMoon: "Ay Üssü",
    filterMars: "Mars Üssü",
    colRank: "Sıra",
    colPlayer: "Kadet",
    colOutpost: "Gezegen",
    colDiff: "Zorluk",
    colDays: "Gün",
    colScore: "Puan",
    colDate: "Tarih",
    noScores: "Henüz skor yok! Şöhretler Tablosuna girmek için bir görev oyna!",

    // NASA Sources Modal
    sourcesTitle: "NASA Verileri & Bilimsel Kaynaklar",
    sourcesSubtitle: "Space Apps Jürisi & Ebeveynler İçin Doğrulanmış Bilgiler",
    liveBadge: "Veri: Canlı NASA DONKI API",
    fallbackBadge: "Veri: Arşivlenmiş NASA Veri Seti (Çevrimdışı Yedek)",
    checkedTime: "Kontrol Edildi:",
    liveDesc: "Doğrudan NASA DONKI API uç noktalarına bağlı. Uzay havası olayları anlık uydu verileriyle eşleşiyor.",
    fallbackDesc: "Doğrulanmış çevrimdışı NASA arşivimiz kullanılıyor. Bilimsel dürüstlük gereği arşiv verileri asla canlıymış gibi sunulmaz.",
    verifiedPrograms: "Kullanılan Doğrulanmış NASA Bilimsel Programları",
    judgesNote: "2026 NASA Space Apps Challenge ('Genç Astronot Görev Eğiticisi Yap'). 7-12 yaş grubundaki çocuklara gerçek havacılık ve uzay mühendisliği dengelerini bilimsel doğruluktan ödün vermeden eğlenceli ve sezgisel bir şekilde öğretmek için tasarlandı.",
    closeBtn: "Kapat",

    // Scenarios & Decisions (Days 1 to 7)
    scenarios: {
      moon: [
        {
          title: "1. Gün: Soğuk Ay Sabahı!",
          buddySpeech: "{name}! Ay'da hava dondurucu soğuk! Üssümüze enerji verelim!",
          decisions: [
            {
              id: "moon_1a",
              title: "Sıcak Battaniyeler",
              actionText: "Üssü Sar",
              comicOutcome: "Sıcacık! Termal battaniyeler ekibi sıcacık ve rahat tuttu!",
              nasaFact: "Gerçek NASA Artemis Bilgisi: Ay kraterlerinde sıcaklık -203°C'ye kadar düşer! Elektrikli battaniyeler su borularının ve uzay giysilerinin donmasını önler."
            },
            {
              id: "moon_1b",
              title: "Panelleri Çevir",
              actionText: "Güneşi Yakala",
              comicOutcome: "Fıjj! Güneş panelleri pillerimizi doldurmak için bol bol güneş topladı!",
              nasaFact: "Gerçek NASA Bilgisi: Ay'ın Güney Kutbu'ndaki dağlar (Ebedi Işık Tepeleri) sürekli güneş ışığı alır, bu da güneş kuleleri için mükemmeldir."
            },
            {
              id: "moon_1c",
              title: "Kalkan Balonunu Aç",
              actionText: "Balonu Yükselt",
              comicOutcome: "Vuvv! Üssümüzün etrafında parlayan mavi bir kalkan balonu açıldı!",
              nasaFact: "Gerçek NASA OSDR Bilgisi: Dünya'nın manyetik alanı olmadan Ay 150 kat daha fazla uzay radyasyonu alır; kalkanlar hayati önem taşır."
            }
          ]
        },
        {
          title: "2. Gün: Uzay Fırtınası Alarmı!",
          buddySpeech: "Dikkat, {name}! Güneş'ten devasa bir Güneş Patlaması fırladı!",
          eventAlert: "NASA DONKI Uyarısı: Güneş Fırtınası yaklaşıyor!",
          decisions: [
            {
              id: "moon_2a",
              title: "Süper Kalkan Kubbesi",
              actionText: "Tam Kalkan!",
              comicOutcome: "Doğrudan çarpma sekti! Parlayan kalkan balonu günü kurtardı!",
              nasaFact: "Gerçek NASA DONKI Bilgisi: Güneş patlamaları ışık hızında elektromanyetik enerji yayar. Manyetik saptırıcılar yüklü parçacıkları iter!"
            },
            {
              id: "moon_2b",
              title: "Krater Mağarasına Saklan",
              actionText: "Yeraltına İn",
              comicOutcome: "İçeride güvendeyiz! Kalın ay kayaları tüm güneş radyasyonunu durdurdu!",
              nasaFact: "Gerçek NASA Bilgisi: Ay'daki derin yeraltı lav tüpleri ve mağaralar, güneş fırtınalarına karşı doğal sığınak sağlar."
            },
            {
              id: "moon_2c",
              title: "Panelleri Katla",
              actionText: "Panelleri Koru",
              comicOutcome: "Sıkıca kilitlendi! Güneş paneli camlarını fırtına hasarından koruduk!",
              nasaFact: "Gerçek NASA Bilgisi: Güneş Enerjili Parçacıklar (SEP) güneş paneli camlarını çatlatabilir, onları zırhlı kutulara katlamak korur."
            }
          ]
        },
        {
          title: "3. Gün: Yapışkan Ay Tozu!",
          buddySpeech: "Tüh! Keskin Ay tozu güneş panellerimizi kaplıyor!",
          decisions: [
            {
              id: "moon_3a",
              title: "Tozu Silkele",
              actionText: "Elektrikle Uçur",
              comicOutcome: "Bzzzt! Bir elektrik darbesi tüm keskin tozu panellerden fırlattı!",
              nasaFact: "Gerçek NASA Bilgisi: NASA, elektrik dalgalarıyla ay tozunu pencere ve giysilerden savuran Elektrodinamik Toz Kalkanları (EDS) geliştirdi."
            },
            {
              id: "moon_3b",
              title: "Uzay Yürüyüşüyle Fırçala",
              actionText: "Astronot Yolla",
              comicOutcome: "Tertemiz! Astronotlarımız panelleri pırıl pırıl fırçaladı!",
              nasaFact: "Gerçek NASA Bilgisi: Apollo astronotları ay tozunun volkanik cam gibi keskin olduğunu ve statik elektrikle yapıştığını belirtmişti."
            },
            {
              id: "moon_3c",
              title: "Nükleer Paketi Başlat",
              actionText: "Paketi Aç",
              comicOutcome: "Enerji fışkırdı! Mini güç paketi üssümüze bolca güç sağladı!",
              nasaFact: "Gerçek NASA Bilgisi: NASA'nın Fisyon Yüzey Gücü projesi, Ay'da güneş ışığı olmadan 10 yıl çalışabilen kompakt mini nükleer santraller üretiyor!"
            }
          ]
        },
        {
          title: "4. Gün: Dev Gölge Donması!",
          buddySpeech: "Brrr! Devasa bir gölge üssümüzü -203°C'ye donduruyor!",
          decisions: [
            {
              id: "moon_4a",
              title: "Isıtıcıları Sonuna Aç",
              actionText: "Süper Isıt",
              comicOutcome: "Sıcacık ve rahat! Isıtıcılar dondurucu ay gölgesini yendi!",
              nasaFact: "Gerçek NASA Bilgisi: Ay kutuplarındaki Sürekli Gölgeli Bölgeler (PSR) Plüton'dan bile soğuktur! Güçlü ısıtıcılar insanları hayatta tutar."
            },
            {
              id: "moon_4b",
              title: "Kapsüllere Sığın",
              actionText: "Rahat Uyu",
              comicOutcome: "Kapsülde güvendeyiz! Ekip güç tasarrufu için yalıtımlı uyku kapsüllerine geçti!",
              nasaFact: "Gerçek NASA Bilgisi: Uzay araçları güç acil durumlarında 'yük azaltma' yaparak temel olmayan ışık ve cihazları kapatır."
            },
            {
              id: "moon_4c",
              title: "Lazer Işığı İste",
              actionText: "Uydudan Işınla",
              comicOutcome: "Lazer ışını ulaştı! Yörüngedeki bir uydu bize doğrudan enerji ışınladı!",
              nasaFact: "Gerçek NASA Bilgisi: NASA, su arayan keşif araçlarına enerji sağlamak için karanlık kraterlere lazerle güç aktarımını test ediyor."
            }
          ]
        },
        {
          title: "5. Gün: Kargo Roketi İnişi!",
          buddySpeech: "Yaşasın, {name}! Erzak roketi iniş yapıyor! Onu güvenle indir!",
          decisions: [
            {
              id: "moon_5a",
              title: "İniş Radarı",
              actionText: "Roketi Yönlendir",
              comicOutcome: "Harika iniş! Roket taze oksijen tankları ve lezzetli atıştırmalıklar getirdi!",
              nasaFact: "Gerçek NASA Bilgisi: Artemis kargo araçları, hedefin birkaç metre yakınına güvenle inmek için Arazi Göreli Navigasyon kameraları kullanır."
            },
            {
              id: "moon_5b",
              title: "Toz Bariyeri Aç",
              actionText: "Tozu Engelle",
              comicOutcome: "Korumada! Koruma duvarı roket tozunun pencereleri çizmesini önledi!",
              nasaFact: "Gerçek NASA Bilgisi: Roket motorları uzayda süpersonik toz fırlatır. NASA, üsleri korumak için iniş pistleri ve set duvarları tasarlar."
            },
            {
              id: "moon_5c",
              title: "Buzdan Yakıt Üret",
              actionText: "Buz Yakıtı Bas",
              comicOutcome: "Tam güç! Buz madencisi keşif aracı üsse taze hidrojen yakıtı pompaladı!",
              nasaFact: "Gerçek NASA Bilgisi: VIPER ve geleceğin keşif araçları roket yakıtı ve içme suyu üretmek için Ay'daki donmuş buzu çıkarır (ISRU)."
            }
          ]
        },
        // Hard Mode Gün 6
        {
          title: "6. Gün: Mikrometeor Yağmuru!",
          buddySpeech: "Vay canına, {name}! Minik uzay taşları üssümüzün yanından hızla geçiyor!",
          decisions: [
            {
              id: "moon_6a",
              title: "Manyetik Darbe",
              actionText: "Darbe Gönder",
              comicOutcome: "Saptırıldı! Manyetik darbe yaklaşan uzay taşlarını buharlaştırdı!",
              nasaFact: "Gerçek NASA Bilgisi: Mikrometeorlar ay vakumunda saniyede 20 kilometreden hızlı seyahat eder."
            },
            {
              id: "moon_6b",
              title: "Zırhlı Kalkan Duvarı",
              actionText: "Zırhı Yükselt",
              comicOutcome: "Çat! Çok katmanlı Whipple zırhı tüm mikro çarpmaları emdi!",
              nasaFact: "Gerçek NASA Bilgisi: Uzay istasyonları ve ay modülleri çarpan taşları parçalayan çok katmanlı kalkanlar kullanır."
            },
            {
              id: "moon_6c",
              title: "Panel Kanatlarını Katla",
              actionText: "Paneli Sakla",
              comicOutcome: "Akıllıca hamle! Panelleri içeri çekmek hassas camları korudu!",
              nasaFact: "Gerçek NASA Bilgisi: Uzay araçları meteor akışları sırasında kırılgan yüzeyleri akıntıya paralel hizalar."
            }
          ]
        },
        // Hard Mode Gün 7
        {
          title: "7. Gün: Son Ay Yükselişi & Kurtarma!",
          buddySpeech: "Son gün, Komutan {name}! Kurtarma mekiği kenetleniyor!",
          decisions: [
            {
              id: "moon_7a",
              title: "Lazer İniş Feneri",
              actionText: "Mekiği Koru",
              comicOutcome: "Kenetlenme tamam! Yeni ekip ulaştı ve üssünüzü devraldı!",
              nasaFact: "Gerçek NASA Bilgisi: Lunar Gateway istasyonundaki otonom kenetlenme sistemleri lazer LiDAR kullanır."
            },
            {
              id: "moon_7b",
              title: "Toz Seddini Aç",
              actionText: "Pisti Koru",
              comicOutcome: "Güvenli iniş! Taşlaşmış ay kumu seddi tüm egzoz tozunu engelledi!",
              nasaFact: "Gerçek NASA Bilgisi: Mikrodalga ile kaynaştırılan ay kumu tuğlaları Ay'da tozsuz kalıcı iniş pistleri oluşturur."
            },
            {
              id: "moon_7c",
              title: "Buz Yakıt Hücreleri",
              actionText: "Enerjiyi Fırlat",
              comicOutcome: "Rekor kırıldı! Krater buzu tüm koloniyi %100 güce ulaştırdı!",
              nasaFact: "Gerçek NASA Bilgisi: Ay Güney Kutbu buz çıkarma işlemi insan üslerini Dünya'dan destek almadan yaşatacaktır."
            }
          ]
        }
      ],
      mars: [
        {
          title: "1. Gün: Mars'a Hoş Geldin!",
          buddySpeech: "{name}! Mars'a hoş geldin! Nefes almak için temiz oksijen üretmeliyiz!",
          decisions: [
            {
              id: "mars_1a",
              title: "MOXIE Cihazını Aç",
              actionText: "Oksijen Üret",
              comicOutcome: "Puff! MOXIE Mars'ın karbondioksitini saf ve taze oksijene dönüştürdü!",
              nasaFact: "Gerçek NASA Bilgisi: Perseverance aracındaki MOXIE deneyi, Mars'ın ince havasından doğrudan oksijen üretilebileceğini kanıtladı!"
            },
            {
              id: "mars_1b",
              title: "Güneş Kanatlarını Çevir",
              actionText: "Güneşi Yakala",
              comicOutcome: "Şarj oldu! Büyük güneş panelleri Mars güneş ışığını yakaladı!",
              nasaFact: "Gerçek NASA Bilgisi: Mars Güneş'e Dünya'dan daha uzaktır, bu yüzden Dünya'dakinin yarısından daha az güneş enerjisi alır."
            },
            {
              id: "mars_1c",
              title: "Kubbe Kalkanını Aç",
              actionText: "Kubbeyi Koru",
              comicOutcome: "Işıl ışıl! Manyetik kalkan balonu jeodezik kubbemizi kapladı!",
              nasaFact: "Gerçek NASA Bilgisi: Mars milyarlarca yıl önce küresel manyetik alanını kaybetti, bu yüzden insan üsleri yapay kalkanlara ihtiyaç duyar."
            }
          ]
        },
        {
          title: "2. Gün: Uzay Fırtınası Alarmı!",
          buddySpeech: "Uzay fırtınası uyarısı, {name}! Güneş parçacıkları Mars'a doğru hızla geliyor!",
          eventAlert: "NASA DONKI Uyarısı: Güneş Fırtınası yaklaşıyor!",
          decisions: [
            {
              id: "mars_2a",
              title: "Lav Tüpü Sığınağı",
              actionText: "Mağaraya İn",
              comicOutcome: "Güvende ve rahat! Derin kızıl Mars volkanik kayaları fırtınayı durdurdu!",
              nasaFact: "Gerçek NASA OSDR Bilgisi: Mars'taki yeraltı lav tüpleri astronot kolonileri için tam radyasyon kalkanı sağlar."
            },
            {
              id: "mars_2b",
              title: "Su Duvarı Kalkanı",
              actionText: "Su Duvarı Bas",
              comicOutcome: "Şapır şupur! Yaşam alanının duvarlarındaki su tankları proton fırtınasını engelledi!",
              nasaFact: "Gerçek NASA Bilgisi: Su, hızlı güneş protonlarına karşı en iyi doğal kalkan olan hidrojen atomları içerir."
            },
            {
              id: "mars_2c",
              title: "Panelleri Kenardan Çevir",
              actionText: "Panelleri Eğ",
              comicOutcome: "Akıllıca hamle! Panelleri eğmek güneş pillerinin yanmasını önledi!",
              nasaFact: "Gerçek NASA Bilgisi: Yüksek hızlı protonlar güneş panellerindeki hassas silikona kalıcı zarar verebilir."
            }
          ]
        },
        {
          title: "3. Gün: Mars Toz Fırtınası!",
          buddySpeech: "Vuuu! Büyük bir kırmızı toz fırtınası güneşimizi engelliyor!",
          decisions: [
            {
              id: "mars_3a",
              title: "Hava Püskürtücüler",
              actionText: "Tozu Uçur",
              comicOutcome: "Vuvv! Sıkıştırılmış CO2 üflemesi tüm kırmızı tozu uçurdu!",
              nasaFact: "Gerçek NASA Bilgisi: Opportunity keşif aracı, panellerindeki tozu uçuran Mars rüzgarları sayesinde Mars'ta 14 yıl hayatta kaldı."
            },
            {
              id: "mars_3b",
              title: "Metan Yakıtını Ateşle",
              actionText: "Hücreyi Çalıştır",
              comicOutcome: "Sıcak enerji! Yakıt hücresi çalıştı ve üssümüzü şarj etti!",
              nasaFact: "Gerçek NASA Bilgisi: NASA, Mars'ta CO2 ve suyu birleştirerek Sabatier reaksiyonuyla roket yakıtı üretmeyi planlıyor."
            },
            {
              id: "mars_3c",
              title: "Düşük Güçte Bekle",
              actionText: "Gücü Koru",
              comicOutcome: "Sessiz mod! Işıkları kısmak toz fırtınasını güvenle atlatmamızı sağladı!",
              nasaFact: "Gerçek NASA Bilgisi: Küresel toz fırtınaları sırasında Mars'ta gün ışığı haftalarca alacakaranlık karanlığına gömülebilir."
            }
          ]
        },
        {
          title: "4. Gün: Hava Valfi Gizemi!",
          buddySpeech: "Hava sızıntısı alarmı! Dünya çok uzakta—telsiz 18 dakika sürüyor!",
          eventAlert: "NASA NTRS Bilgisi: Dünya'ya telsiz sinyali tek yönlü 18 dakika sürer!",
          decisions: [
            {
              id: "mars_4a",
              title: "Houston'ı Ara (Dünya)",
              actionText: "Dünya'ya Telsiz",
              comicOutcome: "Bip bip! Sinyal Dünya'ya ışınlandı! Houston'ın süper çözümü yarın ulaşıyor!",
              nasaFact: "Gerçek NASA NTRS Bilgisi: Telsiz sinyalleri ışık hızında gider ama Mars o kadar uzaktır ki sinyaller tek yön 15-22 dakika sürer!"
            },
            {
              id: "mars_4b",
              title: "Robot Yapay Zeka Onarımı",
              actionText: "Robotla Onar",
              comicOutcome: "Anında onarıldı! Akıllı robot yardımcımız sızdıran valfi mühürledi!",
              nasaFact: "Gerçek NASA Bilgisi: 18 dakikalık gecikme nedeniyle Mars'taki astronotlar acil durumları saniyeler içinde çözen otonom robotlar kullanacak."
            },
            {
              id: "mars_4c",
              title: "Uzay Macunu Yaması",
              actionText: "Macun Püskürt",
              comicOutcome: "Yamalandı! Çabuk kuruyan uzay köpüğü dış hava borusunu kapattı!",
              nasaFact: "Gerçek NASA Bilgisi: Astronotlar uzay giysilerini ve modüllerini hızlı kuruyan uzay reçineleriyle yamama pratiği yapar."
            }
          ]
        },
        {
          title: "5. Gün: Kargo Aracı Geldi!",
          buddySpeech: "Son gün, {name}! Kargo aracı ulaştı! Onu üsse güvenle indir!",
          decisions: [
            {
              id: "mars_5a",
              title: "Lazer İniş Feneri",
              actionText: "Aracı Yönlendir",
              comicOutcome: "İniş tamam! Büyük kargo aracı tam iniş hedefinin üstüne kondu!",
              nasaFact: "Gerçek NASA Bilgisi: Mars iniş araçları süpersonik paraşütler ve roket motorları kullanır çünkü hava sadece paraşüt için çok incedir."
            },
            {
              id: "mars_5b",
              title: "Manyetik Enkaz Ağı",
              actionText: "Enkazı Engelle",
              comicOutcome: "Güvende! Manyetik tente uçuşan çakıl ve tozu savurdu!",
              nasaFact: "Gerçek NASA Bilgisi: Mars'taki roket egzozu saniyede 1000 metreden hızlı çakıl fırlatır, bu yüzden koruyucu ağlar şarttır."
            },
            {
              id: "mars_5c",
              title: "Keşif Robotu Filosu",
              actionText: "Robotları Yolla",
              comicOutcome: "Boşaltıldı! Minik keşif robotları tüm taze bataryaları içeri taşıdı!",
              nasaFact: "Gerçek NASA Bilgisi: NASA, insan ekipleri ulaşmadan önce üsleri kurup kargoları boşaltan otonom robot filoları planlıyor."
            }
          ]
        },
        // Hard Mode Gün 6
        {
          title: "6. Gün: Mars Atmosfer Yıldırımları!",
          buddySpeech: "Kızıl tozdaki statik elektrik şimşekler çaktırıyor!",
          decisions: [
            {
              id: "mars_6a",
              title: "Topraklama Darbesi",
              actionText: "Statik Enerji Al",
              comicOutcome: "Emildi! Topraklama çubukları statik şimşekleri pillerimize aktardı!",
              nasaFact: "Gerçek NASA Bilgisi: Mars'taki düşük basınç ve kuru toz şiddetli triboelektrik alanlar üretir."
            },
            {
              id: "mars_6b",
              title: "Süper Kubbe Tentesi",
              actionText: "Tenteyi Aç",
              comicOutcome: "Korumada! Manyetik tente elektrik boşalmalarını güvenle saptırdı!",
              nasaFact: "Gerçek NASA Bilgisi: Mars yaşam alanları elektronikleri korumak için Faraday kafesi ağlarına sahip olacaktır."
            },
            {
              id: "mars_6c",
              title: "Oksijen Rezervi Bas",
              actionText: "Hava Desteği",
              comicOutcome: "Hava güvende! Ekstra oksijen tamponları kabin basıncını sabit tuttu!",
              nasaFact: "Gerçek NASA Bilgisi: Mars yaşam destek sistemleri yüksek basınçlı yedek oksijen tankları depolar."
            }
          ]
        },
        // Hard Mode Gün 7
        {
          title: "7. Gün: Süpersonik Dönüş Aracı!",
          buddySpeech: "Son Gün, Komutan {name}! Mars Yükseliş Aracı iniş yapıyor!",
          decisions: [
            {
              id: "mars_7a",
              title: "Yüksek Kazanç Feneri",
              actionText: "Roketi Koru",
              comicOutcome: "Tam isabet! Dönüş roketi tam iniş pistine başarıyla kondu!",
              nasaFact: "Gerçek NASA Bilgisi: NASA'nın Mars örnek getirme ve mürettebat planları otonom hassas yönlendirmeye dayanır."
            },
            {
              id: "mars_7b",
              title: "Enkaz Bariyeri Aç",
              actionText: "Üssü Koru",
              comicOutcome: "Korundu! Süpersonik çakıllar üs camlarından güvenle savruldu!",
              nasaFact: "Gerçek NASA Bilgisi: 3 Mach hızındaki roket egzoz etkileşimleri fiziksel ve manyetik koruma setleri gerektirir."
            },
            {
              id: "mars_7c",
              title: "Robot Yakıt Hattı",
              actionText: "Yakıt Bas",
              comicOutcome: "Görev zaferi! Yerinde üretilen yakıt üs enerjisini zirveye ulaştırdı!",
              nasaFact: "Gerçek NASA Bilgisi: Dönüş yakıtını doğrudan Mars'ta üretmek astronotların Dünya'ya geri dönebilmesi için şarttır."
            }
          ]
        }
      ]
    }
  }
};
