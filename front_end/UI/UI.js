console.log("IN UI");
const login = (ev) => {
    ev.preventDefault();
    let login_cred = {
        u_name: document.getElementById('username').value,
        u_password: document.getElementById('Password').value
    }
    document.forms[0].reset();
    let pre = document.querySelector('#msg pre');
    axios.post('http://localhost:3001/v1/user/login', (login_cred)).then(response => {
        if (response.data) {
            pre.textContent = '\n' + 'Login Sucess'
        } else {
            pre.textContent = '\n' + 'Login Failed'
        }

    }).catch(err => console.log("Err at login ", err));

}

const createuser = (ev) => {
    ev.preventDefault();
    let newuser = {
        u_name: document.getElementById('newuname').value,
        u_password: document.getElementById('pwd1').value
    }
    document.forms[0].reset();
    let pre = document.querySelector('#msg pre');
    axios.post('http://localhost:3001/v1/user/signup', (newuser)).then(response => {
        if (response.data) {
            pre.textContent = '\n' + 'Created'
        }
        else {
            pre.textContent = '\n' + 'Failed'
        }
    }).catch(err => console.log("Err:newuser", err));
}

