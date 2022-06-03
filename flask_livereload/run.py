from app import app
from livereload import Server
from flask import render_template
    
if __name__ == '__main__':
    server = Server(app.wsgi_app)
    server.serve(port=5020)
