from flask import Flask
from flask_cors import CORS

# Initialiser l'application Flask
app = Flask("map_back")

# Activer CORS pour permettre les requêtes depuis Vue.js
CORS(app)

# Point d'entrée de l'application
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
