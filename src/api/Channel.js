import http from './http';

class Bank {
    async all() {
        return http.get("channels");
    }

    async get({id}) {
        return http.get(`channels/${id}`);
    }

    async create({ bank_name, country, status, transfer}) {
        return http.post('channels', {bank_name, country, status, transfer});
    }

    async modify({ bank_name, country, status, transfer}) {
        return http.update({ bank_name, country, status, transfer});
    }
}

export default new Bank();