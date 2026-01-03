
import React, { useState, useRef } from 'react';
import { Child, Artwork, Visibility } from '../types';

interface AdminProps {
  childrenList: Child[];
  artworksList: Artwork[];
  onUpdate: (children: Child[], artworks: Artwork[]) => void;
  onExit: () => void;
}

const Admin: React.FC<AdminProps> = ({ childrenList, artworksList, onUpdate, onExit }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [view, setView] = useState<'LIST' | 'ADD_CHILD' | 'ADD_ARTWORK'>('LIST');
  const [selectedChildForArt, setSelectedChildForArt] = useState<string | null>(null);
  
  const profileInputRef = useRef<HTMLInputElement>(null);
  const artworkImagesInputRef = useRef<HTMLInputElement>(null);

  // New Child Form
  const [newChild, setNewChild] = useState({
    name: '',
    nickname: '',
    age: '',
    oneLiner: '',
    teacherObservation: '',
    visibility: 'PRIVATE' as Visibility,
    profileImage: '' // Will store base64
  });

  // New Artwork Form
  const [newArt, setNewArt] = useState({
    date: new Date().toISOString().split('T')[0],
    topic: '',
    childQuote: '',
    teacherRecord: '',
    imageUrls: [] as string[] // Will store array of base64
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1111') {
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const base64 = await fileToBase64(e.target.files[0]);
      setNewChild(prev => ({ ...prev, profileImage: base64 }));
    }
  };

  // Fixed error in handleArtworkImagesChange by explicitly casting Array.from result to File[]
  const handleArtworkImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files: File[] = Array.from(e.target.files);
      const base64Promises = files.map(file => fileToBase64(file));
      const base64s = await Promise.all(base64Promises);
      setNewArt(prev => ({ ...prev, imageUrls: [...prev.imageUrls, ...base64s] }));
    }
  };

  const handleAddChild = (e: React.FormEvent) => {
    e.preventDefault();
    const child: Child = {
      ...newChild,
      id: `child-${Date.now()}`,
      profileImage: newChild.profileImage || `https://picsum.photos/seed/${Date.now()}/600/800`,
      createdAt: new Date().toISOString()
    };
    onUpdate([...childrenList, child], artworksList);
    setView('LIST');
    setNewChild({
      name: '',
      nickname: '',
      age: '',
      oneLiner: '',
      teacherObservation: '',
      visibility: 'PRIVATE',
      profileImage: ''
    });
  };

  const handleAddArtwork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChildForArt) return;
    const art: Artwork = {
      ...newArt,
      id: `art-${Date.now()}`,
      childId: selectedChildForArt,
      imageUrls: newArt.imageUrls.length > 0 ? newArt.imageUrls : [`https://picsum.photos/seed/${Date.now()}/1200/800`],
    };
    onUpdate(childrenList, [...artworksList, art]);
    setView('LIST');
    setNewArt({
      date: new Date().toISOString().split('T')[0],
      topic: '',
      childQuote: '',
      teacherRecord: '',
      imageUrls: []
    });
  };

  const deleteChild = (id: string) => {
    if (confirm('정말로 이 아이의 모든 기록을 삭제하시겠습니까?')) {
      onUpdate(
        childrenList.filter(c => c.id !== id),
        artworksList.filter(a => a.childId !== id)
      );
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <form onSubmit={handleLogin} className="bg-white p-10 rounded-3xl shadow-xl border border-stone-100 max-w-sm w-full space-y-6">
          <div className="text-center">
            <h2 className="serif text-2xl font-bold mb-2">관리자 로그인</h2>
            <p className="text-xs text-stone-400">교사 전용 업로드 시스템</p>
          </div>
          <input 
            type="password" 
            placeholder="비밀번호" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-200 transition-all"
            autoFocus
          />
          <button type="submit" className="w-full py-3 bg-stone-800 text-white rounded-xl font-medium hover:bg-stone-900 transition-all">
            접속하기
          </button>
          <button onClick={onExit} type="button" className="w-full text-stone-400 text-sm hover:underline">홈으로 돌아가기</button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="serif text-3xl font-bold text-stone-800">기록 관리 시스템</h1>
          <p className="text-sm text-stone-400">아이들의 소중한 시간을 기록하세요.</p>
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={() => setView('LIST')} 
            className={`px-4 py-2 rounded-lg text-sm transition-all ${view === 'LIST' ? 'bg-stone-800 text-white shadow-md' : 'bg-stone-100 text-stone-600'}`}
          >
            목록 보기
          </button>
          <button 
            onClick={() => setView('ADD_CHILD')} 
            className={`px-4 py-2 rounded-lg text-sm transition-all ${view === 'ADD_CHILD' ? 'bg-amber-800 text-white shadow-md' : 'bg-stone-100 text-stone-600'}`}
          >
            + 아이 추가
          </button>
        </div>
      </div>

      {view === 'LIST' && (
        <div className="space-y-6">
          {childrenList.length === 0 ? (
            <div className="bg-stone-50 p-20 text-center rounded-3xl border-2 border-dashed border-stone-200 text-stone-400">
              기록된 아이가 없습니다. 첫 아이를 추가해보세요.
            </div>
          ) : (
            childrenList.map(child => (
              <div key={child.id} className="bg-white p-6 rounded-2xl border border-stone-200 flex flex-col md:flex-row gap-6 items-center hover:shadow-lg transition-shadow">
                <img src={child.profileImage} className="w-20 h-28 object-cover rounded-xl shadow-sm" alt={child.name} />
                <div className="flex-grow text-center md:text-left">
                  <h3 className="font-bold text-lg text-stone-800">{child.name} ({child.nickname})</h3>
                  <p className="text-sm text-stone-500 mb-2">{child.age} | <span className="text-[10px] font-bold uppercase tracking-widest">{child.visibility}</span></p>
                  <p className="text-xs text-stone-400 italic line-clamp-1">"{child.oneLiner}"</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      setSelectedChildForArt(child.id);
                      setView('ADD_ARTWORK');
                    }}
                    className="px-4 py-2 bg-stone-800 text-white hover:bg-stone-700 rounded-lg text-xs font-medium transition-colors"
                  >
                    기록 추가
                  </button>
                  <button 
                    onClick={() => deleteChild(child.id)}
                    className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-medium transition-colors"
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {view === 'ADD_CHILD' && (
        <form onSubmit={handleAddChild} className="bg-white p-10 rounded-3xl shadow-sm border border-stone-200 space-y-6">
          <h2 className="serif text-2xl mb-6 text-stone-800">새 아이 등록</h2>
          
          <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
            <div className="w-32 h-44 flex-shrink-0 bg-stone-100 rounded-2xl overflow-hidden relative group cursor-pointer border-2 border-dashed border-stone-200" onClick={() => profileInputRef.current?.click()}>
              {newChild.profileImage ? (
                <img src={newChild.profileImage} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                  <span className="text-[10px] text-stone-400 uppercase font-bold">사진 선택</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs">변경</div>
              <input 
                ref={profileInputRef}
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleProfileImageChange}
              />
            </div>
            
            <div className="flex-grow grid md:grid-cols-2 gap-6 w-full">
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">이름</label>
                <input 
                  required
                  className="w-full p-3 bg-stone-50 rounded-xl border border-stone-100 focus:outline-stone-200"
                  value={newChild.name}
                  onChange={e => setNewChild({...newChild, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">닉네임</label>
                <input 
                  required
                  className="w-full p-3 bg-stone-50 rounded-xl border border-stone-100 focus:outline-stone-200"
                  value={newChild.nickname}
                  onChange={e => setNewChild({...newChild, nickname: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">연령대 (예: 7세)</label>
                <input 
                  required
                  className="w-full p-3 bg-stone-50 rounded-xl border border-stone-100 focus:outline-stone-200"
                  value={newChild.age}
                  onChange={e => setNewChild({...newChild, age: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">공개 범위</label>
                <select 
                  className="w-full p-3 bg-stone-50 rounded-xl border border-stone-100 focus:outline-stone-200"
                  value={newChild.visibility}
                  onChange={e => setNewChild({...newChild, visibility: e.target.value as Visibility})}
                >
                  <option value="PRIVATE">비공개 (관리용)</option>
                  <option value="LINK_ONLY">링크 공개</option>
                  <option value="PUBLIC">전체 공개 (홈페이지 게시)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">아이의 한 문장 (대표 메세지)</label>
            <input 
              required
              className="w-full p-3 bg-stone-50 rounded-xl border border-stone-100 focus:outline-stone-200"
              placeholder="예: 이 그림은 혼자 놀이터에 있었던 날이에요."
              value={newChild.oneLiner}
              onChange={e => setNewChild({...newChild, oneLiner: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">교사 한 줄 관찰 (기본 철학)</label>
            <textarea 
              required
              className="w-full p-3 bg-stone-50 rounded-xl border border-stone-100 focus:outline-stone-200 min-h-[100px]"
              placeholder="아이에 대한 전반적인 첫인상 또는 철학적 관찰"
              value={newChild.teacherObservation}
              onChange={e => setNewChild({...newChild, teacherObservation: e.target.value})}
            />
          </div>
          <div className="flex gap-4 pt-6">
            <button type="submit" className="flex-grow py-4 bg-amber-800 text-white rounded-xl font-bold shadow-lg hover:bg-amber-900 transition-colors">저장하기</button>
            <button onClick={() => setView('LIST')} type="button" className="px-8 py-4 bg-stone-100 rounded-xl text-stone-600 hover:bg-stone-200 transition-colors">취소</button>
          </div>
        </form>
      )}

      {view === 'ADD_ARTWORK' && (
        <form onSubmit={handleAddArtwork} className="bg-white p-10 rounded-3xl shadow-sm border border-stone-200 space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="serif text-2xl text-stone-800">작품 기록 추가</h2>
            <span className="bg-stone-100 px-3 py-1 rounded-full text-xs font-bold text-stone-500 uppercase tracking-widest">
              대상: {childrenList.find(c => c.id === selectedChildForArt)?.nickname}
            </span>
          </div>

          {/* Multiple Images Upload UI */}
          <div className="space-y-4">
             <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">작품 이미지 (여러 장 선택 가능)</label>
             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {newArt.imageUrls.map((url, i) => (
                  <div key={i} className="aspect-square bg-stone-100 rounded-xl overflow-hidden relative group shadow-sm">
                    <img src={url} className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => setNewArt(prev => ({ ...prev, imageUrls: prev.imageUrls.filter((_, idx) => idx !== i) }))}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button 
                  type="button"
                  onClick={() => artworkImagesInputRef.current?.click()}
                  className="aspect-square bg-stone-50 border-2 border-dashed border-stone-200 rounded-xl flex flex-col items-center justify-center text-stone-400 hover:bg-stone-100 transition-colors"
                >
                  <span className="text-2xl mb-1">+</span>
                  <span className="text-[10px] font-bold uppercase">파일 추가</span>
                </button>
                <input 
                  ref={artworkImagesInputRef}
                  type="file" 
                  multiple 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleArtworkImagesChange}
                />
             </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
             <div className="space-y-2">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">수업 일자</label>
                <input 
                  type="date"
                  required
                  className="w-full p-3 bg-stone-50 rounded-xl border border-stone-100 focus:outline-stone-200"
                  value={newArt.date}
                  onChange={e => setNewArt({...newArt, date: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">수업 주제 / 작품 제목</label>
                <input 
                  required
                  className="w-full p-3 bg-stone-50 rounded-xl border border-stone-100 focus:outline-stone-200"
                  value={newArt.topic}
                  onChange={e => setNewArt({...newArt, topic: e.target.value})}
                />
              </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">아이의 말 (인용구)</label>
            <textarea 
              required
              className="w-full p-3 bg-stone-50 rounded-xl border border-stone-100 focus:outline-stone-200 min-h-[100px]"
              placeholder="“그림에 대해 아이가 직접 한 말”"
              value={newArt.childQuote}
              onChange={e => setNewArt({...newArt, childQuote: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">교사 기록 (짧고 간결하게)</label>
            <textarea 
              required
              className="w-full p-3 bg-stone-50 rounded-xl border border-stone-100 focus:outline-stone-200 min-h-[100px]"
              placeholder="수업 과정 중 관찰된 아이의 변화 또는 특징"
              value={newArt.teacherRecord}
              onChange={e => setNewArt({...newArt, teacherRecord: e.target.value})}
            />
          </div>

          <div className="flex gap-4 pt-6">
            <button type="submit" className="flex-grow py-4 bg-stone-800 text-white rounded-xl font-bold shadow-lg hover:bg-stone-900 transition-colors">기록 완료</button>
            <button onClick={() => setView('LIST')} type="button" className="px-8 py-4 bg-stone-100 rounded-xl text-stone-600 hover:bg-stone-200 transition-colors">취소</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Admin;
