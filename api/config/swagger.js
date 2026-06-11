const documentacao = {
  openapi: "3.0.3",

  info: {
    title: "API Calendário Acadêmico",
    description: "API para gerenciamento de usuários, turmas, disciplinas, calendários e eventos acadêmicos.",
    version: "1.0.0"
  },

  servers: [
    {
      url: "http://localhost:3002",
      description: "Servidor Local"
    },
    {
      url: "https://api-one-gamma-28.vercel.app",
      description: "Servidor vercel"
    }
  ],

  components: {


securitySchemes: {
  bearerAuth: {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT"
  }
},

schemas: {

  Usuario: {
    type: "object",
    properties: {
      id_usuario: {
        type: "integer",
        example: 1
      },
      nome: {
        type: "string",
        example: "João Silva"
      },
      email: {
        type: "string",
        example: "joao@email.com"
      },
      senha: {
        type: "string",
        example: "123456"
      },
      perfil: {
        type: "string",
        example: "instrutor"
      },
      ativo: {
        type: "boolean",
        example: true
      }
    }
  },

  Turma: {
    type: "object",
    properties: {
      id_turma: {
        type: "integer",
        example: 1
      },
      nome: {
        type: "string",
        example: "Mecatrônica"
      },
      descricao: {
        type: "string",
        example: "Turma de Aprendizagem Industrial"
      },
      codigo_turma: {
        type: "string",
        example: "MEC2026A"
      }
    }
  },

  Disciplina: {
    type: "object",
    properties: {
      id_disciplina: {
        type: "integer",
        example: 1
      },
      nome: {
        type: "string",
        example: "Banco de Dados"
      },
      carga_horaria: {
        type: "integer",
        example: 80
      },
      data_inicio: {
        type: "string",
        example: "2026-01-10"
      },
      data_fim: {
        type: "string",
        example: "2026-03-20"
      },
      id_turma: {
        type: "integer",
        example: 1
      },
      id_instrutor: {
        type: "integer",
        example: 2
      }
    }
  },

  Calendario: {
    type: "object",
    properties: {
      id_calendario: {
        type: "integer",
        example: 1
      },
      nome: {
        type: "string",
        example: "Calendário Turma A"
      },
      id_usuario: {
        type: "integer",
        example: 1
      },
      id_turma: {
        type: "integer",
        example: 1
      }
    }
  },

  Evento: {
    type: "object",
    properties: {
      id_evento: {
        type: "integer",
        example: 1
      },
      titulo: {
        type: "string",
        example: "Aula de React Native"
      },
      tipo: {
        type: "string",
        example: "AULA"
      },
      inicio: {
        type: "string",
        example: "2026-06-11 08:00:00"
      },
      fim: {
        type: "string",
        example: "2026-06-11 12:00:00"
      },
      id_calendario: {
        type: "integer",
        example: 1
      },
      id_disciplina: {
        type: "integer",
        example: 1
      },
      criado_por: {
        type: "integer",
        example: 1
      },
      bloqueado: {
        type: "boolean",
        example: false
      },
      nome_recorrencia: {
        type: "string",
        example: "Setor"
      },
      frequencia_recorrencia: {
        type: "string",
        example: "Segunda, Terça e Quinta"
      }
    }
  },

  ParticipanteEvento: {
    type: "object",
    properties: {
      id_participante: {
        type: "integer",
        example: 1
      },
      id_usuario: {
        type: "integer",
        example: 1
      },
      id_evento: {
        type: "integer",
        example: 5
      }
    }
  },

  TurmaUsuario: {
    type: "object",
    properties: {
      id_turma_usuario: {
        type: "integer",
        example: 1
      },
      id_usuario: {
        type: "integer",
        example: 1
      },
      id_turma: {
        type: "integer",
        example: 1
      }
    }
  }

}


},

  security: [
    {
      bearerAuth: []
    }
  ],

  tags: [
    {
      name: "Autenticação",
      description: "Operações de login"
    },
    {
      name: "Usuários",
      description: "Gerenciamento de usuários"
    },
    {
      name: "Turmas",
      description: "Gerenciamento de turmas"
    },
    {
      name: "Disciplinas",
      description: "Gerenciamento de disciplinas"
    },
    {
      name: "Calendários",
      description: "Gerenciamento de calendários"
    },
    {
      name: "Eventos",
      description: "Gerenciamento de eventos"
    },
    {
      name: "Participantes",
      description: "Participantes dos eventos"
    },
    {
      name: "Turmas Usuários",
      description: "Relacionamento entre usuários e turmas"
    }
  ],

  paths: {
    "/login": {
      post: {
        tags: ["Autenticação"],
        summary: "Realizar login",
        description: "Autentica um usuário e retorna um token JWT.",


requestBody: {
  required: true,
  content: {
    "application/json": {
      example: {
        email: "admin@email.com",
        senha: "123456"
      }
    }
  }
},

responses: {
  200: {
    description: "Login realizado com sucesso"
  },

  400: {
    description: "Campo obrigatório vazio"
  },

  401: {
    description: "Email ou senha inválidos"
  },

  500: {
    description: "Erro interno do servidor"
  }
}


}
},

"/usuarios": {

  get: {
    tags: ["Usuários"],
      summary: "Listar usuários",
        description: "Retorna todos os usuários ativos.",

          
security: [
  {
    bearerAuth: []
  }
],

responses: {
  200: {
    description: "Lista de usuários"
  },

  401: {
    description: "Token inválido"
  },

  500: {
    description: "Erro interno do servidor"
  }
}


  },

  post: {
    tags: ["Usuários"],
      summary: "Cadastrar usuário",
        description: "Cria um novo usuário.",

          
requestBody: {
  required: true,

  content: {
    "application/json": {
      schema: {
        $ref: "#/components/schemas/Usuario"
      },

      example: {
        nome: "João Silva",
        email: "joao@email.com",
        senha: "123456",
        perfil: "instrutor"
      }
    }
  }
},

responses: {
  201: {
    description: "Usuário cadastrado com sucesso"
  },

  400: {
    description: "Dados inválidos"
  },

  500: {
    description: "Erro interno do servidor"
  }
}


  }
},

"/usuarios/{id_usuario}": {

  put: {
    tags: ["Usuários"],
      summary: "Atualizar usuário",
        description: "Atualiza os dados de um usuário existente.",


          security: [
            {
              bearerAuth: []
            }
          ],

            parameters: [
              {
                name: "id_usuario",
                in: "path",
                required: true,

                schema: {
                  type: "integer"
                },

                example: 1
              }
            ],

              requestBody: {
      required: true,

        content: {
        "application/json": {
          example: {
            nome: "João Silva",
              email: "joao@email.com",
                senha: "123456",
                  perfil: "instrutor"
          }
        }
      }
    },

    responses: {
      200: {
        description: "Usuário atualizado com sucesso"
      },

      401: {
        description: "Token inválido"
      },

      404: {
        description: "Usuário não encontrado"
      },

      500: {
        description: "Erro interno do servidor"
      }
    }


  },

  delete: {
    tags: ["Usuários"],
      summary: "Desativar usuário",
        description: "Realiza exclusão lógica do usuário.",


          security: [
            {
              bearerAuth: []
            }
          ],

            parameters: [
              {
                name: "id_usuario",
                in: "path",
                required: true,

                schema: {
                  type: "integer"
                },

                example: 1
              }
            ],

              responses: {
      200: {
        description: "Usuário removido com sucesso"
      },

      401: {
        description: "Token inválido"
      },

      404: {
        description: "Usuário não encontrado"
      },

      500: {
        description: "Erro interno do servidor"
      }
    }


  }
},
"/turmas": {

  get: {
    tags: ["Turmas"],
      summary: "Listar turmas",
        description: "Retorna todas as turmas cadastradas.",

          security: [
            {
              bearerAuth: []
            }
          ],

            responses: {
      200: {
        description: "Lista de turmas"
      },

      401: {
        description: "Token inválido"
      },

      500: {
        description: "Erro interno do servidor"
      }
    }

  },

  post: {
    tags: ["Turmas"],
      summary: "Cadastrar turma",
        description: "Cria uma nova turma.",

          requestBody: {
      required: true,

        content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Turma"
          },

          example: {
            nome: "Mecatrônica",
              descricao: "Turma de Aprendizagem Industrial",
                codigo_turma: "MEC2026A"
          }
        }
      }
    },

    responses: {
      201: {
        description: "Turma cadastrada com sucesso"
      },

      400: {
        description: "Dados inválidos"
      },

      500: {
        description: "Erro interno do servidor"
      }
    }

  }
},

