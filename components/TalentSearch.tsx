
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  User, 
  Briefcase, 
  GraduationCap, 
  X,
  MapPin,
  Plus,
  Filter,
  Users,
  Settings,
  MoreHorizontal,
  LayoutGrid,
  List
} from 'lucide-react';
import { Talent } from '../types';

// Extended Talent type for local mock data
type TalentWithHistory = Talent & {
  performance2023?: string;
  performance2022?: string;
  // External Specific Fields
  workYears?: string;
  reserveTime?: string;
  poolType?: string;
  resumeUpdateTime?: string;
  statusIcon?: any;
  degree?: string;
};

// Mock Data Internal
const mockInternalTalents: TalentWithHistory[] = [
  {
    id: 'T001', name: '李明', age: 32, gender: '男', phone: '13812345678', email: 'liming@example.com',
    position: '高级后端经理', department: '研发中心', location: '北京', performance: 'S', assessmentScore: 94, potential: 'High',
    tags: ['高潜人才', '技术专家', '海外背景'], education: [], workHistory: [], family: [], performance2023: 'S', performance2022: 'A'
  },
  {
    id: 'T002', name: '张芳', age: 29, gender: '女', phone: '13987654321', email: 'zhangfang@example.com',
    position: '产品总监', department: '产品部', location: '上海', performance: 'A', assessmentScore: 88, potential: 'High',
    tags: ['管理新星', '产品专家'], education: [], workHistory: [], family: [], performance2023: 'A', performance2022: 'A'
  },
];

// Mock Data External (Based on Screenshot)
const mockExternalTalents: TalentWithHistory[] = [
  {
    id: 'E001', name: '多申请时取最后一...', age: 0, gender: '--', phone: '', email: '',
    position: '', department: '', location: '', performance: '', assessmentScore: 0, potential: '',
    tags: ['4'], education: [], workHistory: [], family: [],
    workYears: '--', reserveTime: '2024-07-24 11:26:38', poolType: '职能类', resumeUpdateTime: '2024-07-24 16:44:22'
  },
  {
    id: 'E002', name: '测评测试4', age: 0, gender: '--', phone: '', email: '',
    position: '', department: '', location: '', performance: '', assessmentScore: 0, potential: '',
    tags: ['4'], education: [], workHistory: [], family: [],
    workYears: '--', reserveTime: '2024-07-22 17:50:21', poolType: '技术类', resumeUpdateTime: '2024-07-23 10:19:27'
  },
  {
    id: 'E003', name: 'HR测-校招', age: 0, gender: '--', phone: '', email: '',
    position: '', department: '', location: '', performance: '', assessmentScore: 0, potential: '',
    tags: ['1'], education: [], workHistory: [], family: [],
    workYears: '--', reserveTime: '2023-06-01 15:50:43', poolType: '人才公海', resumeUpdateTime: '2023-07-14 15:19:09'
  },
  {
    id: 'E004', name: '取消H测评', age: 0, gender: '--', phone: '', email: '',
    position: '', department: '', location: '', performance: '', assessmentScore: 0, potential: '',
    tags: ['1'], education: [{ school: 'XX大学', degree: '本科', major: '', startDate: '', endDate: '' }], workHistory: [], family: [],
    workYears: '在读学生', reserveTime: '2023-06-01 15:25:26', poolType: '人才公海', resumeUpdateTime: '2023-06-01 15:25:30'
  },
  {
    id: 'E005', name: '取消测试', age: 0, gender: '--', phone: '', email: '',
    position: '', department: '', location: '', performance: '', assessmentScore: 0, potential: '',
    tags: ['1'], education: [], workHistory: [], family: [],
    workYears: '--', reserveTime: '2023-05-31 18:52:19', poolType: '人才公海', resumeUpdateTime: '2023-05-31 22:52:20'
  },
  {
    id: 'E006', name: 'test053001', age: 0, gender: '--', phone: '', email: '',
    position: '', department: '', location: '', performance: '', assessmentScore: 0, potential: '',
    tags: ['1'], education: [], workHistory: [], family: [],
    workYears: '--', reserveTime: '2023-05-31 10:10:16', poolType: '人才公海', resumeUpdateTime: '2023-05-31 10:10:17'
  },
  {
    id: 'E007', name: 'test053002', age: 0, gender: '--', phone: '', email: '',
    position: '', department: '', location: '', performance: '', assessmentScore: 0, potential: '',
    tags: ['1'], education: [], workHistory: [], family: [],
    workYears: '--', reserveTime: '2023-05-30 20:26:49', poolType: '人才公海', resumeUpdateTime: '2023-06-06 20:18:00'
  },
  {
    id: 'E008', name: 'ttt', age: 0, gender: '男', phone: '', email: '',
    position: '', department: '', location: '', performance: '', assessmentScore: 0, potential: '',
    tags: ['1'], education: [], workHistory: [], family: [],
    workYears: '--', reserveTime: '2023-05-30 12:19:45', poolType: '人才公海', resumeUpdateTime: '2023-05-30 17:41:43'
  },
  {
    id: 'E009', name: '测试418', age: 32, gender: '女', phone: '', email: '',
    position: '', department: '', location: '', performance: '', assessmentScore: 0, potential: '',
    tags: ['1'], education: [{ school: '', degree: '本科', major: '', startDate: '', endDate: '' }], workHistory: [], family: [],
    workYears: '5年', reserveTime: '2022-04-06 15:31:19', poolType: '未分类人才库', resumeUpdateTime: '2022-04-18 20:20:20'
  },
  {
    id: 'E010', name: 'Bruce Zero', age: 55, gender: '女', phone: '', email: '',
    position: '', department: '', location: '', performance: '', assessmentScore: 0, potential: '',
    tags: [], education: [{ school: '', degree: '高中', major: '', startDate: '', endDate: '' }], workHistory: [], family: [],
    workYears: '11', reserveTime: '2019-12-04 10:55:33', poolType: '老系统简历', resumeUpdateTime: '2019-12-04 10:55:33'
  },
  {
    id: 'E011', name: 'demo3', age: 0, gender: '--', phone: '', email: '',
    position: '', department: '', location: '', performance: '', assessmentScore: 0, potential: '',
    tags: [], education: [], workHistory: [], family: [],
    workYears: '--', reserveTime: '2019-10-28 13:43:58', poolType: '未分类人才库', resumeUpdateTime: '2019-10-28 13:59:44'
  }
];

