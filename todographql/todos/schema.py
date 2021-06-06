import graphene
from graphene_django.types import DjangoObjectType
from todos.models import Todo


class SubTodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = ['title', 'body', 'id', 'created', 'updated', 'parent', 'is_completed']


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = ['title', 'body', 'id', 'created', 'updated', 'parent', 'is_completed']
    sub_todo = graphene.List(SubTodoType)

    def resolve_sub_todo(self, info):
        sub_todos = Todo.objects.filter(parent__id=self.pk)
        return sub_todos


class Query(graphene.AbstractType):
    todos = graphene.List(
        TodoType)

    todo = graphene.Field(
        TodoType,
        id=graphene.Int(),
        title=graphene.String(),
    )

    def resolve_todos(root, info, **kwargs):

        todos = Todo.objects.all().order_by('-created')

        return todos

    def resolve_todo(root, info, **kwargs):
        id = kwargs.get('id')
        title = kwargs.get('title')
        is_completed = kwargs.get('is_completed')

        if id is not None:
            return Todo.objects.get(pk=id)
        elif title is not None:
            return Todo.objects.get(title=title)
        elif is_completed is not None:
            return Todo.objects.get(is_completed=is_completed)

        return None


class UpdateTodo(graphene.Mutation):
    class Arguments:
        id = graphene.NonNull(graphene.ID)
        title = graphene.String(required=False)
        body = graphene.String(required=False)
        is_completed = graphene.Boolean()

    todo = graphene.Field(TodoType)

    @classmethod
    def mutate(cls, root, info, **kwargs):
        id = kwargs.pop('id')
        todo = Todo.objects.get(pk=id)
        todo.title = kwargs['title']
        todo.body = kwargs['body']
        todo.save()

        return UpdateTodo(todo=todo)


class DeleteTodo(graphene.Mutation):
    class Arguments:
        id = graphene.NonNull(graphene.ID)

    id = graphene.ID()

    @classmethod
    def mutate(cls, root, info, **kwargs):
        id = kwargs.pop('id')
        todo = Todo.objects.get(pk=id)
        todo.delete()

        return DeleteTodo(id)


class CreateTodo(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        body = graphene.String(required=True)

    todo = graphene.Field(TodoType)

    @classmethod
    def mutate(cls, root, info, **kwargs):
        todo = Todo.objects.create(**kwargs)
        todo.save()

        return CreateTodo(todo=todo)


class CreateSubTodo(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        body = graphene.String(required=True)
        parent = graphene.ID(required=True)

    todo = graphene.Field(TodoType)

    @classmethod
    def mutate(cls, root, info, **kwargs):
        kwargs['parent'] = Todo.objects.get(id=kwargs['parent'])
        todo = Todo.objects.create(**kwargs)
        todo.save()

        return CreateSubTodo(todo=todo)


class TodoMutations(graphene.ObjectType):
    create_todo = CreateTodo.Field()
    update_todo = UpdateTodo.Field()
    delete_todo = DeleteTodo.Field()
    create_sub_todo = CreateSubTodo.Field()
