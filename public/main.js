
const update = document.querySelector('#update-button');
update.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Darth Vader',
            quote: 'Peter is the best person in the world.'
        })
    }) 
    .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        window.location.reload()
        console.log(response)
      })
})

const deleteButton = document.querySelector('#delete-button')

deleteButton.addEventListener('click', _ => {
  fetch('/quotes', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
  })
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(data => {
   window.location.reload()
   console.log(data)
  })
})



