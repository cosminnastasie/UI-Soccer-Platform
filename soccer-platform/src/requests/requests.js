// requests.js
import {URLS} from './constants';


const storedCode = localStorage.getItem('key-write');

var getRequestOptions = {
    method: 'GET',
    redirect: 'follow'
};


export async function getData(path) {
    var url = URLS.apiUrl + path;
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

    if (storedCode === 'copa del mondo') {
        // Add your custom logic here
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
    } else {
        alert('You dont  have the rights for this action')
    }
    
}
// application/json
export async function putData(path, data) {
    var url = URLS.apiUrl + path;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");
       
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow'
    };
    if (storedCode === 'copa del mondo') {
        try {
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (e) {
            console.error("Error putting data: ", e);
            throw e; // rethrow to allow the caller to handle it
        }
    }else{
        alert('You dont  have the rights for this action')
    }
}

export async function deleteData(path, data) {

    var url = URLS.apiUrl + path;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");
       
    // var requestOptions = {
    //   method: 'DELETE',
    //   headers: myHeaders,
    //   body: JSON.stringify(data),
    //   redirect: 'follow'
    // };


    // Use the putData function to send this update
    try {
        const response = await putData(url, {
            method: 'DELETE',
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

// Example usage
// deleteData('path/to/resource', { id: '123' }).then(result => console.log(result));

