FROM python:3.11

WORKDIR /data-sphere

COPY requirements.txt .
COPY ./src ./src

RUN pip install -r requirements.txt

# Uvicorn command to run the FastAPI app, listens on all interfaces
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
