import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ onSearch, placeholder = "Search by city..." }: SearchBarProps) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(city.trim());
  };

  const handleClear = () => {
    setCity('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 max-w-md">
      <div className="relative flex-1">
        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="pl-10 bg-background/50 border-border/50 focus:border-primary/50"
        />
      </div>
      
      <Button 
        type="submit"
        className="bg-gradient-primary hover:bg-gradient-secondary text-primary-foreground hover:shadow-glow transition-all duration-300"
      >
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
      
      {city && (
        <Button 
          type="button"
          variant="outline"
          onClick={handleClear}
          className="hover:bg-muted/50"
        >
          Clear
        </Button>
      )}
    </form>
  );
};