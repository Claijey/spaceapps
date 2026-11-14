/**
 * NASA Space Science Quiz Questions (4-Option A/B/C/D)
 * 100% Bilingual (EN/TR) & Calibrated Star Coins Economy (2 Quizzes ≈ 1 Cosmetic)
 */

export const QUIZ_QUESTIONS = [
  {
    id: 'quiz_moon_temp',
    difficulty: 'easy',
    coins: 40,
    topic: 'Lunar South Pole Cold',
    question: {
      en: 'How cold can permanently shadowed craters at the Moon\'s South Pole get?',
      tr: 'Ay\'ın Güney Kutbu\'ndaki sürekli gölgede kalan kraterler ne kadar soğuyabilir?'
    },
    options: {
      en: [
        'A) -203°C (-334°F), one of the coldest places in the Solar System!',
        'B) 0°C (32°F), just like an ice cube',
        'C) -20°C (-4°F), like a normal winter freezer',
        'D) +50°C (+122°F), surprisingly warm and tropical'
      ],
      tr: [
        'A) -203°C, Güneş Sistemi\'nin en soğuk noktalarından biri!',
        'B) 0°C, tıpkı eriyen bir buz küpü gibi',
        'C) -20°C, standart bir ev tipi dondurucu gibi',
        'D) +50°C, şaşırtıcı şekilde ılık ve tropikal'
      ]
    },
    correctIndex: 0,
    explanation: {
      en: 'Real NASA Artemis Fact: Because the Sun never reaches deep polar crater floors, temperatures plummet to -203°C! Electric heating blankets are essential to protect base systems.',
      tr: 'Gerçek NASA Artemis Bilgisi: Güneş ışığı derin kutup kraterlerinin tabanına asla ulaşmadığı için sıcaklık -203°C\'ye kadar düşer! Elektrikli ısıtıcı battaniyeler üssü korumak için şarttır.'
    }
  },
  {
    id: 'quiz_mars_delay',
    difficulty: 'medium',
    coins: 50,
    topic: 'Mars Signal Delay',
    question: {
      en: 'How long does a radio signal take to travel ONE WAY between Mars and Earth?',
      tr: 'Bir radyo sinyalinin Mars ile Dünya arasında TEK YÖNLÜ gitmesi ne kadar sürer?'
    },
    options: {
      en: [
        'A) Instant, like a phone call (0.1 seconds)',
        'B) 15 to 22 minutes, due to the millions of miles of deep space!',
        'C) Exactly 3 days and nights',
        'D) 5 seconds, like a walkie-talkie'
      ],
      tr: [
        'A) Anında, normal bir telefon araması gibi (0.1 saniye)',
        'B) Milyonlarca kilometre mesafe yüzünden 15 ila 22 dakika!',
        'C) Tam olarak 3 gün 3 gece',
        'D) 5 saniye, normal bir telsiz gibi'
      ]
    },
    correctIndex: 1,
    explanation: {
      en: 'Real NASA Fact: Radio signals travel at the speed of light, but Mars is 54 to 400 million km away. A round-trip message can take up to 44 minutes!',
      tr: 'Gerçek NASA Bilgisi: Radyo dalgaları ışık hızında gider ancak Mars 54 ila 400 milyon km uzaktadır. Mesajın gidip gelmesi 44 dakikayı bulabilir!'
    }
  },
  {
    id: 'quiz_regolith_dust',
    difficulty: 'easy',
    coins: 40,
    topic: 'Abrasive Moon Dust',
    question: {
      en: 'Why is Moon dust (regolith) so abrasive and dangerous for solar panels and astronaut suits?',
      tr: 'Ay tozu (regolit) neden güneş panelleri ve astronot giysileri için bu kadar aşındırıcı ve tehlikelidir?'
    },
    options: {
      en: [
        'A) There is no wind or water to smooth the grains, so they are sharp like broken glass!',
        'B) The dust is made of hot melted lava stones',
        'C) It is magnetic and explodes when touched',
        'D) It is sticky wet mud from underground rivers'
      ],
      tr: [
        'A) Rüzgar ve su olmadığı için toz taneleri aşınmamıştır ve cam kırığı gibi çok keskindir!',
        'B) Tozlar sıcak erimiş lav taşlarından oluşur',
        'C) Manyetiktir ve dokunulduğunda patlar',
        'D) Yeraltı nehirlerinden gelen yapışkan ıslak çamurdur'
      ]
    },
    correctIndex: 0,
    explanation: {
      en: 'Real NASA Apollo & Artemis Fact: Without wind or rain, lunar regolith grains never erode into smooth sand. Electrostatic dust wipers are needed to protect solar cells!',
      tr: 'Gerçek NASA Apollo & Artemis Bilgisi: Rüzgar ve yağmur olmadığı için ay tozu asla yuvarlak kumlara dönüşmez. Güneş panellerini korumak için elektrostatik silecekler gerekir!'
    }
  },
  {
    id: 'quiz_solar_flares',
    difficulty: 'medium',
    coins: 50,
    topic: 'NASA DONKI Solar Flares',
    question: {
      en: 'What does NASA\'s DONKI satellite system detect when a giant Solar Flare erupts?',
      tr: 'Dev bir Güneş Patlaması gerçekleştiğinde NASA\'nın DONKI uydu ağı neyi tespit eder?'
    },
    options: {
      en: [
        'A) Rainclouds of water floating in space',
        'B) High-energy solar radiation & proton storms that require shield bunkers!',
        'C) Aliens sending Morse code signals',
        'D) Space fireworks launched for celebration'
      ],
      tr: [
        'A) Uzayda yüzen su yağmur bulutlarını',
        'B) Kalkan ve sığınak gerektiren yüksek enerjili radyasyon ve proton fırtınalarını!',
        'C) Mors alfabesiyle sinyal gönderen uzaylıları',
        'D) Kutlama için fırlatılan uzay havai fişeklerini'
      ]
    },
    correctIndex: 1,
    explanation: {
      en: 'Real NASA DONKI Fact: Solar radiation storms can harm electronics and crews without thick shielding. Astronauts retreat to underground regolith bunkers during storms.',
      tr: 'Gerçek NASA DONKI Bilgisi: Güneş radyasyon fırtınaları kalın kalkan olmadan elektronik sistemlere ve mürettebata zarar verebilir. Astronotlar fırtına sırasında sığınağa geçer.'
    }
  },
  {
    id: 'quiz_moxie_o2',
    difficulty: 'hard',
    coins: 65,
    topic: 'Mars MOXIE Oxygen Generator',
    question: {
      en: 'How does NASA\'s MOXIE experiment on the Perseverance rover make breathable oxygen on Mars?',
      tr: 'Perseverance keşif aracındaki NASA MOXIE deneyi Mars\'ta nasıl solunabilir oksijen üretir?'
    },
    options: {
      en: [
        'A) It extracts oxygen atoms from the 95% Carbon Dioxide (CO2) atmosphere!',
        'B) It melts polar ice caps with a big laser beam',
        'C) It grows large apple trees in outdoor greenhouses',
        'D) It filters air brought all the way from Earth in giant balloons'
      ],
      tr: [
        'A) %95 Karbondioksit (CO2) içeren Mars atmosferinden oksijen atomlarını ayrıştırarak!',
        'B) Dev bir lazer ışınıyla kutup buzullarını eriterek',
        'C) Açık arazideki seralarda büyük elma ağaçları yetiştirerek',
        'D) Dünya\'dan dev balonlarla getirilen havayı filtreleyerek'
      ]
    },
    correctIndex: 0,
    explanation: {
      en: 'Real NASA Perseverance Fact: MOXIE heats Martian CO2 to 800°C to split molecules into oxygen and carbon monoxide, proving humans can make air on Mars!',
      tr: 'Gerçek NASA Perseverance Bilgisi: MOXIE, Mars CO2 gazını 800°C\'ye kadar ısıtıp molekülleri oksijene ayrıştırır; insanların Mars\'ta hava üretebileceğini kanıtlamıştır!'
    }
  },
  {
    id: 'quiz_peaks_light',
    difficulty: 'medium',
    coins: 50,
    topic: 'Peaks of Eternal Light',
    question: {
      en: 'Why does NASA want to place solar arrays on the Moon\'s "Peaks of Eternal Light"?',
      tr: 'NASA neden Ay\'ın "Sonsuz Işık Tepeleri"ne güneş enerjisi panelleri kurmak istiyor?'
    },
    options: {
      en: [
        'A) Tall crater rims get almost continuous sunshine all year round!',
        'B) Glow-in-the-dark moon rocks light them up at night',
        'C) It is the highest place to build a ski resort',
        'D) The Moon is closer to the Sun at those points'
      ],
      tr: [
        'A) Yüksek krater sırtları neredeyse tüm yıl boyunca kesintisiz güneş ışığı alır!',
        'B) Karanlıkta parlayan ay taşları geceleri onları aydınlattığı için',
        'C) Kayak merkezi inşa etmek için en yüksek nokta olduğu için',
        'D) Ay o noktalarda Güneş\'e daha yakın olduğu için'
      ]
    },
    correctIndex: 0,
    explanation: {
      en: 'Real NASA Artemis Fact: Because the Moon has only a 1.5° tilt, elevated crater rims at the South Pole receive near-constant sunlight for non-stop solar power.',
      tr: 'Gerçek NASA Artemis Bilgisi: Ay yalnızca 1.5 derecelik bir eksen eğikliğine sahip olduğundan, Güney Kutbu\'ndaki yüksek krater tepeleri kesintisiz güneş enerjisi sağlar.'
    }
  },
  {
    id: 'quiz_water_ice',
    difficulty: 'easy',
    coins: 40,
    topic: 'Artemis Water Ice',
    question: {
      en: 'Where has NASA discovered water ice on the Moon that astronauts can turn into drinking water and rocket fuel?',
      tr: 'NASA, Ay\'da astronotların içme suyuna ve roket yakıtına dönüştürebileceği su buzunu nerede keşfetti?'
    },
    options: {
      en: [
        'A) Deep inside permanently shadowed polar craters where ice never melts',
        'B) In open rivers running across the Moon\'s equator',
        'C) Floating in fluffy moon clouds',
        'D) Trapped inside alien treasure chests'
      ],
      tr: [
        'A) Buzun asla erimediği, sürekli gölgede kalan derin kutup kraterlerinin içinde',
        'B) Ay\'ın ekvatorunda akan açık nehirlerde',
        'C) Havada uçuşan pamuk gibi ay bulutlarında',
        'D) Uzaylı hazine sandıklarının içine kilitlenmiş halde'
      ]
    },
    correctIndex: 0,
    explanation: {
      en: 'Real NASA Fact: NASA instruments confirmed millions of tons of water ice in dark polar craters. Splitting water (H2O) into Hydrogen and Oxygen creates powerful rocket propellant!',
      tr: 'Gerçek NASA Bilgisi: NASA araçları karanlık kutup kraterlerinde milyonlarca ton su buzu olduğunu kanıtladı. Su (H2O) hidrojen ve oksijene ayrılarak roket yakıtı yapılabilir!'
    }
  },
  {
    id: 'quiz_mars_dust_storm',
    difficulty: 'hard',
    coins: 65,
    topic: 'Mars Global Dust Storms',
    question: {
      en: 'What happens to solar-powered bases and rovers when a planet-wide dust storm strikes Mars?',
      tr: 'Gezegen çapında devasa bir toz fırtınası Mars\'ı kapladığında güneş enerjili üslere ve araçlara ne olur?'
    },
    options: {
      en: [
        'A) Thick dust blocks out sunlight so solar panels cannot charge batteries!',
        'B) The storm blows the base all the way back to Earth',
        'C) The atmosphere turns into sweet strawberry soda',
        'D) Nothing at all, it feels like a gentle spring breeze'
      ],
      tr: [
        'A) Yoğun toz güneş ışığını keser, bu yüzden güneş panelleri bataryaları şarj edemez!',
        'B) Fırtına üssü uçurarak Dünya\'ya geri fırlatır',
        'C) Atmosfer tatlı çilekli gazoz haline gelir',
        'D) Hiçbir şey olmaz, hafif bir ilkbahar esintisi gibi geçer'
      ]
    },
    correctIndex: 0,
    explanation: {
      en: 'Real NASA Opportunity Rover Fact: In 2018, a global Martian dust storm blocked out the sun for months, ending Opportunity\'s historic 15-year mission.',
      tr: 'Gerçek NASA Opportunity Bilgisi: 2018\'de Mars çapındaki dev toz fırtınası aylarca güneşi perdeledi ve Opportunity aracının 15 yıllık tarihi görevini sonlandırdı.'
    }
  }
];

export function getRandomQuizQuestion(excludeId = null) {
  const pool = excludeId ? QUIZ_QUESTIONS.filter((q) => q.id !== excludeId) : QUIZ_QUESTIONS;
  return pool[Math.floor(Math.random() * pool.length)] || QUIZ_QUESTIONS[0];
}
