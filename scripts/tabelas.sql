CREATE DATABASE estoque;
\c estoque

SET datestyle = 'ISO,DMY';

CREATE TABLE usuario
(
    idu SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cargo VARCHAR(50) NOT NULL,
    telefone VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    senha VARCHAR(50) NOT NULL,
    tipo VARCHAR(50) NOT NULL
);

CREATE TABLE produto (
    idp SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(500),
    preco DECIMAL(10, 2) NOT NULL,
    quantidade INTEGER NOT NULL
);

CREATE TABLE cliente (
    idc SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(200) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    tipo VARCHAR(15) NOT NULL
);

CREATE TABLE pedido (
    codp SERIAL PRIMARY KEY,
    idp INTEGER NOT NULL,
    idc INTEGER NOT NULL,
    idu INTEGER NOT NULL,
    estado VARCHAR(50) NOT NULL,
    quantidade INTEGER NOT NULL,
    dth_venda TIMESTAMP NOT NULL,
    CONSTRAINT fk_pedido_produto FOREIGN KEY (idp) REFERENCES produto(idp),
    CONSTRAINT fk_pedido_cliente FOREIGN KEY (idc) REFERENCES cliente(idc),
    CONSTRAINT fk_pedido_usuario FOREIGN KEY (idu) REFERENCES usuario(idu)
);
