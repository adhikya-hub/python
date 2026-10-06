const data = require("./data.json");

//console.log(data);
//console.log(data.students[0]);
// import data from "./data.json" with { type: "json" };

//1. Count how many active students (profile.isActive === true) exist in each track.**

function q1() {
  const res = {};
  for (let st of data.students) {
    if (st.profile && st.profile.isActive === true) {
      if (!res[st.track]) {
        res[st.track] = 1;
      } else {
        res[st.track]++;
      }
    }
  }
  return res;
}
console.log(q1());

function qr1() {
  return data.students.reduce(
    (res, st) => {
      if (st.profile && st.profile.isActive === true) {
        res[st.track]++;
      }
      return res;
    },
    {
      JavaScript: 0,
      React: 0,
      "Node.js": 0,
      SQL: 0,
      "Full-Stack": 0,
    },
  );
}
console.log(JSON.stringify(qr1()));
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
  return Math.round((c / data.submissions.length) * 100, 2);
}
console.log(q2());

function qr2() {
  // const c= data.submissions.reduce((acc, sub) => {
  //   if (sub.isLate === true) {
  //     acc++;
  //   }
  //   return acc
  // }, 0)
  const c = data.submissions.filter((sub) => sub.isLate === true).length;
  return Math.round((c / data.submissions.length) * 100, 2);
}

console.log(qr2());
//learning platform.json
// 1. Count how many active students (profile.isActive === true) exist in each track.

// {
//   "JavaScript": 0,
//   "React": 0,
//   "Node.js": 0,
//   "SQL": 0,
//   "Full-Stack": 0
// }

// 2. What percentage of all submissions are late (isLate === true)? Return the percentage rounded to 2 decimals.,

// Output:
// { "lateRatePct": 0 }

// 3. Consider only submissions that have a review.
// Group them by assignment.difficulty and compute average review.score per difficulty (rounded to 2 decimals).
// Also return how many reviewed submissions are in each difficulty.
function q3() {
  const mp = {};
  for (let assignment of data.assignments) {
    mp[assignment.assignmentId] = assignment;
  }
  const res = {};
  for (let sub of data.submissions) {
    if (sub.review === null) {
      continue;
    }

    let diff = mp[sub.assignmentId].difficulty;
    if (!res[diff]) {
      res[diff] = {
        sumScore: 0,
        reviewedCount: 0,
      };
    }
    res[diff].sumScore += sub.review.score;
    res[diff].reviewedCount++;
  }

  let final = [];
  for (let [key, val] of Object.entries(res)) {
    final.push({
      difficulty: key,
      avgScore: (val.sumScore / val.reviewedCount).toFixed(2),
      reviewedCount: val.reviewedCount,
    });
  }
  console.log(final);
}

q3();
// Output:
// [
//   { "difficulty": "easy", "avgScore": 0, "reviewedCount": 0 },
//   { "difficulty": "medium", "avgScore": 0, "reviewedCount": 0 },
//   { "difficulty": "hard", "avgScore": 0, "reviewedCount": 0 }
// ]

// 4. For each student, sum their review.score across all reviewed submissions, then return the top 10 students.
function f4() {
  const mp = {};
  for (let st of data.students) {
    mp[st.studentId] = st.profile.name.first + " " + st.profile.name.last;
  }
  const res = {};
  for (let sub of data.submissions) {
    if (!sub.review) {
      continue;
    }
    if (!res[sub.studentId]) {
      res[sub.studentId] = 0;
    }
    res[sub.studentId] += sub.review.score;
  }
  //console.log(res);
  const f = [];
  for (let [key, val] of Object.entries(res)) {
    f.push({ studentId: key, fullName: mp[key], totalScore: val });
  }
  console.log(f.sort((a, b) => b.totalScore - a.totalScore).slice(0, 10));
}
f4();
// Output:
// [
//   { "studentId": "S0000", "fullName": "First Last", "totalScore": 0 }
// ]

// 5. Each student belongs to a cohort with a mentorId.
// Find the mentor who has the highest number of reviewed submissions across all their students.
// Also return how many active students they currently mentor.
// Output: { mentorId, activeStudents, reviewedSubmissions }.
function f5() {
  const studentToMentor = {};
  const res = {};

  // Build map and count active students
  for (const student of data.students) {
    const mentorId = student.cohort.mentorId;

    studentToMentor[student.studentId] = mentorId;

    if (!res[mentorId]) {
      res[mentorId] = {
        activeStudents: 0,
        reviewedSubmissions: 0,
      };
    }

    if (student.profile.isActive) {
      res[mentorId].activeStudents++;
    }
  }

  // Count reviewed submissions
  for (const sub of data.submissions) {
    if (!sub.review) continue;

    const mentorId = studentToMentor[sub.studentId];
    res[mentorId].reviewedSubmissions++;
  }

  // Find mentor with maximum reviewed submissions
  let ans = null;

  for (const [mentorId, val] of Object.entries(res)) {
    if (ans === null || val.reviewedSubmissions > ans.reviewedSubmissions) {
      ans = {
        mentorId,
        activeStudents: val.activeStudents,
        reviewedSubmissions: val.reviewedSubmissions,
      };
    }
  }

  console.log(ans);
}

f5();
// Output:
// { "mentorId": "M000", "activeStudents": 0, "reviewedSubmissions": 0 }

// 6. Among assignments that have at least one reviewed submission (review != null),
// find the assignment with the highest number of unreviewed submissions (review == null).
// Return { assignmentId, title, reviewed, unreviewed }.

function f6() {
  const mp = {};
  for (let assignment of data.assignments) {
    mp[assignment.assignmentId] = assignment;
  }
  const res = {};

  for (const sub of data.submissions) {
    if (!res[sub.assignmentId]) {
      res[sub.assignmentId] = {
        reviewed: 0,
        unreviewed: 0,
      };
    }

    if (sub.review) {
      res[sub.assignmentId].reviewed++;
    } else {
      res[sub.assignmentId].unreviewed++;
    }
  }

  const f = [];

  for (const [id, val] of Object.entries(res)) {
    if (val.reviewed > 0) {
      f.push({
        assignmentId: id,
        title: mp[id].title,
        reviewed: val.reviewed,
        unreviewed: val.unreviewed,
      });
    }
  }
  console.log(f.sort((a, b) => b.unreviewed - a.unreviewed)[0]);
}
f6();
// Output:
// { "assignmentId": "A0000", "title": "Title", "reviewed": 0, "unreviewed": 0 }