interface TalentSearchProps {
  mode?: 'internal' | 'external';
}

export const TalentSearch: React.FC<TalentSearchProps> = ({ mode = 'internal' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Data Source based on mode
  const talents = mode === 'external' ? mockExternalTalents : mockInternalTalents;

  const [sortConfig, setSortConfig] = useState<{ key: keyof TalentWithHistory; direction: 'asc' | 'desc' } | null>(null);
  const [selectedTalent, setSelectedTalent] = useState<TalentWithHistory | null>(null);

  // Sorting Handler
  const handleSort = (key: keyof TalentWithHistory) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Simple Filtering Logic (Just Search for now)
  const filteredData = useMemo(() => {
    let data = talents.filter(talent => {
      return talent.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    if (sortConfig) {
      data.sort((a, b) => {
        // @ts-ignore
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        // @ts-ignore
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return data;
  }, [searchQuery, sortConfig, talents]);

  return (
    <div className="space-y-4">
      {/* Top Search Bar (Styled like Screenshot) */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-2 flex items-center">
         <div className="flex-1 flex items-center px-2">
            <Search className="text-gray-300 mr-2" size={20} />
            <input
              type="text"
              placeholder="通过姓名、公司、学校等关键词搜索应聘者"
              className="w-full py-2 text-sm text-gray-700 placeholder-gray-300 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
         </div>
         <button className="bg-blue-600 text-white px-6 py-2 rounded text-sm hover:bg-blue-700">
            搜索
         </button>
         {mode === 'external' && (
           <>
             <div className="h-6 w-px bg-gray-200 mx-4"></div>
             <button className="flex items-center text-blue-600 text-sm border border-blue-600 rounded px-3 py-2 mr-2 hover:bg-blue-50">
                <Plus size={16} className="mr-1"/> 新建人才
             </button>
             <button className="flex items-center text-gray-600 text-sm border border-gray-300 rounded px-3 py-2 hover:bg-gray-50">
                <LayoutGrid size={16} className="mr-1"/> 激活管理
             </button>
             <button className="flex items-center text-gray-600 text-sm border border-gray-300 rounded px-3 py-2 ml-2 hover:bg-gray-50">
                <List size={16} className="mr-1"/> 盘点
             </button>
           </>
         )}
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 flex justify-between items-center text-sm">
         <div className="flex space-x-6">
            <button className="flex items-center text-gray-600 hover:text-gray-900">
               最高学历 <ChevronDown size={14} className="ml-1 text-gray-400" />
            </button>
            <button className="flex items-center text-gray-600 hover:text-gray-900">
               工作年限 <ChevronDown size={14} className="ml-1 text-gray-400" />
            </button>
            <button className="flex items-center text-gray-600 hover:text-gray-900">
               求职状态 <ChevronDown size={14} className="ml-1 text-gray-400" />
            </button>
            <button className="flex items-center text-gray-600 hover:text-gray-900">
               最近储备时间 <ChevronDown size={14} className="ml-1 text-gray-400" />
            </button>
            <button className="flex items-center text-gray-600 hover:text-gray-900">
               标签 <ChevronDown size={14} className="ml-1 text-gray-400" />
            </button>
            <button className="text-blue-600 hover:underline">
               高级筛选
            </button>
         </div>
         <div className="flex items-center space-x-2">
            <span className="text-gray-300 bg-gray-100 px-3 py-1 rounded text-xs">保存筛选条件</span>
            <button className="text-gray-500 hover:bg-gray-100 p-1.5 rounded"><Filter size={16}/></button>
            <div className="flex bg-gray-100 rounded p-0.5">
               <button className="p-1 bg-white shadow-sm rounded text-blue-600"><LayoutGrid size={16}/></button>
               <button className="p-1 text-gray-400 hover:text-gray-600"><List size={16}/></button>
            </div>
         </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">
         <table className="w-full text-left text-sm">
           <thead className="bg-gray-50 text-gray-500 font-medium text-xs">
             <tr>
               <th className="p-4 w-10"><input type="checkbox" className="rounded border-gray-300"/></th>
               <th className="p-4 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('name')}>
                  <div className="flex items-center">姓名 {sortConfig?.key === 'name' && <ChevronDown size={12}/>}</div>
               </th>
               <th className="p-4 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('gender')}>
                  <div className="flex items-center">性别 {sortConfig?.key === 'gender' && <ChevronDown size={12}/>}</div>
               </th>
               <th className="p-4 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('age')}>
                  <div className="flex items-center">年龄 {sortConfig?.key === 'age' && <ChevronDown size={12}/>}</div>
               </th>
               {mode === 'external' ? (
                 <>
                   <th className="p-4 cursor-pointer hover:bg-gray-100">
                      <div className="flex items-center">最高学历</div>
                   </th>
                   <th className="p-4 cursor-pointer hover:bg-gray-100">
                      <div className="flex items-center">工作年限</div>
                   </th>
                   <th className="p-4 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('reserveTime')}>
                      <div className="flex items-center">最近储备时间 {sortConfig?.key === 'reserveTime' && <ChevronDown size={12}/>}</div>
                   </th>
                   <th className="p-4 cursor-pointer hover:bg-gray-100">
                      <div className="flex items-center">最近人才库</div>
                   </th>
                   <th className="p-4 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('resumeUpdateTime')}>
                      <div className="flex items-center">标准简历更新时间 {sortConfig?.key === 'resumeUpdateTime' && <ChevronDown size={12}/>}</div>
                   </th>
                 </>
               ) : (
                 <>
                   <th className="p-4">职位</th>
                   <th className="p-4">部门</th>
                   <th className="p-4">绩效</th>
                   <th className="p-4">潜质</th>
                 </>
               )}
               <th className="p-4 w-10 text-right"><Settings size={14} className="ml-auto text-gray-400"/></th>
             </tr>
           </thead>
           <tbody className="divide-y divide-gray-100">
             {filteredData.map(talent => (
               <tr key={talent.id} className="hover:bg-blue-50/20 transition-colors group">
                 <td className="p-4"><input type="checkbox" className="rounded border-gray-300"/></td>
                 <td className="p-4">
                    <div className="flex items-center">
                       <span className="text-blue-600 cursor-pointer hover:underline font-medium">{talent.name}</span>
                       {talent.tags.map((tag, i) => (
                          <span key={i} className="ml-2 bg-blue-50 text-blue-600 border border-blue-100 px-1.5 rounded text-[10px]">{tag}</span>
                       ))}
                       {/* Mock Icon from screenshot */}
                       <span className="ml-1 text-orange-400"><LayoutGrid size={12}/></span> 
                    </div>
                 </td>
                 <td className="p-4 text-gray-600">{talent.gender}</td>
                 <td className="p-4 text-gray-600">{talent.age > 0 ? talent.age : ''}</td>
                 {mode === 'external' ? (
                   <>
                     <td className="p-4 text-gray-600">{talent.education[0]?.degree || talent.degree || '--'}</td>
                     <td className="p-4 text-gray-600">{talent.workYears}</td>
                     <td className="p-4 text-gray-600">{talent.reserveTime}</td>
                     <td className="p-4 text-gray-600">{talent.poolType}</td>
                     <td className="p-4 text-gray-600">{talent.resumeUpdateTime}</td>
                   </>
                 ) : (
                   <>
                     <td className="p-4 text-gray-600">{talent.position}</td>
                     <td className="p-4 text-gray-600">{talent.department}</td>
                     <td className="p-4 text-gray-600">{talent.performance}</td>
                     <td className="p-4 text-gray-600">{talent.potential}</td>
                   </>
                 )}
                 <td className="p-4 text-right">
                    <button className="text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                       <MoreHorizontal size={16}/>
                    </button>
                 </td>
               </tr>
             ))}
             {filteredData.length === 0 && (
               <tr>
                 <td colSpan={mode === 'external' ? 10 : 8} className="p-10 text-center text-gray-400">
                    未找到相关人才
                 </td>
               </tr>
             )}
           </tbody>
         </table>
      </div>
    </div>
  );
};
