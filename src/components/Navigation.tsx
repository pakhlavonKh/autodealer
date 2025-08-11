import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Car, Settings, Home } from 'lucide-react';

export const Navigation = () => {
  const location = useLocation();

  return (
    <header className="border-b border-border/50 bg-gradient-card backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AutoServices
            </h1>
          </div>
          
          <nav className="flex gap-4">
            <Button
              asChild
              variant={location.pathname === '/' ? 'default' : 'ghost'}
              className={location.pathname === '/' ? 'bg-gradient-primary text-primary-foreground' : ''}
            >
              <Link to="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Customer Portal
              </Link>
            </Button>
            
            <Button
              asChild
              variant={location.pathname === '/dealer' ? 'default' : 'ghost'}
              className={location.pathname === '/dealer' ? 'bg-gradient-secondary text-secondary-foreground' : ''}
            >
              <Link to="/dealer" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Dealer Dashboard
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};