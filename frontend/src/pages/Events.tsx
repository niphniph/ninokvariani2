import React, { useState } from 'react';
import { Calendar, MapPin, User, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

interface EventsProps {
  onNavigate?: (page: string) => void;
}

export const Events: React.FC<EventsProps> = ({ onNavigate }) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(15);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [siteSettings, setSiteSettings] = useState({
    eventsTitle: 'საჯარო აქტივობები და ღონისძიებები',
    eventsSubtitle: 'აღმოაჩინეთ თვითშემეცნების და პიროვნული ზრდის გზა ჩვენს სემინარებზე, ვორქშოფებსა და საჯარო ლექციებზე.'
  });

  React.useEffect(() => {
    import('../api').then(module => {
      module.default.get('/settings').then(res => {
        if (res.data) setSiteSettings(prev => ({ ...prev, ...res.data }));
      }).catch(() => {});
    });
  }, []);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-16 text-text-main">
      {/* Hero Section */}
      <section className="relative h-[480px] rounded-3xl flex items-center overflow-hidden bg-primary-container shadow-2xl border border-outline-variant/20 -mt-8">
        <div className="absolute inset-0 bg-[radial-gradient(#c7a85b_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>
        <div className="relative z-10 px-8 md:px-16 max-w-container-max mx-auto w-full text-white">
          <div className="max-w-2xl space-y-6">
            <span className="bg-tertiary-container/20 text-tertiary-fixed-dim border border-tertiary-container/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              საჯარო პროგრამები
            </span>
            <h1 className="font-display-lg text-3xl md:text-5xl mb-4 leading-tight font-bold text-tertiary-fixed-dim">
              {siteSettings.eventsTitle}
            </h1>
            <p className="font-body-lg text-sm md:text-base text-primary-fixed-dim opacity-90 max-w-xl leading-relaxed">
              {siteSettings.eventsSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events: Bento Grid Layout */}
      <section className="max-w-container-max mx-auto space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-tertiary font-label-md text-xs tracking-widest uppercase block mb-1">კალენდარი</span>
            <h2 className="font-headline-lg text-2xl md:text-3xl text-primary font-bold">მოახლოებული ღონისძიებები</h2>
          </div>
          <div className="hidden md:flex gap-3">
            <button 
              onClick={() => triggerToast('წინა თვის კალენდარი')} 
              className="p-2.5 rounded-full border border-outline-variant/40 hover:bg-surface-container transition-colors cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={() => triggerToast('შემდეგი თვის კალენდარი')} 
              className="p-2.5 rounded-full border border-outline-variant/40 hover:bg-surface-container transition-colors cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Featured Large Event Card */}
          <div className="md:col-span-8 group relative overflow-hidden rounded-2xl bg-surface-container-low shadow-lg border border-outline-variant/20 hover:shadow-2xl transition-all duration-500">
            <div className="flex flex-col md:flex-row h-full">
              <div className="md:w-1/2 h-64 md:h-auto overflow-hidden relative">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  alt="Therapeutic setting workshop" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBurwOZ0yspCyz7pgCieTdg0I39WTSBX-bDcR3Y-AlsSIv8CktWk70ISeZj6EQFrhMjYvA16kVp87vMwtdY1fy7RUWLLG-c-6KYyfuWQG7T6BpRQTRYRogluhk_0xhmvlGQsR7-morQNl9tswzbIEUolc9vbBTRTaJzaym-UprkY98LIDzbjIUeMf_UEuiWyx0qBgCy6XxitnWS-TvuENQJu_lkEk6pAeV9CqlpXf3HaLGhIl5NEJwo"
                />
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      ინტენსიური
                    </span>
                    <span className="text-tertiary font-headline-md text-xl font-bold">250 ₾</span>
                  </div>
                  <h3 className="font-headline-lg text-xl font-bold text-primary leading-snug group-hover:text-tertiary transition-colors">
                    ფსიქოსინთეზის საფუძვლები: პიროვნული ტრანსფორმაცია
                  </h3>
                  <div className="space-y-2.5 text-text-muted text-xs">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-tertiary" />
                      <span>15 - 17 ნოემბერი, 2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-tertiary" />
                      <span>ტრენერი: მარიამ ბერაძე</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-tertiary" />
                      <span>თბილისი, ინსტიტუტის დარბაზი</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => triggerToast('რეგისტრაციის განაცხადი წარმატებით გაიგზავნა!')}
                  className="bg-primary text-on-primary w-full py-3.5 rounded-xl font-label-md text-xs font-bold hover:shadow-lg transition-all cursor-pointer"
                >
                  რეგისტრაცია
                </button>
              </div>
            </div>
          </div>

          {/* Secondary Event Card */}
          <div className="md:col-span-4 bg-surface-muted p-8 rounded-2xl flex flex-col justify-between border border-outline-variant/30 space-y-6 shadow-md">
            <div className="space-y-4">
              <div className="text-tertiary font-headline-md text-xs font-bold uppercase tracking-widest">ონლაინ ვებინარი</div>
              <h4 className="font-headline-md text-lg font-bold text-primary">სიზმრების სიმბოლიკა და ქვეცნობიერი</h4>
              <p className="text-text-muted text-xs leading-relaxed">
                შეისწავლეთ თქვენი შინაგანი სამყაროს ენა მრავალწლიანი გამოცდილების მქონე თერაპევტებთან ერთად.
              </p>
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs border-b border-outline-variant/20 pb-1.5">
                  <span className="text-text-muted">თარიღი:</span>
                  <span className="text-primary font-bold">20 ნოემბერი</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-text-muted">ფასი:</span>
                  <span className="text-tertiary font-bold">50 ₾</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => triggerToast('ადგილი დაჯავშნილია!')}
              className="border-2 border-primary text-primary w-full py-3 rounded-xl font-label-md text-xs font-bold hover:bg-primary hover:text-on-primary transition-all cursor-pointer"
            >
              ადგილის დაჯავშნა
            </button>
          </div>

          {/* Smaller Grid Item 1 */}
          <div className="md:col-span-4 bg-surface-card p-6 rounded-2xl shadow-sm border border-outline-variant/20 hover:border-tertiary transition-colors group cursor-pointer space-y-4">
            <div className="h-44 rounded-xl overflow-hidden">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                alt="Creative writing therapy" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBj68tJL7DcQy3EkXDEg6Wq2VK0AuaO_kwCArODo982-NJwoEWbgHoPzTakDXzoLSr5Akff9rKd0Mfp3ZVPHMGUeZ-wyv6cpj4roGFIniEksAzEAmRpkmqg97AKOOwzkl28Kzgrnz5_KsiP5wJJ0JOvjCtmetol5z99I6hOF4dU9phbGTeG7XN4MVWz-Iu_ljhqboME0GMtaOGEi8G8tx2DxRucnnHjW4dYTYbLwBhL8mv9oAzuCs6c"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest">ვორქშოფი</span>
              <h4 className="font-headline-md text-base font-bold text-primary mt-1">შემოქმედებითი წერა და თერაპია</h4>
              <div className="mt-4 flex items-center justify-between text-xs pt-2 border-t border-outline-variant/10">
                <span className="text-primary font-bold">80 ₾</span>
                <span className="text-text-muted italic">22 ნოემბერი</span>
              </div>
            </div>
          </div>

          {/* Smaller Grid Item 2 */}
          <div className="md:col-span-4 bg-surface-card p-6 rounded-2xl shadow-sm border border-outline-variant/20 hover:border-tertiary transition-colors group cursor-pointer space-y-4">
            <div className="h-44 rounded-xl overflow-hidden">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                alt="Emotional intelligence" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAb8U_2c_gscsiGuHGOishr12JhnzyTG3-ppy_2BQJO4ww30RoP10HPDHSnIQUM3OkM04sqKNrkReNOJjS0NIHwNqN9KP17yTuXNSAYwvLJFcTPAtEFddoaK8Opm88lo9LtxAvLv78ZQxotglXGy0bWoOtZlRVPU3G1j6HhTLc4OcqaAQrkBiXTCQ7E6OaDHPQ9jVpRLDbtRX6IVm-2tQmzegtJLdxYL7IBOmbh9g-otkaTiCxB6kwi"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest">სემინარი</span>
              <h4 className="font-headline-md text-base font-bold text-primary mt-1">ემოციური ინტელექტი სამსახურში</h4>
              <div className="mt-4 flex items-center justify-between text-xs pt-2 border-t border-outline-variant/10">
                <span className="text-primary font-bold">120 ₾</span>
                <span className="text-text-muted italic">28 ნოემბერი</span>
              </div>
            </div>
          </div>

          {/* Stats/CTA Grid Item */}
          <div className="md:col-span-4 bg-primary text-on-primary p-8 rounded-2xl flex flex-col justify-center items-center text-center space-y-4 shadow-lg">
            <User size={36} className="text-tertiary-fixed mb-2" />
            <div className="text-4xl font-headline-lg font-bold text-tertiary-fixed">1,500+</div>
            <p className="font-body-md text-xs opacity-80 max-w-xs">კურსდამთავრებული და მონაწილე წელს</p>
            <div className="h-px w-16 bg-tertiary-fixed/40"></div>
            <button 
              onClick={() => onNavigate && onNavigate('academic')}
              className="text-tertiary-fixed font-label-md text-xs hover:underline cursor-pointer font-bold pt-2"
            >
              გაიგე მეტი ჩვენს პროგრამებზე
            </button>
          </div>
        </div>
      </section>

      {/* Dynamic Calendar Component View */}
      <section className="bg-surface-container-low py-16 rounded-3xl border border-outline-variant/20 p-8 md:p-12">
        <div className="max-w-container-max mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4 space-y-6">
              <h2 className="font-headline-lg text-2xl md:text-3xl text-primary font-bold">ღონისძიებების კალენდარი</h2>
              <p className="text-text-muted text-sm leading-relaxed">
                შეარჩიეთ თქვენთვის სასურველი თარიღი და დაგეგმეთ წინასწარ. ჩვენი კალენდარი მუდმივად ახლდება ახალი აქტივობებით.
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-card border-l-4 border-tertiary shadow-sm">
                  <div className="bg-primary text-white p-3 rounded-lg text-center min-w-[60px]">
                    <div className="text-[10px] uppercase font-bold tracking-wider">დეკ</div>
                    <div className="text-xl font-bold leading-none">05</div>
                  </div>
                  <div>
                    <h5 className="font-bold text-primary text-sm">ღია კარის დღე</h5>
                    <p className="text-xs text-text-muted mt-1">გაიცანით ჩვენი აკადემიური გუნდი</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 bg-surface-card rounded-2xl shadow-xl p-6 md:p-8 border border-outline-variant/20">
              <div className="grid grid-cols-7 gap-2 text-center mb-4 text-xs font-bold text-text-muted">
                <div>ორშ</div>
                <div>სამ</div>
                <div>ოთხ</div>
                <div>ხუთ</div>
                <div>პარ</div>
                <div className="text-tertiary">შაბ</div>
                <div className="text-tertiary">კვი</div>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                  const isEventDay = day === 15 || day === 20 || day === 25;
                  const isSelected = selectedDay === day;
                  return (
                    <div
                      key={day}
                      onClick={() => {
                        setSelectedDay(day);
                        if (isEventDay) triggerToast(`არჩეულია ${day} ნოემბერი - დაგეგმილია ღონისძიება`);
                      }}
                      className={`h-20 border rounded-xl p-2 flex flex-col justify-between transition-all cursor-pointer text-xs font-semibold ${
                        isSelected 
                          ? 'border-tertiary bg-tertiary-container/20 ring-2 ring-tertiary/40'
                          : isEventDay 
                            ? 'bg-primary/10 border-primary/40' 
                            : 'border-outline-variant/20 hover:bg-surface-container-high'
                      }`}
                    >
                      <span className="text-on-surface">{day}</span>
                      {day === 15 && <div className="w-full h-1.5 bg-primary rounded-full" title="პიროვნული ტრანსფორმაცია"></div>}
                      {day === 20 && <div className="w-full h-1.5 bg-tertiary rounded-full" title="სიზმრების სიმბოლიკა"></div>}
                      {day === 25 && <div className="w-full h-1.5 bg-secondary rounded-full" title="ღია კარის დღე"></div>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Past Events Gallery */}
      <section className="max-w-container-max mx-auto space-y-8">
        <div className="text-center space-y-3">
          <h2 className="font-headline-lg text-2xl md:text-3xl text-primary font-bold">წარსული ღონისძიებები</h2>
          <div className="h-1 w-20 bg-tertiary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'https://lh3.googleusercontent.com/aida-public/AB6AXuD0lhF3W4NZ80cUwq7Y5kxFZwZMOZEAJs45-srrIOXC09WTyxGGJLJQ6lZiahyGp_C-Tv-4-psfuI8TBMAN6fY13tTxzPpNauZ2ms0E_VRqXdM_TCPQEYhxZIJkpjgNQCU7RX3xSRPDtufncTSkAuXeE4IbTrlfZxSUG0TdFdFZbpgtcuY4BZhHFbOtemh9I6KDuEMyvhI0ES34ZDnj4OMLzEfDrg66otFVvpBEQlzoQXZep79IUqwb',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAtmJyQq0bhFGkXUG3HgJkFe8TZh89X8ZfHswErnTrZePCGUQe8xMojo5zm1B2XStMaojpYaN8JbtwfBodgoEK-s1Pbe71iWYLJO68_mJxXCJr8GSdt8tc587jDiT7XvUD1BHJlrD-G91UpIYXA8g5B399WCs2hu6Tq_Ue-AmgGNV7Np85qQYP3UDv-0zJLixCtL20QLcuj6qHH7YSVBZyr0mgSonwuPfCEQG3bz17-W0wSZVzZ0Pdr',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuB1NH4ph8Ja88KEYC4q2-nQoyy1dBHSsdZCZ-udhpyXWNM80Wmtr3FUAWWnKVPonRt271AQc4lnFePXaFmO0CtrhfBAehxrgHzEHbYH_sUTlNJQBJqWlkglzyIf6llMAf_UAjaWZlrlQqi9lrHi7VRxwHuMMB6iFFLv5xO71-f8x-gwabW2jVtKh8ryH5kTlD4t3OpSx0zdLTYPXST6lLKFaDUxK7sz3-CDlv1MRJDoa-4MW1DskUVU',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBfCjYYaUNXYsyzdLYHCWt66A20CBCP0uG37yLzexmK2__09XV-AjJa_FRXAoElW1Eo92V_7N4jQ8fQkC81LGgJspVNA7HRuEjmDysiTdAG6BejzIYMfFWFTDCA5UIsQWeBEY34ucRSS7oK0PhDHRuHH0p1XKN70UPCAPF0hZPdCxdLNHF58h08ui01lqXdMRs3MCrJ7p8rEv4G3btCUULw-6GY0OxPfx0XbYRCBqryJ58718eoqMo0'
          ].map((imgUrl, idx) => (
            <div key={idx} className="relative group h-64 overflow-hidden rounded-2xl shadow-md cursor-pointer">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Past event photo" src={imgUrl} />
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-label-md text-xs border border-white/50 px-4 py-2 rounded-full font-bold">ნახვა</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Toast message notification */}
      {toastMsg && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 text-xs font-bold z-50 animate-bounce">
          <CheckCircle2 size={16} className="text-tertiary" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
};
