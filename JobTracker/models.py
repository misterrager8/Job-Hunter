import datetime

from flask_login import UserMixin
from sqlalchemy import Column, Integer, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from JobTracker import db


class User(UserMixin, db.Model):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(Text)
    password = Column(Text)
    date_created = Column(DateTime)
    jobapps = relationship("Jobapp", lazy="dynamic")

    def __init__(self, **kwargs):
        super(User, self).__init__(**kwargs)


class Jobapp(db.Model):
    __tablename__ = "jobapps"

    id = Column(Integer, primary_key=True)
    user = Column(Integer, ForeignKey("users.id"))
    url = Column(Text)
    employer = Column(Text)
    date_applied = Column(DateTime)
    status = Column(Text)

    def __init__(self, url: str,
                 employer: str,
                 date_applied: datetime.datetime = datetime.datetime.now(),
                 status: str = "Pending Response", **kwargs):
        self.url = url
        self.employer = employer
        self.date_applied = date_applied
        self.status = status
        super(Jobapp, self).__init__(**kwargs)
