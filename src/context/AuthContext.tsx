import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import axios from 'axios';

// API base URL
const API_URL = 'http://localhost:5001/api';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
    refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Set up axios defaults
    axios.defaults.baseURL = API_URL;

    // Configure axios to send the token with every request
    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            axios.defaults.headers.common['x-auth-token'] = token;
        } else {
            delete axios.defaults.headers.common['x-auth-token'];
        }
    }, [isAuthenticated]);

    // Check for token and load user on mount
    useEffect(() => {
        const loadUser = async () => {
            setLoading(true);
            const token = localStorage.getItem('auth_token');
            
            if (!token) {
                setLoading(false);
                return;
            }
            
            try {
                axios.defaults.headers.common['x-auth-token'] = token;
                const res = await axios.get('/user');
                setUser(res.data);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Error loading user:', error);
                localStorage.removeItem('auth_token');
                delete axios.defaults.headers.common['x-auth-token'];
            } finally {
                setLoading(false);
            }
        };
        
        loadUser();
    }, []);

    // Function to refresh user data
    const refreshUserData = async () => {
        try {
            const res = await axios.get('/user');
            setUser(res.data);
            return res.data;
        } catch (error) {
            console.error('Error refreshing user data:', error);
            throw error;
        }
    };

    const register = async (username: string, email: string, password: string) => {
        try {
            const res = await axios.post(`${API_URL}/register`, { username, email, password });
            
            // Save token and set auth state
            localStorage.setItem('auth_token', res.data.token);
            setUser(res.data.user);
            setIsAuthenticated(true);
            
            return res.data;
        } catch (error: any) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const res = await axios.post(`${API_URL}/login`, { email, password });
            
            // Save token and set auth state
            localStorage.setItem('auth_token', res.data.token);
            setUser(res.data.user);
            setIsAuthenticated(true);
            
            return res.data;
        } catch (error: any) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const logout = () => {
        // Remove token from storage
        localStorage.removeItem('auth_token');
        delete axios.defaults.headers.common['x-auth-token'];
        
        // Reset state
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            isAuthenticated, 
            login, 
            register, 
            logout, 
            loading,
            refreshUserData 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 