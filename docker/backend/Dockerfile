FROM python:3.8.3-alpine

WORKDIR /app
ADD ./backend/requirements.txt /manateewatch/backend/

RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r /manateewatch/backend/requirements.txt


ADD ./docker /manateewatch/docker
ADD ./backend /manateewatch/backend


