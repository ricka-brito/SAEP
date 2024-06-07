from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from core.models import Turma, Atividade
from .serializers import TurmaSerializer, AtividadeSerializer

@permission_classes([IsAuthenticated])
class TurmaListCreateView(generics.ListCreateAPIView):
    queryset = Turma.objects.all()
    serializer_class = TurmaSerializer

@permission_classes([IsAuthenticated])
class TurmaDetailView(APIView):
    def get(self, request, pk):
        try:
            turma = Turma.objects.get(pk=pk)
        except Turma.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = TurmaSerializer(turma)
        return Response(serializer.data)

    def delete(self, request, pk):
        try:
            turma = Turma.objects.get(pk=pk)
            if turma.atividades.exists():
                return Response({"error": "Cannot delete turma with existing atividades."},
                                status=status.HTTP_400_BAD_REQUEST)
            turma.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Turma.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

@permission_classes([IsAuthenticated])
class AtividadeListCreateView(generics.ListCreateAPIView):
    queryset = Atividade.objects.all()
    serializer_class = AtividadeSerializer

@permission_classes([IsAuthenticated])
class AtividadeDetailView(generics.RetrieveDestroyAPIView):
    queryset = Atividade.objects.all()
    serializer_class = AtividadeSerializer

@permission_classes([IsAuthenticated])
class AtividadesByTurmaView(generics.ListAPIView):
    serializer_class = AtividadeSerializer

    def get_queryset(self):
        turma_id = self.kwargs['turma_id']
        return Atividade.objects.filter(turma_id=turma_id)
