from django.urls import path
from . import views

urlpatterns = [
    path('api/', views.api_overview),
    path('api/task-list/', views.task_list),
    path('api/task-detail/<str:pk>/',views.task_detail),
    path('api/task-create/', views.task_create),
    path('api/task-update/<str:pk>', views.task_update),
    path('api/task-delete/<str:pk>', views.task_delete)
]
