import React, { useState } from 'react';
import api from '../api';
import { Shield, Key, Mail, User } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: (token: string, user: { id: string; username: string; name: string; role?: string }) => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password || (isRegister && !name)) {
      setError('გთხოვთ შეავსოთ ყველა ველი');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (isRegister) {
        const response = await api.post('/auth/register', { username, password, name });
        onLoginSuccess(response.data.token, response.data.user);
      } else {
        const response = await api.post('/auth/login', { username, password });
        onLoginSuccess(response.data.token, response.data.user);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'დაფიქსირდა შეცდომა. სცადეთ მოგვიანებით.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 bg-surface-card border border-outline/20 rounded-3xl p-8 md:p-12 space-y-8 shadow-2xl text-text-main">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-surface-container-high text-tertiary rounded-full mb-2 border border-tertiary/20">
          <Shield size={28} />
        </div>
        <h3 className="text-2xl font-headline-md text-tertiary">
          {isRegister ? 'რეგისტრაცია' : 'ავტორიზაცია'}
        </h3>
        <p className="text-xs text-text-muted">
          {isRegister ? 'შექმენით ანგარიში თქვენი პროგრესის შესანახად' : 'შედით სისტემაში პირადი კაბინეტის გამოსაყენებლად'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegister && (
          <div className="space-y-1">
            <label className="block text-xs font-label-md text-tertiary">სრული სახელი</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-text-muted">
                <User size={16} />
              </span>
              <input
                type="text"
                className="w-full bg-surface-container-low border border-outline/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-text-main placeholder-text-muted focus:ring-1 focus:ring-tertiary focus:outline-none"
                placeholder="სახელი გვარი"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="space-y-1">
          <label className="block text-xs font-label-md text-tertiary">მომხმარებლის სახელი</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-text-muted">
              <Mail size={16} />
            </span>
            <input
              type="text"
              className="w-full bg-surface-container-low border border-outline/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-text-main placeholder-text-muted focus:ring-1 focus:ring-tertiary focus:outline-none"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-label-md text-tertiary">პაროლი</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-text-muted">
              <Key size={16} />
            </span>
            <input
              type="password"
              className="w-full bg-surface-container-low border border-outline/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-text-main placeholder-text-muted focus:ring-1 focus:ring-tertiary focus:outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {error && <p className="text-xs text-error font-bold text-center mt-2">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-tertiary text-on-tertiary font-label-md py-3 rounded-xl hover:brightness-110 transition-all disabled:opacity-50 mt-6 font-bold cursor-pointer shadow-md"
        >
          {loading ? 'გთხოვთ დაელოდოთ...' : isRegister ? 'რეგისტრაცია' : 'შესვლა'}
        </button>
      </form>

      <div className="text-center pt-2">
        <button
          onClick={() => {
            setIsRegister(!isRegister);
            setError('');
          }}
          className="text-xs text-text-muted hover:text-tertiary transition-all cursor-pointer underline underline-offset-4"
        >
          {isRegister ? 'უკვე გაქვთ ანგარიში? ავტორიზაცია' : 'არ გაქვთ ანგარიში? დარეგისტრირდით'}
        </button>
      </div>
    </div>
  );
};
