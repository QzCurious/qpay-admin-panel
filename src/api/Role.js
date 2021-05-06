import http from "./http";
class Role {
  async all() {
    return http.get("roles");
  }
}

export default new Role();
