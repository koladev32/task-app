from django.apps import AppConfig


class TasksConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core.tasks'
    label = 'core_tasks'

    def ready(self):
        import core.tasks.signals
