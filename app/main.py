from fastapi import FastAPI
from routes.user_routes import router as user_router
from routes.appointment_routes import router as appointment_router
from fastapi.middleware.cors import CORSMiddleware
from routes.rol_routes import router as rol_router
from routes.type_document_routes import router as type_doc_router
from routes.attribute_routes import router as attribute_router





app = FastAPI()

origins = [
    #"http://localhost.tiangolo.com",
    #"https://localhost.tiangolo.com",
    "http://localhost"
    #"http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(appointment_router)
app.include_router(user_router) 
app.include_router(rol_router)
app.include_router(type_doc_router)
app.include_router(attribute_router)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)