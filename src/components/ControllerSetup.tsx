import { Card } from '@/components/ui/card';
import { Gamepad2, Keyboard } from 'lucide-react';

export const ControllerSetup = () => {
  const dpad = {
    up: '↑',
    down: '↓',
    left: '←',
    right: '→',
    l1: 'Q',
    r1: 'R',
  };

  const actions = ['Z', 'X', 'A', 'S', 'E', 'T'];

  const middle = [
    { action: 'Select', key: 'SHIFT' },
    { action: 'Start', key: 'ENTER' },
  ];

  return (
    <Card className="p-6 border-2 border-accent/30 bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-md shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <Gamepad2 className="h-6 w-6 text-accent animate-pulse" />
          <h2 className="text-lg sm:text-xl font-bold text-foreground">
            Controller
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
          <Keyboard className="h-4 w-4" />
          Keyboard
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between gap-8 items-start">
        <div className="flex flex-col items-center flex-1 min-w-[140px]">
          <h3 className="text-sm font-semibold mb-3 text-accent uppercase tracking-wide">
            Movement
          </h3>
          <div className="grid grid-cols-3 gap-2 place-items-center">
            <div />
            <div className="h-10 w-10 flex items-center justify-center rounded-md bg-muted/40 border border-border font-semibold">
              {dpad.up}
            </div>
            <div />
            <div className="h-10 w-10 flex items-center justify-center rounded-md bg-muted/40 border border-border font-semibold">
              {dpad.left}
            </div>
            <div className="h-10 w-10 flex items-center justify-center rounded-md bg-muted/40 border border-border font-semibold text-muted-foreground">
              ●
            </div>
            <div className="h-10 w-10 flex items-center justify-center rounded-md bg-muted/40 border border-border font-semibold">
              {dpad.right}
            </div>
            <div />
            <div className="h-10 w-10 flex items-center justify-center rounded-md bg-muted/40 border border-border font-semibold">
              {dpad.down}
            </div>
            <div />
          </div>
          <div className="flex flex-col items-center gap-2 mt-6">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wide mb-1">
              System
            </h3>
            {middle.map(({ action, key }) => (
              <div
                key={action}
                className="flex items-center justify-between w-36 px-3 py-2 rounded-md bg-muted/40 border border-border hover:border-primary/50 transition-colors"
              >
                <span className="text-sm text-foreground font-medium">
                  {action}
                </span>
                <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-semibold">
                  {key}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center flex-1">
          <h3 className="text-sm font-semibold mb-3 text-accent uppercase tracking-wide">
            Action Buttons
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {actions.map((action) => (
              <div
                key={action}
                className="h-10 w-16 flex items-center justify-center rounded-md bg-muted/40 border border-border font-semibold text-foreground hover:border-accent/40 transition-colors"
              >
                {action}
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center mt-5">
            <h3 className="text-sm font-semibold text-accent uppercase tracking-wide mb-2">
              Triggers
            </h3>
            <div className="flex gap-4">
              <div className="h-9 w-9 flex items-center justify-center rounded-md bg-muted/40 border border-border font-semibold">
                {dpad.l1}
              </div>
              <div className="h-9 w-9 flex items-center justify-center rounded-md bg-muted/40 border border-border font-semibold">
                {dpad.r1}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-4 text-center italic">
        Tip: You can customize your key bindings in the emulator’s input!
      </p>
    </Card>
  );
};
