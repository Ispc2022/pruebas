from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'pacientes', views.verPacientes, basename='pacientes')
router.register(r'planes', views.verPlanes, basename='planes')
router.register(r'profesionales', views.verProfesionales, basename='profesionales')

urlpatterns = [
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('signup/', views.SignupView.as_view(), name='signup'),
    path('agregar_paciente/', views.agregarPaciente.as_view(), name='agregar_paciente'),
    path('agregar_plan/', views.agregarPlan.as_view(), name='agregar_plan'),
    path('agregar_profesional/', views.agregarProfesional.as_view(), name='agregar_profesional'),
    path('profile/', views.ProfileView.as_view(), name='profile'),
    path('process_payment/', views.ProcessPaymentAPIView.as_view(), name='process_payment'),
    path('retornar_pagado/', views.retornarPagado.as_view(), name='retornar_pagado'),
]

urlpatterns += router.urls
