import axios from "axios";



/**
* contains baseURL to simplify api calls - api.get("/path/")
*/
export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
});




/**
* Create a user account and save it in user database
* @function userRegistration
* @param  {[str]} email email for user account
* @param {[str]} password secret password for user account
* @return {[obj]}   user object with user data and token
*/
export const userRegistration = async (email, password) => {
    let response = await api.post("/user/signup/", {
      email: email,
      password: password,
    });
    if (response.status === 201) {
      let { user, token } = response.data;
      // Store the token securely (e.g., in localStorage or HttpOnly cookies)
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      return user.id;
    }
    alert(response.data);
    return null;
  };



/**
* Take user email and password input to validate as existing user in database, provide token, and save token data in local storage
* @function userLogIn
* @param  {[str]} email email for user account
* @param {[str]} password secret password for user account
* @return {[obj]}   user object with user data and token
*/
export const userLogin = async (email, password) => {
    try{
        let response = await api.post("user/login/", {
    email: email,
    password: password,
});
    const { user, token } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user))
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    return user.id
    } catch (error){
        if (error.response.status === 401){
            return 401
        }
        return null
    }
}





/**
* Submit post request to logout endpoint, delete token header, and remove user data from local storage
* @function userLogOut
* @return {[none]}   none
*/
export const userLogout = async() => { 
    // POST /api/users/logout/
    const response = await api.post("user/logout/")
    if (response.status === 204) {
        // delete token from axios.common.heads 
        delete api.defaults.headers.common["Authorization"]
        // delete token from localstorage
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        console.log('user logged out');
        return true;
    } else {
        console.log('error logging user out ', response)
        return false;
    }
}


  /**
* Check local storage and header to ensure that they match and that it exists in user database
* @function userConfirmation
* @return {[none]}   none
*/
export const userConfirmation = async() => {
    const token = localStorage.getItem("token");
    if(token) {
        api.defaults.headers.common["Authorization"] = `Token ${token}`
        const response = await api.get("user/")
        if (response.status === 200) {
            return response.data
        } else {
            console.log('error userConfirmation', response)
            return null
        }
    } else {
        console.log('userConfirmation no token in localStorage');
        return null
    }
}



  /**
* Calculate time since update
* @function calculateTimeSincePost
* @return {[none]}   none
*/
export const calculateTimeSincePost = (postTimestamp) => {
    const postDate = new Date(postTimestamp); // Convert the post timestamp to a Date object
    const currentDate = new Date(); // Get the current date and time
  
    // Calculate the difference in milliseconds between the current time and the post time
    const timeDifference = currentDate - postDate;
  
    // Convert the time difference to seconds
    const seconds = Math.floor(timeDifference / 1000);
  
    // Define time intervals in seconds and their respective human-readable labels
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };
  
    // Calculate the time elapsed in each interval
    for (let interval in intervals) {
      const value = Math.floor(seconds / intervals[interval]);
      if (value >= 1) {
        return value + " " + interval + (value > 1 ? "s" : "") + " ago";
      }
    }
  
    // If the post was made less than a minute ago
    return "Just now";
  }
  

  export const submitNewComment = async (sightingId, newComment) => {
    try {
      const response = await api.post(
        "sightings/" + sightingId + "/comment/",
        newComment
      );
      return response.data
  
    } catch (error) {
      console.error("error while uploading comment", error);
    }
  };