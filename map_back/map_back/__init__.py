from flask import Flask, jsonify, request
from flask_cors import CORS

# Initialiser l'application Flask
app = Flask("map_back")

# Activer CORS pour permettre les requêtes depuis Vue.js
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Endpoint pour importer des géométries
@app.route('/import', methods=['POST'])
def import_geometries():
    try:
        geometries = [
        {
            "type": "point",
            "coordinates": [-71.0825, 48.4330]
        },
        {
            "type": "linestring",
            "coordinates": [
                [-71.0890, 48.4470],
                [-71.1000, 48.4600]
            ]
        },
        {
            "type": "polygon",
            "coordinates": [
                [
                    [-71.1500, 48.4500],
                    [-71.1600, 48.4700],
                    [-71.1700, 48.4600],
                    [-71.1500, 48.4500]
                ]
            ]
        }
        ]
        
        return jsonify({"geometries": geometries}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Point d'entrée de l'application
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
