'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { User } from '@/types';

interface AdminUser extends User {
  status: 'active' | 'banned';
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadUsers = () => {
    api
      .get('/admin/users')
      .then((res) => setUsers(res.data.data))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const toggleStatus = async (user: AdminUser) => {
    const newStatus = user.status === 'active' ? 'banned' : 'active';
    setUpdatingId(user.id);
    try {
      await api.patch(`/admin/users/${user.id}`, { status: newStatus });
      toast.success(`${user.name} is now ${newStatus}`);
      loadUsers();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Could not update user');
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <p className="text-[var(--muted-foreground)]">Loading users...</p>;

  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--card)]">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-[var(--border)] text-[var(--muted-foreground)]">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b border-[var(--border)] last:border-0">
              <td className="px-4 py-3">{u.name}</td>
              <td className="px-4 py-3 text-[var(--muted-foreground)]">{u.email}</td>
              <td className="px-4 py-3 capitalize">{u.role}</td>
              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs ${
                    u.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {u.status}
                </span>
              </td>
              <td className="px-4 py-3">
                {u.role !== 'admin' && (
                  <button
                    onClick={() => toggleStatus(u)}
                    disabled={updatingId === u.id}
                    className="rounded-md border border-[var(--border)] px-3 py-1 text-xs hover:bg-[var(--muted)] disabled:opacity-50"
                  >
                    {u.status === 'active' ? 'Ban' : 'Unban'}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
