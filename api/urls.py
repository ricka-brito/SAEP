from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import AtividadesByTurmaView, TurmaListCreateView, TurmaDetailView, AtividadeListCreateView, AtividadeDetailView

urlpatterns = [
    path('turmas/', TurmaListCreateView.as_view(), name='turma-list-create'),
    path('turmas/<int:pk>/', TurmaDetailView.as_view(), name='turma-detail'),
    path('atividades/', AtividadeListCreateView.as_view(), name='atividade-list-create'),
    path('atividades/<int:pk>/', AtividadeDetailView.as_view(), name='atividade-detail'),
    path('turmas/<int:turma_id>/atividades/', AtividadesByTurmaView.as_view(), name='atividades-by-turma'),

]
