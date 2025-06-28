import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUserRole } from '../hooks/useUserRole';
import { Stethoscope, LogIn, LogOut, User, LayoutDashboard, Key, Menu, X } from 'lucide-react';
export function Header() {
    const { user, signOut } = useAuth();
    const { canWrite, role } = useUserRole();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/');
        }
        catch (error) {
            console.error('Error signing out:', error);
        }
    };
    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };
    return (React.createElement("header", { className: "bg-white shadow-lg border-b-2 border-blue-100" },
        React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" },
            React.createElement("div", { className: "flex justify-between items-center h-16" },
                React.createElement("div", { className: "flex items-center space-x-3" },
                    React.createElement(Stethoscope, { className: "h-8 w-8 text-blue-600" }),
                    React.createElement(Link, { to: "/", className: "text-2xl font-bold text-blue-900 hover:text-blue-700 transition-colors" }, "MediBlog")),
                React.createElement("nav", { className: "hidden md:flex space-x-8" },
                    React.createElement(Link, { to: "/", className: "text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200" }, "Home"),
                    React.createElement(Link, { to: "/about", className: "text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200" }, "About"),
                    React.createElement(Link, { to: "/contact", className: "text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200" }, "Contact"),
                    canWrite ? (React.createElement(Link, { to: "/dashboard", className: "flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200" },
                        React.createElement(LayoutDashboard, { size: 18 }),
                        React.createElement("span", null, "Dashboard"))) : user ? (React.createElement(Link, { to: "/get-access", className: "flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200" },
                        React.createElement(Key, { size: 18 }),
                        React.createElement("span", null, "Get Access"))) : null),
                React.createElement("div", { className: "hidden md:flex items-center space-x-4" }, user ? (React.createElement("div", { className: "flex items-center space-x-4" },
                    React.createElement("div", { className: "flex items-center space-x-2 text-gray-700" },
                        React.createElement(User, { size: 18, className: "text-blue-600" }),
                        React.createElement("div", { className: "text-sm" },
                            React.createElement("div", { className: "font-medium" }, user.email),
                            role && (React.createElement("div", { className: "text-xs text-blue-600 capitalize" }, role)))),
                    React.createElement("button", { onClick: handleSignOut, className: "flex items-center space-x-2 bg-red-50 text-red-700 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors duration-200" },
                        React.createElement(LogOut, { size: 18 }),
                        React.createElement("span", null, "Sign Out")))) : (React.createElement(Link, { to: "/login", className: "flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200" },
                    React.createElement(LogIn, { size: 18 }),
                    React.createElement("span", null, "Login")))),
                React.createElement("div", { className: "md:hidden" },
                    React.createElement("button", { onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen), className: "text-gray-700 hover:text-blue-600 transition-colors" }, isMobileMenuOpen ? React.createElement(X, { size: 24 }) : React.createElement(Menu, { size: 24 })))),
            isMobileMenuOpen && (React.createElement("div", { className: "md:hidden border-t border-gray-200 py-4" },
                React.createElement("div", { className: "flex flex-col space-y-4" },
                    React.createElement(Link, { to: "/", onClick: closeMobileMenu, className: "text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 px-2 py-1" }, "Home"),
                    React.createElement(Link, { to: "/about", onClick: closeMobileMenu, className: "text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 px-2 py-1" }, "About"),
                    React.createElement(Link, { to: "/contact", onClick: closeMobileMenu, className: "text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 px-2 py-1" }, "Contact"),
                    canWrite ? (React.createElement(Link, { to: "/dashboard", onClick: closeMobileMenu, className: "flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 px-2 py-1" },
                        React.createElement(LayoutDashboard, { size: 18 }),
                        React.createElement("span", null, "Dashboard"))) : user ? (React.createElement(Link, { to: "/get-access", onClick: closeMobileMenu, className: "flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 px-2 py-1" },
                        React.createElement(Key, { size: 18 }),
                        React.createElement("span", null, "Get Access"))) : null,
                    user ? (React.createElement("div", { className: "border-t border-gray-200 pt-4 mt-4" },
                        React.createElement("div", { className: "flex items-center space-x-2 text-gray-700 px-2 py-1 mb-3" },
                            React.createElement(User, { size: 18, className: "text-blue-600" }),
                            React.createElement("div", { className: "text-sm" },
                                React.createElement("div", { className: "font-medium" }, user.email),
                                role && (React.createElement("div", { className: "text-xs text-blue-600 capitalize" }, role)))),
                        React.createElement("button", { onClick: () => {
                                handleSignOut();
                                closeMobileMenu();
                            }, className: "flex items-center space-x-2 bg-red-50 text-red-700 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors duration-200 w-full" },
                            React.createElement(LogOut, { size: 18 }),
                            React.createElement("span", null, "Sign Out")))) : (React.createElement("div", { className: "border-t border-gray-200 pt-4 mt-4" },
                        React.createElement(Link, { to: "/login", onClick: closeMobileMenu, className: "flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 w-full" },
                            React.createElement(LogIn, { size: 18 }),
                            React.createElement("span", null, "Login"))))))))));
}
