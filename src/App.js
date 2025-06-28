import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsConditions } from './pages/TermsConditions';
import { ViewPost } from './pages/ViewPost';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { GetAccess } from './pages/GetAccess';
function App() {
    return (React.createElement(AuthProvider, null,
        React.createElement(Router, null,
            React.createElement("div", { className: "min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col" },
                React.createElement(Header, null),
                React.createElement("main", { className: "flex-grow" },
                    React.createElement(Routes, null,
                        React.createElement(Route, { path: "/", element: React.createElement(Home, null) }),
                        React.createElement(Route, { path: "/about", element: React.createElement(About, null) }),
                        React.createElement(Route, { path: "/contact", element: React.createElement(Contact, null) }),
                        React.createElement(Route, { path: "/privacy-policy", element: React.createElement(PrivacyPolicy, null) }),
                        React.createElement(Route, { path: "/terms-conditions", element: React.createElement(TermsConditions, null) }),
                        React.createElement(Route, { path: "/post/:id", element: React.createElement(ViewPost, null) }),
                        React.createElement(Route, { path: "/dashboard", element: React.createElement(Dashboard, null) }),
                        React.createElement(Route, { path: "/login", element: React.createElement(Login, null) }),
                        React.createElement(Route, { path: "/get-access", element: React.createElement(GetAccess, null) }))),
                React.createElement(Footer, null)))));
}
export default App;
