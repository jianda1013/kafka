FROM python:3.9

ARG DEFAULT_PATH

WORKDIR ${DEFAULT_PATH}

RUN apt-get update
RUN apt-get install -y freetds-dev unixodbc-dev

RUN pip install flask livereload kafka-python WordCloud nltk gdown

RUN echo "import nltk\nnltk.download('punkt')" > punkt.py 
RUN python punkt.py
RUN rm punkt.py

RUN gdown https://drive.google.com/uc?id=1eGAsTN1HBpJAkeVM57_C7ccp7hbgSz3_

# CMD ["python", "consumer/flask_livereload/run.py"]
CMD ["sleep", "infinity"]