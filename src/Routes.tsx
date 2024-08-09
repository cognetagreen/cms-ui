import { RouteObject, Navigate } from 'react-router'
import Login from './components/Auth/Login'
import Home from './pages/Home'
import AuthGuard from './Services/AuthGuard'
import ForgotPassword from './components/Auth/ForgotPassword'
import GridDashboard from './Dashboards/GridDashboard'
import Layout from './components/Layouts/Layout'
import MainDashboard from './Dashboards/MainDashboard'
import PlantViewDashboard from './Dashboards/PlantViewDashboard'

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
    }
]

export default Routes