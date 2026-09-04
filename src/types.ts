export interface PhotoItem {
  id: string;
  url: string;
  name: string;
  caption?: string;
  timestamp: number;
}

export type ScreenStep =
  | 'intro'
  | 'mystery'
  | 'first_photo'
  | 'gallery'
  | 'about_kush'
  | 'piyush_message'
  | 'montage'
  | 'piyush_instagram'
  | 'kush_instagram'
  | 'final_reveal';

export interface CreatorDetails {
  friendName: string;
  friendHandle: string;
  friendUrl: string;
  creatorName: string;
  creatorHandle: string;
  creatorUrl: string;
}

export const LOCKED_DETAILS: CreatorDetails = {
  friendName: 'Kush Gupta',
  friendHandle: '@Gupta0866',
  friendUrl: 'https://instagram.com/Gupta0866',
  creatorName: 'Piyush Jaiswal',
  creatorHandle: '@Piyishjaiswal17',
  creatorUrl: 'https://instagram.com/Piyishjaiswal17',
};
