'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Check, X, LogOut, ArrowLeft, ArrowRight } from 'lucide-react';

interface DateAvailability {
  date: string;
  available: boolean;
}

export default function AdminPainelPage() {
  const router = useRouter();
  const [availability, setAvailability] = useState<DateAvailability[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('chale-admin-auth');
    if (auth !== 'true') {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      const stored = localStorage.getItem('chale-availability');
      if (stored) {
        setAvailability(JSON.parse(stored));
      }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('chale-admin-auth');
    router.push('/admin/login');
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const toggleDateAvailability = (date: Date | null) => {
    if (!date) return;
    
    const dateStr = date.toISOString().split('T')[0];
    const existing = availability.find(a => a.date === dateStr);
    
    let newAvailability;
    if (existing) {
      newAvailability = availability.map(a => 
        a.date === dateStr ? { ...a, available: !a.available } : a
      );
    } else {
      newAvailability = [...availability, { date: dateStr, available: true }];
    }
    
    setAvailability(newAvailability);
    localStorage.setItem('chale-availability', JSON.stringify(newAvailability));
  };

  const isDateAvailable = (date: Date | null) => {
    if (!date) return false;
    const dateStr = date.toISOString().split('T')[0];
    const found = availability.find(a => a.date === dateStr);
    return found ? found.available : false;
  };

  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#fbf7ef] py-8">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#2f2a22] md:text-5xl">Painel Administrativo</h1>
            <p className="mt-2 text-[#665a49]">Gerencie a disponibilidade de datas do Chalé Amarelo</p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-2xl bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={prevMonth}
                    className="rounded-xl bg-[#f7f3ea] p-2 hover:bg-[#eee8d5]"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button
                    onClick={nextMonth}
                    className="rounded-xl bg-[#f7f3ea] p-2 hover:bg-[#eee8d5]"
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {dayNames.map(day => (
                  <div key={day} className="text-center text-xs font-medium text-[#9a824b]">
                    {day}
                  </div>
                ))}
                
                {getDaysInMonth(currentMonth).map((date, index) => {
                  const available = isDateAvailable(date);
                  const isPast = date && date < new Date(new Date().setHours(0, 0, 0, 0));
                  
                  return (
                    <button
                      key={index}
                      onClick={() => toggleDateAvailability(date)}
                      disabled={!date || !!isPast}
                      className={`
                        aspect-square rounded-xl p-2 text-sm transition relative
                        ${!date ? 'invisible' : ''}
                        ${isPast ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : ''}
                        ${available && !isPast ? 'bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer' : ''}
                        ${!available && !isPast && date ? 'bg-red-100 text-red-700 hover:bg-red-200 cursor-pointer' : ''}
                      `}
                    >
                      {date ? (
                        <>
                          <span>{date.getDate()}</span>
                          {!isPast && (
                            <div className="absolute bottom-1 right-1">
                              {available ? (
                                <Check size={12} className="text-green-600" />
                              ) : (
                                <X size={12} className="text-red-600" />
                              )}
                            </div>
                          )}
                        </>
                      ) : ''}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 rounded-2xl bg-[#fff4c8] p-4">
                <p className="text-sm text-[#a67d00]">
                  <strong>Dica:</strong> Clique nas datas para alternar entre disponível e indisponível
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h3 className="mb-4 font-semibold">Legenda</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                    <Check size={20} className="text-green-600" />
                  </div>
                  <span className="text-sm">Disponível para reserva</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
                    <X size={20} className="text-red-600" />
                  </div>
                  <span className="text-sm">Indisponível</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                    <span className="text-sm text-gray-400">15</span>
                  </div>
                  <span className="text-sm">Data passada</span>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-[#2f2a22] p-6 text-white shadow-lg">
              <h3 className="mb-4 font-semibold">Estatísticas</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-white/70">Datas disponíveis</p>
                  <p className="text-2xl font-bold">
                    {availability.filter(a => a.available).length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-white/70">Datas bloqueadas</p>
                  <p className="text-2xl font-bold">
                    {availability.filter(a => !a.available).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h3 className="mb-4 font-semibold">Acesso Rápido</h3>
              <div className="space-y-2">
                <a
                  href="/admin/fotos"
                  className="block rounded-xl bg-[#2f2a22] px-4 py-3 text-sm text-center font-medium text-white hover:bg-[#3f3528]"
                >
                  Gerenciar fotos
                </a>
                <a
                  href="/admin/clientes"
                  className="block rounded-xl bg-[#f0c730] px-4 py-3 text-sm text-center font-medium text-[#2f2a22] hover:brightness-95"
                >
                  Ver clientes cadastrados
                </a>
                <a
                  href="/agendamento"
                  target="_blank"
                  className="block rounded-xl bg-[#f7f3ea] px-4 py-3 text-sm text-center hover:bg-[#eee8d5]"
                >
                  Ver página de agendamento
                </a>
                <a
                  href="/"
                  target="_blank"
                  className="block rounded-xl bg-[#f7f3ea] px-4 py-3 text-sm text-center hover:bg-[#eee8d5]"
                >
                  Ver site principal
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
