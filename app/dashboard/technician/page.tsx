'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { Category } from '@/types';

export default function TechnicianProfilePage() {
  // Profile form state
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [pricing, setPricing] = useState('');
  const [bio, setBio] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);

  // Availability form state (kept simple: one day + time range at a time)
  const [day, setDay] = useState('Monday');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [savingAvailability, setSavingAvailability] = useState(false);

  // New service form state
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [creatingService, setCreatingService] = useState(false);

  useEffect(() => {
    api
      .get('/categories')
      .then((res) => setCategories(res.data.data))
      .catch(() => setCategories([]));
  }, []);

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      await api.put('/technician/profile', {
        skills: skills.split(',').map((s) => s.trim()).filter(Boolean),
        experience: Number(experience) || 0,
        pricing: Number(pricing) || 0,
        bio,
      });
      toast.success('Profile updated!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Could not update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const saveAvailability = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingAvailability(true);
    try {
      await api.put('/technician/availability', {
        slots: [{ day, startTime, endTime }],
      });
      toast.success('Availability updated!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Could not update availability');
    } finally {
      setSavingAvailability(false);
    }
  };

  const createService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId || !title || !price) {
      toast.error('Category, title and price are required');
      return;
    }
    setCreatingService(true);
    try {
      await api.post('/services', {
        categoryId,
        title,
        description,
        price: Number(price),
        location,
      });
      toast.success('Service created!');
      setTitle('');
      setDescription('');
      setPrice('');
      setLocation('');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Could not create service. Update your profile first.');
    } finally {
      setCreatingService(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Profile */}
      <section className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="mb-4 text-lg font-semibold">Your profile</h2>
        <form onSubmit={saveProfile} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Skills (comma separated)</label>
            <input
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="plumbing, pipe fitting"
              className="w-full rounded-md border border-[var(--border)] px-3 py-2 text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Years of experience</label>
              <input
                type="number"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full rounded-md border border-[var(--border)] px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Base pricing</label>
              <input
                type="number"
                value={pricing}
                onChange={(e) => setPricing(e.target.value)}
                className="w-full rounded-md border border-[var(--border)] px-3 py-2 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full rounded-md border border-[var(--border)] px-3 py-2 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={savingProfile}
            className="rounded-md bg-[var(--primary)] px-5 py-2 text-sm font-medium text-[var(--primary-foreground)] disabled:opacity-50"
          >
            {savingProfile ? 'Saving...' : 'Save profile'}
          </button>
        </form>
      </section>

      {/* Availability */}
      <section className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="mb-4 text-lg font-semibold">Availability</h2>
        <form onSubmit={saveAvailability} className="flex flex-wrap items-end gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Day</label>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="rounded-md border border-[var(--border)] px-3 py-2 text-sm"
            >
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Start</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="rounded-md border border-[var(--border)] px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">End</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="rounded-md border border-[var(--border)] px-3 py-2 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={savingAvailability}
            className="rounded-md bg-[var(--primary)] px-5 py-2 text-sm font-medium text-[var(--primary-foreground)] disabled:opacity-50"
          >
            {savingAvailability ? 'Saving...' : 'Add slot'}
          </button>
        </form>
      </section>

      {/* Add a service */}
      <section className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="mb-4 text-lg font-semibold">Offer a new service</h2>
        <form onSubmit={createService} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full rounded-md border border-[var(--border)] px-3 py-2 text-sm"
            >
              <option value="">Select a category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Service title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Pipe Fitting"
              className="w-full rounded-md border border-[var(--border)] px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full rounded-md border border-[var(--border)] px-3 py-2 text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Price ($)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-md border border-[var(--border)] px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Location</label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Dhaka"
                className="w-full rounded-md border border-[var(--border)] px-3 py-2 text-sm"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={creatingService}
            className="rounded-md bg-[var(--accent)] px-5 py-2 text-sm font-medium text-[var(--accent-foreground)] disabled:opacity-50"
          >
            {creatingService ? 'Creating...' : 'Create service'}
          </button>
        </form>
      </section>
    </div>
  );
}
