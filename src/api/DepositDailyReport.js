import { $axios } from '.';

class DepositDailyReport {
    async all() {
        return $axios.get("depositDailyReport");
    }

    async get({id}) {
        return $axios.get(`depositDailyReport/${id}`);
    }

    async create({ bank_name, country, status, transfer}) {
        return $axios.post('depositDailyReport', {bank_name, country, status, transfer});
    }

    async modify({ bank_name, country, status, transfer}) {
        return $axios.update({ bank_name, country, status, transfer});
    }
}

export default new DepositDailyReport();