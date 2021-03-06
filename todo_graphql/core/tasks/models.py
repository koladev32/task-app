from django.db import models
from core.nodes.models import Node


class Task(models.Model):
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True)
    node = models.ForeignKey(Node, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    body = models.TextField()
    is_completed = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
