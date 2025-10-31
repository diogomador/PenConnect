from sqlmodel import SQLModel, Field
from typing import Optional

class Usuario(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str
    nome: str
    senha: str
    bio: Optional[str] = None


class Obra(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    titulo: str
    conteudo: str
    autor: str  # username do autor

class Comentario(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    obra_id: int
    autor: str  # username
    texto: str

class Avaliacao(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    obra_id: int
    avaliador: str  # username
    nota: int = Field(ge=0, le=10)