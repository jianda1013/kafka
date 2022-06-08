from routes import app
from livereload import Server
from flask import render_template
import requests
import json
import _thread
import wordCloud
import time
from os import environ

PRODUCER_PORT = environ.get('PRODUCER_PORT')
PORT = environ.get('CONSUMER_PORT')

    
if __name__ == '__main__':
    while True:
        try:
            channels = requests.get('http://producer:'+PRODUCER_PORT+'/channel', params={'username': 'client'})
            print(channels.text)
            break
        except Exception as e:
            print(e)
        finally:
            print('connecting to backend server')
        time.sleep(5)
    msg = json.loads(channels.text)['msg']
    for item in msg:
        _thread.start_new_thread(wordCloud.createPic, (item, ))
    server = Server(app.wsgi_app)
    server.serve(host='0.0.0.0', port=PORT)