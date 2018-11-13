def get_optimal_route(shelves, floor):
    """
    A function for calculating the optimum route for visiting a set of shelves
    which are located in a single floor.

    The route is calculated by first running Dijkstra's algo to obtain the shortest
    routes between all shelves. This reduces the problem to the famous Traveling Salesman.
    Then, Google's TSP algorithm is run on the reduced data to obtain the (near)-optimal route.
    """
