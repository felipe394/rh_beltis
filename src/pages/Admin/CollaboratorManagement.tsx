import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Bell, ChevronDown, X, LogOut, LayoutDashboard,
    Users, Briefcase, FileText, Settings, Box, PieChart,
    Search, Plus, Eye, Edit2, Trash2, Power, ArrowLeft
} from 'lucide-react';
import { IonContent, IonPage } from '@ionic/react';
import { useAuth } from '../../contexts/AuthContext';
import logoBeltis from '../../assets/logo_beltis.png';
import '../Home.css';

const CollaboratorManagement: React.FC = () => {
    const history = useHistory();
    const { user, logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Example collaborators based on the user's image
    const collaborators = [
        { id: 1, name: 'FELIPE PEREIRA DE SOUSA', email: 'felipiinhosousaa@gmail.com', phone: '(11) 98021-1895', status: 'Ativo' },
        { id: 2, name: 'BEATRIZ ALBUQUERQUE', email: 'beatriz.albuquerque@beltis.com.br', phone: '(11) 2026-5555', status: 'Ativo', onboarding: true },
        { id: 3, name: 'GUSTAVO MARCOS VINICIUS CAIO VIANA', email: 'gustavo_viana@seal.com.br', phone: '(86) 78756-6786', status: 'Ativo', onboarding: true },
        { id: 4, name: 'LUIZ FERNANDO SANTANA', email: 'santana.fernando@gmail.com', phone: '(11) 95985-0701', status: 'Ativo', onboarding: true },
        { id: 5, name: 'JOÃO RAUL LORENZO DA SILVA', email: 'joao.dasilva@marithimaconstrutora.com.br', phone: '(11) 11111-1111', status: 'Inativo', shutdown: '11/02/2026' },
        { id: 6, name: 'VERA NATÁLIA NATÁLIA DE PAULA', email: 'vera-depaula80@hotmmail.com', phone: '(11) 95698-8555', status: 'Ativo', onboarding: true },
        { id: 7, name: 'MARCOS AURÉLIO SILVA', email: 'marcos.s@beltis.com.br', phone: '(11) 97777-6666', status: 'Ativo' },
        { id: 8, name: 'JULIANA MARTINS', email: 'jule_martins@gmail.com', phone: '(11) 98888-5555', status: 'Ativo' },
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
                    <button onClick={() => history.push('/home')} className="back-button-circle">
                        <ArrowLeft size={24} />
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={logoBeltis} alt="Beltis" style={{ height: '32px', width: 'auto' }} />
                        <h1 className="admin-title-text">Colaboradores</h1>
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
                        {/* Title Section */}
                        <div className="admin-section-header">
                            <h1 className="admin-page-title">Colaboradores</h1>
                            <div className="admin-breadcrumb">
                                <span className="breadcrumb-item" onClick={() => history.push('/home')}>Dashboard</span>
                                <span>/</span>
                                <span className="breadcrumb-active">Colaboradores</span>
                            </div>
                        </div>

                        {/* Search & Filter Section */}
                        <div className="admin-card">
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label className="admin-label">Pesquisa:</label>
                                    <div style={{ position: 'relative' }}>
                                        <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={18} />
                                        <input
                                            type="text"
                                            placeholder="Nome / Documento / Email / Fone"
                                            className="admin-input"
                                            style={{ paddingLeft: '48px' }}
                                        />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label className="admin-label">Ativos / Inativos:</label>
                                    <select className="admin-input" style={{ appearance: 'none' }}>
                                        <option>ATIVOS</option>
                                        <option>INATIVOS</option>
                                        <option>TODOS</option>
                                    </select>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label className="admin-label">Empresa:</label>
                                    <select className="admin-input" style={{ appearance: 'none' }}>
                                        <option>(TODOS)</option>
                                        <option>Beltis</option>
                                        <option>Marithima</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{ marginTop: '24px' }}>
                                <button className="admin-button-secondary" style={{ padding: '14px 40px' }}>
                                    Filtrar
                                </button>
                            </div>
                        </div>

                        {/* List Section */}
                        <div className="admin-table-container">
                            <div style={{ padding: '24px', borderBottom: '1px solid #f8fafc' }}>
                                <button
                                    onClick={() => history.push('/dashboard/collaborators/new')}
                                    className="admin-button-primary"
                                >
                                    <Plus size={20} />
                                    Novo Colaborador
                                </button>
                            </div>

                            <div style={{ overflowX: 'auto' }}>
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Nome</th>
                                            <th>E-mail</th>
                                            <th>Telefone</th>
                                            <th style={{ textAlign: 'right' }}>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {collaborators.map(coll => (
                                            <tr key={coll.id}>
                                                <td>
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <span
                                                            style={{ fontWeight: 700, color: '#2563eb', cursor: 'pointer', textDecoration: 'underline' }}
                                                            onClick={() => history.push(`/dashboard/collaborators/edit/${coll.id}`)}
                                                        >
                                                            {coll.name}
                                                        </span>
                                                        {coll.shutdown && (
                                                            <span style={{ fontSize: '10px', color: '#d97706', fontWeight: 700, marginTop: '4px' }}>
                                                                Colaborador desligado em {coll.shutdown}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td>
                                                    <span style={{ color: '#64748b', fontWeight: 500 }}>{coll.email}</span>
                                                </td>
                                                <td>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                        <span style={{ color: '#64748b', fontWeight: 500 }}>{coll.phone}</span>
                                                        {coll.onboarding && (
                                                            <span className="badge-active" style={{ backgroundColor: '#ecfeff', color: '#0891b2', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                                <Eye size={10} />
                                                                ONBOARDING
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td style={{ textAlign: 'right' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                                                        <button
                                                            title={coll.status === 'Ativo' ? 'Inativar' : 'Ativar'}
                                                            className={`action-btn ${coll.status === 'Ativo' ? 'btn-status' : 'btn-delete'}`}
                                                            style={coll.status !== 'Ativo' ? { backgroundColor: '#f0fdf4', color: '#16a34a' } : {}}
                                                        >
                                                            <Power size={18} />
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

export default CollaboratorManagement;
