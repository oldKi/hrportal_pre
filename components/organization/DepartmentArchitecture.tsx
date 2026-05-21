import React, { useState } from 'react';
import { Users, User, Search, ZoomIn, ZoomOut, RotateCcw, LayoutGrid } from 'lucide-react';
import { DepartmentDetailModal } from './DepartmentDetailModal';
import { PersonDetailDrawer } from './PersonDetailDrawer';
import { MOCK_DEPARTMENTS, DepartmentNode } from './mockData';

const DeptNode = ({ data, isRoot = false, onClick, onSelectPerson, onToggleExpand, isExpanded }: { data: DepartmentNode, isRoot?: boolean, onClick: (data: any, section?: any) => void, onSelectPerson: (person: any) => void, onToggleExpand?: () => void, isExpanded?: boolean }) => {
  return (
    <div 
      className={`bg-white rounded-xl shadow-sm overflow-hidden flex flex-col relative w-[280px] cursor-pointer hover:shadow-md transition-shadow ${isRoot ? 'border-2 border-blue-600' : 'border border-gray-200'}`}
    >
      <div className="p-5 flex-1" onClick={() => onClick(data, 'info')}>
        <div className="text-gray-600 text-[14px] mb-1 font-medium">{data.name}</div>
        <div className="text-gray-400 text-[12px] mb-6">{data.code}</div>
        
        {/* Leader Row */}
        {((data.leader && data.leader.trim() !== '') || (data.leaders && data.leaders.length > 0)) ? (
          data.leaders && data.leaders.length > 1 ? (
            <div className="flex items-center gap-3 mb-6">
              {data.leaders.map((leader, idx) => (
                <div 
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    const [chineseName, ...englishParts] = leader.name.split(' ');
                    onSelectPerson({ 
                      name: chineseName, 
                      englishName: englishParts.join(' '),
                      avatar: leader.avatar,
                      title: '部门负责人',
                      departmentName: data.name,
                      departmentCode: data.externalId
                    });
                  }}
                  className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border-2 border-white shadow-sm ring-1 ring-gray-200 hover:ring-blue-500 transition-all cursor-pointer"
                >
                  {leader.avatar ? (
                    <img src={leader.avatar} alt={leader.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <User className="w-6 h-6 text-gray-400 m-3" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div 
              onClick={(e) => {
                e.stopPropagation();
                const leaderName = data.leader || data.leaders?.[0]?.name || '';
                const leaderAvatar = data.leaderAvatar || data.leaders?.[0]?.avatar || '';
                const [chineseName, ...englishParts] = leaderName.split(' ');
                onSelectPerson({ 
                  name: chineseName, 
                  englishName: englishParts.join(' '),
                  avatar: leaderAvatar,
                  title: '部门负责人',
                  departmentName: data.name,
                  departmentCode: data.externalId
                });
              }}
              className="flex items-center gap-3 mb-6 hover:bg-gray-50 p-1 rounded-lg transition-colors"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-50">
                {(data.leaderAvatar || data.leaders?.[0]?.avatar) ? (
                  <img src={data.leaderAvatar || data.leaders?.[0]?.avatar} alt={data.leader} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <User className="w-6 h-6 text-gray-400 m-3" />
                )}
              </div>
              <div className="flex flex-col">
                <div className="text-[11px] text-gray-400 mb-0.5 font-medium">负责人</div>
                <div className="font-bold text-gray-800 text-[14px] group-hover:text-blue-600">
                  {data.leader || data.leaders?.[0]?.name}
                </div>
              </div>
            </div>
          )
        ) : null}

        <div className="flex items-center gap-6 mt-4">
          <div 
            className="flex items-center gap-1.5 text-blue-600 hover:bg-blue-50 p-1 px-2 rounded-md transition-colors"
            onClick={(e) => { e.stopPropagation(); onClick(data, 'personnel'); }}
          >
            <Users size={16} strokeWidth={2.5} />
            <span className="text-[14px] font-bold">{data.count1}</span>
          </div>
          <div 
            className="flex items-center gap-1.5 text-blue-600 hover:bg-blue-50 p-1 px-2 rounded-md transition-colors"
            onClick={(e) => { e.stopPropagation(); onClick(data, 'positions'); }}
          >
            <LayoutGrid size={16} strokeWidth={2.5} />
            <span className="text-[14px] font-bold">{data.count2}</span>
          </div>
        </div>
      </div>
      
      {data.subCount !== undefined && (
        <div 
          onClick={(e) => { e.stopPropagation(); onToggleExpand?.(); }}
          className="bg-[#0066ff] text-white text-center py-2 font-medium text-[14px] cursor-pointer hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          {data.subCount} 下属部门
          <span className="text-[10px] opacity-80">{isExpanded ? '▲' : '▼'}</span>
        </div>
      )}
    </div>
  );
};

export const DepartmentArchitecture = ({ onNavigate }: { onNavigate?: (view: string, params?: any) => void }) => {
  const [currentRootId, setCurrentRootId] = useState('prod-ctrl');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [zoom, setZoom] = React.useState(1);
  const [selectedDept, setSelectedDept] = useState<any>(null);
  const [modalSection, setModalSection] = useState<'info' | 'personnel' | 'positions'>('info');
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [expandedDeptIds, setExpandedDeptIds] = useState<Set<string>>(new Set());

  const toggleDeptExpand = (id: string) => {
    setExpandedDeptIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const deptData = MOCK_DEPARTMENTS[currentRootId];
  const children = (deptData.childrenIds || []).map(id => MOCK_DEPARTMENTS[id]);

  const handleDeptClick = (dept: any, section: 'info' | 'personnel' | 'positions' = 'info') => {
    setSelectedDept(dept);
    setModalSection(section);
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));
  const handleResetZoom = () => setZoom(1);

  const handleGoUp = () => {
    if (deptData.parentId) {
      setCurrentRootId(deptData.parentId);
    }
  };

  const filteredChildren = children.filter(child => 
    child.name.includes(searchQuery) || child.code.includes(searchQuery)
  );
  
  const showRoot = deptData.name.includes(searchQuery) || deptData.code.includes(searchQuery) || filteredChildren.length > 0;

  return (
    <div className="flex flex-col min-h-full pb-20">
      {/* Search/Zoom Bar */}
      <div className="bg-white px-6 py-2 border-b border-gray-200 flex justify-end gap-4 sticky top-0 z-20">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="搜索部门..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
          />
        </div>
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
          <button onClick={handleZoomOut} className="p-1.5 hover:bg-white rounded-md text-gray-600"><ZoomOut size={16} /></button>
          <span className="text-xs font-medium text-gray-600 w-10 text-center">{Math.round(zoom * 100)}%</span>
          <button onClick={handleZoomIn} className="p-1.5 hover:bg-white rounded-md text-gray-600"><ZoomIn size={16} /></button>
          <button onClick={handleResetZoom} className="p-1.5 hover:bg-white rounded-md text-gray-600"><RotateCcw size={16} /></button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6" style={{ transform: `scale(${zoom})`, transformOrigin: 'top center', transition: 'transform 0.2s' }}>
        {!showRoot ? <div className="text-center text-gray-500 py-10">未找到匹配部门</div> : (
          <div className="flex flex-col items-center py-10">
            {/* Up button */}
            {deptData.parentId && (
              <button 
                onClick={handleGoUp}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium mb-8 hover:bg-blue-700 transition-colors relative z-10 flex items-center gap-2"
              >
                <span>↑</span> 向上一级别
              </button>
            )}

            {/* Vertical line from button to root node */}
            {deptData.parentId && (
              <div className="w-[2px] h-8 bg-gray-400 -mt-8 mb-0 relative z-0"></div>
            )}

            {/* Root Node */}
            <div className="relative">
              <DeptNode 
                data={deptData} 
                isRoot={true} 
                onClick={handleDeptClick} 
                onSelectPerson={setSelectedPerson} 
                onToggleExpand={() => setIsExpanded(!isExpanded)}
                isExpanded={isExpanded}
              />
              {/* Vertical line down from root */}
              {isExpanded && filteredChildren.length > 0 && (
                <div className="absolute left-1/2 -bottom-8 w-[2px] h-8 bg-[#64748b] -translate-x-1/2"></div>
              )}
            </div>

            {isExpanded && filteredChildren.length > 0 && (
              <>
                {/* Horizontal connecting line */}
                <div 
                  className="h-[2px] bg-[#64748b] mt-8 relative"
                  style={{ width: `${Math.max(filteredChildren.length - 1, 0) * 300}px` }}
                >
                  {/* Vertical lines down to children */}
                  {filteredChildren.map((_, idx) => (
                    <div 
                      key={idx}
                      className="absolute top-0 w-[2px] h-8 bg-[#64748b]"
                      style={{ left: `${(idx / (filteredChildren.length - 1 || 1)) * 100}%`, transform: 'translateX(-50%)' }}
                    ></div>
                  ))}
                </div>

                {/* Children Nodes */}
                <div className="flex justify-center gap-10 mt-8 items-start">
                  {filteredChildren.map((child) => (
                    <div key={child.id} className="flex flex-col items-center">
                      <div className="relative">
                        <DeptNode 
                          data={child} 
                          onClick={handleDeptClick} 
                          onSelectPerson={setSelectedPerson} 
                          onToggleExpand={() => toggleDeptExpand(child.id)}
                          isExpanded={expandedDeptIds.has(child.id)}
                        />
                        {/* Vertical line down from child if expanded and has sub-children */}
                        {expandedDeptIds.has(child.id) && child.childrenIds && child.childrenIds.length > 0 && (
                          <div className="absolute left-1/2 -bottom-10 w-[2px] h-10 bg-[#64748b] -translate-x-1/2"></div>
                        )}
                      </div>

                      {/* Render Grandchildren if expanded */}
                      {expandedDeptIds.has(child.id) && child.childrenIds && child.childrenIds.length > 0 && (
                        <div className="flex flex-col items-center mt-10">
                           {/* Horizontal rail for grandchildren */}
                           {(child.childrenIds || []).length > 1 && (
                             <div 
                               className="h-[2px] bg-[#64748b] mb-10 relative"
                               style={{ width: `${Math.max((child.childrenIds || []).length - 1, 0) * 300}px` }}
                             >
                                 {(child.childrenIds || []).map((_, idx) => (
                                    <div 
                                      key={idx}
                                      className="absolute top-0 w-[2px] h-10 bg-[#64748b]"
                                      style={{ left: `${(idx / ((child.childrenIds || []).length - 1 || 1)) * 100}%`, transform: 'translateX(-50%)' }}
                                    ></div>
                                 ))}
                             </div>
                           )}
                           {/* Grandchildren vertical line if only one child */}
                           {(child.childrenIds || []).length === 1 && (
                             <div className="w-[2px] h-10 bg-[#64748b] mb-0 relative"></div>
                           )}

                           <div className="flex justify-center gap-5">
                             {(child.childrenIds || []).map(gid => (
                               <DeptNode 
                                 key={gid} 
                                 data={MOCK_DEPARTMENTS[gid]} 
                                 onClick={handleDeptClick} 
                                 onSelectPerson={setSelectedPerson} 
                               />
                             ))}
                           </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
      
      {selectedDept && (
        <DepartmentDetailModal 
          isOpen={!!selectedDept} 
          onClose={() => setSelectedDept(null)} 
          department={selectedDept} 
          defaultSection={modalSection}
          onSelectPerson={(person: any) => setSelectedPerson(person)}
        />
      )}

      {selectedPerson && (
        <PersonDetailDrawer
          isOpen={!!selectedPerson}
          onClose={() => setSelectedPerson(null)}
          person={selectedPerson}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
};