"/turmas/{id_turma}": {

  put: {
    tags: ["Turmas"],
      summary: "Atualizar turma",
        description: "Atualiza os dados de uma turma.",

          security: [
            {
              bearerAuth: []
            }
          ],

            parameters: [
              {
                name: "id_turma",
                in: "path",
                required: true,

                schema: {
                  type: "integer"
                },

                example: 1
              }
            ],

              requestBody: {
      required: true,

        content: {
        "application/json": {
          example: {
            nome: "Mecatrônica",
              descricao: "Turma Atualizada",
                codigo_turma: "MEC2026B"
          }
        }
      }
    },

    responses: {
      200: {
        description: "Turma atualizada com sucesso"
      },

      401: {
        description: "Token inválido"
      },

      404: {
        description: "Turma não encontrada"
      },

      500: {
        description: "Erro interno do servidor"
      }
    }

  },

  delete: {
    tags: ["Turmas"],
      summary: "Excluir turma",
        description: "Remove uma turma do sistema.",

          security: [
            {
              bearerAuth: []
            }
          ],

            parameters: [
              {
                name: "id_turma",
                in: "path",
                required: true,

                schema: {
                  type: "integer"
                },

                example: 1
              }
            ],

              responses: {
      200: {
        description: "Turma removida com sucesso"
      },

      401: {
        description: "Token inválido"
      },

      404: {
        description: "Turma não encontrada"
      },

      500: {
        description: "Erro interno do servidor"
      }
    }

  }
},

