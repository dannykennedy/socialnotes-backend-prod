$(document).ready(function() {
  $('#click').on('click', () => {
    axios.get('http://localhost:8080')
    .then((data) => {
      console.log("our data ", data)
    })
    .catch((err) => {
      console.log(err)
    })
  })
});
