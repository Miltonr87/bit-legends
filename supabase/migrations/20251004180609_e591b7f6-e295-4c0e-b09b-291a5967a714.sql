-- Add favorite_game_id column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN favorite_game_id text;