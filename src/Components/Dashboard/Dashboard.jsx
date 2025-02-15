import { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Calender from '../Calender/Calender';
import { TaskProvider } from '../../GlobalVariables/TaskContext';
import Tasks from '../Tasks/Tasks';
import Profile from '../Profile/Profile';
import TaskTemplate from '../../GlobalVariables/TaskTemplate'

const Dashboard = () => {
    const [cookies] = useCookies(['auth_token']);
    const [isLoading, setIsLoading] = useState(true);
    const [activeComponent, setActiveComponent] = useState('Tasks');
    const navigate = useNavigate();

    useEffect(() => {
        if (!cookies.auth_token) {
            navigate('/login');
        } else {
            setIsLoading(false);
        }
    }, [cookies, navigate]);

    const renderComponent = () => {
        if (activeComponent === "Tasks" || activeComponent === "Calendar"|| activeComponent === "Template") {
            return (
                <TaskProvider>
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        {activeComponent === "Tasks" && <Tasks />}
                        {activeComponent === "Calendar" && <Calender />}
                        {activeComponent === "Template" && <TaskTemplate/>}
                    </div>
                </TaskProvider>
            );
        }
       if (activeComponent === "Profile") {
            return (
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <Profile/>
                </div>
            );
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#db4035]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <Sidebar
                setActiveComponent={setActiveComponent}
                activeComponent={activeComponent}
            />
            <main className="ml-64 pt-16">
                <div className="p-6 max-w-7xl mx-auto">
                    {renderComponent()}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;