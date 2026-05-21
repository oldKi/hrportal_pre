
import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  GitMerge, 
  Clock, 
  Layers, 
  BarChart2, 
  GitPullRequest, 
  Star, 
  MessageCircle, 
  LayoutGrid, 
  MessageSquare, 
  Video, 
  FileText, 
  PieChart as PieChartIcon, 
  Database,
  ExternalLink,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  X,
  Check,
  Globe,
  Settings,
  Shield,
  Zap,
  Activity,
  Box,
  Monitor,
  AppWindow,
  List,
  Smartphone,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';


export const LeaveIcon = ({ size = 24, className = "stroke-[#7A8499]" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="16" rx="3.5" />
    <line x1="16" y1="2" x2="16" y2="5" />
    <line x1="8" y1="2" x2="8" y2="5" />
    <line x1="3" y1="9" x2="21" y2="9" />
    {/* Asterisk inside calendar */}
    <path d="M12 12v4M10 14h4M10.6 12.6l2.8 2.8M13.4 12.6l-2.8 2.8" />
  </svg>
);

export const ContractIcon = ({ size = 24, className = "stroke-[#7A8499]" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="3" width="16" height="18" rx="3" />
    <path d="M8 7h8M8 11h5" />
    {/* Rosette Stamp */}
    <circle cx="15" cy="16" r="2.5" />
    <path d="M14 18.5l-1 2 2-1 2 1-1-2" />
  </svg>
);

export const CertIcon = ({ size = 24, className = "stroke-[#7A8499]" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="3" width="16" height="18" rx="3" />
    <path d="M8 7h8M8 11h8M8 15h5" />
  </svg>
);

export const BadgeIcon = ({ size = 24, className = "stroke-[#7A8499]" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="6" width="14" height="15" rx="3" />
    <rect x="9" y="3" width="6" height="3" rx="1" />
    <circle cx="12" cy="11" r="2" />
    <path d="M8 17a4 4 0 0 1 8 0" />
  </svg>
);

export const HouseholdIcon = ({ size = 24, className = "stroke-[#7A8499]" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <circle cx="8" cy="10" r="1.5" />
    <path d="M5 15.5a3 3 0 0 1 6 0" />
    <path d="M13 9h5M13 13h5" />
  </svg>
);

export const TitleIcon = ({ size = 24, className = "stroke-[#7A8499]" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="3" width="16" height="18" rx="3" />
    <path d="M8 7h8M8 11h4" />
    {/* Stamp stamp outline */}
    <path d="M13 18h4" />
    <path d="M15 14v4M13.5 14h3" />
    <circle cx="15" cy="12" r="1.5" />
  </svg>
);

export const VisitorIcon = ({ size = 24, className = "stroke-[#7A8499]" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <line x1="16" y1="2" x2="16" y2="5" />
    <line x1="8" y1="2" x2="8" y2="5" />
    <line x1="3" y1="9" x2="21" y2="9" />
    {/* User head and shoulders inside calendar */}
    <circle cx="12" cy="13.5" r="1.5" />
    <path d="M9 17.5a3 3 0 0 1 6 0" />
  </svg>
);

export const ArchivesIcon = ({ size = 24, className = "stroke-[#7A8499]" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="3" width="14" height="18" rx="3" />
    <line x1="12" y1="6" x2="12" y2="18" />
    <circle cx="12" cy="9" r="1.5" fill="#7A8499" />
    <circle cx="12" cy="15" r="1.5" fill="#7A8499" />
    <path d="M10 12h4" />
  </svg>
);

export const TravelIcon = ({ size = 24, className = "stroke-[#7A8499]" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="6" width="18" height="12" rx="3" />
    <path d="M12 9l-1 2H9v1.5h2l-1 2h1.5l1.5-2H15V11h-2l1-2z" />
    <path d="M3 11a1.5 1.5 0 0 0 0-3 M21 11a1.5 1.5 0 0 1 0-3" />
  </svg>
);

export const MoreIcon = ({ size = 24, className = "stroke-[#7A8499]" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="12" r="1" fill="#7A8499" />
    <circle cx="12" cy="12" r="1" fill="#7A8499" />
    <circle cx="18" cy="12" r="1" fill="#7A8499" />
  </svg>
);

export const FeishuLogo = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.8 8.1C18.8 8.1 12.9 8.2 9.1 11.1C6.1 13.4 5.3 17.5 5.3 17.5C5.3 17.5 9 17.1 11.9 14.8C14.7 12.6 18.8 8.1 18.8 8.1Z" fill="#1F56D2"/>
    <path d="M15.1 5.3C15.1 5.3 9.2 5.4 5.4 8.3C2.4 10.6 1.6 14.7 1.6 14.7C1.6 14.7 5.3 14.3 8.2 12C11 9.8 15.1 5.3 15.1 5.3Z" fill="#00D6B9"/>
    <path d="M22.5 11C22.5 11 16.6 11.1 12.8 14C9.8 16.3 9 20.4 9 20.4C9 20.4 12.7 20 15.6 17.7C18.4 15.5 22.5 11 22.5 11Z" fill="#3370FF"/>
  </svg>
);

export const ICON_MAP: Record<string, React.ReactNode> = {
  'Leave': <LeaveIcon />,
  'Contract': <ContractIcon />,
  'Cert': <CertIcon />,
  'Badge': <BadgeIcon />,
  'Household': <HouseholdIcon />,
  'Title': <TitleIcon />,
  'Visitor': <VisitorIcon />,
  'Archives': <ArchivesIcon />,
  'Travel': <TravelIcon />,
  'More': <MoreIcon />,
};

interface AppItem {
  id: string;
  name: string;
  displayName?: string;
  desc: string;
  iconName: string;
  icon: React.ReactNode;
  iconSmall?: string; // Base64 or URL
  iconMedium?: string; // Base64 or URL
  color: string;
  category: string;
  englishName?: string;
  url: string;
  mobileUrl?: string;
  isFavorite?: boolean;
  isPc?: boolean;
  isMobile?: boolean;
}

export const ALL_APPS: AppItem[] = [
    { id: 'leave', name: '去请假', displayName: '去请假', desc: '在线请假、查看假期余额及审批进度', iconName: 'Leave', icon: <LeaveIcon />, color: 'bg-white', category: '核心人事', url: '#view=attendance', isFavorite: true, isPc: true, isMobile: true },
    { id: 'contract', name: '签合同', displayName: '签合同', desc: '在线签署劳动合同、保密协议等', iconName: 'Contract', icon: <ContractIcon />, color: 'bg-white', category: '核心人事', url: '#view=payroll', isPc: true, isMobile: true },
    { id: 'cert', name: '开证明', displayName: '开证明', desc: '在线申请开具在职证明、收入证明', iconName: 'Cert', icon: <CertIcon />, color: 'bg-white', category: '核心人事', url: '#view=personnel', isPc: true, isMobile: true },
    { id: 'badge', name: '办胸卡', displayName: '办胸卡', desc: '新员工胸卡办理、挂失及补办申请', iconName: 'Badge', icon: <BadgeIcon />, color: 'bg-white', category: '核心人事', url: '#view=personnel', isPc: true, isMobile: false },
    { id: 'household', name: '办户口', displayName: '办户口', desc: '落户申请、户口迁移及相关材料报送', iconName: 'Household', icon: <HouseholdIcon />, color: 'bg-white', category: '核心人事', url: '#view=personnel', isPc: true, isMobile: false },
    { id: 'title', name: '办职称', displayName: '办职称', desc: '专业技术职务任职资格申报与评审', iconName: 'Title', icon: <TitleIcon />, color: 'bg-white', category: '核心人事', url: '#view=personnel', isPc: true, isMobile: false },
    { id: 'visitor', name: '约访客', displayName: '约访客', desc: '外来访客预约、门禁授权及来访接待登记', iconName: 'Visitor', icon: <VisitorIcon />, color: 'bg-white', category: '系统运维', url: '#view=system', isPc: true, isMobile: true },
    { id: 'archives', name: '查档案', displayName: '查档案', desc: '个人人事档案查询、转递及证明借阅', iconName: 'Archives', icon: <ArchivesIcon />, color: 'bg-white', category: '核心人事', url: '#view=personnel', isPc: true, isMobile: true },
    { id: 'travel', name: '交通费', displayName: '交通费', desc: '日常公出、出差交通费报销与补贴申请', iconName: 'Travel', icon: <TravelIcon />, color: 'bg-white', category: '办公协作', url: '#view=payroll', isPc: true, isMobile: true },
];


export const AppCenter: React.FC<{ mode?: 'user' | 'admin' }> = ({ mode = 'admin' }) => {
    const [apps, setApps] = useState<AppItem[]>(ALL_APPS);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('全部');
    const [viewType, setViewType] = useState<'card' | 'table'>('card');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    
    // Force manage mode if mode is 'admin'
    const isManageMode = mode === 'admin';
    
    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingApp, setEditingApp] = useState<AppItem | null>(null);
    const [formData, setFormData] = useState<Partial<AppItem>>({
        name: '',
        displayName: '',
        desc: '',
        category: '核心人事',
        iconName: 'Box',
        url: '',
        mobileUrl: '',
        color: 'bg-blue-600',
        isPc: true,
        isMobile: true
    });

    const categories = ['全部', '核心人事', '办公协作', '产研开发', '系统运维'];

    const handleToggleFavorite = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setApps(prev => prev.map(app => app.id === id ? { ...app, isFavorite: !app.isFavorite } : app));
    };

    const filteredApps = apps.filter(app => {
        const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             app.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             (app.displayName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                             (app.englishName || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === '全部' || app.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    // Sort apps: favorites first
    const sortedApps = [...filteredApps].sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0));

    // Reset to page 1 on search or category filter change or page size change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, activeCategory, pageSize]);

    const totalPages = Math.ceil(sortedApps.length / pageSize);
    const safeCurrentPage = Math.min(currentPage, totalPages || 1);
    const paginatedApps = sortedApps.slice((safeCurrentPage - 1) * pageSize, safeCurrentPage * pageSize);

    const handleOpenApp = (app: AppItem) => {
        if (isManageMode) return;
        alert(`正在通过 SSO 登录并跳转至 ${app.name} (${app.url})...`);
    };

    const handleAddClick = () => {
        setEditingApp(null);
        setFormData({
            name: '',
            displayName: '',
            desc: '',
            category: '核心人事',
            iconName: 'Box',
            url: '',
            mobileUrl: '',
            color: 'bg-blue-600',
            isPc: true,
            isMobile: true
        });
        setIsModalOpen(true);
    };

    const handleEditClick = (e: React.MouseEvent, app: AppItem) => {
        e.stopPropagation();
        setEditingApp(app);
        setFormData({
            ...app,
            isPc: app.isPc !== false,
            isMobile: app.isMobile !== false
        });
        setIsModalOpen(true);
    };

    const handleDeleteClick = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (window.confirm('确定要删除这个应用吗？')) {
            setApps(prev => prev.filter(app => app.id !== id));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const iconName = formData.iconName || 'Box';
        const icon = ICON_MAP[iconName];
        if (editingApp) {
            setApps(prev => prev.map(app => app.id === editingApp.id ? { ...app, ...formData, icon } as AppItem : app));
        } else {
            const newApp: AppItem = {
                ...formData,
                id: Date.now().toString(),
                iconName,
                icon,
            } as AppItem;
            setApps(prev => [...prev, newApp]);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="搜索应用名称、显示名称或功能..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
                        />
                    </div>
                    {isManageMode && (
                        <button 
                            onClick={handleAddClick}
                            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-md shrink-0"
                        >
                            <Plus size={18} />
                            新增应用
                        </button>
                    )}
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                    <div className="flex bg-white p-1 rounded-xl border border-gray-200 shadow-sm overflow-x-auto no-scrollbar">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                                    activeCategory === cat ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="flex bg-white p-1 rounded-xl border border-gray-200 shadow-sm shrink-0 gap-1">
                        <button
                            type="button"
                            onClick={() => setViewType('card')}
                            className={`p-1.5 rounded-lg transition-all ${
                                viewType === 'card' 
                                ? 'bg-blue-50 text-blue-600 font-bold' 
                                : 'text-gray-400 hover:text-gray-600'
                            }`}
                            title="卡片视图"
                        >
                            <LayoutGrid size={18} />
                        </button>
                        <button
                            type="button"
                            onClick={() => setViewType('table')}
                            className={`p-1.5 rounded-lg transition-all ${
                                viewType === 'table' 
                                ? 'bg-blue-50 text-blue-600 font-bold' 
                                : 'text-gray-400 hover:text-gray-600'
                            }`}
                            title="表格视图"
                        >
                            <List size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Apps Content */}
            {viewType === 'card' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {paginatedApps.map(app => (
                        <div 
                            key={app.id}
                            onClick={() => handleOpenApp(app)}
                            className={`bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm transition-all group relative ${
                                isManageMode ? 'cursor-default' : 'cursor-pointer hover:shadow-xl hover:-translate-y-1'
                            }`}
                        >
                            {isManageMode ? (
                                <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={(e) => handleEditClick(e, app)}
                                        className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                        title="编辑"
                                    >
                                        <Edit size={14} />
                                    </button>
                                    <button 
                                        onClick={(e) => handleDeleteClick(e, app.id)}
                                        className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                        title="删除"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={(e) => handleToggleFavorite(e, app.id)}
                                    className={`absolute top-3 right-3 transition-opacity ${app.isFavorite ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                                >
                                    <Star size={18} className={app.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 hover:text-yellow-400'} />
                                </button>
                            )}

                            <div className="w-16 h-16 rounded-[1.5rem] bg-white border border-gray-100/80 flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform overflow-hidden">
                                {app.iconMedium ? (
                                    <img src={app.iconMedium} alt={app.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                ) : (
                                    ICON_MAP[app.iconName] || <Box size={24} className="stroke-[#7A8499]" />
                                )}
                            </div>
                            <h3 className="font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">{app.name}</h3>
                            <p className="text-[10px] text-gray-400 font-medium mb-1 uppercase tracking-wider">{app.displayName || app.englishName || app.name}</p>
                            <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed h-8 mb-4">{app.desc}</p>
                            
                            <div className="mt-auto pt-4 border-t border-gray-50 w-full flex justify-between items-center">
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{app.category}</span>
                                {!isManageMode && <ExternalLink size={12} className="text-gray-300 group-hover:text-blue-500 transition-colors" />}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white border border-gray-150 rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px] border-collapse text-left">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/50">
                                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider w-12 text-center">收藏</th>
                                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">应用名称</th>
                                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">显示名称</th>
                                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">描述</th>
                                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">分类</th>
                                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">支持终端</th>
                                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">PC端地址</th>
                                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">移动端地址</th>
                                    {isManageMode && <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">操作</th>}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {paginatedApps.map(app => (
                                    <tr 
                                        key={app.id} 
                                        onClick={() => handleOpenApp(app)}
                                        className={`hover:bg-gray-50/80 transition-colors ${
                                            isManageMode ? 'cursor-default' : 'cursor-pointer'
                                        }`}
                                    >
                                        <td className="py-4 px-6 text-center" onClick={(e) => e.stopPropagation()}>
                                            {!isManageMode && (
                                                <button
                                                    onClick={(e) => handleToggleFavorite(e, app.id)}
                                                    className="transition-transform active:scale-95"
                                                >
                                                    <Star 
                                                        size={18} 
                                                        className={app.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 hover:text-yellow-400'} 
                                                    />
                                                </button>
                                            )}
                                            {isManageMode && (
                                                <Star 
                                                    size={18} 
                                                    className={app.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-250'} 
                                                />
                                            )}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                                                    {app.iconMedium ? (
                                                        <img src={app.iconMedium} alt={app.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                                    ) : (
                                                        ICON_MAP[app.iconName] || <Box size={18} className="stroke-[#7A8499]" />
                                                    )}
                                                </div>
                                                <span className="font-bold text-gray-800 text-sm">{app.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-600 font-medium">
                                            {app.displayName || app.name}
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-400 max-w-xs truncate">
                                            {app.desc}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-600">
                                                {app.category}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex gap-2">
                                                <span 
                                                    title="PC端" 
                                                    className={`p-1 rounded-md ${
                                                        app.isPc !== false 
                                                        ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                                                        : 'bg-gray-50 text-gray-300 border border-gray-100'
                                                    }`}
                                                >
                                                    <Monitor size={14} />
                                                </span>
                                                <span 
                                                    title="移动端" 
                                                    className={`p-1 rounded-md ${
                                                        app.isMobile !== false 
                                                        ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                                                        : 'bg-gray-50 text-gray-300 border border-gray-100'
                                                    }`}
                                                >
                                                    <Smartphone size={14} />
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-xs text-blue-600 font-mono max-w-[150px] truncate">
                                            <a href={app.url} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                                                {app.url}
                                                <ExternalLink size={10} />
                                            </a>
                                        </td>
                                        <td className="py-4 px-6 text-xs text-gray-400 font-mono max-w-[150px] truncate">
                                            {app.mobileUrl ? (
                                                <a href={app.mobileUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                                                    {app.mobileUrl}
                                                    <ExternalLink size={10} />
                                                </a>
                                            ) : (
                                                '--'
                                            )}
                                        </td>
                                        {isManageMode && (
                                            <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                                                <div className="flex justify-end gap-2">
                                                    <button 
                                                        onClick={(e) => handleEditClick(e, app)}
                                                        className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                                        title="编辑"
                                                    >
                                                        <Edit size={14} />
                                                    </button>
                                                    <button 
                                                        onClick={(e) => handleDeleteClick(e, app.id)}
                                                        className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                                        title="删除"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {filteredApps.length > 0 && (
                <div className="p-4 bg-white border border-gray-150 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 select-none">
                    <div className="text-sm text-gray-500">
                        共 <span className="font-bold text-gray-800">{filteredApps.length}</span> 个应用，当前显示第 <span className="font-bold text-gray-800">{(safeCurrentPage - 1) * pageSize + 1}</span> 到 <span className="font-bold text-gray-800">{Math.min(safeCurrentPage * pageSize, filteredApps.length)}</span> 个
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">每页显示</span>
                            <select 
                                value={pageSize}
                                onChange={(e) => {
                                    setPageSize(Number(e.target.value));
                                }}
                                className="bg-white border border-gray-250 rounded-lg px-2.5 py-1 text-xs outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                            >
                                {[5, 10, 20, 50].map(size => <option key={size} value={size}>{size} 条</option>)}
                            </select>
                        </div>
                        <div className="flex items-center gap-1">
                            <button 
                                type="button"
                                disabled={safeCurrentPage === 1}
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-blue-600 disabled:opacity-30 disabled:hover:bg-transparent transition-all flex items-center justify-center cursor-pointer"
                                title="上一页"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <div className="flex items-center px-3 text-sm font-bold text-gray-700">
                                {safeCurrentPage} / {totalPages || 1}
                            </div>
                            <button 
                                type="button"
                                disabled={safeCurrentPage === totalPages || totalPages === 0}
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-blue-600 disabled:opacity-30 disabled:hover:bg-transparent transition-all flex items-center justify-center cursor-pointer"
                                title="下一页"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {filteredApps.length === 0 && (
                <div className="py-20 flex flex-col items-center justify-center text-gray-400 bg-white rounded-2xl border border-dashed border-gray-200">
                    <Search size={48} className="opacity-10 mb-4" />
                    <p className="font-medium">未找到符合条件的企业应用</p>
                </div>
            )}

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-scale-in max-h-[90vh] flex flex-col">
                        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 shrink-0">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{editingApp ? '编辑应用' : '新增应用'}</h3>
                                <p className="text-xs text-gray-500 mt-1">请填写应用的基本信息和访问配置</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X size={20} className="text-gray-400" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                                        中文名称 <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        required
                                        type="text" 
                                        value={formData.name || ''}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="例如：飞书"
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                                        显示名称 <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        required
                                        type="text" 
                                        value={formData.displayName || ''}
                                        onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                        placeholder="例如：去请假"
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">应用描述</label>
                                <textarea 
                                    required
                                    rows={2}
                                    value={formData.desc || ''}
                                    onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                                    placeholder="简要描述应用的主要功能..."
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">分类 Tag</label>
                                    <select 
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                                    >
                                        {categories.filter(c => c !== '全部').map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">支持终端</label>
                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, isPc: !prev.isPc }))}
                                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-bold transition-all ${
                                                formData.isPc 
                                                ? 'bg-blue-50 border-blue-200 text-blue-600 shadow-sm' 
                                                : 'bg-gray-50 border-gray-200 text-gray-400 hover:bg-gray-100/50'
                                            }`}
                                        >
                                            <Monitor size={16} />
                                            PC端
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, isMobile: !prev.isMobile }))}
                                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-bold transition-all ${
                                                formData.isMobile 
                                                ? 'bg-blue-50 border-blue-200 text-blue-600 shadow-sm' 
                                                : 'bg-gray-50 border-gray-200 text-gray-400 hover:bg-gray-100/50'
                                            }`}
                                        >
                                            <Smartphone size={16} />
                                            移动端
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">访问地址 (PC URL)</label>
                                    <div className="relative">
                                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input 
                                            required
                                            type="url" 
                                            value={formData.url || ''}
                                            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                            placeholder="https://app.example.com"
                                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">移动端访问地址 (Mobile URL)</label>
                                    <div className="relative">
                                        <Monitor className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input 
                                            type="url" 
                                            value={formData.mobileUrl || ''}
                                            onChange={(e) => setFormData({ ...formData, mobileUrl: e.target.value })}
                                            placeholder="https://m.app.example.com (可选)"
                                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex gap-4 shrink-0">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all"
                                >
                                    取消
                                </button>
                                <button 
                                    type="submit"
                                    className="flex-1 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                                >
                                    {editingApp ? '保存修改' : '立即新增'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
