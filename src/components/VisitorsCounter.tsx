import { useEffect, useState } from 'react';
import axios from 'axios';
import { Globe2, Users } from 'lucide-react';

type Countries = Record<string, number>;

export const VisitorsCounter = () => {
  const [total, setTotal] = useState<number>(0);
  const [displayTotal, setDisplayTotal] = useState<number>(0);
  const [countries, setCountries] = useState<Countries>({});
  const [loading, setLoading] = useState(true);

  const isLocalhost =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1';

  const mockData = {
    pageviews: { value: 4821 },
    countries: {
      Brazil: 1950,
      'United States': 1320,
      Germany: 640,
      Japan: 410,
      France: 290,
      'United Kingdom': 211,
    },
  };

  useEffect(() => {
    if (total > 0) {
      const duration = 1500; // 1.5s
      const startTime = performance.now();

      const animate = (time: number) => {
        const progress = Math.min((time - startTime) / duration, 1);
        setDisplayTotal(Math.floor(progress * total));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [total]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data } = await axios.get('/api/visitors', { timeout: 5000 });
        if (
          !data.pageviews?.value ||
          !Object.keys(data.countries || {}).length
        ) {
          setTotal(mockData.pageviews.value);
          setCountries(mockData.countries);
        } else {
          setTotal(data.pageviews.value);
          setCountries(data.countries);
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
        setTotal(mockData.pageviews.value);
        setCountries(mockData.countries);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const getFlag = (country: string) => {
    const flags: Record<string, string> = {
      Brazil: 'BR',
      'United States': 'US',
      Germany: 'DE',
      Japan: 'JP',
      France: 'FR',
      'United Kingdom': 'GB',
    };
    const code = flags[country] || 'UN';
    return `https://flagsapi.com/${code}/flat/32.png`;
  };

  return (
    <div className="mt-8 mb-4 mx-auto w-[90%] sm:max-w-md text-center bg-card/40 backdrop-blur-md rounded-2xl border border-accent/30 p-5 shadow-md animate-fade-in">
      <div className="flex items-center justify-center gap-2 mb-3">
        <Globe2 className="text-accent w-5 h-5 animate-pulse" />
        <h3 className="text-lg font-bold text-accent">Global Visitors</h3>
      </div>

      {loading ? (
        <p className="text-muted-foreground text-sm italic">Loading stats...</p>
      ) : (
        <>
          <div className="text-5xl sm:text-6xl font-black text-primary mb-2 animate-bounce-slow transition-all duration-700">
            {displayTotal.toLocaleString()}
          </div>
          <p className="text-muted-foreground text-xs mb-4">
            Retro players around the world
          </p>

          <div className="border-t border-accent/20 mt-3 pt-3">
            <div className="flex justify-center items-center gap-2 text-xs text-muted-foreground mb-2">
              <Users className="w-4 h-4" />
              <span>Top Countries</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {Object.entries(countries)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 6)
                .map(([country, visits]) => (
                  <div
                    key={country}
                    className="flex items-center justify-between bg-accent/10 rounded-md px-2 py-2 hover:bg-accent/20 transition-all duration-200"
                  >
                    <div className="flex items-center gap-2 text-left">
                      <img
                        src={getFlag(country)}
                        alt={country}
                        className="w-5 h-4 rounded-sm shadow-sm"
                      />
                      <span className="truncate max-w-[80px] sm:max-w-[100px]">
                        {country}
                      </span>
                    </div>
                    <span className="font-bold text-accent">{visits}</span>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
