import { elements } from "./helpers.js";

export class UI {
    constructor() {
        this.profile = elements.profile;
        this.button = elements.btnClear;
        this.input = elements.searchInput;
        this.btnDrk = elements.btn;
        this.body = elements.body;
        this.repoArea = elements.repos;
        // olay izleyicileri
        this.button.addEventListener("click", this.clearPorfile.bind(this));
        this.btnDrk.addEventListener("click", this.darkMode.bind(this));
    }
    // Profil arayüzünü ekrana basar
    renderprofile(res) {
        console.log(res);
        const created_at = new Date(res.created_at).toLocaleDateString();
        this.profile.innerHTML = `
        <div class="row border p-4 my-4 rounded-3">
            <div class="col-md-3">
                <img class="img-fluid rounded shadow" src="${res.avatar_url}" alt="">
                <a href="${res.html_url}" target="_blank" class="btn btn-primary w-100 mt-4">Profili Göster</a>
            </div>
            <div class="col-md-9 gap-3" id="profileButton">
                <span class="badge fs-6 bg-primary">Açık Reporlar:${res.public_repos}</span>
                <span class="badge fs-6 bg-secondary">Açık Gistler:${res.public_gists}</span>
                <span class="badge fs-6 bg-success">takipçiler:${res.followers}</span>
                <span class="badge fs-6 bg-info">Takip Edilenler:${res.following}</span>

                <ul class="list-group mt-3">
                    <li class="list-group-item">Hakkında: ${res.bio}</li>
                    <li class="list-group-item">Şirket: ${res.company}</li>
                    <li class="list-group-item">Website: ${res.blog}</li>
                    <li class="list-group-item">Konum:${res.location}</li>
                    <li class="list-group-item">Hesap Oluşturma: ${created_at}</li>
                </ul>
            </div>
        </div>
        
        
        
        `
    }

    // uyarı mesajı oluşturma
    showAlert(message, className) {
        const div = document.createElement("div");
        div.className = className;
        div.textContent = message;
        console.log(div);
        elements.warning.appendChild(div);
        console.log(elements.warning);
        setTimeout(() => {
            this.clearAlert();
        }, 3000)
    }
    // uyarıı ekrandan silme
    clearAlert() {
        const currentAlert = document.querySelector(".alert");
        if (currentAlert) {
            currentAlert.remove();
        }
    }
    // ekranı temizleme ve bildirim basma
    clearPorfile(e) {
        e.preventDefault();
        if (confirm("silmek istediğinize emin misiniz?")) {
            this.profile.innerHTML = "";
            this.input.value = "";
            this.showAlert("bütün veriler silindi", "alert alert-info");
            this.repoArea.innerHTML = "";
        }
    }
    darkMode() {
        if (this.body.classList.contains("bg-dark")) {
            this.body.className = "bg-light text-bg-light";
            this.btnDrk.className = "btn btn-dark";
            this.btnDrk.textContent = "Dark Mode"
        } else if (this.body.classList.contains("bg-light")) {
            this.body.className = "bg-dark text-bg-dark";
            this.btnDrk.className = "btn btn-light";
            this.btnDrk.textContent = "light Mode"
        }

        elements.title.classList.toggle("text-dark");
    }
    renderProjects(data) {
        // proje dizisindeki her bir eleman için kart oluştur ve ekrana basar
        data.forEach((repo) => {
            this.repoArea.innerHTML += `
            <div class="border row p-3 mb-3">
            <div class="col-6 ">
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </div>
            <div class="col-6 ">
                <span class="badge bg-secondary">Yıldız:${repo.stargazers_count}</span>
                <span class="badge bg-primary">Fork:${repo.forks_count}</span>
                <span class="badge bg-success">İzleyenler:${repo.watchers}</span>
            </div>

        </div>
            `;
        });
    }
}