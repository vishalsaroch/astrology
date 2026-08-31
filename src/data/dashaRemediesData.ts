export interface PlanetDashaRemedy {
  planet: string;
  planetHi: string;
  sanskritName: string;
  gemstone: {
    name: string;
    nameHi: string;
    secondaryGems: string[];
    secondaryGemsHi: string[];
    idealCarat: string;
    idealMetal: string;
    idealMetalHi: string;
    wearingFinger: string;
    wearingFingerHi: string;
    auspiciousDay: string;
    auspiciousDayHi: string;
    consecrationTime: string;
    consecrationTimeHi: string;
    beejMantra: string;
    vedicMantra: string;
    japCount: number;
    beneficLagnas: string[];
    maleficLagnas: string[];
    incompatibleGems: string[];
    incompatibleGemsHi: string[];
    rulesSummary: string;
    rulesSummaryHi: string;
  };
  sacredPaths: {
    id: string;
    name: string;
    nameHi: string;
    category: 'Stotram' | 'Path' | 'Mantra' | 'Kavach' | 'Chalisa';
    categoryHi: string;
    frequency: string;
    frequencyHi: string;
    timing: string;
    timingHi: string;
    benefits: string;
    benefitsHi: string;
    fullLyricsSanskrit: string;
    hindiMeaning: string;
    englishMeaning: string;
  }[];
  daanUpay: {
    items: string[];
    itemsHi: string[];
    day: string;
    dayHi: string;
    recipient: string;
    recipientHi: string;
  };
  vratUpay: {
    name: string;
    nameHi: string;
    duration: string;
    procedure: string;
    procedureHi: string;
  };
  rudraksha: {
    mukhi: string;
    mukhiHi: string;
    benefit: string;
    benefitHi: string;
  };
  yantra: {
    name: string;
    nameHi: string;
    direction: string;
    directionHi: string;
  };
}

