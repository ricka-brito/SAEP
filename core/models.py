from django.db import models
from django.conf import settings

class Turma(models.Model):
    name = models.CharField(max_length=255)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Atividade(models.Model):
    name = models.CharField(max_length=255)
    turma = models.ForeignKey(Turma, related_name='atividades', on_delete=models.CASCADE)

    def __str__(self):
        return self.name