"/turmasUsuarios": {

  get: {
    tags: ["Turmas Usuários"],
      summary: "Listar usuários das turmas",
        description: "Retorna os relacionamentos entre usuários e turmas.",

          security: [
            {
              bearerAuth: []
            }
          ],

            responses: {
      200: {
        description: "Lista de usuários por turma"
      },

      401: {
        description: "Token inválido"
      },

      500: {
        description: "Erro interno do servidor"
      }
    }

  },

  post: {
    tags: ["Turmas Usuários"],
      summary: "Vincular usuário à turma",
        description: "Associa um usuário a uma turma.",

          requestBody: {
      required: true,

        content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/TurmaUsuario"
          },

          example: {
            id_usuario: 1,
              id_turma: 1
          }
        }
      }
    },

    responses: {
      201: {
        description: "Usuário vinculado à turma"
      },

      400: {
        description: "Dados inválidos"
      },

      500: {
        description: "Erro interno do servidor"
      }
    }

  }
},

"/turmasUsuarios/{id_turma_usuario}": {

  put: {
    tags: ["Turmas Usuários"],
      summary: "Atualizar vínculo",
        description: "Atualiza o relacionamento entre usuário e turma.",

          security: [
            {
              bearerAuth: []
            }
          ],

            parameters: [
              {
                name: "id_turma_usuario",
                in: "path",
                required: true,

                schema: {
                  type: "integer"
                },

                example: 1
              }
            ],

              requestBody: {
      required: true,

        content: {
        "application/json": {
          example: {
            id_usuario: 1,
              id_turma: 2
          }
        }
      }
    },

    responses: {
      200: {
        description: "Vínculo atualizado com sucesso"
      },

      401: {
        description: "Token inválido"
      },

      404: {
        description: "Vínculo não encontrado"
      },

      500: {
        description: "Erro interno do servidor"
      }
    }

  },

  delete: {
    tags: ["Turmas Usuários"],
      summary: "Remover vínculo",
        description: "Remove um usuário de uma turma.",

          security: [
            {
              bearerAuth: []
            }
          ],

            parameters: [
              {
                name: "id_turma_usuario",
                in: "path",
                required: true,

                schema: {
                  type: "integer"
                },

                example: 1
              }
            ],

              responses: {
      200: {
        description: "Vínculo removido com sucesso"
      },

      401: {
        description: "Token inválido"
      },

      404: {
        description: "Vínculo não encontrado"
      },

      500: {
        description: "Erro interno do servidor"
      }
    }

  }
},
"/disciplinas": {

  get: {
    tags: ["Disciplinas"],
    summary: "Listar disciplinas",
    description: "Retorna todas as disciplinas cadastradas.",

    security: [
      {
        bearerAuth: []
      }
    ],

    responses: {
      200: {
        description: "Lista de disciplinas"
      },

      401: {
        description: "Token inválido"
      },

      500: {
        description: "Erro interno do servidor"
      }
    }
  },

  post: {
    tags: ["Disciplinas"],
    summary: "Cadastrar disciplina",
    description: "Cria uma nova disciplina.",

    requestBody: {
      required: true,

      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Disciplina"
          },

          example: {
            nome: "Banco de Dados",
            carga_horaria: 80,
            data_inicio: "2026-01-10",
            data_fim: "2026-03-20",
            id_turma: 1,
            id_instrutor: 2
          }
        }
      }
    },

    responses: {
      201: {
        description: "Disciplina cadastrada com sucesso"
      },

      400: {
        description: "Dados inválidos"
      },

      500: {
        description: "Erro interno do servidor"
      }
    }
  }
},