export const DASHA_REMEDIES_DATABASE: Record<string, PlanetDashaRemedy> = {
  Sun: {
    planet: 'Sun',
    planetHi: 'सूर्य (Surya)',
    sanskritName: 'सूर्य महादशा',
    gemstone: {
      name: 'Ruby (Manikya)',
      nameHi: 'माणिक्य (Ruby)',
      secondaryGems: ['Red Garnet', 'Star Ruby', 'Red Spinel'],
      secondaryGemsHi: ['लाल गारनेट', 'स्टार रूबी', 'लाल स्पिनेल'],
      idealCarat: '3.25 to 5.25 Ratti (in weight)',
      idealMetal: 'Gold or Copper (तांबा या सोना)',
      idealMetalHi: 'सोना या शुद्ध तांबा',
      wearingFinger: 'Ring finger (अनामिका) of right hand',
      wearingFingerHi: 'दाएं हाथ की अनामिका (रिंग फिंगर) उंगली',
      auspiciousDay: 'Sunday morning during Shukla Paksha',
      auspiciousDayHi: 'शुक्ल पक्ष के रविवार को सूर्योदय के समय',
      consecrationTime: 'Within 1 hour of sunrise (प्रातः 6:00 - 7:30)',
      consecrationTimeHi: 'सूर्योदय के 1 घंटे के भीतर',
      beejMantra: 'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः',
      vedicMantra: 'ॐ आकृष्णेन रजसा वर्तमानो निवेशयन्नमृतं मर्त्यं च। हिरण्ययेन सविता रथेना देवो याति भुवनानि पश्यन्॥',
      japCount: 108,
      beneficLagnas: ['Aries (मेष)', 'Leo (सिंह)', 'Sagittarius (धनु)', 'Scorpio (वृश्चिक)'],
      maleficLagnas: ['Libra (तुला)', 'Capricorn (मकर)', 'Aquarius (कुंभ)', 'Taurus (वृषभ)'],
      incompatibleGems: ['Blue Sapphire (Neelam)', 'Hessonite (Gomed)', 'Cat’s Eye (Lehsuniya)', 'Diamond (Heera)'],
      incompatibleGemsHi: ['नीलम', 'गोमेद', 'लहसुनिया', 'हीरा'],
      rulesSummary: 'Never wear Ruby if Saturn or Venus rules the Lagna (unless Sun is uniquely benefic). Never pair Ruby with Blue Sapphire.',
      rulesSummaryHi: 'तुला, मकर और कुंभ लग्न में सूर्य नीच या शत्रु ग्रह होता है। माणिक्य के साथ नीलम या गोमेद कभी न पहनें।'
    },
    sacredPaths: [
      {
        id: 'aditya_hridaya',
        name: 'Aditya Hridaya Stotram',
        nameHi: 'आदित्य हृदय स्तोत्रम् (वाल्मीकि रामायण)',
        category: 'Stotram',
        categoryHi: 'स्तोत्रम्',
        frequency: 'Daily 1 time or 3 times at Sunrise',
        frequencyHi: 'प्रतिदिन सूर्योदय के समय 1 या 3 बार',
        timing: 'Morning facing East with Arghya to Sun',
        timingHi: 'प्रातःकाल पूर्व दिशा की ओर मुख करके तांबे के लोटे से सूर्य को जल देकर',
        benefits: 'Imparts unconquerable courage, destruction of enemies, high government position, vitality, and immense soul power.',
        benefitsHi: 'शत्रु पराजय, सरकारी पदों में सफलता, आत्मबल, नेत्र ज्योति एवं समस्त रोगों से मुक्ति।',
        fullLyricsSanskrit: `ततो युद्धपरिश्रान्तं समरे चिन्तया स्थितम्।
रावणं चाग्रतो दृष्ट्वा युद्धाय समुपस्थितम्॥१॥
दैवतैश्च समागम्य द्रष्टुमभ्यागतो रणम्।
उपागम्याब्रवीद्राममगस्त्यो भगवान् ऋषिः॥२॥
राम राम महाबाहो शृणु गुह्यं सनातनम्।
येन सर्वानरीन् वत्स समरे विजयिष्यसि॥३॥
आदित्यहृदयं पुण्यं सर्वशत्रुविनाशनम्।
जयावहं जपेन्नित्यमक्षयं परमं शिवम्॥४॥
सर्वमङ्गलमाङ्गल्यं सर्वपापप्रणाशनम्।
चिन्ताशोकप्रशमनमायुर्वर्धनमुत्तमम्॥५॥
रश्मिमन्तं समुद्यन्तं देवासुरनमस्कृतम्।
पूजयस्व विवस्वन्तं भास्करं भुवनेश्वरम्॥६॥`,
        hindiMeaning: 'अगस्त्य मुनि ने युद्ध में चिंतित श्री राम से कहा—हे राम! यह गुप्त आदित्य हृदय स्तोत्र सभी शत्रुओं का नाश करने वाला, विजय प्रदाता और परम कल्याणकारी है। उगते हुए भगवान सूर्य की स्तुति करो।',
        englishMeaning: 'Sage Agastya imparted this sacred hymn to Lord Rama on the battlefield to gain eternal victory over all adversities, illnesses, and enemies.'
      },
      {
        id: 'surya_gayatri',
        name: 'Surya Gayatri Mantra',
        nameHi: 'सूर्य गायत्री मंत्र (108 जप)',
        category: 'Mantra',
        categoryHi: 'मंत्र',
        frequency: '108 times daily on Rudraksha/Tulsi beads',
        frequencyHi: 'प्रतिदिन 108 बार रुद्राक्ष की माला पर',
        timing: 'Morning Brahma Muhurat or Sunrise',
        timingHi: 'प्रातः ब्रह्म मुहूर्त में',
        benefits: 'Removes eye problems, elevates social status, honors from father/government.',
        benefitsHi: 'नेत्र विकार, पिता से संबंध सुधार, सरकारी नौकरी में पदोन्नति।',
        fullLyricsSanskrit: 'ॐ भास्कराय विद्महे महाद्युतिकराय धीमहि। तन्नो सूर्यः प्रचोदयात्॥',
        hindiMeaning: 'हम परम प्रकाशमान भास्कर देव का ध्यान करते हैं। वे सूर्य देव हमारी बुद्धि को सत्य मार्ग पर प्रेरित करें।',
        englishMeaning: 'We meditate on the brilliant Sun deity. May He inspire and awaken our intellect.'
      }
    ],
    daanUpay: {
      items: ['Wheat (गेहूं)', 'Copper vessel (तांबे का पात्र)', 'Ruby / Red cloth', 'Jaggery (गुड़)', 'Red sandalwood (रक्त चंदन)'],
      itemsHi: ['गेहूं', 'तांबे का बर्तन', 'गुड़', 'लाल वस्त्र', 'रक्त चंदन'],
      day: 'Sunday afternoon',
      dayHi: 'रविवार दोपहर',
      recipient: 'Temple priest or needy student',
      recipientHi: 'योग्य ब्राह्मण या जरूरतमंद विद्यार्थी'
    },
    vratUpay: {
      name: 'Ravivar Vrat (Sunday Fast)',
      nameHi: 'रविवार व्रत (नमक रहित)',
      duration: '12 or 30 consecutive Sundays',
      procedure: 'Eat one meal of wheat/milk without salt before sunset.',
      procedureHi: 'सूर्यास्त से पहले बिना नमक का गेहूं का दलिया या हलवा ग्रहण करें।'
    },
    rudraksha: {
      mukhi: '1-Mukhi or 12-Mukhi Rudraksha',
      mukhiHi: '1 मुखी या 12 मुखी रुद्राक्ष',
      benefit: 'Bestows authority, cures heart/bone disorders, eliminates Pitru dosha.',
      benefitHi: 'प्रशासनिक पद, आत्मसम्मान, हृदय एवं अस्थि रोगों में रामबाण।'
    },
    yantra: {
      name: 'Surya Yantra',
      nameHi: 'सिद्ध सूर्य यंत्र',
      direction: 'East facing in home temple',
      directionHi: 'पूर्व दिशा की दीवार या पूजा स्थल में'
    }
  },

  Moon: {
    planet: 'Moon',
    planetHi: 'चंद्रमा (Chandra)',
    sanskritName: 'चंद्र महादशा',
    gemstone: {
      name: 'Natural Pearl (Moti)',
      nameHi: 'सच्चा मोती (Pearl)',
      secondaryGems: ['Moonstone (चंद्रकांत मणि)', 'White Coral'],
      secondaryGemsHi: ['चंद्रकांत मणि', 'सफेद मूंगा'],
      idealCarat: '4.25 to 7.25 Ratti',
      idealMetal: 'Pure Silver (शुद्ध चांदी)',
      idealMetalHi: 'शुद्ध चांदी',
      wearingFinger: 'Little finger (कनिष्ठिका) of right hand',
      wearingFingerHi: 'कनिष्ठिका (सबसे छोटी उंगली)',
      auspiciousDay: 'Monday evening during Shukla Paksha',
      auspiciousDayHi: 'शुक्ल पक्ष के सोमवार को संध्या समय',
      consecrationTime: 'Evening after Moonrise',
      consecrationTimeHi: 'शाम को चंद्र दर्शन के बाद',
      beejMantra: 'ॐ श्रां श्रीं श्रौं सः चंद्रमसे नमः',
      vedicMantra: 'ॐ इमं देवा असपत्नँ सुवध्वं महते क्षत्राय महते ज्येष्ठ्याय महते जानराज्यायेन्द्रस्येन्द्रियाय॥',
      japCount: 108,
      beneficLagnas: ['Cancer (कर्क)', 'Scorpio (वृश्चिक)', 'Pisces (मीन)', 'Aries (मेष)'],
      maleficLagnas: ['Capricorn (मकर)', 'Aquarius (कुंभ)', 'Taurus (वृषभ - if 6th/8th)', 'Gemini (मिथुन)'],
      incompatibleGems: ['Hessonite (Gomed)', 'Cat’s Eye (Lehsuniya)', 'Emerald (Panna - conditional)'],
      incompatibleGemsHi: ['गोमेद', 'लहसुनिया', 'नीलम (कुछ स्थितियों में)'],
      rulesSummary: 'Ideal for curing depression, anxiety, insomnia, and strengthening mother relationship.',
      rulesSummaryHi: 'मानसिक अशांति, अनिद्रा और डिप्रेशन में मोती चांदी में धारण करें।'
    },
    sacredPaths: [
      {
        id: 'shiva_panchakshara',
        name: 'Shiva Panchakshara Stotram',
        nameHi: 'श्री शिव पंचाक्षर स्तोत्रम्',
        category: 'Stotram',
        categoryHi: 'स्तोत्रम्',
        frequency: 'Daily 3 times in morning or evening',
        frequencyHi: 'प्रतिदिन प्रातः एवं संध्या 3 बार',
        timing: 'During Shiva Puja with milk abhishek',
        timingHi: 'शिवलिंग पर कच्चा दूध अर्पित करते हुए',
        benefits: 'Pacifies emotional turbulence, grants absolute mental clarity and peace.',
        benefitsHi: 'मानसिक शांति, तनाव मुक्ति, माता के स्वास्थ्य में सुधार।',
        fullLyricsSanskrit: `नागेन्द्रहाराय त्रिलोचनाय
भस्माङ्गरागाय महेश्वराय।
नित्याय शुद्धाय दिगम्बराय
तस्मै नकाराय नमः शिवाय॥१॥
मन्दाकिनीसलिलचन्दनचर्चिताय
नन्दीश्वरप्रमथनाथमहेश्वराय।
मन्दारपुष्पबहुपुष्पसुपूजिताय
तस्मै मकाराय नमः शिवाय॥२॥
शिवाय गौरीवदनाब्जवृन्द-
सूर्याय दक्षाध्वरनाशकाय।
श्रीनीलकण्ठाय वृषध्वजाय
तस्मै शिकाराय नमः शिवाय॥३॥`,
        hindiMeaning: 'सर्पों का हार धारण करने वाले, तीन नेत्रों वाले, भस्म रमाने वाले भगवान शिव के पंचाक्षर "न म शि वा य" स्वरूप को कोटि-कोटि प्रणाम।',
        englishMeaning: 'Salutations to Lord Shiva, the embodiment of the sacred five syllables Na-Ma-Shi-Va-Ya, who bestows supreme peace upon the mind.'
      },
      {
        id: 'chandra_kavach',
        name: 'Chandra Kavacham',
        nameHi: 'चंद्र कवचम्',
        category: 'Kavach',
        categoryHi: 'कवच',
        frequency: 'Every Monday 1 time',
        frequencyHi: 'प्रत्येक सोमवार को 1 बार',
        timing: 'Night facing the Moon',
        timingHi: 'रात्रि में चंद्रमा के सम्मुख',
        benefits: 'Shields from psychiatric illnesses, phobias, water dangers, and evil eye.',
        benefitsHi: 'भय, मानसिक दुर्बलता एवं नजर दोष से सुरक्षा।',
        fullLyricsSanskrit: 'ॐ शशिनं शीतलप्रख्यं सर्वसौभाग्यदायकम्। द्विजराजं नमस्कृत्य चंद्रकवचं प्रवक्ष्यामि॥',
        hindiMeaning: 'सर्व सौभाग्य प्रदाता शीतल चंद्रमा को नमन कर चंद्र कवच का पाठ करते हैं।',
        englishMeaning: 'The protective armor of the Moon that shields the mind from all illusions and vulnerabilities.'
      }
    ],
    daanUpay: {
      items: ['Rice (चावल)', 'Milk (दूध)', 'Silver (चांदी)', 'White sweets (सफेद मिठाई)', 'Sugar (मिश्री)'],
      itemsHi: ['चावल', 'दूध', 'चांदी का टुकड़ा', 'सफेद बर्फी/मिठाई', 'मिश्री'],
      day: 'Monday evening',
      dayHi: 'सोमवार संध्या',
      recipient: 'Elderly women, mother figure, or Shiva temple',
      recipientHi: 'माता समान वृद्ध स्त्री या शिव मंदिर'
    },
    vratUpay: {
      name: 'Somvar Vrat (Monday Fast)',
      nameHi: 'सोमवार व्रत',
      duration: '16 Mondays (Solah Somvar)',
      procedure: 'Fast with fruits and milk; worship Lord Shiva in Pradosha kaal.',
      procedureHi: 'दिनभर फलाहार रहकर प्रदोष काल में शिवजी की आरती व अर्चना करें।'
    },
    rudraksha: {
      mukhi: '2-Mukhi Rudraksha (Ardhanarishvara)',
      mukhiHi: '2 मुखी रुद्राक्ष (अर्धनारीश्वर)',
      benefit: 'Harmonizes marital relations, heals mental agony, enhances emotional maturity.',
      benefitHi: 'दांपत्य सुख, मानसिक संतुलन व एकाग्रता।'
    },
    yantra: {
      name: 'Chandra Yantra',
      nameHi: 'सिद्ध चंद्र यंत्र',
      direction: 'North-West (वायव्य कोण)',
      directionHi: 'उत्तर-पश्चिम दिशा'
    }
  },

  Mars: {
    planet: 'Mars',
    planetHi: 'मंगल (Mangala)',
    sanskritName: 'मंगल महादशा',
    gemstone: {
      name: 'Red Coral (Moonga)',
      nameHi: 'लाल मूंगा (Red Coral)',
      secondaryGems: ['Carnelian (अकीक)', 'Red Jasper'],
      secondaryGemsHi: ['लाल अकीक', 'रेड जैस्पर'],
      idealCarat: '5.25 to 8.25 Ratti',
      idealMetal: 'Gold, Copper, or Panchdhatu',
      idealMetalHi: 'तांबा, सोना या पंचधातु',
      wearingFinger: 'Ring finger (अनामिका) of right hand',
      wearingFingerHi: 'दाएं हाथ की अनामिका (रिंग फिंगर)',
      auspiciousDay: 'Tuesday morning during Shukla Paksha',
      auspiciousDayHi: 'शुक्ल पक्ष के मंगलवार प्रातःकाल',
      consecrationTime: 'Sunrise to 8:30 AM',
      consecrationTimeHi: 'सूर्योदय से 8:30 बजे तक',
      beejMantra: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः',
      vedicMantra: 'ॐ अग्निमूर्धा दिवः ककुत्पतिः पृथिव्या अयम्। अपाँ रेतांसि जिन्वति॥',
      japCount: 108,
      beneficLagnas: ['Aries (मेष)', 'Scorpio (वृश्चिक)', 'Cancer (कर्क - Yogakaraka)', 'Leo (सिंह - Yogakaraka)', 'Sagittarius (धनु)', 'Pisces (मीन)'],
      maleficLagnas: ['Gemini (मिथुन)', 'Virgo (कन्या)', 'Libra (तुला)', 'Taurus (वृषभ)'],
      incompatibleGems: ['Emerald (Panna)', 'Blue Sapphire (Neelam)', 'Diamond (Heera)'],
      incompatibleGemsHi: ['पन्ना', 'नीलम', 'हीरा'],
      rulesSummary: 'Exceptional for vitality, real estate acquisitions, surgery, defense, and blood health.',
      rulesSummaryHi: 'भूमि-मकान प्राप्ति, रक्त विकार और पराक्रम वृद्धि हेतु उत्तम। पन्ना के साथ न पहनें।'
    },
    sacredPaths: [
      {
        id: 'hanuman_chalisa',
        name: 'Hanuman Chalisa & Sundarkand',
        nameHi: 'श्री हनुमान चालीसा (7 या 11 पाठ) एवं सुंदरकांड',
        category: 'Chalisa',
        categoryHi: 'चालीसा / पाठ',
        frequency: 'Daily 7 times or every Tuesday/Saturday',
        frequencyHi: 'प्रतिदिन 7 बार अथवा मंगलवार को सुंदरकांड पाठ',
        timing: 'Morning or Evening before Hanuman ji with Jasmine oil diya',
        timingHi: 'चमेली के तेल का दीपक जलाकर सिंदूर अर्पित करते हुए',
        benefits: 'Eradicates Manglik Dosha, ghosts, fears, accidents, enemies, and debt (Rina).',
        benefitsHi: 'मांगलिक दोष शमन, भय, शत्रु, दुर्घटना और कर्ज से मुक्ति।',
        fullLyricsSanskrit: `श्रीगुरु चरन सरोज रज निज मनु मुकुरु सुधारि।
बरनउँ रघुबर बिमल जसु जो दायकु फल चारि॥
बुद्धिहीन तनु जानिके सुमिरौ पवन-कुमार।
बल बुद्धि बिद्या देहु मोहिं हरहु कलेस बिकार॥
जय हनुमान ज्ञान गुन सागर। जय कपीस तिहुँ लोक उजागर॥
राम दूत अतुलित बल धामा। अंजनि-पुत्र पवनसुत नामा॥
महाबीर बिक्रम बजरंगी। कुमति निवार सुमति के संगी॥
कंचन बरन बिराज सुबेसा। कानन कुंडल कुंचित केसा॥
भूत पिसाच निकट नहिं आवै। महाबीर जब नाम सुनावै॥
नासै रोग हरै सब पीरा। जपत निरंतर हनुमत बीरा॥`,
        hindiMeaning: 'पवनपुत्र श्री हनुमान जी के स्मरण मात्र से बल, बुद्धि और विद्या प्राप्त होती है तथा समस्त क्लेशों और रोगों का नाश हो जाता है।',
        englishMeaning: 'The 40 sacred verses of Hanuman Chalisa destroy all malevolent planetary afflictions, debts, and fears.'
      },
      {
        id: 'rina_mochana_mangal',
        name: 'Rina Mochana Mangala Stotram',
        nameHi: 'ऋण मोचक मंगल स्तोत्रम्',
        category: 'Stotram',
        categoryHi: 'स्तोत्रम्',
        frequency: 'Every Tuesday 3 times',
        frequencyHi: 'मंगलवार को 3 बार',
        timing: 'Morning facing South/East',
        timingHi: 'प्रातःकाल',
        benefits: 'Clears long-standing financial debts and loans quickly.',
        benefitsHi: 'भारी से भारी कर्ज से तत्काल मुक्ति।',
        fullLyricsSanskrit: 'मङ्गलो भूमिपुत्रश्च ऋणहर्ता धनप्रदः। स्थिरासनो महाकायः सर्वकर्मविरोधकः॥',
        hindiMeaning: 'भूमिपुत्र मंगल ऋणहर्ता और धन प्रदाता हैं, वे समस्त कर्जों का निवारण करें।',
        englishMeaning: 'Hymn to Mars for swift liberation from all financial debts and mortgages.'
      }
    ],
    daanUpay: {
      items: ['Red lentils (मसूर दाल)', 'Jaggery (गुड़)', 'Copper (तांबा)', 'Red cloth', 'Sweets/Batasha'],
      itemsHi: ['लाल मसूर की दाल', 'गुड़', 'तांबे का सिक्का', 'लाल बूंदी के लड्डू', 'सिंदूर'],
      day: 'Tuesday morning/afternoon',
      dayHi: 'मंगलवार दोपहर',
      recipient: 'Hanuman temple or laborers/soldiers',
      recipientHi: 'हनुमान मंदिर या सैनिक/मजदूर वर्ग'
    },
    vratUpay: {
      name: 'Mangalwar Vrat (Tuesday Fast)',
      nameHi: 'मंगलवार व्रत',
      duration: '21 Tuesdays',
      procedure: 'Consume only sweet food (Halwa/Jaggery roti) once a day without salt.',
      procedureHi: 'मीठा भोजन (गुड़ का हलवा या रोटी) एक समय बिना नमक के ग्रहण करें।'
    },
    rudraksha: {
      mukhi: '3-Mukhi Rudraksha (Agni Swaroop)',
      mukhiHi: '3 मुखी रुद्राक्ष (अग्नि स्वरूप)',
      benefit: 'Burns past sins, cleanses blood, provides energetic drive and self-worth.',
      benefitHi: 'आलस्य नाश, ऊर्जा, पराक्रम व रक्तचाप नियंत्रण।'
    },
    yantra: {
      name: 'Mangal Yantra',
      nameHi: 'सिद्ध मंगल यंत्र',
      direction: 'South (दक्षिण दिशा)',
      directionHi: 'दक्षिण दिशा में'
    }
  },

  Mercury: {
    planet: 'Mercury',
    planetHi: 'बुध (Budha)',
    sanskritName: 'बुध महादशा',
    gemstone: {
      name: 'Emerald (Panna)',
      nameHi: 'पन्ना (Emerald)',
      secondaryGems: ['Green Tourmaline (वेरिल)', 'Peridot (जबर्जद)', 'Green Onyx'],
      secondaryGemsHi: ['ग्रीन टूमलाइन', 'पेरिडॉट', 'हरा ओनिक्स'],
      idealCarat: '3.25 to 6.25 Ratti',
      idealMetal: 'Gold or Silver',
      idealMetalHi: 'सोना, चांदी या पंचधातु',
      wearingFinger: 'Little finger (कनिष्ठिका) of right hand',
      wearingFingerHi: 'कनिष्ठिका (सबसे छोटी उंगली)',
      auspiciousDay: 'Wednesday morning during Shukla Paksha',
      auspiciousDayHi: 'शुक्ल पक्ष के बुधवार को प्रातःकाल',
      consecrationTime: '7:00 AM to 9:00 AM',
      consecrationTimeHi: 'प्रातः 7:00 से 9:00 बजे',
      beejMantra: 'ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः',
      vedicMantra: 'ॐ उद्बुध्यस्वाग्ने प्रति जागृहि त्वमिष्टापूर्ते सं सृजेथामयं च। अस्मिन्त्सधस्थे अध्युत्तरस्मिन् विश्वे देवा यजमानश्च सीदत॥',
      japCount: 108,
      beneficLagnas: ['Taurus (वृषभ)', 'Gemini (मिथुन)', 'Virgo (कन्या)', 'Libra (तुला)', 'Capricorn (मकर)', 'Aquarius (कुंभ)'],
      maleficLagnas: ['Aries (मेष)', 'Cancer (कर्क)', 'Scorpio (वृश्चिक)', 'Pisces (मीन)'],
      incompatibleGems: ['Red Coral (Moonga)', 'Pearl (Moti)'],
      incompatibleGemsHi: ['मूंगा', 'मोती'],
      rulesSummary: 'Grants razor-sharp business acumen, speech mastery, CA/IT skills, and mathematical memory.',
      rulesSummaryHi: 'व्यापार, सीए, वकालत, शेयर बाजार और वाकपटुता हेतु सर्वश्रेष्ठ।'
    },
    sacredPaths: [
      {
        id: 'vishnu_sahasranama',
        name: 'Sri Vishnu Sahasranama Stotram',
        nameHi: 'श्री विष्णु सहस्रनाम स्तोत्रम्',
        category: 'Path',
        categoryHi: 'महास्तोत्र पाठ',
        frequency: 'Daily or every Wednesday/Thursday',
        frequencyHi: 'प्रतिदिन या प्रत्येक बुधवार को 1 पाठ',
        timing: 'Morning after bath before Tulsi or Vishnu idol',
        timingHi: 'प्रातःकाल तुलसी के सम्मुख या भगवान विष्णु के आगे',
        benefits: 'Supreme destroyer of Budha Dosha, speech defects, financial loss, and mental confusion.',
        benefitsHi: 'व्यापारिक वृद्धि, बुद्धि का विकास, वाणी दोष एवं सर्वग्रह शांति।',
        fullLyricsSanskrit: `शुक्लाम्बरधरं विष्णुं शशिवर्णं चतुर्भुजम्।
प्रसन्नवदनं ध्यायेत् सर्वविघ्नोपशान्तये॥
यस्य स्मरणमात्रेण जन्मसंसारबन्धनात्।
विमुच्यते नमस्तस्मै विष्णवे प्रभविष्णवे॥
ॐ विश्वं विष्णुर्वषट्कारो भूतभव्यभवत्प्रभुः।
भूतकृद्भूतभृद्भावो भूतात्मा भूतभावनः॥
पूतात्मा परमात्मा च मुक्तानां परमा गतिः।
अव्ययः पुरुषः साक्षी क्षेत्रज्ञोऽक्षर एव च॥`,
        hindiMeaning: 'भगवान विष्णु के 1000 परम पवित्र नामों का यह स्तोत्र समस्त संकटों का शमन कर जीवन में धन, यश, आरोग्य और मोक्ष प्रदान करता है।',
        englishMeaning: 'Chanting the 1,000 divine names of Lord Vishnu elevates consciousness, rectifies planetary afflictions of Mercury, and brings commercial prosperity.'
      },
      {
        id: 'ganapati_atharvashirsha',
        name: 'Ganapati Atharvashirsha Path',
        nameHi: 'श्री गणपति अथर्वशीर्षम्',
        category: 'Path',
        categoryHi: 'वैदिक पाठ',
        frequency: 'Daily 1 time or 11 times on Wednesday',
        frequencyHi: 'प्रतिदिन 1 बार या बुधवार को 11 बार',
        timing: 'Morning with Modak and Durva grass offering',
        timingHi: 'दूर्वा और मोदक अर्पित करते हुए',
        benefits: 'Unlocks sharp intellect, exams victory, removes all business obstacles.',
        benefitsHi: 'प्रतियोगी परीक्षा में सफलता, तीव्र बुद्धि, व्यापार में विघ्ननाश।',
        fullLyricsSanskrit: 'ॐ नमस्ते गणपतये। त्वमेव प्रत्यक्षं तत्त्वमसि। त्वमेव केवलं कर्तासि। त्वमेव केवलं धर्तासि। त्वमेव केवलं हर्तासि॥',
        hindiMeaning: 'हे गणेश जी! आप ही प्रत्यक्ष ब्रह्म तत्व हैं, आप ही इस सृष्टि के पालक और संहारक हैं।',
        englishMeaning: 'The Vedic Upanishadic hymn dedicated to Lord Ganesha for awakening the highest intellect and wisdom.'
      }
    ],
    daanUpay: {
      items: ['Whole green gram (साबुत मूंग)', 'Green cloth (हरा वस्त्र)', 'Spinach/Grass to cows', 'Bronze vessel', 'Green vegetables'],
      itemsHi: ['साबुत हरी मूंग की दाल', 'हरा वस्त्र', 'गाय को हरा चारा/पालक', 'कांस्य पात्र'],
      day: 'Wednesday morning',
      dayHi: 'बुधवार प्रातः',
      recipient: 'Cows (गौशाला), eunuchs (किन्नर), or poor students',
      recipientHi: 'गौ माता, किन्नर या गरीब विद्यार्थी'
    },
    vratUpay: {
      name: 'Budhwar Vrat (Wednesday Fast)',
      nameHi: 'बुधवार व्रत',
      duration: '7 or 21 Wednesdays',
      procedure: 'Worship Lord Ganesha and Lord Vishnu with green offerings.',
      procedureHi: 'गणेश जी को दूर्वा व मोदक चढ़ाकर दिन में एक बार बिना नमक का भोजन करें।'
    },
    rudraksha: {
      mukhi: '4-Mukhi or 10-Mukhi Rudraksha',
      mukhiHi: '4 मुखी या 10 मुखी रुद्राक्ष',
      benefit: 'Bestows sharp logic, public speaking power, coding/math skills.',
      benefitHi: 'वाणी सिद्धि, शिक्षा, स्मरण शक्ति व तार्किक बुद्धि।'
    },
    yantra: {
      name: 'Budha Yantra',
      nameHi: 'सिद्ध बुध यंत्र',
      direction: 'North (उत्तर दिशा - कुबेर स्थान)',
      directionHi: 'उत्तर दिशा (धन स्थान)'
    }
  },

  Jupiter: {
    planet: 'Jupiter',
    planetHi: 'बृहस्पति / गुरु (Guru)',
    sanskritName: 'बृहस्पति महादशा',
    gemstone: {
      name: 'Yellow Sapphire (Pukhraj)',
      nameHi: 'पुखराज (Yellow Sapphire)',
      secondaryGems: ['Yellow Topaz (सुनहला)', 'Citrine', 'Heliodor'],
      secondaryGemsHi: ['सुनहला (टोपाज)', 'सिट्रीन'],
      idealCarat: '4.25 to 7.25 Ratti',
      idealMetal: 'Gold (सोना) or Brass/Panchdhatu',
      idealMetalHi: 'शुद्ध सोना या पंचधातु',
      wearingFinger: 'Index finger (तर्जनी) of right hand',
      wearingFingerHi: 'तर्जनी (अंगूठे के पास वाली उंगली)',
      auspiciousDay: 'Thursday morning during Shukla Paksha',
      auspiciousDayHi: 'शुक्ल पक्ष के गुरुवार प्रातःकाल',
      consecrationTime: '6:15 AM to 8:30 AM',
      consecrationTimeHi: 'प्रातः 6:15 से 8:30 बजे तक',
      beejMantra: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः',
      vedicMantra: 'ॐ बृहस्पते अति यदर्यो अर्हाद् द्युमद्विभाति क्रतुमज्जनेषु। यद्दीदयच्छवस ऋतप्रजात तदस्मासु द्रविणं धेहि चित्रम्॥',
      japCount: 108,
      beneficLagnas: ['Aries (मेष)', 'Cancer (कर्क - Exalted)', 'Leo (सिंह)', 'Scorpio (वृश्चिक)', 'Sagittarius (धनु)', 'Pisces (मीन)'],
      maleficLagnas: ['Taurus (वृषभ)', 'Libra (तुला)', 'Capricorn (मकर - Debilitated)'],
      incompatibleGems: ['Diamond (Heera)', 'Blue Sapphire (Neelam)', 'Emerald (Panna - generally contraindicated)'],
      incompatibleGemsHi: ['हीरा', 'नीलम'],
      rulesSummary: 'Brings immense wisdom, high wealth, progeny, marriage for women, spiritual enlightenment, and judiciary favor.',
      rulesSummaryHi: 'कन्याओं के शीघ्र विवाह, संतान सुख, ज्ञान और अपार धन प्राप्ति हेतु। हीरा के साथ न पहनें।'
    },
    sacredPaths: [
      {
        id: 'guru_stotram',
        name: 'Brihaspati Stotram & Guru Paduka Stotram',
        nameHi: 'श्री बृहस्पति स्तोत्रम् एवं गुरु गीता पाठ',
        category: 'Stotram',
        categoryHi: 'स्तोत्रम्',
        frequency: 'Daily or every Thursday 3 times',
        frequencyHi: 'गुरुवार को 3 बार या प्रतिदिन',
        timing: 'Morning with Yellow flowers and Turmeric tilak',
        timingHi: 'पीले पुष्प और हल्दी का तिलक लगाकर',
        benefits: 'Blessings of Divine Guru, removal of marriage delays, top academic ranks.',
        benefitsHi: 'विवाह में आ रही बाधाएं दूर, संतान सुख, उच्च ज्ञान और भाग्य वृद्धि।',
        fullLyricsSanskrit: `गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः।
गुरुः साक्षात् परं ब्रह्म तस्मै श्रीगुरवे नमः॥
अखण्डमण्डलाकारं व्याप्तं येन चराचरम्।
तत्पदं दर्शितं येन तस्मै श्रीगुरवे नमः॥
देवानां च ऋषीणां च गुरुं काञ्चनसंनिभम्।
बुद्धिभूतं त्रिलोकेशं तं नमामि बृहस्पतिम्॥`,
        hindiMeaning: 'देवताओं और ऋषियों के पूज्य गुरु, स्वर्ण के समान कांतिमान, त्रिलोकी के बुद्धि प्रदाता देवगुरु बृहस्पति को मेरा कोटिशः नमन।',
        englishMeaning: 'Salutations to the supreme preceptor Jupiter who awakens the light of knowledge and dissolves ignorance.'
      }
    ],
    daanUpay: {
      items: ['Yellow gram dal (चने की दाल)', 'Turmeric (हल्दी)', 'Jaggery (गुड़)', 'Yellow cloth', 'Gold/Brass item', 'Religious books (धार्मिक ग्रंथ)'],
      itemsHi: ['चने की दाल', 'हल्दी की गांठ', 'गुड़', 'पीला वस्त्र', 'केसर', 'धार्मिक पुस्तकें'],
      day: 'Thursday morning',
      dayHi: 'गुरुवार प्रातः',
      recipient: 'Priests, teachers, grandfather, or Peepal/Banana tree',
      recipientHi: 'योग्य ब्राह्मण, शिक्षक, दादाजी या मंदिर'
    },
    vratUpay: {
      name: 'Brihaspativar Vrat (Thursday Fast)',
      nameHi: 'बृहस्पतिवार व्रत (पीला भोजन)',
      duration: '16 Thursdays',
      procedure: 'Worship Banana tree (कदली वृक्ष) and Lord Vishnu; eat yellow food without salt.',
      procedureHi: 'केले के वृक्ष की पूजा कर चने की दाल व गुड़ चढ़ाएं, पीले रंग का भोजन बिना नमक करें।'
    },
    rudraksha: {
      mukhi: '5-Mukhi Rudraksha (Pancha Brahma)',
      mukhiHi: '5 मुखी रुद्राक्ष',
      benefit: 'Supreme peace, liver health, high intellect, inner spiritual wisdom.',
      benefitHi: 'मानसिक शांति, ज्ञान, लीवर स्वास्थ्य व गुरु कृपा।'
    },
    yantra: {
      name: 'Guru Yantra',
      nameHi: 'सिद्ध गुरु यंत्र',
      direction: 'North-East (ईशान कोण - देव स्थान)',
      directionHi: 'उत्तर-पूर्व (ईशान कोण)'
    }
  },

  Venus: {
    planet: 'Venus',
    planetHi: 'शुक्र (Shukra)',
    sanskritName: 'शुक्र महादशा',
    gemstone: {
      name: 'Diamond (Heera) or White Opal',
      nameHi: 'हीरा / सफेद ओपल (Diamond / Opal)',
      secondaryGems: ['White Zircon (अमेरिकन डायमंड/जरकन)', 'White Sapphire'],
      secondaryGemsHi: ['सफेद जरकन', 'सफेद पुखराज'],
      idealCarat: 'Diamond (0.5 to 1.5 Carat) / Opal (5 to 8 Ratti)',
      idealMetal: 'Platinum, White Gold, or Silver',
      idealMetalHi: 'प्लेटिनम, सफेद सोना या शुद्ध चांदी',
      wearingFinger: 'Middle finger (मध्यमा) or Ring finger',
      wearingFingerHi: 'मध्यमा (बीच वाली) या अनामिका उंगली',
      auspiciousDay: 'Friday morning during Shukla Paksha',
      auspiciousDayHi: 'शुक्ल पक्ष के शुक्रवार प्रातःकाल',
      consecrationTime: 'Sunrise to 8:30 AM',
      consecrationTimeHi: 'प्रातः सूर्योदय समय',
      beejMantra: 'ॐ द्रां द्रीं द्रौं सः शुक्राय नमः',
      vedicMantra: 'ॐ अन्नात्परिस्रुतो रसं ब्रह्मणा व्यपिबत् क्षत्रं पयः सोमं प्रजापतिः। ऋतेन सत्यमिन्द्रियं विपानँ शुक्रमन्धस इन्द्रस्येन्द्रियमिदं पयोऽमृतं मधु॥',
      japCount: 108,
      beneficLagnas: ['Taurus (वृषभ)', 'Gemini (मिथुन)', 'Virgo (कन्या)', 'Libra (तुला)', 'Capricorn (मकर - Yogakaraka)', 'Aquarius (कुंभ - Yogakaraka)'],
      maleficLagnas: ['Aries (मेष)', 'Cancer (कर्क)', 'Leo (सिंह)', 'Scorpio (वृश्चिक)'],
      incompatibleGems: ['Ruby (Manikya)', 'Red Coral (Moonga)', 'Yellow Sapphire (Pukhraj)'],
      incompatibleGemsHi: ['माणिक्य', 'मूंगा', 'पुखराज'],
      rulesSummary: 'Attracts luxury cars, palatial homes, glamorous fame, romantic fulfillment, and sensual beauty.',
      rulesSummaryHi: 'वैवाहिक सुख, वैभव, वाहन, मीडिया, ग्लैमर और अपार ऐश्वर्य प्रदाता। माणिक्य या मूंगा के साथ न पहनें।'
    },
    sacredPaths: [
      {
        id: 'sri_suktam',
        name: 'Sri Suktam Path (Rigvedic)',
        nameHi: 'ऋग्वैदिक श्री सूक्तम् पाठ',
        category: 'Path',
        categoryHi: 'वैदिक सूक्त पाठ',
        frequency: 'Daily 1 time or 16 times on Friday',
        frequencyHi: 'प्रतिदिन 1 पाठ अथवा शुक्रवार को 16 पाठ',
        timing: 'Evening with Ghee lamp before Goddess Lakshmi',
        timingHi: 'संध्या समय माता महालक्ष्मी के सम्मुख गाय के घी का दीपक जलाकर',
        benefits: 'Infallible remedy for persistent poverty, debts, beauty enhancement, and luxury fulfillment.',
        benefitsHi: 'दरिद्रता का पूर्ण नाश, स्थिर लक्ष्मी, वैभव, आकर्षण और सुख-शांति।',
        fullLyricsSanskrit: `ॐ हिरण्यवर्णां हरिणीं सुवर्णरजतस्रजाम्।
चन्द्रां हिरण्मयीं लक्ष्मीं जातवेदो म आवह॥१॥
तां म आवह जातवेदो लक्ष्मीमनपगामिनीम्।
यस्यां हिरण्यं विन्देयं गामश्वं पुरुषानहम्॥२॥
अश्वपूर्वां रथमध्यां हस्तिनादप्रबोधिनीम्।
श्रियं देवीमुपह्वये श्रीर्मा देवी जुषताम्॥३॥
कांसोस्मि तां हिरण्यप्राकारामार्द्रां ज्वलन्तीं तृप्तां तर्पयन्तीम्।
पद्मे स्थितां पद्मवर्णां तामिहोपह्वये श्रियम्॥४॥
चन्द्रां प्रभासां यशसा ज्वलन्तीं श्रियं लोके देवजुष्टामुदाराम्।
तां पद्मिनीमीं शरणमहं प्रपद्येऽलक्ष्मीर्मे नश्यतां त्वां वृणे॥५॥`,
        hindiMeaning: 'हे अग्निदेव! सुवर्ण और रजत के समान कांति वाली, चंद्रमुखी, स्थिर लक्ष्मी को मेरे गृह में स्थापित करें ताकि कभी दरिद्रता न आए।',
        englishMeaning: 'The sacred hymn from the Rigveda invoking Goddess Mahalakshmi to bestow unending wealth, grace, and abundance.'
      },
      {
        id: 'kanakadhara',
        name: 'Kanakadhara Stotram',
        nameHi: 'कनकधारा स्तोत्रम् (आदि शंकराचार्य कृत)',
        category: 'Stotram',
        categoryHi: 'स्तोत्रम्',
        frequency: 'Every Friday morning',
        frequencyHi: 'शुक्रवार प्रातःकाल',
        timing: 'Morning with white flower offering',
        timingHi: 'सफेद कमल या सुगंधित पुष्प अर्पित करते हुए',
        benefits: 'Miraculous sudden showers of gold/wealth and financial blockages removal.',
        benefitsHi: 'अचानक धन लाभ और आर्थिक संकटों का त्वरित निवारण।',
        fullLyricsSanskrit: 'अङ्गं हरेः पुलकभूषणमाश्रयन्ती भृङ्गाङ्गनेव मुकुलाभरणं तमालम्। अङ्गीकृताखिलविभूतिरपाङ्गलीला माङ्गल्यदास्तु मम मङ्गलदेवतायाः॥',
        hindiMeaning: 'भगवान श्रीहरि के वक्षस्थल पर सुशोभित होने वाली माता लक्ष्मी मुझ पर अपनी कृपादृष्टि की वर्षा करें।',
        englishMeaning: 'Adi Shankaracharya’s hymn that caused a shower of golden gooseberries to liberate a poor woman from poverty.'
      }
    ],
    daanUpay: {
      items: ['White silk cloth (रेशमी वस्त्र)', 'Ghee (शुद्ध घी)', 'Curd/Kheer (खीर/दही)', 'Fragrances/Perfume (इत्र)', 'Silver or Sugar'],
      itemsHi: ['सफेद रेशमी वस्त्र', 'गाय का शुद्ध घी', 'चावल की खीर', 'इत्र', 'चांदी', 'मिश्री'],
      day: 'Friday evening',
      dayHi: 'शुक्रवार संध्या',
      recipient: 'Young girls (कन्याएं), married women, or temple',
      recipientHi: 'छोटी कन्याएं या सुहागिन स्त्रियां'
    },
    vratUpay: {
      name: 'Shukrawar Santoshi Mata / Lakshmi Vrat',
      nameHi: 'शुक्रवार वैभव लक्ष्मी / संतोषी माता व्रत',
      duration: '11 or 21 Fridays',
      procedure: 'Eat sweet kheer; strictly avoid sour food (खटाई वर्जित).',
      procedureHi: 'खटाई का पूर्ण त्याग करें, खीर का भोग लगाकर कन्याओं को खिलाएं।'
    },
    rudraksha: {
      mukhi: '6-Mukhi or 13-Mukhi Rudraksha (Kamadeva)',
      mukhiHi: '6 मुखी या 13 मुखी रुद्राक्ष',
      benefit: 'Magnetic charisma, marital romance, hormonal balance, artistic success.',
      benefitHi: 'आकर्षण, दांपत्य सुख, सौंदर्य व कलात्मक सफलता।'
    },
    yantra: {
      name: 'Shukra Yantra / Sri Yantra',
      nameHi: 'श्री यंत्र / सिद्ध शुक्र यंत्र',
      direction: 'South-East (आग्नेय कोण)',
      directionHi: 'दक्षिण-पूर्व दिशा'
    }
  },

  Saturn: {
    planet: 'Saturn',
    planetHi: 'शनि (Shani)',
    sanskritName: 'शनि महादशा / साढ़े साती',
    gemstone: {
      name: 'Blue Sapphire (Neelam) or Amethyst (Jamuniya)',
      nameHi: 'नीलम / जमुनिया (Blue Sapphire / Amethyst)',
      secondaryGems: ['Amethyst (कटैला/जमुनिया)', 'Blue Topaz', 'Iolite (नीली)'],
      secondaryGemsHi: ['जमुनिया (Amethyst)', 'नीली (Iolite)', 'ब्लू टोपाज'],
      idealCarat: '4.25 to 7.25 Ratti (Always trial for 3 days under pillow)',
      idealMetal: 'Panchdhatu, Iron, White Gold, or Silver',
      idealMetalHi: 'पंचधातु, लोहा, सफेद सोना या चांदी',
      wearingFinger: 'Middle finger (मध्यमा - Saturn’s finger)',
      wearingFingerHi: 'दाएं हाथ की मध्यमा (बीच की बड़ी उंगली)',
      auspiciousDay: 'Saturday evening after Sunset',
      auspiciousDayHi: 'शुक्ल पक्ष के शनिवार को सूर्यास्त के बाद',
      consecrationTime: 'Post-sunset / Twilight (संध्या 7:00 - 8:30 PM)',
      consecrationTimeHi: 'सूर्यास्त के बाद संध्या समय',
      beejMantra: 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः',
      vedicMantra: 'ॐ शं नो देवीरभिष्टये आपो भवन्तु पीतये। शं योरभि स्रवन्तु नः॥',
      japCount: 108,
      beneficLagnas: ['Taurus (वृषभ - Yogakaraka)', 'Libra (तुला - Yogakaraka)', 'Capricorn (मकर - Own)', 'Aquarius (कुंभ - Own)', 'Gemini (मिथुन)'],
      maleficLagnas: ['Aries (मेष - Debilitated)', 'Cancer (कर्क)', 'Leo (सिंह - Bitter Enemy)', 'Scorpio (वृश्चिक)'],
      incompatibleGems: ['Ruby (Manikya)', 'Pearl (Moti)', 'Red Coral (Moonga)', 'Yellow Sapphire (Pukhraj - for certain Lagnas)'],
      incompatibleGemsHi: ['माणिक्य', 'मोती', 'मूंगा'],
      rulesSummary: 'Extreme caution: Must test Neelam for 3 nights. Bestows unmatched political power, industry empire, and karmic elevation.',
      rulesSummaryHi: 'सावधानी: नीलम पहनने से पहले 3 दिन तक तकिये के नीचे रखकर परीक्षण अवश्य करें।'
    },
    sacredPaths: [
      {
        id: 'dasharatha_shani',
        name: 'Dasharatha Krit Shani Stotram',
        nameHi: 'दशरथ कृत शनि स्तोत्रम् (परम चमत्कारी)',
        category: 'Stotram',
        categoryHi: 'स्तोत्रम्',
        frequency: 'Every Saturday 3 or 11 times in evening',
        frequencyHi: 'प्रत्येक शनिवार को संध्या समय 3 या 11 बार',
        timing: 'Evening under Peepal tree with Mustard oil lamp (दीपक)',
        timingHi: 'पीपल के वृक्ष के नीचे सरसों के तेल का दीपक जलाकर',
        benefits: 'Guaranteed divine shield against Shani Sade Sati, Dhaiya, bone diseases, legal battles, and paralyzing delays.',
        benefitsHi: 'शनि साढ़े साती, ढैय्या, असाध्य रोग, कोर्ट कचहरी व गंभीर बाधाओं से अचूक रक्षा।',
        fullLyricsSanskrit: `नमः कृष्णाय नीलाय शितिकण्ठनिभाय च।
नमः कालाग्निरूपाय कृतान्ताय च वै नमः॥१॥
नमो निर्मांसदेहाय दीर्घश्मश्रुजटाय च।
नमो विशालनेत्राय शुष्कोदर भयाकृते॥२॥
नमः पुष्कलगात्राय स्थूलरोम्णेऽथ वै नमः।
नमो दीर्घाय शुष्काय कालदंष्ट्र नमोऽस्तु ते॥३॥
नमस्ते कोटराक्षाय दुर्निरीक्ष्याय वै नमः।
नमो घोराय रौद्राय भीषणाय कपालिने॥४॥
प्रसीद मे महासौरे सर्वारिष्टविनाशन।
दशरथेन कृतं स्तोत्रं यः पठेच्छृणुयादपि।
न तस्य जायते पीडा सौरेर्दुःखादि सम्भवा॥५॥`,
        hindiMeaning: 'राजा दशरथ द्वारा रचित इस स्तोत्र से शनिदेव अत्यंत प्रसन्न होते हैं। जो इसका पाठ करता है, उसे शनि जनित कोई कष्ट नहीं होता।',
        englishMeaning: 'King Dasharatha’s hymn that pacified Lord Saturn instantly during Rohini Shakata Bhedana, granting complete protection to all devotees.'
      },
      {
        id: 'mahamrityunjaya',
        name: 'Maha Mrityunjaya Mantra Jaap',
        nameHi: 'महामृत्युंजय मंत्र (108 जप)',
        category: 'Mantra',
        categoryHi: 'महामंत्र',
        frequency: 'Daily 108 times',
        frequencyHi: 'प्रतिदिन 108 बार',
        timing: 'Morning or Evening with Rudraksha mala',
        timingHi: 'रुद्राक्ष की माला पर',
        benefits: 'Defeats untimely death (Akal Mrityu), chronic diseases, depression, and critical planetary transits.',
        benefitsHi: 'अकाल मृत्यु से रक्षा, असाध्य रोगों का नाश और दीर्घायु।',
        fullLyricsSanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्॥',
        hindiMeaning: 'हम त्रिनेत्रधारी सुगंधित भगवान शिव की वंदना करते हैं जो जीवन को पुष्ट करते हैं। जैसे ककड़ी डाली से मुक्त होती है, वैसे ही हमें मृत्यु से मुक्त कर अमृतत्व दें।',
        englishMeaning: 'The supreme life-giving mantra conquering all physical afflictions, accidents, and mortal dangers.'
      }
    ],
    daanUpay: {
      items: ['Black sesame seeds (काले तिल)', 'Mustard oil (सरसों का तेल - छाया दान)', 'Iron pan/utensil (लोहा)', 'Black blanket/shoes', 'Black urad dal'],
      itemsHi: ['सरसों के तेल में अपना चेहरा देखकर छाया दान', 'काले तिल', 'काली उड़द', 'लोहे का तवा/चिमटा', 'काले जूते/कंबल'],
      day: 'Saturday evening',
      dayHi: 'शनिवार शाम',
      recipient: 'Sanitation workers, disabled/poor people, or Shani temple',
      recipientHi: 'सफाई कर्मचारी, दिव्यांग, निर्धन व्यक्ति या शनि मंदिर'
    },
    vratUpay: {
      name: 'Shanivar Vrat (Saturday Fast)',
      nameHi: 'शनिवार व्रत एवं पीपल परिक्रमा',
      duration: '7, 19 or 51 Saturdays',
      procedure: 'Water Peepal tree in morning; light mustard oil lamp in evening; eat khichdi of black urad.',
      procedureHi: 'प्रातः पीपल को जल दें, संध्या को दीपक लगाएं और काली उड़द की खिचड़ी का सेवन करें।'
    },
    rudraksha: {
      mukhi: '7-Mukhi (Mahalakshmi) or 14-Mukhi Rudraksha (Deva Mani)',
      mukhiHi: '7 मुखी या 14 मुखी रुद्राक्ष',
      benefit: 'Nullifies all Saturn karmic punishments, clears immense debts, bestows stability.',
      benefitHi: 'शनि पीड़ा से मुक्ति, अकूत धन संपदा, स्थिरता व मान-सम्मान।'
    },
    yantra: {
      name: 'Shani Yantra',
      nameHi: 'सिद्ध शनि यंत्र',
      direction: 'West (पश्चिम दिशा - शनि का स्थान)',
      directionHi: 'पश्चिम दिशा'
    }
  },

  Rahu: {
    planet: 'Rahu',
    planetHi: 'राहु (Rahu)',
    sanskritName: 'राहु महादशा / कालसर्प दोष',
    gemstone: {
      name: 'Hessonite Garnet (Gomed)',
      nameHi: 'गोमेद (Hessonite Garnet)',
      secondaryGems: ['Honey-colored Zircon', 'Brown Tourmaline'],
      secondaryGemsHi: ['शहद रंग का जरकन'],
      idealCarat: '5.25 to 8.25 Ratti',
      idealMetal: 'Silver (चांदी) or Ashtadhatu (अष्टधातु)',
      idealMetalHi: 'चांदी या अष्टधातु',
      wearingFinger: 'Middle finger (मध्यमा) of right hand',
      wearingFingerHi: 'मध्यमा (बीच की उंगली)',
      auspiciousDay: 'Saturday night or Wednesday night',
      auspiciousDayHi: 'शुक्ल पक्ष के शनिवार या बुधवार की रात्रि',
      consecrationTime: 'Night time after 8:30 PM',
      consecrationTimeHi: 'रात्रि 8:30 बजे के बाद',
      beejMantra: 'ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः',
      vedicMantra: 'ॐ कया नश्चित्र आ भुवदूती सदावृधः सखा। कया शचिष्ठया वृता॥',
      japCount: 108,
      beneficLagnas: ['Taurus (वृषभ)', 'Gemini (मिथुन)', 'Virgo (कन्या)', 'Libra (तुला)', 'Capricorn (मकर)', 'Aquarius (कुंभ)'],
      maleficLagnas: ['Aries (मेष)', 'Cancer (कर्क)', 'Leo (सिंह)', 'Scorpio (वृश्चिक)', 'Sagittarius (धनु)'],
      incompatibleGems: ['Ruby (Manikya)', 'Pearl (Moti)', 'Red Coral (Moonga)', 'Yellow Sapphire (Pukhraj)'],
      incompatibleGemsHi: ['माणिक्य', 'मोती', 'मूंगा', 'पुखराज'],
      rulesSummary: 'Gives sudden millions, foreign opportunities, viral fame, and tech dominance. Must be tested before wearing.',
      rulesSummaryHi: 'अचानक धन लाभ, विदेश यात्रा, राजनीति और तकनीकी क्षेत्र में सफलता। माणिक्य/मोती के साथ न पहनें।'
    },
    sacredPaths: [
      {
        id: 'durga_saptashati_argala',
        name: 'Durga Saptashati (Argala & Kilak Path)',
        nameHi: 'श्री दुर्गा सप्तशती (अर्गला एवं कीलक स्तोत्र पाठ)',
        category: 'Path',
        categoryHi: 'महापाठ',
        frequency: 'Daily or every Ashtami/Navami/Wednesday',
        frequencyHi: 'प्रतिदिन या अष्टमी/नवमी व बुधवार को',
        timing: 'Evening with Red flower & Camphor aarti',
        timingHi: 'लाल पुष्प व कपूर की आरती के साथ',
        benefits: 'Pacifies Rahu illusions, removes black magic/evil eye, Kaal Sarp Dosha, and litigation.',
        benefitsHi: 'राहु के भ्रम, कालसर्प दोष, ऊपरी बाधा, षड्यंत्र और मुकदमों से अचूक रक्षा।',
        fullLyricsSanskrit: `जयन्ती मङ्गला काली भद्रकाली कपालिनी।
दुर्गा क्षमा शिवा धात्री स्वाहा स्वधा नमोऽस्तु ते॥
जय त्वं देवि चामुण्डे जय भूतार्तिहारिणी।
जय सर्वगते देवि कालरात्रि नमोऽस्तु ते॥
मधुकैटभविद्रावि विधातृवरदे नमः।
रूपं देहि जयं देहि यशो देहि द्विषो जहि॥
महिषासुरनिर्णाशि भक्तानां सुखदे नमः।
रूपं देहि जयं देहि यशो देहि द्विषो जहि॥`,
        hindiMeaning: 'हे भगवती चामुंडे! आप कालरात्रि हैं, आप ही मधु-कैटभ का नाश करने वाली हैं। मुझे रूप दें, जय दें, यश दें और शत्रुओं का नाश करें।',
        englishMeaning: 'The potent invocation to Goddess Durga in Durga Saptashati to obliterate demonic planetary forces and grant victory.'
      },
      {
        id: 'kaal_bhairav_ashtakam',
        name: 'Kaal Bhairav Ashtakam',
        nameHi: 'श्री कालभैरवाष्टकम्',
        category: 'Stotram',
        categoryHi: 'स्तोत्रम्',
        frequency: 'Every Tuesday/Saturday night',
        frequencyHi: 'मंगलवार या शनिवार रात्रि',
        timing: 'Night facing South with Mustard oil diya',
        timingHi: 'रात्रि में दक्षिण मुख होकर सरसों के तेल का दीपक जलाकर',
        benefits: 'Instant removal of psychic fear, insomnia, fear of ghosts, and Rahu toxicity.',
        benefitsHi: 'भय, मानसिक भ्रम, अनिद्रा और राहु के दुष्प्रभाव का समूल नाश।',
        fullLyricsSanskrit: 'देवराजसेव्यमानपावनाङ्घ्रिपङ्कजं व्यालयज्ञसूत्रमिन्दुशेखरं कृपाकरम्। नारदादियोगिवृन्दवन्दितं दिगम्बरं काशिकापुराधिनाथकालभैरवं भजे॥',
        hindiMeaning: 'काशी के अधिपति भगवान कालभैरव जिनकी चरण वंदना देवराज इंद्र करते हैं, वे मेरे समस्त भय का नाश करें।',
        englishMeaning: 'Hymn to Lord Kaal Bhairav, the fierce lord of time who dissolves all dark delusions and negative karma.'
      }
    ],
    daanUpay: {
      items: ['7 Mixed grains (सतनाजा)', 'Black/Blue blanket', 'Lead metal (सिक्का)', 'Mustard/Radish (मूली)', 'Coconut in flowing water'],
      itemsHi: ['सतनाजा (7 प्रकार के मिश्रित अनाज)', 'नीला या काला कंबल', 'जटा वाला नारियल बहते जल में प्रवाहित करना', 'मूली'],
      day: 'Saturday night or Wednesday sunset',
      dayHi: 'शनिवार संध्या या बुधवार रात्रि',
      recipient: 'Feed birds (पक्षियों को सतनाजा), leprosy patients, or dogs',
      recipientHi: 'पक्षियों को 7 अनाज, कुष्ठ रोगी या काले कुत्ते'
    },
    vratUpay: {
      name: 'Rahu Shanti Vrat / Bhairav Upasana',
      nameHi: 'कालभैरव उपासना एवं बुधवार व्रत',
      duration: '18 Wednesdays or Saturdays',
      procedure: 'Feed street dogs with sweet roti; chant Rahu Stotram.',
      procedureHi: 'काले कुत्ते को सरसों के तेल से चुपड़ी रोटी खिलाएं।'
    },
    rudraksha: {
      mukhi: '8-Mukhi Rudraksha (Ganesha Swaroop)',
      mukhiHi: '8 मुखी रुद्राक्ष (गणेश स्वरूप)',
      benefit: 'Clears Kaal Sarp Dosha, destroys sudden blockages, unlocks speculative wealth.',
      benefitHi: 'कालसर्प दोष निवारण, अचानक संकटों से मुक्ति, शेयर व लॉटरी में लाभ।'
    },
    yantra: {
      name: 'Rahu Yantra',
      nameHi: 'सिद्ध राहु यंत्र',
      direction: 'South-West (नैऋत्य कोण - राहु का स्थान)',
      directionHi: 'दक्षिण-पश्चिम (नैऋत्य कोण)'
    }
  },

  Ketu: {
    planet: 'Ketu',
    planetHi: 'केतु (Ketu)',
    sanskritName: 'केतु महादशा / मोक्ष मार्ग',
    gemstone: {
      name: 'Cat’s Eye (Lehsuniya / Vaidurya)',
      nameHi: 'लहसुनिया / वैदूर्य (Cat’s Eye)',
      secondaryGems: ['Tiger Eye', 'Chrysoberyl'],
      secondaryGemsHi: ['टाइगर आई'],
      idealCarat: '4.25 to 7.25 Ratti',
      idealMetal: 'Silver, Panchdhatu, or White Gold',
      idealMetalHi: 'चांदी या पंचधातु',
      wearingFinger: 'Middle or Ring finger of right hand',
      wearingFingerHi: 'मध्यमा या अनामिका उंगली',
      auspiciousDay: 'Tuesday or Thursday night during Shukla Paksha',
      auspiciousDayHi: 'शुक्ल पक्ष के मंगलवार या गुरुवार की रात',
      consecrationTime: 'Post-sunset / Night',
      consecrationTimeHi: 'रात्रि काल',
      beejMantra: 'ॐ स्रां स्रीं स्रौं सः केतवे नमः',
      vedicMantra: 'ॐ केतुं कृण्वन्नकेतवे पेशो मर्या अपेशसे। समुषद्भिरजायथाः॥',
      japCount: 108,
      beneficLagnas: ['Aries (मेष)', 'Sagittarius (धनु)', 'Pisces (मीन)', 'Scorpio (वृश्चिक)'],
      maleficLagnas: ['Taurus (वृषभ)', 'Gemini (मिथुन)', 'Virgo (कन्या)'],
      incompatibleGems: ['Ruby (Manikya)', 'Pearl (Moti)', 'Emerald (Panna)'],
      incompatibleGemsHi: ['माणिक्य', 'मोती', 'पन्ना'],
      rulesSummary: 'Protects from hidden enemies, viral infections, spiritual awakening, and astral mastery.',
      rulesSummaryHi: 'अज्ञात शत्रुओं से रक्षा, मोक्ष, गुप्त विद्या और आध्यात्मिक सिद्धि प्रदाता।'
    },
    sacredPaths: [
      {
        id: 'ganesha_sankata_nashana',
        name: 'Ganesha Sankata Nashana Stotram',
        nameHi: 'संकटनाशन गणेश स्तोत्रम् (नारद पुराण)',
        category: 'Stotram',
        categoryHi: 'स्तोत्रम्',
        frequency: 'Daily 3 times in morning',
        frequencyHi: 'प्रतिदिन प्रातः 3 बार',
        timing: 'Morning with Ganesha puja',
        timingHi: 'गणेश जी के आगे दीपक जलाकर',
        benefits: 'Destroys all sudden catastrophes, surgical complications, and Ketu detachment shocks.',
        benefitsHi: 'समस्त संकटों का त्वरित नाश, गुप्त शत्रुओं से रक्षा, मोक्ष मार्ग प्रशस्त।',
        fullLyricsSanskrit: `प्रणम्य शिरसा देवं गौरीपुत्रं विनायकम्।
भक्तावासं स्मरेन्नित्यमायुःकामार्थसिद्धये॥१॥
प्रथमं वक्रतुण्डं च एकदन्तं द्वितीयकम्।
तृतीयं कृष्णपिङ्गाक्षं गजवक्त्रं चतुर्थकम्॥२॥
लम्बोदरं पञ्चमं च षष्ठं विकटमेव च।
सप्तमं विघ्नराजेन्द्रं धूम्रवर्णं तथाष्टमम्॥३॥
नवमं भालचन्द्रं च दशमं तु विनायकम्।
एकादशं गणपतिं द्वादशं तु गजाननम्॥४॥
द्वादशैतानि नामानि त्रिसंध्यं यः पठेन्नरः।
न च विघ्नभयं तस्य सर्वसिद्धिकरं परम्॥५॥`,
        hindiMeaning: 'भगवान गणेश के इन 12 नामों का जो तीनों कालों में पाठ करता है, उसे किसी भी प्रकार के विघ्न का भय नहीं रहता और समस्त सिद्धियां प्राप्त होती हैं।',
        englishMeaning: 'The 12 divine names of Lord Ganesha from Narada Purana destroying all obstacles, calamities, and malefic effects of Ketu.'
      }
    ],
    daanUpay: {
      items: ['Black and white sesame (काले-सफेद तिल)', 'Two-colored blanket (दो-रंग का कंबल)', 'Mustard seeds', 'Bananas to street dogs / monkeys', 'Sour food/Lemon'],
      itemsHi: ['चितकबरा या दोरंगी कंबल', 'काले-सफेद तिल', 'स्ट्रीट डॉग्स को भोजन', 'नींबू'],
      day: 'Tuesday night or Thursday evening',
      dayHi: 'मंगलवार रात्रि या गुरुवार संध्या',
      recipient: 'Spiritual ascetics (साधु-संत), or street dogs',
      recipientHi: 'साधु, संन्यासी या बेसहारा कुत्ते'
    },
    vratUpay: {
      name: 'Ketu Shanti Ganesh Vrat',
      nameHi: 'गणेश चतुर्थी व्रत एवं केतु शांति',
      duration: 'Sankashti Chaturthi every month',
      procedure: 'Fast till Moonrise on Chaturthi; worship Lord Ganesha with Modak.',
      procedureHi: 'संकष्टी चतुर्थी को चंद्रोदय तक व्रत रखकर गणेश जी को मोदक चढ़ाएं।'
    },
    rudraksha: {
      mukhi: '9-Mukhi Rudraksha (Navadurga Swaroop)',
      mukhiHi: '9 मुखी रुद्राक्ष (मां भगवती स्वरूप)',
      benefit: 'Bestows fearlessness, spiritual intuition, cures neurological issues.',
      benefitHi: 'निर्भयता, आध्यात्मिक अंतर्ज्ञान, गुप्त रोग व तंत्र बाधा निवारण।'
    },
    yantra: {
      name: 'Ketu Yantra',
      nameHi: 'सिद्ध केतु यंत्र',
      direction: 'North-West or Temple (वायव्य कोण)',
      directionHi: 'वायव्य कोण या पूजा घर'
    }
  }
};
