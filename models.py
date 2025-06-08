from pydantic import BaseModel, Field
from typing import Optional

class Usuario(BaseModel):
    username: str
    nome: str
    bio: Optional[str] = None

class Obra(BaseModel):
    id: int
    titulo: str
    conteudo: str
    autor: str  # username do autor

class Comentario(BaseModel):
    obra_id: int
    autor: str  # username
    texto: str

class Avaliacao(BaseModel):
    obra_id: int
    avaliador: str  # username
    nota: int = Field(..., ge=0, le=10)
