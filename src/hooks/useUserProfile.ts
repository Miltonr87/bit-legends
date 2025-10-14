import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { toast } from 'sonner';
import type { ProfileData, UseUserProfile } from '@/types';

export function useUserProfile(): UseUserProfile {
    const [user, setUser] = useState<ProfileData | null>(null);
    const [username, setUsername] = useState('');
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const savedUser = localStorage.getItem('bitlegends_user');
        if (savedUser) setUser(JSON.parse(savedUser));
    }, []);

    const loginWithGoogle = async () => {
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

    const loginWithEmail = (email: string) => {
        if (!email.includes('@')) {
            toast.error('Enter a valid email address');
            return;
        }

        const localUser: ProfileData = {
            username: email.split('@')[0],
            email,
            avatar_url: null,
            provider: 'local',
        };

        localStorage.setItem('bitlegends_user', JSON.stringify(localUser));
        setUser(localUser);
        toast.success(`Welcome, ${localUser.username}!`);
    };

    const logout = async () => {
        try {
            await signOut(auth);
            toast.success('Signed out successfully');
        } catch (error) {
            console.error('Error during sign-out:', error);
            toast.error('Failed to sign out. Please try again.');
        } finally {
            localStorage.removeItem('bitlegends_user');
            setUser(null);
        }
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

    return {
        user,
        username,
        uploading,
        loginWithGoogle,
        loginWithEmail,
        logout,
        uploadAvatar,
        updateProfile,
        setUsername,
    };
}
