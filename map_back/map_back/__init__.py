from flask import Flask, jsonify, request
from flask_cors import CORS
from osgeo import gdal, ogr
import os

# Initialiser l'application Flask
app = Flask("map_back")

# Activer CORS pour permettre les requêtes depuis Vue.js
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Endpoint pour importer des géométries
@app.route('/import', methods=['POST'])
def import_geometries():
    try:
        # Vérifier si le fichier est présent dans la requête
        if 'file' not in request.files:
            return jsonify({"error": "No files found"}), 400

        file = request.files['file']

        # Sauvegarder temporairement le fichier pour que GDAL puisse le lire
        file_path = f"/tmp/{file.filename}"
        file.save(file_path)

        # Utiliser GDAL pour ouvrir le fichier
        dataset = gdal.OpenEx(file_path, gdal.OF_VECTOR)
        if not dataset:
            return jsonify({"error": "Impossible de lire le fichier avec GDAL"}), 400

        # Extraire les géométries
        geometries = []
        for layer_index in range(dataset.GetLayerCount()):
            layer = dataset.GetLayerByIndex(layer_index)
            
            # Parcourir chaque feature dans la couche
            for feature in layer:
                geometry = feature.GetGeometryRef()
                if geometry:
                    # Ajouter le type de géométrie
                    geometry_json = {
                        "coordinates": geometry.ExportToJson()  # Coordonnées de la géométrie
                    }
                    geometries.append(geometry_json)

        # Supprimer le fichier temporaire
        os.remove(file_path)

        return jsonify({"geometries": geometries}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Point d'entrée de l'application
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
