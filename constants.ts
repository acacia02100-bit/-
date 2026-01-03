
import { Child, Artwork } from './types';

export const INITIAL_CHILDREN: Child[] = [
  {
    id: 'child-1',
    name: '김서윤',
    nickname: '별사탕',
    age: '7세',
    oneLiner: '“이 그림은 혼자 놀이터에 있었던 날이에요.”',
    teacherObservation: '서윤이는 사물을 그리기보다 기억 속의 감정에서 그림을 출발하는 편입니다.',
    visibility: 'PUBLIC',
    profileImage: 'https://picsum.photos/seed/child1/600/800',
    createdAt: '2024-01-01'
  },
  {
    id: 'child-2',
    name: '이준우',
    nickname: '우주여행자',
    age: '6세',
    oneLiner: '“하늘이 무거워서 까맣게 칠해봤어요.”',
    teacherObservation: '색채의 무게감을 스스로 조절하며 자신의 심상을 표현하는 능력이 탁월합니다.',
    visibility: 'PUBLIC',
    profileImage: 'https://picsum.photos/seed/child2/600/800',
    createdAt: '2024-01-02'
  },
  {
    id: 'child-3',
    name: '박지아',
    nickname: '풀잎',
    age: '8세',
    oneLiner: '“비오는 날의 냄새를 그리고 싶었어요.”',
    teacherObservation: '시각적 형태 너머의 감각을 화폭에 담아내려는 시도가 돋보이는 아이입니다.',
    visibility: 'PUBLIC',
    profileImage: 'https://picsum.photos/seed/child3/600/800',
    createdAt: '2024-01-03'
  }
];

export const INITIAL_ARTWORKS: Artwork[] = [
  {
    id: 'art-1',
    childId: 'child-1',
    imageUrls: ['https://picsum.photos/seed/art1/1200/800', 'https://picsum.photos/seed/art1-2/1200/800'],
    date: '2024.03.15',
    topic: '기억의 조각',
    childQuote: '“놀이터 미끄럼틀 밑에 개미가 많았는데, 걔네들도 집이 있을까요?”',
    teacherRecord: '관찰력이 세밀하며 일상의 작은 존재에 대한 공감이 깊습니다.'
  },
  {
    id: 'art-2',
    childId: 'child-2',
    imageUrls: ['https://picsum.photos/seed/art2/1200/800'],
    date: '2024.04.10',
    topic: '밤의 공기',
    childQuote: '“하늘이 무거워서 까맣게 했어요. 별들도 졸려 보여요.”',
    teacherRecord: '학교 이야기를 나눈 뒤 색 선택이 대담해졌으며, 감정의 깊이가 색면으로 나타납니다.'
  }
];

export const PHILOSOPHY_MESSAGES = [
  "이 그림은 결과물이 아니라 과정의 일부입니다.",
  "아이의 한 마디는 그림보다 더 큰 세계를 담고 있습니다.",
  "우리는 '잘 그린 그림'보다 '생각이 담긴 시간'을 기록합니다.",
  "비교되지 않는 아이의 고유한 시선을 존중합니다."
];
