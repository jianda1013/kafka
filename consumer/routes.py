import flask
import _thread
import requests
from os import environ
import wordCloud

app = flask.Flask(__name__, instance_relative_config=True)
app.config.from_object('config')

PRODUCER_PORT = environ.get('PRODUCER_PORT')
allChannel = []

def createChannel(channel, isStart):
    if channel not in allChannel:
        try:
            if not isStart:
                requests.post('http://producer:'+PRODUCER_PORT+'/channel', json = {'username': 'client', 'channel': channel})
            _thread.start_new_thread(wordCloud.createPic, (channel, ))
            allChannel.append(channel)
        except Exception as e:
            print(e)

@app.route('/')
def index():
    return flask.render_template("index.html")

@app.route('/channel', methods=['POST'])
def newChannel():
    channel = flask.request.json.get('channel')
    createChannel(channel, False)
    return {'msg': 'CHANNEL_CREATED'}

    
