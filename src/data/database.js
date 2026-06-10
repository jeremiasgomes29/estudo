// ── Banco de dados inicial (dados de demonstração) ────────────────────────────
export const INITIAL_DB = {
  cursos: [
    { id: 1, nome: "Informática",      carga_horaria: 120 },
    { id: 2, nome: "Administração",    carga_horaria: 100 },
    { id: 3, nome: "Design Gráfico",   carga_horaria: 80  },
    { id: 4, nome: "Contabilidade",    carga_horaria: 110 },
  ],

  professores: [
    { id: 1, nome: "Carlos Silva",    disciplina: "Programação", email: "carlos@edu.com" },
    { id: 2, nome: "Ana Souza",       disciplina: "Gestão",      email: "ana@edu.com"    },
    { id: 3, nome: "Marcos Lima",     disciplina: "Design",      email: "marcos@edu.com" },
    { id: 4, nome: "Patrícia Costa",  disciplina: "Matemática",  email: "patricia@edu.com" },
  ],

  alunos: [
    { id: 1, nome: "João Pedro",     cpf: "123.456.789-00", email: "joao@edu.com",     curso_id: 1 },
    { id: 2, nome: "Maria Oliveira", cpf: "987.654.321-00", email: "maria@edu.com",    curso_id: 2 },
    { id: 3, nome: "Lucas Ferreira", cpf: "456.789.123-00", email: "lucas@edu.com",    curso_id: 1 },
    { id: 4, nome: "Fernanda Lima",  cpf: "321.654.987-00", email: "fernanda@edu.com", curso_id: 3 },
    { id: 5, nome: "Rafael Santos",  cpf: "789.123.456-00", email: "rafael@edu.com",   curso_id: 4 },
  ],

  turmas: [
    { id: 1, nome: "INF-A 2026", curso_id: 1, professor_id: 1 },
    { id: 2, nome: "ADM-B 2026", curso_id: 2, professor_id: 2 },
    { id: 3, nome: "DES-A 2026", curso_id: 3, professor_id: 3 },
    { id: 4, nome: "CON-A 2026", curso_id: 4, professor_id: 4 },
  ],

  notas: [
    { id: 1,  aluno_id: 1, disciplina: "Programação",   nota: 8.5 },
    { id: 2,  aluno_id: 1, disciplina: "Matemática",    nota: 7.0 },
    { id: 3,  aluno_id: 1, disciplina: "Inglês",        nota: 9.0 },
    { id: 4,  aluno_id: 2, disciplina: "Gestão",        nota: 7.5 },
    { id: 5,  aluno_id: 2, disciplina: "Contabilidade", nota: 6.8 },
    { id: 6,  aluno_id: 3, disciplina: "Programação",   nota: 5.5 },
    { id: 7,  aluno_id: 3, disciplina: "Redes",         nota: 6.2 },
    { id: 8,  aluno_id: 4, disciplina: "Design",        nota: 9.5 },
    { id: 9,  aluno_id: 5, disciplina: "Contabilidade", nota: 8.0 },
    { id: 10, aluno_id: 5, disciplina: "Gestão",        nota: 7.8 },
  ],

  frequencia: [
    { id: 1,  aluno_id: 1, data: "2026-05-01", presente: true  },
    { id: 2,  aluno_id: 1, data: "2026-05-02", presente: true  },
    { id: 3,  aluno_id: 1, data: "2026-05-03", presente: false },
    { id: 4,  aluno_id: 2, data: "2026-05-01", presente: true  },
    { id: 5,  aluno_id: 2, data: "2026-05-02", presente: false },
    { id: 6,  aluno_id: 2, data: "2026-05-03", presente: true  },
    { id: 7,  aluno_id: 3, data: "2026-05-01", presente: false },
    { id: 8,  aluno_id: 3, data: "2026-05-02", presente: false },
    { id: 9,  aluno_id: 3, data: "2026-05-03", presente: true  },
    { id: 10, aluno_id: 4, data: "2026-05-01", presente: true  },
    { id: 11, aluno_id: 4, data: "2026-05-02", presente: true  },
    { id: 12, aluno_id: 4, data: "2026-05-03", presente: true  },
    { id: 13, aluno_id: 5, data: "2026-05-01", presente: true  },
    { id: 14, aluno_id: 5, data: "2026-05-02", presente: false },
    { id: 15, aluno_id: 5, data: "2026-05-03", presente: true  },
  ],

  usuarios: [
    { id: 1, nome: "Administrador",    email: "admin@admin.com", senha: "123", tipo: "admin"     },
    { id: 2, nome: "Professor Carlos", email: "prof@prof.com",   senha: "123", tipo: "professor" },
    { id: 3, nome: "Aluno João",       email: "aluno@aluno.com", senha: "123", tipo: "aluno"     },
  ],

  avisos: [
    { id: 1, texto: "📢 Reunião pedagógica na sexta-feira às 14h",   cor: "blue"  },
    { id: 2, texto: "📅 Prazo de lançamento de notas: 10/06/2026",   cor: "amber" },
    { id: 3, texto: "🏆 Semana da inovação tecnológica: 15/06/2026", cor: "green" },
  ],
}

// ── Credenciais de login ───────────────────────────────────────────────────────
export const CREDENTIALS = {
  admin:     { email: "admin@admin.com", senha: "123", nome: "Administrador"    },
  professor: { email: "prof@prof.com",   senha: "123", nome: "Prof. Carlos"     },
  aluno:     { email: "aluno@aluno.com", senha: "123", nome: "João Pedro"       },
}

// ── Configuração de navegação ─────────────────────────────────────────────────
export const NAV_ITEMS = [
  { id: "dashboard",   label: "Dashboard",   icon: "📊", section: "Principal"   },
  { id: "alunos",      label: "Alunos",      icon: "👥", section: "Acadêmico"   },
  { id: "professores", label: "Professores", icon: "👨‍🏫", section: "Acadêmico"   },
  { id: "cursos",      label: "Cursos",      icon: "📚", section: "Acadêmico"   },
  { id: "turmas",      label: "Turmas",      icon: "🏫", section: "Acadêmico"   },
  { id: "notas",       label: "Notas",       icon: "📝", section: "Acadêmico"   },
  { id: "frequencia",  label: "Frequência",  icon: "📅", section: "Acadêmico"   },
  { id: "boletim",     label: "Boletim",     icon: "📄", section: "Relatórios"  },
]

export const PAGE_TITLES = {
  dashboard:   ["Dashboard",    "Bem-vindo ao EduManager"],
  alunos:      ["Alunos",       "Gerencie os alunos matriculados"],
  professores: ["Professores",  "Corpo docente da instituição"],
  cursos:      ["Cursos",       "Cursos e programas oferecidos"],
  turmas:      ["Turmas",       "Turmas organizadas por curso"],
  notas:       ["Notas",        "Lançamento e gestão de notas"],
  frequencia:  ["Frequência",   "Controle de presença dos alunos"],
  boletim:     ["Boletim",      "Boletim escolar individual"],
}
