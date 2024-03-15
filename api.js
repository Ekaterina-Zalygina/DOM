export function fetchGet() {
    return fetch('https://wedev-api.sky.pro/api/v1/ekaterina-zalygina/comments', {
        method: "GET",
    }).then((response) => {

        if (response.status === 500) {
            throw new Error("Сервер поломался")
        }

        return response.json();

    })
}


export function fetchPost({ name, text }) {

    return fetch('https://wedev-api.sky.pro/api/v1/ekaterina-zalygina/comments', {
      method: "POST",
      body: JSON.stringify({
        name,
        text,
        forceError: true
      })
    })
  }