"/disciplinas/{id_disciplina}": {

  put: {
    tags: ["Disciplinas"],
    summary: "Atualizar disciplina",
    description: "Atualiza os dados de uma disciplina.",

    security: [
      {
        bearerAuth: []
      }
    ],

    parameters: [
      {
        name: "id_disciplina",
        in: "path",
        required: true,

        schema: {
          type: "integer"
        },

        example: 1
      }
    ],

    requestBody: {
      required: true,

      content: {
        "application/json": {
          example: {
            nome: "Banco de Dados Avançado",
            carga_horaria: 100,
            data_inicio: "2026-01-10",
            data_fim: "2026-04-01",
            id_turma: 1,
            id_instrutor: 2
          }
        }
      }
    },

    responses: {
      200: {
        description: "Disciplina atualizada com sucesso"
      },

      401: {
        description: "Token inválido"
      },

      404: {
        description: "Disciplina não encontrada"
      },

      500: {
        description: "Erro interno do servidor"
      }
    }
  },

  delete: {
    tags: ["Disciplinas"],
    summary: "Excluir disciplina",
    description: "Remove uma disciplina do sistema.",

    security: [
      {
        bearerAuth: []
      }
    ],

    parameters: [
      {
        name: "id_disciplina",
        in: "path",
        required: true,

        schema: {
          type: "integer"
        },

        example: 1
      }
    ],

    responses: {
      200: {
        description: "Disciplina removida com sucesso"
      },

      401: {
        description: "Token inválido"
      },

      404: {
        description: "Disciplina não encontrada"
      },

      500: {
        description: "Erro interno do servidor"
      }
    }
  }
},
"/calendarios": {

  get: {
    tags: ["Calendários"],
    summary: "Listar calendários",
    description: "Retorna todos os calendários cadastrados.",

    security: [
      {
        bearerAuth: []
      }
    ],

    responses: {
      200: {
        description: "Lista de calendários"
      },

      401: {
        description: "Token inválido"
      },

      500: {
        description: "Erro interno do servidor"
      }
    }
  },

  post: {
    tags: ["Calendários"],
    summary: "Cadastrar calendário",
    description: "Cria um novo calendário.",

    requestBody: {
      required: true,

      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Calendario"
          },

          example: {
            nome: "Calendário Turma A",
            id_usuario: 1,
            id_turma: 1
          }
        }
      }
    },

    responses: {
      201: {
        description: "Calendário cadastrado com sucesso"
      },

      400: {
        description: "Dados inválidos"
      },

      500: {
        description: "Erro interno do servidor"
      }
    }
  }
},

