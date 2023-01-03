from . import db


class Job(db.Model):
    __tablename__ = "jobs"

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.Text)
    date_added = db.Column(db.DateTime)
    status = db.Column(db.Text, default="pending")

    def __init__(self, **kwargs):
        super(Job, self).__init__(**kwargs)

    @classmethod
    def all(cls):
        return Job.query.order_by(db.text("date_added desc")).all()

    def add(self):
        db.session.add(self)
        db.session.commit()

    def edit(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def to_dict(self):
        return dict(
            id=self.id,
            url=self.url,
            date_added=self.date_added.strftime("%-B %-d, %Y @ %-I:%M %p"),
            status=self.status,
        )
