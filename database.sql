-- ============================================================
-- EduManager — Script SQL Server
-- Execute no SQL Server Management Studio (SSMS)
-- ============================================================

-- Criar banco de dados
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'EduManager')
    CREATE DATABASE EduManager;
GO

USE EduManager;
GO

-- ── Tabela: usuarios ──────────────────────────────────────────
IF OBJECT_ID('usuarios', 'U') IS NOT NULL DROP TABLE usuarios;
CREATE TABLE usuarios (
    id    INT PRIMARY KEY IDENTITY(1,1),
    nome  NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) NOT NULL UNIQUE,
    senha NVARCHAR(100) NOT NULL,
    tipo  NVARCHAR(20)  NOT NULL  -- admin | professor | aluno
);

-- ── Tabela: cursos ────────────────────────────────────────────
IF OBJECT_ID('cursos', 'U') IS NOT NULL DROP TABLE cursos;
CREATE TABLE cursos (
    id            INT PRIMARY KEY IDENTITY(1,1),
    nome          NVARCHAR(100) NOT NULL,
    carga_horaria INT NOT NULL
);

-- ── Tabela: professores ───────────────────────────────────────
IF OBJECT_ID('professores', 'U') IS NOT NULL DROP TABLE professores;
CREATE TABLE professores (
    id         INT PRIMARY KEY IDENTITY(1,1),
    nome       NVARCHAR(100) NOT NULL,
    disciplina NVARCHAR(100) NOT NULL,
    email      NVARCHAR(100) NOT NULL
);

-- ── Tabela: alunos ────────────────────────────────────────────
IF OBJECT_ID('alunos', 'U') IS NOT NULL DROP TABLE alunos;
CREATE TABLE alunos (
    id       INT PRIMARY KEY IDENTITY(1,1),
    nome     NVARCHAR(100) NOT NULL,
    cpf      NVARCHAR(20),
    email    NVARCHAR(100) NOT NULL,
    curso_id INT NOT NULL,
    FOREIGN KEY (curso_id) REFERENCES cursos(id)
);

-- ── Tabela: turmas ────────────────────────────────────────────
IF OBJECT_ID('turmas', 'U') IS NOT NULL DROP TABLE turmas;
CREATE TABLE turmas (
    id           INT PRIMARY KEY IDENTITY(1,1),
    nome         NVARCHAR(100) NOT NULL,
    curso_id     INT NOT NULL,
    professor_id INT NOT NULL,
    FOREIGN KEY (curso_id)     REFERENCES cursos(id),
    FOREIGN KEY (professor_id) REFERENCES professores(id)
);

-- ── Tabela: notas ─────────────────────────────────────────────
IF OBJECT_ID('notas', 'U') IS NOT NULL DROP TABLE notas;
CREATE TABLE notas (
    id         INT PRIMARY KEY IDENTITY(1,1),
    aluno_id   INT NOT NULL,
    disciplina NVARCHAR(100) NOT NULL,
    nota       DECIMAL(4,1)  NOT NULL CHECK (nota >= 0 AND nota <= 10),
    FOREIGN KEY (aluno_id) REFERENCES alunos(id)
);

-- ── Tabela: frequencia ────────────────────────────────────────
IF OBJECT_ID('frequencia', 'U') IS NOT NULL DROP TABLE frequencia;
CREATE TABLE frequencia (
    id        INT PRIMARY KEY IDENTITY(1,1),
    aluno_id  INT  NOT NULL,
    data      DATE NOT NULL,
    presente  BIT  NOT NULL DEFAULT 1,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id)
);

GO

-- ============================================================
-- Dados iniciais de demonstração
-- ============================================================

-- Cursos
INSERT INTO cursos (nome, carga_horaria) VALUES
    ('Informática',    120),
    ('Administração',  100),
    ('Design Gráfico',  80),
    ('Contabilidade',  110);

