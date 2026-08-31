export interface AstroLesson {
  id: string;
  moduleId: string;
  moduleTitle: string;
  moduleTitleHi: string;
  title: string;
  titleHi: string;
  readTime: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  summaryHi: string;
  keyPoints: string[];
  keyPointsHi: string[];
  contentSections: {
    heading: string;
    headingHi: string;
    body: string;
    bodyHi: string;
    tableData?: { headers: string[]; rows: string[][] };
    tableDataHi?: { headers: string[]; rows: string[][] };
    proTip?: string;
    proTipHi?: string;
  }[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  questionHi: string;
  options: string[];
  optionsHi: string[];
  correctIndex: number;
  explanation: string;
  explanationHi: string;
}

export const ASTROLOGY_MODULES = [
  {
    id: 'mod_1',
    title: 'Fundamentals of Vedic Astrology',
    titleHi: 'वैदिक ज्योतिष के आधारभूत सिद्धांत',
    icon: 'Sparkles',
    desc: 'Rashis (12 Signs), Grahas (9 Planets), Bhavas (12 Houses) & 27 Nakshatras',
    descHi: '12 राशियां, 9 नवग्रह, 12 भाव (घर) एवं 27 नक्षत्र परिचय'
  },
  {
    id: 'mod_2',
    title: 'How to Read a Kundli (Step-by-Step)',
    titleHi: 'जन्म कुंडली का संपूर्ण विश्लेषण सीखें',
    icon: 'Compass',
    desc: 'Lagna identification, planetary strengths (Shadbala), aspects (Drishti) & D9 Navamsha',
    descHi: 'लग्न निर्धारण, ग्रह बल (षड्बल), ग्रह दृष्टियां एवं नवांश कुंडली'
  },
  {
    id: 'mod_3',
    title: 'Future Predictions (Phalit Jyotish)',
    titleHi: 'भविष्य कथन एवं फलित ज्योतिष विद्या',
    icon: 'Eye',
    desc: 'Career, Marriage, Wealth, Health, Foreign Travel & Timing of Events',
    descHi: 'करियर, विवाह, धन लाभ, स्वास्थ्य एवं विदेश यात्रा की सटीक भविष्यवाणी'
  },
  {
    id: 'mod_4',
    title: 'Dasha Systems & Transits (Gochar)',
    titleHi: 'विंशोत्तरी महादशा एवं ग्रह गोचर फल',
    icon: 'Clock',
    desc: 'Vimshottari Dasha calculation, Shani Sade Sati, Guru Gochar & Rahu-Ketu transit',
    descHi: 'महादशा-अंतर्दशा फल, शनि साढ़े साती, गुरु गोचर व राहु-केतु परिवर्तन'
  },
  {
    id: 'mod_5',
    title: 'Auspicious Yogas & Astrological Doshas',
    titleHi: 'शुभ राजयोग एवं अशुभ दोष निवारण',
    icon: 'Crown',
    desc: 'Gajakesari, Panch Mahapurusha, Manglik, Kaal Sarp, Kemadruma & Pitru Dosha',
    descHi: 'गजकेसरी, पंच महापुरुष योग, मांगलिक, कालसर्प एवं पितृ दोष'
  },
  {
    id: 'mod_6',
    title: 'Remedies, Gemstones & Sacred Paths',
    titleHi: 'वैदिक उपाय, रत्न शास्त्र एवं अनिवार्य पाठ',
    icon: 'ShieldCheck',
    desc: 'Dasha-wise Gemstone rules, Sacred Stotras, Mantras, Fasting & Charity',
    descHi: 'दशा अनुसार रत्न चयन, पवित्र पाठ/स्तोत्र, मंत्र जाप व दान उपाय'
  }
];

export const ASTROLOGY_LESSONS: AstroLesson[] = [
  {
    id: 'lesson_1_1',
    moduleId: 'mod_1',
    moduleTitle: 'Fundamentals of Vedic Astrology',
    moduleTitleHi: 'वैदिक ज्योतिष के आधारभूत सिद्धांत',
    title: 'The 12 Zodiac Signs (Rashis) & Their Natural Elements',
    titleHi: '12 राशियां और उनके तत्व, स्वामी व स्वभाव',
    readTime: '6 min read',
    level: 'Beginner',
    summary: 'Master the 12 signs of the zodiac (Mesha to Meena), their governing lords, elemental nature (Fire, Earth, Air, Water), and behavioral traits.',
    summaryHi: 'मेष से मीन तक 12 राशियों के स्वामी ग्रह, उनके तत्व (अग्नि, पृथ्वी, वायु, जल) और मूल प्रवृत्तियों को विस्तार से समझें।',
    keyPoints: [
      'The zodiac is a 360° circle divided into 12 equal arcs of 30° each.',
      'Fire Signs (Aries, Leo, Sag) denote initiative and ambition.',
      'Earth Signs (Taurus, Virgo, Cap) denote practicality and stability.',
      'Air Signs (Gemini, Libra, Aqu) denote intellect and communication.',
      'Water Signs (Cancer, Scorpio, Pisces) denote intuition and emotion.'
    ],
    keyPointsHi: [
      'राशि चक्र 360° का वृत्त है, जो 30° के 12 समान भागों में बंटा है।',
      'अग्नि राशियां (मेष, सिंह, धनु) ऊर्जा, नेतृत्व और पराक्रम का प्रतीक हैं।',
      'पृथ्वी राशियां (वृषभ, कन्या, मकर) स्थिरता, धन और व्यावहारिकता दर्शाती हैं।',
      'वायु राशियां (मिथुन, तुला, कुंभ) बुद्धि, विचार और संचार का प्रतिनिधित्व करती हैं।',
      'जल राशियां (कर्क, वृश्चिक, मीन) भावना, अंतर्ज्ञान और संवेदनशीलता दर्शाती हैं।'
    ],
    contentSections: [
      {
        heading: 'The 12 Rashis and Their Planetary Rulers',
        headingHi: '12 राशियां एवं उनके स्वामी ग्रह',
        body: 'In Vedic Astrology, each Rashi is ruled by a specific Graha (Planet). The Sun rules Leo (Simha) and Moon rules Cancer (Karka), while Mars, Mercury, Jupiter, Venus, and Saturn each rule two signs.',
        bodyHi: 'वैदिक ज्योतिष में प्रत्येक राशि का एक स्वामी ग्रह होता है। सूर्य सिंह राशि का और चंद्रमा कर्क राशि का स्वामी है। मंगल, बुध, गुरु, शुक्र और शनि को दो-दो राशियों का स्वामित्व प्राप्त है।',
        tableData: {
          headers: ['Sign (Rashi)', 'Sanskrit', 'Ruling Lord', 'Element', 'Quality'],
          rows: [
            ['1. Aries', 'Mesha (मेष)', 'Mars (मंगल)', 'Fire (अग्नि)', 'Movable / Chara'],
            ['2. Taurus', 'Vrishabha (वृषभ)', 'Venus (शुक्र)', 'Earth (पृथ्वी)', 'Fixed / Sthira'],
            ['3. Gemini', 'Mithuna (मिथुन)', 'Mercury (बुध)', 'Air (वायु)', 'Dual / Dwiswabhava'],
            ['4. Cancer', 'Karka (कर्क)', 'Moon (चंद्र)', 'Water (जल)', 'Movable / Chara'],
            ['5. Leo', 'Simha (सिंह)', 'Sun (सूर्य)', 'Fire (अग्नि)', 'Fixed / Sthira'],
            ['6. Virgo', 'Kanya (कन्या)', 'Mercury (बुध)', 'Earth (पृथ्वी)', 'Dual / Dwiswabhava'],
            ['7. Libra', 'Tula (तुला)', 'Venus (शुक्र)', 'Air (वायु)', 'Movable / Chara'],
            ['8. Scorpio', 'Vrishchika (वृश्चिक)', 'Mars (मंगल)', 'Water (जल)', 'Fixed / Sthira'],
            ['9. Sagittarius', 'Dhanu (धनु)', 'Jupiter (गुरु)', 'Fire (अग्नि)', 'Dual / Dwiswabhava'],
            ['10. Capricorn', 'Makara (मकर)', 'Saturn (शनि)', 'Earth (पृथ्वी)', 'Movable / Chara'],
            ['11. Aquarius', 'Kumbha (कुंभ)', 'Saturn (शनि)', 'Air (वायु)', 'Fixed / Sthira'],
            ['12. Pisces', 'Meena (मीन)', 'Jupiter (गुरु)', 'Water (जल)', 'Dual / Dwiswabhava']
          ]
        },
        proTip: 'A planet placed in its own sign (Swakshetra) or exaltation sign (Uchha) delivers exceptionally strong and protective results.',
        proTipHi: 'जब कोई ग्रह अपनी स्वराशि या उच्च राशि में होता है, तो वह शुभ और शक्तिशाली परिणाम प्रदान करता है।'
      }
    ]
  },
  {
    id: 'lesson_1_2',
    moduleId: 'mod_1',
    moduleTitle: 'Fundamentals of Vedic Astrology',
    moduleTitleHi: 'वैदिक ज्योतिष के आधारभूत सिद्धांत',
    title: 'The 9 Grahas (Navagrahas) & Their Exaltation / Debilitation',
    titleHi: 'नवग्रहों का स्वभाव, उच्च व नीच स्थिति एवं कारकत्व',
    readTime: '7 min read',
    level: 'Beginner',
    summary: 'Learn what each of the 9 celestial bodies represents in human life, where they achieve maximum power (Exaltation / Uchha), and where they become weak (Debilitation / Neecha).',
    summaryHi: 'नवग्रह जीवन के किन क्षेत्रों को नियंत्रित करते हैं, किस राशि में वे उच्च (सर्वश्रेष्ठ) और किस राशि में नीच (कमजोर) होते हैं, इसे समझें।',
    keyPoints: [
      'Sun (Surya): Soul, Father, Authority, Government, Vitality (Exalted in Aries 10°, Debilitated in Libra 10°).',
      'Moon (Chandra): Mind, Mother, Emotions, Fluidity (Exalted in Taurus 3°, Debilitated in Scorpio 3°).',
      'Mars (Mangala): Courage, Energy, Brothers, Real Estate (Exalted in Capricorn 28°, Debilitated in Cancer 28°).',
      'Mercury (Budha): Intellect, Business, Speech, Logic (Exalted in Virgo 15°, Debilitated in Pisces 15°).',
      'Jupiter (Guru): Wisdom, Wealth, Children, Dharma, Guru (Exalted in Cancer 5°, Debilitated in Capricorn 5°).',
      'Venus (Shukra): Love, Marriage, Luxury, Vehicles, Art (Exalted in Pisces 27°, Debilitated in Virgo 27°).',
      'Saturn (Shani): Karma, Longevity, Discipline, Hard Work (Exalted in Libra 20°, Debilitated in Aries 20°).',
      'Rahu & Ketu: Karmic shadow planets representing worldly obsession and spiritual liberation.'
    ],
    keyPointsHi: [
      'सूर्य: आत्मा, पिता, मान-सम्मान, सरकार (मेष में 10° पर उच्च, तुला में नीच)।',
      'चंद्रमा: मन, माता, भावनाएं, जल तत्व (वृषभ में 3° पर उच्च, वृश्चिक में नीच)।',
      'मंगल: पराक्रम, भाई, भूमि-भवन, साहस (मकर में 28° पर उच्च, कर्क में नीच)।',
      'बुध: बुद्धि, व्यापार, वाणी, तार्किक क्षमता (कन्या में 15° पर उच्च, मीन में नीच)।',
      'गुरु: ज्ञान, धन, संतान, धर्म, भाग्य (कर्क में 5° पर उच्च, मकर में नीच)।',
      'शुक्र: प्रेम, वैवाहिक सुख, वैभव, वाहन, कला (मीन में 27° पर उच्च, कन्या में नीच)।',
      'शनि: कर्म, आयु, न्याय, वैराग्य, श्रम (तुला में 20° पर उच्च, मेष में नीच)।',
      'राहु और केतु: छाया ग्रह जो प्रारब्ध कर्म, रहस्य और मोक्ष के सूचक हैं।'
    ],
    contentSections: [
      {
        heading: 'Planetary Dignity Guide',
        headingHi: 'ग्रहों की उच्च, नीच व स्वराशि स्थिति',
        body: 'Understanding planet dignity is the bedrock of prediction. A debilitated planet does not always mean doom—if its dispositor is strong or in Kendra, it forms a Neechbhanga Raj Yoga!',
        bodyHi: 'कुंडली विश्लेषण में ग्रह की गरिमा (Dignity) देखना सबसे महत्वपूर्ण है। नीच ग्रह हमेशा खराब फल नहीं देता—यदि उसका नीचभंग राजयोग बन जाए तो वह रंक से राजा बना देता है!'
      }
    ]
  },
  {
    id: 'lesson_2_1',
    moduleId: 'mod_2',
    moduleTitle: 'How to Read a Kundli',
    moduleTitleHi: 'जन्म कुंडली का संपूर्ण विश्लेषण सीखें',
    title: 'The 12 Bhavas (Houses) and Life Domains',
    titleHi: 'कुंडली के 12 भाव (घर) और उनके जीवन क्षेत्र',
    readTime: '8 min read',
    level: 'Beginner',
    summary: 'A complete breakdown of what every house from 1st (Tanu Bhava) to 12th (Vyaya Bhava) represents in personal destiny.',
    summaryHi: 'प्रथम भाव (तनु भाव) से लेकर द्वादश भाव (व्यय भाव) तक सभी 12 भावों के विस्तृत फल एवं कारकत्व समझें।',
    keyPoints: [
      '1st House (Lagna): Physical constitution, personality, health, vitality.',
      '2nd House (Dhana): Family wealth, speech, eating habits, bank balance.',
      '4th House (Sukha): Mother, home, vehicles, peace of mind, property.',
      '5th House (Purva Punya): Intelligence, children, speculation, romance, past merits.',
      '7th House (Jaya): Marriage, spouse, partnerships, public relations.',
      '9th House (Bhagya): Fortune, father, spirituality, higher education, long journeys.',
      '10th House (Karma): Career, authority, social standing, government honor.',
      '11th House (Labha): Gains, fulfillment of desires, income streams, elder siblings.'
    ],
    keyPointsHi: [
      'प्रथम भाव (लग्न): शरीर, स्वास्थ्य, रूप-रंग, आत्मबल और स्वभाव।',
      'द्वितीय भाव (धन भाव): पैतृक संपत्ति, वाणी, संचित धन, कुटुंब।',
      'चतुर्थ भाव (सुख भाव): माता, भूमि, मकान, वाहन, मानसिक शांति।',
      'पंचम भाव (पुत्र/पुण्य भाव): बुद्धि, संतान, प्रेम, पूर्व जन्म के पुण्य कर्म।',
      'सप्तम भाव (जाया भाव): जीवनसाथी, विवाह, साझेदारी व्यापार, लोक संबंध।',
      'नवम भाव (भाग्य भाव): भाग्य, धर्म, पिता, उच्च शिक्षा, लंबी यात्राएं।',
      'दशम भाव (कर्म भाव): आजीविका, पद-प्रतिष्ठा, सरकारी नौकरी, कर्म क्षेत्र।',
      'एकादश भाव (लाभ भाव): आय के साधन, मनोकामना पूर्ति, बड़े भाई-बहन, मुनाफा।'
    ],
    contentSections: [
      {
        heading: 'House Classification: Kendra, Trikona, Dusthana, Upachaya',
        headingHi: 'भावों का वर्गीकरण: केंद्र, त्रिकोण, दुस्थान व उपचय',
        body: 'Kendra Houses (1, 4, 7, 10) are the pillars of life (Vishnu Sthana). Trikona Houses (1, 5, 9) are the houses of grace and fortune (Lakshmi Sthana). Dusthana Houses (6, 8, 12) denote struggles, debts, disease, and losses. Upachaya Houses (3, 6, 10, 11) show growth over time through effort.',
        bodyHi: 'केंद्र भाव (1, 4, 7, 10) जीवन के चार स्तंभ हैं (विष्णु स्थान)। त्रिकोण भाव (1, 5, 9) लक्ष्मी स्थान कहलाते हैं जो परम शुभ हैं। त्रिक/दुस्थान भाव (6, 8, 12) रोग, ऋण, शत्रु व व्यय दर्शाते हैं। उपचय भाव (3, 6, 10, 11) समय के साथ सतत उन्नति देते हैं।'
      }
    ]
  },
  {
    id: 'lesson_3_1',
    moduleId: 'mod_3',
    moduleTitle: 'Future Predictions (Phalit Jyotish)',
    moduleTitleHi: 'भविष्य कथन एवं फलित ज्योतिष विद्या',
    title: 'How to Predict Career & Profession from Kundli',
    titleHi: 'कुंडली से करियर एवं व्यवसाय की सटीक भविष्यवाणी कैसे करें',
    readTime: '9 min read',
    level: 'Intermediate',
    summary: 'Step-by-step methodology to analyze career choices, government jobs vs business, promotions, and professional peaks using the 10th House, Lagna, D10 Dashamsha, and active Dashas.',
    summaryHi: 'दशम भाव, दशमेश, दशमांश (D10) कुंडली और महादशा के आधार पर सरकारी नौकरी, निजी नौकरी व व्यापार की सटीक गणना विधि।',
    keyPoints: [
      'Evaluate the 10th house, its lord (Karmesh), and planets placed in the 10th house.',
      'Check the Sun (authority), Saturn (service/labor), Mercury (trade/business), and Mars (police/defense/engineering).',
      'Examine the D10 Dashamsha chart: planets in 1st, 10th, or 11th of D10 dictate career triumph.',
      'Career changes and promotions typically trigger during the Mahadasha/Antardasha of the 10th, 9th, or 11th lord or planets aspecting the 10th house.'
    ],
    keyPointsHi: [
      'दशम भाव, दशमेश और दशम भाव में स्थित ग्रहों का बल देखें।',
      'सूर्य (सरकारी पद/अधिकार), शनि (सेवा/प्रशासन), बुध (व्यापार/फाइनेंस) और मंगल (रक्षा/इंजीनियरिंग) के प्रभाव का विश्लेषण करें।',
      'दशमांश (D10) कुंडली में लग्न व दशम भाव के स्वामी का स्थान देखें।',
      'करियर में पदोन्नति दशमेश, नवमेश या एकादशेश की महादशा-अंतर्दशा में होती है।'
    ],
    contentSections: [
      {
        heading: 'Indicators for Government Job vs Private Business',
        headingHi: 'सरकारी नौकरी बनाम स्वतंत्र व्यापार के योग',
        body: 'A strong Sun conjunct or aspecting Mars or Jupiter in the 10th house, along with a strong Amatyakaraka planet, strongly indicates high government administration or civil services. A dominant Mercury, Venus, or 7th/11th connection points directly toward thriving entrepreneurship and commerce.',
        bodyHi: 'यदि दशम भाव में सूर्य, मंगल या गुरु का संबंध लग्न या दशमेश से हो, तो उच्च प्रशासनिक या सरकारी पद मिलता है। बुध या शुक्र का एकादश/सप्तम भाव से योग व्यापार में भारी सफलता देता है।'
      }
    ]
  },
  {
    id: 'lesson_3_2',
    moduleId: 'mod_3',
    moduleTitle: 'Future Predictions (Phalit Jyotish)',
    moduleTitleHi: 'भविष्य कथन एवं फलित ज्योतिष विद्या',
    title: 'How to Predict Marriage Timing & Spouse Qualities',
    titleHi: 'विवाह का समय और जीवनसाथी का स्वभाव कैसे जानें',
    readTime: '8 min read',
    level: 'Intermediate',
    summary: 'Predict exact marriage windows using the 7th house, Venus (Karaka for males), Jupiter (Karaka for females), D9 Navamsha, and Double Transit of Saturn & Jupiter.',
    summaryHi: 'सप्तम भाव, सप्तमेश, शुक्र/गुरु, नवांश (D9) कुंडली और शनि-गुरु के दोहरे गोचर (Double Transit) से विवाह का समय निर्धारित करें।',
    keyPoints: [
      'The 7th House and 7th Lord indicate marriage, partner nature, and relationship harmony.',
      'Venus is the natural Karaka of wife/marriage for men; Jupiter is the Karaka for husband for women.',
      'D9 Navamsha Lagna and 7th house reveal the true post-marriage happiness and spouse personality.',
      'Double Transit Law: When both transiting Saturn and transiting Jupiter simultaneously aspect the natal 7th house or 7th lord, marriage takes place!'
    ],
    keyPointsHi: [
      'सप्तम भाव और सप्तमेश से वैवाहिक सुख और जीवनसाथी का स्वरूप देखा जाता है।',
      'पुरुषों की कुंडली में शुक्र और स्त्रियों की कुंडली में गुरु विवाह के मुख्य कारक हैं।',
      'नवांश (D9) कुंडली विवाह के बाद के वास्तविक सुख और भाग्य को दर्शाती है।',
      'डबल गोचर नियम: जब गोचर में शनि और गुरु दोनों एक साथ सप्तम भाव या सप्तमेश को दृष्टि देते हैं, तब विवाह संपन्न होता है!'
    ],
    contentSections: [
      {
        heading: 'Timing Marriage with Dasha and Gochar',
        headingHi: 'दशा और गोचर से विवाह काल निर्धारण',
        body: 'Marriage usually takes place during the Mahadasha/Antardasha of: 1) The 7th lord, 2) Planet placed in the 7th house, 3) Planet aspecting the 7th house, 4) Venus or Jupiter, or 5) Navamsha 7th lord.',
        bodyHi: 'विवाह प्रायः सप्तमेश, सप्तम भाव में स्थित ग्रह, सप्तम भाव पर दृष्टि डालने वाले ग्रह, अथवा शुक्र/गुरु की दशा-अंतर्दशा में होता है।'
      }
    ]
  },
  {
    id: 'lesson_4_1',
    moduleId: 'mod_4',
    moduleTitle: 'Dasha Systems & Transits',
    moduleTitleHi: 'विंशोत्तरी महादशा एवं ग्रह गोचर फल',
    title: 'Mastering Vimshottari Dasha (120-Year Cycle)',
    titleHi: 'विंशोत्तरी महादशा चक्र और फल कथन की गुप्त विधियां',
    readTime: '10 min read',
    level: 'Advanced',
    summary: 'Learn how the 120-year Vimshottari dasha cycle unfolds, how to synthesize Mahadasha + Antardasha results, and how to pinpoint major life turning points.',
    summaryHi: '120 वर्षीय विंशोत्तरी दशा चक्र, महादशा-अंतर्दशा का संयुक्त फल और जीवन के बड़े मोड़ों की सटीक पहचान करना सीखें।',
    keyPoints: [
      'Dasha sequence: Ketu (7y) -> Venus (20y) -> Sun (6y) -> Moon (10y) -> Mars (7y) -> Rahu (18y) -> Jupiter (16y) -> Saturn (19y) -> Mercury (17y).',
      'The starting dasha at birth is determined by the Moon’s exact degree within its natal Nakshatra.',
      'The Mahadasha sets the overall environment (the "sky"), while the Antardasha delivers specific events (the "weather").',
      'Planets in mutual 6/8 (Shadashtaka) or 2/12 (Dwidwadasha) relationships during their dasha create friction.'
    ],
    keyPointsHi: [
      'दशा क्रम: केतु (7 वर्ष) -> शुक्र (20 वर्ष) -> सूर्य (6 वर्ष) -> चंद्र (10 वर्ष) -> मंगल (7 वर्ष) -> राहु (18 वर्ष) -> गुरु (16 वर्ष) -> शनि (19 वर्ष) -> बुध (17 वर्ष)।',
      'जन्म के समय सक्रिय दशा चंद्रमा के नक्षत्र और उसकी सटीक डिग्री से निर्धारित होती है।',
      'महादशा जीवन का मुख्य परिवेश बनाती है, जबकि अंतर्दशा प्रत्यक्ष घटनाओं को घटित करती है।',
      'यदि महादशानाथ और अंतर्दशानाथ परस्पर 6/8 (षडाष्टक) या 2/12 (द्विर्द्वादश) संबंध में हों, तो तनाव रहता है।'
    ],
    contentSections: [
      {
        heading: 'How to Read Antardasha in Mahadasha',
        headingHi: 'महादशा में अंतर्दशा का फल कैसे निकालें',
        body: 'Always analyze the house lordship of the Mahadasha planet and the Antardasha planet. If a benefic 9th lord dasha runs with an 11th lord antardasha, massive financial and spiritual rise occurs.',
        bodyHi: 'महादशानाथ और अंतर्दशानाथ के स्वामित्व वाले भावों का मिलान करें। नवमेश की महादशा में एकादशेश की अंतर्दशा अप्रत्याशित धन और मान-सम्मान प्रदान करती है।'
      }
    ]
  },
  {
    id: 'lesson_6_1',
    moduleId: 'mod_6',
    moduleTitle: 'Remedies, Gemstones & Sacred Paths',
    moduleTitleHi: 'वैदिक उपाय, रत्न शास्त्र एवं अनिवार्य पाठ',
    title: 'Rules of Wearing Gemstones (रत्न धारण के सार्वभौमिक नियम)',
    titleHi: 'रत्न धारण करने के नियम: किस दशा व लग्न में कौन सा रत्न पहनें',
    readTime: '9 min read',
    level: 'Advanced',
    summary: 'Comprehensive rules for prescribing Gemstones according to Lagna Lord (Lagnesh), 5th Lord (Panchamesh), 9th Lord (Bhagyesh), active Mahadashas, and dangerous incompatible pairs.',
    summaryHi: 'लग्नेश, पंचमेश, भाग्येश और सक्रिय महादशा के अनुसार सही रत्न चयन, वजन, धातु, शुभ वार और वर्जित रत्न जोड़ों की संपूर्ण गाइड।',
    keyPoints: [
      'Rule 1: Always strengthen the Lagna Lord (1st), 5th Lord, and 9th Lord (Trikona Lords).',
      'Rule 2: Never wear gemstones of functional malefics (lords of 6th, 8th, 12th houses unless Yogakaraka).',
      'Rule 3: Incompatible Combinations: Never wear Ruby with Blue Sapphire/Gomed; never wear Emerald with Red Coral or Pearl!',
      'Rule 4: During a planet’s Mahadasha, its gemstone can be worn IF the planet is a functional benefic for your Lagna.',
      'Rule 5: Always purify and energize gemstones with their respective Beej Mantra 108 times on an auspicious weekday in Shukla Paksha.'
    ],
    keyPointsHi: [
      'नियम 1: हमेशा लग्नेश (1st), पंचमेश (5th) और भाग्येश (9th) का रत्न धारण करना सर्वोत्तम होता है।',
      'नियम 2: 6ठे, 8वें और 12वें भाव (त्रिक भाव) के स्वामी ग्रहों का रत्न भूलकर भी न पहनें।',
      'नियम 3: वर्जित रत्न जोड़ियां: माणिक्य के साथ नीलम/गोमेद कभी न पहनें; पन्ना के साथ मूंगा या मोती न पहनें!',
      'नियम 4: महादशा के दौरान संबंधित ग्रह का रत्न तभी पहनें जब वह आपके लग्न के लिए कारक (मित्र) ग्रह हो।',
      'नियम 5: शुक्ल पक्ष के शुभ वार को 108 बार बीज मंत्र से रत्न का प्राण-प्रतिष्ठा पूजन करके ही धारण करें।'
    ],
    contentSections: [
      {
        heading: 'Complete Navagraha Gemstone Table',
        headingHi: 'नवग्रह रत्न, धातु, उंगली एवं धारण विधि तालिका',
        body: 'Refer to this classical table before prescribing or wearing any precious gemstone.',
        bodyHi: 'रत्न धारण करने से पूर्व धातु, उंगली, दिन और बीज मंत्र की प्रामाणिक सूची:',
        tableData: {
          headers: ['Planet (ग्रह)', 'Gemstone (रत्न)', 'Metal (धातु)', 'Finger (उंगली)', 'Day & Time', 'Beej Mantra'],
          rows: [
            ['Sun (सूर्य)', 'Ruby (माणिक्य)', 'Gold / Copper', 'Ring Finger (अनामिका)', 'Sunday Morning', 'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः'],
            ['Moon (चंद्र)', 'Pearl (मोती)', 'Silver (चांदी)', 'Little Finger (कनिष्ठिका)', 'Monday Evening', 'ॐ श्रां श्रीं श्रौं सः चंद्रमसे नमः'],
            ['Mars (मंगल)', 'Red Coral (मूंगा)', 'Gold / Copper / Panchdhatu', 'Ring Finger (अनामिका)', 'Tuesday Morning', 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः'],
            ['Mercury (बुध)', 'Emerald (पन्ना)', 'Gold / Silver', 'Little Finger (कनिष्ठिका)', 'Wednesday Morning', 'ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः'],
            ['Jupiter (गुरु)', 'Yellow Sapphire (पुखराज)', 'Gold (सोना)', 'Index Finger (तर्जनी)', 'Thursday Morning', 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः'],
            ['Venus (शुक्र)', 'Diamond / Opal (हीरा/ओपल)', 'Platinum / Silver / Gold', 'Middle or Ring Finger', 'Friday Morning', 'ॐ द्रां द्रीं द्रौं सः शुक्राय नमः'],
            ['Saturn (शनि)', 'Blue Sapphire (नीलम/जमुनिया)', 'Panchdhatu / Iron / Silver', 'Middle Finger (मध्यमा)', 'Saturday Evening', 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः'],
            ['Rahu (राहु)', 'Hessonite (गोमेद)', 'Silver / Ashtadhatu', 'Middle Finger (मध्यमा)', 'Saturday / Wed Night', 'ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः'],
            ['Ketu (केतु)', 'Cat’s Eye (लहसुनिया)', 'Silver / Panchdhatu', 'Middle or Ring Finger', 'Tuesday / Thursday Night', 'ॐ स्रां स्रीं स्रौं सः केतवे नमः']
          ]
        }
      }
    ]
  }
];

export const ASTROLOGY_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Which of the following houses are known as the Lakshmi Sthanas (Trines / Trikona Houses)?',
    questionHi: 'निम्नलिखित में से किन भावों को "लक्ष्मी स्थान" (त्रिकोण भाव) कहा जाता है?',
    options: ['1st, 4th, 7th, 10th Houses', '1st, 5th, 9th Houses', '6th, 8th, 12th Houses', '3rd, 6th, 11th Houses'],
    optionsHi: ['1, 4, 7, 10 भाव', '1, 5, 9 भाव', '6, 8, 12 भाव', '3, 6, 11 भाव'],
    correctIndex: 1,
    explanation: 'The 1st, 5th, and 9th houses are the Trikona (trine) houses representing dharma, intelligence, and fortune (Lakshmi Sthanas).',
    explanationHi: '1ला, 5वां और 9वां भाव त्रिकोण भाव हैं, जिन्हें लक्ष्मी स्थान कहा जाता है। ये धर्म, विद्या और भाग्य के सूचक हैं।'
  },
  {
    id: 'q2',
    question: 'In which sign is planet Jupiter (Guru) exalted (Uchha)?',
    questionHi: 'देवगुरु बृहस्पति किस राशि में उच्च (Exalted) होते हैं?',
    options: ['Aries (मेष)', 'Cancer (कर्क)', 'Sagittarius (धनु)', 'Pisces (मीन)'],
    optionsHi: ['मेष', 'कर्क', 'धनु', 'मीन'],
    correctIndex: 1,
    explanation: 'Jupiter achieves maximum exaltation at 5 degrees in Cancer (Karka Rashi).',
    explanationHi: 'देवगुरु बृहस्पति कर्क राशि में 5 डिग्री पर परम उच्च के होते हैं।'
  },
  {
    id: 'q3',
    question: 'Which two gemstones must NEVER be worn together due to planetary enmity?',
    questionHi: 'ग्रह शत्रुता के कारण किन दो रत्नों को एक साथ कभी नहीं पहनना चाहिए?',
    options: ['Ruby (Manik) and Yellow Sapphire (Pukhraj)', 'Ruby (Manik) and Blue Sapphire (Neelam)', 'Emerald (Panna) and Blue Sapphire (Neelam)', 'Pearl (Moti) and Yellow Sapphire (Pukhraj)'],
    optionsHi: ['माणिक्य और पुखराज', 'माणिक्य और नीलम', 'पन्ना और नीलम', 'मोती और पुखराज'],
    correctIndex: 1,
    explanation: 'Sun (Ruby) and Saturn (Blue Sapphire) are bitter natural enemies in Vedic astrology. Wearing them together causes intense energetic conflict and health/career turbulence.',
    explanationHi: 'सूर्य (माणिक्य) और शनि (नीलम) परस्पर घोर शत्रु हैं। इन्हें एक साथ पहनने से शारीरिक व मानसिक कष्ट और करियर में बाधा आती है।'
  },
  {
    id: 'q4',
    question: 'Which sacred text/path is most recommended for protection during Saturn (Shani) Mahadasha or Sade Sati?',
    questionHi: 'शनि की महादशा या साढ़े साती में किस पवित्र स्तोत्र/पाठ का पाठ सर्वश्रेष्ठ माना गया है?',
    options: ['Aditya Hridaya Stotram', 'Dasharatha Krit Shani Stotram & Hanuman Chalisa', 'Sri Suktam Path', 'Kanakadhara Stotram'],
    optionsHi: ['आदित्य हृदय स्तोत्र', 'दशरथ कृत शनि स्तोत्र एवं हनुमान चालीसा', 'श्री सूक्तम् पाठ', 'कनकधारा स्तोत्र'],
    correctIndex: 1,
    explanation: 'Dasharatha Krit Shani Stotram, Hanuman Chalisa, and Maha Mrityunjaya Mantra provide immense relief and divine protection from Saturn afflictions.',
    explanationHi: 'दशरथ कृत शनि स्तोत्र, सुंदरकांड/हनुमान चालीसा और महामृत्युंजय मंत्र शनि पीड़ा से मुक्ति दिलाते हैं।'
  },
  {
    id: 'q5',
    question: 'Which Divisional Chart (Varga) is crucial for analyzing marriage, spouse, and the inner soul purpose?',
    questionHi: 'विवाह, जीवनसाथी और आत्मा के वास्तविक धर्म के विश्लेषण के लिए कौन सी वर्ग कुंडली अनिवार्य है?',
    options: ['D10 Dashamsha', 'D7 Saptamsa', 'D9 Navamsha', 'D12 Dwadashamsha'],
    optionsHi: ['D10 दशमांश', 'D7 सप्तमांश', 'D9 नवांश', 'D12 द्वादशांश'],
    correctIndex: 2,
    explanation: 'D9 Navamsha chart is considered the heart of Vedic chart analysis for marriage, partner compatibility, and destiny in the second half of life.',
    explanationHi: 'D9 नवांश कुंडली वैदिक ज्योतिष का प्राण है, जिससे वैवाहिक जीवन, जीवनसाथी का स्वभाव और जीवन के उत्तरार्ध का भाग्य देखा जाता है।'
  }
];
