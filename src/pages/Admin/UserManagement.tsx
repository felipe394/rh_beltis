import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    ArrowLeft, UserPlus, Search, Edit2, Trash2,
    Bell, ChevronDown, Menu, X, LogOut, LayoutDashboard,
    Users, Briefcase, FileText, Settings, Database,
    PieChart, Box, Info
} from 'lucide-react';
import { IonContent, IonPage } from '@ionic/react';
import { useAuth } from '../../contexts/AuthContext';
import logoBeltis from '../../assets/logo_beltis.png';
import '../Home.css';

const UserManagement: React.FC = () => {
    const history = useHistory();
    const { user, logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const users = [
        { id: 1, name: 'Admin Teste', email: 'admin@teste.com', role: 'Admin', status: 'Ativo' },
        { id: 2, name: 'João Silva', email: 'joao.silva@beltis.com.br', role: 'Admin', status: 'Ativo' },
        { id: 3, name: 'Felipe Sousa', email: 'felipe@beltis.com.br', role: 'Admin', status: 'Inativo' },
        { id: 4, name: 'Maria Oliveira', email: 'maria.oliveira@beltis.com.br', role: 'Admin', status: 'Ativo' },
        { id: 5, name: 'Carlos Santos', email: 'carlos.santos@beltis.com.br', role: 'Admin', status: 'Ativo' },
        { id: 6, name: 'Ana Costa', email: 'ana.costa@beltis.com.br', role: 'Admin', status: 'Ativo' },
        { id: 7, name: 'Ricardo Melo', email: 'ricardo.melo@beltis.com.br', role: 'Admin', status: 'Inativo' },
    ];

    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/home' },
        { icon: <Briefcase size={20} />, label: 'Backoffice', path: '/dashboard/users', active: true },
        { icon: <Users size={20} />, label: 'Colaboradores', path: '/dashboard/collaborators' },
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
                    <button onClick={() => history.push('/home')} className="back-button-circle">
                        <ArrowLeft size={24} />
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={logoBeltis} alt="Beltis" style={{ height: '32px', width: 'auto' }} />
                        <h1 className="admin-title-text">Backoffice</h1>
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
                        <div className="admin-section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <div>
                                <h1 className="admin-page-title">Usuários do Backoffice</h1>
                                <p style={{ color: '#64748b', margin: 0 }}>Controle de acessos administrativos do sistema</p>
                            </div>
                            <button className="admin-button-primary">
                                <UserPlus size={20} />
                                Novo Admin
                            </button>
                        </div>

                        <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
                            <div style={{ padding: '24px', borderBottom: '1px solid #f8fafc', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
                                    <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={18} />
                                    <input
                                        type="text"
                                        placeholder="Pesquisar por nome ou e-mail..."
                                        className="admin-input"
                                        style={{ paddingLeft: '48px' }}
                                    />
                                </div>
                            </div>

                            <div style={{ overflowX: 'auto' }}>
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Nome do Usuário</th>
                                            <th>E-mail</th>
                                            <th>Perfil</th>
                                            <th>Status</th>
                                            <th style={{ textAlign: 'right' }}>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(u => (
                                            <tr key={u.id}>
                                                <td>
                                                    <span style={{ fontWeight: 700, color: '#1e293b' }}>{u.name}</span>
                                                </td>
                                                <td>
                                                    <span style={{ color: '#64748b', fontWeight: 500 }}>{u.email}</span>
                                                </td>
                                                <td>
                                                    <span className="badge-active" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
                                                        {u.role}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className={u.status === 'Ativo' ? 'badge-active' : 'badge-inactive'}>
                                                        {u.status}
                                                    </span>
                                                </td>
                                                <td style={{ textAlign: 'right' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                                                        <button title="Editar" className="action-btn btn-edit">
                                                            <Edit2 size={18} />
                                                        </button>
                                                        <button title="Excluir" className="action-btn btn-delete">
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </IonContent>
            </main>
        </IonPage>
    );
};

export default UserManagement;
