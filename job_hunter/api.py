import datetime

from flask import current_app, render_template, request

from .models import Job


@current_app.route("/")
def index():
    return render_template("index.html")


@current_app.route("/create_job", methods=["POST"])
def create_job():
    job_ = Job(url=request.form.get("url"), date_added=datetime.datetime.now())
    job_.add()

    return ""


@current_app.route("/get_job")
def get_job():
    job_ = Job.query.get(int(request.args.get("id")))

    return job_.to_dict()


@current_app.route("/get_jobs")
def get_jobs():
    return dict(jobs_=[i.to_dict() for i in Job.all()])


@current_app.route("/edit_job", methods=["POST"])
def edit_job():
    job_ = Job.query.get(int(request.form.get("id")))
    job_.url = request.form.get("url")
    job_.status = request.form.get("status")
    job_.title = request.form.get("title") or ""
    job_.organization = request.form.get("organization") or ""
    job_.notes = request.form.get("notes") or ""

    job_.edit()

    return ""


@current_app.route("/delete_job")
def delete_job():
    job_ = Job.query.get(int(request.args.get("id")))
    job_.delete()

    return ""
