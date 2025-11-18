const resultElement = document.getElementById("result");
let recognition;

function startconverting() {

    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition(); // FIXED
        setupRecognition(recognition);
        recognition.start();
    } else {
        alert("Speech Recognition not supported");
    }
}

function setupRecognition(recognition) {

    recognition.continuous = true;
    recognition.interimResults = true; // FIXED (interimResult → interimResults)
    recognition.lang = 'en-US'; // FIXED (en_uS → en-US)

    recognition.onresult = function (event) {

        const { finalTranscript, interTranscript } =
            processResult(event.results);

        resultElement.innerHTML = finalTranscript + interTranscript;
    }

}

function processResult(results) {

    let finalTranscript = '';
    let interTranscript = '';

    for (let i = 0; i < results.length; i++) {

        let transcript = results[i][0].transcript; // FIXED results(i) → results[i]
        transcript = transcript.replace("\n", "<br>");

        if (results[i].isFinal) { // FIXED (isfinal → isFinal)
            finalTranscript += transcript;
        } else {
            interTranscript += transcript;
        }
    }

    return { finalTranscript, interTranscript }; // FIXED (return two variables properly)
}

function stopconverting() {
    if (recognition) recognition.stop();
}
