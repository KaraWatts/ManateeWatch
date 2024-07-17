#!/bin/sh

until cd /manateewatch/backend
do
    echo "Waiting for server volume..."
done

until ./manage.py migrate
do
    echo "Waiting for db to be ready..."
    sleep 2
done

./manage.py collectstatic --noinput

gunicorn manateewatch_proj.wsgi --bind 0.0.0.0:8000 --workers 4 --threads 4


########################################################################
# The above script is waiting till server volume and database is ready. 
# It runs migration on database and collects static files.
#  It runs gunicorn server with IP address 0.0.0.0 and (docker default IP) and port 8000.

# Workers and thread are set to 4 each. This number is based on the number of CPU cores available on the server.
# As a general rule, if you are deploying application to machine with 1 CPU core, then you can use 4 workers.  
# Per gunicorn docs default thread = 1 or you can specify the number of threads in the 2to4 * (num_cores) - in our case, there are 4 threads per worker. 
# This means that we can process 4 * 4 = 16 concurrent requests