-- Add time_spent column to game_history table
ALTER TABLE public.game_history 
ADD COLUMN time_spent integer DEFAULT 0;

COMMENT ON COLUMN public.game_history.time_spent IS 'Time spent in seconds';

-- Create game_saves table
CREATE TABLE public.game_saves (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  game_id text NOT NULL,
  game_title text NOT NULL,
  save_data jsonb NOT NULL,
  save_name text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.game_saves ENABLE ROW LEVEL SECURITY;

-- Create policies for game_saves
CREATE POLICY "Users can view their own game saves"
ON public.game_saves
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own game saves"
ON public.game_saves
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own game saves"
ON public.game_saves
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own game saves"
ON public.game_saves
FOR DELETE
USING (auth.uid() = user_id);

-- Add trigger for updated_at
CREATE TRIGGER update_game_saves_updated_at
BEFORE UPDATE ON public.game_saves
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();