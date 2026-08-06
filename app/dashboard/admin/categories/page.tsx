'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { Category } from '@/types';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [creating, setCreating] = useState(false);

  const loadCategories = () => {
    api
      .get('/admin/categories')
      .then((res) => setCategories(res.data.data))
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const createCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error('Category name is required');

    setCreating(true);
    try {
      await api.post('/admin/categories', { name, description });
      toast.success('Category created!');
      setName('');
      setDescription('');
      loadCategories();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Could not create category');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-8">
      <form
        onSubmit={createCategory}
        className="flex flex-col gap-4 rounded-lg border border-[var(--border)] bg-[var(--card)] p-6 sm:flex-row sm:items-end"
      >
        <div className="flex-1">
          <label className="mb-1 block text-sm font-medium">Category name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Electrical"
            className="w-full rounded-md border border-[var(--border)] px-3 py-2 text-sm"
          />
        </div>
        <div className="flex-1">
          <label className="mb-1 block text-sm font-medium">Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Electrical repair and installation"
            className="w-full rounded-md border border-[var(--border)] px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={creating}
          className="rounded-md bg-[var(--primary)] px-5 py-2 text-sm font-medium text-[var(--primary-foreground)] disabled:opacity-50"
        >
          {creating ? 'Adding...' : 'Add category'}
        </button>
      </form>

      {loading ? (
        <p className="text-[var(--muted-foreground)]">Loading categories...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {categories.map((c) => (
            <div key={c.id} className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4">
              <h3 className="font-semibold">{c.name}</h3>
              {c.description && (
                <p className="text-sm text-[var(--muted-foreground)]">{c.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
