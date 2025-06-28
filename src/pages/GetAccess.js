import React from 'react';
import { RoleAssignment } from '../components/RoleAssignment';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { LogIn, ArrowRight } from 'lucide-react';
export function GetAccess() {
    const { user } = useAuth();
    return (React.createElement("div", { className: "min-h-screen bg-gray-50 py-12" },
        React.createElement("div", { className: "max-w-2xl mx-auto px-4 sm:px-6 lg:px-8" },
            React.createElement("div", { className: "text-center mb-8" },
                React.createElement("h1", { className: "text-3xl font-bold text-gray-900 mb-4" }, "Access MediBlog CMS"),
                React.createElement("p", { className: "text-gray-600" }, "Get the right permissions to start creating and managing medical content")),
            !user ? (React.createElement("div", { className: "bg-white rounded-lg shadow-lg p-8 text-center" },
                React.createElement(LogIn, { className: "h-16 w-16 text-blue-600 mx-auto mb-4" }),
                React.createElement("h2", { className: "text-xl font-semibold text-gray-900 mb-4" }, "Login Required"),
                React.createElement("p", { className: "text-gray-600 mb-6" }, "You need to login or create an account to access the CMS"),
                React.createElement(Link, { to: "/login", className: "inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors" },
                    "Go to Login",
                    React.createElement(ArrowRight, { className: "ml-2 h-5 w-5" })))) : (React.createElement(RoleAssignment, null)),
            React.createElement("div", { className: "mt-8 text-center" },
                React.createElement(Link, { to: "/", className: "text-blue-600 hover:text-blue-800 transition-colors" }, "\u2190 Back to Home")))));
}
