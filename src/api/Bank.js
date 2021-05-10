import http from './http';
import toastService from '../service/ToastService';
class Bank {
    async all() {
        return http.get("banks");
    }

    async retrieve( { id } ) {
        return http.get(`banks/${id}`);
    }

    async create({ name, code, country, status, transfer}) {
        console.log({ name, code, country, status, transfer})
        return http.post('banks', {name, code, country, status, transfer});
    }

    async update({ id, name, code, country, status, transfer}) {
        // toastService.add({severity:'success', summary: 'Success Message', detail:'Order submitted', life: 10000})
        return http.put(`banks/${id}`, { name, code, country, status, transfer})
        // .catch( _ => { 
        // });
    }

    async delete({ id }){
        return http.delete(`banks/${id}`);
    }
}

export default new Bank();