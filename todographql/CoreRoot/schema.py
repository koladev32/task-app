import graphene

from core.nodes.schema import NodeQuery, NodeMutations
from core.tasks.schema import TaskQuery, TaskMutations


class Query(graphene.ObjectType, TaskQuery, NodeQuery):
    pass


class Mutation(NodeMutations, TaskMutations):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
