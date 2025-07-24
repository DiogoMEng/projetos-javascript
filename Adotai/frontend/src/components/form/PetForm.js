import {  useState } from "react";

import formStyles from "./Form.module.css";

import Input from "./Input";
import Select from "./Select";

function PetForm({ handleSubmit ,petData, btnText }) {

  const [pet, setPet] = useState(petData || {});
  const [preview, setPreview] = useState([]);
  const colors = ["Branco", "Preto", "Marrom", "Cinza", "Amarelo", "Laranja", "Tigrado", "Caramelo"];

  function onFileChange(event) {
    setPreview(Array.from(event.target.files));
    setPet({  ...pet, images: [...event.target.files] });
  }

  function handleChange(event) {
    setPet({ ...pet, [event.target.name]: event.target.value });
  }

  function handleColor(event) {
    setPet({ ...pet, color: event.target.options[event.target.selectedIndex].text });
  }

  function submit(event) {
    event.preventDefault();
    handleSubmit(pet);
  }

  return (
    <form  onSubmit={submit} className={formStyles.form_container}>
      <div className={formStyles.preview_pet_images}>
        {preview.length > 0 ?
          preview.map((image, index) => (
            <img 
              key={`${pet.name}+${index}`}
              src={URL.createObjectURL(image)}
              alt={pet.name}
              className={formStyles.preview_image}
            />
          )) :
          pet.images &&
          pet.images.map((image, index) => (
            <img 
              key={`${pet.name}+${index}`}
              src={`${process.env.REACT_APP_API}/images/pets/${image}`}
              alt={pet.name}
              className={formStyles.preview_image}
            />
          ))
        }
      </div>
      <Input 
        text="Imagens do Pet"
        type="file"
        name="images"
        handleOnChange={onFileChange}
        multiple={true}
      />
      <Input 
        text="Nome do Pet"
        type="text"
        name="name"
        placeholder="Digite o nome do Pet"
        handleOnChange={handleChange}
        value={pet.name || ""}
      />
      <Input 
        text="Idade do Pet"
        type="text"
        name="age"
        placeholder="Digite a idade do Pet"
        handleOnChange={handleChange}
        value={pet.age || ""}
      />
      <Input 
        text="Peso do pet"
        type="text"
        name="weight"
        placeholder="Digite o peso do Pet"
        handleOnChange={handleChange}
        value={pet.weight || ""}
      />
      <Select 
        name="color"
        text="Selecione a cor do Pet"
        options={colors}
        handleOnChange={handleColor}
        value={pet.color || ""}
      />
      <input type="submit" value={btnText}/>
    </form>
  )

}

export default PetForm;