import { $axios } from '.';

class CardHolder {
    async all() {
        return $axios.get("cardHolders");
    }

    async get({id}) {
        return $axios.get(`cardHolders/${id}`);
    }

    async create({ bank_name, country, status, transfer}) {
        return $axios.post('cardHolders', {bank_name, country, status, transfer});
    }

    async modify({ bank_name, country, status, transfer}) {
        return $axios.update({ bank_name, country, status, transfer});
    }
}

export default new CardHolder();