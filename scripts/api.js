 export class Github {
    constructor() {
        this.client_id = "3755fe6711e68e74173e";
        this.client_secret = "4333041be8172d8a934504bbe57eab1c8fd99b79";
        this.per_page = 10;
        this.sort = "asc"
    }
    //* api'den kullanıcı bilgilerini alma
     async fetchUserData(username) {
        // parametre olarak gelen kullanıcı adına göre istek attık
        const profileRes = await fetch(
            `https://api.github.com/users/${username}?client_id=${this.client_id}&client_secret=${this.client_secret}`
        );
        // kullanıcı repolarını almak için istek attık
        const repoRes = await fetch(`https://api.github.com/users/${username}/repos?client_id=${this.client_id}&client_secret=${this.client_secret}&per_page=${this.per_page}&sort=${this.sort}`
    );
    console.log(repoRes);
           // apiden aldıgımız cevabı json'a cevirdik
        const data = await profileRes.json();
        const repos = await repoRes.json();
        // fonksiyonun cagrıldıgı yere bilgileri gönderme
        return { data, repos } ;

    }
}

