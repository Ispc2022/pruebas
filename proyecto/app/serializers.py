from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Paciente, Planes, Profesional


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = '__all__'  # Reemplaza esto con los campos específicos del modelo Paciente si es necesario

class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Planes
        fields = '__all__'  # Reemplaza esto con los campos específicos del modelo Plan si es necesario

class ProfesionalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profesional
        fields = '__all__'  # Reemplaza esto con los campos específicos del modelo Profesional si es necesario
