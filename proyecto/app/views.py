from rest_framework import generics, viewsets, status
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout
import json
import mercadopago
from .models import Paciente, Planes, Profesional
from .serializers import UserSerializer, PacienteSerializer, PlanSerializer, ProfesionalSerializer


class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get('email', None)
        password = request.data.get('password', None)
        user = authenticate(email=email, password=password)
        if user:
            login(request, user)
            return Response(
                UserSerializer(user).data,
                status=status.HTTP_200_OK)
        return Response(
            status=status.HTTP_404_NOT_FOUND)


class LogoutView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)

class SignupView(generics.CreateAPIView):
    serializer_class = UserSerializer

class verPacientes(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer

class agregarPaciente(APIView):
    permission_classes = [IsAdminUser]
    def post(self, request, format=None):
        serializer = PacienteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,
                        status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class verPlanes(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    queryset = Planes.objects.all()
    serializer_class = PlanSerializer

class agregarPlan(APIView):
    permission_classes = [IsAdminUser]
    def post(self, request, format=None):
        serializer = PlanSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,
                        status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class verProfesionales(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    queryset = Profesional.objects.all()
    serializer_class = ProfesionalSerializer

class agregarProfesional(APIView):
    permission_classes = [IsAdminUser]
    def post(self, request, format=None):
        serializer = ProfesionalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,
                        status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    http_method_names = ['get', 'patch']
    def get_object(self):
        if self.request.user.is_authenticated:
            return self.request.user

class ProcessPaymentAPIView(APIView):
    def post(self, request):
        try:
            request_values = json.loads(request.body)
            payment_data = {
                "transaction_amount": float(request_values["transaction_amount"]),
                "token": request_values["token"],
                "installments": int(request_values["installments"]),
                "payment_method_id": request_values["payment_method_id"],
                "issuer_id": request_values["issuer_id"],
                "payer": {
                    "email": request_values["payer"]["email"],
                    "identification": {
                        "type": request_values["payer"]["identification"]["type"],
                        "number": request_values["payer"]["identification"]["number"],
                    },
                },
            }

            sdk = mercadopago.SDK("")
            payment_response = sdk.payment().create(payment_data)
            payment = payment_response["response"]
            status = {
                "id": payment["id"],
                "status": payment["status"],
                "status_detail": payment["status_detail"],
            }
            return Response(data={"body": status, "statusCode": payment_response["status"]}, status=201)
        except Exception as e:
            return Response(data={"body": payment_response}, status=400)

class retornarPagado(APIView):
    def get(self, request):
        return Response({"respuesta": "aprobado"})