"/calendarios/{id_calendario}": {

  put: {
    tags: ["Calendários"],
    summary: "Atualizar calendário",
    description: "Atualiza os dados de um calendário.",

    security: [
      {
        bearerAuth: []
      }
    ],

    parameters: [
      {
        name: "id_calendario",
        in: "path",
        required: true,

        schema: {
          type: "integer"
        },

        example: 1
      }
    ],

    requestBody: {
      required: true,

      content: {
        "application/json": {
          example: {
            nome: "Calendário Turma B",
            id_usuario: 2,
            id_turma: 2
          }
        }
      }
    },

    responses: {
      200: {
        description: "Calendário atualizado com sucesso"
      },

      401: {
        description: "Token inválido"
      },

      404: {
        description: "Calendário não encontrado"
      },

      500: {
        description: "Erro interno do servidor"
      }
    }
  },

  delete: {
    tags: ["Calendários"],
    summary: "Excluir calendário",
    description: "Remove um calendário do sistema.",

    security: [
      {
        bearerAuth: []
      }
    ],

    parameters: [
      {
        name: "id_calendario",
        in: "path",
        required: true,

        schema: {
          type: "integer"
        },

        example: 1
      }
    ],

    responses: {
      200: {
        description: "Calendário removido com sucesso"
      },

      401: {
        description: "Token inválido"
      },

      404: {
        description: "Calendário não encontrado"
      },

      500: {
        description: "Erro interno do servidor"
      }
    }
  }
},
"/eventos": {

  get: {
    tags: ["Eventos"],
    summary: "Listar eventos",
    description: "Retorna todos os eventos cadastrados.",

    security: [
      {
        bearerAuth: []
      }
    ],

    responses: {
      200: {
        description: "Lista de eventos"
      },

      401: {
        description: "Token inválido"
      },

      500: {
        description: "Erro interno do servidor"
      }
    }
  },

  post: {
    tags: ["Eventos"],
    summary: "Cadastrar evento",
    description: "Cria um novo evento.",

    requestBody: {
      required: true,

      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Evento"
          },

          example: {
            titulo: "Aula de React Native",
            tipo: "AULA",
            inicio: "2026-06-11 08:00:00",
            fim: "2026-06-11 12:00:00",
            id_calendario: 1,
            id_disciplina: 1,
            criado_por: 1,
            bloqueado: false,
            nome_recorrencia: "Setor",
            frequencia_recorrencia: "Segunda e Quarta"
          }
        }
      }
    },

    responses: {
      201: {
        description: "Evento cadastrado com sucesso"
      },

      400: {
        description: "Dados inválidos"
      },

      500: {
        description: "Erro interno do servidor"
      }
    }
  }
},
"/eventos/{id_evento}": {

  put: {
    tags: ["Eventos"],
    summary: "Atualizar evento",
    description: "Atualiza os dados de um evento.",

    security: [
      {
        bearerAuth: []
      }
    ],

    parameters: [
      {
        name: "id_evento",
        in: "path",
        required: true,

        schema: {
          type: "integer"
        },

        example: 1
      }
    ],

    requestBody: {
      required: true,

      content: {
        "application/json": {
          example: {
            titulo: "Aula de React Native Avançado",
            tipo: "AULA",
            inicio: "2026-06-11 08:00:00",
            fim: "2026-06-11 13:00:00",
            id_calendario: 1,
            id_disciplina: 1,
            criado_por: 1,
            bloqueado: true,
            nome_recorrencia: "Setor",
            frequencia_recorrencia: "Segunda, Quarta e Sexta"
          }
        }
      }
    },

    responses: {
      200: {
        description: "Evento atualizado com sucesso"
      },

      401: {
        description: "Token inválido"
      },

      404: {
        description: "Evento não encontrado"
      },

      500: {
        description: "Erro interno do servidor"
      }
    }
  },

  delete: {
    tags: ["Eventos"],
    summary: "Excluir evento",
    description: "Remove um evento do sistema.",

    security: [
      {
        bearerAuth: []
      }
    ],

    parameters: [
      {
        name: "id_evento",
        in: "path",
        required: true,

        schema: {
          type: "integer"
        },

        example: 1
      }
    ],

    responses: {
      200: {
        description: "Evento removido com sucesso"
      },

      401: {
        description: "Token inválido"
      },

      404: {
        description: "Evento não encontrado"
      },

      500: {
        description: "Erro interno do servidor"
      }
    }
  }
},
"/participantes": {

  get: {
    tags: ["Participantes"],
    summary: "Listar participantes dos eventos",
    description: "Retorna todos os participantes vinculados aos eventos.",

    security: [
      {
        bearerAuth: []
      }
    ],

    responses: {
      200: {
        description: "Lista de participantes"
      },

      401: {
        description: "Token inválido"
      },

      500: {
        description: "Erro interno do servidor"
      }
    }
  },

  post: {
    tags: ["Participantes"],
    summary: "Adicionar participante ao evento",
    description: "Vincula um usuário a um evento.",

    requestBody: {
      required: true,

      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ParticipanteEvento"
          },

          example: {
            id_usuario: 1,
            id_evento: 5
          }
        }
      }
    },

    responses: {
      201: {
        description: "Participante vinculado com sucesso"
      },

      400: {
        description: "Dados inválidos"
      },

      500: {
        description: "Erro interno do servidor"
      }
    }
  }
},

