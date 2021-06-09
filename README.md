# Task-App

This is Task-App inspired by the structure of tasks used by Workflowy

## Stack

**Client:** React, TypeScript, Apollo-Client, TailwindCSS

**Server:** Django, Graphene, GraphQL, Sqlite3, Redis

## Setup Backend
If you are on linux, install `redis-server`. `sudo apt intall redis-server`
```shell
virtualenv venv
cd todo_graphql 
python manage.py migrate
python manage.py runserver
```

## Setup frontend
```shell
yarn install
yarn start
```

## Features
- Create a node
- Create a task
- Show Nodes and Tasks
- Show Sub-tasks

## What can be added?
- Create a tree model to store the tasks and use subscriptions to update the store
- Use PosgreSQL instead of Sqlite3 for better performance
- Better enhance UI
