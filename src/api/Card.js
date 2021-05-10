import http from './http';

class Card {
    async all() {
        return http.get("cards");
    }

    async retrieve({id}) {
        return http.get(`cards/${id}`);
    }

    async create({ channel, card_id, merchant, bank_name, account_name, card_number, limit_daily, limit_once, status}) {
        return http.post('cards', {channel, card_id, merchant, bank_name, account_name, card_number, limit_daily, limit_once, status});
    }

    async update({ id, channel, card_id, merchant, bank_name, account_name, card_number, limit_daily, limit_once, status}) {
        return http.put(`cards/${id}`, { channel, card_id, merchant, bank_name, account_name, card_number, limit_daily, limit_once, status});
    }

    async delete({ id }){
        return http.delete(`cards/${id}`)
    }
}

export default new Card();