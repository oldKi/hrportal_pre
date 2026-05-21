import React, { useState } from 'react';
import { Plus, Search, ZoomIn, ZoomOut, RotateCcw, UserPlus } from 'lucide-react';
// PositionDetailDrawer and PersonDetailDrawer removed to jump directly to personal profile
import { MOCK_POSITIONS, PositionNode } from './mockData';

const PosNode = ({ 
  data, 
  isRoot, 
  level = 0, 
  onClick, 
  onSelectPerson,
  onToggleExpand, 
  isExpanded, 
  onNavigate 
}: { 
  data: PositionNode, 
  isRoot?: boolean, 
  level?: number,
  onClick: (data: any) => void, 
  onSelectPerson?: (person: any) => void,
  onToggleExpand?: () => void, 
  isExpanded?: boolean, 
  onNavigate?: (view: string, params?: any) => void 
}) => {
  // Style for the very bottom level (flat horizontal cards)
  if (level === 2) {
    return (
      <div 
        className="bg-white rounded-[20px] shadow-sm border border-gray-100 w-[340px] p-5 flex items-center gap-4 hover:shadow-md transition-all cursor-pointer group" 
        onClick={() => onClick(data)}
      >
        <div className="flex-1 min-w-0">
          <div className="text-[15px] font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{data.department}</div>
          <div className="text-[13px] text-blue-600 font-bold">{data.title}</div>
        </div>
        <div className="flex items-center gap-3">
          {data.isEmpty ? (
            <div className="text-[#0066FF] p-1">
              <UserPlus size={24} strokeWidth={2} />
            </div>
          ) : (
            <div 
              className="flex items-center gap-3 hover:text-blue-600 transition-colors cursor-pointer group/name"
              onClick={(e) => {
                e.stopPropagation();
                if (onSelectPerson) {
                  onSelectPerson({
                    id: data.id,
                    name: data.occupant,
                    title: data.title,
                    avatar: null
                  });
                }
              }}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 shadow-sm group-hover/name:ring-2 group-hover/name:ring-blue-400 transition-all">
                 {data.avatar ? (
                    <div className="w-full h-full flex items-center justify-center font-bold text-gray-600 bg-gray-100">{data.avatar}</div>
                 ) : (
                    <div className="w-full h-full bg-slate-500 text-white flex items-center justify-center text-[12px] font-bold">空</div>
                 )}
              </div>
              <div className="text-[15px] font-bold text-gray-800 whitespace-nowrap group-hover/name:text-blue-600 group-hover/name:underline decoration-2 transition-colors">{data.occupant}</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Common wrapper for Level 0 and 1
  return (
    <div 
      className={`bg-white rounded-2xl flex flex-col relative transition-all hover:shadow-md ${
        isRoot 
          ? 'border-2 border-blue-600 shadow-lg w-[300px] overflow-hidden' 
          : 'border border-gray-100 shadow-sm w-[280px] p-8 min-h-[200px]'
      }`}
    >
      <div className={`${isRoot ? 'p-8 pb-4' : ''} flex-1`}>
        <div 
          onClick={() => onClick(data)}
          className="font-bold text-gray-900 mb-8 cursor-pointer group"
        >
          <div className="text-[18px] mb-1 group-hover:text-blue-600 transition-colors">{data.department}</div>
          <div className="font-medium text-gray-800 text-[16px]">{data.title}</div>
        </div>
        
        {data.isEmpty ? (
          <div className="flex items-center gap-4 mb-4">
            <div className="text-[#0066FF] p-1">
              <UserPlus size={28} strokeWidth={2} />
            </div>
          </div>
        ) : (
          <div 
            className="flex items-center gap-4 mb-4 cursor-pointer hover:text-blue-600 group/name"
            onClick={(e) => {
              e.stopPropagation();
              if (onSelectPerson) {
                onSelectPerson({
                  id: data.id,
                  name: data.occupant,
                  title: data.title,
                  avatar: null
                });
              }
            }}
          >
            <div className="w-14 h-14 rounded-full bg-slate-500 text-white overflow-hidden flex items-center justify-center text-[16px] font-bold shadow-sm border-2 border-white group-hover/name:ring-2 group-hover/name:ring-blue-400 transition-all">
              {data.avatar || (data.occupant ? data.occupant[0] : '?')}
            </div>
            <div className="text-[16px] font-bold text-gray-800 group-hover/name:text-blue-600 group-hover/name:underline decoration-2 transition-colors">
              {data.occupant}
            </div>
          </div>
        )}
      </div>

      {isRoot ? (
        <div 
          onClick={(e) => { e.stopPropagation(); onToggleExpand?.(); }}
          className="bg-[#93c5fd]/50 text-blue-700 text-center py-3 font-bold text-[15px] cursor-pointer hover:bg-blue-300 transition-colors"
        >
          {data.subCount || '下属岗位'}
        </div>
      ) : (
        data.childrenIds && data.childrenIds.length > 0 && (
          <div 
            onClick={(e) => { e.stopPropagation(); onToggleExpand?.(); }}
            className="text-blue-500 text-[14px] mt-auto pt-6 font-bold cursor-pointer hover:underline"
          >
            {data.subCount || `${data.childrenIds.length}个直接下属岗位`}
          </div>
        )
      )}
    </div>
  );
};

export const PositionArchitecture = ({ onNavigate, viewParams }: { onNavigate?: (view: string, params?: any) => void, viewParams?: any }) => {
  const [currentRootId, setCurrentRootId] = useState('root');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [zoom, setZoom] = React.useState(1);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleCardClick = (pos: any) => {
    const id = pos.id;
    const name = pos.occupant || pos.name;
    if (id && name && name !== '待招募') {
      onNavigate?.('personnel-details', { personId: id });
    }
  };
  const [expandedChildIds, setExpandedChildIds] = useState<Set<string>>(new Set());

  React.useEffect(() => {
    if (viewParams?.positionId && MOCK_POSITIONS[viewParams.positionId]) {
      setCurrentRootId(viewParams.positionId);
    }
  }, [viewParams?.positionId]);

  const toggleChildExpand = (id: string) => {
    setExpandedChildIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const posData = MOCK_POSITIONS[currentRootId];
  const children = (posData.childrenIds || []).map(id => MOCK_POSITIONS[id]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));
  const handleResetZoom = () => setZoom(1);

  const handleGoUp = () => {
    if (posData.parentId) {
      setCurrentRootId(posData.parentId);
    }
  };

  const filteredChildren = children.filter(child => 
    child.department.includes(searchQuery) || child.title.includes(searchQuery) || child.occupant.includes(searchQuery)
  );

  return (
    <div className="flex flex-col min-h-full pb-40">
      {/* Search/Zoom Bar */}
      <div className="bg-white px-8 py-4 border-b border-gray-100 flex justify-end items-center gap-4 sticky top-0 z-50">
        <div className="flex-1"></div>
        <div className="flex items-center gap-4 bg-white">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="搜索岗位"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:ring-1 focus:ring-blue-500 w-64 bg-gray-50/30"
            />
          </div>
          <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 p-1 rounded-lg">
            <button onClick={handleZoomOut} className="p-1.5 hover:bg-white rounded-md text-gray-600 transition-colors"><ZoomOut size={16} /></button>
            <span className="text-[12px] font-bold text-gray-500 w-12 text-center">{Math.round(zoom * 100)}%</span>
            <button onClick={handleZoomIn} className="p-1.5 hover:bg-white rounded-md text-gray-600 transition-colors"><ZoomIn size={16} /></button>
            <div className="w-px h-4 bg-gray-200 mx-1"></div>
            <button onClick={handleResetZoom} className="p-1.5 hover:bg-white rounded-md text-gray-600 transition-colors"><RotateCcw size={16} /></button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-[#f8fafc]/50 relative" style={{ transformOrigin: 'top center' }}>
        {/* Central line from top header area */}
        <div className="absolute left-1/2 top-0 w-[1px] h-20 bg-gray-300 -translate-x-1/2 z-0"></div>
        
        <div 
          className="flex flex-col items-center py-20 transition-transform duration-200 ease-out"
          style={{ transform: `scale(${zoom})` }}
        >
          {/* Up button */}
          {posData.parentId && (
            <div className="flex flex-col items-center mb-0 relative group">
              <button 
                onClick={handleGoUp}
                className="bg-blue-50 text-blue-600 px-12 py-3 rounded-xl text-[15px] font-bold mb-0 hover:bg-blue-100 transition-all border border-blue-100 shadow-sm relative z-10"
              >
                向上一级别
              </button>
              {/* Vertical line from button to root node */}
              <div className="w-[1px] h-10 bg-gray-300 relative z-0"></div>
            </div>
          )}

          {/* Root Node Container */}
          <div className="relative">
            <PosNode 
              data={posData} 
              isRoot={true}
              onClick={handleCardClick} 
              onSelectPerson={handleCardClick}
              onToggleExpand={() => setIsExpanded(!isExpanded)}
              isExpanded={isExpanded}
              onNavigate={onNavigate}
            />
            {/* Vertical line down from root */}
            {isExpanded && filteredChildren.length > 0 && (
              <div className="absolute left-1/2 -bottom-10 w-[1px] h-10 bg-gray-300 -translate-x-1/2"></div>
            )}
          </div>

          {isExpanded && filteredChildren.length > 0 && (
            <>
              {/* Horizontal connecting line */}
              <div 
                className="h-[1px] bg-gray-300 mt-10 relative"
                style={{ width: `${Math.max(filteredChildren.length - 1, 0) * 360}px` }}
              >
                {/* Vertical lines down to children */}
                {filteredChildren.map((child, idx) => (
                  <div key={idx}>
                    <div 
                      className="absolute top-0 w-[1px] h-10 bg-gray-300"
                      style={{ left: `${(idx / (filteredChildren.length - 1 || 1)) * 100}%`, transform: 'translateX(-50%)' }}
                    ></div>
                    {/* Secondary vertical line down from child to grandkids if they exist */}
                    {child.childrenIds && child.childrenIds.length > 0 && (
                       <div 
                        className="absolute w-[1px] h-14 bg-gray-300"
                        style={{ left: `${(idx / (filteredChildren.length - 1 || 1)) * 100}%`, transform: 'translateX(-50%)', top: '232px' }}
                      ></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Children (Level 1) */}
              <div className="flex justify-center gap-20 mt-10 items-start">
                {filteredChildren.map((child) => (
                  <div key={child.id} className="flex flex-col items-center">
                    <PosNode 
                      data={child} 
                      level={1} 
                      onClick={handleCardClick} 
                      onSelectPerson={handleCardClick}
                      onNavigate={onNavigate} 
                      isExpanded={expandedChildIds.has(child.id)}
                      onToggleExpand={() => toggleChildExpand(child.id)}
                    />
                    
                    {/* Render Grandchildren (Level 2) if expanded */}
                    {expandedChildIds.has(child.id) && child.childrenIds && child.childrenIds.length > 0 && (
                        <div className="flex flex-col items-center mt-14 w-full gap-5 relative group">
                            {/* Connector line from Level 1 bottom to Level 2 list */}
                            <div className="absolute -top-14 left-1/2 w-[1px] h-14 bg-gray-300 -translate-x-1/2"></div>
                            
                            {(child.childrenIds || []).map((gid, idx) => (
                                <React.Fragment key={gid}>
                                    {idx > 0 && <div className="w-[1px] h-5 bg-gray-300 -mt-5 mb-0"></div>}
                                    <PosNode 
                                      data={MOCK_POSITIONS[gid]} 
                                      level={2} 
                                      onClick={handleCardClick} 
                                      onSelectPerson={handleCardClick}
                                      onNavigate={onNavigate} 
                                    />
                                </React.Fragment>
                            ))}
                        </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>


      {/* Detail drawers removed to navigate directly to personal profiles */}
    </div>
  );
};

