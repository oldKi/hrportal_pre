import React, { useState } from 'react';
import { Contact2, User, Search, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { PersonDetailDrawer } from './PersonDetailDrawer';
import { PositionDetailDrawer } from './PositionDetailDrawer';
import { MOCK_PEOPLE, MOCK_SUBORDINATES, MOCK_POSITIONS, MOCK_DEPARTMENTS, PersonNode } from './mockData';
import { matchPinyin } from '../pinyinUtils';

const OrgCard = ({ 
  data, 
  isManager = false, 
  onClick, 
  onIconClick,
  onTitleClick,
  onToggleSub,
  isExpanded = true
}: { 
  data: PersonNode, 
  isManager?: boolean, 
  onClick?: (data: any) => void, 
  onIconClick?: (data: any) => void,
  onTitleClick?: (data: PersonNode) => void,
  onToggleSub?: () => void,
  isExpanded?: boolean
}) => {
  const hasSubordinates = !!data.count && data.count !== '0';

  return (
    <div 
      className={`bg-white rounded-xl shadow-sm border border-gray-100 relative z-10 w-full hover:shadow-md transition-shadow cursor-pointer ${isManager ? 'max-w-[340px]' : 'max-w-[320px]'}`}
      onClick={() => onClick?.(data)}
    >
      <div className="p-3.5 flex items-center gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center border border-gray-50 uppercase font-bold text-gray-500">
          {data.avatar ? (
            <img src={data.avatar} alt={data.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-[12px]">{data.name?.slice(0, 2)}</div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 truncate">
            <span className="font-bold text-gray-900 text-[15px]">{data.name}</span>
            {data.enName && <span className="font-bold text-gray-800 text-[14px]">{data.enName}</span>}
          </div>
          <div 
            className="text-[12px] text-gray-400 mt-0.5 truncate hover:text-blue-600 hover:underline cursor-pointer inline-block"
            onClick={(e) => {
              e.stopPropagation();
              onTitleClick?.(data);
            }}
            title="查看岗位明细"
          >
            {data.title}
          </div>
          {!isManager && data.count && (
            <div className="text-[11px] text-blue-500 font-bold mt-1.5 cursor-pointer hover:underline">
              {data.count}个直接下属
            </div>
          )}
        </div>

        {/* Action Icon */}
        <div 
          className="flex-shrink-0 p-1.5 rounded-lg border border-blue-50 text-blue-500 hover:bg-blue-50 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onIconClick?.(data);
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-contact">
            <path d="M16 2v2"/><path d="M7 2v2"/><path d="M5 4h14c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M16 11c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4z"/><path d="M18 21a6 6 0 0 0-12 0"/>
          </svg>
        </div>
      </div>

      {isManager && data.count && onToggleSub && (
        <div 
          onClick={(e) => {
            if (hasSubordinates && onToggleSub) {
              e.stopPropagation();
              onToggleSub();
            }
          }}
          className={`text-[14px] font-bold py-3 text-center transition-colors rounded-b-xl border-t border-blue-100/50 ${hasSubordinates ? 'cursor-pointer bg-[#93c5fd]/30 text-blue-700 hover:bg-[#93c5fd]/50' : 'bg-gray-50 text-gray-400'}`}
        >
          {data.count}
          {hasSubordinates && (
            <span className="text-[10px] ml-2 opacity-60">{isExpanded ? '▲' : '▼'}</span>
          )}
        </div>
      )}
    </div>
  );
};

export const ReportingRelationship = ({ 
  onNavigate,
  viewParams
}: { 
  onNavigate?: (view: string, params?: any) => void;
  viewParams?: any;
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [zoom, setZoom] = useState(0.7);
  const [visibleManagerCount, setVisibleManagerCount] = useState(1);
  const [isSubExpanded, setIsSubExpanded] = useState(true);
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  const [selectedPosition, setSelectedPosition] = useState<any>(null);
  const [focusPerson, setFocusPerson] = useState<{ id: string; name: string } | null>(null);

  const handleNavigate = (view: string, params?: any) => {
    onNavigate?.(view, params);
  };

  const getPositionForPersonNode = (data: PersonNode): any => {
    const foundPos = Object.values(MOCK_POSITIONS).find(
      p => p.occupant && (p.occupant === data.name || p.occupant.includes(data.name) || data.name.includes(p.occupant))
    );
    if (foundPos) {
      return foundPos;
    }

    let deptName = '大众汽车（中国）';
    let costCenter = 'VGC-HQ (10000)';
    let hrSubarea = '北京总部-VGC Beijing (9000)';
    let hrArea = '大众中国 (VGC)';
    let company = '大众汽车中国 (8000)';

    for (const dept of Object.values(MOCK_DEPARTMENTS)) {
      const hasPerson = dept.personnel?.some(p => p.id === data.id || p.name === data.name);
      const isLeader = dept.leader?.includes(data.name) || dept.leaders?.some(l => l.name === data.name);
      if (hasPerson || isLeader) {
        deptName = dept.name;
        costCenter = dept.costCenter || costCenter;
        hrSubarea = dept.hrSubarea || hrSubarea;
        hrArea = dept.hrArea || hrArea;
        if (dept.hrArea?.includes('大众中国') || dept.id === 'corp') {
          company = '大众汽车中国 (8000)';
        } else {
          company = '上汽大众 (8000)';
        }
        break;
      }
    }

    const nameHash = data.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const codeVal = 60110000 + (nameHash % 9000);
    const extIdVal = 50090000 + (nameHash % 9000);

    const personInPeople = MOCK_PEOPLE.find(p => p.id === data.id || p.name === data.name);
    const parentId = personInPeople?.parentId || data.parentId;
    let parentPosId = undefined;
    if (parentId) {
      const parentPerson = MOCK_PEOPLE.find(p => p.id === parentId);
      if (parentPerson) {
        const foundParentPos = Object.values(MOCK_POSITIONS).find(
          p => p.occupant && (p.occupant === parentPerson.name || p.occupant.includes(parentPerson.name))
        );
        if (foundParentPos) {
          parentPosId = foundParentPos.id;
        }
      }
    }

    return {
      id: data.id + '_pos',
      department: deptName,
      title: data.title,
      occupant: data.name,
      avatar: null,
      parentId: parentPosId,
      code: String(codeVal),
      externalId: String(extIdVal),
      effectiveDate: '2024 年 9 月 14 日',
      standardPosition: `${data.title} (${codeVal})`,
      company: company,
      hrSubarea: hrSubarea,
      hrArea: hrArea,
      costCenter: costCenter,
      personId: data.id
    };
  };

  const handleTitleClick = (data: PersonNode) => {
    setSelectedPosition(getPositionForPersonNode(data));
  };

  // Sync focusPerson from viewParams when navigated into
  React.useEffect(() => {
    if (viewParams?.focusPersonName) {
      setFocusPerson({
        id: viewParams.focusPersonId || '',
        name: viewParams.focusPersonName
      });
      setZoom(0.7);
      setSearchQuery('');
      setIsSubExpanded(true);
    } else {
      setFocusPerson(null);
    }
  }, [viewParams]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));
  const handleReset = () => {
    setSearchQuery('');
    setZoom(0.7);
    setVisibleManagerCount(1);
    setIsSubExpanded(true);
    setFocusPerson(null);
  };

  const handleExpandLevel = () => {
    setVisibleManagerCount(prev => Math.min(prev + 1, MOCK_PEOPLE.length));
  };

  // Resolve hierarchy nodes
  let currentManagers = MOCK_PEOPLE.slice(MOCK_PEOPLE.length - visibleManagerCount);
  let subordinates = MOCK_SUBORDINATES[currentManagers[currentManagers.length - 1]?.id] || [];

  if (focusPerson) {
    const targetName = focusPerson.name;
    const targetId = focusPerson.id;

    // Resolve self, parent, and subordinates
    let selfNode: PersonNode | undefined = undefined;
    let parentNode: PersonNode | undefined = undefined;
    let subordinateList: PersonNode[] = [];

    // 1. Search in MOCK_PEOPLE
    selfNode = MOCK_PEOPLE.find(p => (targetId && p.id === targetId) || p.name === targetName || (p.name && targetName && targetName.startsWith(p.name)));
    
    if (selfNode) {
      if (selfNode.parentId) {
        parentNode = MOCK_PEOPLE.find(p => p.id === selfNode!.parentId);
      }
      subordinateList = MOCK_SUBORDINATES[selfNode.id] || [];
    } else {
      // 2. Search in MOCK_SUBORDINATES
      for (const [managerId, subs] of Object.entries(MOCK_SUBORDINATES)) {
        const found = subs.find(s => (targetId && s.id === targetId) || s.name === targetName || (s.name && targetName && targetName.startsWith(s.name)));
        if (found) {
          selfNode = found;
          parentNode = MOCK_PEOPLE.find(p => p.id === managerId);
          subordinateList = MOCK_SUBORDINATES[selfNode.id] || [];
          break;
        }
      }
    }

    // 3. Search in MOCK_POSITIONS
    if (!selfNode) {
      const posKeys = Object.keys(MOCK_POSITIONS);
      const pos = MOCK_POSITIONS[targetId] || posKeys.map(k => MOCK_POSITIONS[k]).find(p => p.occupant === targetName || (p.occupant && targetName && targetName.startsWith(p.occupant)));
      
      if (pos && !pos.isEmpty) {
        selfNode = {
          id: pos.id,
          name: pos.occupant,
          title: pos.title,
          avatar: null,
          count: pos.subCount || undefined,
          parentId: pos.parentId
        };
        if (pos.parentId) {
          const parentPos = MOCK_POSITIONS[pos.parentId];
          if (parentPos) {
            parentNode = {
              id: parentPos.id,
              name: parentPos.occupant,
              title: parentPos.title,
              avatar: null
            };
          }
        }
        if (pos.childrenIds) {
          subordinateList = pos.childrenIds
            .map(cid => MOCK_POSITIONS[cid])
            .filter(c => c && !c.isEmpty)
            .map(childPos => ({
              id: childPos.id,
              name: childPos.occupant,
              title: childPos.title,
              avatar: null,
              count: childPos.subCount
            }));
        }
      }
    }

    // 4. Search in MOCK_DEPARTMENTS
    if (!selfNode) {
      for (const [deptId, dept] of Object.entries(MOCK_DEPARTMENTS)) {
        const cleanLeaderName = dept.leader ? dept.leader.split(' ')[0] : '';
        const isLeader = (dept.leader && (dept.leader === targetName || cleanLeaderName === targetName)) ||
                         (dept.leaders && dept.leaders.some(l => l.name === targetName));
        
        const matchedPerson = dept.personnel?.find(p => p.id === targetId || p.name === targetName || (p.name && targetName && targetName.startsWith(p.name)));
        
        if (isLeader || matchedPerson) {
          if (isLeader) {
            const leaderObj = dept.leaders?.find(l => l.name === targetName) || { name: dept.leader || '', avatar: dept.leaderAvatar };
            selfNode = {
              id: leaderObj.id || dept.id + '_leader',
              name: leaderObj.name,
              title: dept.name + ' 负责人',
              avatar: leaderObj.avatar || null,
              count: dept.subCount ? String(dept.subCount) : undefined
            };

            if (dept.parentId) {
              const parentDept = MOCK_DEPARTMENTS[dept.parentId];
              if (parentDept) {
                const parentLeaderObj = parentDept.leaders?.[0] || { name: parentDept.leader || '', avatar: parentDept.leaderAvatar };
                parentNode = {
                  id: parentLeaderObj.id || parentDept.id + '_leader',
                  name: parentLeaderObj.name,
                  title: parentDept.name + ' 负责人',
                  avatar: parentLeaderObj.avatar || null
                };
              }
            }

            const childDepts = Object.values(MOCK_DEPARTMENTS).filter(d => d.parentId === dept.id);
            const childLeaders = childDepts.map(cd => {
              const cl = cd.leaders?.[0] || { name: cd.leader || '', avatar: cd.leaderAvatar };
              return {
                id: cl.id || cd.id + '_leader',
                name: cl.name,
                title: cd.name + ' 负责人',
                avatar: cl.avatar || null,
                count: cd.subCount ? String(cd.subCount) : undefined
              };
            });

            const deptPersonnel = (dept.personnel || [])
              .filter(p => p.name !== leaderObj.name)
              .map(p => ({
                id: p.id,
                name: p.name,
                title: p.title,
                avatar: p.avatar || null
              }));

            subordinateList = [...childLeaders, ...deptPersonnel];
          } else if (matchedPerson) {
            selfNode = {
              id: matchedPerson.id,
              name: matchedPerson.name,
              title: matchedPerson.title,
              avatar: matchedPerson.avatar || null
            };

            const leaderObj = dept.leaders?.[0] || { name: dept.leader || '', avatar: dept.leaderAvatar };
            parentNode = {
              id: leaderObj.id || dept.id + '_leader',
              name: leaderObj.name,
              title: dept.name + ' 负责人',
              avatar: leaderObj.avatar || null
            };

            subordinateList = [];
          }
          break;
        }
      }
    }

    if (selfNode) {
      currentManagers = parentNode ? [parentNode, selfNode] : [selfNode];
      subordinates = subordinateList;
    }
  }

  const targetManager = currentManagers[currentManagers.length - 1]; // The bottom-most manager in view

  const filteredManagers = currentManagers.filter(m => 
    matchPinyin(m.name, searchQuery, m.id) || matchPinyin(m.title, searchQuery)
  );
  
  const displaySubordinates = isSubExpanded ? subordinates.filter(s => 
    matchPinyin(s.name, searchQuery, s.id) || matchPinyin(s.title, searchQuery)
  ) : [];

  return (
    <div className="flex flex-col min-h-full">
      {/* Search/Zoom Bar */}
      <div className="bg-white px-6 py-2 border-b border-gray-200 flex justify-end items-center gap-4 sticky top-0 z-20">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="搜索汇报关系..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 bg-gray-50/30"
          />
        </div>
        <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 p-1 rounded-lg">
          <button onClick={handleZoomOut} className="p-1.5 hover:bg-white rounded-md text-gray-600 transition-colors" title="缩小"><ZoomOut size={16} /></button>
          <span className="text-[12px] font-bold text-gray-500 w-12 text-center">{Math.round(zoom * 100)}%</span>
          <button onClick={handleZoomIn} className="p-1.5 hover:bg-white rounded-md text-gray-600 transition-colors" title="放大"><ZoomIn size={16} /></button>
        </div>
        <button 
          onClick={handleReset} 
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-bold rounded-lg transition-all border border-gray-150 shadow-sm"
          title="重置"
        >
          <RotateCcw size={15} />
          <span>重置</span>
        </button>
      </div>

      <div className="flex-1 overflow-auto p-6 relative">

        <div className="animate-in fade-in duration-500" style={{ transform: `scale(${zoom})`, transformOrigin: 'top center', transition: 'transform 0.2s' }}>
          <div className="flex flex-col items-center py-10 min-h-full relative">
            {/* Superior Button inside scale container */}
            <div className="flex flex-col items-center relative z-30 mb-8">
              {focusPerson ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="bg-amber-50 border border-amber-200 text-amber-800 px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm">
                    正在查看 {focusPerson.name} 的汇报架构 (中间为本人)
                  </div>
                  <button 
                    onClick={() => setFocusPerson(null)}
                    className="bg-blue-50 text-blue-600 px-8 py-2.5 rounded-xl text-[14px] font-bold mb-0 hover:bg-blue-100 transition-all border border-blue-100 shadow-sm flex items-center gap-2 group animate-in fade-in duration-300"
                  >
                    返回完整汇报关系
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleExpandLevel}
                  disabled={visibleManagerCount >= MOCK_PEOPLE.length}
                  className="bg-blue-50 text-blue-600 px-12 py-3 rounded-xl text-[15px] font-bold mb-0 hover:bg-blue-100 transition-all border border-blue-100 shadow-sm disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-100 flex items-center gap-2 group"
                >
                  <span className="group-hover:-translate-y-0.5 transition-transform">↑</span>
                  向上一级别
                </button>
              )}
            </div>

          {/* Managers */}
          <div className="flex flex-col items-center gap-8 relative w-full z-10">
            {filteredManagers.map((manager, idx) => (
              <div key={manager.id} className="relative w-full flex justify-center">
                <OrgCard 
                  data={manager} 
                  isManager={true} 
                  onClick={setSelectedPerson} 
                  onTitleClick={handleTitleClick}
                  isExpanded={manager.id === targetManager.id ? isSubExpanded : true}
                  onToggleSub={manager.id === targetManager.id ? () => setIsSubExpanded(!isSubExpanded) : undefined}
                  onIconClick={(data) => handleNavigate('personnel-details', { personId: data.id })}
                />
                {/* Vertical line between stacked manager cards */}
                {idx < filteredManagers.length - 1 && (
                  <div className="absolute left-1/2 top-full w-[2px] h-8 bg-gray-300 -translate-x-1/2"></div>
                )}
                {/* Horizontal line and split for subordinates if it's the last manager and sub expanded */}
                {idx === filteredManagers.length - 1 && displaySubordinates.length > 0 && isSubExpanded && (
                  <>
                    <div className="absolute left-1/2 top-full w-[2px] h-8 bg-gray-300 -translate-x-1/2"></div>
                    <div className="absolute left-1/2 top-[calc(100%+32px)] h-[2px] bg-gray-300 -translate-x-1/2" style={{ width: '340px' }}></div>
                    <div className="absolute left-[calc(50%-170px)] top-[calc(100%+32px)] w-[2px] h-8 bg-gray-300"></div>
                    <div className="absolute left-[calc(50%+170px)] top-[calc(100%+32px)] w-[2px] h-8 bg-gray-300 -translate-x-full"></div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Subordinates Grid */}
          {displaySubordinates.length > 0 && isSubExpanded && (
            <div className="grid grid-cols-2 gap-x-10 gap-y-4 w-full max-w-[700px] mt-16 relative z-10">
              {displaySubordinates.map((sub) => (
                <OrgCard 
                  key={sub.id} 
                  data={sub} 
                  isManager={false} 
                  onClick={setSelectedPerson} 
                  onTitleClick={handleTitleClick}
                  onIconClick={(data) => handleNavigate('personnel-details', { personId: data.id })}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedPerson && (
        <PersonDetailDrawer
          isOpen={!!selectedPerson}
          onClose={() => setSelectedPerson(null)}
          person={selectedPerson}
          onNavigate={handleNavigate}
        />
      )}

      {selectedPosition && (
        <PositionDetailDrawer
          isOpen={!!selectedPosition}
          onClose={() => setSelectedPosition(null)}
          position={selectedPosition}
          onSelectPerson={(person: any) => {
            setSelectedPosition(null);
            setSelectedPerson(person);
          }}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  </div>
  );
};

