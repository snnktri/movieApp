export interface MovieType {//basic movie type
    isFav: boolean
    Poster: string;
    Title: string;
    imdbID:string;
    Type: 'movie' | 'series' | 'episode';
    Year: string;
}