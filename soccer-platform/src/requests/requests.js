// requests.js
import {URLS} from './constants';

var getRequestOptions = {
    method: 'GET',
    redirect: 'follow'
};



export async function getData(path) {
    var url = URLS.apiUrl + path;
    console.log('GET HERE.....');
    try {
        const response = await fetch(url, getRequestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (e) {
        console.error("Error fetching data: ", e);
        throw e; // rethrow to allow the caller to handle it
    }
}

export async function postData(path, data) {
    var url = URLS.apiUrl + path;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (e) {
        console.error("Error posting data: ", e);
        throw e; // rethrow to allow the caller to handle it
    }
}
// application/json
export async function putData(path, data) {
    var url = URLS.apiUrl + path;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");
    
    // var raw = "{\"competitor\": \"Aro\",\"date\": \"2024-01-17\",\"loc\": \"Bascov\",\"hour\": \"10:00\",\"homeaway\": \"Home\",\"typeofgame\": \"Cup\"}";
    
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow'
    };
    
    // fetch("https://api-soccer-platform.cosminnastasie.workers.dev/games", requestOptions)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));
        try {
            const response = await fetch(url, requestOptions);
            console.log(response);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (e) {
            console.error("Error putting data: ", e);
            throw e; // rethrow to allow the caller to handle it
        }
}