"/participantes/{id_participante}": {

  put: {
    tags: ["Participantes"],
    summary: "Atualizar participante",
    description: "Atualiza o vínculo de um participante com um evento.",

    security: [
      {
        bearerAuth: []
      }
    ],

    parameters: [
      {
        name: "id_participante",
        in: "path",
        required: true,

        schema: {
          type: "integer"
        },

        example: 1
      }
    ],

    requestBody: {
      required: true,

      content: {
        "application/json": {
          example: {
            id_usuario: 2,
            id_evento: 8
          }
        }
      }
    },

    responses: {
      200: {
        description: "Participante atualizado com sucesso"
      },

      401: {
        description: "Token inválido"
      },

      404: {
        description: "Participante não encontrado"
      },

      500: {
        description: "Erro interno do servidor"
      }
    }
  },

  delete: {
    tags: ["Participantes"],
    summary: "Remover participante",
    description: "Remove um participante de um evento.",

    security: [
      {
        bearerAuth: []
      }
    ],

    parameters: [
      {
        name: "id_participante",
        in: "path",
        required: true,

        schema: {
          type: "integer"
        },

        example: 1
      }
    ],

    responses: {
      200: {
        description: "Participante removido com sucesso"
      },

      401: {
        description: "Token inválido"
      },

      404: {
        description: "Participante não encontrado"
      },

      500: {
        description: "Erro interno do servidor"
      }
    }
  }
}
  }
};

export default documentacao;