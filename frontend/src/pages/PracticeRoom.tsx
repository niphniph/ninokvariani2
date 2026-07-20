import React from 'react';
import { PracticeTimer } from '../components/PracticeTimer';

interface PracticeRoomProps {
  isAuthenticated: boolean;
}

export const PracticeRoom: React.FC<PracticeRoomProps> = ({ isAuthenticated }) => {
  const [siteSettings, setSiteSettings] = React.useState({
    practiceTitle: 'შინაგანი მედიტაციის ოთახი',
    practiceSubtitle: 'გამოიყენეთ სტრუქტურირებული მედიტაციები და სუნთქვითი ვარჯიშები შინაგანი ჰარმონიის მისაღწევად.'
  });

  React.useEffect(() => {
    import('../api').then(module => {
      module.default.get('/settings').then(res => {
        if (res.data) setSiteSettings(prev => ({ ...prev, ...res.data }));
      }).catch(() => {});
    });
  }, []);

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs uppercase font-label-md text-tertiary-container tracking-widest block">
          Meditation & Visualization Space
        </span>
        <h2 className="text-3xl font-headline-lg text-surface-bright">{siteSettings.practiceTitle}</h2>
        <p className="text-sm text-surface-variant/80">
          {siteSettings.practiceSubtitle}
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12">
        <PracticeTimer isAuthenticated={isAuthenticated} />
      </div>
    </div>
  );
};
