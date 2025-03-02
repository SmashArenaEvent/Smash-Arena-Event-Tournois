from flask import Flask, jsonify
from flask_cors import CORS
import challonge

app = Flask(__name__)
CORS(app)

# Connexion à l'API Challonge
challonge.set_credentials("Smahs_Arena_Event", "J52am8eIremVpmCsQWpDn8UqdGJRWZDAyOdM4rek")

def get_tournament_data(edition):
    """ Récupère les données d'un tournoi donné """
    tournament = challonge.tournaments.show(edition)
    participants = challonge.participants.index(tournament["id"])

    return {
        "name": tournament["name"],
        "started_at": tournament["started_at"],
        "participants": [
            {"id": p["id"], "name": p["name"]}
            for p in participants
        ]
    }

@app.route('/api/tournaments', methods=['GET'])
def get_all_tournaments():
    """ Récupère les données des deux éditions """
    tournaments = {
        "edition2024": get_tournament_data("edition2024"),
        "edition2025": get_tournament_data("edition2025")
    }
    return jsonify(tournaments)

if __name__ == '__main__':
    app.run(debug=True)
