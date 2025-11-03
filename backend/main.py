from fastapi import FastAPI, HTTPException, Depends, Body
from typing import List
from sqlmodel import SQLModel, create_engine, Session, select
from models import Usuario, Obra, Comentario, Avaliacao
from fastapi.middleware.cors import CORSMiddleware
import os

# Criar pasta do banco se não existir
os.makedirs("database", exist_ok=True)

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

# Criar banco ao iniciar
create_db_and_tables()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------ USUÁRIOS ------------------

@app.get("/usuarios/", response_model=List[Usuario])
def listar_usuarios(session: Session = Depends(get_session)):
    return session.exec(select(Usuario)).all()

@app.post("/usuarios/", response_model=Usuario)
def criar_usuario(usuario: Usuario, session: Session = Depends(get_session)):
    session.add(usuario)
    session.commit()
    session.refresh(usuario)
    return usuario

# ------------------ LOGIN ------------------

@app.post("/login/")
def login(data: dict = Body(...), session: Session = Depends(get_session)):
    email = data.get("email")
    senha = data.get("senha")

    statement = select(Usuario).where(
        Usuario.email == email,
        Usuario.senha == senha
    )
    usuario = session.exec(statement).first()

    if not usuario:
        raise HTTPException(status_code=401, detail="Email ou senha inválidos")

    return {"message": "Login efetuado com sucesso!", "usuario": usuario}

# ------------------ OBRAS ------------------

@app.get("/obras/", response_model=List[Obra])
def listar_obras(session: Session = Depends(get_session)):
    return session.exec(select(Obra)).all()

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

# ------------------ COMENTÁRIOS ------------------

@app.get("/obras/{obra_id}/comentarios/", response_model=List[Comentario])
def listar_comentarios(obra_id: int, session: Session = Depends(get_session)):
    return session.exec(select(Comentario).where(Comentario.obra_id == obra_id)).all()

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

# ------------------ AVALIAÇÕES ------------------

@app.get("/obras/{obra_id}/avaliacoes/", response_model=List[Avaliacao])
def listar_avaliacoes(obra_id: int, session: Session = Depends(get_session)):
    return session.exec(select(Avaliacao).where(Avaliacao.obra_id == obra_id)).all()

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
