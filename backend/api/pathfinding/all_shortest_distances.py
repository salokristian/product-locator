import api.pathfinding.dijkstra as dijkstra


def get_shortest_distances(shelves, floor):
    graph = dijkstra.Graph()

    x_dimensions = [y for x in floor.points for y in x]
