import { DailySpecial } from './types';

export const DEFAULT_SPECIALS: DailySpecial[] = [
  {
    id: '1',
    day: 'Monday',
    title: 'Steak Day Monday\'s',
    description: 'Start your week off with a 200g Succulent Rump Steak, cooked to your liking, served with golden fries and a green garden salad.',
    price: '$24',
    imageUrl: 'https://coasterstavern.co.nz/wp-content/uploads/2024/06/Coasters-Tavern-Standard-Crops-200624-6-1290x570.jpg',
    highlightColor: '#f59e0b'
  },
  {
    id: '2',
    day: 'Tuesday',
    title: 'Chase the Ace',
    description: 'Purchase a beverage between 3.30pm and 5.30pm and your in the draw.',
    price: 'Main Draw @ 5.30pm',
    imageUrl: 'https://coasterstavern.co.nz/wp-content/uploads/2024/11/Coasters-Tavern-Standard-121124-16-1290x570.jpg',
    highlightColor: '#ef4444'
  },
  {
    id: '3',
    day: 'Wednesday',
    title: 'Quiz Night',
    description: 'Starting back on the 21st January 2026, $190 in prizes up for grabs. Bookings Essential.',
    price: '$20',
    imageUrl: './schnitzel.jpg',
    highlightColor: '#eab308'
  },
  {
    id: '4',
    day: 'Thursday',
    title: 'Burger Day Thursdays & Happy Hours 10% & Free Pool all day!',
    description: 'Your choice of Chicken, Beer Battered Fish, Pork Belly or Coasters Beef.  All served with Golden Fries & Onion Rings. 1 Burger for $19 or 2 for $35. Available from 12pm.  Enjoy Happy Hours with 10% selected beverages between 4.30pm & 6.30pm. Our Pool Table is also Free all day and night on Thursdays!',
    price: 'Free Pool Table all day!',
    imageUrl: './ribs.jpg',
    highlightColor: '#f97316'
  },
  {
    id: '5',
    day: 'Friday',
    title: 'Happy Hours 10%',
    description: 'Enjoy 10% discount on selected beverages between 4.30pm & 6.30pm.',
    price: '10% Off!',
    imageUrl: './fish-chips.jpg',
    highlightColor: '#3b82f6'
  },
  {
    id: '6',
    day: 'Saturday',
    title: 'Chase the Ace',
    description: 'Tickets from 3.30pm, Draw @ 6.30pm.',
    price: '$35',
    imageUrl: './platter.jpg',
    highlightColor: '#06b6d4'
  },
  {
    id: '7',
    day: 'Sunday',
    title: 'Two Course Sunday Roast',
    description: 'Traditional roast of the day with roasted vegetables, seasonal greens and rich gravy, with an Ice Cream Sundae to finish. ',
    price: '$28',
    imageUrl: './roast.jpg',
    highlightColor: '#84cc16'
  }
];