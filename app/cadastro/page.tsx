'use client'

import { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Check } from 'lucide-react';
import Link from 'next/link';

export default function CadastroPage() {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    telefone: '',
    cpf: '',
    dataNascimento: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    preferencias: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Salvar no localStorage
    const clientes = JSON.parse(localStorage.getItem('chale-clientes') || '[]');
    const novoCliente = {
      ...formData,
      id: Date.now(),
      dataCadastro: new Date().toISOString(),
    };
    clientes.push(novoCliente);
    localStorage.setItem('chale-clientes', JSON.stringify(clientes));
    
    setSubmitted(true);
    
    // Enviar notificação via WhatsApp (opcional)
    const message = `Novo cadastro no Chalé Amarelo!\n\nNome: ${formData.nomeCompleto}\nEmail: ${formData.email}\nTelefone: ${formData.telefone}\nCidade: ${formData.cidade}/${formData.estado}`;
    const whatsappUrl = `https://wa.me/5515991716046?text=${encodeURIComponent(message)}`;
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#fbf7ef] flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="rounded-[2rem] bg-white p-8 shadow-lg ring-1 ring-black/5 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <Check size={40} className="text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-[#2f2a22] mb-3">Cadastro Realizado!</h1>
            <p className="text-[#665a49] mb-6">
              Obrigado por se cadastrar, <strong>{formData.nomeCompleto}</strong>! 
              Em breve entraremos em contato via WhatsApp.
            </p>
            <div className="space-y-3">
              <Link
                href="/agendamento"
                className="block rounded-2xl bg-[#f0c730] px-6 py-3 font-semibold text-[#2f2a22] hover:brightness-95"
              >
                Fazer uma reserva
              </Link>
              <Link
                href="/"
                className="block rounded-2xl border border-[#d9ccb1] bg-white px-6 py-3 font-semibold text-[#2f2a22] hover:border-[#d8a400]"
              >
                Voltar ao site
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbf7ef] py-8">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#2f2a22] hover:text-[#d8a400] mb-6">
          <ArrowLeft size={16} />
          Voltar para o site
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2f2a22] md:text-5xl">Cadastre-se</h1>
          <p className="mt-2 text-[#665a49]">
            Preencha seus dados para receber ofertas exclusivas e facilitar futuras reservas
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold flex items-center gap-2">
              <User size={24} className="text-[#d8a400]" />
              Dados Pessoais
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium">Nome Completo *</label>
                <input
                  type="text"
                  name="nomeCompleto"
                  required
                  value={formData.nomeCompleto}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#e2d8c5] bg-[#fcfbf8] px-4 py-3 text-sm outline-none transition focus:border-[#d8a400]"
                  placeholder="Digite seu nome completo"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#e2d8c5] bg-[#fcfbf8] px-4 py-3 text-sm outline-none transition focus:border-[#d8a400]"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Telefone *</label>
                <input
                  type="tel"
                  name="telefone"
                  required
                  value={formData.telefone}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#e2d8c5] bg-[#fcfbf8] px-4 py-3 text-sm outline-none transition focus:border-[#d8a400]"
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">CPF</label>
                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#e2d8c5] bg-[#fcfbf8] px-4 py-3 text-sm outline-none transition focus:border-[#d8a400]"
                  placeholder="000.000.000-00"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Data de Nascimento</label>
                <input
                  type="date"
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#e2d8c5] bg-[#fcfbf8] px-4 py-3 text-sm outline-none transition focus:border-[#d8a400]"
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold flex items-center gap-2">
              <MapPin size={24} className="text-[#d8a400]" />
              Endereço
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium">Endereço Completo</label>
                <input
                  type="text"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#e2d8c5] bg-[#fcfbf8] px-4 py-3 text-sm outline-none transition focus:border-[#d8a400]"
                  placeholder="Rua, número, complemento"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Cidade</label>
                <input
                  type="text"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#e2d8c5] bg-[#fcfbf8] px-4 py-3 text-sm outline-none transition focus:border-[#d8a400]"
                  placeholder="Sua cidade"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Estado</label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#e2d8c5] bg-[#fcfbf8] px-4 py-3 text-sm outline-none transition focus:border-[#d8a400]"
                >
                  <option value="">Selecione</option>
                  <option value="SP">São Paulo</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="PR">Paraná</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="BA">Bahia</option>
                  <option value="PE">Pernambuco</option>
                  <option value="CE">Ceará</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="GO">Goiás</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">CEP</label>
                <input
                  type="text"
                  name="cep"
                  value={formData.cep}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#e2d8c5] bg-[#fcfbf8] px-4 py-3 text-sm outline-none transition focus:border-[#d8a400]"
                  placeholder="00000-000"
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold flex items-center gap-2">
              <Calendar size={24} className="text-[#d8a400]" />
              Preferências
            </h2>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Conte-nos sobre suas preferências de hospedagem
              </label>
              <textarea
                name="preferencias"
                value={formData.preferencias}
                onChange={handleChange}
                className="min-h-[100px] w-full rounded-2xl border border-[#e2d8c5] bg-[#fcfbf8] px-4 py-3 text-sm outline-none transition focus:border-[#d8a400]"
                placeholder="Ex: Prefiro finais de semana, viajo com família, gosto de piscina aquecida..."
              />
            </div>
          </div>

          <div className="rounded-2xl bg-[#fff4c8] p-4 mb-6">
            <p className="text-sm text-[#a67d00]">
              <strong>Privacidade:</strong> Seus dados serão utilizados apenas para melhorar sua experiência 
              e enviar ofertas personalizadas. Não compartilhamos suas informações com terceiros.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              className="flex-1 rounded-2xl bg-[#2f2a22] px-6 py-4 font-semibold text-white shadow-sm transition hover:bg-[#3f3528]"
            >
              Cadastrar
            </button>
            <Link
              href="/"
              className="flex-1 rounded-2xl border border-[#d9ccb1] bg-white px-6 py-4 font-semibold text-[#2f2a22] text-center transition hover:border-[#d8a400]"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
