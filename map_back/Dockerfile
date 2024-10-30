FROM python:3.9

# Installer GDAL et ses dépendances
RUN apt-get update && apt-get install -y \
    gdal-bin \
    libgdal-dev \
    && apt-get clean

# Définir la variable d'environnement pour GDAL
ENV CPLUS_INCLUDE_PATH=/usr/include/gdal
ENV C_INCLUDE_PATH=/usr/include/gdal

# Copier le fichier requirements.txt
COPY /map_back_config/requirements.txt /tmp/requirements.txt

# Installer les dépendances Python
RUN pip install --upgrade pip
RUN pip install -r /tmp/requirements.txt

# Copier le code source
COPY . /app
WORKDIR /app

# Lancer l'application
CMD ["python", "app.py"]

