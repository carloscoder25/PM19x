from fastapi import FastAPI #importar la clase principal
from fastapi.middleware.cors import CORSMiddleware# permite que otras apps se conecten(ReactNative)
from routes import router #importamos las rutas con el nombre que definimos en routes.py

app = FastAPI() #creamos la app principal

#creamos el filtro de seguridad
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] ,#permitir que el front se conecte con el back 
    allow_credentials=True, #permitimos que se envien credenciales
    allow_methods=["*"], #permite que se envien metodos
    allow_headers=["*"] #permite que se envien headers
)

app.include_router(router)
# le decimos que use todas las rutas que se encuentran en el Router creando
# una instancia de router y pasandola a include_router