-- Professores
INSERT INTO professores (nome, disciplina, email) VALUES
    ('Carlos Silva',   'Programação', 'carlos@edu.com'),
    ('Ana Souza',      'Gestão',      'ana@edu.com'),
    ('Marcos Lima',    'Design',      'marcos@edu.com'),
    ('Patrícia Costa', 'Matemática',  'patricia@edu.com');

-- Alunos
INSERT INTO alunos (nome, cpf, email, curso_id) VALUES
    ('João Pedro',     '123.456.789-00', 'joao@edu.com',     1),
    ('Maria Oliveira', '987.654.321-00', 'maria@edu.com',    2),
    ('Lucas Ferreira', '456.789.123-00', 'lucas@edu.com',    1),
    ('Fernanda Lima',  '321.654.987-00', 'fernanda@edu.com', 3),
    ('Rafael Santos',  '789.123.456-00', 'rafael@edu.com',   4);

-- Turmas
INSERT INTO turmas (nome, curso_id, professor_id) VALUES
    ('INF-A 2026', 1, 1),
    ('ADM-B 2026', 2, 2),
    ('DES-A 2026', 3, 3),
    ('CON-A 2026', 4, 4);

-- Usuários (login)
INSERT INTO usuarios (nome, email, senha, tipo) VALUES
    ('Administrador',    'admin@admin.com', '123', 'admin'),
    ('Professor Carlos', 'prof@prof.com',   '123', 'professor'),
    ('Aluno João',       'aluno@aluno.com', '123', 'aluno');

-- Notas
INSERT INTO notas (aluno_id, disciplina, nota) VALUES
    (1, 'Programação',   8.5),
    (1, 'Matemática',    7.0),
    (1, 'Inglês',        9.0),
    (2, 'Gestão',        7.5),
    (2, 'Contabilidade', 6.8),
    (3, 'Programação',   5.5),
    (3, 'Redes',         6.2),
    (4, 'Design',        9.5),
    (5, 'Contabilidade', 8.0),
    (5, 'Gestão',        7.8);

-- Frequência
INSERT INTO frequencia (aluno_id, data, presente) VALUES
    (1, '2026-05-01', 1),
    (1, '2026-05-02', 1),
    (1, '2026-05-03', 0),
    (2, '2026-05-01', 1),
    (2, '2026-05-02', 0),
    (2, '2026-05-03', 1),
    (3, '2026-05-01', 0),
    (3, '2026-05-02', 0),
    (3, '2026-05-03', 1),
    (4, '2026-05-01', 1),
    (4, '2026-05-02', 1),
    (4, '2026-05-03', 1),
    (5, '2026-05-01', 1),
    (5, '2026-05-02', 0),
    (5, '2026-05-03', 1);

GO

-- ── Views úteis ────────────────────────────────────────────────
-- View: média por aluno
CREATE OR ALTER VIEW vw_media_alunos AS
    SELECT
        a.id         AS aluno_id,
        a.nome       AS aluno,
        c.nome       AS curso,
        AVG(n.nota)  AS media_geral,
        CASE WHEN AVG(n.nota) >= 7 THEN 'Aprovado'
             WHEN AVG(n.nota) >= 5 THEN 'Em Risco'
             ELSE 'Reprovado' END AS situacao
    FROM alunos a
    JOIN cursos c ON c.id = a.curso_id
    LEFT JOIN notas n ON n.aluno_id = a.id
    GROUP BY a.id, a.nome, c.nome;
GO

-- View: frequência por aluno
CREATE OR ALTER VIEW vw_frequencia_alunos AS
    SELECT
        a.id                                    AS aluno_id,
        a.nome                                  AS aluno,
        COUNT(f.id)                             AS total_aulas,
        SUM(CAST(f.presente AS INT))            AS presencas,
        ROUND(
            100.0 * SUM(CAST(f.presente AS INT)) / NULLIF(COUNT(f.id), 0),
            1
        )                                       AS percentual_frequencia
    FROM alunos a
    LEFT JOIN frequencia f ON f.aluno_id = a.id
    GROUP BY a.id, a.nome;
GO

PRINT 'Banco EduManager criado com sucesso!';
