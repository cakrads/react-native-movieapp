class API {
  constructor(token = null) {
    this.token = token;
  }

  header(token) {
    let headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  async post(URI, data, param = null) {
    try {
      // console.log('API POST', URI, {body: JSON.stringify(data)});
      let query = '';
      if (param) {
        query = Object.keys(param)
          .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(param[k]))
          .join('&');
      }

      // console.log('API GET', URI + '?' + query);

      let headers = this.header(this.token);
      let result = await fetch(URI + '?' + query, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: headers,
        body: JSON.stringify(data),
      });
      // console.log(result);
      if (!result.ok) {
        throw {
          ok: result.ok,
          status: result.status,
          statusText: result.statusText,
          type: result.type,
          url: result.url,
        };
      }
      return result.json();
    } catch (error) {
      // console.log("errapi",error)
      throw error;
    }
  }

  async get(URI, param = null) {
    try {
      let query = '';
      if (param) {
        query = Object.keys(param)
          .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(param[k]))
          .join('&');
      }

      console.log('API GET', URI + '?' + query);

      let headers = this.header(this.token);
      let result = await fetch(URI + '?' + query, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: headers,
      });
      // console.log('GET RESULT', result);
      if (!result.ok) {
        throw {
          ok: result.ok,
          status: result.status,
          statusText: result.statusText,
          type: result.type,
          url: result.url,
        };
      }
      return result.json();
    } catch (error) {
      throw error;
    }
  }

  async put(URI, data, param = null) {
    try {
      // console.log('API PUT', URI, {body: JSON.stringify(data)});
      let query = '';
      if (param) {
        query = Object.keys(param)
          .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(param[k]))
          .join('&');
      }

      // console.log('API GET', URI + '?' + query);

      let headers = this.header(this.token);
      let result = await fetch(URI + '?' + query, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: headers,
        body: JSON.stringify(data),
      });
      if (!result.ok) {
        throw {
          ok: result.ok,
          status: result.status,
          statusText: result.statusText,
          type: result.type,
          url: result.url,
        };
      }
      return result.json();
    } catch (error) {
      throw error;
    }
  }
  async delete(URI, data, param = null) {
    try {
      // console.log('API DELETE', URI, {body: JSON.stringify(data)});

      let query = '';
      if (param) {
        query = Object.keys(param)
          .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(param[k]))
          .join('&');
      }

      // console.log('API GET', URI + '?' + query);

      let headers = this.header(this.token);
      let result = await fetch(URI + '?' + query, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: headers,
        body: JSON.stringify(data),
      });
      // console.log("result result", result);
      if (!result.ok) {
        throw {
          ok: result.ok,
          status: result.status,
          statusText: result.statusText,
          type: result.type,
          url: result.url,
        };
      }
      return result.json();
    } catch (error) {
      throw error;
    }
  }
}
export default API;
