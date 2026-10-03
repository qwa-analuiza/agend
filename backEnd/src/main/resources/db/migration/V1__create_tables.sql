CREATE TABLE clientes (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          nome VARCHAR(150) NOT NULL,
                          telefone VARCHAR(20) NOT NULL,
                          email VARCHAR(150)
);

CREATE TABLE servicos (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          nome VARCHAR(150) NOT NULL,
                          descricao VARCHAR(500),
                          preco DECIMAL(10,2) NOT NULL,
                          duracao INT NOT NULL,
                          ativo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE horarios_disponiveis (
                                      id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                      data DATE NOT NULL,
                                      hora_inicio TIME NOT NULL,
                                      hora_fim TIME NOT NULL,
                                      disponivel BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE agendamentos (
                              id BIGINT AUTO_INCREMENT PRIMARY KEY,
                              cliente_id BIGINT NOT NULL REFERENCES clientes(id),
                              servico_id BIGINT NOT NULL REFERENCES servicos(id),
                              horario_id BIGINT NOT NULL UNIQUE REFERENCES horarios_disponiveis(id),
                              status VARCHAR(20) NOT NULL,
                              observacao VARCHAR(500)
);