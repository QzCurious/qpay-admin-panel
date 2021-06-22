import { http } from "./http"
// 1.商品 2.抽獎商品 3.入口主圖 4.輪播A 5.輪播B

export const apiUtil = {
  getCarousel() {
    return http.get("/api/carousel")
  },
  getRecommend(id) {
    return http.get("/api/recommend/" + id)
  },
  getShopPage(id) {
    return http.get("/api/shopPage/" + id)
  },
  getShopDetailPage(id) {
    return http.get("/api/shopDetailPage/" + id)
  },
  getSerieList(id) {
    return http.get("/api/serieList/" + id)
  },
}
