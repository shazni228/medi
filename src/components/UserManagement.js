import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { UserPlus, Shield, Edit, Trash2 } from 'lucide-react';
export function UserManagement() {
    const { user: currentUser } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [assigningRole, setAssigningRole] = useState(null);
    useEffect(() => {
        fetchUsers();
    }, []);
    const fetchUsers = async () => {
        try {
            setLoading(true);
            // Get all users from auth.users (this requires admin access)
            const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
            if (authError)
                throw authError;
            // Get user roles
            const { data: userRoles, error: rolesError } = await supabase
                .from('user_roles')
                .select('*');
            if (rolesError)
                throw rolesError;
            // Combine user data with roles
            const usersWithRoles = authUsers.users.map(user => ({
                id: user.id,
                email: user.email || '',
                created_at: user.created_at,
                role: userRoles.find(role => role.user_id === user.id)?.role
            }));
            setUsers(usersWithRoles);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch users');
        }
        finally {
            setLoading(false);
        }
    };
    const assignRole = async (userId, role) => {
        try {
            setAssigningRole(userId);
            const { error } = await supabase.rpc('assign_user_role', {
                target_user_id: userId,
                new_role: role
            });
            if (error)
                throw error;
            // Refresh users list
            await fetchUsers();
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to assign role');
        }
        finally {
            setAssigningRole(null);
        }
    };
    const removeRole = async (userId) => {
        try {
            const { error } = await supabase
                .from('user_roles')
                .delete()
                .eq('user_id', userId);
            if (error)
                throw error;
            // Refresh users list
            await fetchUsers();
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to remove role');
        }
    };
    const getRoleColor = (role) => {
        switch (role) {
            case 'admin': return 'bg-red-100 text-red-800';
            case 'publisher': return 'bg-blue-100 text-blue-800';
            case 'writer': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    const getRoleIcon = (role) => {
        switch (role) {
            case 'admin': return React.createElement(Shield, { size: 14 });
            case 'publisher': return React.createElement(Edit, { size: 14 });
            case 'writer': return React.createElement(UserPlus, { size: 14 });
            default: return null;
        }
    };
    if (loading) {
        return (React.createElement("div", { className: "text-center py-12" },
            React.createElement("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" }),
            React.createElement("p", { className: "mt-4 text-gray-600" }, "Loading users...")));
    }
    if (error) {
        return (React.createElement("div", { className: "text-center py-12" },
            React.createElement("p", { className: "text-red-600 mb-4" },
                "Error: ",
                error),
            React.createElement("button", { onClick: fetchUsers, className: "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors" }, "Try Again")));
    }
    return (React.createElement("div", null,
        React.createElement("div", { className: "mb-6" },
            React.createElement("h2", { className: "text-2xl font-bold text-gray-900 mb-2" }, "User Management"),
            React.createElement("p", { className: "text-gray-600" }, "Manage user roles and permissions for the medical blog platform.")),
        React.createElement("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6" },
            React.createElement("h3", { className: "font-semibold text-blue-900 mb-2" }, "Role Descriptions:"),
            React.createElement("ul", { className: "text-sm text-blue-800 space-y-1" },
                React.createElement("li", null,
                    React.createElement("strong", null, "Writer:"),
                    " Can create and edit their own draft articles, submit for review"),
                React.createElement("li", null,
                    React.createElement("strong", null, "Publisher:"),
                    " Can review, approve, and publish articles from writers"),
                React.createElement("li", null,
                    React.createElement("strong", null, "Admin:"),
                    " Full access to all features including user management"))),
        React.createElement("div", { className: "overflow-x-auto" },
            React.createElement("table", { className: "min-w-full divide-y divide-gray-200" },
                React.createElement("thead", { className: "bg-gray-50" },
                    React.createElement("tr", null,
                        React.createElement("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "User"),
                        React.createElement("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Current Role"),
                        React.createElement("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Joined"),
                        React.createElement("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Actions"))),
                React.createElement("tbody", { className: "bg-white divide-y divide-gray-200" }, users.map((user) => (React.createElement("tr", { key: user.id, className: "hover:bg-gray-50" },
                    React.createElement("td", { className: "px-6 py-4 whitespace-nowrap" },
                        React.createElement("div", null,
                            React.createElement("div", { className: "text-sm font-medium text-gray-900" }, user.email),
                            React.createElement("div", { className: "text-sm text-gray-500" }, user.id === currentUser?.id && '(You)'))),
                    React.createElement("td", { className: "px-6 py-4 whitespace-nowrap" }, user.role ? (React.createElement("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}` },
                        getRoleIcon(user.role),
                        React.createElement("span", { className: "ml-1 capitalize" }, user.role))) : (React.createElement("span", { className: "text-gray-500 text-sm" }, "No role assigned"))),
                    React.createElement("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, new Date(user.created_at).toLocaleDateString()),
                    React.createElement("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium" }, user.id !== currentUser?.id && (React.createElement("div", { className: "flex space-x-2" },
                        React.createElement("select", { value: user.role || '', onChange: (e) => {
                                const newRole = e.target.value;
                                if (newRole) {
                                    assignRole(user.id, newRole);
                                }
                            }, disabled: assigningRole === user.id, className: "text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500" },
                            React.createElement("option", { value: "" }, "Select Role"),
                            React.createElement("option", { value: "writer" }, "Writer"),
                            React.createElement("option", { value: "publisher" }, "Publisher"),
                            React.createElement("option", { value: "admin" }, "Admin")),
                        user.role && (React.createElement("button", { onClick: () => removeRole(user.id), className: "text-red-600 hover:text-red-900 transition-colors", title: "Remove Role" },
                            React.createElement(Trash2, { size: 16 })))))))))))),
        users.length === 0 && (React.createElement("div", { className: "text-center py-12" },
            React.createElement(UserPlus, { className: "h-16 w-16 text-gray-400 mx-auto mb-4" }),
            React.createElement("h3", { className: "text-lg font-semibold text-gray-900 mb-2" }, "No users found"),
            React.createElement("p", { className: "text-gray-600" }, "Users will appear here once they sign up for accounts.")))));
}
