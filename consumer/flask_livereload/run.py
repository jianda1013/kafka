from app import app
from livereload import Server
from flask import render_template
import requests
import json
# import threads
from WordCloud import main


    
if __name__ == '__main__':
    channels = requests.get('http://producer:1337/channel', params={'username': 'client'})
    msg = json.loads(channels.text)['msg']
    main.createPic('zrush')
    # print(msg)
    # server = Server(app.wsgi_app)
    # server.serve(host='0.0.0.0', port=5545)