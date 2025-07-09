// Gestion dynamique de la fiche utilisateur
// Sélection des éléments du DOM
const inputNom = document.getElementById('inputNom');
const inputPrenom = document.getElementById('inputPrenom');
const inputAge = document.getElementById('inputage');
const inputTelephone = document.getElementById('inputelephone');
const inputEmail = document.getElementById('inputemail');

const btnAjouter = document.getElementById('inputajouter');
const btnSauvegarder = document.getElementById('Sauvegardermembre');
const btnSupprimer = document.getElementById('Supprimermembre');

// Liste des membres
let membres = [];
let membreSelectionne = null; // index du membre sélectionné pour modification

// Fonction pour remplir le formulaire avec les données du membre
function remplirFormulaire(membre) {
    inputNom.value = membre.nom;
    inputPrenom.value = membre.prenom;
    inputAge.value = membre.age;
    inputTelephone.value = membre.telephone;
    inputEmail.value = membre.email;
}

// Fonction pour vider le formulaire
function viderFormulaire() {
    inputNom.value = '';
    inputPrenom.value = '';
    inputAge.value = '';
    inputTelephone.value = '';
    inputEmail.value = '';
}

// Vérification des champs obligatoires
function champsValides() {
    if (
        inputNom.value.trim() === '' ||
        inputPrenom.value.trim() === '' ||
        inputAge.value.trim() === '' ||
        inputTelephone.value.trim() === '' ||
        inputEmail.value.trim() === ''
    ) {
        alert('Tous les champs sont obligatoires !');
        return false;
    }
    return true;
}

// Affichage des membres dans un tableau
function afficherMembres() {
    const tbody = document.querySelector('#membresTable tbody');
    tbody.innerHTML = '';
    membres.forEach((m, idx) => {
        const tr = document.createElement('tr');
        tr.style.cursor = 'pointer';
        if (membreSelectionne === idx) {
            tr.style.background = '#e0eaff';
        }
        tr.innerHTML = `
            <td>${m.nom}</td>
            <td>${m.prenom}</td>
            <td>${m.age}</td>
            <td>${m.telephone}</td>
            <td>${m.email}</td>
        `;
        tr.addEventListener('click', function() {
            membreSelectionne = idx;
            remplirFormulaire(m);
            afficherMembres(); // pour surligner la ligne sélectionnée
        });
        tbody.appendChild(tr);
    });
}

// Ajouter un membre
btnAjouter.addEventListener('click', function(e) {
    e.preventDefault();
    if (!champsValides()) return;
    const nouveauMembre = {
        nom: inputNom.value,
        prenom: inputPrenom.value,
        age: inputAge.value,
        telephone: inputTelephone.value,
        email: inputEmail.value
    };
    membres.push(nouveauMembre);
    afficherMembres();
    viderFormulaire();
    membreSelectionne = null;
    alert('Membre ajouté ! Cliquez sur un membre pour le modifier.');
});

// Sauvegarder les modifications du membre sélectionné
btnSauvegarder.addEventListener('click', function(e) {
    e.preventDefault();
    if (!champsValides()) return;
    if (membreSelectionne === null) {
        alert('Sélectionnez un membre à modifier dans la liste.');
        return;
    }
    membres[membreSelectionne] = {
        nom: inputNom.value,
        prenom: inputPrenom.value,
        age: inputAge.value,
        telephone: inputTelephone.value,
        email: inputEmail.value
    };
    afficherMembres();
    viderFormulaire();
    membreSelectionne = null;
    alert('Modifications sauvegardées !');
});

// Supprimer le membre sélectionné
btnSupprimer.addEventListener('click', function(e) {
    e.preventDefault();
    if (membreSelectionne === null) {
        alert('Sélectionnez un membre à supprimer dans la liste.');
        return;
    }
    membres.splice(membreSelectionne, 1);
    afficherMembres();
    viderFormulaire();
    membreSelectionne = null;
    alert('Membre supprimé !');
});


// Initialiser l'affichage
afficherMembres();
