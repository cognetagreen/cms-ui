import { RouteObject, Navigate } from 'react-router'
import Login from './components/Auth/Login'
import AuthGuard from './Services/AuthGuard'
import ForgotPassword from './components/Auth/ForgotPassword'
import GridDashboard from './Dashboards/GridDashboard'
import Layout from './components/Layouts/Layout'
import MainDashboard from './Dashboards/MainDashboard'
import PlantViewDashboard from './Dashboards/PlantViewDashboard'
import DGDashboard from './Dashboards/DGDashboard'
import BESS_OverviewDashboard from './Dashboards/BESS_OverviewDashboard'
import BESS_KPIDashboard from './Dashboards/BESS_KPIDashboard'
import BESS_HealthDashboard from './Dashboards/BESS_HealthDashboard'

const Routes : RouteObject[] = [
    {
        path : '/login',
        element : <Login />
    },
    {   
        index : true,
        path : '/',
        element : (
            <AuthGuard>
                <Navigate to="/portfolio" replace />
            </AuthGuard>
        )
    },
    {
        path: '/portfolio',
        element: (
            <AuthGuard>
                <Layout>
                <MainDashboard />
                </Layout>
            </AuthGuard>
        )
    },
    {
        path : '/forgotPassword',
        element : <ForgotPassword />
    },
    {
        path : '/grid',
        element : (
            <AuthGuard>
                <Layout>
                    <GridDashboard />
                </Layout>
            </AuthGuard>
        )
    },
    {
        path : '/plantview',
        element : (
            <AuthGuard>
                <Layout>
                    <PlantViewDashboard />
                </Layout>
            </AuthGuard>
        )
    },
    {
        path : '/dg',
        element : (
            <AuthGuard>
                <Layout>
                    <DGDashboard />
                </Layout>
            </AuthGuard>
        )
    },
    {
        path : '/bess/overview',
        element : (
            <AuthGuard>
                <Layout>
                    <BESS_OverviewDashboard />
                </Layout>
            </AuthGuard>
        )
    },
    {
        path : '/bess/kpi',
        element : (
            <AuthGuard>
                <Layout>
                    <BESS_KPIDashboard />
                </Layout>
            </AuthGuard>
        )
    },
    {
        path : '/bess/health',
        element : (
            <AuthGuard>
                <Layout>
                    <BESS_HealthDashboard />
                </Layout>
            </AuthGuard>
        )
    }
]

export default Routes