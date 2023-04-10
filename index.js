const axios = require('axios')


axios.get('',{
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299',
    Authorization: 'Bearer #token#'
  }
}).then((response)=>{
  const data = response.data.data

  console.log(data.produto.preco)
})