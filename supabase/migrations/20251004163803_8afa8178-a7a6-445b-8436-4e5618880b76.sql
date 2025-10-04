-- Add DELETE policy for game_history table
CREATE POLICY "Users can delete their own game history"
ON public.game_history
FOR DELETE
USING (auth.uid() = user_id);