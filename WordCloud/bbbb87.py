from kafka import KafkaConsumer
from threading import Thread
from wordcloud import WordCloud
import matplotlib.pyplot as plt
import matplotlib.animation as anim
from PIL import Image
import numpy as np
from os import path

import nltk
#nltk.download('punkt')
from wordcloud import WordCloud

def listToString(s): 
    
    # initialize an empty string
    str1 = "" 
    
    # traverse in the string  
    for ele in s: 
        str1 += ele  
    
    return str1 


import json
import time
from kafka import KafkaConsumer
import matplotlib.pyplot as plt

consumer = KafkaConsumer('bbbb87',client_id= 'client2', group_id= 'group-python2', bootstrap_servers= ['localhost:9092'])

index = 0
while True:

    msg = consumer.poll(timeout_ms=10) #從kafka獲取數據
    world_cloud = []
    try:
        if msg:
            msg = list(msg.values())# 解析數據為list
            for i in range(len(msg)):
                for j in range(len(msg[i])):
                    print(msg[i][j].value.decode('utf-8'))
                    world_cloud.append(msg[i][j].value.decode('utf-8').split(':')[1])
    
                print('\n')
                text = ' '.join(nltk.word_tokenize(listToString(world_cloud)))
                cloud = WordCloud(font_path='./TaipeiSansTCBeta-Regular.ttf').generate(text)
                cloud.to_file("../flask_livereload/app/static/bbbb87_WC.png")
    except:
        print("1111")
            
    time.sleep(60*1)
    index+=1
    print('------------poll index is {}---------------'.format(index))

