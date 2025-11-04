# **Relatório POS**

# **Projeto:** PenConnect

## Uma plataforma digital em que escritores, em especial os amadores, sejam capazes de compartilhar suas histórias com outras pessoas.

# **Link para repositório:**
 https://github.com/diogomador/PenConnect.git

# **Integrantes:**

* Ana Clara  
* Diôgo Amador  
* Gustavo Henrique   
* Rafael Araújo

## Sobre as rotas

**Listar usuários**  
**Input: -**

**Output:**
```
[
  {
    "id": 0,
    "username": "string",
    "nome": "string",
    "senha": "string",
    "bio": "string"
  }
]
```

**Criar usuário**  
**Input:**
```
{
  "id": 0,
  "username": "string",
  "nome": "string",
  "senha": "string",
  "bio": "string"
}
```
**Output:** 
```
{
  "id": 0,
  "username": "string",
  "nome": "string",
  "senha": "string",
  "bio": "string"
}
```

**Listar obras**  
**Input: -**

**Output:**
```
[
  {
    "id": 0,
    "titulo": "string",
    "conteudo": "string",
    "autor": "string"
  }
]
```

**Criar obra**  
**Input:**
```
{
  "id": 0,
  "titulo": "string",
  "conteudo": "string",
  "autor": "string"
}
```

**Output:**
```
{
  "id": 0,
  "titulo": "string",
  "conteudo": "string",
  "autor": "string"
}
```

**Obter obra**  
**Input:**
```obra_id```

**Output:**
```
{
  "id": 0,
  "titulo": "string",
  "conteudo": "string",
  "autor": "string"
}
```

**Atualizar obra**  
**Input:**
```
obra_id
{
  "id": 0,
  "titulo": "string",
  "conteudo": "string",
  "autor": "string"
}
```
**Output:**
```
{
  "id": 0,
  "titulo": "string",
  "conteudo": "string",
  "autor": "string"
}
```

**Deletar obra**  
**Input:**
```obra_id```

**Output:**
```
{
  "id": 0,
  "titulo": "string",
  "conteudo": "string",
  "autor": "string"
}
```

**Listar comentários**  
**Input:**
```obra_id```

**Output:**
```
[
  {
    "id": 0,
    "obra_id": 0,
    "autor": "string",
    "texto": "string"
  }
]
```

**Adicionar comentário**  
**Input:**
```
{
  "id": 0,
  "obra_id": 0,
  "autor": "string",
  "texto": "string"
}
```

**Output:**
```
{
  "id": 0,
  "obra_id": 0,
  "autor": "string",
  "texto": "string"
}
```

**Deletar comentário**  
**Input:**
```comentario_id```

**Output:**
```
{
  "id": 0,
  "obra_id": 0,
  "autor": "string",
  "texto": "string"
}
```

**Listar avaliações**  
**Input:**
```obra_id```

**Output:**
```
[
  {
    "id": 0,
    "obra_id": 0,
    "avaliador": "string",
    "nota": 10
  }
]
```

**Adicionar avaliação**  
**Input:**
```
{
  "id": 0,
  "obra_id": 0,
  "avaliador": "string",
  "nota": 10
}
```

**Output:**
```
{
  "id": 0,
  "obra_id": 0,
  "avaliador": "string",
  "nota": 10
}
```

**Deletar avaliação**  
**Input:**
```avaliacao_id```

**Output:**
```
{
  "id": 0,
  "obra_id": 0,
  "avaliador": "string",
  "nota": 10
}
```

## O que falta ser implementado

Há, ainda, a necessidade de implementar as rotas voltadas ao sistema de comunidades e filtragem de obras de acordo com as preferências de um usuário

## Prazo estimado de conclusão

Com a grande quantidade de projetos estudantis de grande relevância e que, consequentemente, exigiram nossa atenção ao extremo - aliada a chegada iminente do Exame Nacional do Ensino Médio (ENEM) - ocorreu um atraso considerável no que diz respeito ao desenvolvimento do sistema. Por isso, norteando-se a partir do que foi citado anteriormente, espera-se concluir o back-end do projeto até o dia 28/11/25.

## Fluxo de Login/Logout

A API ainda não está finalizada. Dentre as funcionalidades que faltam ser definitivamente implementadas, está a de Login e Logout do sistema. Por isso, tem-se, atualmente, apenas um esboço de como irá funcionar. Segue abaixo.
Login: usuário insere suas credenciais utilizadas durante a criação da conta (username, email... + senha) -> API verifica a existência de um usuário com as credenciais fornecidas -> Caso a compatibilidade entre as credenciais fornecidas e cadastradas seja válida, inicia-se uma sessão com o usuário em específico.
Logout: usuário clica num botão para desconectar a sua conta -> É encerrada a sessão do usuário em questão.

