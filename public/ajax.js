fetch('https://yourapp.onrender.com/contact', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({name, email, message})
})
.then(res => res.text())
.then(data => alert(data))
.catch(err => alert('Network error'));
