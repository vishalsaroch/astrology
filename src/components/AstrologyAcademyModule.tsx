import React, { useState } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import {
  ASTROLOGY_MODULES,
  ASTROLOGY_LESSONS,
  ASTROLOGY_QUIZ_QUESTIONS,
  AstroLesson
} from '../data/astrologyLessons';
import {
  BookOpen,
  Sparkles,
  Compass,
  Eye,
  Clock,
  Crown,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Award,
  ChevronRight,
  ArrowLeft,
  RotateCcw,
  Star,
  Search,
  BookMarked
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles,
  Compass,
  Eye,
  Clock,
  Crown,
  ShieldCheck
};

interface AstrologyAcademyModuleProps {
  onNavigateToDashaRemedies?: () => void;
  onNavigateToKundli?: () => void;
}

export const AstrologyAcademyModule: React.FC<AstrologyAcademyModuleProps> = ({
  onNavigateToDashaRemedies,
  onNavigateToKundli
}) => {
  const { language } = useTranslation();
  const isHi = language === 'hi';

  const [activeTab, setActiveTab] = useState<'curriculum' | 'quiz' | 'chart-practice'>('curriculum');
  const [selectedModuleId, setSelectedModuleId] = useState<string>('all');
  const [selectedLesson, setSelectedLesson] = useState<AstroLesson | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [userNameForCert, setUserNameForCert] = useState<string>('Vedic Scholar');

  const filteredLessons = ASTROLOGY_LESSONS.filter(lesson => {
    const matchesModule = selectedModuleId === 'all' || lesson.moduleId === selectedModuleId;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      lesson.title.toLowerCase().includes(query) ||
      lesson.titleHi.toLowerCase().includes(query) ||
      lesson.summary.toLowerCase().includes(query) ||
      lesson.summaryHi.toLowerCase().includes(query);
    return matchesModule && matchesSearch;
  });

  const handleAnswerOption = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === ASTROLOGY_QUIZ_QUESTIONS[currentQuestionIndex].correctIndex) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < ASTROLOGY_QUIZ_QUESTIONS.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-950/80 via-stone-900 to-stone-950 border border-amber-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute -right-10 -top-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{isHi ? 'वैदिक ज्योतिष गुरुकुल' : 'Vedic Astrology Gurukul'}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-cinzel text-amber-100 tracking-wide">
              {isHi ? 'ज्योतिष सीखें एवं भविष्य फल विद्या' : 'Learn Astrology & Future Predictions'}
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm max-w-2xl mt-2 leading-relaxed">
              {isHi
                ? 'कुंडली पढ़ना, 12 भाव, नवग्रह, विंशोत्तरी महादशा, गोचर, राजयोग एवं सटीक भविष्यवाणी की प्रामाणिक विधियां सीखें।'
                : 'Master Kundli reading, planetary dignities, 12 Bhavas, Vimshottari dasha timing, Raja Yogas, and real-world predictive methods.'}
            </p>
          </div>

          {/* Quick Action Navigation */}
          <div className="flex flex-wrap items-center gap-3">
            {onNavigateToDashaRemedies && (
              <button
                onClick={onNavigateToDashaRemedies}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 text-stone-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 hover:brightness-110 transition-all flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isHi ? 'दशा रत्न व पाठ गाइड' : 'Dasha Gemstones & Paths'}</span>
              </button>
            )}
            {onNavigateToKundli && (
              <button
                onClick={onNavigateToKundli}
                className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>{isHi ? 'मेरी जन्म कुंडली' : 'My Birth Chart'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-8 border-b border-stone-800 pt-2">
          {[
            { id: 'curriculum', label: isHi ? 'पाठ्यक्रम एवं अध्याय' : 'Curriculum & Lessons', icon: BookOpen },
            { id: 'quiz', label: isHi ? 'ज्ञान परीक्षा एवं प्रमाणपत्र' : 'Quiz & Certification', icon: Award },
            { id: 'chart-practice', label: isHi ? 'भविष्य कथन नियम सूत्र' : 'Prediction Formulas', icon: Eye }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setSelectedLesson(null);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all ${
                  isActive
                    ? 'border-amber-400 text-amber-300 bg-amber-500/10'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* VIEW 1: CURRICULUM & LESSONS */}
      {activeTab === 'curriculum' && (
        <div className="space-y-8">
          {/* If a lesson is actively selected, show full reader view */}
          {selectedLesson ? (
            <div className="bg-stone-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6">
              <button
                onClick={() => setSelectedLesson(null)}
                className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{isHi ? 'वापस सभी अध्यायों पर जाएं' : 'Back to All Lessons'}</span>
              </button>

              <div className="space-y-2 border-b border-stone-800 pb-6">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {selectedLesson.level}
                  </span>
                  <span className="text-xs text-stone-400">{selectedLesson.readTime}</span>
                </div>
                <h2 className="text-xl sm:text-3xl font-extrabold font-cinzel text-amber-200">
                  {isHi ? selectedLesson.titleHi : selectedLesson.title}
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {isHi ? selectedLesson.summaryHi : selectedLesson.summary}
                </p>
              </div>

              {/* Key Takeaways Card */}
              <div className="bg-amber-950/30 border border-amber-500/20 rounded-2xl p-4 sm:p-6 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>{isHi ? 'मुख्य सूत्र एवं ज्ञान बिंदु' : 'Key Principles & Takeaways'}</span>
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(isHi ? selectedLesson.keyPointsHi : selectedLesson.keyPoints).map((pt, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-stone-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lesson Detailed Content Sections */}
              <div className="space-y-8 pt-4">
                {selectedLesson.contentSections.map((sec, idx) => (
                  <div key={idx} className="space-y-4">
                    <h4 className="text-base sm:text-lg font-bold font-cinzel text-amber-100">
                      {isHi ? sec.headingHi : sec.heading}
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                      {isHi ? sec.bodyHi : sec.body}
                    </p>

                    {/* Table If available */}
                    {sec.tableData && (
                      <div className="overflow-x-auto rounded-2xl border border-stone-800">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-stone-800/90 text-amber-300 font-bold">
                            <tr>
                              {sec.tableData.headers.map((h, i) => (
                                <th key={i} className="px-4 py-3 border-b border-stone-700">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-stone-800 bg-stone-900/60 text-stone-200">
                            {sec.tableData.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-stone-800/40 transition-colors">
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className="px-4 py-2.5">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Pro Tip */}
                    {(isHi ? sec.proTipHi : sec.proTip) && (
                      <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-3 sm:p-4 text-xs text-emerald-300 flex items-start gap-2.5">
                        <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold">{isHi ? 'ऋषि सूत्र:' : 'Master Tip:'}</strong>{' '}
                          {isHi ? sec.proTipHi : sec.proTip}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom Action */}
              <div className="pt-6 border-t border-stone-800 flex justify-between items-center">
                <button
                  onClick={() => setSelectedLesson(null)}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-semibold"
                >
                  {isHi ? '← सूची पर लौटें' : '← Return to Catalog'}
                </button>
                <button
                  onClick={() => {
                    setActiveTab('quiz');
                    setSelectedLesson(null);
                  }}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs flex items-center gap-1.5"
                >
                  <span>{isHi ? 'ज्ञान परीक्षा दें' : 'Take Knowledge Quiz'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Module Explorer & Lesson Catalog */
            <div className="space-y-8">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setSelectedModuleId('all')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedModuleId === 'all'
                      ? 'bg-amber-500 text-stone-950'
                      : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
                  }`}
                >
                  {isHi ? 'सभी विषय' : 'All Modules'}
                </button>
                {ASTROLOGY_MODULES.map(mod => (
                  <button
                    key={mod.id}
                    onClick={() => setSelectedModuleId(mod.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      selectedModuleId === mod.id
                        ? 'bg-amber-500 text-stone-950'
                        : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
                    }`}
                  >
                    <span>{isHi ? mod.titleHi : mod.title}</span>
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={
                    isHi
                      ? 'पाठ, ग्रह, भाव, राजयोग या भविष्यवाणी सूत्र खोजें...'
                      : 'Search lessons, planets, houses, predictive techniques...'
                  }
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-stone-900/90 border border-stone-800 focus:border-amber-500/50 rounded-2xl text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none"
                />
              </div>

              {/* Module Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ASTROLOGY_MODULES.map(mod => {
                  const Icon = ICON_MAP[mod.icon] || BookOpen;
                  const lessonsInMod = ASTROLOGY_LESSONS.filter(l => l.moduleId === mod.id);
                  return (
                    <div
                      key={mod.id}
                      className="bg-stone-900/90 border border-stone-800 hover:border-amber-500/40 rounded-3xl p-6 shadow-xl flex flex-col justify-between transition-all"
                    >
                      <div>
                        <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-base font-cinzel text-amber-200">
                          {isHi ? mod.titleHi : mod.title}
                        </h3>
                        <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                          {isHi ? mod.descHi : mod.desc}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-stone-800/80 space-y-2">
                        {lessonsInMod.map(lesson => (
                          <button
                            key={lesson.id}
                            onClick={() => setSelectedLesson(lesson)}
                            className="w-full text-left p-2 rounded-xl bg-stone-950/60 hover:bg-amber-500/10 border border-stone-800/60 hover:border-amber-500/30 text-xs text-stone-200 hover:text-amber-300 flex items-center justify-between transition-all group"
                          >
                            <span className="font-medium truncate mr-2">
                              {isHi ? lesson.titleHi : lesson.title}
                            </span>
                            <ChevronRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-amber-400 shrink-0 group-hover:translate-x-1 transition-transform" />
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: QUIZ & CERTIFICATION */}
      {activeTab === 'quiz' && (
        <div className="max-w-3xl mx-auto bg-stone-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          {!quizFinished ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                    {isHi ? 'वैदिक ज्योतिष मूल्यांकन' : 'Vedic Astrology Assessment'}
                  </span>
                  <h2 className="text-lg sm:text-xl font-extrabold font-cinzel text-amber-100 mt-1">
                    {isHi
                      ? `प्रश्न ${currentQuestionIndex + 1} / ${ASTROLOGY_QUIZ_QUESTIONS.length}`
                      : `Question ${currentQuestionIndex + 1} of ${ASTROLOGY_QUIZ_QUESTIONS.length}`}
                  </h2>
                </div>
                <div className="px-3 py-1 rounded-full bg-stone-800 border border-stone-700 text-xs font-bold text-amber-300">
                  {isHi ? `अंक: ${quizScore}` : `Score: ${quizScore}`}
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestionIndex + 1) / ASTROLOGY_QUIZ_QUESTIONS.length) * 100}%`
                  }}
                />
              </div>

              {/* Question Box */}
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-stone-100 leading-snug">
                  {isHi
                    ? ASTROLOGY_QUIZ_QUESTIONS[currentQuestionIndex].questionHi
                    : ASTROLOGY_QUIZ_QUESTIONS[currentQuestionIndex].question}
                </h3>

                <div className="space-y-3">
                  {(isHi
                    ? ASTROLOGY_QUIZ_QUESTIONS[currentQuestionIndex].optionsHi
                    : ASTROLOGY_QUIZ_QUESTIONS[currentQuestionIndex].options
                  ).map((option, idx) => {
                    const isCorrect =
                      idx === ASTROLOGY_QUIZ_QUESTIONS[currentQuestionIndex].correctIndex;
                    const isChosen = selectedAnswer === idx;

                    let btnStyle =
                      'bg-stone-950/80 hover:bg-stone-800 border-stone-800 text-stone-200';
                    if (selectedAnswer !== null) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold';
                      } else if (isChosen) {
                        btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200 font-bold';
                      } else {
                        btnStyle = 'opacity-50 border-stone-800 text-stone-400';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={selectedAnswer !== null}
                        onClick={() => handleAnswerOption(idx)}
                        className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{option}</span>
                        {selectedAnswer !== null && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Explanation card when answered */}
              {showExplanation && (
                <div className="p-4 rounded-2xl bg-stone-950 border border-amber-500/20 space-y-2 text-xs">
                  <div className="font-bold text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isHi ? 'शास्त्रीय व्याख्या:' : 'Classical Explanation:'}</span>
                  </div>
                  <p className="text-stone-300">
                    {isHi
                      ? ASTROLOGY_QUIZ_QUESTIONS[currentQuestionIndex].explanationHi
                      : ASTROLOGY_QUIZ_QUESTIONS[currentQuestionIndex].explanation}
                  </p>
                </div>
              )}

              {/* Next Button */}
              {selectedAnswer !== null && (
                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-400 text-stone-950 font-bold rounded-xl text-xs sm:text-sm hover:brightness-110 transition-all flex items-center gap-2"
                  >
                    <span>
                      {currentQuestionIndex + 1 === ASTROLOGY_QUIZ_QUESTIONS.length
                        ? isHi
                          ? 'परिणाम देखें'
                          : 'View Certificate'
                        : isHi
                        ? 'अगला प्रश्न'
                        : 'Next Question'}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Quiz Completed: Vedic Astrology Certificate */
            <div className="text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 mx-auto flex items-center justify-center text-amber-400">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                  {isHi ? 'परीक्षा संपन्न!' : 'Assessment Completed!'}
                </span>
                <h2 className="text-2xl font-extrabold font-cinzel text-amber-100 mt-1">
                  {isHi ? 'ज्योतिष ज्ञान प्रमाण पत्र' : 'Vedic Astrology Certificate'}
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 mt-2">
                  {isHi
                    ? `आपने ${ASTROLOGY_QUIZ_QUESTIONS.length} में से ${quizScore} प्रश्नों के सही उत्तर दिए हैं!`
                    : `You successfully scored ${quizScore} out of ${ASTROLOGY_QUIZ_QUESTIONS.length} questions!`}
                </p>
              </div>

              {/* Certificate Template Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-950/40 via-stone-950 to-stone-900 border-2 border-amber-400/40 shadow-2xl relative overflow-hidden text-left space-y-4">
                <div className="flex justify-between items-center border-b border-amber-500/20 pb-4">
                  <span className="text-xl font-bold font-cinzel text-amber-300">ॐ ASTRO GURUKUL</span>
                  <span className="text-[10px] text-amber-400 font-mono">ID: VEDIC-2026-CERT</span>
                </div>
                <div className="text-center py-4 space-y-2">
                  <p className="text-xs text-stone-400 uppercase tracking-wider">
                    {isHi ? 'यह प्रमाणित किया जाता है कि' : 'This is to certify that'}
                  </p>
                  <input
                    type="text"
                    value={userNameForCert}
                    onChange={e => setUserNameForCert(e.target.value)}
                    className="text-center font-cinzel text-lg sm:text-2xl font-bold text-amber-200 bg-transparent border-b border-amber-500/40 focus:outline-none w-full max-w-sm"
                  />
                  <p className="text-xs text-stone-300 max-w-md mx-auto pt-2">
                    {isHi
                      ? 'ने वैदिक ज्योतिष, कुंडली विश्लेषण एवं फलित भविष्यवाणी मूल्यांकन को सफलतापूर्वक उत्तीर्ण किया है।'
                      : 'has successfully completed the Vedic Astrology, Chart Analysis & Predictive Horoscopy Assessment.'}
                  </p>
                </div>
                <div className="flex justify-between items-center text-[10px] text-stone-400 border-t border-amber-500/20 pt-4">
                  <span>Score: {quizScore} / {ASTROLOGY_QUIZ_QUESTIONS.length} ({(quizScore/ASTROLOGY_QUIZ_QUESTIONS.length*100).toFixed(0)}%)</span>
                  <span>Date: {new Date().toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={resetQuiz}
                  className="px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{isHi ? 'पुनः परीक्षा दें' : 'Retake Quiz'}</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs flex items-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  <span>{isHi ? 'प्रमाण पत्र प्रिंट करें' : 'Print Certificate'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 3: PREDICTION FORMULAS & CHEAT SHEET */}
      {activeTab === 'chart-practice' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: isHi ? 'धन एवं करोड़पति योग' : 'Wealth & Millionaire Yogas',
                icon: '💰',
                rules: isHi
                  ? [
                      '2रे (धन) और 11वें (लाभ) भाव के स्वामियों का युति/परिवर्तन योग।',
                      'चंद्रमा से केंद्र (1, 4, 7, 10) में गुरु होने पर गजकेसरी योग बनता है।',
                      'लक्ष्मी स्थान (5, 9) और विष्णु स्थान (1, 4, 7, 10) के स्वामियों की युति राजयोग बनाती है।'
                    ]
                  : [
                      'Lord of 2nd (wealth) and 11th (gains) forming conjunction or mutual aspect.',
                      'Gajakesari Yoga: Jupiter placed in Kendra (1, 4, 7, 10) from the Moon.',
                      'Dharma-Karmadhipati Yoga: Conjunction of 9th and 10th house lords in Kendra/Trikona.'
                    ]
              },
              {
                title: isHi ? 'सरकारी नौकरी एवं उच्च पद' : 'Government & Authority Yogas',
                icon: '👑',
                rules: isHi
                  ? [
                      'सूर्य और मंगल का 10वें भाव (दिग्बली) में बैठना।',
                      'दशमेश का उच्च राशि या स्वराशि में होकर लग्न को देखना।',
                      'अमात्यकारक ग्रह का केंद्र या त्रिकोण भाव में बलवान होना।'
                    ]
                  : [
                      'Sun or Mars strong in 10th house (having full Digbala directional strength).',
                      '10th lord exalted or placed in Kendra aspecting Lagna.',
                      'Amatyakaraka planet situated in Kendra/Trikona with strong Navamsha support.'
                    ]
              },
              {
                title: isHi ? 'विदेश यात्रा एवं निवास योग' : 'Foreign Settlement Yogas',
                icon: '✈️',
                rules: isHi
                  ? [
                      '12वें भाव (विदेश) का संबंध 9वें (लंबी यात्रा) या 4वें (गृह स्थान) से होना।',
                      'चंद्रमा या राहु का चर राशि (1, 4, 7, 10) या जल राशि में होना।',
                      '4थे भाव के स्वामी का 12वें भाव में जाना।'
                    ]
                  : [
                      'Strong connection between 12th house (foreign land) and 9th/4th house.',
                      'Moon or Rahu placed in movable (Chara) or watery signs.',
                      '4th house lord (homeland) positioned in 12th or aspected by Rahu/Saturn.'
                    ]
              }
            ].map((card, i) => (
              <div
                key={i}
                className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 space-y-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{card.icon}</span>
                  <h3 className="font-bold text-base font-cinzel text-amber-200">{card.title}</h3>
                </div>
                <ul className="space-y-2">
                  {card.rules.map((rule, rIdx) => (
                    <li key={rIdx} className="text-xs text-stone-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
