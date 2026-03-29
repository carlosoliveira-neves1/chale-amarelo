# 📋 Instruções para Subir o Projeto

## ✅ Passo 1: Adicionar as Imagens

1. Copie todas as imagens do chalé para a pasta `public/images/`
2. Renomeie os arquivos conforme abaixo:
   - `Captura de tela 2026-03-29 152809.png` → `piscina.jpg`
   - `Captura de tela 2026-03-29 152839.png` → `area-gourmet.jpg`
   - `Captura de tela 2026-03-29 152910.png` → `suite.jpg`
   - `Captura de tela 2026-03-29 152936.png` → `piscina-noite.jpg`
   - `Captura de tela 2026-03-29 152951.png` → `quarto.jpg`
   - `Captura de tela 2026-03-29 153035.png` → `ambiente-interno.jpg`
   - `Captura de tela 2026-03-29 153121.png` → `fachada.jpg`
   - `chale.jpg` → `logo.jpg`

## ✅ Passo 2: Instalar Dependências

Abra o terminal na pasta do projeto e execute:

```bash
npm install
```

## ✅ Passo 3: Testar Localmente

Execute o servidor de desenvolvimento:

```bash
npm run dev
```

Abra o navegador em `http://localhost:3000` e teste:
- ✓ Navegação entre páginas (Início, Galeria, Reservas, Dúvidas)
- ✓ Botões "Consultar datas" e "Ver fotos reais"
- ✓ Carousel de imagens no mobile
- ✓ Menu mobile (hamburguer)
- ✓ Botão flutuante do WhatsApp
- ✓ Links do WhatsApp

## ✅ Passo 4: Subir para o GitHub

### 4.1 Criar Repositório no GitHub

1. Acesse https://github.com/new
2. Nome do repositório: `chale-amarelo`
3. Deixe como **privado** (ou público se preferir)
4. **NÃO** marque "Initialize with README"
5. Clique em "Create repository"

### 4.2 Fazer Push do Código

No terminal, execute:

```bash
# Inicializar Git
git init

# Adicionar todos os arquivos
git add .

# Fazer primeiro commit
git commit -m "Initial commit: Chalé Amarelo webapp"

# Adicionar repositório remoto (substitua SEU-USUARIO)
git remote add origin https://github.com/SEU-USUARIO/chale-amarelo.git

# Fazer push
git branch -M main
git push -u origin main
```

## ✅ Passo 5: Deploy na Vercel

### 5.1 Criar Conta na Vercel

1. Acesse https://vercel.com/signup
2. Faça login com sua conta do GitHub

### 5.2 Importar Projeto

1. Clique em "Add New..." → "Project"
2. Selecione o repositório `chale-amarelo`
3. Clique em "Import"
4. **Framework Preset**: Next.js (detectado automaticamente)
5. Clique em "Deploy"

### 5.3 Aguardar Deploy

- O deploy leva cerca de 1-2 minutos
- Você receberá uma URL como: `https://chale-amarelo.vercel.app`

## 🎉 Pronto!

Seu site estará no ar! Você pode:

- **Compartilhar a URL** com clientes
- **Configurar domínio próprio** nas configurações da Vercel
- **Fazer atualizações**: basta fazer `git push` que a Vercel atualiza automaticamente

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar produção localmente
npm start

# Verificar erros
npm run lint
```

## ❓ Problemas Comuns

### Imagens não aparecem
- Verifique se as imagens estão em `public/images/`
- Verifique se os nomes estão corretos (sem espaços)

### Erro ao instalar
- Use Node.js versão 18 ou superior
- Delete `node_modules` e `package-lock.json`, rode `npm install` novamente

### Deploy falhou
- Verifique se todas as imagens foram commitadas
- Verifique os logs de erro na Vercel
