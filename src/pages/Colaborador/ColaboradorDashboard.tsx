import { useState } from 'react';
import {
    Menu,
    Bell,
    User,
    FileText,
    MessageSquare,
    Gift,
    Home,
    X,
    LogOut,
    CalendarDays,
    ClipboardList,
    Wallet,
} from 'lucide-react';
import logoBeltis from '../../assets/logo_beltis.png';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

interface CardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
}

function FeatureCard({ icon, title, description, color }: CardProps) {
    return (
        <button className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 text-left w-full">
            <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: color }}
            >
                <div className="text-white">{icon}</div>
            </div>
            <h3 className="text-gray-800 font-semibold mb-1">{title}</h3>
            <p className="text-gray-500 text-sm">{description}</p>
        </button>
    );
}

export function ColaboradorDashboard() {
    const { user, logout } = useAuth();
    const history = useHistory();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('Início');

    const handleLogout = () => {
        logout();
        history.push('/login');
    };

    const menuItems = [
        { icon: <Home size={20} />, label: 'Início', section: 'Início' },
        { icon: <FileText size={20} />, label: 'Meus Documentos', section: 'Documentos' },
        { icon: <CalendarDays size={20} />, label: 'Férias e Ausências', section: 'Férias' },
        { icon: <Wallet size={20} />, label: 'Benefícios', section: 'Benefícios' },
        { icon: <MessageSquare size={20} />, label: 'Informativos', section: 'Informativos' },
    ];

    const features: CardProps[] = [
        {
            icon: <FileText size={22} />,
            title: 'Meus Documentos',
            description: 'Acesse seus holerites, contratos e outros documentos',
            color: '#3B82F6',
        },
        {
            icon: <CalendarDays size={22} />,
            title: 'Férias e Ausências',
            description: 'Solicite férias e acompanhe aprovações',
            color: '#10B981',
        },
        {
            icon: <Wallet size={22} />,
            title: 'Benefícios',
            description: 'Visualize e gerencie seus benefícios',
            color: '#F59E0B',
        },
        {
            icon: <ClipboardList size={22} />,
            title: 'Minhas Tarefas',
            description: 'Acompanhe atividades e pendências',
            color: '#8B5CF6',
        },
        {
            icon: <MessageSquare size={22} />,
            title: 'Informativos',
            description: 'Notícias e comunicados da empresa',
            color: '#06B6D4',
        },
        {
            icon: <Gift size={22} />,
            title: 'Benefícios Especiais',
            description: 'Descontos e vantagens exclusivas',
            color: '#EC4899',
        },
    ];

    const initials = user?.name
        ? user.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
        : 'CO';

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
                <div className="flex items-center justify-between px-4 lg:px-6 py-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <Menu size={24} className="text-gray-700" />
                        </button>
                        <img src={logoBeltis} alt="Beltis" className="h-8 w-auto" style={{ filter: 'none' }} />
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Bell size={22} className="text-gray-700" />
                        </button>
                        <div className="flex items-center gap-2 p-2 rounded-lg">
                            <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">{initials}</span>
                            </div>
                            <span className="hidden sm:inline text-gray-700 font-medium text-sm">
                                {user?.name || 'Colaborador'}
                            </span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500"
                            title="Sair"
                        >
                            <LogOut size={20} />
                            <span className="hidden sm:inline text-sm font-medium">Sair</span>
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside
                    className={`fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 transition-transform duration-300 z-40 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                        } w-64 pt-20 lg:pt-4`}
                >
                    <div className="flex lg:hidden items-center justify-between px-4 py-4 border-b border-gray-200">
                        <img src={logoBeltis} alt="Beltis" className="h-7 w-auto" style={{ filter: 'none' }} />
                        <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                            <X size={20} />
                        </button>
                    </div>

                    <nav className="p-4 space-y-1">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
                            Menu
                        </p>
                        {menuItems.map((item) => (
                            <button
                                key={item.section}
                                onClick={() => {
                                    setActiveSection(item.section);
                                    setSidebarOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeSection === item.section
                                        ? 'bg-teal-50 text-teal-600'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {item.icon}
                                <span className="font-medium">{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </aside>

                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Main */}
                <main className="flex-1 p-4 lg:p-8 min-h-screen">
                    {/* Welcome Banner */}
                    <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-6 lg:p-8 text-white mb-8">
                        <p className="text-teal-100 text-sm mb-1">Bem-vindo de volta,</p>
                        <h1 className="text-2xl lg:text-3xl font-bold mb-2">{user?.name || 'Colaborador'} 👋</h1>
                        <p className="text-teal-100">Confira suas informações e serviços disponíveis abaixo.</p>
                    </div>

                    {/* Quick Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                            <p className="text-gray-500 text-sm">Empresa</p>
                            <p className="font-semibold text-gray-800 mt-1">Beltis Tecnologia</p>
                        </div>
                        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                            <p className="text-gray-500 text-sm">Cargo</p>
                            <p className="font-semibold text-gray-800 mt-1">Colaborador</p>
                        </div>
                        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                            <p className="text-gray-500 text-sm">Férias disponíveis</p>
                            <p className="font-semibold text-teal-600 mt-1">30 dias</p>
                        </div>
                    </div>

                    {/* Features */}
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Serviços disponíveis</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                        {features.map((card, i) => (
                            <FeatureCard key={i} {...card} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default ColaboradorDashboard;
