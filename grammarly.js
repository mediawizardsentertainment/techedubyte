const url="https://www.techedubyte.com/grammarly-cookies/";const proxies=["https://api.codetabs.com/v1/proxy/?quest=","https://api.allorigins.win/raw?url=","https://app.scrapingbee.com/api/v1/?api_key=X6ZXUP0STCEJBFPYW07V8L6AL8GW1BQH4HPU5W7SMWURWBLKMMKYKTLBR5AOUPNXVM26LCPTF5DGLB8N&url="];async function fetchPasswordText(retries=10,delay=500,proxyIndex=0){try{const proxyUrl=proxies[proxyIndex]+encodeURIComponent(url);const res=await fetch(proxyUrl);if(!res.ok)throw new Error(`HTTP error! Status:${res.status}`);const html=await res.text();const parser=new DOMParser();const doc=parser.parseFromString(html,"text/html");const passwordCell=Array.from(doc.querySelectorAll('td.has-text-align-center[data-align="center"]')).find(cell=>cell.textContent.trim()==="Password");const passwordText=passwordCell?.nextElementSibling?.textContent.trim()||"Password not found";const output=document.getElementById("passwordOutput");if(output){output.innerHTML=`<div class="password-box"><h3>File Password:</h3><p>${passwordText}</p></div>`}}catch(err){if(retries>0&&proxyIndex<proxies.length-1){setTimeout(()=>fetchPasswordText(retries-1,delay,proxyIndex+1),delay)}else{const output=document.getElementById("passwordOutput");if(output){output.innerHTML=`<div class="error-box"><h3>Error:</h3><p>Failed to fetch the password after multiple attempts. Please try again later.</p></div>`}}}}fetchPasswordText();document.head.insertAdjacentHTML("beforeend",` <style>#passwordOutput{max-width:500px;margin:20px auto;padding:20px;border-radius:10px;box-shadow:0 4px 8px rgb(0 0 0 / .1);background-color:#f9f9f9;text-align:center;font-family:Arial,sans-serif}.password-box h3{color:#1976d2;margin-bottom:10px}.password-box p{font-size:1.2rem;font-weight:700;color:#333}.error-box h3{color:#d32f2f;margin-bottom:10px}.error-box p{font-size:1rem;color:#555}</style>`)
