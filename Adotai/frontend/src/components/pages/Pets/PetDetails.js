import api from "../../../utils/api";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import styles from "./PetDetails.module.css";

/**
 *  HOOKS 
 */
import useFlashMessage from "../../../hooks/useFlashMessage";

function PetDetails () {

  const [pet, setPet] = useState({});
  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();
  const [token] = useState(localStorage.getItem("token" || ""));

  useEffect(() => {
    api.get(`/pets/${id}`)
    .then(res => {
      
    })
    .catch()
  }, [])

  return (
    <h1>Página de Pet</h1>
  )

}

export default PetDetails;