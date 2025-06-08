from fastapi import FastAPI, HTTPException
from typing import List
from models import Usuario, Obra, Comentario, Avaliacao

app = FastAPI()

usuarios: List[Usuario] = []
obras: List[Obra] = []
comentarios: List[Comentario] = []
avaliacoes: List[Avaliacao] = []

# USUÁRIOS
@app.get("/usuarios/", response_model=List[Usuario])
def listar_usuarios():
    return usuarios

@app.post("/usuarios/", response_model=Usuario)
def criar_usuario(usuario: Usuario):
    usuarios.append(usuario)
    return usuario

# OBRAS
@app.get("/obras/", response_model=List[Obra])
def listar_obras():
    return obras

@app.post("/obras/", response_model=Obra)
def criar_obra(obra: Obra):
    obras.append(obra)
    return obra

@app.get("/obras/{obra_id}/", response_model=Obra)
def obter_obra(obra_id: int):
    for obra in obras:
        if obra.id == obra_id:
            return obra
    raise HTTPException(status_code=404, detail="Obra não encontrada")

# COMENTÁRIOS
@app.get("/obras/{obra_id}/comentarios/", response_model=List[Comentario])
def listar_comentarios(obra_id: int):
    comentarios_encontrados = []
    for comentario in comentarios:
        if comentario.obra_id == obra_id:
            comentarios_encontrados.append(comentario)
    return comentarios_encontrados

@app.post("/comentarios/", response_model=Comentario)
def adicionar_comentario(comentario: Comentario):
    comentarios.append(comentario)
    return comentario

# AVALIAÇÕES
@app.get("/obras/{obra_id}/avaliacoes/", response_model=List[Avaliacao])
def listar_avaliacoes(obra_id: int):
    avaliacoes_encontradas = []
    for avaliacao in avaliacoes:
        if avaliacao.obra_id == obra_id:
            avaliacoes_encontradas.append(avaliacao)
    return avaliacoes_encontradas

@app.post("/avaliacoes/", response_model=Avaliacao)
def adicionar_avaliacao(avaliacao: Avaliacao):
    avaliacoes.append(avaliacao)
    return avaliacao
