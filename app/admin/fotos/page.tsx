'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, Trash2, Image as ImageIcon, Check, X } from 'lucide-react';
import Link from 'next/link';

interface Foto {
  id: number;
  nome: string;
  url: string;
  categoria: string;
  dataUpload: string;
}

export default function AdminFotosPage() {
  const router = useRouter();
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [logoPreview, setLogoPreview] = useState('');
  const [novaFoto, setNovaFoto] = useState({
    nome: '',
    categoria: 'piscina',
    url: ''
  });

  const categorias = [
    { value: 'piscina', label: 'Piscina' },
    { value: 'area-gourmet', label: 'Área Gourmet' },
    { value: 'quarto', label: 'Quartos' },
    { value: 'suite', label: 'Suítes' },
    { value: 'fachada', label: 'Fachada' },
    { value: 'ambiente-interno', label: 'Ambientes Internos' },
    { value: 'area-externa', label: 'Área Externa' },
    { value: 'outros', label: 'Outros' },
  ];

  useEffect(() => {
    const auth = localStorage.getItem('chale-admin-auth');
    if (auth !== 'true') {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      const stored = localStorage.getItem('chale-fotos');
      if (stored) {
        setFotos(JSON.parse(stored));
      }
      const logo = localStorage.getItem('chale-logo');
      if (logo) {
        setLogoUrl(logo);
        setLogoPreview(logo);
      }
    }
  }, [router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Verificar se é imagem
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione apenas arquivos de imagem');
        return;
      }

      // Criar preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        setNovaFoto({...novaFoto, url: reader.result as string});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (!novaFoto.url || !novaFoto.nome) {
      alert('Preencha o nome e selecione uma imagem');
      return;
    }

    setUploading(true);

    const foto: Foto = {
      id: Date.now(),
      nome: novaFoto.nome,
      url: novaFoto.url,
      categoria: novaFoto.categoria,
      dataUpload: new Date().toISOString(),
    };

    const novasFotos = [...fotos, foto];
    setFotos(novasFotos);
    localStorage.setItem('chale-fotos', JSON.stringify(novasFotos));

    // Resetar formulário
    setNovaFoto({ nome: '', categoria: 'piscina', url: '' });
    setPreviewUrl('');
    setUploading(false);

    alert('Foto adicionada com sucesso!');
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione apenas arquivos de imagem');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = () => {
    if (!logoPreview) {
      alert('Selecione uma imagem para o logo');
      return;
    }

    localStorage.setItem('chale-logo', logoPreview);
    setLogoUrl(logoPreview);
    alert('Logo atualizado com sucesso!');
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta foto?')) {
      const novasFotos = fotos.filter(f => f.id !== id);
      setFotos(novasFotos);
      localStorage.setItem('chale-fotos', JSON.stringify(novasFotos));
    }
  };

  const getFotosPorCategoria = (categoria: string) => {
    return fotos.filter(f => f.categoria === categoria);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#fbf7ef] py-8">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-8">
          <Link href="/admin/painel" className="inline-flex items-center gap-2 text-sm text-[#2f2a22] hover:text-[#d8a400] mb-3">
            <ArrowLeft size={16} />
            Voltar ao painel
          </Link>
          <h1 className="text-3xl font-bold text-[#2f2a22] md:text-5xl">Gerenciar Fotos</h1>
          <p className="mt-2 text-[#665a49]">
            Adicione, visualize e remova fotos do Chalé Amarelo
          </p>
        </div>

        <div className="mb-8 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
          <h2 className="mb-4 text-xl font-semibold flex items-center gap-2">
            <ImageIcon size={24} className="text-[#d8a400]" />
            Logo do Chalé
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Selecionar Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="w-full rounded-2xl border border-[#e2d8c5] bg-[#fcfbf8] px-4 py-3 text-sm outline-none transition focus:border-[#d8a400]"
              />
              <button
                onClick={handleLogoUpload}
                disabled={!logoPreview}
                className="mt-3 w-full rounded-2xl bg-[#2f2a22] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#3f3528] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Atualizar Logo
              </button>
            </div>
            
            {logoPreview && (
              <div>
                <p className="mb-2 text-sm font-medium">Preview do Logo:</p>
                <div className="overflow-hidden rounded-2xl border-2 border-[#e2d8c5] bg-white p-4">
                  <img src={logoPreview} alt="Logo preview" className="h-32 w-full object-contain" />
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 rounded-2xl bg-[#e3f2fd] p-4">
            <p className="text-sm text-[#1565c0]">
              <strong>✓ Integração Automática:</strong> O logo aparecerá automaticamente no header do site!
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          <div>
            <div className="mb-6 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
              <h2 className="mb-4 text-xl font-semibold flex items-center gap-2">
                <Upload size={24} className="text-[#d8a400]" />
                Adicionar Nova Foto
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">Nome da Foto *</label>
                  <input
                    type="text"
                    value={novaFoto.nome}
                    onChange={(e) => setNovaFoto({...novaFoto, nome: e.target.value})}
                    className="w-full rounded-2xl border border-[#e2d8c5] bg-[#fcfbf8] px-4 py-3 text-sm outline-none transition focus:border-[#d8a400]"
                    placeholder="Ex: Piscina vista lateral"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Categoria *</label>
                  <select
                    value={novaFoto.categoria}
                    onChange={(e) => setNovaFoto({...novaFoto, categoria: e.target.value})}
                    className="w-full rounded-2xl border border-[#e2d8c5] bg-[#fcfbf8] px-4 py-3 text-sm outline-none transition focus:border-[#d8a400]"
                  >
                    {categorias.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Selecionar Imagem *</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full rounded-2xl border border-[#e2d8c5] bg-[#fcfbf8] px-4 py-3 text-sm outline-none transition focus:border-[#d8a400]"
                  />
                </div>

                {previewUrl && (
                  <div>
                    <p className="mb-2 text-sm font-medium">Preview:</p>
                    <div className="overflow-hidden rounded-2xl">
                      <img src={previewUrl} alt="Preview" className="h-64 w-full object-cover" />
                    </div>
                  </div>
                )}

                <button
                  onClick={handleUpload}
                  disabled={uploading || !novaFoto.url || !novaFoto.nome}
                  className="w-full rounded-2xl bg-[#f0c730] px-6 py-4 font-semibold text-[#2f2a22] shadow-sm transition hover:brightness-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? 'Adicionando...' : 'Adicionar Foto'}
                </button>
              </div>

              <div className="mt-6 space-y-3">
                <div className="rounded-2xl bg-[#d4edda] p-4">
                  <p className="text-sm text-[#155724]">
                    <strong>✓ Integração Automática:</strong> As fotos adicionadas aqui aparecem automaticamente 
                    na galeria da página principal e no carousel!
                  </p>
                </div>
                <div className="rounded-2xl bg-[#fff4c8] p-4">
                  <p className="text-sm text-[#a67d00]">
                    <strong>Dica:</strong> As fotos são armazenadas localmente no navegador. 
                    Para uso em produção, recomenda-se integrar com um serviço de armazenamento em nuvem.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h3 className="mb-4 font-semibold">Estatísticas</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-[#9a824b]">Total de fotos</p>
                  <p className="text-2xl font-bold text-[#2f2a22]">{fotos.length}</p>
                </div>
                {categorias.map(cat => {
                  const count = getFotosPorCategoria(cat.value).length;
                  if (count > 0) {
                    return (
                      <div key={cat.value}>
                        <p className="text-sm text-[#9a824b]">{cat.label}</p>
                        <p className="text-lg font-semibold text-[#2f2a22]">{count}</p>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-6 text-2xl font-bold text-[#2f2a22]">Galeria de Fotos</h2>
          
          {fotos.length === 0 ? (
            <div className="rounded-[2rem] bg-white p-12 text-center shadow-sm ring-1 ring-black/5">
              <ImageIcon size={48} className="mx-auto mb-4 text-[#9a824b]" />
              <h3 className="text-xl font-semibold text-[#2f2a22]">Nenhuma foto adicionada ainda</h3>
              <p className="mt-2 text-[#665a49]">Comece adicionando fotos do chalé usando o formulário acima</p>
            </div>
          ) : (
            <div className="space-y-8">
              {categorias.map(cat => {
                const fotosCat = getFotosPorCategoria(cat.value);
                if (fotosCat.length === 0) return null;

                return (
                  <div key={cat.value}>
                    <h3 className="mb-4 text-lg font-semibold text-[#2f2a22]">
                      {cat.label} ({fotosCat.length})
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {fotosCat.map(foto => (
                        <div key={foto.id} className="group relative overflow-hidden rounded-[1.5rem] bg-white shadow-sm ring-1 ring-black/5">
                          <div className="aspect-square overflow-hidden">
                            <img 
                              src={foto.url} 
                              alt={foto.nome} 
                              className="h-full w-full object-cover transition group-hover:scale-105"
                            />
                          </div>
                          <div className="p-4">
                            <p className="font-semibold text-[#2f2a22]">{foto.nome}</p>
                            <p className="text-xs text-[#9a824b]">
                              {new Date(foto.dataUpload).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDelete(foto.id)}
                            className="absolute right-3 top-3 rounded-xl bg-red-500 p-2 text-white opacity-0 shadow-lg transition group-hover:opacity-100"
                            title="Excluir foto"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
