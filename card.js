import{app,db,analytics,storage} from "./firebase.mjs"
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { ref , uploadBytes } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";




let id;
document.getElementById("Post").addEventListener('click', async () => {

    let name = document.getElementById("name")
    let location = document.getElementById("location")
    let Price = document.getElementById("Price")
    let file = document.getElementById("Picture").files[0]





    ///////////////////////   add  data in firestore //////////////////////////////////////

    try {
        const docRef = await addDoc(collection(db, "users"), {
            Name: name.value,
            Location: location.value,
            Price: Price.value,

        });
        console.log("Document written with ID: ", docRef.id);

        id = docRef.id

    } catch (e) {
        console.error("Error adding document: ", e);
    }

    console.log(id);
    /////////////////////    //////////////////////////      //////////////////////////////



    ///////////////////    sent image on this id      upload file on storage code ///////////////////////////////  

    const storageRef = ref(storage, id);

    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        Swal.fire({
            icon: 'success',
            title: 'Card Post.',
            text: 'Card Post successfully!',
        })
            .then(() => {
                window.location.href="./home.html"
            })
    })

})