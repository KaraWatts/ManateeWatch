#set base image
FROM python:3.11-slim

# set working directory
WORKDIR /manateewatch/backend
ADD ./backend/requirements.txt  /manateewatch/backend/

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r /manateewatch/backend/requirements.txt

# add project files
ADD ./backend /manateewatch/backend

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]

# # Make entrypoint script executable
# RUN chmod +x backend/docker/wsgi-entrypoint.sh

# # Set entrypoint
# ENTRYPOINT ["backend/docker/wsgi-entrypoint.sh"]