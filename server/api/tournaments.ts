import { defineEventHandler } from 'h3'
import axios from 'axios'

const CHALLONGE_USERNAME = "Smahs_Arena_Event"
const CHALLONGE_API_KEY = "J52am8eIremVpmCsQWpDn8UqdGJRWZDAyOdM4rek"
const CHALLONGE_URL = "https://api.challonge.com/v1"

async function getTournamentData(edition: string) {
    try {
        const { data: tournament } = await axios.get(`${CHALLONGE_URL}/tournaments/${edition}.json`, {
            params: { api_key: CHALLONGE_API_KEY },
        });

        const { data: participants }: { data: { participant: { id: number, name: string } }[] } = await axios.get(`${CHALLONGE_URL}/tournaments/${edition}/participants.json`, {
            params: { api_key: CHALLONGE_API_KEY },
        });

        return {
            name: tournament.tournament.name,
            started_at: tournament.tournament.started_at,
            participants: participants.map(p => ({
                id: p.participant.id,
                name: p.participant.name,
            })),
        };
    } catch (error) {
        if (error instanceof Error) {
            console.error("Erreur API Challonge:", error.message);
        } else {
            console.error("Erreur API Challonge:", error);
        }
        return { error: "Impossible de récupérer les données du tournoi" };
    }
}

export default defineEventHandler(async (event) => {
    return {
        edition2024: await getTournamentData("edition2024"),
        edition2025: await getTournamentData("edition2025"),
    }
})