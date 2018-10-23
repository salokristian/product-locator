# Grocery Store Product Locator Backend

### Setup

The Django backend and PostgreSQL database are run in a docker container, which is exposed to the operating system on port 8000. Docker version >= 3.6 and Docker compose are required to run the container. The container is spun off as follows:

```
docker-compose up --build
```

The project code is linted with flake8 and formatted with autopep8, so configure your editor to use them. It is a good idea to set the editor to autoformat the code on save with autopep8.
