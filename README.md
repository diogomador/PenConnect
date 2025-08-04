# Documentação do Projeto: Projeto PenConnect
## 1. Visão Geral
<b>Tecnologia Utilizada:</b>

- Python
- FastAPI
- Uvicorn

<b>Descrição:</b> Implementação de uma plataforma digital em que escritores, em especial os amadores, sejam capazes de compartilhar suas histórias com outras pessoas. <br>
<b>Objetivo: </b> Facilitar a interação entre escritores e leitores.

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
## 3. Etapas de Entrega (Cronograma Detalhado)
### Etapa 1: 08/06/25
### Etapa 2: 25/06/25
### Etapa 3: 16/07/25
### Etapa 4: 25/07/25
### Etapa 5: 27/07/25

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
