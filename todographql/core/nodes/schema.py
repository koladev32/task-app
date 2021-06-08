import graphene
from graphene_django.types import DjangoObjectType
from core.nodes.models import Node
from core.tasks.models import Task
from core.tasks.schema import TaskType


class NodeType(DjangoObjectType):
    class Meta:
        model = Node
        fields = ['id', 'title', 'created', 'updated']


class NodeQuery(graphene.AbstractType):
    nodes = graphene.List(
        NodeType)

    mode = graphene.Field(
        NodeType,
        id=graphene.Int(),
        title=graphene.String(),
    )

    def resolve_nodes(root, info, **kwargs):

        nodes = Node.objects.all().order_by('-created')

        return nodes

    def resolve_node(root, info, **kwargs):
        id = kwargs.get('id')
        title = kwargs.get('title')

        if id is not None:
            return Node.objects.get(pk=id)
        elif title is not None:
            return Node.objects.get(title=title)

        return None


class NodeTaskQuery(graphene.AbstractType):
    node_tasks = graphene.List(
        TaskType,
        id=graphene.ID()
    )

    def resolve_node_tasks(root, info, **kwargs):
        node_id = kwargs.get('id')
        tasks = Task.objects.filter(node__pk=node_id, parent=None)

        return tasks


class UpdateNode(graphene.Mutation):
    class Arguments:
        id = graphene.NonNull(graphene.ID)
        title = graphene.String(required=False)

    node = graphene.Field(NodeType)

    @classmethod
    def mutate(cls, root, info, **kwargs):
        id = kwargs.pop('id')
        node = Node.objects.get(pk=id)
        node.title = kwargs['title']
        node.save()

        return UpdateNode(node=node)


class DeleteNode(graphene.Mutation):
    class Arguments:
        id = graphene.NonNull(graphene.ID)

    id = graphene.ID()

    @classmethod
    def mutate(cls, root, info, **kwargs):
        id = kwargs.pop('id')
        node = Node.objects.get(pk=id)
        node.delete()

        return DeleteNode(id)


class CreateNode(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)

    node = graphene.Field(NodeType)

    @classmethod
    def mutate(cls, root, info, **kwargs):
        node = Node.objects.create(**kwargs)
        node.save()

        return CreateNode(node=node)


class NodeMutations(graphene.ObjectType):
    create_node = CreateNode.Field()
    update_node = UpdateNode.Field()
    delete_node = DeleteNode.Field()
