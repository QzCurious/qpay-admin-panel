import http from './http';

class Bank {
    async all() {
        return http.get("banks");
    }

    async retrieve( { id } ) {
        return http.get(`banks/${id}`);
    }

    async create({ bank_name, country, status, transfer}) {
        return http.post('banks', {bank_name, country, status, transfer});
    }

    async update({ id, bank_name, country, status, transfer}) {
        return http.put(`banks/${id}`, { bank_name, country, status, transfer});
    }

    async delete({ id }){
        return http.delete(`banks${id}`);
    }
}

export default new Bank();