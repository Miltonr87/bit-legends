import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Medal, Award, Loader2 } from 'lucide-react';
import { allGames } from '../data';

const BASE_URL = 'https://retroachievements.org/API';
const USER = import.meta.env.VITE_RA_USER;
const API_KEY = import.meta.env.VITE_RA_KEY;

interface RAEntry {
  User: string;
  Score: string;
  DateSubmitted: string;
}

interface Leaderboard {
  ID: number;
  Title: string;
  Description: string;
  Entries: RAEntry[];
}

const ProjectLeaderboards = () => {
  const [data, setData] = useState<Record<string, Leaderboard[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllLeaderboards();
  }, []);

  const fetchAllLeaderboards = async () => {
    setLoading(true);
    try {
      const results: Record<string, Leaderboard[]> = {};
      for (const game of allGames) {
        if (!game.raId) continue;

        const url = `${BASE_URL}/API_GetGameLeaderboards.php?z=${USER}&y=${API_KEY}&i=${game.raId}`;
        const res = await fetch(url);

        if (!res.ok) {
          console.warn(
            `❌ Failed to fetch leaderboards for ${game.title} (${game.raId})`
          );
          continue;
        }

        const json = await res.json();

        if (json?.Leaderboards?.length) {
          results[game.id] = json.Leaderboards.map((lb: any) => ({
            ID: lb.ID,
            Title: lb.Title,
            Description: lb.Description,
            Entries: lb.Entries || [],
          }));
        }
      }

      setData(results);
    } catch (err) {
      console.error('⚠️ Failed to fetch RetroAchievements data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return (
          <span className="text-sm font-bold text-muted-foreground">
            {rank}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-5xl mx-auto">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
                Project Leaderboards
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                  <Loader2 className="animate-spin h-6 w-6 mb-2" />
                  <p>Loading leaderboards...</p>
                </div>
              ) : Object.keys(data).length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">
                  No RetroAchievements leaderboards found for these games.
                </p>
              ) : (
                Object.entries(data).map(([gameId, leaderboards]) => {
                  const game = allGames.find((g) => g.id === gameId);
                  return (
                    <div key={gameId} className="mb-10">
                      <h2 className="text-lg sm:text-xl font-bold mb-4 text-accent">
                        {game?.title}
                      </h2>
                      {leaderboards.map((lb) => (
                        <div key={lb.ID} className="mb-6">
                          <h3 className="font-semibold text-sm sm:text-base text-foreground">
                            {lb.Title}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                            {lb.Description}
                          </p>

                          {lb.Entries && lb.Entries.length > 0 ? (
                            lb.Entries.slice(0, 5).map((entry, idx) => (
                              <div
                                key={idx}
                                className={`flex items-center justify-between p-3 sm:p-4 rounded-lg mb-2 ${
                                  idx === 0
                                    ? 'bg-primary/10 border border-primary/30'
                                    : 'bg-muted/40'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  {getRankIcon(idx + 1)}
                                  <div>
                                    <p className="font-semibold text-sm sm:text-base">
                                      {entry.User}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {new Date(
                                        entry.DateSubmitted
                                      ).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                                <p className="font-bold text-lg sm:text-xl">
                                  {entry.Score}
                                </p>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-muted-foreground">
                              No entries yet.
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ProjectLeaderboards;
