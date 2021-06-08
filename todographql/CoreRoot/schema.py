import graphene

from core.nodes.schema import NodeQuery, NodeMutations, NodeTaskQuery
from core.tasks.schema import TaskQuery, TaskMutations, TaskSubTasksQuery


class Query(graphene.ObjectType, TaskQuery, NodeQuery, NodeTaskQuery, TaskSubTasksQuery):
    pass


class Mutation(NodeMutations, TaskMutations):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
