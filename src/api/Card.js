import { $axios } from '.';

class Card {
    async all() {
        return $axios.get("cards");
    }

    async get({id}) {
        return $axios.get(`cards/${id}`);
    }

    async create({ bank_name, country, status, transfer}) {
        return $axios.post('cards', {bank_name, country, status, transfer});
    }

    async modify({ bank_name, country, status, transfer}) {
        return $axios.update({ bank_name, country, status, transfer});
    }
}

export default new Card();