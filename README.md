### Pré-requisitos
- [Node.js](https://nodejs.org/) versão 18 ou superior
- npm (já vem com o Node.js)

### Passo a passo

```bash
# 1. Entrar na pasta do projeto
cd EduManager

# 2. Instalar dependências
npm install

# 3. Iniciar o servidor de desenvolvimento
npm run dev
```

Acesse no navegador: **http://localhost:3000**

---

## 🔐 Credenciais de Acesso

| Perfil      | E-mail              | Senha |
|-------------|---------------------|-------|
| Admin       | admin@admin.com     | 123   |
| Professor   | prof@prof.com       | 123   |
| Aluno       | aluno@aluno.com     | 123   |

---

## 📦 Build para Produção

```bash
npm run build
npm run preview
```

---

## 🗂️ Estrutura do Projeto

```
EduManager/
├── index.html              # HTML principal
├── vite.config.js          # Configuração do Vite
├── package.json            # Dependências
└── src/
    ├── main.jsx            # Ponto de entrada React
    ├── App.jsx             # Componente raiz + roteamento
    ├── styles.css          # Estilos globais
    ├── data/
    │   └── database.js     # Dados iniciais + configurações
    ├── hooks/
    │   ├── useDatabase.js  # Hook para persistência (localStorage)
    │   └── useToast.js     # Hook para notificações
    ├── utils/
    │   └── helpers.js      # Funções utilitárias
    ├── components/
    │   ├── Badge.jsx       # Componente de badge
    │   ├── Modal.jsx       # Componente de modal
    │   ├── Toast.jsx       # Notificação toast
    │   ├── EmptyState.jsx  # Estado vazio
    │   ├── Sidebar.jsx     # Barra lateral de navegação
    │   └── Topbar.jsx      # Barra superior
    └── pages/
        ├── Login.jsx       # Tela de login
        ├── Dashboard.jsx   # Painel com gráficos
        ├── Alunos.jsx      # CRUD de alunos
        ├── Professores.jsx # CRUD de professores
        ├── Cursos.jsx      # CRUD de cursos
        ├── Turmas.jsx      # CRUD de turmas
        ├── Notas.jsx       # Lançamento de notas
        ├── Frequencia.jsx  # Controle de presença
        └── Boletim.jsx     # Boletim escolar
```

---

## ✅ Funcionalidades

- **Login** com 3 perfis: Admin, Professor, Aluno
- **Dashboard** com KPIs, gráficos de barras, linha e pizza
- **CRUD completo**: Alunos, Professores, Cursos, Turmas
- **Notas**: lançamento com cálculo automático de média
- **Frequência**: registro de presença com percentual
- **Boletim**: visualização individual com resultado final
- **Persistência**: dados salvos no localStorage do navegador
- **Responsivo**: funciona em desktop e mobile

---

## 🛠️ Tecnologias

- React 18
- Vite 5
- Recharts (gráficos)
- CSS puro (sem framework)

---

## 🗄️ Script SQL (SQL Server)

O arquivo `database.sql` contém o script completo para criar o banco de dados no SQL Server.

```bash
# Executar no SQL Server Management Studio (SSMS)
# ou via sqlcmd:
sqlcmd -S localhost -i database.sql
```
