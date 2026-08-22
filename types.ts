export interface DailySpecial {
  id: string;
  day: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  highlightColor: string;
}

export interface AISuggestionResponse {
  title: string;
  description: string;
}
