import axios from "axios";

export const addVoter = async (data) => {
  var config = {
    method: "post",
    url: "https://sc2jlh-5000.csb.app/register",
    headers: {
      "Content-Type": "application/json"
    },
    data: data
  };

  return await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};

export const getVoters = async (data) => {
  var config = {
    method: "get",
    url: "https://sc2jlh-5000.csb.app/",
    headers: {
      "Content-Type": "application/json"
    }
  };

  return await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};

export const getVotersByVillage = async (village) => {
  var config = {
    method: "get",
    url: "https://sc2jlh-5000.csb.app/village/" + village,
    headers: {
      "Content-Type": "application/json"
    }
  };

  return await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};

export const markMember = async (data) => {
  var config = {
    method: "get",
    url: "https://sc2jlh-5000.csb.app/verify/" + data.memberId,
    headers: {
      "Content-Type": "application/json"
    }
  };

  return await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};
export const validateMember = async (memberId, isSerialNumber = false) => {
  let url = "https://sc2jlh-5000.csb.app/";
  if (isSerialNumber) {
    url = url.concat("serial/").concat(memberId);
  } else {
    url = url.concat(memberId);
  }
  var config = {
    method: "get",
    url,
    headers: {
      "Content-Type": "application/json"
    }
  };

  return await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};
