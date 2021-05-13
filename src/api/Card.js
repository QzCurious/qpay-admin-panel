import http from './http';

class Card {
    async all() {
        return http.get("cards");
    }

    async retrieve({id}) {
        return http.get(`cards/${id}`);
    }

    async create({ channel, card_id, merchant, bank_name, branch, account_name, card_number, internet_banking_id, internet_banking_password, limit_daily, limit_once, pb_api_key, plugin, status}) {
        return http.post('cards', {channel, card_id, merchant, bank_name, branch, account_name, card_number, internet_banking_id, internet_banking_password, limit_daily, pb_api_key, plugin, limit_once, status});
    }

    async update({ id, channel, card_id, merchant, bank_name, branch, account_name, card_number, internet_banking_id, internet_banking_password, limit_daily, limit_once, pb_api_key, plugin, status}) {
        return http.put(`cards/${id}`, { channel, card_id, merchant, bank_name, branch, account_name, card_number, internet_banking_id, internet_banking_password, limit_daily, pb_api_key, plugin, limit_once, status});
    }

    async delete({ id }){
        return http.delete(`cards/${id}`)
    }
}

export default new Card();