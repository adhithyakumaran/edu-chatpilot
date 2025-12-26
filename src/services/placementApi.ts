import axios from 'axios';

// export const API_URL = 'https://chatpilot-server-main.onrender.com/api';
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const getDashboardData = async (userId: string) => {
    try {
        const response = await axios.get(`${API_URL}/dashboard`, {
            params: { userId }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        return null;
    }
};

export const saveUserProfile = async (userData: any) => {
    try {
        const response = await axios.post(`${API_URL}/user/profile`, userData);
        return response.data;
    } catch (error) {
        console.error('Error saving user profile:', error);
        throw error;
    }
};

export const completeUnit = async (unitId: string, type: string, score: number) => {
    try {
        const response = await axios.post(`${API_URL}/actions/complete-unit`, { unitId, type, score });
        return response.data;
    } catch (error) {
        console.error('Error completing unit:', error);
        throw error;
    }
};

export const submitProject = async (projectId: string, repoUrl: string) => {
    try {
        const response = await axios.post(`${API_URL}/actions/submit-project`, { projectId, repoUrl });
        return response.data;
    } catch (error) {
        console.error('Error submitting project:', error);
        throw error;
    }
};

// Course APIs
export const getCourses = async () => {
    try {
        const response = await axios.get(`${API_URL}/courses`);
        return response.data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        return [];
    }
};

export const createCourse = async (courseData: any) => {
    try {
        const response = await axios.post(`${API_URL}/courses`, courseData);
        return response.data;
    } catch (error) {
        console.error('Error creating course:', error);
        throw error;
    }
};

// Notification APIs
export const getNotifications = async () => {
    try {
        const response = await axios.get(`${API_URL}/notifications`);
        return response.data;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return [];
    }
};

export const sendNotification = async (notificationData: any) => {
    try {
        const response = await axios.post(`${API_URL}/notifications`, notificationData);
        return response.data;
    } catch (error) {
        console.error('Error sending notification:', error);
        throw error;
    }
};
