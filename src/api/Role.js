import { $axios } from ".";

class Role {
  async all() {
    return $axios.get("roles");
  }
}

export default new Role();
