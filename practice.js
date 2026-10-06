const data = require("./data.json");

//console.log(data);
 //console.log(data.students[0]);
// import data from "./data.json" with { type: "json" };

//1. Count how many active students (profile.isActive === true) exist in each track.**

function q1() {
  const res = {}
  for (let st of data.students) {

    if (st.profile && st.profile.isActive === true) {
      if (!res[st.track]) {
        res[st.track]=1
      }
      else {
        res[st.track]++
      }
    }

  }
  return res
}
console.log(q1())

function qr1() {
  return data.students.reduce((res, st) => {
    if (st.profile && st.profile.isActive === true) {
        res[st.track]++
    }
    return res
  },{
    "JavaScript": 0,
    "React": 0,
    "Node.js": 0,
    "SQL": 0,
    "Full-Stack": 0
  })
}
console.log(JSON.stringify(qr1()))
/*
{
  "JavaScript": 0,
  "React": 0,
  "Node.js": 0,
  "SQL": 0,
  "Full-Stack": 0
}


**2. What percentage of all submissions are late (isLate === true)? Return the percentage rounded to 2 decimals.**
Expected output formal
```
{ "lateRatePct": 0 }
```
*/
//console.log(data.submissions[0])
function q2() {
  let c = 0;
  for (let sub of data.submissions) {
    if (sub.isLate === true) {
      c++;
    }

  }
  return Math.round(((c/data.submissions.length)*100),2)
}
console.log(q2())

function qr2()
{
  // const c= data.submissions.reduce((acc, sub) => {
  //   if (sub.isLate === true) {
  //     acc++;
  //   }
  //   return acc
  // }, 0)
  const c= data.submissions.filter(sub=>sub.isLate === true).length
  return Math.round(((c/data.submissions.length)*100),2)
}

console.log(qr2())
