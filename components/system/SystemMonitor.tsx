
import React from 'react';
import { Activity, CheckCircle, Server, Shield } from 'lucide-react';

export const SystemMonitor: React.FC = () => {
  return (
    <div className="space-y-6">
       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
             <p className="text-gray-500 text-xs font-semibold uppercase">系统运行时间</p>
             <h3 className="text-2xl font-bold text-gray-800 mt-1">99.99%</h3>
             <div className="flex items-center text-green-600 text-xs mt-2"><CheckCircle size={12} className="mr-1"/> 状态正常</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
             <p className="text-gray-500 text-xs font-semibold uppercase">API 响应时间</p>
             <h3 className="text-2xl font-bold text-gray-800 mt-1">45ms</h3>
             <div className="flex items-center text-green-600 text-xs mt-2"><Activity size={12} className="mr-1"/> 极快</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
             <p className="text-gray-500 text-xs font-semibold uppercase">当前在线用户</p>
             <h3 className="text-2xl font-bold text-gray-800 mt-1">428</h3>
             <div className="flex items-center text-blue-600 text-xs mt-2"><Server size={12} className="mr-1"/> 负载均衡</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
             <p className="text-gray-500 text-xs font-semibold uppercase">异常告警</p>
             <h3 className="text-2xl font-bold text-gray-800 mt-1">0</h3>
             <div className="flex items-center text-gray-400 text-xs mt-2"><Shield size={12} className="mr-1"/>暂无安全风险</div>
          </div>
       </div>
       
       <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center">
             <Activity size={18} className="mr-2 text-blue-600" /> 
             服务器资源监控
          </h3>
          <div className="space-y-4">
             {['CPU 使用率', '内存使用率', '磁盘 I/O', '网络带宽'].map((item, i) => (
                <div key={i}>
                   <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{item}</span>
                      <span className="font-mono font-medium">{Math.floor(Math.random() * 40) + 20}%</span>
                   </div>
                   <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full transition-all duration-1000" style={{width: `${Math.floor(Math.random() * 40) + 20}%`}}></div>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
};
