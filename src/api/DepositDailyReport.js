import http from './http';

class DepositDailyReport {
    async all() {
        return http.get("depositDailyReport");
    }

    async get({id}) {
        return http.get(`depositDailyReport/${id}`);
    }

    async create({ bank_name, country, status, transfer}) {
        return http.post('depositDailyReport', {bank_name, country, status, transfer});
    }

    async modify({ bank_name, country, status, transfer}) {
        return http.update({ bank_name, country, status, transfer});
    }
}

export default new DepositDailyReport();