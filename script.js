const csvURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQQQHhT5VeUKqGGRrhlW5Y8cVgHXeJ9XEMm3HBh8Zcy5xQv2DdddIL3FR5ysRsdJGmx9ooW7WcQsIYB/pub?output=csv";

const subjectMap = {
  Science: ["Physics", "Chemistry", "Biology", "Mathematics"],
  Commerce: ["Accountancy", "Business Studies", "Economics"],
  Arts: ["History", "Political Science", "Geography", "Psychology"]
};

document.getElementById("streamSelect")?.addEventListener("change", function () {
  const subjectSelect = document.getElementById("subjectSelect");
  subjectSelect.innerHTML = `<option value="">Select Subject</option>`;
  (subjectMap[this.value] || []).forEach(sub => {
    subjectSelect.innerHTML += `<option>${sub}</option>`;
  });
});

async function loadTutors() {
  const res = await fetch(csvURL);
  const text = await res.text();
  const rows = text.split("\n").slice(1);
  const cards = document.getElementById("tutorCards");
  if (!cards) return;
  cards.innerHTML = "";

  rows.forEach(row => {
    const cols = row.split(",");
    if (cols.length < 5) return;

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${cols[1]}</h3>
      <p><strong>Subject:</strong> ${cols[2]}</p>
      <p><strong>Class:</strong> ${cols[3]}</p>
      <p><strong>Mode:</strong> ${cols[4]}</p>
    `;
    cards.appendChild(card);
  });
}

loadTutors();
