import Axios from "axios";

export default Axios.create({
    baseURL: 'https://react-quize-d39e7-default-rtdb.firebaseio.com'
})