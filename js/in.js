const das={"url":"https://www.google.com"}

var config = {
  method: "post",
  url: "https://bdix_tester-1-n2631061.deta.app/check",
  headers: {
    "Content-Type": "application/json",
  },
  data: JSON.stringify(das),
};


axios(config)
      .then(function (response) {
        console.log(response.data)
        // console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });