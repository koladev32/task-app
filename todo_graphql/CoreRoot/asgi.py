import os
import django
from graphene_subscriptions.consumers import GraphqlSubscriptionConsumer
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'CoreRoot.settings')

django.setup()


application = ProtocolTypeRouter({
    "websocket": URLRouter([
        path('graphql', GraphqlSubscriptionConsumer.as_asgi())
    ]),
})