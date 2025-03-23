import SummaryApi from "../summaryAPI/SummaryApi"
import Axios from '../utils/Axios' 
const uploadImage = async(image)=>{
    try {
        const formData = new FormData()
        formData.append('image',image)

        const res = await Axios({
            ...SummaryApi.uploadImage,
            data : formData
        })

        return res
    } catch (error) {
        return error
    }
}

export default uploadImage;