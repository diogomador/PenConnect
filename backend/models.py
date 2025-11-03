from sqlmodel import SQLModel, Field
from typing import Optional

class Usuario(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nome: str
    email: str
    senha: str
    bio: Optional[str] = None


class Obra(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    titulo: str
    conteudo: str
    autor: str  # nome do autor

class Comentario(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    obra_id: int
    autor: str  # nome
    texto: str

class Avaliacao(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    obra_id: int
    avaliador: str  # nome
    nota: int = Field(ge=0, le=10)