
import React, { useState } from 'react';
import { AlertCircle, Calendar, Clock } from 'lucide-react';

export const LeaveExtension: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'apply' | 'history'>('apply');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  const expiringLeaves = [
    { id: 1, type: '年假', year: 2023, remaining: 5, expiry: '2023-12-31', policy: '外方员工 (+3个月)', status: 'CanExtend' },
    { id: 2, type: '调休假', year: 2023, remaining: 12, expiry: '2023-12-31', policy: '中方员工 (规则调整)', status: 'CanExtend' },
  ];

  const history = [
    { id: 101, date: '2023-01-05', type: '年假 (2022)', days: 3, newExpiry: '2023-03-31', status: 'Approved', approver: 'HRBP' },
  ];

  const handleApply = (record: any) => {
    setSelectedRecord(record);
    setModalOpen(true);
  };

  const submitApplication = () => {
    setModalOpen(false);
    alert('申请已提交，请等待审批。');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start">
         <AlertCircle className="text-blue-600 mt-0.5 mr-3 flex-shrink-0" size={20} />
         <div className="text-sm text-blue-800">
            <p className="font-bold mb-1">假期延长规则说明：</p>
            <ul className="list-disc list-inside space-y-1 text-blue-700">
               <li>外方员工：未休年假可申请延长至新合同年的前3个月（通常至3月31日）。</li>
               <li>中方员工：根据每年公司政策调整，通常允许延长至次年3月底或6月底。</li>
               <li>申请需在原假期过期前发起，审批通过后系统自动更新假期余额有效期。</li>
            </ul>
         </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 flex overflow-hidden">
        <button
          onClick={() => setActiveTab('apply')}
          className={`flex-1 py-3 text-sm font-medium flex items-center justify-center transition-colors ${
            activeTab === 'apply' ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Calendar size={16} className="mr-2" /> 待处理假期 (可申请)
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-3 text-sm font-medium flex items-center justify-center transition-colors ${
            activeTab === 'history' ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Clock size={16} className="mr-2" /> 申请历史
        </button>
      </div>

      {activeTab === 'apply' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
           <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 font-medium">
                 <tr>
                    <th className="p-4">假期年度</th>
                    <th className="p-4">假期类型</th>
                    <th className="p-4">剩余天数</th>
                    <th className="p-4">当前有效期止</th>
                    <th className="p-4">适用规则</th>
                    <th className="p-4 text-right">操作</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                 {expiringLeaves.map(record => (
                   <tr key={record.id} className="hover:bg-gray-50">
                      <td className="p-4 font-mono">{record.year}</td>
                      <td className="p-4 font-medium text-gray-800">{record.type}</td>
                      <td className="p-4 font-bold text-orange-600">{record.remaining} 天</td>
                      <td className="p-4 text-red-500">{record.expiry}</td>
                      <td className="p-4 text-gray-500 text-xs">{record.policy}</td>
                      <td className="p-4 text-right">
                         <button 
                           onClick={() => handleApply(record)}
                           className="bg-blue-600 text-white px-3 py-1.5 rounded text-xs hover:bg-blue-700 transition-colors shadow-sm"
                         >
                           申请延长
                         </button>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
           <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 font-medium">
                 <tr>
                    <th className="p-4">申请日期</th>
                    <th className="p-4">假期类型</th>
                    <th className="p-4">延长天数</th>
                    <th className="p-4">新有效期</th>
                    <th className="p-4">审批人</th>
                    <th className="p-4">状态</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                 {history.map(row => (
                   <tr key={row.id} className="hover:bg-gray-50">
                      <td className="p-4 font-mono text-gray-500">{row.date}</td>
                      <td className="p-4 text-gray-800">{row.type}</td>
                      <td className="p-4">{row.days} 天</td>
                      <td className="p-4 font-mono">{row.newExpiry}</td>
                      <td className="p-4 text-gray-500">{row.approver}</td>
                      <td className="p-4">
                         <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs border border-green-200">
                           {row.status}
                         </span>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      )}

      {modalOpen && selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
           <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-slide-up">
              <div className="p-6 border-b border-gray-100">
                 <h3 className="font-bold text-lg text-gray-800">发起延长申请</h3>
                 <p className="text-sm text-gray-500 mt-1">针对 {selectedRecord.year}年 {selectedRecord.type}</p>
              </div>
              <div className="p-6 space-y-4">
                 <div className="bg-gray-50 p-3 rounded text-sm text-gray-700">
                    <div className="flex justify-between mb-1">
                       <span>剩余天数:</span>
                       <span className="font-bold">{selectedRecord.remaining} 天</span>
                    </div>
                    <div className="flex justify-between">
                       <span>当前过期日:</span>
                       <span className="text-red-500">{selectedRecord.expiry}</span>
                    </div>
                 </div>
                 
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">延长至</label>
                    <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                       <option>2024-03-31 (默认政策)</option>
                       <option>2024-06-30 (需特批)</option>
                    </select>
                 </div>

                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">申请理由</label>
                    <textarea 
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                      rows={3}
                      placeholder="请填写因公无法休假的原因..."
                    ></textarea>
                 </div>
              </div>
              <div className="p-4 border-t border-gray-100 flex justify-end space-x-3 bg-gray-50">
                 <button 
                   onClick={() => setModalOpen(false)}
                   className="px-4 py-2 border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50 text-sm"
                 >
                   取消
                 </button>
                 <button 
                   onClick={submitApplication}
                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm shadow-sm"
                 >
                   确认提交
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
