
import React, { useState } from 'react';
import { FileText, Upload, CheckCircle, Clock } from 'lucide-react';

export const MonthlyAttendance: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState('2024-02');
  
  return (
    <div className="space-y-6 animate-fade-in">
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Submission Form */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
             <h3 className="font-bold text-gray-800 mb-6 flex items-center">
                <FileText className="mr-2 text-blue-600" size={20} />
                月度考勤表单提交
             </h3>
             
             <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">考勤月份</label>
                      <input 
                        type="month" 
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" 
                      />
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">员工信息</label>
                      <input 
                        type="text" 
                        value="张三 (100234)" 
                        disabled 
                        className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-gray-500" 
                      />
                   </div>
                </div>

                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">考勤表单附件 (Excel)</label>
                   <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer">
                      <Upload size={32} className="mb-2 text-gray-400" />
                      <p className="text-sm">点击上传或拖拽文件至此</p>
                      <p className="text-xs text-gray-400 mt-1">支持 .xlsx (Max 5MB)</p>
                   </div>
                </div>

                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">备注说明</label>
                   <textarea 
                     className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
                     rows={3}
                     placeholder="如有特殊情况（如公出、系统补卡等），请在此说明..."
                   ></textarea>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100">
                   <button className="bg-blue-600 text-white px-8 py-2.5 rounded-md hover:bg-blue-700 shadow-md transition-colors flex items-center">
                      <CheckCircle size={16} className="mr-2" /> 确认提交
                   </button>
                </div>
             </div>
          </div>

          {/* Submission History */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
             <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                <Clock className="mr-2 text-gray-400" size={18} />
                历史提交记录
             </h3>
             <div className="space-y-4">
                {[
                  { month: '2024-01', date: '2024-02-02 14:30:25' },
                  { month: '2023-12', date: '2024-01-03 09:15:10' },
                  { month: '2023-11', date: '2023-12-01 16:45:33' },
                  { month: '2023-10', date: '2023-11-02 11:20:05' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                     <div>
                        <div className="font-bold text-gray-800 text-sm">{item.month} 考勤表</div>
                        <div className="text-xs text-gray-500 mt-1">提交于 {item.date}</div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
};
