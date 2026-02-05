import { Box } from '@/components/ui/Box';
import { SearchInput } from '@/components/ui/SearchInput';

export function CityFilter() {
  const handleSearch = () => {
    throw new Error('Function not implemented.');
  };

  return (
    <Box gap="s12">
      <SearchInput
        placeholder="Qual o seu próximo destino?"
        onPress={handleSearch}
      />
    </Box>
  );
}
