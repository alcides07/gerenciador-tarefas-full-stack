CREATE TABLE tarefa (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    prioridade VARCHAR(25) NOT NULL,
    situacao VARCHAR(50) NOT NULL,
    data DATE NOT NULL,
    responsavel_id INT NOT NULL,
    CONSTRAINT fk_responsavel FOREIGN KEY (responsavel_id) REFERENCES responsavel (id)
)