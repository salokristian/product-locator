from rest_framework import permissions


class IsCreator(permissions.BasePermission):
    """Object-level permission fo only allow creators of an object to operate on it."""

    def has_object_permission(self, request, view, object):
        return request.user.pk == object.creator.pk
