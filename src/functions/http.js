const WarmUpEndPoint = process.env.REACT_APP_WARMUP;
const WarmUpK = process.env.REACT_APP_WARMUP_CODE;
const unLockAudioEndPoint = "http://localhost:7071/api/payment-basic"; //process.env.REACT_APP_UNLOCK;
const unLockAudioEndPointK =
  "fO9FZ/fSb0tbtAq2d5/hnTiNCbaIm2bnsZORWbgzcAGxHKnSCgr4pg==";
const STRIPE_LOGIC_K = process.env.REACT_APP_STRIPE_LOGIC_K;
const STRIPE_LOGIC_ENDPOINT = process.env.REACT_APP_STRIPE_LOGIC_ENDPOINT;

export async function unLockAudioHttp(
  schema,
  character,
  licenseNumber,
  author
) {
  const myHeaders = new Headers();
  myHeaders.append("x-functions-key", unLockAudioEndPointK);
  const document = { schema };
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
    body: JSON.stringify({
      document,
      licenseNumber: licenseNumber ? licenseNumber : "sample",
    }),
  };

  try {
    let response = await fetch(unLockAudioEndPoint, requestOptions);
    return response;
  } catch (err) {
    alert("Oooops, zkuste to prosím ještě jednou"); // TypeError: failed to fetch
    console.error(err);
    return false;
  }
}

export async function checkOutHttp(price_type) {
  const myHeaders = new Headers();
  myHeaders.append("x-functions-key", STRIPE_LOGIC_K);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
    body: JSON.stringify({ price_type }),
  };

  try {
    let response = await fetch(STRIPE_LOGIC_ENDPOINT, requestOptions);
    if (response.ok) {
      const responseString = await response.text();
      window.open(responseString);
      return true;
    } else {
      console.error(response.error);
    }
  } catch (err) {
    alert("Oooops, zkuste to prosím ještě jednou"); // TypeError: failed to fetch
    console.error(err);
    return false;
  }
}

export const warmUpHttp = async () => {
  var myHeaders = new Headers();
  myHeaders.append("x-functions-key", WarmUpK);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    let response = await fetch(WarmUpEndPoint, requestOptions);
    return response.ok;
  } catch (err) {
    setTimeout(() => {
      warmUpHttp();
    }, 2000);
    return false;
  }
};

export const emailHttp = async (input) => {
  var myHeaders = new Headers();
  myHeaders.append("x-functions-key", process.env.REACT_APP_EMAIL_LOGIC_CODE);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
    body: JSON.stringify(input),
  };

  try {
    let response = await fetch(
      process.env.REACT_APP_EMAIL_LOGIC,
      requestOptions
    );
    return response.ok;
  } catch (err) {
    console.error(err);
  }
};
