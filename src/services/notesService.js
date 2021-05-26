const REQUEST_URL = "https://www.diegollanes.ml/api";

export const fetchingNotes = async () => {
    try {
      const response = await fetch(REQUEST_URL);
      const data = await response.json();
      return data
  
    } catch(e){
        console.log(e.message)
    }
  }