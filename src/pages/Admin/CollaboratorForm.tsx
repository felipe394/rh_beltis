import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
    Bell, ChevronDown, X, LogOut, LayoutDashboard,
    Users, Briefcase, FileText, Settings, Box, PieChart,
    RefreshCw, Link, Clipboard as ClipboardIcon, Palmtree, CreditCard,
    Ban, ShieldX, UserCircle, Save, ChevronRight, Database,
    ArrowLeft
} from 'lucide-react';
import { IonContent, IonPage } from '@ionic/react';
import { useAuth } from '../../contexts/AuthContext';
import logoBeltis from '../../assets/logo_beltis.png';
import '../Home.css';

const CollaboratorForm: React.FC = () => {
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const { user, logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const isEdit = !!id;

    const actionButtons = [
        { icon: <RefreshCw size={18} />, label: 'Recuperar senha', color: 'bg-slate-600' },
        { icon: <Database size={18} />, label: 'Integração', color: 'bg-emerald-600' },
        { icon: <Link size={18} />, label: 'Contrato', color: 'bg-blue-600' },
        { icon: <Palmtree size={18} />, label: 'Férias', color: 'bg-slate-500' },
        { icon: <CreditCard size={18} />, label: 'Pagamento', color: 'bg-rose-500' },
        { icon: <Ban size={18} />, label: 'Pular onboarding', color: 'bg-rose-600' },
        { icon: <ShieldX size={18} />, label: 'Encerrar onboarding', color: 'bg-blue-600' },
        { icon: <UserCircle size={18} />, label: 'Encerrar contrato', color: 'bg-rose-500' },
        { icon: <ClipboardIcon size={18} />, label: 'Anotações', color: 'bg-cyan-500' },
    ];

    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/home' },
        { icon: <Briefcase size={20} />, label: 'Backoffice', path: '/dashboard/users' },
        { icon: <Users size={20} />, label: 'Colaboradores', path: '/dashboard/collaborators', active: true },
        { icon: <FileText size={20} />, label: 'Documentos', path: '#' },
        { icon: <Box size={20} />, label: 'Inventário', path: '#' },
        { icon: <PieChart size={20} />, label: 'Relatórios', path: '#' },
        { icon: <Settings size={20} />, label: 'Configurações', path: '#' },
    ];

    return (
        <IonPage className="dashboard-container">
            {/* Simple White Header */}
            <header className="admin-header-white">
                <div className="admin-header-left">
                    <button onClick={() => history.push('/dashboard/collaborators')} className="back-button-circle">
                        <ArrowLeft size={24} />
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={logoBeltis} alt="Beltis" style={{ height: '32px', width: 'auto' }} />
                        <h1 className="admin-title-text">
                            {id ? 'Editar Colaborador' : 'Novo Colaborador'}
                        </h1>
                    </div>
                </div>

                <div className="admin-header-right">
                    <div className="admin-user-info">
                        <div className="admin-user-text hidden md:block">
                            <p className="admin-user-name">{user?.name || 'Admin'}</p>
                            <p className="admin-user-role">Administrador</p>
                        </div>
                        <div className="admin-user-avatar">
                            {user?.name?.charAt(0) || 'A'}
                        </div>
                    </div>
                </div>
            </header>

            <main className="admin-main">
                <IonContent>
                    <div className="content-wrapper">
                        {/* Breadcrumbs & Title */}
                        <div className="admin-section-header">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <h1 className="admin-page-title">
                                    {isEdit ? 'Editar colaborador' : 'Novo Colaborador'}
                                </h1>
                                {isEdit && (
                                    <span style={{
                                        backgroundColor: '#059669',
                                        color: '#ffffff',
                                        padding: '4px 16px',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        fontWeight: 700
                                    }}>Ativo</span>
                                )}
                            </div>
                            <div className="admin-breadcrumb">
                                <span className="breadcrumb-item" onClick={() => history.push('/home')}>Dashboard</span>
                                <span>/</span>
                                <span className="breadcrumb-item" onClick={() => history.push('/dashboard/collaborators')}>Colaboradores</span>
                                <span>/</span>
                                <span className="breadcrumb-active">{isEdit ? 'Editar colaborador' : 'Novo'}</span>
                            </div>
                        </div>

                        {/* Action Buttons Section */}
                        <div style={{ backgroundColor: '#f8fafc', borderRadius: '24px', padding: '24px', marginBottom: '32px', border: '1px solid #f1f5f9' }}>
                            <label className="admin-label">Ações disponíveis</label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {actionButtons.map((btn, idx) => (
                                    <button key={idx} style={{
                                        backgroundColor: btn.color.replace('bg-', '#').replace('slate-600', '475569').replace('emerald-600', '059669').replace('blue-600', '2563eb').replace('slate-500', '64748b').replace('rose-500', 'f43f5e').replace('rose-600', 'e11d48').replace('cyan-500', '06b6d4'),
                                        color: '#ffffff',
                                        padding: '8px 16px',
                                        borderRadius: '10px',
                                        fontSize: '12px',
                                        fontWeight: 700,
                                        border: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        cursor: 'pointer'
                                    }}>
                                        {btn.icon}
                                        {btn.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Main Form Section */}
                        <div style={{ marginBottom: '32px' }}>
                            <button className="admin-button-primary">
                                <Save size={20} />
                                {isEdit ? 'Atualizar dados' : 'Salvar Colaborador'}
                            </button>
                        </div>

                        <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
                            <div style={{ backgroundColor: '#eff6ff', padding: '16px 32px', borderBottom: '1px solid #dbeafe', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '14px', fontWeight: 800, color: '#1e40af' }}>Dados do Colaborador</span>
                                <ChevronDown size={18} style={{ color: '#1e40af' }} />
                            </div>

                            <div style={{ padding: '40px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
                                    {/* Name & CPF (Special spanning) */}
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <label className="admin-label">Nome: (*)</label>
                                        <input type="text" defaultValue="FELIPE PEREIRA DE SOUSA" className="admin-input" />
                                    </div>
                                    <div>
                                        <label className="admin-label">CPF: (*) (somente números)</label>
                                        <input type="text" defaultValue="33333333333" className="admin-input" />
                                    </div>

                                    {/* Row 2 */}
                                    <div>
                                        <label className="admin-label">Tipo: (*)</label>
                                        <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 600, color: '#475569' }}>
                                                <input type="radio" name="tipo" defaultChecked /> Pessoa física
                                            </label>
                                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 600, color: '#475569' }}>
                                                <input type="radio" name="tipo" /> Pessoa jurídica
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="admin-label">Empresa: (*)</label>
                                        <select className="admin-input" style={{ appearance: 'none' }}>
                                            <option>Beltis</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="admin-label">Unidade: (*)</label>
                                        <select className="admin-input" style={{ appearance: 'none' }}>
                                            <option>Beltis</option>
                                        </select>
                                    </div>

                                    {/* Row 3 */}
                                    <div>
                                        <label className="admin-label">Data nasc.: (*)</label>
                                        <input type="text" defaultValue="01/03/2002" className="admin-input" />
                                    </div>
                                    <div>
                                        <label className="admin-label">Cargo: (*)</label>
                                        <input type="text" defaultValue="ANALISTA DE SISTEMAS" className="admin-input" />
                                    </div>
                                    <div>
                                        <label className="admin-label">E-mail: (*)</label>
                                        <input type="email" defaultValue="felipiinhosousaa@gmail.com" className="admin-input" />
                                    </div>

                                    {/* Row 4 */}
                                    <div>
                                        <label className="admin-label">País: (*)</label>
                                        <input type="text" defaultValue="Brasil (+55)" className="admin-input" />
                                    </div>
                                    <div>
                                        <label className="admin-label">Telefone: (*)</label>
                                        <input type="text" defaultValue="11980211895" className="admin-input" />
                                    </div>
                                    <div>
                                        <label className="admin-label">Salário:</label>
                                        <input type="text" className="admin-input" />
                                    </div>
                                </div>

                                <div style={{ marginTop: '40px', paddingTop: '40px', borderTop: '1px solid #f1f5f9', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
                                    <div>
                                        <span className="admin-label" style={{ marginBottom: '4px' }}>Data de Admissão:</span>
                                        <p style={{ fontSize: '15px', fontWeight: 700, color: '#334155', margin: 0 }}>18/02/2026</p>
                                    </div>
                                    <div>
                                        <span className="admin-label" style={{ marginBottom: '4px' }}>Criado em:</span>
                                        <p style={{ fontSize: '15px', fontWeight: 700, color: '#334155', margin: 0 }}>18/02/2026 14:51:12</p>
                                    </div>
                                    <div>
                                        <span className="admin-label" style={{ marginBottom: '4px' }}>Criado por:</span>
                                        <p style={{ fontSize: '15px', fontWeight: 700, color: '#334155', margin: 0 }}>desenvolvimento@beltis.com.br</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </IonContent>
            </main>
        </IonPage >
    );
};

export default CollaboratorForm;
