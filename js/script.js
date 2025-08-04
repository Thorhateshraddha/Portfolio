 document.addEventListener('DOMContentLoaded', () => {
  const nameText = "Shraddha Thorhate";
  const typedName = document.getElementById('typed-name');
  let i = 0;

  function typeWriter() {
    if (i < nameText.length) {
      typedName.innerHTML += nameText.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }

  typeWriter();
});
