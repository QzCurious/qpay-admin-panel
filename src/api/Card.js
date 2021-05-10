import http from './http';

class Card {
    async all() {
        return http.get("cards");
    }

    async get({id}) {
        return http.get(`cards/${id}`);
    }

    async create({ bank_name, country, status, transfer}) {
        return http.post('cards', {bank_name, country, status, transfer});
    }

    async modify({ bank_name, country, status, transfer}) {
        return http.update({ bank_name, country, status, transfer});
    }
}

export default new Card();