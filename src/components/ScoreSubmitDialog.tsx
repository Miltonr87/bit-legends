import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Trophy } from "lucide-react";
import { addGameHistory } from "@/lib/localStorage";

interface ScoreSubmitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gameId: string;
  gameTitle: string;
  historyId?: string;
}

const ScoreSubmitDialog = ({
  open,
  onOpenChange,
  gameId,
  gameTitle,
}: ScoreSubmitDialogProps) => {
  const [score, setScore] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const scoreValue = parseInt(score);
    if (isNaN(scoreValue) || scoreValue < 0) {
      toast.error("Please enter a valid score");
      return;
    }

    setSubmitting(true);

    try {
      // Save to local storage
      addGameHistory({
        gameId,
        gameTitle,
        playedAt: new Date().toISOString(),
        timeSpent: 0,
        score: scoreValue,
      });

      toast.success(`Score of ${scoreValue.toLocaleString()} saved for ${gameTitle}!`);
      
      // Share if available
      if (navigator.share) {
        try {
          await navigator.share({
            title: `${gameTitle} - High Score!`,
            text: `I just scored ${scoreValue.toLocaleString()} points in ${gameTitle}! 🎮`,
            url: window.location.origin,
          });
        } catch (err) {
          // User cancelled share
        }
      }

      setScore("");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to save score");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Submit Your Score
          </DialogTitle>
          <DialogDescription>
            Enter your score for {gameTitle}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="score">Score</Label>
            <Input
              id="score"
              type="number"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              placeholder="Enter your score"
              min="0"
              required
              className="mt-1"
            />
          </div>

          <div className="flex gap-2">
            <Button 
              type="submit"
              disabled={submitting} 
              className="flex-1"
            >
              {submitting ? "Saving..." : "Save Score"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setScore("");
                onOpenChange(false);
              }}
              disabled={submitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ScoreSubmitDialog;
