
import React, { useState, useMemo } from 'react';
import { Search, Download, MapPin } from 'lucide-react';

// --- Mock Data Generator for Attendance ---
const generateAttendanceData = () => {
  const data = [];
  const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const locations = ['公司总部 (GPS)', '公司总部 (Wi-Fi)', '研发中心 (GPS)', '客户现场 (外勤)'];
  const baseDate = new Date('2024-03-20');

  for (let i = 0; i < 52; i++) {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() - i);
    const dayIndex = d.getDay();
    
    // Skip weekends for realism, but include the loop index
    if (dayIndex === 0 || dayIndex === 6) continue;

    const rand = Math.random();
    let status = '正常';
    let statusClass = 'bg-green-100 text-green-700 border-green-200';
    let checkIn = `08:${Math.floor(Math.random() * 10) + 50}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
    let checkOut = `18:${Math.floor(Math.random() * 30)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
    let location = locations[Math.floor(Math.random() * locations.length)];
    let checkInColor = 'text-gray-800';

    if (rand > 0.95) {
      status = '缺卡';
      statusClass = 'bg-red-50 text-red-600 border-red-100';
      checkIn = '--:--';
      checkOut = '--:--';
      checkInColor = 'text-red-500';
      location = '-';
    } else if (rand > 0.85) {
      status = '迟到';
      statusClass = 'bg-yellow-100 text-yellow-700 border-yellow-200';
      checkIn = `09:${Math.floor(Math.random() * 30)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
      checkInColor = 'text-orange-600';
    } else if (rand > 0.78) {
       status = '早退';
       statusClass = 'bg-orange-100 text-orange-700 border-orange-200';
       checkOut = `17:${Math.floor(Math.random() * 30) + 30}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
    }

    data.push({
      id: i,
      employeeId: '100234',
      date: d.toISOString().split('T')[0],
      week: weekDays[dayIndex],
      name: '张三',
      checkIn,
      checkOut,
      status,
      statusClass,
      checkInColor,
      location
    });
  }
  return data;
};

const MOCK_ATTENDANCE_DATA = generateAttendanceData();

export const AttendanceQuery: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState('');
  const itemsPerPage = 10;
  
  const totalItems = MOCK_ATTENDANCE_DATA.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return MOCK_ATTENDANCE_DATA.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setPageInput(''); 
    }
  };

  const handleJumpPage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const page = parseInt(pageInput);
      if (!isNaN(page) && page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        setPageInput('');
      }
    }
  };

  const startRecord = (currentPage - 1) * itemsPerPage + 1;
  const endRecord = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="space-y-6 animate-fade-in">
       {/* Search / Filter Bar */}
       <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
             <span className="text-sm text-gray-500 font-medium">日期:</span>
             <div className="flex items-center border border-gray-300 rounded-md bg-white overflow-hidden">
                <input type="date" className="px-2 py-1.5 text-sm border-none focus:ring-0 bg-transparent outline-none text-gray-600" />
                <span className="text-gray-400 px-1">-</span>
                <input type="date" className="px-2 py-1.5 text-sm border-none focus:ring-0 bg-transparent outline-none text-gray-600" />
             </div>
          </div>
          
          <div className="relative flex-1 min-w-[200px]">
             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
             <input type="text" placeholder="搜索姓名 / 工号..." className="w-full pl-9 pr-4 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"/>
          </div>
          
          <div className="flex space-x-2 w-full md:w-auto">
             <button className="flex-1 md:flex-none bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-blue-700 flex items-center justify-center">
               <Search size={14} className="mr-1" /> 查询
             </button>
             <button className="flex-1 md:flex-none bg-white border border-gray-300 text-gray-700 px-4 py-1.5 rounded-md text-sm hover:bg-gray-50 flex items-center justify-center">
               <Download size={14} className="mr-1" /> 导出
             </button>
          </div>
       </div>

       {/* Stats Summary */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
             <p className="text-xs text-blue-600 font-bold uppercase">应出勤天数</p>
             <p className="text-2xl font-bold text-gray-800 mt-1">22</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
             <p className="text-xs text-green-600 font-bold uppercase">正常出勤</p>
             <p className="text-2xl font-bold text-gray-800 mt-1">20</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
             <p className="text-xs text-yellow-600 font-bold uppercase">迟到/早退</p>
             <p className="text-2xl font-bold text-gray-800 mt-1">1</p>
          </div>
           <div className="bg-red-50 p-4 rounded-lg border border-red-100">
             <p className="text-xs text-red-600 font-bold uppercase">缺卡/旷工</p>
             <p className="text-2xl font-bold text-gray-800 mt-1">1</p>
          </div>
       </div>

       {/* Table */}
       <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
               <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                  <tr>
                     <th className="p-4">日期</th>
                     <th className="p-4">工号</th>
                     <th className="p-4">姓名</th>
                     <th className="p-4">签到时间</th>
                     <th className="p-4">签退时间</th>
                     <th className="p-4">状态</th>
                     <th className="p-4">打卡地点</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  {currentData.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                       <td className="p-4">{row.date} <span className="text-xs text-gray-400 ml-1">{row.week}</span></td>
                       <td className="p-4 text-gray-500 font-mono">{row.employeeId}</td>
                       <td className="p-4 font-medium flex items-center">
                          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs mr-2">{row.name.charAt(0)}</div>
                          {row.name}
                       </td>
                       <td className={`p-4 font-mono ${row.checkInColor || ''}`}>{row.checkIn}</td>
                       <td className="p-4 font-mono">{row.checkOut}</td>
                       <td className="p-4">
                         <span className={`${row.statusClass} px-2 py-0.5 rounded text-xs border`}>
                           {row.status}
                         </span>
                       </td>
                       <td className="p-4 text-gray-500 flex items-center">
                         {row.location !== '-' && <MapPin size={12} className="mr-1"/>}
                         {row.location}
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
             <span>显示 {startRecord}-{endRecord} 共 {totalItems} 条记录</span>
             <div className="flex space-x-2 items-center">
                <input 
                  type="text" 
                  className="w-12 px-2 py-1 border border-gray-300 rounded text-center text-sm focus:outline-none focus:border-blue-500" 
                  value={pageInput}
                  onChange={(e) => setPageInput(e.target.value)}
                  onKeyDown={handleJumpPage}
                  placeholder={String(currentPage)}
                  title="输入页码回车跳转"
                />
                <button 
                  className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  上一页
                </button>
                <button 
                  className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  下一页
                </button>
             </div>
          </div>
       </div>
    </div>
  );
};
