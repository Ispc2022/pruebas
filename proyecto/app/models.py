from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    email = models.EmailField(
        max_length=150, unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'password']


class Ubicacion(models.Model):
    provincia = models.CharField(max_length=45)
    localidad = models.CharField(max_length=45)

    class Meta:
        db_table = "Ubicacion"
        verbose_name = "Ubicacion"
        verbose_name_plural = "Ubicaciones"

    def __str__(self):
        return self.localidad
    
class Terapia(models.Model):
    id_terapia = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100, blank=False)

    class Meta:
        db_table = "Terapia"
        verbose_name = "Tipo de Terapia"
        verbose_name_plural = "Terapias"

    def __str__(self):
        return self.nombre

class Paciente(models.Model):
    dni = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=100, blank=False)
    apellido = models.CharField(max_length=100, blank=False)
    SEXO_CHOICES = (
        ('M', 'Masculino'),
        ('F', 'Femenino'),
    )
    sexo = models.CharField(max_length=1, choices=SEXO_CHOICES)
    email = models.CharField(max_length=100, unique=True, blank=False)
    telefono = models.IntegerField()
    password = models.CharField(max_length=45)
    id_terapia = models.ForeignKey(Terapia, to_field="id_terapia", on_delete=models.CASCADE)
    provincia = models.ForeignKey(Ubicacion, on_delete=models.CASCADE, related_name='pacientes_provincia')
    localidad = models.ForeignKey(Ubicacion, on_delete=models.CASCADE, related_name="pacientes_localidad")

    class Meta:
        db_table = "Paciente"
        verbose_name = "Paciente Registrado"
        verbose_name_plural = "Pacientes"

class Profesional(models.Model):
    dni = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=100, blank=False)
    apellido = models.CharField(max_length=100, blank=False)
    email = models.CharField(max_length=100, unique=True, blank=False)
    password = models.CharField(max_length=45, default='12345678')
    id_terapia = models.ForeignKey(Terapia, to_field="id_terapia", on_delete=models.CASCADE)
    matricula = models.IntegerField(unique=True, blank=False)
    provincia = models.ForeignKey(Ubicacion, on_delete=models.CASCADE)
    localidad = models.ForeignKey(Ubicacion, on_delete=models.CASCADE, related_name="profesionales_localidad")
    
    class Meta:
        db_table = "Profesional"
        verbose_name = "Profesional Registrado"
        verbose_name_plural = "Profesionales"

    def __str__(self):
        return self.nombre

class Planes(models.Model):
    id = models.AutoField(primary_key=True)
    precio = models.IntegerField(unique=True, blank=False)
    nombre = models.CharField(max_length=50, unique=True, blank=False)

    class Meta:
        db_table = "Plan"
        verbose_name = "Plan Disponible"
        verbose_name_plural = "Planes"

    def __str__(self):
        return self.nombre

class PagosSuscripciones(models.Model):
    id = models.AutoField(primary_key=True)
    tipo_pago = models.CharField(max_length=20)
    id_plan_p = models.IntegerField()
    fecha = models.DateField()
    vencimiento = models.DateField()
    dni_pac = models.ForeignKey(Paciente, on_delete=models.CASCADE)

    class Meta:
        db_table = "Pagos"
        verbose_name = "Estado de Pagos"
        verbose_name_plural = "Pagos"

    def __str__(self):
        return str(self.fecha)