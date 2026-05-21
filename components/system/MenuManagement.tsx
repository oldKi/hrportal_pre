
import React, { useState } from 'react';
import { 
  Plus, Search, RotateCcw, ChevronDown, ChevronRight, 
  Edit, Trash2, LayoutGrid, Menu as MenuIcon, MousePointer2,
  X, Info, HelpCircle
} from 'lucide-react';

interface MenuItemData {
  id: string;
  name: string;
  type: 'directory' | 'menu' | 'button';
  icon?: string;
  order: number;
  route?: string;
  component?: string;
  permission?: string;
  status: 'normal' | 'disabled';
  createTime: string;
  children?: MenuItemData[];
}

const MOCK_MENU_DATA: MenuItemData[] = [
  {
    id: '1',
    name: '工作台',
    type: 'directory',
    icon: 'LayoutDashboard',
    order: 1,
    status: 'normal',
    createTime: '2024-03-11 10:00:00',
    children: [
      { id: '1-1', name: 'Stage 智能空间', type: 'menu', route: 'dashboard-stage', order: 1, status: 'normal', createTime: '2024-03-11 10:05:00' },
      { id: '1-2', name: '员工工作台', type: 'menu', route: 'dashboard-employee', order: 2, status: 'normal', createTime: '2024-03-11 10:06:00' },
    ]
  },
  {
    id: '2',
    name: '系统管理',
    type: 'directory',
    icon: 'Server',
    order: 10,
    status: 'normal',
    createTime: '2024-03-11 11:00:00',
    children: [
      { id: '2-1', name: '菜单管理', type: 'menu', route: 'sys-menu', order: 1, status: 'normal', createTime: '2024-03-11 11:05:00' },
      { id: '2-2', name: '角色管理', type: 'menu', route: 'sys-permissions', order: 2, status: 'normal', createTime: '2024-03-11 11:06:00' },
    ]
  }
];

const MenuDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
}> = ({ isOpen, onClose, initialData }) => {
  const [formData, setFormData] = useState({
    parent: '主类目',
    type: 'menu',
    icon: 'documentation',
    name: '',
    order: 1,
    isExternal: 'no',
    route: '',
    component: '',
    permission: '',
    params: '',
    isCache: 'yes',
    display: 'yes',
    status: 'normal'
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl flex flex-col max-h-[95vh] animate-scale-up">
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-800 text-lg">{initialData ? '修改菜单' : '新增菜单'}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-400 hover:text-gray-600"/>
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-2 gap-x-8 gap-y-5">
            {/* 上级菜单 */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">上级菜单</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={formData.parent}
                  readOnly
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 cursor-default outline-none"
                />
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* 菜单类型 */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">菜单类型</label>
              <div className="flex gap-6">
                {[
                  { id: 'directory', label: '目录', icon: <LayoutGrid size={14} /> },
                  { id: 'menu', label: '菜单', icon: <MenuIcon size={14} /> },
                  { id: 'button', label: '按钮', icon: <MousePointer2 size={14} /> }
                ].map(type => (
                  <label key={type.id} className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="menuType" 
                      checked={formData.type === type.id}
                      onChange={() => setFormData({...formData, type: type.id as any})}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="flex items-center gap-1.5 text-sm text-gray-700 group-hover:text-blue-600 transition-colors">
                      {type.icon} {type.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 菜单图标 */}
            {formData.type !== 'button' && (
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">菜单图标</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <LayoutGrid size={16} />
                  </span>
                  <input 
                    type="text" 
                    placeholder="点击选择图标"
                    value={formData.icon}
                    onChange={(e) => setFormData({...formData, icon: e.target.value})}
                    className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            )}

            {/* 菜单名称 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                <span className="text-red-500 mr-1">*</span>菜单名称
              </label>
              <input 
                type="text" 
                placeholder="请输入菜单名称"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* 显示排序 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                <span className="text-red-500 mr-1">*</span>显示排序
              </label>
              <input 
                type="number" 
                value={formData.order}
                onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* 是否外链 */}
            {formData.type !== 'button' && (
              <div>
                <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1.5">
                  <HelpCircle size={14} className="text-gray-400" /> 是否外链
                </label>
                <div className="flex gap-6 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="isExternal" checked={formData.isExternal === 'yes'} onChange={() => setFormData({...formData, isExternal: 'yes'})} className="w-4 h-4 text-blue-600 border-gray-300" />
                    <span className="text-sm text-gray-700">是</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="isExternal" checked={formData.isExternal === 'no'} onChange={() => setFormData({...formData, isExternal: 'no'})} className="w-4 h-4 text-blue-600 border-gray-300" />
                    <span className="text-sm text-gray-700">否</span>
                  </label>
                </div>
              </div>
            )}

            {/* 路由地址 */}
            {formData.type !== 'button' && (
              <div>
                <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1.5">
                  <span className="text-red-500 mr-1">*</span>
                  <HelpCircle size={14} className="text-gray-400" /> 路由地址
                </label>
                <input 
                  type="text" 
                  placeholder="请输入路由地址"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            )}

            {/* 组件路径 */}
            {formData.type === 'menu' && (
              <div>
                <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1.5">
                  <HelpCircle size={14} className="text-gray-400" /> 组件路径
                </label>
                <input 
                  type="text" 
                  placeholder="请输入组件路径"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            )}

            {/* 权限字符 */}
            {formData.type !== 'directory' && (
              <div>
                <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1.5">
                  <HelpCircle size={14} className="text-gray-400" /> 权限字符
                </label>
                <input 
                  type="text" 
                  placeholder="请输入权限标识"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            )}

            {/* 路由参数 */}
            {formData.type === 'menu' && (
              <div>
                <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1.5">
                  <HelpCircle size={14} className="text-gray-400" /> 路由参数
                </label>
                <input 
                  type="text" 
                  placeholder="请输入路由参数"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            )}

            {/* 是否缓存 */}
            {formData.type === 'menu' && (
              <div>
                <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1.5">
                  <HelpCircle size={14} className="text-gray-400" /> 是否缓存
                </label>
                <div className="flex gap-6 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="isCache" checked={formData.isCache === 'yes'} onChange={() => setFormData({...formData, isCache: 'yes'})} className="w-4 h-4 text-blue-600 border-gray-300" />
                    <span className="text-sm text-gray-700">缓存</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="isCache" checked={formData.isCache === 'no'} onChange={() => setFormData({...formData, isCache: 'no'})} className="w-4 h-4 text-blue-600 border-gray-300" />
                    <span className="text-sm text-gray-700">不缓存</span>
                  </label>
                </div>
              </div>
            )}

            {/* 显示状态 */}
            {formData.type !== 'button' && (
              <div>
                <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1.5">
                  <HelpCircle size={14} className="text-gray-400" /> 显示状态
                </label>
                <div className="flex gap-6 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="display" checked={formData.display === 'yes'} onChange={() => setFormData({...formData, display: 'yes'})} className="w-4 h-4 text-blue-600 border-gray-300" />
                    <span className="text-sm text-gray-700">显示</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="display" checked={formData.display === 'no'} onChange={() => setFormData({...formData, display: 'no'})} className="w-4 h-4 text-blue-600 border-gray-300" />
                    <span className="text-sm text-gray-700">隐藏</span>
                  </label>
                </div>
              </div>
            )}

            {/* 菜单状态 */}
            <div>
              <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1.5">
                <HelpCircle size={14} className="text-gray-400" /> 菜单状态
              </label>
              <div className="flex gap-6 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="status" checked={formData.status === 'normal'} onChange={() => setFormData({...formData, status: 'normal'})} className="w-4 h-4 text-blue-600 border-gray-300" />
                  <span className="text-sm text-gray-700">正常</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="status" checked={formData.status === 'disabled'} onChange={() => setFormData({...formData, status: 'disabled'})} className="w-4 h-4 text-blue-600 border-gray-300" />
                  <span className="text-sm text-gray-700">停用</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-lg">
          <button onClick={onClose} className="px-6 py-2 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            取消
          </button>
          <button onClick={onClose} className="px-6 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 shadow-sm transition-colors">
            确定
          </button>
        </div>
      </div>
    </div>
  );
};

export const MenuManagement: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set(['1', '2']));
  const [editData, setEditData] = useState<any>(null);

  const toggleRow = (id: string) => {
    const newSet = new Set(expandedRows);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setExpandedRows(newSet);
  };

  const renderRows = (items: MenuItemData[], level: number = 0) => {
    return items.map(item => (
      <React.Fragment key={item.id}>
        <tr className="hover:bg-slate-50 transition-colors group">
          <td className="px-6 py-4">
            <div className="flex items-center" style={{ paddingLeft: `${level * 24}px` }}>
              {item.children && item.children.length > 0 ? (
                <button 
                  onClick={() => toggleRow(item.id)}
                  className="p-1 mr-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {expandedRows.has(item.id) ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
              ) : (
                <div className="w-6" />
              )}
              <span className="text-sm font-medium text-gray-800">{item.name}</span>
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gray-100 rounded text-gray-500">
                <LayoutGrid size={14} />
              </div>
              <span className="text-xs text-gray-500">{item.icon || '-'}</span>
            </div>
          </td>
          <td className="px-6 py-4">
            <span className="text-sm text-gray-600">{item.order}</span>
          </td>
          <td className="px-6 py-4">
            <span className="text-sm font-mono text-gray-500">{item.route || '-'}</span>
          </td>
          <td className="px-6 py-4">
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
              item.status === 'normal' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
            }`}>
              {item.status === 'normal' ? '正常' : '停用'}
            </span>
          </td>
          <td className="px-6 py-4">
            <span className="text-xs text-gray-400">{item.createTime}</span>
          </td>
          <td className="px-6 py-4 text-right">
            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => { setEditData(item); setIsDialogOpen(true); }}
                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                title="修改"
              >
                <Edit size={16} />
              </button>
              <button 
                className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                title="新增"
              >
                <Plus size={16} />
              </button>
              <button 
                className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                title="删除"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </td>
        </tr>
        {item.children && expandedRows.has(item.id) && renderRows(item.children, level + 1)}
      </React.Fragment>
    ));
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Search Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">菜单名称</span>
          <input 
            type="text" 
            placeholder="请输入菜单名称"
            className="border border-gray-300 rounded px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 w-48"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">状态</span>
          <select className="border border-gray-300 rounded px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 w-32 bg-white">
            <option value="">所有</option>
            <option value="normal">正常</option>
            <option value="disabled">停用</option>
          </select>
        </div>
        <div className="flex gap-2 ml-auto">
          <button className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
            <Search size={14} /> 查询
          </button>
          <button className="flex items-center gap-1.5 px-4 py-1.5 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 transition-colors">
            <RotateCcw size={14} /> 重置
          </button>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex gap-2">
        <button 
          onClick={() => { setEditData(null); setIsDialogOpen(true); }}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-blue-200 text-blue-600 bg-blue-50 rounded text-sm hover:bg-blue-100 transition-colors"
        >
          <Plus size={14} /> 新增
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-green-200 text-green-600 bg-green-50 rounded text-sm hover:bg-green-100 transition-colors">
          <Edit size={14} /> 修改
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-400 bg-gray-50 rounded text-sm cursor-not-allowed">
          <ChevronDown size={14} /> 展开/折叠
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">菜单名称</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">图标</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">排序</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">权限标识</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">状态</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">创建时间</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {renderRows(MOCK_MENU_DATA)}
          </tbody>
        </table>
      </div>

      <MenuDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
        initialData={editData}
      />
    </div>
  );
};
