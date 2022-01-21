export function verAccessToken() {
    fetch('https://testeiaie.herokuapp.com/accessToken', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    })
        .then(res => res.json())
        .then((out) => {
            console.log(out);
            let access_token = out.access_token;
            console.log(access_token);
            verRefreshToken();

        })

        .catch(error => {
            console.log(error);
        });
};

 export function verRefreshToken() {
    fetch('https://testeiaie.herokuapp.com/refreshToken', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    })
        .then(res => res.json())
        .then((out) => {
            console.log(out);
            let refresh_token = out.refresh_token;
        })
        .catch(error => {
            console.log(error);
        });
};

