from rest_framework import serializers
from user.models import User
from core.models import Turma, Atividade
from rest_framework.exceptions import NotFound


class AtividadeSerializer(serializers.ModelSerializer):
    turma_name = serializers.CharField(write_only=True)

    class Meta:
        model = Atividade
        fields = ['id', 'name', 'turma', 'turma_name']
        extra_kwargs = {'turma': {'read_only': True}}

    def create(self, validated_data):
        turma_name = validated_data.pop('turma_name')
        try:
            turma = Turma.objects.get(name=turma_name)
        except Turma.DoesNotExist:
            raise NotFound(detail="Turma not found.", code=404)
        atividade = Atividade.objects.create(turma=turma, **validated_data)
        return atividade

class TurmaSerializer(serializers.ModelSerializer):
    atividades = AtividadeSerializer(many=True, read_only=True)

    class Meta:
        model = Turma
        fields = ['id', 'name', 'user', 'atividades']
        extra_kwargs = {'user': {'read_only': True}}

    def create(self, validated_data):
        user = self.context['request'].user
        turma = Turma.objects.create(user=user, **validated_data)
        return turma