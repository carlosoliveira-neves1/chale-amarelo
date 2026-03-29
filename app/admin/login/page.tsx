'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Credenciais fixas (em produção, use autenticação real)
    if (credentials.username === 'admin' && credentials.password === 'chale2026') {
      localStorage.setItem('chale-admin-auth', 'true');
      router.push('/admin/painel');
    } else {
      setError('Usuário ou senha incorretos');
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf7ef] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#2f2a22] hover:text-[#d8a400] mb-6">
          <ArrowLeft size={16} />
          Voltar para o site
        </Link>

        <div className="rounded-[2rem] bg-white p-8 shadow-lg ring-1 ring-black/5">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff1b8]">
              <Lock size={32} className="text-[#a67d00]" />
            </div>
            <h1 className="text-2xl font-bold text-[#2f2a22]">Área Administrativa</h1>
            <p className="mt-2 text-sm text-[#665a49]">Faça login para gerenciar as reservas</p>
          </div>

          {error && (
            <div className="mb-4 rounded-2xl bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Usuário</label>
              <div className="relative">
                <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a824b]" />
                <input
                  type="text"
                  required
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  className="w-full rounded-2xl border border-[#e2d8c5] bg-[#fcfbf8] px-4 py-3 pl-12 text-sm outline-none transition focus:border-[#d8a400]"
                  placeholder="Digite seu usuário"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Senha</label>
              <div className="relative">
                <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a824b]" />
                <input
                  type="password"
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  className="w-full rounded-2xl border border-[#e2d8c5] bg-[#fcfbf8] px-4 py-3 pl-12 text-sm outline-none transition focus:border-[#d8a400]"
                  placeholder="Digite sua senha"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-[#2f2a22] px-6 py-4 font-semibold text-white shadow-sm transition hover:bg-[#3f3528]"
            >
              Entrar
            </button>
          </form>

          <div className="mt-6 rounded-2xl bg-[#fff4c8] p-4 text-xs text-[#a67d00]">
            <p className="font-semibold">Credenciais de demonstração:</p>
            <p>Usuário: <strong>admin</strong></p>
            <p>Senha: <strong>chale2026</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}
