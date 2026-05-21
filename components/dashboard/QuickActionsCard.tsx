import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Plus, X, Search, LayoutGrid } from 'lucide-react';
import { ALL_APPS, ICON_MAP, MoreIcon } from '../system/AppCenter';

const getSafeColorClass = (colorStr: string) => {
    return 'bg-white border border-gray-100/50 shadow-sm';
};

export const QuickActionsCard: React.FC<{ 
    className?: string, 
    isEditMode?: boolean, 
    onNavigate?: (view: string) => void,
    initialActions?: { id: string, label: string, icon: React.ReactNode, color: string, view?: string }[]
}> = ({ className = '', isEditMode = false, onNavigate, initialActions }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMoreModalOpen, setIsMoreModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const defaultActions = ALL_APPS.map(app => ({
        id: app.id,
        label: app.name,
        icon: app.icon,
        color: 'bg-white border border-gray-100/50 shadow-sm',
        view: app.url.startsWith('#view=') ? app.url.replace('#view=', '') : app.id
    }));

    const [actions, setActions] = useState<{ id: string, label: string, icon: React.ReactNode, color: string, view?: string }[]>(initialActions || defaultActions);

    const handleActionClick = (id: string, view?: string) => {
        if (isEditMode) return;
        if (view) {
            onNavigate?.(view);
        }
    };

    const handleAddApp = (app: typeof ALL_APPS[0]) => {
        if (actions.find(a => a.id === app.id)) return;
        setActions([...actions, { 
            id: app.id, 
            label: app.name, 
            icon: app.icon, 
            color: getSafeColorClass(app.color),
            view: app.id
        }]);
        setIsModalOpen(false);
        setSearchTerm('');
    };

    const handleRemoveAction = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setActions(actions.filter(a => a.id !== id));
    };

    const filteredApps = ALL_APPS.filter(app => 
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        app.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Display top 7 actions in the dashboard card
    const displayedActions = actions.slice(0, 7);

    return (
        <div className={`bg-gradient-to-br from-blue-50/50 via-cyan-50/20 to-white rounded-3xl shadow-sm border border-gray-100/70 p-6 h-full flex flex-col justify-center ${className}`}>
           
            <div className="grid grid-cols-4 gap-y-5 gap-x-3 justify-items-center w-full my-auto">
                {displayedActions.map(action => (
                    <div key={action.id} className="relative flex flex-col items-center group w-full">
                        <button 
                            onClick={() => handleActionClick(action.id, action.view)}
                            className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.02)] border border-gray-100/50 hover:shadow-[0_6px_16px_rgba(0,0,0,0.06)] hover:border-blue-200 transition-all hover:scale-105 duration-200"
                        >
                            {action.icon}
                        </button>
                        <span className="font-semibold text-gray-800 text-[11px] sm:text-xs mt-2.5 tracking-wide text-center truncate w-full px-1">{action.label}</span>
                        {isEditMode && (
                            <button 
                                onClick={(e) => handleRemoveAction(e, action.id)}
                                className="absolute -top-1.5 -right-1 bg-red-100 text-red-600 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200"
                            >
                                <X size={12} />
                            </button>
                        )}
                    </div>
                ))}

                {/* 8th Slot: More Button */}
                {!isEditMode && actions.length > 7 && (
                    <div className="flex flex-col items-center w-full">
                        <button 
                            onClick={() => setIsMoreModalOpen(true)}
                            className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.02)] border border-gray-100/50 hover:shadow-[0_6px_16px_rgba(0,0,0,0.06)] hover:border-blue-200 transition-all hover:scale-105 duration-200"
                        >
                            <MoreIcon size={24} />
                        </button>
                        <span className="font-semibold text-gray-800 text-[11px] sm:text-xs mt-2.5 tracking-wide text-center">更多</span>
                    </div>
                )}

                {isEditMode && (
                    <div className="flex flex-col items-center w-full">
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.02)] border border-dashed border-gray-200 text-gray-400 hover:border-blue-200 hover:text-blue-500 hover:scale-105 transition-all duration-200"
                        >
                            <Plus size={20} />
                        </button>
                        <span className="font-semibold text-gray-500 text-[11px] sm:text-xs mt-2.5 tracking-wide text-center">添加</span>
                    </div>
                )}
            </div>

            {/* "More" Modal displaying all 9 applications */}
            {isMoreModalOpen && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-gradient-to-br from-blue-50/50 via-cyan-50/20 to-white rounded-3xl shadow-2xl w-full max-w-lg p-8 flex flex-col relative animate-scale-in">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-800">应用中心</h3>
                            <button 
                                onClick={() => setIsMoreModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 hover:bg-gray-100 rounded-full"
                            >
                                <X size={18} />
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-y-6 gap-x-4 justify-items-center py-2">
                            {actions.map(action => (
                                <div key={action.id} className="flex flex-col items-center w-full">
                                    <button 
                                        onClick={() => {
                                            handleActionClick(action.id, action.view);
                                            setIsMoreModalOpen(false);
                                        }}
                                        className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.02)] border border-gray-100/50 hover:shadow-[0_6px_16px_rgba(0,0,0,0.06)] hover:border-blue-200 transition-all hover:scale-105 duration-200"
                                    >
                                        {action.icon}
                                    </button>
                                    <span className="font-semibold text-gray-800 text-[11px] sm:text-xs mt-2.5 tracking-wide text-center truncate w-full px-1">{action.label}</span>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-8 pt-4 border-t border-gray-100/50 flex justify-end">
                            <button 
                                onClick={() => {
                                    setIsMoreModalOpen(false);
                                    onNavigate?.('my-app-center');
                                }}
                                className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 bg-blue-50/50 px-3.5 py-2 rounded-xl"
                            >
                                <span>前往全功能应用管理中心</span>
                                <span>→</span>
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {/* App Selection Modal for Edit Mode */}
            {isModalOpen && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden animate-fade-in">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800">添加快捷应用</h3>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input 
                                    type="text" 
                                    placeholder="搜索应用名称..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {filteredApps.map(app => {
                                    const isAdded = actions.some(a => a.id === app.id);
                                    return (
                                        <button
                                            key={app.id}
                                            onClick={() => !isAdded && handleAddApp(app)}
                                            disabled={isAdded}
                                            className={`flex flex-col items-center p-4 rounded-xl border text-center transition-all ${
                                                isAdded 
                                                    ? 'border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed' 
                                                    : 'border-gray-100 hover:border-blue-200 hover:shadow-md hover:bg-blue-50/30'
                                            }`}
                                        >
                                            <div className="p-3 bg-white rounded-xl mb-3 border border-gray-100 shadow-sm text-white">
                                                {app.icon}
                                            </div>
                                            <span className="font-bold text-gray-800 text-sm mb-1">{app.name}</span>
                                            <span className="text-xs text-gray-500 line-clamp-2">{app.desc}</span>
                                            {isAdded && (
                                                <span className="mt-2 text-[10px] font-bold text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full">
                                                    已添加
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                                {filteredApps.length === 0 && (
                                    <div className="col-span-full py-12 text-center text-gray-400">
                                        未找到匹配的应用
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

