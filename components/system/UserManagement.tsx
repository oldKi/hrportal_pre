
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  UserX, 
  ChevronLeft, 
  ChevronRight, 
  Columns, 
  X,
  Check,
  UserCheck,
  Download,
  Plus
} from 'lucide-react';

interface User {
  id: string;
  employeeId: string;
  name: string;
  department: string;
  position: string;
  roles: string[];
  phone: string;
  email: string;
  status: 'active' | 'disabled';
  createdAt: string;
}

const MOCK_USERS: User[] = [
  { id: '1', employeeId: 'SVW001', name: '张三', department: '研发中心', position: '高级经理', roles: ['管理员', '研发'], phone: '13800138000', email: 'zhangsan@svw.com', status: 'active', createdAt: '2023-01-15' },
  { id: '2', employeeId: 'SVW002', name: '李四', department: '产品部', position: '经理', roles: ['普通用户'], phone: '13800138001', email: 'lisi@svw.com', status: 'active', createdAt: '2023-02-20' },
  { id: '3', employeeId: 'SVW003', name: '王五', department: '市场部', position: '主管', roles: ['普通用户'], phone: '13800138002', email: 'wangwu@svw.com', status: 'disabled', createdAt: '2023-03-10' },
  { id: '4', employeeId: 'SVW004', name: '赵六', department: '研发中心', position: '专员', roles: ['研发'], phone: '13800138003', email: 'zhaoliu@svw.com', status: 'active', createdAt: '2023-04-05' },
  { id: '5', employeeId: 'SVW005', name: '钱七', department: '人事部', position: '专员', roles: ['人事'], phone: '13800138004', email: 'qianqi@svw.com', status: 'active', createdAt: '2023-05-12' },
  { id: '6', employeeId: 'SVW006', name: '孙八', department: '财务部', position: '专员', roles: ['财务'], phone: '13800138005', email: 'sunba@svw.com', status: 'active', createdAt: '2023-06-18' },
  { id: '7', employeeId: 'SVW007', name: '周九', department: '研发中心', position: '主管', roles: ['研发'], phone: '13800138006', email: 'zhoujiu@svw.com', status: 'disabled', createdAt: '2023-07-22' },
  { id: '8', employeeId: 'SVW008', name: '吴十', department: '法务部', position: '经理', roles: ['普通用户'], phone: '13800138007', email: 'wushi@svw.com', status: 'active', createdAt: '2023-08-30' },
  { id: '9', employeeId: 'SVW009', name: '郑十一', department: '研发中心', position: '专员', roles: ['研发'], phone: '13800138008', email: 'zhengshiyi@svw.com', status: 'active', createdAt: '2023-09-14' },
  { id: '10', employeeId: 'SVW010', name: '王十二', department: '产品部', position: '专员', roles: ['普通用户'], phone: '13800138009', email: 'wangshier@svw.com', status: 'active', createdAt: '2023-10-01' },
  { id: '11', employeeId: 'SVW011', name: '冯十三', department: '市场部', position: '专员', roles: ['普通用户'], phone: '13800138010', email: 'fengshisan@svw.com', status: 'active', createdAt: '2023-11-11' },
  { id: '12', employeeId: 'SVW012', name: '陈十四', department: '研发中心', position: '专员', roles: ['研发'], phone: '13800138011', email: 'chenshisi@svw.com', status: 'disabled', createdAt: '2023-12-25' },
];

const DEPARTMENTS = ['全部', '研发中心', '产品部', '市场部', '人事部', '财务部', '法务部'];
const POSITIONS = ['高级经理', '经理', '主管', '专员', '实习生'];
const ROLES = ['管理员', '普通用户', '财务', '人事', '研发'];

