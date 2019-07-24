class Notes {
    constructor(allNotes) {
        this.allNotes = {};
    }

    loadNotes() {
        return  fetch('repository/repo-json/notes.json');
        /*
            .then((res) => {
                return res.json();
            }).then((data) => {
                console.log(data);
            }).catch(err => {
                console.log(err);
            });*/
    }
}