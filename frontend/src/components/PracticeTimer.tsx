import { useState, useEffect, useRef } from 'react';
import api from '../api';
import { Play, Pause, RotateCcw, Award, CheckCircle, Volume2 } from 'lucide-react';

interface MeditationType {
  id: string;
  title: string;
  description: string;
  steps: string[];
}

const MEDITATION_TYPES: MeditationType[] = [
  {
    id: 'disidentification',
    title: 'დეიდენტიფიკაციის სავარჯიშო',
    description: 'ეს არის ძირეული ვარჯიში, რომელიც გვეხმარება გავაცნობიეროთ, რომ ჩვენ გვაქვს სხეული, გრძნობები და ფიქრები, მაგრამ ჩვენ არ ვართ ისინი.',
    steps: [
      'დაჯექით კომფორტულად, დახუჭეთ თვალები და მიაქციეთ ყურადღება სხეულს.',
      'თქვით გონებაში: "მე მაქვს სხეული, მაგრამ მე არ ვარ ჩემი სხეული. მე ვარ მისი მფლობელი და დამკვირვებელი."',
      'თქვით: "მე მაქვს ემოციები, მაგრამ მე არ ვარ ჩემი ემოციები. მე შემიძლია მათი მართვა და გარდაქმნა."',
      'თქვით: "მე მაქვს ფიქრები, მაგრამ მე არ ვარ ჩემი ფიქრები. მე ვარ გონება, რომელიც ქმნის მათ."',
      'გააცნობიერეთ საკუთარი თავი როგორც სუფთა ცნობიერება და ნება - უცვლელი ცენტრი.'
    ]
  },
  {
    id: 'rose-meditation',
    title: 'ვარდის კოკრის ვიზუალიზაცია',
    description: 'სიმბოლური მედიტაცია, რომელიც ხელს უწყობს შინაგანი პოტენციალის, სილამაზისა და სიბრძნის თანდათანობით გახსნას.',
    steps: [
      'წარმოიდგინეთ მწვანე მცენარე და მასზე პატარა, შეკრული ვარდის კოკორი.',
      'დაინახეთ, როგორ ეცემა მასზე მზის თბილი სხივები და როგორ იწყებს ფურცლების ნელ-ნელა გაშლას.',
      'დააკვირდით თითოეულ ფურცელს, მის ფერს, სინაზეს და სურნელს, რომელიც ვრცელდება.',
      'წარმოიდგინეთ, რომ ეს ვარდი თქვენი საკუთარი სულია, რომელიც ნელა და უსაფრთხოდ იხსნება.',
      'დარჩით ამ სიხარულის, მშვენიერებისა და შინაგანი სიბრძნის შეგრძნებაში.'
    ]
  },
  {
    id: 'visualization-light',
    title: 'სინათლისა და ენერგიის ნაკადი',
    description: 'ტრანსპერსონალური მედიტაცია, რომელიც აკავშირებს პიროვნულ ცენტრს უმაღლეს "მე"-სთან და ავსებს სხეულს სასიცოცხლო ძალებით.',
    steps: [
      'წარმოიდგინეთ თქვენს თავზე, კვერცხის ზედა ნაწილში, კაშკაშა ოქროსფერი სინათლის წყარო.',
      'დაინახეთ, როგორ ეშვება ამ წყაროდან სინათლის თბილი, ოქროსფერი სხივი თქვენს სხეულში.',
      'სინათლე ავსებს თქვენს გონებას, გულს და თითოეულ უჯრედს, მოაქვს სიმშვიდე და ძალა.',
      'წარმოიდგინეთ, რომ ეს სინათლე არის კავშირი თქვენს უმაღლეს "მე"-სთან, რომელიც ყოველთვის გიცავთ.',
      'გაუშვით სინათლე გარეთ და გაუზიარეთ იგი გარშემომყოფებს.'
    ]
  }
];

interface PracticeTimerProps {
  onSessionLogged?: () => void;
  isAuthenticated: boolean;
}

