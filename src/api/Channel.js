import http from './http';

class Channel {
    async all() {
        return http.get("channels");
    }

    async retrieve( { id } ) {
        return http.get(`channels/${id}`);
    }

    async create({ name, status}) {
        return http.post('channels', {name, status});
    }

    async update({ id, name, status}) {
        return http.put(`channels/${id}`, { name, status});
    }

    async delete({ id }){
        return http.delete(`channels/${id}`);
    }
}

export default new Channel();