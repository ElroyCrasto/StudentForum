from . import Database as db

class TestTable(db.Model):
    #Columns
    ID = db.Column("ID",db.Integer, primary_key=True)
    Name = db.Column("Name", db.String)