export const PracticeTimer: React.FC<PracticeTimerProps> = ({ onSessionLogged, isAuthenticated }) => {
  const [selectedType, setSelectedType] = useState<MeditationType>(MEDITATION_TYPES[0]);
  const [duration, setDuration] = useState(60); // duration in seconds
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  
  // Breathing helper cycle: 0 = inhale (4s), 1 = hold (4s), 2 = exhale (4s)
  const [breatheState, setBreatheState] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breatheCount, setBreatheCount] = useState(4);

  const timerRef = useRef<any>(null);
  const breatheTimerRef = useRef<any>(null);

  // Sound generator using Web Audio API so no audio file is needed!
  const playBellSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime); // A4 note
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.1); // Slide up to A5
      osc.frequency.exponentialRampToValueAtTime(554.37, audioCtx.currentTime + 0.8); // Drop to C#5 (harmonious)

      gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 3); // Ring out for 3 seconds

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 3);
    } catch (e) {
      console.warn('Web Audio API not supported or blocked by browser policy:', e);
    }
  };

  useEffect(() => {
    setTimeLeft(duration);
    setIsActive(false);
    setIsFinished(false);
    setSaveMessage('');
    setCurrentStep(0);
  }, [duration, selectedType]);

  // Main countdown timer
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
        
        // Progress steps gradually based on time elapsed
        const totalSteps = selectedType.steps.length;
        const elapsed = duration - (timeLeft - 1);
        const stepDuration = duration / totalSteps;
        const calculatedStep = Math.min(Math.floor(elapsed / stepDuration), totalSteps - 1);
        setCurrentStep(calculatedStep);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      handleComplete();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isActive, timeLeft]);

  // Breathing helper timer
  useEffect(() => {
    if (isActive) {
      breatheTimerRef.current = setInterval(() => {
        setBreatheCount((prev) => {
          if (prev <= 1) {
            setBreatheState((state) => {
              if (state === 'inhale') return 'hold';
              if (state === 'hold') return 'exhale';
              return 'inhale';
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (breatheTimerRef.current) clearInterval(breatheTimerRef.current);
      setBreatheState('inhale');
      setBreatheCount(4);
    }

    return () => {
      if (breatheTimerRef.current) clearInterval(breatheTimerRef.current);
    };
  }, [isActive]);

  const handleComplete = async () => {
    setIsActive(false);
    setIsFinished(true);
    playBellSound();

    if (isAuthenticated) {
      try {
        await api.post('/meditation-logs', {
          title: selectedType.title,
          duration: duration
        });
        setSaveMessage('მედიტაციის სესია წარმატებით შეინახა თქვენს ისტორიაში!');
        if (onSessionLogged) {
          onSessionLogged();
        }
      } catch (err: any) {
        setSaveMessage('ლოგის შენახვისას დაფიქსირდა შეცდომა');
      }
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(duration);
    setCurrentStep(0);
    setIsFinished(false);
    setSaveMessage('');
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Settings & Description */}
      <div className="lg:col-span-5 space-y-6">
        <div className="space-y-2">
          <span className="text-xs uppercase font-label-md text-tertiary-container tracking-widest block">
            პრაქტიკული სავარჯიშოები
          </span>
          <h3 className="text-2xl font-headline-md text-surface-bright">
            მედიტაციის ოთახი
          </h3>
        </div>

        {/* List of meditations */}
        <div className="space-y-3">
          {MEDITATION_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type)}
              disabled={isActive}
              className={`w-full text-left p-4 rounded-2xl border transition-all ${
                selectedType.id === type.id
                  ? 'bg-tertiary-container/10 border-tertiary-container text-surface-bright'
                  : 'bg-white/5 border-white/10 text-surface-variant hover:border-white/20'
              } disabled:opacity-50`}
            >
              <h4 className="font-bold text-sm">{type.title}</h4>
              <p className="text-xs opacity-70 mt-1 line-clamp-2">{type.description}</p>
            </button>
          ))}
        </div>

        {/* Duration configuration */}
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
          <span className="text-xs font-bold text-tertiary-container uppercase tracking-wider block">
            ხანგრძლივობის არჩევა
          </span>
          <div className="grid grid-cols-4 gap-2">
            {[10, 60, 300, 600].map((sec) => (
              <button
                key={sec}
                onClick={() => setDuration(sec)}
                disabled={isActive}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  duration === sec
                    ? 'bg-tertiary-container text-primary-container'
                    : 'bg-white/5 text-surface-variant hover:bg-white/10'
                } disabled:opacity-50`}
              >
                {sec === 10 ? '10წმ (ტესტი)' : sec === 60 ? '1 წთ' : `${sec / 60} წთ`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Timer & Guided Playback */}
      <div className="lg:col-span-7 bg-[#0f3b2e] border border-tertiary-container/20 rounded-[40px] p-8 flex flex-col justify-between min-h-[480px]">
        {isFinished ? (
          /* Completion State */
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-20 h-20 bg-tertiary-container/20 border border-tertiary-container rounded-full flex items-center justify-center text-tertiary-container animate-bounce">
              <Award size={44} />
            </div>
            <div className="space-y-2">
              <h4 className="text-2xl font-headline-md text-surface-bright">
                მედიტაცია დასრულდა!
              </h4>
              <p className="text-sm text-surface-variant/80 max-w-sm mx-auto">
                თქვენ წარმატებით დაუთმეთ დრო შინაგან ჰარმონიზაციასა და თვითცნობიერების გაძლიერებას.
              </p>
            </div>
            {saveMessage && (
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2 max-w-md text-xs text-secondary-fixed justify-center">
                <CheckCircle size={16} />
                <span>{saveMessage}</span>
              </div>
            )}
            <button
              onClick={resetTimer}
              className="bg-tertiary-container text-primary-container font-label-md px-8 py-3 rounded-xl hover:bg-tertiary-fixed transition-all"
            >
              თავიდან დაწყება
            </button>
          </div>
        ) : (
          /* Active State */
          <div className="flex-1 flex flex-col justify-between">
            {/* Top status */}
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <span className="text-xs text-tertiary-container font-bold uppercase tracking-wider">
                {selectedType.title}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-surface-variant">
                <Volume2 size={14} className="text-tertiary-container" />
                <span>ზარი ჩაირთვება ბოლოს</span>
              </div>
            </div>

            {/* Breathing and Timer Display */}
            <div className="py-8 flex flex-col md:flex-row items-center justify-around gap-8">
              {/* Timer text */}
              <div className="text-center space-y-1">
                <span className="text-5xl font-mono font-bold text-surface-bright tracking-wider">
                  {formatTime(timeLeft)}
                </span>
                <p className="text-xs text-surface-variant/60">დარჩენილი დრო</p>
              </div>

              {/* Dynamic Breathing Helper */}
              <div className="relative w-36 h-36 flex items-center justify-center">
                {/* Outer ripple */}
                <div
                  className={`absolute rounded-full border border-tertiary-container/30 transition-all duration-1000 ${
                    !isActive
                      ? 'w-24 h-24'
                      : breatheState === 'inhale'
                      ? 'w-36 h-36 border-tertiary-container scale-110'
                      : breatheState === 'hold'
                      ? 'w-36 h-36 border-tertiary-fixed scale-110'
                      : 'w-24 h-24 border-tertiary-container/40 scale-95'
                  }`}
                />
                {/* Inner solid circle */}
                <div
                  className={`rounded-full flex flex-col items-center justify-center text-center transition-all duration-1000 ${
                    !isActive
                      ? 'w-20 h-20 bg-tertiary-container/10 text-tertiary-container'
                      : breatheState === 'inhale'
                      ? 'w-28 h-28 bg-tertiary-container/20 text-tertiary-container'
                      : breatheState === 'hold'
                      ? 'w-28 h-28 bg-tertiary-fixed/20 text-tertiary-fixed'
                      : 'w-20 h-20 bg-secondary/20 text-secondary-fixed-dim'
                  }`}
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    {!isActive ? 'მზადყოფნა' : breatheState === 'inhale' ? 'ჩაისუნთქე' : breatheState === 'hold' ? 'შეიკავე' : 'ამოისუნთქე'}
                  </span>
                  {isActive && <span className="text-xs font-mono font-bold mt-0.5">{breatheCount}</span>}
                </div>
              </div>
            </div>

            {/* Guide Step Text */}
            <div className="p-6 bg-black/10 border border-white/5 rounded-2xl min-h-[100px] flex items-center justify-center text-center">
              <p className="text-sm md:text-base text-surface-bright leading-relaxed italic">
                {selectedType.steps[currentStep]}
              </p>
            </div>

            {/* Controls */}
            <div className="pt-6 flex justify-center items-center gap-6">
              <button
                onClick={resetTimer}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-surface-variant hover:bg-white/5 hover:text-surface-bright transition-all"
                title="ჩამოყრა"
              >
                <RotateCcw size={18} />
              </button>
              
              <button
                onClick={toggleTimer}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-secondary text-surface-bright hover:bg-secondary/90'
                    : 'bg-tertiary-container text-primary-container hover:bg-tertiary-fixed'
                }`}
              >
                {isActive ? <Pause size={24} fill="currentColor" /> : <Play size={24} className="ml-1" fill="currentColor" />}
              </button>

              <div className="w-12" /> {/* spacer for visual symmetry */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
