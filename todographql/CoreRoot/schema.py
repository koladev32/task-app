import graphene
from tasks import schema


class Query(graphene.ObjectType, schema.Query):
    pass


schema = graphene.Schema(query=Query, mutation=schema.TodoMutations)
