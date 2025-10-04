-- Add score column to game_history
ALTER TABLE public.game_history 
ADD COLUMN score integer;

-- Add screenshot_url for sharing
ALTER TABLE public.game_history 
ADD COLUMN screenshot_url text;

-- Create index for faster leaderboard queries
CREATE INDEX idx_game_history_leaderboard 
ON public.game_history(game_id, score DESC, played_at DESC)
WHERE score IS NOT NULL;

-- Update RLS policy to allow users to update their own scores
CREATE POLICY "Users can update their own game history scores"
ON public.game_history
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);