const timeline = document.getElementById('timeline');
const csvInput = document.getElementById('csvFile');
// CSV import
csvInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  console.log(file)
  if (!file) return;

  csvParser(renderTimeline, file);
});

function renderTimeline(data) {
  // Remove existing nodes
  timeline.querySelectorAll('.node').forEach(n => n.remove());

  data.forEach((d, i) => {
    const node = document.createElement('div');
    node.classList.add('node');
    if (d.complete === "true") node.classList.add('active');

    node.innerHTML = `
      <div class="label-date">${ d.date }</div>
      <div class="label-item">${ d.item }</div>
    `;

    node.addEventListener('click', () => {
      node.classList.toggle('active');
    });

    timeline.appendChild(node);
  });
}

const csvParser = (callback, file) => {
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    download: true,
    complete: (results) => {
      const parsed = results.data.map(row => ({
        date: row.Date || row.date || '',
        item: row.Item || row.item || '',
        complete: row.Complete || row.complete || '',
      }));
      callback(parsed);
    }
  });
}



csvParser(renderTimeline, "schedule.csv");
