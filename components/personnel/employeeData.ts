export interface EmployeeDetail {
  id: string;
  name: string;
  enName?: string;
  dept: string;
  position: string;
  email: string;
  phone?: string;
  location: string;
  avatar?: string;
  education?: Array<{ school: string; major: string; degree: string; time: string; pathway?: string; role?: string }>;
  workHistory?: Array<{ company: string; time: string; position: string; dept?: string; note?: string }>;
  family?: Array<{ relation: string; name: string; birth: string; political: string; job: string }>;
  emergencyContact?: { name: string; phone: string };
  // Extended fields for VW Manager profile
  gender?: string;
  dob?: string;
  ethnicity?: string;
  nativePlace?: string;
  birthplace?: string;
  politicalStatus?: string;
  joinPartyDate?: string;
  maritalStatus?: string;
  startWorkDate?: string;
  title?: string;
  perf2024?: string;
  perf2023?: string;
  perf2022?: string;
  partyWorkHistory?: Array<{ time: string; dept: string; position: string }>;
  awardsPunishments?: Array<{ date: string; project: string; category: string; org: string }>;
  phoneShort?: string;
  homeAddress?: string;
}

export const MOCK_EMPLOYEE_DETAILS: Record<string, EmployeeDetail> = {
  '10000': {
    id: '10000',
    name: '张晓峰',
    enName: 'Zhang Xiaofeng',
    dept: '预批量中心/尺寸工程(VSC-S)',
    position: '预批量中心/尺寸工程(VSC-S)部门经理',
    email: 'xiaofeng.zhang@svw.com',
    phone: '18817745888',
    phoneShort: '665888',
    location: '上海安亭总部',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200',
    gender: '男',
    dob: '1992/01/09',
    ethnicity: '汉族',
    nativePlace: '江苏苏州',
    birthplace: '上海',
    politicalStatus: '中共党员',
    joinPartyDate: '2020/06',
    maritalStatus: '已婚',
    startWorkDate: '2017/07/20',
    title: '工程师',
    perf2024: 'A',
    perf2023: 'A',
    perf2022: 'B',
    homeAddress: '上海市嘉定区于田路7号',
    education: [
      { school: '同济大学', major: '物理学', degree: '理学学士', time: '2003/09 - 2007/07', pathway: '全日制', role: '班级学习委员' },
      { school: '上海交通大学', major: '车辆工程', degree: '工学硕士', time: '2007/09 - 2010/03', pathway: '全日制', role: '学院学生会主席' },
      { school: '上海交通大学', major: '工商管理', degree: '管理学硕士', time: '2013/07 - 2017/04', pathway: '非全日制', role: '无' }
    ],
    workHistory: [
      { company: '奇瑞汽车股份有限公司', dept: '芜湖工厂总装车间', position: '现场技术', time: '2010/04 - 2011/05' },
      { company: '上汽大众', dept: '规划部样板车间样车股(TMI-5)', position: '车间现场技术', time: '2011/05 - 2012/05' },
      { company: '上汽大众', dept: '规划/样板车间/起步生产支持(TMI-3)', position: '车间现场技术', time: '2012/05 - 2012/11' },
      { company: '上汽大众', dept: '批量样板/宁波批产陪伴(TS-5)', position: '车间现场技术', time: '2012/11 - 2013/10' },
      { company: '上汽大众', dept: '批量样板/宁波批产陪伴(TS-5)', position: '经理', time: '2013/10 - 2015/07' },
      { company: '上汽大众', dept: '样板中心/批量样板/宁波批产陪伴(TCS-6)', position: '经理', time: '2015/07 - 2015/12' },
      { company: '上汽大众', dept: '样板中心/批量样板/安亭批产陪伴3(TCS-3)', position: '经理', time: '2015/12 - 2018/04' },
      { company: '上汽大众', dept: '样板中心/批量样板(PCS-3)', position: '经理', time: '2018/04 - 2022/06', note: '2021.9-2022.9 挂职上海汽车集团股份有限公司乘用车分公司副总经理助理' },
      { company: '上汽大众', dept: '预批量中心/尺寸工程(VSC-S)', position: '部门经理', time: '2022/06 - 至今' }
    ],
    partyWorkHistory: [
      { time: '2020/06 - 至今', dept: '预批量中心党支部', position: '支部宣传委员' }
    ],
    awardsPunishments: [
      { date: '2015', project: '年度优秀员工', category: '个人', org: '上汽大众汽车有限公司' }
    ],
    family: [
      { relation: '妻子', name: '任雪', birth: '1993/04', political: '群众', job: '某外资企业 - HRBP' },
      { relation: '长女', name: '张莉莉', birth: '2018/05', political: '群众', job: '小学在读' },
      { relation: '次女', name: '张萌萌', birth: '2021/08', political: '群众', job: '幼儿园在读' },
      { relation: '父亲', name: '张建军', birth: '1965/02', political: '中共党员', job: '上汽大众 - 退休工程师' },
      { relation: '母亲', name: '孙丽华', birth: '1966/07', political: '群众', job: '退休教师' }
    ],
    emergencyContact: { name: '任雪 (配偶)', phone: '13918882888' }
  },
  '17150': {
    id: '17150',
    name: '喻言',
    enName: 'Yu Yan',
    dept: 'CI技术与管理部',
    position: 'CI技术与管理人员',
    email: 'yu.yan@company.com',
    phone: '13812345678',
    location: '上海总部-安亭',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200',
    education: [
      { school: '上海应用技术大学', major: '工商管理', degree: '本科 / 学士', time: '2004/09 - 2008/07' }
    ],
    workHistory: [
      { company: '吉利控股集团', time: '2023-07 ~ 至今', position: '活动策划专员' },
      { company: '微软', time: '2017-02 ~ 2018-05', position: '产品经理 (1年3个月)' }
    ],
    family: [
      { relation: '配偶', name: '王大明', birth: '1988/05', political: '群众', job: '某科技公司 - 产品经理' },
      { relation: '女儿', name: '王小花', birth: '2018/10', political: '--', job: '--' }
    ],
    emergencyContact: { name: '喻某某 (配偶)', phone: '13800000000' }
  },
  '001': {
    id: '001',
    name: '张三',
    enName: 'Zhang San',
    dept: '人力资源部',
    position: 'HRBP',
    email: 'zhang.san@company.com',
    phone: '13900000001',
    location: '上海总部-安亭',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
    education: [
      { school: '复旦大学', major: '人力资源管理', degree: '硕士', time: '2015/09 - 2018/07' }
    ],
    workHistory: [
      { company: '大众汽车（中国）', time: '2020-03 ~ 至今', position: 'HRBP' },
      { company: '腾讯科技', time: '2018-07 ~ 2020-02', position: 'HR专员' }
    ],
    family: [
      { relation: '配偶', name: '张内内', birth: '1992/08', political: '党员', job: '银行经理' }
    ],
    emergencyContact: { name: '张内内', phone: '13911112222' }
  },
  '002': {
    id: '002',
    name: '李四',
    enName: 'Li Si',
    dept: '信息技术部',
    position: '软件工程师',
    email: 'li.si@company.com',
    phone: '13900000002',
    location: '上海总部-安亭',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200',
    education: [
      { school: '上海交通大学', major: '计算机科学与技术', degree: '本科', time: '2010/09 - 2014/07' }
    ],
    workHistory: [
      { company: '大众汽车（中国）', time: '2018-05 ~ 至今', position: '软件工程师' },
      { company: '华为技术有限公司', time: '2014-07 ~ 2018-04', position: '初级开发工程师' }
    ],
    emergencyContact: { name: '李爸爸', phone: '13900008888' }
  },
  '003': {
    id: '003',
    name: '王五',
    enName: 'Wang Wu',
    dept: '财务部',
    position: '财务主管',
    email: 'wang.wu@company.com',
    phone: '13900000003',
    location: '上海总部-安亭',
    education: [
      { school: '上海财经大学', major: '会计学', degree: '本科', time: '2008/09 - 2012/07' }
    ],
    workHistory: [
      { company: '大众汽车（中国）', time: '2016-09 ~ 至今', position: '财务主管' },
      { company: '普华永道会计师事务所', time: '2012-08 ~ 2016-08', position: '高级审计员' }
    ]
  },
  '004': {
    id: '004',
    name: '赵六',
    enName: 'Zhao Liu',
    dept: '市场部',
    position: '市场专员',
    email: 'zhao.liu@company.com',
    phone: '13900000004',
    location: '北京分部',
    education: [
      { school: '中国人民大学', major: '市场营销', degree: '本科', time: '2012/09 - 2016/07' }
    ],
    workHistory: [
      { company: '大众汽车（中国）', time: '2021-04 ~ 至今', position: '市场专员' }
    ]
  },
  '005': {
    id: '005',
    name: '陈七',
    enName: 'Chen Qi',
    dept: '销售部',
    position: '销售经理',
    email: 'chen.qi@company.com',
    phone: '13900000005',
    location: '上海总部-安亭',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200',
    education: [
      { school: '同济大学', major: '汽车工程', degree: '本科', time: '2006/09 - 2010/07' }
    ],
    workHistory: [
      { company: '大众汽车（中国）', time: '2015-11 ~ 至今', position: '销售经理' }
    ]
  },
  '006': {
    id: '006',
    name: '林八',
    enName: 'Lin Ba',
    dept: '研发部',
    position: '研发总监',
    email: 'lin.ba@company.com',
    phone: '13900000006',
    location: '上海总部-安亭',
    education: [
      { school: '清华大学', major: '车辆工程', degree: '博士', time: '2000/09 - 2008/07' }
    ],
    workHistory: [
      { company: '大众汽车（中国）', time: '2012-08 ~ 至今', position: '研发总监' }
    ]
  },
  '007': {
    id: '007',
    name: '周九',
    enName: 'Zhou Jiu',
    dept: '运营部',
    position: '运营专员',
    email: 'zhou.jiu@company.com',
    phone: '13900000007',
    location: '上海总部-安亭',
    education: [
      { school: '华东理工大学', major: '工业工程', degree: '本科', time: '2014/09 - 2018/07' }
    ],
    workHistory: [
      { company: '大众汽车（中国）', time: '2019-10 ~ 至今', position: '运营专员' }
    ]
  },
  'ceo': {
    id: 'ceo',
    name: 'Oliver Blume',
    dept: 'Volkswagen AG',
    position: 'Volkswagen AG CEO',
    email: 'oliver.blume@volkswagen.de',
    location: 'Wolfsburg, Germany',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150'
  },
  'vgc-ceo': {
    id: 'vgc-ceo',
    name: 'Ralf Brandstätter',
    dept: 'Volkswagen Group China',
    position: 'VGC CEO / Member of Board',
    email: 'ralf.brandstaetter@volkswagen.com.cn',
    location: '北京本部',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150&h=150'
  },
  'vgc-hr': {
    id: 'vgc-hr',
    name: 'Stephan Mecha',
    dept: 'Volkswagen Group China HR',
    position: 'VGC HR Director',
    email: 'stephan.mecha@volkswagen.com.cn',
    location: '北京本部',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150'
  },
  'm1': {
    id: 'm1',
    name: '李正阳',
    enName: 'Li Zhengyang',
    dept: 'PMIF部门',
    position: 'PMIF部门经理',
    email: 'zhengyang.li@volkswagen.com.cn',
    phone: '13811110001',
    location: '上海总部-安亭',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150&h=150',
    education: [
      { school: '浙江大学', major: '机械设计制造及其自动化', degree: '本科', time: '2001/09 - 2005/07' }
    ],
    workHistory: [
      { company: '上汽大众', time: '2005-08 ~ 至今', position: 'PMIF部门经理' }
    ]
  },
  'm2': {
    id: 'm2',
    name: '徐炯',
    enName: 'Xu Jiong',
    dept: 'PMIF-5部门',
    position: 'PMIF-5经理',
    email: 'jiong.xu@volkswagen.com.cn',
    phone: '13811110002',
    location: '上海总部-安亭',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150',
    education: [
      { school: '同济大学', major: '车辆工程', degree: '硕士', time: '2005/09 - 2008/03' }
    ],
    workHistory: [
      { company: '上汽大众', time: '2008-04 ~ 至今', position: 'PMIF-5经理' }
    ]
  },
  'm3': {
    id: 'm3',
    name: '张骏',
    enName: 'Zhang Jun',
    dept: 'CIA-2部门',
    position: 'CIA-2经理',
    email: 'jun.zhang@volkswagen.com.cn',
    phone: '13811110003',
    location: '上海总部-安亭',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150',
    education: [
      { school: '上海大学', major: '计算机应用技术', degree: '硕士', time: '2006/09 - 2009/03' }
    ],
    workHistory: [
      { company: '上汽大众', time: '2009-04 ~ 至今', position: 'CIA-2经理' }
    ]
  },
  's1': {
    id: 's1',
    name: '何家俊',
    enName: 'He Jiajun',
    dept: 'CIA-2部门',
    position: 'CIA-2道一开发',
    email: 'jiajun.he@volkswagen.com.cn',
    phone: '13822220001',
    location: '上海总部-安亭',
    education: [
      { school: '东华大学', major: '软件工程', degree: '本科', time: '2016/09 - 2020/07' }
    ],
    workHistory: [
      { company: '上汽大众', time: '2020-07 ~ 至今', position: '软件工程师' }
    ]
  },
  's2': {
    id: 's2',
    name: '方兔斯基',
    enName: 'Fang Tusiji',
    dept: 'CIA-2部门',
    position: '项目经理',
    email: 'tusiji.fang@volkswagen.com.cn',
    phone: '13822220002',
    location: '上海总部-安亭',
    education: [
      { school: '南京大学', major: '信息管理与信息系统', degree: '本科', time: '2012/09 - 2016/07' }
    ],
    workHistory: [
      { company: '上汽大众', time: '2018-10 ~ 至今', position: '项目经理' }
    ]
  },
  's3': {
    id: 's3',
    name: '朱晨杰',
    enName: 'Zhu Chenjie',
    dept: 'CIA-2部门',
    position: 'CIA-2系统分析员',
    email: 'chenjie.zhu@volkswagen.com.cn',
    phone: '13822220003',
    location: '上海总部-安亭',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150',
    education: [
      { school: '上海交通大学', major: '信息安全', degree: '本科', time: '2013/09 - 2017/07' }
    ],
    workHistory: [
      { company: '上汽大众', time: '2017-07 ~ 至今', position: '系统分析员' }
    ]
  },
  's4': {
    id: 's4',
    name: '梁敏琪',
    enName: 'Liang Minqi',
    dept: 'CIA-2部门',
    position: 'CIA-2道一开发',
    email: 'minqi.liang@volkswagen.com.cn',
    phone: '13822220004',
    location: '上海总部-安亭',
    education: [
      { school: '西南交通大学', major: '计算机科学与技术', degree: '本科', time: '2017/09 - 2021/07' }
    ],
    workHistory: [
      { company: '上汽大众', time: '2021-07 ~ 至今', position: '道一开发人员' }
    ]
  },
  's5': {
    id: 's5',
    name: '沈文君',
    enName: 'Shen Wenjun',
    dept: 'CIA-2部门',
    position: 'CIA-2系统分析员',
    email: 'wenjun.shen@volkswagen.com.cn',
    phone: '13822220005',
    location: '上海总部-安亭',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
    education: [
      { school: '同济大学', major: '软件工程', degree: '本科', time: '2011/09 - 2015/07' }
    ],
    workHistory: [
      { company: '上汽大众', time: '2015-07 ~ 至今', position: '系统分析员' }
    ]
  },
  's6': {
    id: 's6',
    name: '沈燕华',
    enName: 'Shen Yanhua',
    dept: 'CIA-2部门',
    position: 'CIA-2系统分析员',
    email: 'yanhua.shen@volkswagen.com.cn',
    phone: '13822220006',
    location: '上海总部-安亭',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150',
    education: [
      { school: '华东师范大学', major: '计算机科学', degree: '硕士', time: '2012/09 - 2015/07' }
    ],
    workHistory: [
      { company: '上汽大众', time: '2015-07 ~ 至今', position: '系统分析员' }
    ]
  }
};
