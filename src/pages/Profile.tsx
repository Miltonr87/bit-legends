import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  time_spent: number;
}

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<Profile | null>(null);
  const [username, setUsername] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('bitlegends_user');
    const savedHistory = localStorage.getItem('bitlegends_history');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedHistory) setGameHistory(JSON.parse(savedHistory));
  }, []);

  // --- Google Login Simulation ---
  const handleGoogleLogin = async () => {
    try {
      toast('Connecting to Google...', { description: 'Please wait' });

      // Simulate real Google login (use your real OAuth flow later)
      setTimeout(() => {
        const googleUser: Profile = {
          username: 'Milton Rodrigues',
          email: 'miltonr87@gmail.com',
          avatar_url:
            'https://lh3.googleusercontent.com/a-/AOh14Gg8EXAMPLEIMAGE=s96-c',
          provider: 'google',
        };
        localStorage.setItem('bitlegends_user', JSON.stringify(googleUser));
        setUser(googleUser);
        toast.success(`Welcome, ${googleUser.username}!`);
      }, 1200);
    } catch (err) {
      toast.error('Google login failed');
      console.error(err);
    }
  };

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

  const updateProfile = () => {
    if (!user) return;
    const updated = { ...user, username };
    setUser(updated);
    localStorage.setItem('bitlegends_user', JSON.stringify(updated));
    toast.success('Profile updated successfully!');
  };

  const deleteGameHistory = (id: string) => {
    const updated = gameHistory.filter((g) => g.id !== id);
    setGameHistory(updated);
    localStorage.setItem('bitlegends_history', JSON.stringify(updated));
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

  // --- Not Logged In ---
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <Header />
        <Card className="p-10 border-2 border-accent/30 bg-card mt-10 space-y-6">
          <User className="h-16 w-16 mx-auto text-accent mb-2" />
          <h2 className="text-3xl font-bold mb-2">Welcome to BitLegends</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Sign in with Google or any custom email to save your progress,
            avatar, and game history.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleGoogleLogin}
              className="bg-gradient-to-r from-primary to-accent text-lg"
            >
              <LogIn className="mr-2 h-5 w-5" /> Sign in with Google
            </Button>

            <div className="flex items-center gap-2">
              <Input
                placeholder="Enter your email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-56"
              />
              <Button onClick={handleLocalLogin} variant="outline">
                <Mail className="h-4 w-4 mr-1" /> Login
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // --- Logged In ---
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <Card className="p-6 border-2 border-accent/30 bg-card">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                <Avatar className="h-32 w-32 border-4 border-accent">
                  <AvatarImage src={user.avatar_url || undefined} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                    {user.username?.charAt(0).toUpperCase() || <User />}
                  </AvatarFallback>
                </Avatar>

                {/* Avatar upload always enabled */}
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

                {/* Rename allowed even for Google users */}
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
            <div className="flex items-center gap-3 mb-6">
              <Clock className="h-6 w-6 text-accent" />
              <h2 className="text-2xl font-bold">Recent Games</h2>
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
                      {game.time_spent > 0 && (
                        <div className="flex items-center gap-2 text-sm text-accent">
                          <Clock className="h-4 w-4" />
                          <span>{formatTime(game.time_spent)}</span>
                        </div>
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
                              history. This action cannot be undone.
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
