import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
} from '@ionic/react';
import {
  Bell,
  User,
  Users,
  Briefcase,
  FileText,
  UsersRound,
  MessageSquare,
  Building2,
  Gift,
  Package,
  Settings,
  BarChart3,
  Upload,
  Home as HomeIcon,
  LayoutDashboard,
  ShieldCheck,
  Wrench,
  Megaphone,
  Key,
  Menu,
  X,
  Search,
  ChevronDown,
  LogOut,
  Calendar,
  Layers,
  Repeat,
  HelpCircle,
  GraduationCap,
  Wallet,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import logoBeltis from '../assets/logo_beltis.png';
import supportChar from '../assets/support_character.png';
import './Home.css';

const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const history = useHistory();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleMenu = (name: string) => {
    setExpandedMenus(prev =>
      prev.includes(name) ? prev.filter(m => m !== name) : [...prev, name]
    );
  };

  const stats = [
    { label: 'Usuários Ativos', value: '1.234', trend: '+12%', trendUp: true },
    { label: 'Colaboradores', value: '856', trend: '+8%', trendUp: true },
    { label: 'Documentos', value: '3.421', trend: '+23%', trendUp: true },
    { label: 'Empresas', value: '45', trend: '-2%', trendUp: false },
  ];

  const adminFeatures = [
    { name: 'Backoffice', icon: <User size={28} />, color: '#eff6ff', iconColor: '#2563eb', path: '/dashboard/users' },
    { name: 'Gerenciar Colaboradores', icon: <Briefcase size={28} />, color: '#f5f3ff', iconColor: '#7c3aed', path: '/dashboard/collaborators' },
    { name: 'Resumo e Relatórios', icon: <BarChart3 size={28} />, color: '#f0fdf4', iconColor: '#059669', path: '#' },
    { name: 'Grupos de Trabalho', icon: <Users size={28} />, color: '#fff7ed', iconColor: '#ea580c', path: '#' },
    { name: 'Gerenciar Documentos', icon: <FileText size={28} />, color: '#fef2f2', iconColor: '#dc2626', path: '#' },
    { name: 'Informativos', icon: <Megaphone size={28} />, color: '#ecfeff', iconColor: '#0891b2', path: '#' },
    { name: 'Empresas', icon: <Building2 size={28} />, color: '#fdf2f8', iconColor: '#db2777', path: '#' },
    { name: 'Tipos de Benefícios', icon: <Gift size={28} />, color: '#f0fdfa', iconColor: '#0d9488', path: '#' },
    { name: 'Inventários', icon: <Package size={28} />, color: '#fff7ed', iconColor: '#ca8a04', path: '#' },
  ];

  const collaboratorFeatures = [
    { name: 'Informativos', icon: <Megaphone size={28} />, color: '#ecfeff', iconColor: '#0891b2', path: '#' },
    { name: 'Meus Documentos', icon: <FileText size={28} />, color: '#fef2f2', iconColor: '#dc2626', path: '#' },
    { name: 'Ajuda e Suporte', icon: <HelpCircle size={28} />, color: '#f0f9ff', iconColor: '#0ea5e9', path: '#' },
  ];

  const currentFeatures = user?.role === 'admin' ? adminFeatures : collaboratorFeatures;

  const bottomNavItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={24} />, active: true },
    { name: 'Backoffice', icon: <ShieldCheck size={24} />, hidden: user?.role !== 'admin' },
    { name: 'Configurações', icon: <Settings size={24} />, hidden: user?.role !== 'admin' },
  ].filter(item => !item.hidden);

  interface SubItem {
    name: string;
    path: string;
  }

  interface MenuItem {
    name: string;
    icon: React.ReactNode;
    path?: string;
    subItems?: SubItem[];
    active?: boolean;
  }

  interface MenuGroup {
    header: string;
    items: MenuItem[];
  }

  const sidebarMenu: MenuGroup[] = [
    {
      header: 'CORE',
      items: [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/home', active: true },
      ]
    },
    {
      header: 'REGISTROS',
      items: [
        { name: 'Backoffice', icon: <ShieldCheck size={20} />, path: '/dashboard/users' },
        {
          name: 'Gerenciar',
          icon: <Briefcase size={20} />,
          subItems: [
            { name: 'Colaboradores', path: '/dashboard/collaborators' },
            { name: 'Intermitentes', path: '#' },
            { name: 'Documentos', path: '#' },
          ]
        },
        { name: 'Informativos', icon: <Megaphone size={20} />, path: '#' },
        {
          name: 'Configurações',
          icon: <Settings size={20} />,
          subItems: [
            { name: 'Bancos', path: '#' },
            { name: 'Documentos Padrão', path: '#' },
            { name: 'Empresas', path: '#' },
            { name: 'Grupos de Trabalho', path: '#' },
            { name: 'Tipos de benefícios', path: '#' },
          ]
        },
        {
          name: 'Inventários',
          icon: <Package size={20} />,
          subItems: [
            { name: 'Cadastro de Equipamentos', path: '#' },
            { name: 'Inventários', path: '#' },
          ]
        },
        {
          name: 'Relatórios',
          icon: <BarChart3 size={20} />,
          subItems: [
            { name: 'Colaboradores', path: '#' },
            { name: 'Financeiro', path: '#' },
            { name: 'Resumo', path: '#' },
            { name: 'Inventários', path: '#' },
          ]
        },
        {
          name: 'Importação de dados',
          icon: <Upload size={20} />,
          subItems: [
            { name: 'Dados dos benefícios', path: '#' },
          ]
        },
        {
          name: 'Testes de Notificações',
          icon: <Bell size={20} />,
          subItems: [
            { name: 'Notificações', path: '#' },
          ]
        },
      ]
    }
  ];

  return (
    <IonPage className="dashboard-container">
      {/* Sidebar Overlay for mobile */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <img src={logoBeltis} alt="Beltis" style={{ height: '108px', width: 'auto' }} />
          <button className="sidebar-close" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-menu">
          {sidebarMenu.map((group, gIdx) => (
            <div key={gIdx} className="menu-group">
              <div className="menu-group-title">{group.header}</div>
              {group.items.map((item, iIdx) => (
                <div key={iIdx} className="menu-item-wrapper">
                  <div
                    className={`menu-item ${item.active ? 'active' : ''} ${expandedMenus.includes(item.name) ? 'expanded' : ''}`}
                    onClick={() => {
                      if (item.subItems) {
                        toggleMenu(item.name);
                      } else if (item.path) {
                        history.push(item.path);
                        setIsSidebarOpen(false);
                      }
                    }}
                  >
                    <div className="menu-item-content">
                      {item.icon}
                      <span>{item.name}</span>
                    </div>
                    {item.subItems && <ChevronDown size={14} className="menu-item-arrow" />}
                  </div>

                  {item.subItems && (
                    <div className="sub-menu">
                      {item.subItems.map((sub, sIdx) => (
                        <div
                          key={sIdx}
                          className="sub-menu-item"
                          onClick={() => {
                            if (sub.path !== '#') {
                              history.push(sub.path);
                              setIsSidebarOpen(false);
                            }
                          }}
                        >
                          {sub.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}

          <div className="mt-4 pt-4 border-t border-white/10">
            <button
              onClick={() => logout()}
              className="menu-item text-white/60 hover:text-white w-full"
            >
              <div className="menu-item-content">
                <LogOut size={20} />
                <span className="text-sm font-medium">Sair do Sistema</span>
              </div>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-area">
        {/* Header (Blue Variant) */}
        <header className="dashboard-header beltis-header-blue">
          <div className="header-left flex items-center">
            <div
              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}
            >
              <img
                src={logoBeltis}
                alt="Beltis"
                style={{ height: '144px', width: 'auto', display: 'block', objectFit: 'contain' }}
                className="brightness-0 invert"
              />
              <span className="beltis-rh-text" style={{ fontSize: '32px', fontWeight: 500, color: '#ffffff', letterSpacing: '-0.05em', marginLeft: '-40px' }}>
                RH
              </span>
            </div>
          </div>

          <div className="header-right">
            <div className="header-icons-row flex items-center gap-6 mr-4">
              <div className="notification-btn-white">
                <Bell size={24} />
                <div className="notification-dot"></div>
              </div>
            </div>

            {/* Toggle Side Menu Button integrated into Profile */}
            <div className="user-profile-white" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <div className="user-avatar-white">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <span className="user-name-white hidden md:block">{user?.name || 'Admin'}</span>
              <ChevronDown size={14} className="text-white/70 hidden md:block" />
            </div>
          </div>
        </header>

        <IonContent>
          <div className="content-wrapper">
            {/* Stats Cards Section - Only for Admin */}
            {user?.role === 'admin' && (
              <div className="stats-grid mb-8">
                {stats.map((stat, idx) => (
                  <div key={idx} className="stat-card">
                    <div className="stat-label">{stat.label}</div>
                    <div className="stat-value-row">
                      <div className="stat-value">{stat.value}</div>
                      <div className={`stat-trend ${stat.trendUp ? 'trend-up' : 'trend-down'}`}>
                        {stat.trend}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="section-header mb-8">
              <h1 className="text-2xl font-extrabold text-slate-800">
                {user?.role === 'admin' ? 'Painel Administrativo' : 'Portal do Colaborador'}
              </h1>
              <p className="text-slate-500">
                {user?.role === 'admin'
                  ? 'Gerencie todos os recursos da plataforma Beltis'
                  : 'Acesse suas informações e ferramentas de RH'}
              </p>
            </div>

            {/* Features Grid */}
            <div className="high-fidelity-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="feature-card-v2"
                  onClick={() => {
                    if (feature.path !== '#') history.push(feature.path);
                  }}
                >
                  <div
                    className="feature-icon-v2"
                    style={{ backgroundColor: feature.color, color: feature.iconColor }}
                  >
                    {feature.icon}
                  </div>
                  <div className="feature-name-v2">{feature.name}</div>
                </div>
              ))}
            </div>

            {/* Help Banner (Blue Beltis) */}
            <div className="help-banner-v2 beltis-blue-banner mt-12 mb-20">
              <div className="help-banner-content text-left pl-8">
                <HelpCircle size={32} className="mb-4 text-white/50" />
                <h2 className="help-title-v2 text-left">Precisa de ajuda com o RH Digital?</h2>
                <button
                  className="help-whatsapp-btn-blue"
                  onClick={() => window.open('https://wa.me/5500000000000', '_blank')}
                >
                  Falar com nosso Suporte Técnico
                </button>
              </div>
              <div className="help-image-container-v2 hidden lg:block">
                <img src={supportChar} alt="Support" className="support-character-img-v2" />
              </div>
            </div>
          </div>
        </IonContent>

        {/* Capsule Bottom Navigation (Blue Beltis Style) */}
        <div className="bottom-nav-container">
          <div className="capsule-nav beltis-dark-blue">
            {bottomNavItems.map((item, idx) => (
              <div key={idx} className={`nav-item ${item.active ? 'active' : ''}`}>
                <div className="nav-icon">{item.icon}</div>
                <span className="nav-label">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </IonPage>
  );
};

export default Home;