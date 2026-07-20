import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import type { Subpersonality } from './SubpersonalityBuilder';

interface SubpersonalityChartProps {
  data: Subpersonality[];
}

export const SubpersonalityChart: React.FC<SubpersonalityChartProps> = ({ data }) => {
  // If no data, use some default demo subpersonalities for display
  const isDemo = data.length === 0;
  const chartData = isDemo
    ? [
        { name: 'პერფექციონისტი', influence: 70 },
        { name: 'დამცველი', influence: 55 },
        { name: 'მეოცნებე', influence: 85 },
        { name: 'კრიტიკოსი', influence: 40 },
        { name: 'ბავშვი', influence: 65 }
      ]
    : data.map((sub) => ({
        name: sub.name,
        influence: sub.influence
      }));

  return (
    <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 space-y-8">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-headline-md text-tertiary-container">
            შინაგანი ბალანსის ანალიზი
          </h3>
          {isDemo && (
            <span className="text-[10px] bg-tertiary-container/20 text-tertiary-container px-2 py-0.5 rounded-full uppercase font-bold tracking-wider animate-pulse">
              დემო მონაცემები
            </span>
          )}
        </div>
        <p className="text-xs text-surface-variant/60 mt-1">
          დიაგრამა ასახავს სხვადასხვა ქვეპიროვნების აქტივობას თქვენს ყოველდღიურობაში.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Radar Chart */}
        <div className="w-full h-[280px] flex justify-center items-center">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
              <PolarGrid stroke="rgba(255,255,255,0.08)" />
              <PolarAngleAxis
                dataKey="name"
                tick={{ fill: '#fbf9f3', fontSize: 10, opacity: 0.8 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fill: '#c7a85b', fontSize: 8 }}
                stroke="rgba(255,255,255,0.08)"
              />
              <Radar
                name="აქტიურობა"
                dataKey="influence"
                stroke="#c7a85b"
                fill="#c7a85b"
                fillOpacity={0.25}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#00241a',
                  border: '1px solid rgba(199, 168, 91, 0.3)',
                  borderRadius: '12px',
                  color: '#fbf9f3',
                  fontSize: '12px'
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="w-full h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
              <XAxis
                dataKey="name"
                tick={{ fill: '#fbf9f3', fontSize: 10, opacity: 0.7 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: '#fbf9f3', fontSize: 10, opacity: 0.7 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: 'rgba(255, 255, 255, 0.03)' }}
                contentStyle={{
                  backgroundColor: '#00241a',
                  border: '1px solid rgba(199, 168, 91, 0.3)',
                  borderRadius: '12px',
                  color: '#fbf9f3',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="influence" fill="#2e6954" radius={[8, 8, 0, 0]} barSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="p-4 bg-tertiary-container/5 rounded-2xl border border-tertiary-container/10 text-xs text-surface-variant/80 leading-relaxed text-center">
        {isDemo ? (
          <p>
            ეს არის საილუსტრაციო ბალანსის რუკა. თქვენი ინდივიდუალური სტრუქტურის დასანახად, გთხოვთ{' '}
            <strong className="text-tertiary-container">დაამატოთ ქვეპიროვნებები</strong> მარჯვენა მენიუში.
          </p>
        ) : (
          <p>
            იდეალურ შემთხვევაში, ქვეპიროვნებები არ უნდა დომინირებდნენ. თუ რომელიმეს გავლენა აჭარბებს{' '}
            <strong className="text-tertiary-fixed">70%-ს</strong>, რეკომენდებულია დეიდენტიფიკაციის სავარჯიშოების ჩატარება თვითცნობიერების დასაბრუნებლად.
          </p>
        )}
      </div>
    </div>
  );
};
