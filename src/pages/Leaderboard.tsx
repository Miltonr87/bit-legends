import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy, Medal, Award } from "lucide-react";
import { games } from "@/data/games";

interface LeaderboardEntry {
  id: string;
  user_id: string;
  game_id: string;
  game_title: string;
  score: number;
  played_at: string;
  profiles: {
    username: string | null;
  } | null;
}

const Leaderboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState(
    searchParams.get("game") || games[0].id
  );

  useEffect(() => {
    fetchLeaderboard();
  }, [selectedGame]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      // First get the game history with scores
      const { data: historyData, error: historyError } = await supabase
        .from("game_history")
        .select("id, user_id, game_id, game_title, score, played_at")
        .eq("game_id", selectedGame)
        .not("score", "is", null)
        .order("score", { ascending: false })
        .order("played_at", { ascending: true })
        .limit(100);

      if (historyError) throw historyError;
      if (!historyData) {
        setLeaderboard([]);
        return;
      }

      // Get unique user IDs
      const userIds = [...new Set(historyData.map((entry) => entry.user_id))];

      // Fetch profiles for these users
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("id, username")
        .in("id", userIds);

      if (profilesError) throw profilesError;

      // Create a map of user_id to username
      const profilesMap = new Map(
        profilesData?.map((profile) => [profile.id, profile.username]) || []
      );

      // Get unique top scores per user
      const userTopScores = new Map<string, LeaderboardEntry>();
      
      historyData.forEach((entry) => {
        const existing = userTopScores.get(entry.user_id);
        if (!existing || entry.score > existing.score) {
          userTopScores.set(entry.user_id, {
            ...entry,
            profiles: {
              username: profilesMap.get(entry.user_id) || null,
            },
          } as LeaderboardEntry);
        }
      });

      setLeaderboard(
        Array.from(userTopScores.values())
          .sort((a, b) => b.score - a.score)
          .slice(0, 50)
      );
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGameChange = (gameId: string) => {
    setSelectedGame(gameId);
    setSearchParams({ game: gameId });
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 text-center font-bold">{rank}</span>;
    }
  };

  const selectedGameData = games.find((g) => g.id === selectedGame);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />
                Leaderboard
              </CardTitle>
              <div className="mt-4">
                <Select value={selectedGame} onValueChange={handleGameChange}>
                  <SelectTrigger className="text-sm sm:text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {games.map((game) => (
                      <SelectItem key={game.id} value={game.id} className="text-sm sm:text-base">
                        {game.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-center py-8 text-muted-foreground text-sm sm:text-base">Loading...</p>
              ) : leaderboard.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground text-sm sm:text-base">
                  No scores yet for {selectedGameData?.title}. Be the first to submit a score!
                </p>
              ) : (
                <div className="space-y-2">
                  {leaderboard.map((entry, index) => (
                    <div
                      key={entry.id}
                      className={`flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-lg ${
                        entry.user_id === user?.id
                          ? "bg-primary/10 border border-primary/20"
                          : "bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center justify-center w-6 sm:w-8 flex-shrink-0">
                        {getRankIcon(index + 1)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm sm:text-base truncate">
                          {entry.profiles?.username || "Anonymous"}
                          {entry.user_id === user?.id && (
                            <span className="ml-2 text-xs text-primary">(You)</span>
                          )}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {new Date(entry.played_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-lg sm:text-2xl font-bold">{entry.score.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
