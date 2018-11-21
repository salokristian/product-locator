## Grocery Store Product Locator Backend

### Structure

The backend consists of two apps, `api` and `users`. They contain the api endpoints, views and models, and the custom user model, respectively.

### Endpoints

- POST /api/token for fetching a JWT token
- GET /api/stores for fetching all stores
- GET /api/stores/:id for fetching a store's data
- GET /api/stores/:id/products for fetching a store's products
- POST /api/shopping-lists/me for creating a new shopping list (requires valid JWT)
- GET /api/shopping-lists/me for getting all a user's shopping lists (requires valid JWT)
- GET /api/shopping-lists/:id for fetching a specific shopping list (requires valid JWT)
- DELETE /api/shopping-lists/:id for deleting a shopping list (requires valid JWT)

### Setup

The Django backend and PostgreSQL database are run in a docker container, which is exposed to the operating system on port 8000. Docker version >= 3.6 and Docker compose are required to run the container. If you are running the container for the first time, database migrations must be run before using the container.

```
docker-compose run web python /code/manage.py migrate
```

Also, creating a superuser account is useful, as it enables using django admin.

```
docker-compose run web python /code/manage.py createsuperuser
```

Then, the container can be started.

```
docker-compose up --build
```

Note that at this point the database doesn't have any data. [Django admin](http://localhost:8000/admin) is an easy way to insert some test data.

### Linting

The project code is linted with flake8 and formatted with autopep8, so configure your editor to use them. It is a good idea to set the editor to autoformat the code on save with autopep8.
