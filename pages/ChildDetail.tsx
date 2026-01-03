
import React from 'react';
import { Child, Artwork } from '../types';
import { PHILOSOPHY_MESSAGES } from '../constants';

interface ChildDetailProps {
  child: Child;
  artworks: Artwork[];
  onBack: () => void;
}

const ChildDetail: React.FC<ChildDetailProps> = ({ child, artworks, onBack }) => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 md:py-32">
        <button 
          onClick={onBack}
          className="mb-12 text-stone-400 hover:text-stone-800 flex items-center space-x-2 text-sm group"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          <span>전체 아이들 보기</span>
        </button>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
          <div className="w-48 h-64 flex-shrink-0 bg-stone-100 rounded-2xl overflow-hidden shadow-xl">
            <img src={child.profileImage} alt={child.name} className="w-full h-full object-cover" />
          </div>
          <div className="space-y-6 flex-grow text-center md:text-left">
            <div>
              <h1 className="serif text-4xl md:text-5xl font-bold text-stone-800 mb-2">{child.nickname}</h1>
              <p className="text-stone-400 font-light">{child.name} | {child.age}</p>
            </div>
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 inline-block md:block">
              <p className="text-stone-600 text-sm leading-relaxed italic">
                “{child.teacherObservation}”
              </p>
              <p className="text-[10px] text-stone-300 mt-4 uppercase tracking-widest">Teacher's Note</p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Break */}
      <div className="bg-stone-50 py-12 text-center border-y border-stone-100">
        <p className="serif text-stone-400 italic font-light">"{PHILOSOPHY_MESSAGES[0]}"</p>
      </div>

      {/* Timeline Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 space-y-32">
        {artworks.length === 0 ? (
          <div className="py-20 text-center text-stone-300 italic">
            기록된 작품이 아직 없습니다.
          </div>
        ) : (
          artworks.map((art, index) => (
            <div key={art.id} className="relative group">
              {/* Vertical line for timeline */}
              {index !== artworks.length - 1 && (
                <div className="absolute left-1/2 md:left-0 top-full h-32 w-px bg-stone-100 -translate-x-1/2"></div>
              )}
              
              <div className="space-y-10">
                <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-stone-100 pb-4">
                  <div className="text-center md:text-left">
                    <span className="text-xs text-stone-400 tracking-widest uppercase">{art.date}</span>
                    <h3 className="serif text-2xl text-stone-800 mt-1">{art.topic}</h3>
                  </div>
                </div>

                {/* Multiple Images Display */}
                <div className="space-y-4">
                  {art.imageUrls && art.imageUrls.map((url, imgIdx) => (
                    <div key={imgIdx} className="rounded-3xl overflow-hidden shadow-2xl bg-stone-50 group/img">
                      <img src={url} alt={`${art.topic} - ${imgIdx + 1}`} className="w-full h-auto transition-transform duration-700 hover:scale-[1.02]" />
                    </div>
                  ))}
                  {(!art.imageUrls || art.imageUrls.length === 0) && (
                    <div className="h-64 bg-stone-100 rounded-3xl flex items-center justify-center text-stone-300 italic">
                      이미지가 없습니다.
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-12 pt-6">
                  <div className="space-y-4">
                    <span className="text-[10px] tracking-widest uppercase text-amber-800 font-semibold">Child's Word</span>
                    <blockquote className="serif text-xl text-stone-700 leading-relaxed italic">
                      “{art.childQuote}”
                    </blockquote>
                  </div>
                  <div className="space-y-4 bg-stone-50/50 p-6 rounded-2xl border border-stone-50">
                    <span className="text-[10px] tracking-widest uppercase text-stone-400 font-semibold">Teacher's Observation</span>
                    <p className="text-sm text-stone-500 leading-relaxed">
                      {art.teacherRecord}
                    </p>
                  </div>
                </div>
              </div>

              {/* Injected Philosophy Message every 2 items */}
              {(index + 1) % 2 === 0 && index !== artworks.length - 1 && (
                <div className="py-20 text-center">
                   <p className="serif text-stone-300 text-lg">"{PHILOSOPHY_MESSAGES[(index + 1) % PHILOSOPHY_MESSAGES.length]}"</p>
                </div>
              )}
            </div>
          ))
        )}
      </section>

      {/* CTAs */}
      <section className="bg-stone-900 text-white py-24 text-center">
        <div className="max-w-2xl mx-auto px-6 space-y-8">
          <h2 className="serif text-3xl md:text-4xl">결과물이 아닌 과정을 믿는 교육</h2>
          <p className="text-stone-400 font-light leading-relaxed">
            아이의 모든 낙서와 붓터치는 소중한 성장 기록입니다.<br />
            까미유미뇽은 이 모든 순간을 함께 걷습니다.
          </p>
          <button 
            onClick={onBack}
            className="inline-block px-10 py-4 bg-white text-stone-900 rounded-full font-medium transition-transform hover:scale-105"
          >
            돌아가기
          </button>
        </div>
      </section>
    </div>
  );
};

export default ChildDetail;
