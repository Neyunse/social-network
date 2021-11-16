import axios from "axios";

const array = [];
axios.get(
    `http://localhost:1337/users`
).then(res => res.data
).then(data => {
    for(var i in data) array.push({
        name: "@"+data[i].username,
        avatar: data[i].avatar ? `http://localhost:1337${data[i].avatar.url}` : "https://via.placeholder.com/150",
    });
})



export default array;