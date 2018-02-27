import axios from 'axios';
const api = '/api/v1';

export const getAll = () => axios.get(`${api}/hashtags`).then(res => res.data);

export const removeById = id =>
    axios.delete(`${api}/hashtags/${id}`).then(res => res.data);

export const addHashTag = hashtag =>
    axios.post(`${api}/hashtags/`, { hashtag: hashtag }).then(res => res.data);

export const searchOnInstagram = term =>
    axios
        .get(`${api}/hashtags/search/${term}`)
        .then(res => res.data)
        .catch(error => {
            console.log(error);
        });
