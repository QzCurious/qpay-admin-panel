import http from './http';
import toastService from '../service/ToastService';
class Bank {
    async all() {
        return http.get("banks");
    }

    async retrieve( { id } ) {
        return http.get(`banks/${id}`);
    }

    async create({ name, country, status, transfer}) {
        console.log({ name, country, status, transfer})
        return http.post('banks', {name, country, status, transfer});
    }

    async update({ id, name, country, status, transfer}) {
        // toastService.add({severity:'success', summary: 'Success Message', detail:'Order submitted', life: 10000})
        return http.put(`banks/${id}`, { name, country, status, transfer})
        // .catch( _ => { 
        // });
    }

    async delete({ id }){
        return http.delete(`banks/${id}`);
    }
}

export default new Bank();