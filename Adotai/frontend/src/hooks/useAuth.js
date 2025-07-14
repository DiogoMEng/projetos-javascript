import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import api from "../utils/api.js";

export default function useAuth () {

  async function register (user) {

    try {
      const data = await api.post("/users/register", user).then((res) => {
        return res.data;
      });

      console.log(data);
    } catch (err) {
      /**
       *  HANDLE ERROR 
       */
      console.log(err);
    }

  }

  return {
    register
  }

}