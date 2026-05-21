
import React from 'react';
import { Search } from 'lucide-react';

export const SystemLogs: React.FC<{ type: 'api' | 'operation' }> = ({ type }) => {
  return (
    <div className="space-y-4">
       <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[200px]">
             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
             <input type="text" placeholder="搜索日志内容/用户/IP..." className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"/>
          </div>
          <div className="flex items-center space-x-2">
             <input type="date" className="border border-gray-300 rounded-md px-3 py-2 text-sm" />
             <span className="text-gray-400">-</span>
             <input type="date" className="border border-gray-300 rounded-md px-3 py-2 text-sm" />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">查询</button>
       </div>

       <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left text-sm">
             <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                <tr>
                   <th className="p-4">时间</th>
                   <th className="p-4">用户</th>
                   <th className="p-4">操作类型</th>
                   <th className="p-4">IP地址</th>
                   <th className="p-4">状态</th>
                   <th className="p-4">详情</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                   <tr key={i} className="hover:bg-gray-50">
                      <td className="p-4 text-gray-500 font-mono">2024-03-20 10:{10 + i}:23</td>
                      <td className="p-4 font-medium text-gray-800">User_{100 + i}</td>
                      <td className="p-4">{type === 'api' ? `GET /api/v1/resource/${i}` : `更新了员工档案 [ID: E00${i}]`}</td>
                      <td className="p-4 text-gray-500 font-mono">192.168.1.{100 + i}</td>
                      <td className="p-4">
                         <span className={`px-2 py-0.5 rounded text-xs ${i % 5 === 0 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                            {i % 5 === 0 ? 'Failed' : 'Success'}
                         </span>
                      </td>
                      <td className="p-4 text-blue-600 cursor-pointer hover:underline">查看</td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
};
