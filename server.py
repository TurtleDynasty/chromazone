import flask
import flask.views
import os

app = flask.Flask(__name__)

app.secret_key = "GenericKey"  # figure out how to hide this or something idk probs not important for this project

class View(flask.views.MethodView):
    def get(self):
        return flask.render_template('index.html')

    def post(self):
        return 0
  
app.add_url_rule('/', view_func=View.as_view('main'), methods=['GET','POST'])

