import config
from JobTracker import create_app

app = create_app(config)

if __name__ == "__main__":
    app.run()
