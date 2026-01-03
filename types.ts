
export type Visibility = 'PRIVATE' | 'LINK_ONLY' | 'PUBLIC';

export interface Child {
  id: string;
  name: string;
  nickname: string;
  age: string;
  oneLiner: string;
  teacherObservation: string;
  visibility: Visibility;
  profileImage: string;
  createdAt: string;
}

export interface Artwork {
  id: string;
  childId: string;
  imageUrls: string[]; // Changed from imageUrl to imageUrls array
  date: string;
  topic: string;
  childQuote: string;
  teacherRecord: string;
}

export type Page = 'HOME' | 'CHILD_DETAIL' | 'ADMIN';
