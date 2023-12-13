--CREATE DATABASE estoque;
--\c estoque

--SET datestyle = 'ISO,DMY';

CREATE TABLE usuario
(
    idu SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cargo VARCHAR(50) NOT NULL,
    telefone VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    senha VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    CONSTRAINT uk_usuario UNIQUE (email)
);

CREATE TABLE produto (
    idp SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(500),
    preco DECIMAL(10, 2) NOT NULL,
    quantidade_estoque INTEGER NOT NULL,
    CONSTRAINT uk_produto UNIQUE (nome)  
);

CREATE TABLE cliente (
    idc SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(200) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    tipo VARCHAR(15) NOT NULL,
    cpf VARCHAR(11),
    cnpj VARCHAR(14),
    CONSTRAINT uk_cliente UNIQUE (email, cpf, cnpj)
);

CREATE TABLE pedido (
    codp SERIAL PRIMARY KEY,
    idc INTEGER NOT NULL,
    idu INTEGER NOT NULL,
    estado VARCHAR(50) NOT NULL,
    datap DATE,
    CONSTRAINT fk_pedido_cliente FOREIGN KEY (idc) REFERENCES cliente(idc) ON DELETE CASCADE,
    CONSTRAINT fk_pedido_usuario FOREIGN KEY (idu) REFERENCES usuario(idu) ON DELETE CASCADE
);

CREATE TABLE itempedido (
    idi SERIAL PRIMARY KEY,
    codp INTEGER NOT NULL,
    idp INTEGER NOT NULL,
    quantidade_pedido INTEGER NOT NULL,
    CONSTRAINT fk_itempedido_produto FOREIGN KEY (idp) REFERENCES produto(idp) ON DELETE CASCADE,
    CONSTRAINT fk_itempedido_pedido FOREIGN KEY (codp) REFERENCES pedido(codp) ON DELETE CASCADE
);
