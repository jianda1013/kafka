import flask

app = flask.Flask(__name__, instance_relative_config=True)
app.config.from_object('config')

@app.route('/')
def index():
    return flask.render_template("index.html")
