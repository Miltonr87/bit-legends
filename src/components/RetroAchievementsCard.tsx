import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Trophy, Loader2, Download } from 'lucide-react';

const BASE_URL = 'https://retroachievements.org/API';
const USER = 'miltonr87';
const API_KEY = 'uuSM7Mnw19atnuRwtkaRy1TkqnXOD0DX';

interface Achievement {
  id: number;
  title: string;
  description: string;
  points: number;
  badgeUrl: string;
  unlocked: boolean;
}

interface GameAchievements {
  totalAchievements: number;
  unlockedAchievements: number;
  percentComplete: number;
  achievements: Achievement[];
}

export function RetroAchievementsCard({ raId }: { raId?: number }) {
  const [data, setData] = useState<GameAchievements | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!raId) return;
    const fetchAchievements = async () => {
      setLoading(true);
      try {
        const url = `${BASE_URL}/API_GetGameInfoAndUserProgress.php?z=${USER}&y=${API_KEY}&u=${USER}&g=${raId}`;
        const res = await fetch(url);
        const json = await res.json();
        if (json?.Achievements) {
          const achievements = Object.values(json.Achievements).map(
            (a: any) => ({
              id: a.ID,
              title: a.Title,
              description: a.Description,
              points: a.Points,
              badgeUrl: `https://media.retroachievements.org/Badge/${a.BadgeName}.png`,
              unlocked: !!a.DateEarned,
            })
          );
          setData({
            totalAchievements: Object.keys(json.Achievements).length,
            unlockedAchievements: json.NumAchieved,
            percentComplete: json.NumPossibleAchievements
              ? Math.round(
                  (json.NumAchieved / json.NumPossibleAchievements) * 100
                )
              : 0,
            achievements,
          });
        } else setData(null);
      } catch (err) {
        console.error('Failed to fetch RA data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, [raId]);
  if (!raId) return null;

  return (
    <Card className="border border-accent/40 bg-card overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl font-semibold">
          <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
          RetroAchievements Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <Loader2 className="animate-spin h-6 w-6 mb-2" />
            <p className="text-sm">Loading achievements...</p>
          </div>
        ) : !data ? (
          <p className="text-center py-8 text-muted-foreground text-sm">
            No RetroAchievements found for this game.
          </p>
        ) : (
          <>
            <div className="mb-3">
              <div className="flex justify-between text-xs sm:text-sm text-muted-foreground mb-1">
                <span>
                  {data.unlockedAchievements}/{data.totalAchievements} unlocked
                </span>
                <span>{data.percentComplete}%</span>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${data.percentComplete}%` }}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              {data.achievements.slice(0, 2).map((ach) => (
                <div
                  key={ach.id}
                  className={`flex items-center gap-3 p-2.5 rounded-lg border transition text-sm ${
                    ach.unlocked
                      ? 'bg-primary/10 border-primary/40'
                      : 'bg-muted/40 border-transparent'
                  }`}
                >
                  <img
                    src={ach.badgeUrl}
                    alt={ach.title}
                    className={`w-8 h-8 rounded ${
                      ach.unlocked ? '' : 'opacity-40 grayscale'
                    }`}
                  />
                  <div className="flex-1 min-w-0 leading-tight">
                    <p className="font-semibold text-sm sm:text-base truncate">
                      {ach.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {ach.description}
                    </p>
                    <span className="text-[11px] text-yellow-500 font-semibold">
                      {ach.points} pts
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center text-xs sm:text-sm text-muted-foreground border-t border-border pt-3">
              <p className="flex items-center justify-center gap-1 flex-wrap">
                Want to unlock?
                <a
                  href="https://www.retroarch.com/?page=platforms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-1 font-semibold"
                >
                  <Download className="h-3 w-3" />
                  Download RetroArch
                </a>
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
