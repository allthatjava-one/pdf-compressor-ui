Check out the example below to see how to read environment variables in a Cloudflare Worker function and display it in a React app.

# Dummy commend

functions/api.js:

'''
export async function onRequest(context) {
// Read secret from environment variable
const secret = context.env.MY_SECRET_KEY;

// Example response
return new Response(JSON.stringify({ secret }), {
headers: { "Content-Type": "application/json" },
});
}
'''

In your App.js:
'''
import { useEffect, useState } from "react";

function App() {
const [secret, setSecret] = useState("");

useEffect(() => {
fetch("/api") // Cloudflare maps /api to functions/api.js
.then((res) => res.json())
.then((data) => setSecret(data.secret));
}, []);

return (

<div> <h1>Secret from serverless function:</h1> <p>{secret}</p> </div> ); }
'''

export default App;