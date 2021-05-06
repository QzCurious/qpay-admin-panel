import http from './http';

class CardHolder {
    async all() {
        return http.get("cardHolders");
    }

    async get({id}) {
        return http.get(`cardHolders/${id}`);
    }

    async create({ bank_name, country, status, transfer}) {
        return http.post('cardHolders', {bank_name, country, status, transfer});
    }

    async modify({ bank_name, country, status, transfer}) {
        return http.update({ bank_name, country, status, transfer});
    }
}

export default new CardHolder();