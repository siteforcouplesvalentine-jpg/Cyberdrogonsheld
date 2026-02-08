function scanUrl() {
    const linkInput = document.getElementById('urlInput').value;
    const resultDiv = document.getElementById('result');
    
    if (!linkInput) {
        resultDiv.innerHTML = "<div style='color: yellow; padding: 10px;'>URL paste cheyyu Adam! ⚠️</div>";
        return;
    }

    let riskScore = 0;
    let detections = [];
    let host = "";

    try {
        const url = new URL(linkInput.startsWith('http') ? linkInput : 'http://' + linkInput);
        host = url.hostname.toLowerCase();
    } catch (e) {
        resultDiv.innerHTML = "<div style='color: red; padding: 10px;'>Ithu valid link alla bro! ❌</div>";
        return;
    }

    // 1. IP & Tunnel Detection Logic
    const ipPattern = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    const tunnels = ['ngrok', 'localtunnel', 'localhost.run', 'trycloudflare', 'serveo.net'];

    if (ipPattern.test(host)) {
        riskScore += 95;
        detections.push("Direct IP Access (Danger ❌)");
    }
    if (tunnels.some(t => host.includes(t))) {
        riskScore += 90;
        detections.push("Hacker Tunnel/Localhost 🚩");
    } 
    // 1. Suspicious Extensions (Cheap domains often used by hackers)
const riskyExtensions = ['.sbs', '.xyz', '.top', '.buzz', '.tk', '.ml'];

if (riskyExtensions.some(ext => host.endsWith(ext))) {
    riskScore += 70;
    detections.push("Suspicious Domain Extension (High Risk) 🚩");
}

// 2. Suspicious URL Patterns (Common in image/file phishing)
const riskyPatterns = ['ref=', 'sharing', 'index.php?', 'login', 'verify'];

if (riskyPatterns.some(pattern => linkInput.toLowerCase().includes(pattern))) {
    riskScore += 30;
    detections.push("Suspicious Link Pattern Detected 🔍");
}


    // 2. Phishing Logic for Brands
    const brands = ['amazon', 'flipkart', 'meesho', 'myntra', 'iphone'];
    brands.forEach(brand => {
        if (linkInput.toLowerCase().includes(brand) && !host.endsWith('.com') && !host.endsWith('.in')) {
            riskScore += 85;
            detections.push(`Fake ${brand} Link Detected 🎣`);
        }
    });

    // 3. Display Result with 1930 Call Action
    if (riskScore >= 50) {
        resultDiv.innerHTML = `
            <div class="danger-box" style="background: #ff3b30; color: white; padding: 15px; border-radius: 8px; margin-top: 15px; text-align: center;">
                <h3 style="margin: 0;">🚨 DANGER DETECTED!</h3>
                <p style="margin: 10px 0;">Risk Score: ${riskScore}% <br>Reasons: ${detections.join(", ")}</p>
                <button onclick="window.location.href='tel:1930'" style="background: white; color: #ff3b30; border: none; padding: 10px; border-radius: 5px; font-weight: bold; width: 100%; cursor: pointer;">
                    📞 CALL 1930 & REPORT
                </button>
            </div>
        `;
    } else {
        resultDiv.innerHTML = `
            <div style="background: #4CAF50; color: white; padding: 15px; border-radius: 8px; margin-top: 15px; text-align: center;">
                <h3 style="margin: 0;">✅ SITE IS SAFE</h3>
                <p style="margin: 5px 0;">Low Risk: ${riskScore}% <br>Dragon Shield is watching 🐉</p>
            </div>
        `;
    }
}
