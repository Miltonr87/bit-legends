import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  User,
  Upload,
  Clock,
  Gamepad2,
  Trash2,
  LogIn,
  LogOut,
  Mail,
  PlusCircle,
  Play,
  Square,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Profile {
  username: string;
  email: string;
  avatar_url: string | null;
  provider?: 'google' | 'local';
}

interface GameHistory {
  id: string;
  game_title: string;
  played_at: string;
  time_spent: number; // in seconds
}

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<Profile | null>(null);
  const [username, setUsername] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);
  const [useEmail, setUseEmail] = useState(false);
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);

  // --- Load ---
  useEffect(() => {
    const savedUser = localStorage.getItem('bitlegends_user');
    const savedHistory = localStorage.getItem('bitlegends_history');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedHistory) setGameHistory(JSON.parse(savedHistory));
  }, []);

  // --- Save ---
  useEffect(() => {
    localStorage.setItem('bitlegends_history', JSON.stringify(gameHistory));
  }, [gameHistory]);

  // ✅ Google Login
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        toast('Logging in with Google...', { description: 'Please wait' });
        const res = await fetch(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );
        const profile = await res.json();

        const googleUser: Profile = {
          username: profile.name || profile.given_name || 'Player',
          email: profile.email,
          avatar_url: profile.picture,
          provider: 'google',
        };

        localStorage.setItem('bitlegends_user', JSON.stringify(googleUser));
        setUser(googleUser);
        toast.success(`Welcome, ${googleUser.username}!`);
      } catch {
        toast.error('Google login failed');
      }
    },
    onError: () => toast.error('Google login failed'),
  });

  // --- Local Email Login ---
  const handleLocalLogin = () => {
    if (!emailInput.includes('@')) {
      toast.error('Enter a valid email address');
      return;
    }
    const localUser: Profile = {
      username: emailInput.split('@')[0],
      email: emailInput,
      avatar_url: null,
      provider: 'local',
    };
    localStorage.setItem('bitlegends_user', JSON.stringify(localUser));
    setUser(localUser);
    toast.success(`Welcome, ${localUser.username}!`);
  };

  const handleSignOut = () => {
    localStorage.removeItem('bitlegends_user');
    setUser(null);
    toast.success('Signed out successfully');
    navigate('/');
  };

  // --- Avatar Upload ---
  const uploadAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length || !user) return;
    setUploading(true);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const newUser = { ...user, avatar_url: reader.result as string };
      setUser(newUser);
      localStorage.setItem('bitlegends_user', JSON.stringify(newUser));
      toast.success('Avatar updated!');
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  // --- Update username ---
  const updateProfile = () => {
    if (!user) return;
    const updated = { ...user, username };
    setUser(updated);
    localStorage.setItem('bitlegends_user', JSON.stringify(updated));
    toast.success('Profile updated successfully!');
  };

  // --- Game Tracking ---
  const startGameSession = (gameId: string) => {
    if (activeGame) {
      toast.error('You are already playing another game.');
      return;
    }
    setActiveGame(gameId);
    setStartTime(Date.now());
    toast('Game session started!', {
      description: 'Click stop to record time.',
    });
  };

  const stopGameSession = (gameId: string) => {
    if (!activeGame || !startTime) return;
    const elapsed = Math.floor((Date.now() - startTime) / 1000); // in seconds
    setGameHistory((prev) =>
      prev.map((g) =>
        g.id === gameId ? { ...g, time_spent: g.time_spent + elapsed } : g
      )
    );
    setActiveGame(null);
    setStartTime(null);
    toast.success(`Session saved (${formatTime(elapsed)})`);
  };

  const addGameHistory = () => {
    const newGame: GameHistory = {
      id: crypto.randomUUID(),
      game_title: `Game ${gameHistory.length + 1}`,
      played_at: new Date().toISOString(),
      time_spent: 0,
    };
    setGameHistory([newGame, ...gameHistory]);
    toast.success(`Added ${newGame.game_title}`);
  };

  const deleteGameHistory = (id: string) => {
    const updated = gameHistory.filter((g) => g.id !== id);
    setGameHistory(updated);
    toast.success('Game history deleted');
  };

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  // --- LOGIN SCREEN ---
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <Header />
        <Card className="p-10 border-2 border-accent/30 bg-card mt-10 space-y-6">
          <User className="h-16 w-16 mx-auto text-accent mb-2" />
          <h2 className="text-3xl font-bold mb-2">Welcome to BitLegends</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Sign in with Google or use your email to save progress, avatar, and
            game history.
          </p>

          <div className="flex justify-center mb-6">
            {!useEmail ? (
              <Button
                onClick={() => setUseEmail(true)}
                variant="outline"
                className="text-sm"
              >
                Use Email Instead
              </Button>
            ) : (
              <Button
                onClick={() => setUseEmail(false)}
                variant="outline"
                className="text-sm"
              >
                Use Google Instead
              </Button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {!useEmail ? (
              <motion.div
                key="google"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  onClick={() => googleLogin()}
                  className="bg-gradient-to-r from-primary to-accent text-lg"
                >
                  <LogIn className="mr-2 h-5 w-5" /> Sign in with Google
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="email"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center gap-2"
              >
                <Input
                  placeholder="Enter your email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-56"
                />
                <Button onClick={handleLocalLogin} variant="outline">
                  <Mail className="h-4 w-4 mr-1" /> Login
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    );
  }

  // --- PROFILE SCREEN ---
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile */}
          <Card className="p-6 border-2 border-accent/30 bg-card">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                <Avatar className="h-32 w-32 border-4 border-accent">
                  <AvatarImage src={user.avatar_url || undefined} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                    {user.username?.charAt(0).toUpperCase() || <User />}
                  </AvatarFallback>
                </Avatar>

                <label
                  htmlFor="avatar-upload"
                  className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                >
                  <Upload className="h-8 w-8 text-white" />
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={uploadAvatar}
                  disabled={uploading}
                  className="hidden"
                />
              </div>

              <div className="w-full space-y-3 text-center">
                <h2 className="text-2xl font-bold text-accent">
                  {user.username}
                </h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>

                <Label htmlFor="username">Change Username</Label>
                <Input
                  id="username"
                  value={username || user.username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter new username"
                  className="mt-1"
                />
                <Button
                  onClick={updateProfile}
                  className="w-full bg-gradient-to-r from-primary to-accent"
                >
                  Update Profile
                </Button>

                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="w-full border-destructive text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </Button>
              </div>
            </div>
          </Card>

          {/* Game History */}
          <Card className="md:col-span-2 p-6 border-2 border-accent/30 bg-card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-accent" />
                <h2 className="text-2xl font-bold">Recent Games</h2>
              </div>
              <Button
                onClick={addGameHistory}
                className="flex items-center gap-2"
              >
                <PlusCircle className="h-4 w-4" /> Add Demo Game
              </Button>
            </div>

            {gameHistory.length === 0 ? (
              <div className="text-center py-12">
                <Gamepad2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  No games played yet. Start playing to build your history!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {gameHistory.map((game) => (
                  <div
                    key={game.id}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Gamepad2 className="h-5 w-5 text-accent" />
                      <div>
                        <p className="font-semibold">{game.game_title}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(game.played_at).toLocaleDateString()} •{' '}
                          {new Date(game.played_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 text-sm text-accent">
                        <Clock className="h-4 w-4" />
                        <span>{formatTime(game.time_spent)}</span>
                      </div>
                      {activeGame === game.id ? (
                        <Button
                          size="icon"
                          onClick={() => stopGameSession(game.id)}
                          className="bg-destructive hover:bg-destructive/90"
                        >
                          <Square className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          size="icon"
                          onClick={() => startGameSession(game.id)}
                          className="bg-primary hover:bg-primary/90"
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete game history?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This will remove "{game.game_title}" from your
                              history.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteGameHistory(game.id)}
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
