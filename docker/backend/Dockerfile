FROM python:3.8

WORKDIR /manateewatch
ADD ./backend/requirements.txt  /manateewatch/backend/

RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r /manateewatch/backend/requirements.txt


ADD ./docker /manateewatch/docker
ADD ./backend /manateewatch/backend


