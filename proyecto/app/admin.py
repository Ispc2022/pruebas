from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from .models import Ubicacion,Terapia,Paciente,Profesional,Planes,PagosSuscripciones


@admin.register(get_user_model())
class CustomUserAdmin(UserAdmin):
    pass
# Register your models here.
class UbicacionAdmin(admin.ModelAdmin):
    list_display = ("provincia" , "localidad")
class TerapiaAdmin(admin.ModelAdmin):
    list_display = ("id_terapia" , "nombre")
class PacienteAdmin(admin.ModelAdmin):
    list_display = ("dni","nombre","apellido","sexo","email","telefono","password","id_terapia","provincia","localidad")
class ProfesionalAdmin(admin.ModelAdmin):
    list_display = ("dni","nombre","apellido","email","password","id_terapia","matricula","provincia","localidad")
class PlanesAdmin(admin.ModelAdmin):
    list_display = ("id" , "nombre", "precio")
class PagosSuscripcionesAdmin(admin.ModelAdmin):
    list_display = ("id","tipo_pago","id_plan_p","fecha","vencimiento", "dni_pac")

    
admin.site.register(Ubicacion, UbicacionAdmin)
admin.site.register(Terapia, TerapiaAdmin)
admin.site.register(Paciente,PacienteAdmin)
admin.site.register(Profesional,ProfesionalAdmin)
admin.site.register(Planes,PlanesAdmin)
admin.site.register(PagosSuscripciones,PagosSuscripcionesAdmin)
