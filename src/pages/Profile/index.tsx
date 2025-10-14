import { useState } from 'react';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { HistoryCard } from '@/components/HistoryCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { User, Upload, LogIn, LogOut } from 'lucide-react';
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
import { useUserProfile } from '@/hooks/useUserProfile';
import { useGameHistory } from '@/hooks/useGameHistory';
import type { DeleteDialogProps, ProfileCardProps } from '@/types';

export default function Profile() {
  const {
    user,
    username,
    uploading,
    loginWithGoogle,
    logout,
    uploadAvatar,
    updateProfile,
    setUsername,
  } = useUserProfile();

  const { gameHistory, deleteHistory, formatTime } = useGameHistory();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const handleDeleteRequest = (id: string) => {
    setPendingDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (pendingDeleteId) deleteHistory(pendingDeleteId);
    setDeleteDialogOpen(false);
    setPendingDeleteId(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 text-center">
        <Header />
        <Card className="w-[90%] max-w-sm sm:max-w-md p-6 sm:p-10 border-2 border-accent/30 bg-card rounded-2xl shadow-md space-y-6">
          <User className="h-14 w-14 sm:h-16 sm:w-16 mx-auto text-accent mb-1" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-1">Welcome</h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 max-w-xs sm:max-w-md mx-auto">
            Sign in with Google to save progress, avatar, and game history.
          </p>

          <Button
            onClick={loginWithGoogle}
            className="w-full bg-gradient-to-r from-primary to-accent text-base sm:text-lg py-5"
          >
            <LogIn className="mr-2 h-5 w-5" /> Sign in with Google
          </Button>
        </Card>
      </div>
    );
  }
  return (
    <div className="overflow-x-hidden flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <ProfileCard
            user={user}
            uploading={uploading}
            username={username}
            onAvatarUpload={uploadAvatar}
            onUsernameChange={setUsername}
            onUpdateProfile={updateProfile}
            onSignOut={logout}
          />
          <HistoryCard
            gameHistory={gameHistory}
            handleDeleteHistory={handleDeleteRequest}
            formatTime={formatTime}
          />
        </div>
      </main>
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirmDelete={confirmDelete}
      />
      <Footer />
    </div>
  );
}

function ProfileCard({
  user,
  uploading,
  username,
  onAvatarUpload,
  onUsernameChange,
  onUpdateProfile,
  onSignOut,
}: ProfileCardProps) {
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
            onChange={onAvatarUpload}
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
            onChange={(e) => onUsernameChange(e.target.value)}
            placeholder="Enter new username"
            className="mt-1"
          />
          <Button
            onClick={onUpdateProfile}
            className="w-full bg-gradient-to-r from-primary to-accent"
          >
            Update Profile
          </Button>
          <Button
            onClick={onSignOut}
            variant="outline"
            className="w-full border-destructive text-destructive hover:bg-destructive/10"
          >
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </Button>
        </div>
      </div>
    </Card>
  );
}

function DeleteDialog({
  open,
  onOpenChange,
  onConfirmDelete,
}: DeleteDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
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
            onClick={onConfirmDelete}
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
