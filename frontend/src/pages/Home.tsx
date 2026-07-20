import React from 'react';
import { ArrowRight, ChevronRight, Compass, Users } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
  siteSettings?: {
    heroTitle?: string;
    heroSubtitle?: string;
    heroCtaButton?: string;
    aboutTitle?: string;
    aboutText?: string;
    historyText?: string;
    trainersText?: string;
  };
}

export const Home: React.FC<HomeProps> = ({ onNavigate, siteSettings }) => {
  return (
    <div className="space-y-0 text-text-main bg-background selection:bg-tertiary selection:text-on-tertiary">
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden -mt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 mix-blend-multiply z-10 bg-primary-container/80"></div>
          <img 
            className="w-full h-full object-cover" 
            alt="Modern minimalist academic building with glass and wood surfaces integrated with lush landscaping" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuADlkkmgIHMdESPqFQWxN-qaJEefgYUcgPDfTfY6I1ULMeo84qhptW_vG8srsDba5wWxCfUXPHYdQZ1lN4XWDMwl93ZAn-mAnCpanna14_g6DJlEf6ak8iE3HJ7krX-6TGD8Gvze5xjGnG8CxTFdppVDqN8qjIeuVERCiT2pzIRa_6TaYBvltqryMiCivqjDUR-UGzSuI8u5D7-RLqnNZ8ozDWH2S_-SJ0fOwoiWoflJgtbPFClyFP6"
          />
        </div>
        
        <div className="relative z-20 max-w-container-max mx-auto px-gutter w-full py-20">
          <div className="max-w-3xl md:ml-0 space-y-6">
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-tertiary mb-6">
              {siteSettings?.heroTitle || 'სულის მთლიანობისა და პიროვნული ჰარმონიის გზა'}
            </h1>
            <p className="font-quote-editorial text-quote-editorial text-text-main mb-10 opacity-90 leading-relaxed max-w-2xl">
              {siteSettings?.heroSubtitle || 'ფსიქოსინთეზის ქართული ინსტიტუტი გიწვევთ თვითშემეცნების სიღრმეებში, სადაც აკადემიური ცოდნა და სულიერი პრაქტიკა ერთიანდება.'}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => onNavigate('workspace')}
                className="bg-tertiary text-on-tertiary px-8 py-4 rounded-lg font-label-md text-label-md hover:shadow-xl hover:brightness-110 transition-all cursor-pointer font-bold"
              >
                {siteSettings?.heroCtaButton || 'დაიწყე მოგზაურობა'}
              </button>
              <button 
                onClick={() => onNavigate('academic')}
                className="bg-surface-container-low/30 backdrop-blur-sm text-text-main border border-tertiary/40 px-8 py-4 rounded-lg font-label-md text-label-md hover:bg-tertiary/20 transition-all cursor-pointer"
              >
                პროგრამების გაცნობა
              </button>
            </div>
          </div>
        </div>
        
        {/* Academic gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-32 academic-gradient z-10"></div>
      </section>

      {/* About Psychosynthesis (Intro) */}
      <section className="py-section-gap-lg bg-background relative overflow-hidden" id="about-philosophy">
        <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-tertiary font-label-md text-label-md tracking-widest uppercase mb-4 block">
              ფილოსოფია &amp; ისტორია
            </span>
            <h2 className="font-headline-lg text-headline-lg text-tertiary mb-8">
              რა არის ფსიქოსინთეზი?
            </h2>
            <div className="space-y-6 text-text-main leading-relaxed">
              <p className="text-body-lg font-body-lg">
                ფსიქოსინთეზი არის ფსიქოლოგიის ჰუმანისტური და ტრანსპერსონალური მიმართულება, რომელიც დააფუძნა რობერტო ასაჯიოლიმ. ეს არის მიდგომა, რომელიც ადამიანს განიხილავს როგორც ერთიან მთლიანობას — სხეულის, გრძნობების, გონებისა და სულის სინთეზს.
              </p>
              <p className="text-body-md font-body-md text-text-muted bg-surface-container-low p-6 rounded-2xl border-l-4 border-tertiary shadow-sm">
                {siteSettings?.historyText || siteSettings?.aboutText || 'ჩვენი ინსტიტუტი საქართველოში პირველია, რომელიც სთავაზობს სრულყოფილ აკადემიურ და პრაქტიკულ ბაზას ამ მიმართულებით. ჩვენი მიზანია დავეხმაროთ ადამიანებს საკუთარი შინაგანი რესურსების აღმოჩენასა და პიროვნულ ტრანსფორმაციაში.'}
              </p>
            </div>
            
            <div className="mt-10 flex gap-12 pt-4">
              <div className="flex flex-col">
                <span className="font-display-lg text-tertiary leading-none text-5xl font-bold">15+</span>
                <span className="font-label-md text-label-md text-text-muted mt-2">წლის გამოცდილება</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display-lg text-tertiary leading-none text-5xl font-bold">500+</span>
                <span className="font-label-md text-label-md text-text-muted mt-2">კურსდამთავრებული</span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative w-full max-w-md mx-auto lg:max-w-none">
            <div className="aspect-[4/5] rounded-xl overflow-hidden premium-shadow relative z-10 border border-outline/20">
              <img 
                className="w-full h-full object-cover" 
                alt="A portrait of a contemplative scholar in a classic library" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNDeZZ08mYF6XPWzNvdpcdgGEZZEInkt1LJcyj21WLrUU6cPTULdQOoPi0QycgMzwUodPdoV-G5I96r5z8j983ajKS97dUxzC6c9ncp9ffKmxvG0175l5YgQlHWM0_RPU2ZELQoy3Q_9wf9X583ADmHTMjq9oZ6_lSHZSpOrePAmrGxW3IS2x23xJchjTHbTWmOw-r6IHbK5pHOXOwLMCDX_1TUZo7dQ9RycL-PX_vQvY_1FsjF_4B"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-surface-container-low rounded-full -z-0"></div>
            
            <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 p-8 bg-surface-container-high rounded-lg shadow-xl z-20 border-l-4 border-tertiary max-w-[240px]">
              <span className="material-symbols-outlined text-tertiary mb-2 block text-3xl">format_quote</span>
              <p className="font-body-md text-body-md italic text-text-main">
                "სინთეზი არის გზა მთლიანობისკენ."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section (Bento Grid) */}
      <section className="py-section-gap-lg bg-surface-muted">
        <div className="max-w-container-max mx-auto px-gutter space-y-16">
          <div className="text-center space-y-4">
            <h2 className="font-headline-lg text-headline-lg text-tertiary mb-4">
              ჩვენი მიმართულებები
            </h2>
            <div className="h-1 w-20 bg-tertiary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Course Card 1 (Large) */}
            <div 
              onClick={() => onNavigate('academic')}
              className="md:col-span-2 bg-surface-container-low rounded-xl p-10 premium-shadow border border-outline/10 flex flex-col md:flex-row gap-8 items-center group cursor-pointer hover:-translate-y-1 transition-transform"
            >
              <div className="w-full md:w-1/2 aspect-video rounded-lg overflow-hidden">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  alt="A serene minimalist classroom workshop" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwP6hC4cxO4ChS9CSBg6rFMaXtZiezNQK8cTyXYEBsf2SyQJNzZyjd5gl-qU1yztscnaaHtFvz-uQPOhweDhZ63p3qOIaNIe0wTJ_pQA_5MOEv7r6netKM8I_KMiuNY9-3a1GI4tpy60fReYV5xIdgFkwcbTpw5LfViehgfENmnKtuswBNu6ds7FZQdNBIe3ws4flqeMIpxRjGD6_XJmlQzuvCnEuuGyMswDvhb_mX-tYkNRXgutjL"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <span className="text-tertiary font-label-md text-label-md mb-2 block">
                  აკადემიური პროგრამა
                </span>
                <h3 className="font-headline-md text-headline-md text-tertiary mb-4">
                  პროფესიული მომზადება ფსიქოსინთეზში
                </h3>
                <p className="text-text-muted mb-6 text-sm leading-relaxed">
                  სამწლიანი სერტიფიცირებული პროგრამა ფსიქოლოგებისა და თერაპევტებისთვის.
                </p>
                <div className="text-tertiary font-label-md text-label-md inline-flex items-center gap-2 group-hover:gap-4 transition-all">
                  ვრცლად <ArrowRight size={16} />
                </div>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-surface-container-high rounded-xl p-10 flex flex-col justify-between hover:shadow-2xl transition-all border border-tertiary/20">
              <div className="space-y-4">
                <div className="text-tertiary text-4xl mb-6">
                  <Compass size={36} />
                </div>
                <h3 className="font-headline-md text-headline-md text-tertiary mb-4">
                  თვითგანვითარების ვორქშოფები
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  მოკლევადიანი კურსები მათთვის, ვისაც სურს საკუთარი თავის უკეთ გაცნობა.
                </p>
              </div>
              <button 
                onClick={() => onNavigate('academic')}
                className="mt-8 border border-tertiary text-tertiary px-6 py-3 rounded-lg font-label-md text-label-md hover:bg-tertiary hover:text-on-tertiary transition-colors w-max cursor-pointer"
              >
                კალენდარი
              </button>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-surface-container-low rounded-xl p-10 premium-shadow flex flex-col justify-between border-t-4 border-tertiary border-x border-b border-outline/10">
              <div className="space-y-4">
                <div className="text-tertiary text-4xl mb-6">
                  <Users size={36} />
                </div>
                <h3 className="font-headline-md text-headline-md text-tertiary mb-4">
                  თერაპიული ჯგუფები
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  უსაფრთხო სივრცე ემოციური გაზიარებისა და კოლექტიური ზრდისთვის.
                </p>
              </div>
              <button 
                onClick={() => onNavigate('academic')}
                className="mt-8 text-tertiary font-label-md text-label-md inline-flex items-center gap-2 hover:gap-3 transition-all cursor-pointer font-semibold text-left"
              >
                რეგისტრაცია <ChevronRight size={16} />
              </button>
            </div>

            {/* Feature Card 4 (Horizontal Large) */}
            <div className="md:col-span-2 bg-surface-container-low rounded-xl p-10 flex flex-col md:flex-row gap-10 items-center premium-shadow border border-outline/10">
              <div className="flex-1 space-y-4 order-2 md:order-1">
                <h3 className="font-headline-md text-headline-md text-tertiary mb-4">
                  ინდივიდუალური კონსულტაცია
                </h3>
                <p className="text-text-muted mb-6 text-sm leading-relaxed">
                  ჩვენი ექსპერტები დაგეხმარებიან რთული ცხოვრებისეული ეტაპების გადალახვასა და შინაგანი წონასწორობის პოვნაში.
                </p>
                <button 
                  onClick={() => onNavigate('academic')}
                  className="bg-surface-container-high text-tertiary border border-tertiary/30 font-label-md text-label-md px-6 py-3 rounded-lg hover:bg-tertiary hover:text-on-tertiary transition-all cursor-pointer"
                >
                  ექიმთან ჩაწერა
                </button>
              </div>
              <div className="w-full md:w-1/3 aspect-square rounded-full overflow-hidden order-1 md:order-2 ring-8 ring-surface-muted shrink-0">
                <img 
                  className="w-full h-full object-cover" 
                  alt="Hands gently holding a small green sprout" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5_idinu0tGiK8NqECZ68HNdYNjRYIFxK9ozKJP2svF90jYDbSoyjaDoGHbODMuFIxW1OcD_2xhfhijCSPIOrK7BNZq3zBhYHetdgT2VyiWWNRjA5GfxubxRAp44RzdV-fwL_TOGa6iceBkf0lAoPicUOcfN7-4HjDBE9Rd1n9Qx-3PBwJeJTvLIr0bcUnkzYREt3ehRqV9d59e1Wv-9wizlb9dr21Rjz-LEd580tQqaEGIBu-W5X2"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional CTA */}
      <section className="py-section-gap-md bg-surface-container-lowest relative overflow-hidden border-y border-outline/10 text-center">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#c7a85b_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="max-w-container-max mx-auto px-gutter relative z-10 space-y-8">
          <h2 className="font-display-lg text-tertiary mb-8 leading-tight">
            მზად ხართ ტრანსფორმაციისთვის?
          </h2>
          <p className="font-quote-editorial text-text-main max-w-2xl mx-auto mb-12 opacity-80 leading-relaxed">
            შემოუერთდით ჩვენს საზოგადოებას და დაიწყეთ მოგზაურობა სულიერი და ინტელექტუალური სიმწიფისკენ.
          </p>
          <div className="flex justify-center gap-6 flex-wrap pt-4">
            <button 
              onClick={() => onNavigate('academic')}
              className="bg-tertiary text-on-tertiary px-10 py-5 rounded-lg font-label-md text-label-md hover:scale-105 transition-transform shadow-xl cursor-pointer font-bold"
            >
              ღია კარის დღეზე ჩაწერა
            </button>
            <button 
              onClick={() => {
                alert('ინფორმაციული ბროშურა მზადდება და მალე ჩამოიტვირთება.');
              }}
              className="border border-tertiary text-tertiary px-10 py-5 rounded-lg font-label-md text-label-md hover:bg-tertiary/10 transition-all cursor-pointer"
            >
              გადმოწერეთ ბროშურა
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
