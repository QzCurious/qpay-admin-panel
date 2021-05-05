import { $axios } from '.';

class CardOperation {
    async all() {
        return $axios.get("cardoperations");
    }

    async get({id}) {
        return $axios.get(`cardoperations/${id}`);
    }

    async create({ bank_name, country, status, transfer}) {
        return $axios.post('cardoperations', {bank_name, country, status, transfer});
    }

    async modify({ bank_name, country, status, transfer}) {
        return $axios.update({ bank_name, country, status, transfer});
    }
}

export default new CardOperation();