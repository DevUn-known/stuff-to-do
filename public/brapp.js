// window.location.replace('/lists');

// window.location.replace('/tasks/');

//window.location.replace('/login/');

axios.get('/api/v1/testAuth').then(res => {
    window.location.replace('/lists/');   
}).catch(err => {
    if (err.response.status === 401)
        window.location.replace('/login/')
})