export const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('全部');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isColumnConfigOpen, setIsColumnConfigOpen] = useState(false);
  
  // User Modal state
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userFormData, setUserFormData] = useState<Partial<User>>({
    employeeId: '',
    name: '',
    department: '研发中心',
    position: '专员',
    roles: ['普通用户'],
    phone: '',
    email: '',
    status: 'active'
  });

  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  
  // Advanced filters
  const [filters, setFilters] = useState({
    employeeId: '',
    name: '',
    status: 'all',
    dateRange: { start: '', end: '' }
  });

  // Column visibility
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    employeeId: true,
    name: true,
    department: true,
    position: true,
    roles: true,
    phone: true,
    email: true,
    status: true,
    createdAt: true,
    actions: true
  });

  const columns = [
    { key: 'id', label: '编号' },
    { key: 'employeeId', label: '工号' },
    { key: 'name', label: '姓名' },
    { key: 'department', label: '部门' },
    { key: 'position', label: '职位' },
    { key: 'roles', label: '角色' },
    { key: 'phone', label: '手机号' },
    { key: 'email', label: '邮箱' },
    { key: 'status', label: '状态' },
    { key: 'createdAt', label: '创建时间' },
  ];

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDept = selectedDept === '全部' || user.department === selectedDept;
      
      const matchesAdvanced = 
        (filters.employeeId === '' || user.employeeId.includes(filters.employeeId)) &&
        (filters.name === '' || user.name.includes(filters.name)) &&
        (filters.status === 'all' || user.status === filters.status) &&
        (filters.dateRange.start === '' || user.createdAt >= filters.dateRange.start) &&
        (filters.dateRange.end === '' || user.createdAt <= filters.dateRange.end);

      return matchesSearch && matchesDept && matchesAdvanced;
    });
  }, [searchTerm, selectedDept, filters, users]);

  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const toggleColumn = (key: string) => {
    setVisibleColumns(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const handleDisableUser = (id: string) => {
    setUsers(prev => prev.map(user => 
      user.id === id 
        ? { ...user, status: user.status === 'active' ? 'disabled' : 'active' } 
        : user
    ));
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setUserFormData({
      employeeId: '',
      name: '',
      department: '研发中心',
      position: '专员',
      roles: ['普通用户'],
      phone: '',
      email: '',
      status: 'active'
    });
    setIsUserModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setUserFormData(user);
    setIsUserModalOpen(true);
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...userFormData } as User : u));
    } else {
      const newUser: User = {
        ...userFormData,
        id: (users.length + 1).toString(),
        createdAt: new Date().toISOString().split('T')[0],
      } as User;
      setUsers(prev => [newUser, ...prev]);
    }
    setIsUserModalOpen(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[calc(100vh-180px)]">
      {/* Toolbar */}
      <div className="p-4 border-b border-gray-50 flex flex-wrap items-center justify-between gap-4 bg-gray-50/30">
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="搜索姓名、工号..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <select 
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          >
            {DEPARTMENTS.map(dept => <option key={dept} value={dept}>{dept}</option>)}
          </select>
          <button 
            onClick={() => setIsFilterDrawerOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
          >
            <Filter size={16} />
            高级筛选
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsColumnConfigOpen(!isColumnConfigOpen)}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-all relative"
            title="列配置"
          >
            <Columns size={20} />
            {isColumnConfigOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in">
                <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50 mb-1">
                  显示列配置
                </div>
                {columns.map(col => (
                  <button 
                    key={col.key}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleColumn(col.key);
                    }}
                    className="w-full px-4 py-2 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm text-gray-700">{col.label}</span>
                    {visibleColumns[col.key as keyof typeof visibleColumns] && <Check size={14} className="text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </button>
          <button 
            onClick={handleAddUser}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-sm"
          >
            <Plus size={18} />
            新增用户
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="flex-1 overflow-auto no-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="border-b border-gray-100">
              {visibleColumns.id && <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">编号</th>}
              {visibleColumns.employeeId && <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">工号</th>}
              {visibleColumns.name && <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">姓名</th>}
              {visibleColumns.department && <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">部门</th>}
              {visibleColumns.position && <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">职位</th>}
              {visibleColumns.roles && <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">角色</th>}
              {visibleColumns.phone && <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">手机号</th>}
              {visibleColumns.email && <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">邮箱</th>}
              {visibleColumns.status && <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">状态</th>}
              {visibleColumns.createdAt && <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">创建时间</th>}
              {visibleColumns.actions && <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">操作</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginatedUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                {visibleColumns.id && <td className="px-6 py-4 text-sm text-gray-500">{user.id}</td>}
                {visibleColumns.employeeId && <td className="px-6 py-4 text-sm font-mono font-bold text-gray-700">{user.employeeId}</td>}
                {visibleColumns.name && (
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <span className="text-sm font-bold text-gray-800">{user.name}</span>
                    </div>
                  </td>
                )}
                {visibleColumns.department && <td className="px-6 py-4 text-sm text-gray-600">{user.department}</td>}
                {visibleColumns.position && <td className="px-6 py-4 text-sm text-gray-600 font-medium">{user.position}</td>}
                {visibleColumns.roles && (
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {user.roles.map(role => (
                        <span key={role} className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-bold">
                          {role}
                        </span>
                      ))}
                    </div>
                  </td>
                )}
                {visibleColumns.phone && <td className="px-6 py-4 text-sm text-gray-600">{user.phone}</td>}
                {visibleColumns.email && <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>}
                {visibleColumns.status && (
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {user.status === 'active' ? '启用中' : '已禁用'}
                    </span>
                  </td>
                )}
                {visibleColumns.createdAt && <td className="px-6 py-4 text-sm text-gray-500">{user.createdAt}</td>}
                {visibleColumns.actions && (
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleEditUser(user)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="修改"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDisableUser(user.id)}
                        className={`p-2 rounded-lg transition-all ${
                          user.status === 'active' 
                            ? 'text-gray-400 hover:text-red-600 hover:bg-red-50' 
                            : 'text-green-600 hover:bg-green-50'
                        }`}
                        title={user.status === 'active' ? '禁用' : '启用'}
                      >
                        {user.status === 'active' ? <UserX size={16} /> : <UserCheck size={16} />}
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {paginatedUsers.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-gray-400">
            <Search size={48} className="opacity-10 mb-4" />
            <p>未找到匹配的用户数据</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/30 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          共 <span className="font-bold text-gray-800">{filteredUsers.length}</span> 条数据
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">每页显示</span>
            <select 
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-blue-500"
            >
              {[5, 10, 20, 50].map(size => <option key={size} value={size}>{size}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-1">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:bg-white hover:text-blue-600 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center px-3 text-sm font-bold text-gray-700">
              {currentPage} / {totalPages || 1}
            </div>
            <button 
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:bg-white hover:text-blue-600 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* User Modal */}
      {isUserModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-scale-in">
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{editingUser ? '编辑用户' : '新增用户'}</h3>
                <p className="text-xs text-gray-500 mt-1">请填写用户的基本资料信息</p>
              </div>
              <button onClick={() => setIsUserModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} className="text-gray-400" />
              </button>
            </div>
            
            <form onSubmit={handleSaveUser} className="p-8 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">工号</label>
                  <input 
                    required
                    type="text" 
                    value={userFormData.employeeId}
                    onChange={(e) => setUserFormData({ ...userFormData, employeeId: e.target.value })}
                    placeholder="SVW000"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">姓名</label>
                  <input 
                    required
                    type="text" 
                    value={userFormData.name}
                    onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })}
                    placeholder="请输入姓名"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">部门</label>
                  <select 
                    value={userFormData.department}
                    onChange={(e) => setUserFormData({ ...userFormData, department: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                  >
                    {DEPARTMENTS.filter(d => d !== '全部').map(dept => <option key={dept} value={dept}>{dept}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">职位</label>
                  <select 
                    value={userFormData.position}
                    onChange={(e) => setUserFormData({ ...userFormData, position: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                  >
                    {POSITIONS.map(pos => <option key={pos} value={pos}>{pos}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">角色 (1对多)</label>
                <div className="flex flex-wrap gap-2 p-3 bg-gray-50 border border-gray-200 rounded-xl">
                  {ROLES.map(role => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => {
                        const currentRoles = userFormData.roles || [];
                        const nextRoles = currentRoles.includes(role)
                          ? currentRoles.filter(r => r !== role)
                          : [...currentRoles, role];
                        setUserFormData({ ...userFormData, roles: nextRoles });
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        userFormData.roles?.includes(role)
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-white text-gray-500 border border-gray-100 hover:border-blue-200'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">手机号</label>
                  <input 
                    required
                    type="tel" 
                    value={userFormData.phone}
                    onChange={(e) => setUserFormData({ ...userFormData, phone: e.target.value })}
                    placeholder="请输入手机号"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">邮箱</label>
                  <input 
                    required
                    type="email" 
                    value={userFormData.email}
                    onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
                    placeholder="example@svw.com"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  type="button"
                  onClick={() => setIsUserModalOpen(false)}
                  className="flex-1 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all"
                >
                  取消
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                >
                  {editingUser ? '保存修改' : '立即新增'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filter Drawer */}
      {isFilterDrawerOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] animate-fade-in"
            onClick={() => setIsFilterDrawerOpen(false)}
          />
          <div className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-[70] animate-slide-in-right flex flex-col">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Filter size={20} className="text-blue-600" />
                高级筛选
              </h3>
              <button 
                onClick={() => setIsFilterDrawerOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-all"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">工号</label>
                <input 
                  type="text" 
                  value={filters.employeeId}
                  onChange={(e) => setFilters(prev => ({ ...prev, employeeId: e.target.value }))}
                  placeholder="输入工号查询"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">姓名</label>
                <input 
                  type="text" 
                  value={filters.name}
                  onChange={(e) => setFilters(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="输入姓名查询"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">状态</label>
                <div className="flex gap-2">
                  {['all', 'active', 'disabled'].map(s => (
                    <button
                      key={s}
                      onClick={() => setFilters(prev => ({ ...prev, status: s as any }))}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                        filters.status === s 
                          ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                          : 'bg-white border-gray-200 text-gray-500 hover:border-blue-200'
                      }`}
                    >
                      {s === 'all' ? '全部' : s === 'active' ? '启用' : '禁用'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">创建时间范围</label>
                <div className="space-y-2">
                  <input 
                    type="date" 
                    value={filters.dateRange.start}
                    onChange={(e) => setFilters(prev => ({ ...prev, dateRange: { ...prev.dateRange, start: e.target.value } }))}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                  <div className="text-center text-gray-300 text-xs">至</div>
                  <input 
                    type="date" 
                    value={filters.dateRange.end}
                    onChange={(e) => setFilters(prev => ({ ...prev, dateRange: { ...prev.dateRange, end: e.target.value } }))}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50/50 grid grid-cols-2 gap-4">
              <button 
                onClick={() => {
                  setFilters({ employeeId: '', name: '', status: 'all', dateRange: { start: '', end: '' } });
                  setSelectedDept('全部');
                  setSearchTerm('');
                }}
                className="py-3 rounded-xl text-sm font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-all"
              >
                重置
              </button>
              <button 
                onClick={() => setIsFilterDrawerOpen(false)}
                className="py-3 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md"
              >
                确定
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
