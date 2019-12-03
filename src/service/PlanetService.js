import axios from 'axios';
import API_CONSTANTS from "../service/Constants";

class PlanetService {
    static async searchPlanets({
                                   searchText,
                                   page,
                               }) {

        const pageCriteria = page ? `&page=${page}` : '';
        const url =`${API_CONSTANTS.PLANETS}?search=${encodeURIComponent(searchText)}${pageCriteria}`;
        const {data: searchResults} = await axios.get(url);
        return searchResults;

    }
}


export default PlanetService;