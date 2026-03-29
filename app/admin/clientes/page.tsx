'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Users, Mail, Phone, MapPin, Calendar, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface Cliente {
  id: number;
  nomeCompleto: string;
  email: string;
  telefone: string;
  cpf: string;
  dataNascimento: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  preferencias: string;
  dataCadastro: string;
}

export default function AdminClientesPage() {
  const router = useRouter();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('chale-admin-auth');
    if (auth !== 'true') {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      const stored = localStorage.getItem('chale-clientes');
      if (stored) {
        setClientes(JSON.parse(stored));
      }
    }
  }, [router]);

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este cadastro?')) {
      const novosClientes = clientes.filter(c => c.id !== id);
      setClientes(novosClientes);
      localStorage.setItem('chale-clientes', JSON.stringify(novosClientes));
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#fbf7ef] py-8">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link href="/admin/painel" className="inline-flex items-center gap-2 text-sm text-[#2f2a22] hover:text-[#d8a400] mb-3">
              <ArrowLeft size={16} />
              Voltar ao painel
            </Link>
            <h1 className="text-3xl font-bold text-[#2f2a22] md:text-5xl">Clientes Cadastrados</h1>
            <p className="mt-2 text-[#665a49]">
              Total de {clientes.length} {clientes.length === 1 ? 'cliente cadastrado' : 'clientes cadastrados'}
            </p>
          </div>
        </div>

        {clientes.length === 0 ? (
          <div className="rounded-[2rem] bg-white p-12 text-center shadow-sm ring-1 ring-black/5">
            <Users size={48} className="mx-auto mb-4 text-[#9a824b]" />
            <h2 className="text-xl font-semibold text-[#2f2a22]">Nenhum cliente cadastrado ainda</h2>
            <p className="mt-2 text-[#665a49]">Os cadastros aparecerão aqui quando os clientes se registrarem</p>
          </div>
        ) : (
          <div className="space-y-4">
            {clientes.map((cliente) => (
              <div key={cliente.id} className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#2f2a22]">{cliente.nomeCompleto}</h3>
                    <p className="text-sm text-[#9a824b]">
                      Cadastrado em {new Date(cliente.dataCadastro).toLocaleDateString('pt-BR')} às{' '}
                      {new Date(cliente.dataCadastro).toLocaleTimeString('pt-BR')}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(cliente.id)}
                    className="rounded-xl bg-red-50 p-2 text-red-600 hover:bg-red-100"
                    title="Excluir cadastro"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="flex items-start gap-3">
                    <Mail size={20} className="mt-0.5 text-[#d8a400]" />
                    <div>
                      <p className="text-xs font-medium text-[#9a824b]">Email</p>
                      <p className="text-sm">{cliente.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone size={20} className="mt-0.5 text-[#d8a400]" />
                    <div>
                      <p className="text-xs font-medium text-[#9a824b]">Telefone</p>
                      <p className="text-sm">{cliente.telefone}</p>
                    </div>
                  </div>

                  {cliente.cpf && (
                    <div className="flex items-start gap-3">
                      <Users size={20} className="mt-0.5 text-[#d8a400]" />
                      <div>
                        <p className="text-xs font-medium text-[#9a824b]">CPF</p>
                        <p className="text-sm">{cliente.cpf}</p>
                      </div>
                    </div>
                  )}

                  {cliente.dataNascimento && (
                    <div className="flex items-start gap-3">
                      <Calendar size={20} className="mt-0.5 text-[#d8a400]" />
                      <div>
                        <p className="text-xs font-medium text-[#9a824b]">Data de Nascimento</p>
                        <p className="text-sm">{new Date(cliente.dataNascimento).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                  )}

                  {cliente.cidade && cliente.estado && (
                    <div className="flex items-start gap-3">
                      <MapPin size={20} className="mt-0.5 text-[#d8a400]" />
                      <div>
                        <p className="text-xs font-medium text-[#9a824b]">Localização</p>
                        <p className="text-sm">{cliente.cidade}/{cliente.estado}</p>
                      </div>
                    </div>
                  )}

                  {cliente.endereco && (
                    <div className="flex items-start gap-3 md:col-span-2">
                      <MapPin size={20} className="mt-0.5 text-[#d8a400]" />
                      <div>
                        <p className="text-xs font-medium text-[#9a824b]">Endereço</p>
                        <p className="text-sm">{cliente.endereco}</p>
                        {cliente.cep && <p className="text-sm text-[#9a824b]">CEP: {cliente.cep}</p>}
                      </div>
                    </div>
                  )}
                </div>

                {cliente.preferencias && (
                  <div className="mt-4 rounded-2xl bg-[#fcfbf8] p-4">
                    <p className="text-xs font-medium text-[#9a824b] mb-2">Preferências</p>
                    <p className="text-sm text-[#665a49]">{cliente.preferencias}</p>
                  </div>
                )}

                <div className="mt-4 flex gap-2">
                  <a
                    href={`https://wa.me/55${cliente.telefone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl bg-[#25D366] px-4 py-2 text-sm font-medium text-white hover:brightness-95"
                  >
                    Enviar WhatsApp
                  </a>
                  <a
                    href={`mailto:${cliente.email}`}
                    className="rounded-xl bg-[#f0c730] px-4 py-2 text-sm font-medium text-[#2f2a22] hover:brightness-95"
                  >
                    Enviar Email
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
