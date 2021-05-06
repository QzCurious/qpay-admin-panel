import { $axios } from '.';

class MerchantDailyReport {
    async all() {
        return $axios.get("merchantDailyReport");
    }

    async get({id}) {
        return $axios.get(`merchantDailyReport/${id}`);
    }

    async create({ bank_name, country, status, transfer}) {
        return $axios.post('merchantDailyReport', {bank_name, country, status, transfer});
    }

    async modify({ bank_name, country, status, transfer}) {
        return $axios.update({ bank_name, country, status, transfer});
    }
}

export default new MerchantDailyReport();