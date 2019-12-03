import axios from 'axios';
import API_CONSTANTS from "../service/Constants";

class PlanetService {


    static async searchPlanets({
                           searchText,
                            page,
                       }) {

        const pageCriteria = page ? `&page=${page}`:'';
        const {data:searchResults} = await axios.get(`${API_CONSTANTS.PLANETS}?search=${encodeURIComponent(searchText)}${pageCriteria}`);

        return searchResults;

    }
}


export default PlanetService;