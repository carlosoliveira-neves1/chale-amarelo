'use client'

import { useMemo, useState } from "react";
import {
  Menu,
  X,
  Home,
  Image,
  Calendar,
  HelpCircle,
  Check,
  Users,
  Car,
  Star,
  Shield,
  Clock,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Wifi,
  Sun,
} from "lucide-react";

const whatsappLink = "https://wa.me/5515991716046";

const pages = [
  { id: "inicio", label: "Início", icon: Home },
  { id: "galeria", label: "Galeria", icon: Image },
  { id: "reservas", label: "Reservas", icon: Calendar },
  { id: "duvidas", label: "Dúvidas", icon: HelpCircle },
];

export default function ChaleAmareloApp() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentPage, setCurrentPage] = useState("inicio");

  const gallery = useMemo(
    () => [
      {
        title: "Piscina privativa",
        image: "/images/piscina.jpg",
      },
      {
        title: "Área gourmet",
        image: "/images/area-gourmet.jpg",
      },
      {
        title: "Suíte confortável",
        image: "/images/suite.jpg",
      },
      {
        title: "Piscina à noite",
        image: "/images/piscina-noite.jpg",
      },
      {
        title: "Quarto climatizado",
        image: "/images/quarto.jpg",
      },
      {
        title: "Ambiente interno",
        image: "/images/ambiente-interno.jpg",
      },
      {
        title: "Fachada do Chalé",
        image: "/images/fachada.jpg",
      },
    ],
    []
  );

  const amenities = [
    { icon: Home, label: "Piscina privativa" },
    { icon: Home, label: "Área gourmet" },
    { icon: Home, label: "Quartos climatizados" },
    { icon: Wifi, label: "Wi‑Fi" },
    { icon: Home, label: "Banheiro equipado" },
    { icon: Car, label: "Acesso prático" },
  ];

  const structureItems = [
    { icon: Users, title: "Ideal para família", text: "Ambiente confortável para dias de descanso e lazer." },
    { icon: Sun, title: "Clima de praia", text: "Visual leve, ensolarado e perfeito para temporada." },
    { icon: Shield, title: "Estadia aconchegante", text: "Espaço moderno para curtir com mais privacidade." },
  ];

  const faqItems = [
    {
      question: "Como faço para reservar?",
      answer: "Você pode consultar disponibilidade e solicitar orçamento diretamente pelo WhatsApp do Chalé Amarelo.",
    },
    {
      question: "O chalé tem piscina privativa?",
      answer: "Sim. A área da piscina é um dos grandes destaques da hospedagem e aparece em várias fotos reais do imóvel.",
    },
    {
      question: "Tem quartos com ar-condicionado?",
      answer: "Sim. Os ambientes foram preparados para oferecer mais conforto durante a estadia.",
    },
    {
      question: "Onde fica?",
      answer: "O Chalé Amarelo está em Itanhaém, litoral de São Paulo, em localização ideal para curtir praia e descanso.",
    },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % gallery.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + gallery.length) % gallery.length);

  const navigate = (pageId: string) => {
    setCurrentPage(pageId);
    setMenuOpen(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToGallery = () => navigate("galeria");
  const goToReservations = () => navigate("reservas");
  const goToHome = () => navigate("inicio");

  return (
    <div className="min-h-screen bg-[#fbf7ef] pb-24 text-[#2f2a22] md:pb-0">
      <header className="sticky top-0 z-50 border-b border-black/5 bg-[#fbf7ef]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
          <button type="button" onClick={goToHome} className="flex min-w-0 items-center gap-3 text-left">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 sm:h-14 sm:w-14">
              <img src="/images/logo.jpg" alt="Logo Chalé Amarelo" className="h-full w-full object-contain" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[10px] uppercase tracking-[0.22em] text-[#9a824b] sm:text-xs">Itanhaém • SP</p>
              <h1 className="truncate text-base font-semibold sm:text-lg">Chalé Amarelo</h1>
            </div>
          </button>

          <nav className="hidden items-center gap-3 md:flex">
            {pages.map((page) => {
              const Icon = page.icon;
              const active = currentPage === page.id;
              return (
                <button
                    type="button"
                    key={page.id}
                    onClick={() => navigate(page.id)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${active ? "bg-[#2f2a22] text-white" : "bg-white text-[#2f2a22] ring-1 ring-black/5 hover:text-[#d8a400]"}`}
                >
                  <Icon size={16} />
                  {page.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/agendamento"
              className="hidden rounded-full bg-[#2f2a22] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#3f3528] sm:inline-flex"
            >
              Agendar
            </a>
            <a
              href={whatsappLink}
                target="_blank"
                rel="noreferrer"
              className="hidden rounded-full bg-[#f0c730] px-4 py-2 text-sm font-medium text-[#2f2a22] shadow-sm transition hover:scale-[1.02] sm:inline-flex"
            >
              Reservar agora
            </a>
            <a
              href="/admin/login"
              className="hidden rounded-full border border-[#d9ccb1] bg-white px-4 py-2 text-sm font-medium text-[#2f2a22] shadow-sm transition hover:border-[#d8a400] hover:text-[#d8a400] sm:inline-flex"
            >
              Entrar
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5 md:hidden"
              aria-label="Abrir menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-black/5 bg-white/95 md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col px-4 py-3 text-sm">
              {pages.map((page) => {
                const Icon = page.icon;
                return (
                  <button
                    type="button"
                    key={page.id}
                    onClick={() => navigate(page.id)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left ${currentPage === page.id ? "bg-[#fff4c8] text-[#a67d00]" : "hover:bg-[#f7f3ea]"}`}
                  >
                    <Icon size={18} />
                    {page.label}
                  </button>
                );
              })}
              <a href={whatsappLink}
                target="_blank"
                rel="noreferrer" className="mt-2 rounded-full bg-[#f0c730] px-4 py-3 text-center font-medium text-[#2f2a22]">
                Reservar agora
              </a>
            </div>
          </div>
        )}
      </header>

      {currentPage === "inicio" && (
        <main>
          <section className="relative overflow-hidden px-4 pb-8 pt-4 sm:pt-6 md:px-8 md:pb-16 md:pt-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(240,199,48,0.18),_transparent_35%)]" />
            <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 md:gap-10">
              <div className="order-2 flex flex-col justify-center md:order-1">
                <span className="mb-3 inline-flex w-fit rounded-full border border-[#eadfca] bg-white/90 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#9a824b] sm:text-xs">
                  Casa de temporada na praia
                </span>

                <h2 className="max-w-xl text-[2rem] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-[2.8rem] md:text-6xl">
                  Seu refúgio pé na praia com o charme do <span className="text-[#d8a400]">Chalé Amarelo</span>
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-6 text-[#665a49] sm:text-base sm:leading-7 md:text-lg">
                  Uma landing page com cara de aplicativo premium no celular, destacando piscina, conforto e as fotos reais da hospedagem.
                </p>

                <div className="mt-5 flex items-center gap-3 text-sm text-[#5f5445]">
                  <div className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-2 shadow-sm ring-1 ring-black/5">
                    <Star size={14} className="fill-[#f0c730] text-[#f0c730]" />
                    <span>Hospedagem bem avaliada</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <button
                    type="button"
                    onClick={goToReservations}
                    className="inline-flex items-center justify-center rounded-full bg-[#2f2a22] px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-black/10 transition hover:translate-y-[-1px]"
                  >
                    Consultar datas
                  </button>
                  <button
                    type="button"
                    onClick={goToGallery}
                    className="inline-flex items-center justify-center rounded-full border border-[#d9ccb1] bg-white px-6 py-3.5 text-sm font-medium transition hover:border-[#d8a400] hover:text-[#d8a400]"
                  >
                    Ver fotos
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3 rounded-[1.75rem] bg-white/95 p-3 shadow-sm ring-1 ring-black/5 sm:p-4">
                  <div className="rounded-2xl bg-[#fcfbf8] p-3 text-center sm:bg-transparent sm:p-0">
                    <p className="text-sm font-semibold sm:text-xl">Piscina</p>
                    <p className="text-[11px] text-[#7b6f5e] sm:text-sm">privativa</p>
                  </div>
                  <div className="rounded-2xl bg-[#fcfbf8] p-3 text-center sm:bg-transparent sm:p-0">
                    <p className="text-sm font-semibold sm:text-xl">Suíte</p>
                    <p className="text-[11px] text-[#7b6f5e] sm:text-sm">climatizada</p>
                  </div>
                  <div className="rounded-2xl bg-[#fcfbf8] p-3 text-center sm:bg-transparent sm:p-0">
                    <p className="text-sm font-semibold sm:text-xl">Praia</p>
                    <p className="text-[11px] text-[#7b6f5e] sm:text-sm">Itanhaém</p>
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] ring-1 ring-black/5 md:hidden">
                  <img src={gallery[currentSlide].image} alt={gallery[currentSlide].title} className="h-[420px] w-full object-cover" />

                  <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/35 to-transparent" />
                  <div className="absolute left-4 right-4 top-4 flex items-start justify-between">
                    <div className="rounded-2xl bg-white/88 px-3 py-2 shadow-sm backdrop-blur">
                      <p className="text-xs font-semibold text-[#2f2a22]">Chalé Amarelo</p>
                      <p className="text-[11px] text-[#6b5f4f]">Itanhaém • SP</p>
                    </div>
                    <div className="rounded-full bg-[#2f2a22]/85 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur">
                      Premium Stay
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent px-4 pb-4 pt-12 text-white">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <p className="text-lg font-semibold">{gallery[currentSlide].title}</p>
                        <p className="mt-1 text-xs text-white/80">Piscina, conforto e ambiente acolhedor</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={prevSlide}
                          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#2f2a22] shadow-sm backdrop-blur"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={nextSlide}
                          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#f0c730] text-[#2f2a22] shadow-sm"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-center gap-2">
                      {gallery.map((_, index) => (
                        <button
                          type="button"
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`h-2.5 rounded-full transition-all ${currentSlide === index ? "w-7 bg-[#f0c730]" : "w-2.5 bg-white/60"}`}
                          aria-label={`Ir para slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="hidden gap-4 md:grid md:grid-cols-2">
                  <div className="overflow-hidden rounded-[2rem] shadow-lg md:col-span-2">
                    <img src="/images/piscina.jpg" alt="Piscina do Chalé Amarelo" className="h-[390px] w-full object-cover" />
                  </div>
                  <div className="overflow-hidden rounded-[2rem] shadow-md">
                    <img src="/images/area-gourmet.jpg" alt="Área gourmet do Chalé Amarelo" className="h-56 w-full object-cover" />
                  </div>
                  <div className="overflow-hidden rounded-[2rem] shadow-md">
                    <img src="/images/suite.jpg" alt="Quarto do Chalé Amarelo" className="h-56 w-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-2 md:px-8">
            <div className="grid gap-3 md:grid-cols-3 md:gap-6">
              {[
                { icon: Shield, title: "Ambiente acolhedor", text: "Visual limpo e elegante para transmitir confiança já na primeira visita." },
                { icon: Clock, title: "Reserva rápida", text: "Layout pensado para celular, com leitura rápida e acesso direto ao contato." },
                { icon: Star, title: "Mais desejo de estadia", text: "Fotos grandes e blocos bem organizados para valorizar cada detalhe do chalé." },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-[1.6rem] bg-white p-5 shadow-sm ring-1 ring-black/5">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff1b8] text-[#a67d00]">
                      <Icon size={18} />
                    </div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#6b5f4f]">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-16">
            <div className="grid gap-5 md:grid-cols-[1.05fr_0.95fr] md:gap-8">
              <div className="rounded-[2rem] bg-[#2f2a22] p-5 text-white shadow-lg sm:p-8">
                <p className="text-xs uppercase tracking-[0.25em] text-[#f2d66f] sm:text-sm">Estrutura</p>
                <h3 className="mt-3 text-2xl font-semibold sm:text-3xl md:text-4xl">Tudo que importa para uma estadia confortável</h3>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4">
                  {amenities.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f0c730] text-[#2f2a22]">
                          <Icon size={18} />
                        </div>
                        <p className="text-sm font-medium sm:text-base">{item.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-8">
                <p className="text-xs uppercase tracking-[0.25em] text-[#9a824b] sm:text-sm">Acomodação</p>
                <h3 className="mt-3 text-xl font-semibold sm:text-2xl">Um espaço pensado para relaxar</h3>
                <div className="mt-5 space-y-3">
                  {structureItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="rounded-2xl bg-[#fcfbf8] p-4 ring-1 ring-black/5">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff1b8] text-[#a67d00]">
                            <Icon size={18} />
                          </div>
                          <div>
                            <p className="font-semibold">{item.title}</p>
                            <p className="mt-1 text-sm leading-6 text-[#6b5f4f]">{item.text}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {currentPage === "galeria" && (
        <main className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-12">
          <div className="mb-6 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-[#9a824b] sm:text-sm">Galeria real</p>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl md:text-5xl">Veja cada detalhe do Chalé Amarelo</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6b5f4f] sm:text-base sm:leading-7">
              Uma página dedicada às fotos reais da hospedagem, com foco total na experiência visual e na vontade de reservar.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {gallery.map((item, index) => (
              <div key={item.title} className="overflow-hidden rounded-[1.8rem] bg-white shadow-sm ring-1 ring-black/5">
                <div className="relative">
                  <img src={item.image} alt={item.title} className="h-72 w-full object-cover md:h-80" />
                  <div className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-[11px] text-white backdrop-blur">
                    0{index + 1}
                  </div>
                </div>
                <div className="p-4 md:p-5">
                  <p className="text-base font-semibold">{item.title}</p>
                  <p className="mt-1 text-sm text-[#6b5f4f]">Ambiente real do Chalé Amarelo</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {currentPage === "reservas" && (
        <main className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-12">
          <div className="grid gap-5 md:grid-cols-[1fr_0.9fr] md:gap-8">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
              <p className="text-xs uppercase tracking-[0.25em] text-[#9a824b] sm:text-sm">Reservas</p>
              <h2 className="mt-3 text-2xl font-semibold sm:text-3xl md:text-5xl">Solicite sua hospedagem</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6b5f4f] sm:text-base sm:leading-7">
                Página pronta para receber integração com WhatsApp, formulário, calendário ou motor de reservas.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <input className="w-full rounded-2xl border border-[#e2d8c5] bg-[#fcfbf8] px-4 py-3.5 text-sm outline-none transition focus:border-[#d8a400]" placeholder="Nome completo" />
                <input className="w-full rounded-2xl border border-[#e2d8c5] bg-[#fcfbf8] px-4 py-3.5 text-sm outline-none transition focus:border-[#d8a400]" placeholder="Telefone" />
                <input className="w-full rounded-2xl border border-[#e2d8c5] bg-[#fcfbf8] px-4 py-3.5 text-sm outline-none transition focus:border-[#d8a400]" placeholder="Check-in" />
                <input className="w-full rounded-2xl border border-[#e2d8c5] bg-[#fcfbf8] px-4 py-3.5 text-sm outline-none transition focus:border-[#d8a400]" placeholder="Check-out" />
                <input className="w-full rounded-2xl border border-[#e2d8c5] bg-[#fcfbf8] px-4 py-3.5 text-sm outline-none transition focus:border-[#d8a400] sm:col-span-2" placeholder="Quantidade de hóspedes" />
                <textarea className="min-h-[120px] w-full rounded-2xl border border-[#e2d8c5] bg-[#fcfbf8] px-4 py-3.5 text-sm outline-none transition focus:border-[#d8a400] sm:col-span-2" placeholder="Mensagem ou observações" />
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#f0c730] px-4 py-3.5 font-semibold text-[#2f2a22] shadow-sm transition hover:brightness-95"
              >
                <MessageCircle size={18} />
                Solicitar orçamento
              </a>
            </div>

            <div className="space-y-5">
              <div className="rounded-[2rem] bg-[#2f2a22] p-6 text-white shadow-lg md:p-8">
                <p className="text-xs uppercase tracking-[0.25em] text-[#f2d66f] sm:text-sm">Destaques</p>
                <div className="mt-5 space-y-3">
                  {[
                    "Piscina privativa",
                    "Área gourmet",
                    "Quartos climatizados",
                    "Ideal para temporada na praia",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0c730] text-[#2f2a22]">
                        <Check size={16} />
                      </div>
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-black/5">
                <img src="/images/fachada.jpg" alt="Fachada do Chalé Amarelo" className="h-72 w-full object-cover" />
                <div className="p-5">
                  <p className="font-semibold">Hospedagem charmosa em Itanhaém</p>
                  <p className="mt-1 text-sm leading-6 text-[#6b5f4f]">Página pronta para receber valores, calendário e regras de temporada.</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {currentPage === "duvidas" && (
        <main className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-12">
          <div className="grid gap-5 md:grid-cols-[0.95fr_1.05fr] md:gap-8">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
              <p className="text-xs uppercase tracking-[0.25em] text-[#9a824b] sm:text-sm">Localização e contato</p>
              <h2 className="mt-3 text-2xl font-semibold sm:text-3xl md:text-5xl">Informações úteis</h2>
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-[#fcfbf8] p-4 ring-1 ring-black/5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff1b8] text-[#a67d00]">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="font-semibold">Itanhaém • SP</p>
                      <p className="mt-1 text-sm leading-6 text-[#6b5f4f]">Perfeito para quem busca dias de descanso no litoral paulista.</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl bg-[#fcfbf8] p-4 ring-1 ring-black/5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff1b8] text-[#a67d00]">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="font-semibold">Atendimento rápido</p>
                      <p className="mt-1 text-sm leading-6 text-[#6b5f4f]">Todo o fluxo pode ser direcionado para WhatsApp com resposta prática e direta.</p>
                    </div>
                  </div>
                </div>
                <a
                  href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2f2a22] px-4 py-3.5 font-medium text-white"
                >
                  <MessageCircle size={18} />
                  Falar no WhatsApp
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] bg-[#2f2a22] p-6 text-white shadow-lg md:p-8">
              <p className="text-xs uppercase tracking-[0.25em] text-[#f2d66f] sm:text-sm">Dúvidas frequentes</p>
              <div className="mt-5 space-y-3">
                {faqItems.map((item) => (
                  <div key={item.question} className="rounded-2xl bg-white/10 p-4">
                    <p className="font-semibold">{item.question}</p>
                    <p className="mt-2 text-sm leading-6 text-white/85">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      )}

      <nav className="fixed inset-x-3 bottom-3 z-50 rounded-[1.7rem] bg-white/95 p-2 shadow-[0_10px_30px_rgba(0,0,0,0.14)] ring-1 ring-black/5 backdrop-blur md:hidden">
        <div className="grid grid-cols-4 gap-1">
          {pages.map((page) => {
            const Icon = page.icon;
            const active = currentPage === page.id;
            return (
              <button
                    type="button"
                    key={page.id}
                    onClick={() => navigate(page.id)}
                className={`flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2.5 text-[11px] font-medium transition ${active ? "bg-[#fff4c8] text-[#a67d00]" : "text-[#6b5f4f]"}`}
              >
                <Icon size={18} />
                <span>{page.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <a
        href={whatsappLink}
                target="_blank"
                rel="noreferrer"
        className="fixed bottom-24 right-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl ring-4 ring-white/80 md:bottom-6 md:right-6"
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
}
