import graphene
from graphene_django.types import DjangoObjectType
from core.tasks.models import Task
from core.nodes.models import Node


class SubTaskType(DjangoObjectType):
    class Meta:
        model = Task
        fields = ['title', 'body', 'id', 'created', 'updated', 'parent', 'is_completed', 'node']


class TaskType(DjangoObjectType):
    class Meta:
        model = Task
        fields = ['title', 'body', 'id', 'created', 'updated', 'parent', 'is_completed', 'node']

    sub_tasks = graphene.List(SubTaskType)

    def resolve_sub_tasks(self, info):
        sub_tasks = Task.objects.filter(parent__id=self.pk)
        return sub_tasks


class TaskQuery(graphene.AbstractType):
    tasks = graphene.List(
        TaskType)

    task = graphene.Field(
        TaskType,
        id=graphene.Int(),
        title=graphene.String(),
    )

    def resolve_tasks(root, info, **kwargs):

        tasks = Task.objects.all().order_by('-created')

        return tasks

    def resolve_task(root, info, **kwargs):
        id = kwargs.get('id')
        title = kwargs.get('title')
        is_completed = kwargs.get('is_completed')

        if id is not None:
            return Task.objects.get(pk=id)
        elif title is not None:
            return Task.objects.get(title=title)
        elif is_completed is not None:
            return Task.objects.get(is_completed=is_completed)

        return None


class TaskSubTasksQuery(graphene.AbstractType):
    sub_tasks = graphene.List(TaskType,
                              task_id=graphene.ID())

    def resolve_sub_tasks(self, root, **kwargs):
        sub_tasks = Task.objects.filter(parent__id=kwargs['task_id'])
        return sub_tasks


class UpdateTask(graphene.Mutation):
    class Arguments:
        id = graphene.NonNull(graphene.ID)
        title = graphene.String(required=False)
        body = graphene.String(required=False)
        is_completed = graphene.Boolean()

    task = graphene.Field(TaskType)

    @classmethod
    def mutate(cls, root, info, **kwargs):
        id = kwargs.pop('id')
        task = Task.objects.get(pk=id)
        task.title = kwargs['title']
        task.body = kwargs['body']
        task.save()

        return UpdateTask(task=task)


class DeleteTask(graphene.Mutation):
    class Arguments:
        id = graphene.NonNull(graphene.ID)

    id = graphene.ID()

    @classmethod
    def mutate(cls, root, info, **kwargs):
        id = kwargs.pop('id')
        task = Task.objects.get(pk=id)
        task.delete()

        return DeleteTask(id)


class CreateTask(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        body = graphene.String(required=True)
        node = graphene.ID(required=True)

    task = graphene.Field(TaskType)

    @classmethod
    def mutate(cls, root, info, **kwargs):
        kwargs['node'] = Node.objects.get(pk=kwargs['node'])

        task = Task.objects.create(**kwargs)
        task.save()

        return CreateTask(task=task)


class CreateSubTask(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        body = graphene.String(required=True)
        parent = graphene.ID(required=True)
        node = graphene.ID(required=True)

    task = graphene.Field(TaskType)

    @classmethod
    def mutate(cls, root, info, **kwargs):
        kwargs['parent'] = Task.objects.get(id=kwargs['parent'])
        kwargs['node'] = Node.objects.get(pk=kwargs['node'])

        task = Task.objects.create(**kwargs)
        task.save()

        return CreateSubTask(task=task)


class TaskMutations(graphene.ObjectType):
    create_task = CreateTask.Field()
    update_task = UpdateTask.Field()
    delete_task = DeleteTask.Field()
    create_sub_task = CreateSubTask.Field()
