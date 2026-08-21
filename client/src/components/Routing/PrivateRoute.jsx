import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    const { userInfo } = useSelector((state) => state.auth);
    if (!userInfo) {
        return <Navigate to="/login" replace />;
    }
    
    // If an admin tries to access user private routes, redirect to admin dashboard
    if (userInfo.role === 'admin') {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
