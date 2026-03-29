'use client'

import { useState, useEffect } from 'react';
import { Calendar, ArrowLeft, Check, X } from 'lucide-react';
import Link from 'next/link';

interface DateAvailability {
  date: string;
  available: boolean;
}

export default function AgendamentoPage() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [availability, setAvailability] = useState<DateAvailability[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    observacoes: ''
  });

  useEffect(() => {
    const stored = localStorage.getItem('chale-availability');
    if (stored) {
      setAvailability(JSON.parse(stored));
    }
  }, []);

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

  const isDateAvailable = (date: Date | null) => {
    if (!date) return false;
    const dateStr = date.toISOString().split('T')[0];
    const found = availability.find(a => a.date === dateStr);
    return found ? found.available : false;
  };

  const handleDateClick = (date: Date | null) => {
    if (!date || !isDateAvailable(date)) return;
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) {
      alert('Por favor, selecione uma data disponível');
      return;
    }
    
    const message = `Olá! Gostaria de fazer uma reserva para o Chalé Amarelo.\n\nData: ${new Date(selectedDate).toLocaleDateString('pt-BR')}\nNome: ${formData.nome}\nTelefone: ${formData.telefone}\nEmail: ${formData.email}\nObservações: ${formData.observacoes}`;
    
    const whatsappUrl = `https://wa.me/5515991716046?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  return (
    <div className="min-h-screen bg-[#fbf7ef] py-8">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#2f2a22] hover:text-[#d8a400] mb-6">
          <ArrowLeft size={16} />
          Voltar para o site
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2f2a22] md:text-5xl">Agendar Estadia</h1>
          <p className="mt-2 text-[#665a49]">Consulte as datas disponíveis e faça sua reserva</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="rounded-[2rem] bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-6 md:p-8">
            <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-semibold sm:text-xl">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={prevMonth}
                  className="flex-1 rounded-xl bg-[#f7f3ea] p-2 hover:bg-[#eee8d5] sm:flex-none"
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  onClick={nextMonth}
                  className="flex-1 rounded-xl bg-[#f7f3ea] p-2 hover:bg-[#eee8d5] sm:flex-none"
                >
                  <ArrowLeft size={18} className="rotate-180" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {dayNames.map(day => (
                <div key={day} className="text-center text-[10px] font-medium text-[#9a824b] sm:text-xs">
                  {day}
                </div>
              ))}
              
              {getDaysInMonth(currentMonth).map((date, index) => {
                const available = isDateAvailable(date);
                const isSelected = date && selectedDate === date.toISOString().split('T')[0];
                const isPast = date && date < new Date(new Date().setHours(0, 0, 0, 0));
                
                return (
                  <button
                    key={index}
                    onClick={() => handleDateClick(date)}
                    disabled={!date || !available || isPast}
                    className={`
                      aspect-square rounded-lg p-1 text-xs transition sm:rounded-xl sm:p-2 sm:text-sm
                      ${!date ? 'invisible' : ''}
                      ${isPast ? 'text-gray-300 cursor-not-allowed' : ''}
                      ${available && !isPast ? 'bg-green-50 text-green-700 hover:bg-green-100 cursor-pointer' : ''}
                      ${!available && !isPast && date ? 'bg-red-50 text-red-400 cursor-not-allowed' : ''}
                      ${isSelected ? 'bg-[#f0c730] text-[#2f2a22] font-bold ring-2 ring-[#d8a400]' : ''}
                    `}
                  >
                    {date ? date.getDate() : ''}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="h-4 w-4 rounded bg-green-100"></div>
                <span className="text-[#665a49]">Disponível</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-4 w-4 rounded bg-red-100"></div>
                <span className="text-[#665a49]">Indisponível</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-4 w-4 rounded bg-[#f0c730]"></div>
                <span className="text-[#665a49]">Data selecionada</span>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-6 md:p-8">
            <h2 className="mb-4 text-lg font-semibold sm:mb-6 sm:text-xl">Dados da Reserva</h2>
            
            {selectedDate && (
              <div className="mb-6 rounded-2xl bg-[#fff4c8] p-4">
                <div className="flex items-center gap-2">
                  <Calendar size={20} className="text-[#a67d00]" />
                  <span className="font-semibold text-[#a67d00]">
                    Data selecionada: {new Date(selectedDate).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Nome completo *</label>
                <input
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  className="w-full rounded-2xl border border-[#e2d8c5] bg-[#fcfbf8] px-4 py-3 text-sm outline-none transition focus:border-[#d8a400]"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Telefone *</label>
                <input
                  type="tel"
                  required
                  value={formData.telefone}
                  onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                  className="w-full rounded-2xl border border-[#e2d8c5] bg-[#fcfbf8] px-4 py-3 text-sm outline-none transition focus:border-[#d8a400]"
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full rounded-2xl border border-[#e2d8c5] bg-[#fcfbf8] px-4 py-3 text-sm outline-none transition focus:border-[#d8a400]"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Observações</label>
                <textarea
                  value={formData.observacoes}
                  onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                  className="min-h-[100px] w-full rounded-2xl border border-[#e2d8c5] bg-[#fcfbf8] px-4 py-3 text-sm outline-none transition focus:border-[#d8a400]"
                  placeholder="Número de hóspedes, preferências, etc."
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-[#f0c730] px-6 py-4 font-semibold text-[#2f2a22] shadow-sm transition hover:brightness-95"
              >
                Enviar solicitação via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
