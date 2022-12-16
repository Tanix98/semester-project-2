export { userToken, userName };

const userToken = "Bearer " + localStorage.getItem("accessToken");

const userName = localStorage.getItem("userName");
