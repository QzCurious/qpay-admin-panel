import { $axios } from '.';

class Bank {
    async all() {
        return $axios.get("channels");
    }

    async get({id}) {
        return $axios.get(`channels/${id}`);
    }

    async create({ bank_name, country, status, transfer}) {
        return $axios.post('channels', {bank_name, country, status, transfer});
    }

    async modify({ bank_name, country, status, transfer}) {
        return $axios.update({ bank_name, country, status, transfer});
    }
}

export default new Bank();