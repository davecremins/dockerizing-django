## SERIOUS UPDATE REQUIRED
- How to get running on Windows or Unix type OS
- Using `Make` commands

## Comms Between Different Containers

Featuring:

- Nginx: Forwards requests to Django and Node
- Django: Serves the web interface component
- Postgres: Persistence layer to store all the data
- Redis: Message broker between Django and Node using Pub/Sub pattern
- Node: Express server for socket comms and subscriber to Redis Pub/Sub

### Instructions

1. Build images - `docker-compose build`
1. Start service containers - `docker-compose up`
1. Create django migrations - `docker-compose run web /usr/local/bin/python manage.py migrate`
1. Browse to `http://localhost` and send a message 
1. Verify that the `node` container prints the message received from the redis broker
1. Remove containers - `docker-compose down`