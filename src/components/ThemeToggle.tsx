
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { Moon, Sun } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme} 
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="rounded-full w-9 h-9 text-foreground hover:bg-accent/50"
    >
      {theme === "light" ? 
        <Moon className="h-[1.2rem] w-[1.2rem] transition-all" /> : 
        <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-300 transition-all" />
      }
    </Button>
  );
}
