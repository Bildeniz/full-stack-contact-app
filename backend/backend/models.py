from peewee import SqliteDatabase, Model, CharField

db = SqliteDatabase('database.db')
db.connect()

class BaseModel(Model):
    class Meta:
        database = db

class Contact(BaseModel):
    first_name = CharField(max_length=160)
    last_name = CharField(max_length=80)
    email = CharField(max_length=100, unique=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email
        }