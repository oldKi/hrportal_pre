import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Wallet, UserCircle, Bell, Mail, Eye, EyeOff } from 'lucide-react';

export const PersonalInfoCard: React.FC<{ className?: string; onViewDetails?: () => void }> = ({ className = '', onViewDetails }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const notifications = [
        "关于进一步加强信息安全管理的通知。",
        "公司年度健康体检报名开始，请通过待办中心提交。",
        "员工关爱：端午礼品领取指引。",
        "系统维护预告：本周六凌晨 SuccessFactors 升级维护。"
    ];

    const [visibility, setVisibility] = useState({
        vacation: true,
        flexTime: true,
        wallet: true
    });

    const toggleVisibility = (key: keyof typeof visibility) => {
        setVisibility(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const isAllVisible = Object.values(visibility).every(v => v);
    const toggleAll = () => {
        const target = !isAllVisible;
        setVisibility({
            vacation: target,
            flexTime: target,
            wallet: target
        });
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % notifications.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className={`bg-[#1e70b8] rounded-xl shadow-sm overflow-hidden text-white relative group border border-blue-400/30 h-full min-h-[180px] flex flex-col ${className}`}>
            {/* Background Image with Refined Gradient Overlay */}
            <div 
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `linear-gradient(to right, #1e70b8 0%, #1e70b8 25%, rgba(30, 112, 184, 0.7) 50%, transparent 90%), url('https://ais-dev-r5ipvitb2wubrc35cive6z-310708248754.asia-east1.run.app/api/attachments/personal_card_bg.png')`,
                    backgroundPosition: 'right center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.8
                }}
            />
            
            {/* Main Content */}
            <div className="p-2 flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10 flex-1">
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full border-4 border-white/40 shadow-xl overflow-hidden shrink-0 bg-white/10 backdrop-blur-sm relative">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200" 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col drop-shadow-md">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div>
                            <div className="flex items-center gap-3">
                                <h2 className="text-2xl font-bold tracking-tight mb-1 drop-shadow-lg">John Doe</h2>
                                <button 
                                    onClick={onViewDetails}
                                    className="px-2 py-0.5 bg-white/20 hover:bg-white/30 text-white rounded text-[10px] font-bold transition-colors border border-white/10 backdrop-blur-sm"
                                >
                                    查看更多
                                </button>
                                <button 
                                    onClick={toggleAll}
                                    className="p-1 px-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors border border-white/10 backdrop-blur-sm flex items-center gap-1 ml-1"
                                    title={isAllVisible ? "全部隐藏" : "全部显示"}
                                >
                                    {isAllVisible ? <EyeOff size={14} /> : <Eye size={14} />}
                                    <span className="text-[10px] font-bold">{isAllVisible ? "一键隐藏" : "一键显示"}</span>
                                </button>
                            </div>
                            <div className="text-sm text-blue-50 font-bold flex flex-wrap items-center gap-2 drop-shadow-sm">
                                <span>ID: 100234</span>
                                <span className="opacity-40">|</span>
                                <span>高级软件工程师</span>
                                <span className="opacity-40">|</span>
                                <span>研发中心-RD</span>
                            </div>
                            <div className="text-sm text-blue-50 font-bold flex flex-wrap items-center gap-1.5 mt-1.5 drop-shadow-sm">
                                <Mail size={14} className="opacity-90" />
                                <span>john.doe@company.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-3">
                        <div className="bg-white/10 backdrop-blur-md rounded-lg px-3 py-2 flex items-center gap-2 border border-white/10 hover:bg-white/20 transition-all shadow-sm">
                            <span className="text-xs font-bold text-white"><span className="font-black text-white mr-1 text-[15px]">{visibility.vacation ? '5天' : '***'}</span> 剩余年假</span>
                            <button onClick={() => toggleVisibility('vacation')} className="ml-1 opacity-60 hover:opacity-100 transition-opacity">
                                {visibility.vacation ? <EyeOff size={12} /> : <Eye size={12} />}
                            </button>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-lg px-3 py-2 flex items-center gap-2 border border-white/10 hover:bg-white/20 transition-all shadow-sm">
                            <span className="text-xs font-bold text-white"><span className="font-black text-white mr-1 text-[15px]">{visibility.flexTime ? '127 h' : '***'}</span> 弹性工时</span>
                            <button onClick={() => toggleVisibility('flexTime')} className="ml-1 opacity-60 hover:opacity-100 transition-opacity">
                                {visibility.flexTime ? <EyeOff size={12} /> : <Eye size={12} />}
                            </button>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-lg px-3 py-2 flex items-center gap-2 border border-white/10 hover:bg-white/20 transition-all shadow-sm">
                            <span className="text-xs font-bold text-white"><span className="font-black text-white mr-1 text-[15px]">{visibility.wallet ? '28.5 元' : '***'}</span> 饭卡余额</span>
                            <button onClick={() => toggleVisibility('wallet')} className="ml-1 opacity-60 hover:opacity-100 transition-opacity">
                                {visibility.wallet ? <EyeOff size={12} /> : <Eye size={12} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notification Louver */}
            <div className="px-6 py-3 flex items-center gap-3 bg-white/5">
                <Bell size={16} className="text-yellow-300 shrink-0" />
                <div className="relative h-5 flex-1 overflow-hidden" style={{ perspective: '1000px' }}>
                    {notifications.map((msg, idx) => {
                        const isActive = idx === currentIndex;
                        const isPrev = idx === (currentIndex - 1 + notifications.length) % notifications.length;
                        
                        let transformClass = 'opacity-0 [transform:rotateX(-90deg)]';
                        if (isActive) {
                            transformClass = 'opacity-100 [transform:rotateX(0deg)] z-10';
                        } else if (isPrev) {
                            transformClass = 'opacity-0 [transform:rotateX(90deg)]';
                        }

                        return (
                            <div 
                                key={idx} 
                                className={`absolute inset-0 flex items-center transition-all duration-500 origin-center ${transformClass}`}
                            >
                                <span className="text-sm font-medium text-blue-50 truncate cursor-pointer hover:text-white hover:underline">{msg}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
