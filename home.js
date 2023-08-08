
import{app,db,analytics,storage} from "./firebase.mjs"

import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";


//////////////////////////////     ////////////////////////////////////////////////////////////////


////////////////////////////  ye code firestore se value la kr dy ga  ///////////////////////////////////


const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {


    getDownloadURL(ref(storage, doc.id))
        .then((url) => {

            let link = url

            document.getElementById("card").innerHTML += `
   <div  class="border border-2 rounded border-dark ab" class="card" style="width: 18rem;">
   <img class="card-img-top" src="${link}" alt="Card image cap">
   <div class="card-body text">
   <h5 class="card-text A">Name : ${doc.data().Name}</h5>
   <h5 class="card-title A">Location : ${doc.data().Location}</h5>
   <h5 class="card-text A">Price : ${doc.data().Price}</h5>
   <button id="btn"  onclick='Delete("${doc.id}")'>Delete</button>
   <button id="btn1" type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn"  onclick='Edit("${doc.id}")'>Edit</button>

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


