
import React from 'react';
import { Child } from '../types';

interface HomeProps {
  childrenList: Child[];
  onChildSelect: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({ childrenList, onChildSelect }) => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Hero Section */}
      <header id="home" className="py-32 md:py-48 text-center space-y-4">
        <h1 className="serif text-4xl md:text-6xl font-bold text-stone-800 leading-tight">
          아이 한 명 한 명의<br />시간과 생각을 담습니다
        </h1>
        <p className="text-stone-500 max-w-xl mx-auto font-light leading-relaxed text-lg">
          여기는 결과를 소비하지 않는 곳입니다. <br />
          그림 뒤에 숨겨진 아이의 문장과 교사의 관찰을 통해<br />
          하나의 작은 세계를 만나보세요.
        </p>
        <div className="pt-8">
          <button 
            onClick={() => document.getElementById('stories')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-stone-800 text-white rounded-full text-sm font-medium hover:bg-stone-900 transition-all shadow-lg"
          >
            기록들 살펴보기
          </button>
        </div>
      </header>

      {/* Stories Grid Section */}
      <section id="stories" className="py-24 border-t border-stone-100">
        <div className="mb-16">
          <h2 className="serif text-3xl text-stone-800 mb-2">Children’s Stories</h2>
          <p className="text-sm text-stone-400">아이들 각자의 고유한 세계관이 담긴 기록</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
          {childrenList.map((child) => (
            <div 
              key={child.id}
              onClick={() => onChildSelect(child.id)}
              className="group cursor-pointer space-y-4 transition-all"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-stone-200 shadow-sm">
                <img 
                  src={child.profileImage} 
                  alt={child.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-stone-800">{child.nickname}</span>
                  <span className="text-xs text-stone-400 font-light">{child.age}</span>
                </div>
                <p className="text-xs text-stone-500 italic leading-relaxed line-clamp-2">
                  {child.oneLiner}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="my-40 py-32 bg-stone-100 rounded-[4rem] px-8 md:px-20 text-center shadow-inner">
        <div className="max-w-3xl mx-auto space-y-8">
          <span className="text-[10px] tracking-[0.4em] text-stone-400 uppercase font-bold">Our Philosophy</span>
          <h2 className="serif text-4xl text-stone-800 leading-snug">
            우리는 '잘 그린 그림'보다<br />
            '아이가 머문 시간'을 믿습니다
          </h2>
          <p className="text-stone-500 font-light leading-relaxed">
            까미유미뇽 아카이브는 아이들의 예술적 완성도보다 그 과정에서 일어나는 생각의 흐름에 집중합니다. 
            모든 아이는 자신만의 속도와 색깔을 가지고 있으며, 우리는 그것을 편견 없이 기록합니다.
          </p>
          
          <div className="grid md:grid-cols-3 gap-12 text-left mt-20">
            <div className="space-y-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 text-xs font-bold">01</div>
              <h3 className="font-semibold text-stone-800">공정한 기록</h3>
              <p className="text-xs text-stone-500 leading-relaxed">순위나 경쟁 없이 모든 아이의 작품은 동일한 깊이의 관찰로 기록됩니다.</p>
            </div>
            <div className="space-y-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 text-xs font-bold">02</div>
              <h3 className="font-semibold text-stone-800">생각의 아카이브</h3>
              <p className="text-xs text-stone-500 leading-relaxed">그림과 함께 아이가 직접 내뱉은 문장을 기록하여 작품의 본질을 보존합니다.</p>
            </div>
            <div className="space-y-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 text-xs font-bold">03</div>
              <h3 className="font-semibold text-stone-800">교사의 시선</h3>
              <p className="text-xs text-stone-500 leading-relaxed">결과에 대한 평가가 아닌, 과정에 대한 교사의 세밀한 관찰 일지를 제공합니다.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
