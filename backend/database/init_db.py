import sqlite3

def init_db():
    with open("database/schema.sql", "r", encoding="utf-8") as f:
        schema = f.read()
    conn = sqlite3.connect("database/penconnect.db")
    conn.executescript(schema)
    conn.close()

if __name__ == "__main__":
    init_db()
    print("Banco de dados inicializado com sucesso!")