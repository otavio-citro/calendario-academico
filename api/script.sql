CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    perfil VARCHAR(20) NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE turmas (
    id_turma SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    codigo_turma VARCHAR(50)
);

CREATE TABLE turmas_usuarios (
    id_turma_usuario SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_turma INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_turma) REFERENCES turmas(id_turma) ON DELETE CASCADE,
    UNIQUE (id_usuario, id_turma)
);

CREATE TABLE disciplinas (
    id_disciplina SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    carga_horaria INT NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    id_turma INT NOT NULL,
    id_instrutor INT NOT NULL,
    FOREIGN KEY (id_turma) REFERENCES turmas(id_turma) ON DELETE CASCADE,
    FOREIGN KEY (id_instrutor) REFERENCES usuarios(id_usuario)
);

CREATE TABLE calendarios (
    id_calendario SERIAL PRIMARY KEY,
    nome VARCHAR(150),
    id_usuario INT,
    id_turma INT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_turma) REFERENCES turmas(id_turma) ON DELETE CASCADE
);

CREATE TABLE eventos (
    id_evento SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    inicio TIMESTAMP NOT NULL,
    fim TIMESTAMP NOT NULL,
    id_calendario INT NOT NULL,
    id_disciplina INT,
    criado_por INT,
    bloqueado BOOLEAN DEFAULT FALSE,
    nome_recorrencia VARCHAR(100),
    frequencia_recorrencia VARCHAR(100),
    FOREIGN KEY (id_calendario) REFERENCES calendarios(id_calendario) ON DELETE CASCADE,
    FOREIGN KEY (id_disciplina) REFERENCES disciplinas(id_disciplina),
    FOREIGN KEY (criado_por) REFERENCES usuarios(id_usuario)
);

CREATE TABLE participantes_do_evento (
    id_participante SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_evento INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_evento) REFERENCES eventos(id_evento) ON DELETE CASCADE
);