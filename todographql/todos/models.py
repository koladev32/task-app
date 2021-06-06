from django.db import models


class Todo(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField()
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True)
    is_completed = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
