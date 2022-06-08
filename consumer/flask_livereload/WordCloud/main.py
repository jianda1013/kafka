from kafka import KafkaConsumer
from wordcloud import WordCloud
import nltk
import time

def listToString(s): 
    str1 = ""  
    for ele in s: 
        str1 += ele
    return str1 

def msgToPic(msg, world_cloud, channel):
    for i in range(len(msg)):
        print(msg[i].value.decode('utf-8'))
        world_cloud.append(msg[i].value.decode('utf-8').split(':')[1])
    try:
        text = ' '.join(nltk.word_tokenize(listToString(world_cloud)))
    except Exception as e:
        print('nltk error accur : ', e)
    try:
        cloud = WordCloud(font_path='../../TaipeiSansTCBeta-Regular.ttf').generate(text)
    except Exception as e:
        print('workCloud error accur : ', e)
    try:
        cloud.to_file("../flask_livereload/app/static/" + channel + "_WC.png")
    except Exception as e:
        print('fileGen error accur : ', e)


def createPic(channel):
    consumer = KafkaConsumer(channel, client_id= 'reciever', bootstrap_servers= ['broker:29092'])
    world_cloud = []
    while True:
        msg = consumer.poll(timeout_ms=10) #從kafka獲取數據
        if msg:
            msg = list(msg.values())# 解析數據為list
            for i in range(len(msg)):
                msgToPic(msg[i], world_cloud, channel)
        # time.sleep(10) # 10sec refresh

if __name__ == "__main__":
    createPic('zrush')
    
