import { $axios } from '.';

export default class Bank {
    async all() {
        return $axios.get("banks");
    }

    async get({id}) {
        return $axios.get(`banks/${id}`);
    }

    async create({ bank_name, country, status, transfer}) {
        return $axios.post('banks', {bank_name, country, status, transfer});
    }

    async modify({ bank_name, country, status, transfer}) {
        return $axios.update({ bank_name, country, status, transfer});
    }
}