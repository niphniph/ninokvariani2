import React, { useState } from 'react';
import api from '../api';

interface EggRegion {
  id: string;
  name: string;
  latinName: string;
  description: string;
  exercise: string;
}

const REGIONS: Record<string, EggRegion> = {
  'lower-unconscious': {
    id: 'lower-unconscious',
    name: '1. ქვედა ქვეცნობიერი',
    latinName: 'Subconscientia Inferior',
    description: 'აქ მოთავსებულია ბაზისური ბიოლოგიური ფუნქციები, პირველადი ინსტინქტები, კომპლექსები და წარსულის ტრავმული გამოცდილებები. ეს არის ჩვენი ფსიქოლოგიური წარსულის საცავი, რომელიც მართავს ავტომატურ რეაქციებს.',
    exercise: 'დაფიქრდით: რა კომპლექსები ან ძველი ქცევითი ავტომატიზმები გიშლით ხელს დღეს განვითარებაში? აღწერეთ ერთ-ერთი მათგანი და შეეცადეთ დაინახოთ მისი პირველადი დამცავი ფუნქცია.'
  },
  'middle-unconscious': {
    id: 'middle-unconscious',
    name: '2. საშუალო ქვეცნობიერი',
    latinName: 'Subconscientia Media',
    description: 'სივრცე, სადაც ყოველდღიური ფსიქიკური ელემენტებია აკუმულირებული. აქ ხდება ახალი ინფორმაციის დამუშავება, ასიმილაცია და ინტელექტუალური მუშაობა, სანამ ის ცნობიერების ველში შემოვა.',
    exercise: 'რა თემები ან პროექტები ტრიალებს თქვენს გონებაში ბოლო დროს? აღწერეთ, როგორ მიმდინარეობს თქვენი ყოველდღიური შემეცნებითი ან შემოქმედებითი პროცესები.'
  },
  'higher-unconscious': {
    id: 'higher-unconscious',
    name: '3. ზეცნობიერი',
    latinName: 'Superconscientia',
    description: 'უმაღლესი პოტენციალის, ინტუიციის, მხატვრული და მეცნიერული შთაგონების, აგრეთვე ეთიკური იმპერატივების წყარო. აქედან მოდის ალტრუისტული სიყვარული, გმირობა და ცხოვრებისეული მისიის გაცნობიერება.',
    exercise: 'გაიხსენეთ თქვენი ცხოვრებიდან ღრმა შთაგონების, ინტუიციური გაგების ან ტრანსცენდენტული სიყვარულის მომენტი. რას გრძნობდით და რა შეიცვალა ამის შემდეგ თქვენში?'
  },
  'field-of-consciousness': {
    id: 'field-of-consciousness',
    name: '4. ცნობიერების ველი',
    latinName: 'Campus Conscientiae',
    description: 'ფსიქიკის ის ნაწილი, რომელიც უშუალოდ არის აღქმული დროის მოცემულ მომენტში. ეს არის ჩვენი სუბიექტური გამოცდილების "ეკრანი", სადაც ფიქრები, გრძნობები და შეგრძნებები მუდმივად მიედინება.',
    exercise: 'გააჩერეთ ყურადღება ამ მომენტზე. დაასახელეთ 3 ფიზიკური შეგრძნება, 2 ხმა და 1 ემოცია, რომელიც ახლა არის თქვენს ცნობიერების ველში.'
  },
  'personal-self': {
    id: 'personal-self',
    name: '5. პიროვნული "მე" (The Self)',
    latinName: 'Ego',
    description: 'ცნობიერებისა და ნების უცვლელი ცენტრი. პიროვნული "მე" არის დამკვირვებელი, რომელიც რჩება სტაბილური, მიუხედავად იმისა, თუ რა შინაარსები მიედინება ცნობიერების ველში (ემოციები, როლები).',
    exercise: 'გააკეთეთ მოკლე დეიდენტიფიკაცია: "მე მაქვს სხეული, მაგრამ მე არ ვარ ჩემი სხეული; მე მაქვს ემოციები, მაგრამ მე არ ვარ ჩემი ემოციები; მე ვარ ცენტრი - სუფთა ცნობიერება და ნება." აღწერეთ მიღებული შეგრძნება.'
  },
  'higher-self': {
    id: 'higher-self',
    name: '6. უმაღლესი "მე"',
    latinName: 'Self Transpersonale',
    description: 'ტრანსპერსონალური, სულიერი არსი, რომლის ანარეკლიც არის პიროვნული "მე". იგი წარმოადგენს ჩვენს უმაღლეს დანიშნულებას, კავშირს სამყაროსთან და მთლიანობასთან, რომელიც დროისა და სივრცის მიღმაა.',
    exercise: 'რა არის თქვენი ცხოვრებისეული მისია ან უმაღლესი სულიერი ღირებულება, რომლის გამოვლენასაც გრძნობთ თქვენს ყოველდღიურობაში?'
  }
};

