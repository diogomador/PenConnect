from fastapi import FastAPI, HTTPException, Depends
from typing import List
from sqlmodel import SQLModel, create_engine, Session, select
from backend.models import Usuario, Obra, Comentario, Avaliacao
from fastapi.middleware.cors import CORSMiddleware

sqlite_file_name = "database/penconnect.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session

app = FastAPI()

# TODO: Ajustar o CORS para produção

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8001"],  # frontend React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# USUÁRIOS
@app.get("/usuarios/", response_model=List[Usuario])
def listar_usuarios(session: Session = Depends(get_session)):
    usuarios = session.exec(select(Usuario)).all()
    return usuarios

@app.post("/usuarios/", response_model=Usuario)
def criar_usuario(usuario: Usuario, session: Session = Depends(get_session)):
    session.add(usuario)
    session.commit()
    session.refresh(usuario)
    return usuario

# OBRAS
@app.get("/obras/", response_model=List[Obra])
def listar_obras(session: Session = Depends(get_session)):
    obras = session.exec(select(Obra)).all()
    return obras

@app.post("/obras/", response_model=Obra)
def criar_obra(obra: Obra, session: Session = Depends(get_session)):
    session.add(obra)
    session.commit()
    session.refresh(obra)
    return obra

@app.get("/obras/{obra_id}/", response_model=Obra)
def obter_obra(obra_id: int, session: Session = Depends(get_session)):
    obra = session.get(Obra, obra_id)
    if not obra:
        raise HTTPException(status_code=404, detail="Obra não encontrada")
    return obra

@app.put("/obras/{obra_id}/", response_model=Obra)
def atualizar_obra(obra_id: int, obra: Obra, session: Session = Depends(get_session)):
    db_obra = session.get(Obra, obra_id)
    if not db_obra:
        raise HTTPException(status_code=404, detail="Obra não encontrada")
    obra.id = obra_id
    session.merge(obra)
    session.commit()
    session.refresh(obra)
    return obra

@app.delete("/obras/{obra_id}/", response_model=Obra)
def deletar_obra(obra_id: int, session: Session = Depends(get_session)):
    db_obra = session.get(Obra, obra_id)
    if not db_obra:
        raise HTTPException(status_code=404, detail="Obra não encontrada")
    session.delete(db_obra)
    session.commit()
    return db_obra

# COMENTÁRIOS
@app.get("/obras/{obra_id}/comentarios/", response_model=List[Comentario])
def listar_comentarios(obra_id: int, session: Session = Depends(get_session)):
    comentarios = session.exec(select(Comentario).where(Comentario.obra_id == obra_id)).all()
    return comentarios

@app.post("/comentarios/", response_model=Comentario)
def adicionar_comentario(comentario: Comentario, session: Session = Depends(get_session)):
    session.add(comentario)
    session.commit()
    session.refresh(comentario)
    return comentario

@app.delete("/comentarios/{comentario_id}/", response_model=Comentario)
def deletar_comentario(comentario_id: int, session: Session = Depends(get_session)):
    db_comentario = session.get(Comentario, comentario_id)
    if not db_comentario:
        raise HTTPException(status_code=404, detail="Comentário não encontrado")
    session.delete(db_comentario)
    session.commit()
    return db_comentario

# AVALIAÇÕES
@app.get("/obras/{obra_id}/avaliacoes/", response_model=List[Avaliacao])
def listar_avaliacoes(obra_id: int, session: Session = Depends(get_session)):
    avaliacoes = session.exec(select(Avaliacao).where(Avaliacao.obra_id == obra_id)).all()
    return avaliacoes

@app.post("/avaliacoes/", response_model=Avaliacao)
def adicionar_avaliacao(avaliacao: Avaliacao, session: Session = Depends(get_session)):
    session.add(avaliacao)
    session.commit()
    session.refresh(avaliacao)
    return avaliacao

@app.delete("/avaliacoes/{avaliacao_id}/", response_model=Avaliacao)
def deletar_avaliacao(avaliacao_id: int, session: Session = Depends(get_session)):
    db_avaliacao = session.get(Avaliacao, avaliacao_id)
    if not db_avaliacao:
        raise HTTPException(status_code=404, detail="Avaliação não encontrada")
    session.delete(db_avaliacao)
    session.commit()
    return db_avaliacao