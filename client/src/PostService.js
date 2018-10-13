import axios from 'axios';
//import { rejects } from 'assert';

const url = 'http://localhost:5000/api/posts/';

class PostService {

    // GET
    static getPosts() {
        return new Promise(async (resolve,rejects) => {
            try {
               const res = await axios.get(url);
               const data = res.data;
               
               resolve(data.map(post => ({
                   ...post,
                   createdAt : new Date(post.createdAt)
               })));
            } catch(err) {
                rejects(err);
            }
        });
    }

    // POST
    static insertPost(text) {
        return axios.post(url,{text});
    }

    // DELETE
    static deletePost(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default PostService;