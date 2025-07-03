from fastapi import APIRouter # sistema de rutas
from data import nombres # del data.py importamos los nombres

router =APIRouter() #creamos objeto para poder definir las rutas

@router.get("/nombres") # definimos ruta GET o endpoint llamada nombres
def get_nombre():
    return nombres #retornamos un diccionario con los nombres

# sirve como buena practica para seccionar bien las rutas que tenemos 
# y asi no amontonar todo en el main 

