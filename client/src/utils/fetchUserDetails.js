import SummaryApi from "../summaryAPI/SummaryApi";
import Axios from "./Axios";

const fetchUserDetails = async()=>{
  try {
      const response = await Axios({
          ...SummaryApi.userDetails
      })
      return response.data
  } catch (error) {
      console.log(error)
  }
}
export default fetchUserDetails;
