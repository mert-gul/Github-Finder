import { Github } from "./api.js";
import { elements } from "./helpers.js";
import { UI } from "./ui.js";

const github = new Github();
const ui = new UI ();
github.fetchUserData();

const getInput = (e) => {
    e.preventDefault();
    const value = elements.searchInput.value;
    if (value == "") {
        ui.showAlert("Form alanını doldurunuz.", "alert alert-warning");
        return;
    }

    if (value){
        github.fetchUserData(value).then((res)=>{
         if(res.message==="Not Found")  {
            ui.showAlert("aradığınız kullanıcı bulunamadı.", "alert alert-danger");
         }else{
            ui.showAlert("kullanıcı bulundu.", "alert alert-success");
            ui.renderprofile(res.data);
            console.log(res);
            ui.renderProjects(res.repos);
         }
        })
        .catch((Err) => console.log(Err));
        return;
    }
};

//! Olay izleyicileri
elements.searchBtn.addEventListener("click", getInput);


