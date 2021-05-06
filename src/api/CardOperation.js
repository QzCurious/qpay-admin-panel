import http from './http';

class CardOperation {
    async all() {
        return http.get("cardoperations");
    }

    async get({id}) {
        return http.get(`cardoperations/${id}`);
    }

    async create({ bank_name, country, status, transfer}) {
        return http.post('cardoperations', {bank_name, country, status, transfer});
    }

    async modify({ bank_name, country, status, transfer}) {
        return http.update({ bank_name, country, status, transfer});
    }
}

export default new CardOperation();