interface EggDiagramProps {
  onEntrySaved?: () => void;
  isAuthenticated: boolean;
}

export const EggDiagram: React.FC<EggDiagramProps> = ({ onEntrySaved, isAuthenticated }) => {
  const [selectedRegion, setSelectedRegion] = useState<EggRegion | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [journalText, setJournalText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleRegionClick = (regionId: string) => {
    setSelectedRegion(REGIONS[regionId]);
    setJournalText('');
    setMessage('');
  };

  const handleSaveJournal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRegion) return;
    if (!journalText.trim()) {
      setMessage('გთხოვთ ჩაწეროთ პასუხი');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      await api.post('/journal', {
        section: selectedRegion.id,
        content: journalText
      });
      setMessage('ჩანაწერი წარმატებით შეინახა დღიურში!');
      setJournalText('');
      if (onEntrySaved) {
        onEntrySaved();
      }
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'ჩანაწერის შენახვისას დაფიქსირდა შეცდომა');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      {/* Interactive SVG Diagram */}
      <div className="lg:col-span-6 flex flex-col items-center">
        <h3 className="text-xl font-headline-md text-tertiary-container mb-6 text-center">
          დააწკაპუნეთ კვერცხის ნაწილებზე მისაკვლევად
        </h3>
        <div className="relative w-full max-w-[400px] aspect-[4/5] bg-primary/20 rounded-[40px] border border-tertiary-container/10 p-6 flex justify-center items-center">
          <svg
            viewBox="0 0 400 500"
            className="w-full h-full select-none"
            style={{ filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.3))' }}
          >
            {/* Background egg helper grid if needed */}
            <defs>
              <radialGradient id="eggGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#104f3d" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#00241a" stopOpacity="0.9" />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Egg Base Shape (dotted border representing permeability) */}
            <ellipse
              cx="200"
              cy="250"
              rx="150"
              ry="210"
              fill="url(#eggGrad)"
              stroke="#c7a85b"
              strokeWidth="2.5"
              strokeDasharray="6,6"
              className="opacity-80"
            />

            {/* Region 3: Higher Unconscious / Superconscious (Top 1/3) */}
            <path
              d="M 54 210 A 150 210 0 0 1 346 210 Z"
              fill={hoveredRegion === 'higher-unconscious' ? '#c7a85b' : 'transparent'}
              fillOpacity={hoveredRegion === 'higher-unconscious' ? 0.12 : 0}
              stroke="#c7a85b"
              strokeWidth="2.5"
              strokeDasharray="6,6"
              className="egg-region"
              onMouseEnter={() => setHoveredRegion('higher-unconscious')}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => handleRegionClick('higher-unconscious')}
            />

            {/* Region 1: Lower Unconscious (Bottom 1/3) */}
            <path
              d="M 54 290 A 150 210 0 0 0 346 290 Z"
              fill={hoveredRegion === 'lower-unconscious' ? '#c7a85b' : 'transparent'}
              fillOpacity={hoveredRegion === 'lower-unconscious' ? 0.12 : 0}
              stroke="#c7a85b"
              strokeWidth="2.5"
              strokeDasharray="6,6"
              className="egg-region"
              onMouseEnter={() => setHoveredRegion('lower-unconscious')}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => handleRegionClick('lower-unconscious')}
            />

            {/* Region 2: Middle Unconscious (Middle 1/3 minus field of consciousness) */}
            <path
              d="M 54 210 L 54 290 A 150 210 0 0 0 346 290 L 346 210 A 150 210 0 0 0 54 210 Z"
              fill={hoveredRegion === 'middle-unconscious' ? '#c7a85b' : 'transparent'}
              fillOpacity={hoveredRegion === 'middle-unconscious' ? 0.08 : 0}
              className="egg-region"
              onMouseEnter={() => setHoveredRegion('middle-unconscious')}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => handleRegionClick('middle-unconscious')}
            />

            {/* Region 4: Field of Consciousness (Middle circle) */}
            <circle
              cx="200"
              cy="250"
              r="75"
              fill={hoveredRegion === 'field-of-consciousness' ? '#c7a85b' : 'transparent'}
              fillOpacity={hoveredRegion === 'field-of-consciousness' ? 0.15 : 0}
              stroke="#c7a85b"
              strokeWidth="2"
              strokeDasharray="4,4"
              className="egg-region"
              onMouseEnter={() => setHoveredRegion('field-of-consciousness')}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => handleRegionClick('field-of-consciousness')}
            />

            {/* Region 5: Personal Self (Center dot) */}
            <circle
              cx="200"
              cy="250"
              r="10"
              fill="#c7a85b"
              className="egg-region hover:scale-125 transition-transform duration-200"
              style={{ filter: hoveredRegion === 'personal-self' ? 'url(#glow)' : 'none' }}
              onMouseEnter={() => setHoveredRegion('personal-self')}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => handleRegionClick('personal-self')}
            />

            {/* Region 6: Higher Self (Top dot) */}
            <circle
              cx="200"
              cy="90"
              r="10"
              fill="#ffdf95"
              className="egg-region hover:scale-125 transition-transform duration-200"
              style={{ filter: hoveredRegion === 'higher-self' ? 'url(#glow)' : 'none' }}
              onMouseEnter={() => setHoveredRegion('higher-self')}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => handleRegionClick('higher-self')}
            />

            {/* Connecting Line between Personal Self and Higher Self */}
            <line
              x1="200"
              y1="90"
              x2="200"
              y2="250"
              stroke="#ffdf95"
              strokeWidth="1.5"
              strokeDasharray="4,6"
              opacity="0.5"
            />

            {/* Labels on SVG */}
            <text x="200" y="160" textAnchor="middle" fill="#fbf9f3" fontSize="11" opacity="0.6" letterSpacing="1">
              ზეცნობიერი
            </text>
            <text x="200" y="325" textAnchor="middle" fill="#fbf9f3" fontSize="11" opacity="0.6" letterSpacing="1">
              საშუალო ქვეცნობიერი
            </text>
            <text x="200" y="380" textAnchor="middle" fill="#fbf9f3" fontSize="11" opacity="0.6" letterSpacing="1">
              ქვედა ქვეცნობიერი
            </text>
            <text x="200" y="215" textAnchor="middle" fill="#c7a85b" fontSize="10" fontWeight="bold" opacity="0.8">
              ცნობიერების ველი
            </text>
          </svg>
          {hoveredRegion && (
            <div className="absolute bottom-4 bg-primary px-4 py-1.5 rounded-full border border-tertiary-container/30 text-xs text-tertiary-container animate-pulse">
              {REGIONS[hoveredRegion]?.name} ({REGIONS[hoveredRegion]?.latinName})
            </div>
          )}
        </div>
      </div>

      {/* Region details and Journal Submission */}
      <div className="lg:col-span-6">
        {selectedRegion ? (
          <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 space-y-6 transition-all duration-300">
            <div>
              <span className="text-xs uppercase font-label-md text-tertiary-container tracking-widest block mb-1">
                {selectedRegion.latinName}
              </span>
              <h3 className="text-2xl font-headline-md text-surface-bright">{selectedRegion.name}</h3>
            </div>
            
            <p className="text-surface-variant/90 leading-relaxed font-body-md">
              {selectedRegion.description}
            </p>

            <div className="p-5 bg-tertiary-container/10 border-l-2 border-tertiary-container rounded-r-xl space-y-2">
              <span className="text-xs font-bold text-tertiary-container uppercase tracking-wider block">
                პრაქტიკული ვარჯიში
              </span>
              <p className="text-sm text-surface-variant leading-relaxed">
                {selectedRegion.exercise}
              </p>
            </div>

            {isAuthenticated ? (
              <form onSubmit={handleSaveJournal} className="space-y-4 pt-2">
                <label className="block text-sm font-label-md text-tertiary-container">
                  პერსონალური დღიური (ჩაწერეთ თქვენი რეფლექსია):
                </label>
                <textarea
                  className="w-full bg-primary-container border border-white/15 rounded-xl p-4 text-surface-bright placeholder-surface-variant/40 focus:ring-2 focus:ring-tertiary-container focus:outline-none transition-all"
                  rows={4}
                  placeholder="აქ ჩაწერეთ თქვენი დაკვირვებები ან პასუხები..."
                  value={journalText}
                  onChange={(e) => setJournalText(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-tertiary-container text-primary-container font-label-md py-3 rounded-xl hover:bg-tertiary-fixed transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'ინახება...' : 'ჩანაწერის შენახვა დღიურში'}
                </button>
                {message && (
                  <p className={`text-sm text-center font-bold ${message.includes('შეცდომა') ? 'text-error' : 'text-secondary-fixed'}`}>
                    {message}
                  </p>
                )}
              </form>
            ) : (
              <div className="p-4 bg-black/20 rounded-xl text-center border border-white/5">
                <p className="text-sm text-surface-variant/80">
                  დღიურში ჩანაწერების გასაკეთებლად და შესანახად, გთხოვთ გაიაროთ{' '}
                  <span className="text-tertiary-container font-bold">ავტორიზაცია</span>.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white/5 border border-white/5 rounded-[32px] p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
            <span className="material-symbols-outlined text-5xl text-tertiary-container/30 mb-4">
              ads_click
            </span>
            <h4 className="text-xl font-headline-md text-surface-bright/80 mb-2">
              დეტალების სანახავად აირჩიეთ დიაგრამის ზონა
            </h4>
            <p className="text-sm text-surface-variant/60 max-w-sm">
              კვერცხის თითოეული ნაწილი ასახავს თქვენი ცნობიერების სხვადასხვა სიღრმესა და განზომილებას. დააკლიკეთ მათ და შეასრულეთ რეფლექსიის ვარჯიშები.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
