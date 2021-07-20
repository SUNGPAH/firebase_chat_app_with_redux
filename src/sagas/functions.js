import {db} from '../firebase';

export const firebaseLogin = async (uid) => {
  return db.collection('user').doc(uid).get()
}

export const someGetExample = async (index) => {
  const result = await fetch(`https://jsonplaceholder.typicode.com/todos/${index}`)
    .then(response => response.json())
    .then(json => {
      return json
    })

  return result
}

export const getLandingCourses = async () => {
  const res = await fetch('https://api.ringleplus.com/api/v4/student/landing/course?locale=en');
  const data = res.json()
  return data
}



