# Documentação do Projeto: Projeto PenConnect
## 1. Visão Geral
<b>Tecnologia Utilizada:</b>

- Python
- FastAPI
- Uvicorn

<b>Descrição:</b> Implementação de uma plataforma digital em que escritores, em especial os amadores, sejam capazes de compartilhar suas histórias com outras pessoas. <br>

## 2. Descrição Detalhada do Projeto
### O que é projeto?
Devido uma grande quantidade de indivíduos que se interessam pelo mundo da literatura, que têm vontade de escrevers suas próprias obras, propomos a criação de uma rede social voltada para escritores, onde estes publicarão suas obras. Outros usuários poderão ler e avaliar - dando feedbacks, atribuindo notas e fazendo comentários públicos.
### 2.1 Funcionalidades Principais
- <b>Funcionalidade 01:</b> Escrever ou fazer upload de textos (obras).
- <b>Funcionalidade 02:</b> Publicar textos para outros usuários.
- <b>Funcionalidade 03:</b> Visualizar textos publicados por outros autores.
- <b>Funcionalidade 04:</b> Comentar publicamente nos textos de outros autores.
- <b>Funcionalidade 05:</b> Avaliar textos de outros autores, atribuindo notas e feedbacks.
### 2.2 Arquitetura do Código
```
PenConnect/
├── main.py            # Ponto de entrada (inicialização)
├── models.py          # Modelos SQLModel (estrutura das tabelas)
├── database/schema.sql # Script SQL para criação das tabelas
├── init_db.py         # Script para inicializar o banco de dados
```
## Sobre o projeto
### Qual o objetivo principal?
Facilitar a interação entre escritores e leitores.
### Para quem ele é voltado?
O projeto foca em entusiastas do mundo literário, dando atenção principalmente para escritores iniciantes que buscam se estabelecer nesse mundo. Esse tipo de grupo costuma valorizar elementos que remetam aos livros, como cores mais terrosas e fontes serifadas. Ainda assim, não recusam um estilo mais moderno e minimalista.
### Quais elementos irão compor a identidade visual?
- <b>Cores terrosas:</b> dialoga com a preferência de leitores por livros com fundo amarelado, mais confortável para leitura.
- <b>Fontes serifadas:</b> estilo de tipografia já estabelecido no mundo literário, além de ser o mais confortável para leitura de textos grandes.
- <b> Caneta tinteiro:</b> faz referência ao nome da plataforma (pen).

## 4. Como rodar o projeto

1. Instale as dependências:
   ```
   pip install fastapi uvicorn sqlmodel
   ```

2. Inicialize o banco de dados:
   ```
   python init_db.py
   ```

3. Execute a API:
   ```
   uvicorn main:app --reload
   ```

Acesse a documentação interativa em [http://localhost:8000/docs](http:localhost:8000/docs)
