import React, { useState, useEffect } from 'react';
import { Bell, ChevronRight, Clock, Megaphone, X } from 'lucide-react';

export const MessageNotificationPanel: React.FC<{ className?: string }> = ({ className = '' }) => {
    const [showAnnouncements, setShowAnnouncements] = useState(true);
    const [showCloseTooltip, setShowCloseTooltip] = useState(false);

    const announcements = [
        "2024 年度上半年度绩效考核已启动，请及时完成自评。",
        "关于进一步加强信息安全管理的通知。",
        "公司年度健康体检报名开始，请通过待办中心提交。",
        "员工关爱：端午礼品领取指引。",
        "系统维护预告：本周六凌晨 SuccessFactors 升级维护。"
    ];

    if (!showAnnouncements) return null;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full flex flex-col hover:shadow-md transition-all">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800 flex items-center text-lg">
                    <Bell size={20} className="mr-2 text-yellow-500 animate-bell" /> 公告消息
                </h3>
                <button className="text-xs text-blue-600 font-bold hover:underline flex items-center">
                    更多公告 <ChevronRight size={14} className="ml-0.5"/>
                </button>
            </div>
            
            <div className="flex-1 space-y-5">
                <div className="flex items-start group/msg cursor-pointer p-4 rounded-xl hover:bg-blue-50/50 border border-transparent hover:border-blue-100 transition-all">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 mt-1.5 mr-4 shrink-0 ring-4 ring-red-50"></div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <p className="text-base text-gray-800 font-bold group-hover/msg:text-blue-600 transition-colors">2024年度上半年度绩效考核启动通知</p>
                            <span className="text-[10px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">紧急</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2 leading-relaxed line-clamp-2">各位同事，2024年度上半年绩效考核于本周正式启动，请确保在3月31日前完成自评与一轮面谈...</p>
                        <div className="flex items-center mt-3 space-x-4">
                            <div className="flex items-center text-[11px] text-gray-400 font-medium">HR部</div>
                            <span className="text-gray-200 text-[10px]">|</span>
                            <div className="flex items-center text-[11px] text-gray-400 font-medium">
                                <Clock size={12} className="mr-1 opacity-70" /> 2小时前
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-start group/msg cursor-pointer p-4 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-1.5 mr-4 shrink-0 ring-4 ring-blue-50"></div>
                    <div className="flex-1">
                        <p className="text-base text-gray-800 font-bold group-hover/msg:text-blue-600 transition-colors">系统维护预告：Success Factors 升级</p>
                        <p className="text-sm text-gray-500 mt-2 leading-relaxed">系统将于本周末凌晨 02:00 进行例行升级维护，期间部分审批流程可能出现延迟...</p>
                        <div className="flex items-center mt-3 space-x-4">
                            <div className="flex items-center text-[11px] text-gray-400 font-medium">IT 运维中心</div>
                            <span className="text-gray-200 text-[10px]">|</span>
                            <div className="flex items-center text-[11px] text-gray-400 font-medium">
                                <Clock size={12} className="mr-1 opacity-70" /> 昨天
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
