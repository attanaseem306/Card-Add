import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";



const firebaseConfig = {
    apiKey: "AIzaSyByE2tN_PsLz9wl8JS1wPUp9HRcwMw-0qI",
    authDomain: "first-352b3.firebaseapp.com",
    projectId: "first-352b3",
    storageBucket: "first-352b3.appspot.com",
    messagingSenderId: "627727661584",
    appId: "1:627727661584:web:3e87800afbdcf0fc972895",
    measurementId: "G-99CRDS20VC"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
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
                window.location.reload()
            })
    })

})
//////////////////////////////     ////////////////////////////////////////////////////////////////


////////////////////////////  ye code firestore se value la kr dy ga  ///////////////////////////////////


const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {


    getDownloadURL(ref(storage, doc.id))
        .then((url) => {

            let link = url

            document.getElementById("card").innerHTML += `
   <div class="card" style="width: 18rem;">
   <img class="card-img-top" src="${link}" alt="Card image cap">
   <div class="card-body">
   <h4 class="card-text">${doc.data().Name}</h4>
   <h5 class="card-title">${doc.data().Location}</h5>
   <h4 class="card-text">${doc.data().Price}</h4>
   <button id="btn" onclick='Delete("${doc.id}")'>Delete</button>
   <button id="btn1" type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick='Edit("${doc.id}")'>Edit</button>

   </div>
 </div>`


        })
        .catch((error) => {
            // Handle any errors
        });

})

async function Delete(a) {
    console.log(a);
    await deleteDoc(doc(db, "users", a));
    // Create a reference to the file to delete
    const desertRef = ref(storage, a);

    // Delete the file
    deleteObject(desertRef).then(() => {
        Swal.fire({
            icon: 'success',
            title: 'Card Delete.',
            text: 'Card Delete successfully!',
        }).then(() => {
            location.reload()
        })

    }).catch((error) => {
        // Uh-oh, an error occurred!
    });
}
window.Delete = Delete





function Edit(e) {

    document.getElementById('my').addEventListener('click', async () => {
        let input1 = document.getElementById("input1")
        let input2 = document.getElementById("input2")
        let input3 = document.getElementById("input3")
        let input4 = document.getElementById("input4").files

        const washingtonRef = doc(db, "users", e);

        // Set the "capital" field of the city 'DC'
        await updateDoc(washingtonRef, {
            Name: input1.value,
            Location: input2.value,
            Price: input3.value
        })
        const storageRef = ref(storage, e);

        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, input4[0]).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
        Swal.fire({
            icon: 'success',
            title: 'Card Edit.',
            text: 'Card Edit successfully😂!',
        }).then(() => {
            location.reload()
        })
    });

}
window.Edit = Edit


