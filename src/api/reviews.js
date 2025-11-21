import client from "./client";

export function getEntityReviews({ entityId, pageNumber = 1, pageSize = 10 }) {
  return client
    .get("/reviews", {
      params: {
        entityId,
        pageNumber,
        pageSize,
      },
    })
    .then((response) => {
      return response.data.data; 
    });
}

export function createReview(payload) {
  return client
    .post("/reviews", payload)
    .then((response) => response.data);
}
