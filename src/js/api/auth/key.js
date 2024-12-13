// import { API_AUTH_KEY } from "../constants";

// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQnJvciIsImVtYWlsIjoiYnJvckBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTczMjE5NDQ3NX0.ejaqaHigZ8-HCGfmNsvPqVYUFbBbnlBCYqYVWYyFNIc"

// export async function getKey() {


//     const response = await fetch(API_AUTH_KEY, {
//         method: `POST`,
//         headers: { 
//             "Content-Type": "application/json" ,
//             Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({
//             name: "newKey",
//         })
//     });
    
//     if (response.ok) {
//         return await response.json();
//     }

//     console.error(await response.json());
//     throw new Error("Could not register for key!")
// }

// getKey().then(console.log)