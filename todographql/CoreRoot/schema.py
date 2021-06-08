import graphene

from core.nodes.schema import NodeQuery, NodeMutations, NodeTaskQuery
from core.tasks.schema import TaskQuery, TaskMutations


class Query(graphene.ObjectType, TaskQuery, NodeQuery, NodeTaskQuery):
    pass


class Mutation(NodeMutations, TaskMutations):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
