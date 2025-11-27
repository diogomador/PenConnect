from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List

class Usuario(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nome: str
    email: str
    senha: str
    bio: Optional[str] = None

    obras: List["Obra"] = Relationship(back_populates="autor")


class Obra(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    titulo: str
    descricao: str
    conteudo: str

    autor_id: int = Field(foreign_key="usuario.id")
    autor: Optional[Usuario] = Relationship(back_populates="obras")

# Schemas para criação/edição
class ObraCreate(SQLModel):
    titulo: str
    descricao: str
    conteudo: str
    autor_id: int

class ObraUpdate(SQLModel):
    titulo: Optional[str] = None
    descricao: Optional[str] = None
    conteudo: Optional[str] = None


class Comentario(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    obra_id: int = Field(foreign_key="obra.id")
    autor: str
    texto: str


class Avaliacao(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    obra_id: int = Field(foreign_key="obra.id")
    avaliador: str
    nota: int = Field(ge=0, le=10)
