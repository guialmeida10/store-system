<h1 align="center">🔐 Login System | Full Stack</h1>

<p align="center">
  <img src="https://img.shields.io/badge/ReactJS-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white"/>
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge"/>
</p>

<p align="center">
  Projeto Full Stack desenvolvido em <strong>ReactJS (Frontend)</strong> e <strong>Node.js com Express (Backend)</strong>,
  focado em criar um sistema de autenticação robusto, responsivo e funcional, utilizando <strong>MySQL</strong> como banco de dados.
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/4b2b7f42-609f-4901-91f5-df1d3ba666bb" width="700px" alt="Tela inicial do sistema">
  <br><em>Tela de login</em>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/7db10112-6590-439b-b8b5-929a587dede9" width="700px" alt="Tela de registro do sistema">
  <br><em>Tela de registro</em>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/0dc8d8ff-3612-4ae8-a177-7c84106e3346" width="700px" alt="Dashboard protegida">
  <br><em>Painel principal - Loja</em>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/2cef0fc2-2034-4d8a-ad90-7d7765389d9b" width="700px" alt="Estrutura do banco de dados MySQL">
  <br><em>Banco de dados MySQL</em>
</p>

<p align="center">
  <em>Em breve colocarei um vídeo descritivo</em>
</p>


<p align="center">
  <a href="#-tecnologias">🛠️ Tecnologias</a> • 
  <a href="#-arquitetura">🧱 Arquitetura</a> • 
  <a href="#-funcionalidades">✨ Funcionalidades</a> • 
  <a href="#️-rodando-o-projeto">▶️ Rodando o Projeto</a> • 
  <a href="#-autor">✍️ Autor</a>
</p>

---

## 🛠️ Tecnologias

As principais ferramentas e linguagens utilizadas neste projeto **Full Stack** são:

### 🎨 Frontend
- ⚛️ **ReactJS + Vite** — Criação da interface do usuário.
- 🌐 **Axios** — Gerenciamento de requisições HTTP.
- 💥 **HTML5 + CSS3** — Estrutura e estilização responsiva.

### ⚙️ Backend & Banco de Dados
- 🟩 **Node.js (Express)** — Criação da API RESTful.
- 🐬 **MySQL2** — Conexão e manipulação do banco de dados.
- 🔑 **JSON Web Token (JWT)** — Autenticação via token.
- 🔒 **Bcrypt.js** — Criptografia de senhas.
- ⚙️ **Dotenv** — Gerenciamento de variáveis de ambiente.

---

## 🧱 Arquitetura

O projeto é estruturado em formato **Monorepo Simples**, com duas camadas principais:

```
📂 Login/
 ┣ 📁 src/          → Código do Frontend (ReactJS)
 ┣ 📁 api.login/    → Servidor Express (Backend)
 ┣ 📄 package.json  → Dependências e scripts de execução
 ┗ 📄 README.md     → Documentação do projeto
```

A execução local é feita através do script:
```
npm run start-fullstack
```
> Esse comando utiliza **concurrently** para iniciar o Frontend e o Backend simultaneamente.

---

## ✨ Funcionalidades

O sistema conta com **autenticação real e segura**, incluindo:

✅ **Tela de Login** — Validação de usuário via API.  
📝 **Tela de Registro** — Criação de novos usuários com senha criptografada no banco.  
🔒 **Validação JWT** — Proteção de rotas e sessões autenticadas.  
🧩 **Dashboard Protegido** — Acesso restrito a usuários logados.  
📱 **Design Responsivo e Moderno** — Compatível com dispositivos móveis.  

---

## ▶️ Rodando o Projeto

### 1️⃣ Clone o repositório:
```bash
git clone https://github.com/guialmeida10/store-system.git
```

### 2️⃣ Instale as dependências:
```bash
npm install
npm install --prefix ./api.login
```

### 3️⃣ Configure o Banco de Dados:
Crie um banco de dados **MySQL** e adicione suas credenciais em um arquivo `.env` dentro de `/api.login`:

```
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha
DB_NAME=login_db
JWT_SECRET=chave_secreta
```

### 4️⃣ Inicie a aplicação:
```bash
npm run start-fullstack
```

> O Frontend (Vite) estará disponível em:  
> 🌍 **http://localhost:5173**  
> A API (Express) rodará em:  
> ⚙️ **http://localhost:3000**

---

## 🚧 Status do Projeto

| 🟢 Funcional e Estável (Full Stack) | 📢 OBS | 🔜 Próximos passos |
|-----------------------------------|--------|------------------|
| Sistema está funcional e estável. | Produzir a etapa do "Esqueci minha senha", desenvolver a lógica para chegar no email do usuário. | Deploy em ambiente de produção e configuração de variáveis de ambiente seguras. |

---

## ✍️ Autor

Desenvolvido com dedicação e aprendizado contínuo por:

**👨‍💻 Guilherme Tadeu**  
📫 guisardinha09@gmail.com

---

## 📝 Licença

Este projeto está sob a **Licença MIT** — você pode usar, modificar e distribuir livremente, desde que mantenha os créditos ao autor.

> Consulte o arquivo [LICENSE](./LICENSE) para mais informações.

---

<p align="center">
  Feito com ❤️ por <strong>Guilherme Almeida</strong> — Engenharia da Computação.
</p>
