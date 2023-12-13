INSERT INTO usuario (nome, cargo, telefone, email, senha, tipo) VALUES 
('kevin', 'top', '1234567890', 'kevincadena1108@gmail.com', '$2a$08$6RIW9a4MHzbw1wV1V43zXutaEzDkAza5BQXr5meqsBJalVUo8gQHa', 'ADMINISTRADOR'),
('Usuario1', 'Cargo1', '1234567890', 'usuario1@email.com', '$2a$08$02BHPm7sHqnRYeEc9EP.TO51IdhOP7fA2pIVnD2XCPHNT6FurwX/G', 'FUNCIONARIO'),
('Usuario2', 'Cargo2', '1234567891', 'usuario2@email.com', '$2a$08$02BHPm7sHqnRYeEc9EP.TO51IdhOP7fA2pIVnD2XCPHNT6FurwX/G', 'FUNCIONARIO'),
('Usuario3', 'Cargo3', '1234567892', 'usuario3@email.com', '$2a$08$02BHPm7sHqnRYeEc9EP.TO51IdhOP7fA2pIVnD2XCPHNT6FurwX/G', 'FUNCIONARIO'),
('Usuario4', 'Cargo4', '1234567893', 'usuario4@email.com', '$2a$08$02BHPm7sHqnRYeEc9EP.TO51IdhOP7fA2pIVnD2XCPHNT6FurwX/G', 'FUNCIONARIO'),
('Usuario5', 'Cargo5', '1234567894', 'usuario5@email.com', '$2a$08$02BHPm7sHqnRYeEc9EP.TO51IdhOP7fA2pIVnD2XCPHNT6FurwX/G', 'FUNCIONARIO'),
('Usuario6', 'Cargo6', '1234567895', 'usuario6@email.com', '$2a$08$02BHPm7sHqnRYeEc9EP.TO51IdhOP7fA2pIVnD2XCPHNT6FurwX/G', 'ADMINISTRADOR'),
('Usuario7', 'Cargo7', '1234567896', 'usuario7@email.com', '$2a$08$02BHPm7sHqnRYeEc9EP.TO51IdhOP7fA2pIVnD2XCPHNT6FurwX/G', 'ADMINISTRADOR'),
('Usuario8', 'Cargo8', '1234567897', 'usuario8@email.com', '$2a$08$02BHPm7sHqnRYeEc9EP.TO51IdhOP7fA2pIVnD2XCPHNT6FurwX/G', 'ADMINISTRADOR'),
('Usuario9', 'Cargo9', '1234567898', 'usuario9@email.com', '$2a$08$02BHPm7sHqnRYeEc9EP.TO51IdhOP7fA2pIVnD2XCPHNT6FurwX/G', 'ADMINISTRADOR'),
('Usuario10', 'Cargo10', '1234567899', 'usuario10@email.com', '$2a$08$02BHPm7sHqnRYeEc9EP.TO51IdhOP7fA2pIVnD2XCPHNT6FurwX/G', 'ADMINISTRADOR');

-- SENHAS SÃO TODAS = Senha123 

INSERT INTO produto (nome, descricao, preco, quantidade_estoque) VALUES 
('Produto1', 'Descrição do Produto1', 65.00, 50),
('Produto2', 'Descrição do Produto2', 25.00, 40),
('Produto3', 'Descrição do Produto3', 30.00, 30),
('Produto4', 'Descrição do Produto4', 17.00, 20),
('Produto5', 'Descrição do Produto5', 40.00, 10),
('Produto6', 'Descrição do Produto6', 20.00, 60),
('Produto7', 'Descrição do Produto7', 50.00, 70),
('Produto8', 'Descrição do Produto8', 15.00, 80),
('Produto9', 'Descrição do Produto9', 10.00, 90),
('Produto10', 'Descrição do Produto10', 12.00, 100);

INSERT INTO cliente (nome, endereco, email, telefone, tipo, cpf, cnpj) VALUES 
('Cliente1', 'Endereço do Cliente1', 'cliente1@email.com', '12345678901', 'PESSOA FISICA', '12345678901', NULL),
('Cliente2', 'Endereço do Cliente2', 'cliente2@email.com', '12345678911', 'PESSOA FISICA', '12345678902', NULL),
('Cliente3', 'Endereço do Cliente3', 'cliente3@email.com', '12345678921', 'PESSOA JURIDICA', NULL, '12345678901234'),
('Cliente4', 'Endereço do Cliente4', 'cliente4@email.com', '12345678931', 'PESSOA JURIDICA', NULL, '12345678901235'),
('Cliente5', 'Endereço do Cliente5', 'cliente5@email.com', '12345678941', 'PESSOA FISICA', '12345678905', NULL),
('Cliente6', 'Endereço do Cliente6', 'cliente6@email.com', '12345678951', 'PESSOA FISICA', '12345678906', NULL),
('Cliente7', 'Endereço do Cliente7', 'cliente7@email.com', '12345678961', 'PESSOA JURIDICA', NULL, '12345678901236'),
('Cliente8', 'Endereço do Cliente8', 'cliente8@email.com', '12345678971', 'PESSOA JURIDICA', NULL, '12345678901237'),
('Cliente9', 'Endereço do Cliente9', 'cliente9@email.com', '12345678981', 'PESSOA FISICA', '12345678909', NULL),
('Cliente10', 'Endereço do Cliente10', 'cliente10@email.com', '12345678991', 'PESSOA FISICA', '12345678910', NULL);

INSERT INTO pedido (idc, idu, estado, datap) VALUES 
(1, 1, 'Em Processamento', '2023-12-01'),
(2, 2, 'Em Processamento', '2023-12-02'),
(3, 3, 'Enviado', '2023-12-03'),
(4, 4, 'Enviado', '2023-12-04'),
(5, 5, 'Entregue', '2023-12-05'),
(6, 6, 'Entregue', '2023-12-06'),
(7, 7, 'Cancelado', '2023-12-07'),
(8, 8, 'Cancelado', '2023-12-08'),
(9, 9, 'Em Processamento', '2023-12-09'),
(10, 10, 'Em Processamento', '2023-12-10');

INSERT INTO itempedido (codp, idp, quantidade_pedido) VALUES 
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5),
(6, 6, 6),
(7, 7, 7),
(8, 8, 8),
(9, 9, 9),
(10, 10, 10);
