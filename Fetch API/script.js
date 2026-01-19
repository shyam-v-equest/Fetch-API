async function getData() {
  const pageInput = document.getElementById("page");
  const limitInput = document.getElementById("limit");
  const page = Number(pageInput.value);
  const limit = Number(limitInput.value);
  if (!page || !limit) {
    alert("Please write both of them");
    return;
  }
  try {
    const url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    const tableBody = document.getElementById("json-data");
    if (page === 1) {
      tableBody.innerHTML = "";
    }
    result.forEach(item => {
      const row = `
        <tr>
          <td>${item.userId}</td>
          <td>${item.id}</td>
          <td>${item.title}</td>
          <td>${item.body}</td>
        </tr>
      `;
      tableBody.insertAdjacentHTML("beforeend", row);
    });

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}


let isLoading = false;
let canLoadNext = true;

window.addEventListener("scroll", () => {
  const reachedBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5;
  if (!reachedBottom) {
    canLoadNext = true;
    return;
  }
  if (isLoading || !canLoadNext) return;
  isLoading = true;
  canLoadNext = false; 
  const pageInput = document.getElementById("page");
  pageInput.value = Number(pageInput.value) + 1;
  getData().finally(() => {
    isLoading = false;
  });
});
