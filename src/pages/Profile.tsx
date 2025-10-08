import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getGameHistory,
  deleteGameHistory,
  type GameHistory,
} from '@/lib/localStorage';
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
} from '@/components/ui/alert-dialog';

import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

interface ProfileData {
  username: string;
  email: string;
  avatar_url: string | null;
  provider?: 'google' | 'local';
  uid?: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<ProfileData | null>(null);
  const [username, setUsername] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);
  const [useEmail, setUseEmail] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [historyToDelete, setHistoryToDelete] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('bitlegends_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    loadGameHistory();
  }, []);

  const loadGameHistory = () => {
    const history = getGameHistory();
    setGameHistory(history.slice(0, 10));
  };

  // ✅ Firebase Google Sign-In
  const handleGoogleLogin = async () => {
    try {
      toast('Logging in with Google...', { description: 'Please wait' });
      const provider = new GoogleAuthProvider();
      const userCred = await signInWithPopup(auth, provider);
      const firebaseUser = userCred.user;

      const googleUser: ProfileData = {
        username: firebaseUser.displayName || 'Player',
        email: firebaseUser.email || '',
        avatar_url: firebaseUser.photoURL,
        provider: 'google',
        uid: firebaseUser.uid,
      };

      localStorage.setItem('bitlegends_user', JSON.stringify(googleUser));
      setUser(googleUser);
      toast.success(`Welcome, ${googleUser.username}!`);
    } catch (err) {
      console.error(err);
      toast.error('Google login failed');
    }
  };

  const handleLocalLogin = () => {
    if (!emailInput.includes('@')) {
      toast.error('Enter a valid email address');
      return;
    }
    const localUser: ProfileData = {
      username: emailInput.split('@')[0],
      email: emailInput,
      avatar_url: null,
      provider: 'local',
    };
    localStorage.setItem('bitlegends_user', JSON.stringify(localUser));
    setUser(localUser);
    toast.success(`Welcome, ${localUser.username}!`);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch {}
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

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const handleDeleteHistory = (id: string) => {
    setHistoryToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (historyToDelete) {
      deleteGameHistory(historyToDelete);
      loadGameHistory();
      toast.success('Game history deleted');
    }
    setDeleteDialogOpen(false);
    setHistoryToDelete(null);
  };

  // --- LOGIN SCREEN ---
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 text-center">
        <Header className="mb-8" />
        <Card className="w-[90%] max-w-sm sm:max-w-md p-6 sm:p-10 border-2 border-accent/30 bg-card rounded-2xl shadow-md space-y-6">
          <User className="h-14 w-14 sm:h-16 sm:w-16 mx-auto text-accent mb-1" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-1">Welcome</h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 max-w-xs sm:max-w-md mx-auto">
            Sign in with Google or use your email to save progress, avatar, and
            game history.
          </p>

          <div className="flex justify-center mb-4">
            {!useEmail ? (
              <Button
                onClick={() => setUseEmail(true)}
                variant="outline"
                className="text-xs sm:text-sm"
              >
                Use Email Instead
              </Button>
            ) : (
              <Button
                onClick={() => setUseEmail(false)}
                variant="outline"
                className="text-xs sm:text-sm"
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
                  onClick={handleGoogleLogin}
                  className="w-full bg-gradient-to-r from-primary to-accent text-base sm:text-lg py-5"
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
                className="flex flex-col sm:flex-row items-center justify-center gap-2"
              >
                <Input
                  placeholder="Enter your email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full sm:w-56"
                />
                <Button
                  onClick={handleLocalLogin}
                  variant="outline"
                  className="w-full sm:w-auto mt-2 sm:mt-0"
                >
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
          <ProfileCard
            user={user}
            uploading={uploading}
            uploadAvatar={uploadAvatar}
            username={username}
            setUsername={setUsername}
            updateProfile={updateProfile}
            handleSignOut={handleSignOut}
          />
          <HistoryCard
            gameHistory={gameHistory}
            handleDeleteHistory={handleDeleteHistory}
            formatTime={formatTime}
          />
        </div>
      </div>
      <DeleteDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        confirmDelete={confirmDelete}
      />
    </div>
  );
}

// ✅ Helper Components

function ProfileCard({
  user,
  uploading,
  uploadAvatar,
  username,
  setUsername,
  updateProfile,
  handleSignOut,
}: any) {
  return (
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
          <h2 className="text-2xl font-bold text-accent">{user.username}</h2>
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
      <br />
    </Card>
  );
}

function HistoryCard({ gameHistory, handleDeleteHistory, formatTime }: any) {
  return (
    <Card className="md:col-span-2 p-6 border-2 border-accent/30 bg-card">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="h-6 w-6 text-accent" />
        <h2 className="text-2xl font-bold">Game History</h2>
      </div>
      {gameHistory.length === 0 ? (
        <div className="text-center py-12">
          <Gamepad2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            No games played yet. Start playing to see your history!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {gameHistory.map((history: GameHistory) => (
            <div
              key={history.id}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-accent/20 hover:border-accent/40 transition-colors"
            >
              <div className="flex-1">
                <p className="font-semibold">{history.gameTitle}</p>
                <div className="flex items-center gap-4 mt-1 flex-wrap">
                  <p className="text-sm text-muted-foreground">
                    {new Date(history.playedAt).toLocaleDateString()} •{' '}
                    <span className="text-accent">
                      {new Date(history.playedAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {formatTime(history.timeSpent)}
                  </div>
                  {history.score && (
                    <p className="text-sm text-accent font-semibold">
                      Score: {history.score.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteHistory(history.id)}
                className="hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

function DeleteDialog({ open, setOpen, confirmDelete }: any) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="w-[90vw] max-w-sm sm:max-w-md p-6 rounded-2xl border border-accent/30 bg-card shadow-xl mx-auto text-center">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg sm:text-xl font-bold">
            Delete Game History
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm sm:text-base text-muted-foreground mt-2">
            Are you sure you want to delete this game from your history?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col gap-2 mt-6">
          <AlertDialogAction
            onClick={confirmDelete}
            className="w-full py-2.5 sm:py-3 text-base sm:text-sm"
          >
            Delete
          </AlertDialogAction>
          <AlertDialogCancel className="w-full py-2.5 sm:py-3 text-base sm:text-sm border border-border bg-muted/20">
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
