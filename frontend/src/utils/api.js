export function fetchCategories () {
  return fetch(`/categories`, 
               { headers: { 'Authorization': 'whatever-you-want' } })
    .then((res) => res.json())
    .then(({ hits }) => hits.map(({ categories }) => categories))
}

/*
export function fetchCategories (category = '') {
  category = category.trim()

  return fetch(`https://api.edamam.com/search?q=${food}&app_id=${API_ID}&app_key=${APP_KEY}`, 
               { headers: { 'Authorization': 'whatever-you-want' } })
    .then((res) => res.json())
    .then(({ hits }) => hits.map(({ recipe }) => recipe))
}
*/