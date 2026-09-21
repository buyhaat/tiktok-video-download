const videoUrl = document.getElementById("videoUrl");
const downloadBtn = document.getElementById("downloadBtn");

const message = document.getElementById("message");

const result = document.getElementById("result");
const copyBtn = document.getElementById("copyBtn");


/*
    Check whether the entered URL
    belongs to TikTok.
*/

function isTikTokUrl(value) {

    try {

        const url = new URL(value);

        const hostname =
            url.hostname
                .toLowerCase()
                .replace(/^www\./, "");

        return (
            hostname === "tiktok.com" ||
            hostname.endsWith(".tiktok.com")
        );

    } catch {

        return false;

    }
}


/*
    Show message
*/

function showMessage(text, type) {

    message.textContent = text;

    message.className = type || "";

}


/*
    Clear message
*/

function clearMessage() {

    message.textContent = "";

    message.className = "";

}


/*
    Download button
*/

downloadBtn.addEventListener("click", function () {

    clearMessage();

    result.classList.remove("show");

    const url = videoUrl.value.trim();


    // Empty URL

    if (!url) {

        showMessage(
            "Please paste a TikTok video URL.",
            "error"
        );

        videoUrl.focus();

        return;
    }


    // Invalid TikTok URL

    if (!isTikTokUrl(url)) {

        showMessage(
            "Please enter a valid TikTok URL.",
            "error"
        );

        videoUrl.focus();

        return;
    }


    /*
        URL is valid.

        Without a backend/API we cannot fetch
        the actual TikTok video file directly
        from this frontend.
    */

    result.classList.add("show");

    showMessage(
        "TikTok URL detected successfully.",
        "success"
    );

});


/*
    Copy URL button
*/

copyBtn.addEventListener("click", async function () {

    const url = videoUrl.value.trim();

    if (!url) {
        return;
    }


    try {

        await navigator.clipboard.writeText(url);

        copyBtn.textContent = "Copied!";

        setTimeout(function () {

            copyBtn.textContent = "Copy URL";

        }, 1500);


    } catch {

        showMessage(
            "Could not copy the URL.",
            "error"
        );

    }

});


/*
    Press Enter to submit
*/

videoUrl.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        downloadBtn.click();

    }

});
