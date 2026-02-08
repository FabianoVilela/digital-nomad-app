import Adventure from './svg/Adventure.svg';
import Beach from './svg/Beach.svg';
import ChevronDown from './svg/Chevron down.svg';
import ChevronLeft from './svg/Chevron left.svg';
import ChevronRight from './svg/Chevron right.svg';
import ChevronUp from './svg/Chevron up.svg';
import Close from './svg/Close.svg';
import Culture from './svg/Culture.svg';
import Explore from './svg/Explore.svg';
import FavoriteFill from './svg/Favorite (fill).svg';
import FavoriteOutline from './svg/Favorite (outline).svg';
import Gastronomy from './svg/Gastronomy.svg';
import Group from './svg/Group.svg';
import History from './svg/History.svg';
import HomeFill from './svg/Home (fill).svg';
import HomeOutline from './svg/Home (outline).svg';
import Logout from './svg/Logout.svg';
import Luxury from './svg/Luxury.svg';
import Nature from './svg/Nature.svg';
import PersonFill from './svg/Person (fill).svg';
import PersonOutline from './svg/Person (outline).svg';
import SearchOutline from './svg/Search (outline).svg';
import Shopping from './svg/Shopping.svg';
import Star from './svg/Star.svg';
import Urban from './svg/Urban.svg';

export const icons = {
  adventure: Adventure,
  beach: Beach,
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronUp: ChevronUp,
  close: Close,
  culture: Culture,
  explore: Explore,
  favoriteFill: FavoriteFill,
  favoriteOutline: FavoriteOutline,
  gastronomy: Gastronomy,
  group: Group,
  history: History,
  homeFill: HomeFill,
  homeOutline: HomeOutline,
  logout: Logout,
  luxury: Luxury,
  nature: Nature,
  personFill: PersonFill,
  personOutline: PersonOutline,
  searchOutline: SearchOutline,
  shopping: Shopping,
  star: Star,
  urban: Urban,
};

export type IconName = keyof typeof icons;
